from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from config import settings
from models import User, Role, Permission, RoleType

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt


def decode_token(token: str) -> dict:
    """Decode and verify JWT token"""
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        return payload
    except JWTError:
        return None


def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Authenticate user and return user object"""
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user


def get_user_permissions(db: Session, user: User) -> dict:
    """Get permission matrix for a user"""
    permissions = db.query(Permission).filter(Permission.role_id == user.role_id).all()

    perm_dict = {}
    for perm in permissions:
        if perm.vertical not in perm_dict:
            perm_dict[perm.vertical] = {}
        perm_dict[perm.vertical] = {
            "create": perm.can_create,
            "read": perm.can_read,
            "update": perm.can_update,
            "delete": perm.can_delete,
        }
    return perm_dict


def check_permission(db: Session, user: User, vertical: str, action: str) -> bool:
    """Check if user has permission for an action on a vertical"""
    if user.role.name == RoleType.ADMIN:
        return True  # Admin has all permissions

    permission = db.query(Permission).filter(
        Permission.role_id == user.role_id,
        Permission.vertical == vertical
    ).first()

    if not permission:
        return False

    action_map = {
        "create": permission.can_create,
        "read": permission.can_read,
        "update": permission.can_update,
        "delete": permission.can_delete,
    }

    return action_map.get(action, False)


def require_entity_scope(db: Session, user: User, entity_id: int) -> bool:
    """Verify entity user can only access their own entity"""
    if user.role.name == RoleType.ADMIN or user.role.name == RoleType.BCAS:
        return True  # These roles see everything

    if user.role.name == RoleType.ENTITY:
        return user.entity_id == entity_id  # Entity can only access themselves

    return False
