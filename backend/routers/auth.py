from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from datetime import timedelta
from database import get_db
from models import User
from auth import authenticate_user, create_access_token, hash_password, get_user_permissions
from config import settings

router = APIRouter()


# ════════════════════════════════════════════════════════════════════════════
# PYDANTIC MODELS
# ════════════════════════════════════════════════════════════════════════════

class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    password: str
    role: str
    entity_id: int = None


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: str
    role: dict
    is_active: bool

    class Config:
        from_attributes = True


# ════════════════════════════════════════════════════════════════════════════
# ENDPOINTS
# ════════════════════════════════════════════════════════════════════════════

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    """
    User login endpoint
    Returns JWT access token and user details
    """
    user = authenticate_user(db, request.email, request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )

    # Update last login
    user.last_login = __import__('datetime').datetime.utcnow()
    db.commit()

    # Create token
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=access_token_expires
    )

    # Get user permissions
    permissions = get_user_permissions(db, user)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "full_name": user.full_name,
            "role": user.role.name,
            "entity_id": user.entity_id,
            "permissions": permissions,
        }
    }


@router.post("/refresh")
async def refresh_token(current_user: User = Depends(lambda: None)):
    """
    Refresh JWT access token
    """
    from main import get_current_user
    current_user = get_current_user

    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": current_user.email},
        expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get("/me")
async def get_current_user_info(db: Session = Depends(get_db)):
    """Get current user information (requires auth)"""
    from main import get_current_user

    async def _get_info(user: User = Depends(get_current_user)):
        permissions = get_user_permissions(db, user)
        return {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "full_name": user.full_name,
            "role": user.role.name,
            "entity_id": user.entity_id,
            "is_active": user.is_active,
            "last_login": user.last_login,
            "permissions": permissions,
        }

    return await _get_info()
