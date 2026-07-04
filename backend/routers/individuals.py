from fastapi import APIRouter, Depends, HTTPException, status, Query, UploadFile, File
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from datetime import date
from database import get_db
from models import (
    Individual, Entity, Application, ChecklistItem, Checklist,
    ApplicationState, ChecklistItemState, User, GuidelineClause,
    EntityCategory, AuditLog, RoleType
)
from auth import check_permission, require_entity_scope
import datetime
import os

router = APIRouter()


# ════════════════════════════════════════════════════════════════════════════
# PYDANTIC MODELS
# ════════════════════════════════════════════════════════════════════════════

class IndividualCreate(BaseModel):
    entity_id: int
    aadhar_number: str
    full_name: str
    date_of_birth: date
    job_role: str
    email: EmailStr = None
    phone: str = None


class ApplicationCreate(BaseModel):
    individual_id: int
    entity_id: int


class IndividualResponse(BaseModel):
    id: int
    full_name: str
    aadhar_number: str
    date_of_birth: date
    job_role: str
    email: str = None
    phone: str = None
    created_at: datetime.datetime

    class Config:
        from_attributes = True


class ApplicationResponse(BaseModel):
    id: int
    application_number: str
    state: str
    individual: dict
    entity: dict
    submitted_date: datetime.datetime = None
    created_at: datetime.datetime

    class Config:
        from_attributes = True


# ════════════════════════════════════════════════════════════════════════════
# ENDPOINTS
# ════════════════════════════════════════════════════════════════════════════

@router.post("/", response_model=IndividualResponse)
async def create_individual(
    individual_data: IndividualCreate,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Create individual (Entity, Pass Section)"""
    from main import get_current_user

    async def _create(user: User = Depends(get_current_user)):
        # Check permission
        if not check_permission(db, user, "individuals", "create"):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied")

        # Check scope
        if user.role.name == RoleType.ENTITY:
            if not require_entity_scope(db, user, individual_data.entity_id):
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Can only create for your entity")

        # Verify entity exists and not suspended
        entity = db.query(Entity).filter(Entity.id == individual_data.entity_id).first()
        if not entity:
            raise HTTPException(status_code=404, detail="Entity not found")

        if entity.status == "suspended":
            raise HTTPException(status_code=400, detail="Entity is suspended - cannot create individuals")

        # Check unique aadhar per entity
        existing = db.query(Individual).filter(
            Individual.entity_id == individual_data.entity_id,
            Individual.aadhar_number == individual_data.aadhar_number
        ).first()
        if existing:
            raise HTTPException(status_code=400, detail="Individual with this Aadhar already exists in entity")

        # Create individual
        individual = Individual(**individual_data.dict())
        db.add(individual)
        db.flush()

        # Audit log
        audit = AuditLog(
            actor_id=user.id,
            action="created",
            entity_type="individual",
            object_id=individual.id,
            entity_id=entity.id,
            after_values=individual_data.dict()
        )
        db.add(audit)
        db.commit()

        return individual

    return await _create()


@router.get("/{individual_id}", response_model=IndividualResponse)
async def get_individual(
    individual_id: int,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Get individual details"""
    from main import get_current_user

    async def _get(user: User = Depends(get_current_user)):
        individual = db.query(Individual).filter(Individual.id == individual_id).first()
        if not individual:
            raise HTTPException(status_code=404, detail="Individual not found")

        # Check scope
        if user.role.name == RoleType.ENTITY:
            if not require_entity_scope(db, user, individual.entity_id):
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Scope denied")

        return individual

    return await _get()


# ════════════════════════════════════════════════════════════════════════════
# APPLICATION WORKFLOWS
# ════════════════════════════════════════════════════════════════════════════

@router.post("/applications", response_model=ApplicationResponse)
async def create_application(
    app_data: ApplicationCreate,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Create AEP application with mandatory checklist"""
    from main import get_current_user

    async def _create(user: User = Depends(get_current_user)):
        # Verify individual and entity exist
        individual = db.query(Individual).filter(Individual.id == app_data.individual_id).first()
        if not individual:
            raise HTTPException(status_code=404, detail="Individual not found")

        entity = db.query(Entity).filter(Entity.id == app_data.entity_id).first()
        if not entity:
            raise HTTPException(status_code=404, detail="Entity not found")

        # Check scope
        if user.role.name == RoleType.ENTITY:
            if not require_entity_scope(db, user, entity.id):
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Scope denied")

        # Can't apply if entity suspended
        if entity.status == "suspended":
            raise HTTPException(status_code=400, detail="Entity is suspended")

        # Create application
        app_number = f"AEP-{entity.id}-{individual.id}-{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}"
        application = Application(
            individual_id=individual.id,
            entity_id=entity.id,
            application_number=app_number,
            state=ApplicationState.CHECKLIST_PENDING,
            created_by_id=user.id
        )
        db.add(application)
        db.flush()

        # Create checklist items from entity category
        category = entity.category
        clauses = db.query(GuidelineClause).limit(10).all()

        # Mandatory checklist items per category
        checklist_templates = {
            "Security Programme": "AVSEC Order 02/2022 - 2.1",
            "Company Registration": "AVSEC Order 02/2022 - 2.1",
            "Security Clearance": "AVSEC Order 02/2022 - 2.2",
            "Insurance Certificate": "AVSEC Order 02/2022 - Clause TBD",
            "Employee Background Check": "AVSEC Order 02/2022 - Clause TBD",
        }

        for template_name, clause_ref in checklist_templates.items():
            # Find matching clause
            clause = db.query(GuidelineClause).filter(
                GuidelineClause.description.ilike(f"%{template_name.lower()}%")
            ).first()

            if not clause:
                clause = clauses[0] if clauses else None

            checklist_item = ChecklistItem(
                application_id=application.id,
                item_name=template_name,
                clause_id=clause.id if clause else 1,
                state=ChecklistItemState.PENDING
            )
            db.add(checklist_item)

        # Audit log
        audit = AuditLog(
            actor_id=user.id,
            action="created",
            entity_type="application",
            object_id=application.id,
            entity_id=entity.id,
            after_values={"application_number": app_number}
        )
        db.add(audit)
        db.commit()

        return {
            "id": application.id,
            "application_number": app_number,
            "state": ApplicationState.CHECKLIST_PENDING,
            "individual": {
                "id": individual.id,
                "full_name": individual.full_name,
                "aadhar_number": individual.aadhar_number
            },
            "entity": {
                "id": entity.id,
                "name": entity.name
            },
            "submitted_date": None,
            "created_at": application.created_at
        }

    return await _create()


@router.get("/applications/{app_id}")
async def get_application_detail(
    app_id: int,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Get application with checklist items"""
    from main import get_current_user

    async def _get(user: User = Depends(get_current_user)):
        application = db.query(Application).filter(Application.id == app_id).first()
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")

        # Check scope
        if user.role.name == RoleType.ENTITY:
            if not require_entity_scope(db, user, application.entity_id):
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Scope denied")

        # Get checklist items
        checklist_items = db.query(ChecklistItem).filter(
            ChecklistItem.application_id == app_id
        ).all()

        return {
            "id": application.id,
            "application_number": application.application_number,
            "state": application.state,
            "individual": {
                "id": application.individual.id,
                "full_name": application.individual.full_name,
                "job_role": application.individual.job_role
            },
            "entity": {
                "id": application.entity.id,
                "name": application.entity.name
            },
            "checklist_items": [
                {
                    "id": item.id,
                    "item_name": item.item_name,
                    "state": item.state,
                    "clause_reference": f"{item.clause.order_no} - {item.clause.clause_number}" if item.clause else "Clause TBD",
                    "uploaded_date": item.uploaded_date,
                    "verified_date": item.verified_date
                }
                for item in checklist_items
            ],
            "submitted_date": application.submitted_date,
            "created_at": application.created_at
        }

    return await _get()


@router.post("/applications/{app_id}/upload-checklist/{item_id}")
async def upload_checklist_document(
    app_id: int,
    item_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Upload checklist document"""
    from main import get_current_user

    async def _upload(user: User = Depends(get_current_user)):
        # Verify application and checklist item exist
        application = db.query(Application).filter(Application.id == app_id).first()
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")

        checklist_item = db.query(ChecklistItem).filter(
            ChecklistItem.id == item_id,
            ChecklistItem.application_id == app_id
        ).first()
        if not checklist_item:
            raise HTTPException(status_code=404, detail="Checklist item not found")

        # Check scope
        if user.role.name == RoleType.ENTITY:
            if not require_entity_scope(db, user, application.entity_id):
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Scope denied")

        # Save file (simple implementation - use proper file storage in production)
        upload_dir = f"./uploads/app_{app_id}"
        os.makedirs(upload_dir, exist_ok=True)

        file_path = f"{upload_dir}/checklist_{item_id}_{file.filename}"
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # Update checklist item
        checklist_item.file_path = file_path
        checklist_item.state = ChecklistItemState.UPLOADED
        checklist_item.uploaded_date = datetime.datetime.utcnow()

        # Audit log
        audit = AuditLog(
            actor_id=user.id,
            action="uploaded",
            entity_type="checklist_item",
            object_id=item_id,
            entity_id=application.entity_id
        )
        db.add(audit)
        db.commit()

        return {
            "status": "uploaded",
            "file_path": file_path,
            "item_id": item_id
        }

    return await _upload()


@router.post("/applications/{app_id}/submit")
async def submit_application(
    app_id: int,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Submit application for committee review (after all checklist items uploaded)"""
    from main import get_current_user

    async def _submit(user: User = Depends(get_current_user)):
        application = db.query(Application).filter(Application.id == app_id).first()
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")

        # Verify all checklist items uploaded
        pending_items = db.query(ChecklistItem).filter(
            ChecklistItem.application_id == app_id,
            ChecklistItem.state == ChecklistItemState.PENDING
        ).count()

        if pending_items > 0:
            raise HTTPException(
                status_code=400,
                detail=f"{pending_items} checklist items still pending"
            )

        # Move to clarification state
        application.state = ApplicationState.CLARIFICATION
        application.submitted_date = datetime.datetime.utcnow()

        # Audit log
        audit = AuditLog(
            actor_id=user.id,
            action="submitted",
            entity_type="application",
            object_id=app_id,
            entity_id=application.entity_id,
            after_values={"state": "clarification"}
        )
        db.add(audit)
        db.commit()

        return {
            "status": "submitted",
            "application_id": app_id,
            "new_state": "clarification"
        }

    return await _submit()
