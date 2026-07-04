from fastapi import APIRouter, Depends, HTTPException, status, Query
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from datetime import date
from database import get_db
from models import (
    Entity, EntityCategory, EntityDocument, User, EntityStatus,
    GuidelineClause, DocumentVerificationState, AuditLog
)
from auth import check_permission, require_entity_scope, RoleType
import datetime

router = APIRouter()


# ════════════════════════════════════════════════════════════════════════════
# PYDANTIC MODELS
# ════════════════════════════════════════════════════════════════════════════

class EntityCreate(BaseModel):
    name: str
    category_id: int
    employee_strength: int
    avsec_nodal_officer: str
    avsec_officer_email: EmailStr
    registration_number: str
    contract_start_date: date
    contract_end_date: date
    ncasp_compliant: bool = False
    aop_linked: bool = False


class EntityUpdate(BaseModel):
    employee_strength: int = None
    avsec_nodal_officer: str = None
    avsec_officer_email: EmailStr = None
    ncasp_compliant: bool = None
    aop_linked: bool = None
    contract_end_date: date = None


class EntitySuspend(BaseModel):
    reason: str  # Mandatory written justification


class EntityResponse(BaseModel):
    id: int
    name: str
    status: str
    employee_strength: int
    registration_number: str
    avsec_nodal_officer: str
    contract_start_date: date
    contract_end_date: date
    ncasp_compliant: bool
    aop_linked: bool
    suspension_reason: str = None
    suspension_date: datetime.datetime = None
    created_at: datetime.datetime

    class Config:
        from_attributes = True


class EntityDetailResponse(EntityResponse):
    category: dict
    documents: list
    individuals_count: int
    active_applications_count: int
    compliance_status: str


# ════════════════════════════════════════════════════════════════════════════
# ENDPOINTS
# ════════════════════════════════════════════════════════════════════════════

@router.post("/", response_model=EntityResponse)
async def create_entity(
    entity_data: EntityCreate,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Create new entity (Admin, Pass Section only)"""
    from main import get_current_user

    async def _create(user: User = Depends(get_current_user)):
        # Check permission
        if not check_permission(db, user, "entities", "create"):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied")

        # Verify category exists
        category = db.query(EntityCategory).filter(
            EntityCategory.id == entity_data.category_id
        ).first()
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")

        # Check unique registration
        existing = db.query(Entity).filter(
            Entity.registration_number == entity_data.registration_number
        ).first()
        if existing:
            raise HTTPException(status_code=400, detail="Registration number already exists")

        # Create entity
        entity = Entity(
            **entity_data.dict(),
            created_at=datetime.datetime.utcnow()
        )
        db.add(entity)
        db.flush()

        # Auto-create mandatory documents per category
        clauses = db.query(GuidelineClause).limit(1).all()
        clause = clauses[0] if clauses else None

        if category.required_documents:
            for doc_type in category.required_documents:
                doc = EntityDocument(
                    entity_id=entity.id,
                    document_type=doc_type.get("type", ""),
                    clause_id=clause.id if clause else 1,
                    verification_state=DocumentVerificationState.PENDING
                )
                db.add(doc)

        # Audit log
        audit = AuditLog(
            actor_id=user.id,
            action="created",
            entity_type="entity",
            entity_id=entity.id,
            after_values=entity_data.dict()
        )
        db.add(audit)
        db.commit()

        return entity

    return await _create()


@router.get("/", response_model=list[EntityResponse])
async def list_entities(
    status_filter: EntityStatus = Query(None),
    skip: int = Query(0),
    limit: int = Query(100),
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """List entities (role-scoped)"""
    from main import get_current_user

    async def _list(user: User = Depends(get_current_user)):
        # Check permission
        if not check_permission(db, user, "entities", "read"):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied")

        query = db.query(Entity)

        # Entity users can only see themselves
        if user.role.name == RoleType.ENTITY:
            query = query.filter(Entity.id == user.entity_id)

        if status_filter:
            query = query.filter(Entity.status == status_filter)

        entities = query.offset(skip).limit(limit).all()
        return entities

    return await _list()


@router.get("/{entity_id}", response_model=EntityDetailResponse)
async def get_entity_detail(
    entity_id: int,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Get entity details with compliance status"""
    from main import get_current_user

    async def _get(user: User = Depends(get_current_user)):
        # Check permission
        if not check_permission(db, user, "entities", "read"):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied")

        # Check scope
        if not require_entity_scope(db, user, entity_id):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Entity scope denied")

        entity = db.query(Entity).filter(Entity.id == entity_id).first()
        if not entity:
            raise HTTPException(status_code=404, detail="Entity not found")

        # Get compliance status
        documents = db.query(EntityDocument).filter(
            EntityDocument.entity_id == entity_id
        ).all()

        verified_count = sum(1 for d in documents if d.verification_state == DocumentVerificationState.VERIFIED)
        total_count = len(documents)

        compliance_status = "compliant" if verified_count == total_count else "incomplete"
        if entity.status == EntityStatus.SUSPENDED:
            compliance_status = "suspended"

        individuals_count = len(entity.individuals)
        active_applications_count = len([a for a in entity.applications if a.state != "surrendered"])

        return {
            **{k: v for k, v in entity.__dict__.items() if not k.startswith('_')},
            "category": {"id": entity.category.id, "name": entity.category.name},
            "documents": [
                {
                    "id": d.id,
                    "type": d.document_type,
                    "state": d.verification_state,
                    "expiry_date": d.expiry_date,
                    "uploaded_at": d.uploaded_at
                }
                for d in documents
            ],
            "individuals_count": individuals_count,
            "active_applications_count": active_applications_count,
            "compliance_status": compliance_status
        }

    return await _get()


@router.patch("/{entity_id}", response_model=EntityResponse)
async def update_entity(
    entity_id: int,
    entity_data: EntityUpdate,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Update entity (Admin only)"""
    from main import get_current_user

    async def _update(user: User = Depends(get_current_user)):
        if user.role.name != RoleType.ADMIN:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin only")

        entity = db.query(Entity).filter(Entity.id == entity_id).first()
        if not entity:
            raise HTTPException(status_code=404, detail="Entity not found")

        # Store before values for audit
        before_values = {
            "employee_strength": entity.employee_strength,
            "ncasp_compliant": entity.ncasp_compliant,
            "aop_linked": entity.aop_linked,
        }

        # Update fields
        update_data = entity_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            if value is not None:
                setattr(entity, field, value)

        entity.updated_at = datetime.datetime.utcnow()

        # Audit log
        audit = AuditLog(
            actor_id=user.id,
            action="updated",
            entity_type="entity",
            entity_id=entity_id,
            before_values=before_values,
            after_values=update_data
        )
        db.add(audit)
        db.commit()

        return entity

    return await _update()


@router.post("/{entity_id}/suspend")
async def suspend_entity(
    entity_id: int,
    suspend_data: EntitySuspend,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Suspend entity (Admin only, requires written justification)"""
    from main import get_current_user

    async def _suspend(user: User = Depends(get_current_user)):
        if user.role.name != RoleType.ADMIN:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin only")

        entity = db.query(Entity).filter(Entity.id == entity_id).first()
        if not entity:
            raise HTTPException(status_code=404, detail="Entity not found")

        if entity.status == EntityStatus.SUSPENDED:
            raise HTTPException(status_code=400, detail="Entity already suspended")

        # Set suspension
        entity.status = EntityStatus.SUSPENDED
        entity.suspension_reason = suspend_data.reason
        entity.suspension_date = datetime.datetime.utcnow()

        # Audit log
        audit = AuditLog(
            actor_id=user.id,
            action="suspended",
            entity_type="entity",
            entity_id=entity_id,
            after_values={
                "status": EntityStatus.SUSPENDED,
                "reason": suspend_data.reason
            }
        )
        db.add(audit)
        db.commit()

        return {
            "status": "suspended",
            "message": f"Entity suspended with reason: {suspend_data.reason}"
        }

    return await _suspend()


@router.post("/{entity_id}/unsuspend")
async def unsuspend_entity(
    entity_id: int,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Unsuspend entity (Admin only)"""
    from main import get_current_user

    async def _unsuspend(user: User = Depends(get_current_user)):
        if user.role.name != RoleType.ADMIN:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin only")

        entity = db.query(Entity).filter(Entity.id == entity_id).first()
        if not entity:
            raise HTTPException(status_code=404, detail="Entity not found")

        entity.status = EntityStatus.ACTIVE
        entity.suspension_reason = None
        entity.suspension_date = None

        # Audit log
        audit = AuditLog(
            actor_id=user.id,
            action="unsuspended",
            entity_type="entity",
            entity_id=entity_id
        )
        db.add(audit)
        db.commit()

        return {"status": "active", "message": "Entity unsuspended"}

    return await _unsuspend()


@router.get("/categories")
async def get_categories(db: Session = Depends(get_db)):
    """Get all entity categories"""
    categories = db.query(EntityCategory).all()
    return [
        {
            "id": c.id,
            "name": c.name,
            "description": c.description,
            "requires_security_programme": c.requires_security_programme,
            "min_strength_for_selfservice": c.min_strength_for_selfservice
        }
        for c in categories
    ]
