from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from config import settings
from database import get_db, engine
from models import Base, User
from auth import decode_token, RoleType
from datetime import timedelta
import uvicorn

# Create tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Airport Entry Pass (AEP) Management Portal - BCAS Compliant",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ════════════════════════════════════════════════════════════════════════════
# DEPENDENCY INJECTIONS
# ════════════════════════════════════════════════════════════════════════════

async def get_current_user(
    authorization: str = None,
    db: Session = Depends(get_db)
) -> User:
    """Get currently authenticated user from JWT token"""
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication scheme",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    email = payload.get("sub")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive",
        )

    return user


async def require_role(*roles: RoleType):
    """Dependency to check user has one of required roles"""
    async def check_role(current_user: User = Depends(get_current_user)):
        if current_user.role.name not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions",
            )
        return current_user
    return check_role


# ════════════════════════════════════════════════════════════════════════════
# HEALTH CHECK
# ════════════════════════════════════════════════════════════════════════════

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "app": settings.app_name,
        "version": settings.app_version,
    }


# ════════════════════════════════════════════════════════════════════════════
# IMPORT AND INCLUDE ROUTERS
# ════════════════════════════════════════════════════════════════════════════

from routers import auth, entities, individuals, committees

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(entities.router, prefix="/api/entities", tags=["Entities"])
app.include_router(individuals.router, prefix="/api/individuals", tags=["Individuals"])
app.include_router(committees.router, prefix="/api/committees", tags=["Committees"])

# Additional routers (Phase 3+)
# from routers import zones, penalties, audit, dashboards
# app.include_router(zones.router, prefix="/api/zones", tags=["Zones"])
# app.include_router(penalties.router, prefix="/api/penalties", tags=["Penalties"])
# app.include_router(audit.router, prefix="/api/audit", tags=["Audit"])
# app.include_router(dashboards.router, prefix="/api/dashboards", tags=["Dashboards"])


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.environment == "development"
    )
