from fastapi import APIRouter, Depends, HTTPException, status, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import date, datetime
from database import get_db
from models import (
    Committee, CommitteeScheduling, Application, ApplicationState,
    User, AuditLog, RoleType, Notification, NotificationType
)
from auth import check_permission
import datetime as dt

router = APIRouter()


# ════════════════════════════════════════════════════════════════════════════
# PYDANTIC MODELS
# ════════════════════════════════════════════════════════════════════════════

class CommitteeCreate(BaseModel):
    committee_date: date
    location: str
    notes: str = None
    committee_member_ids: list[int] = []


class CommitteeScheduleRequest(BaseModel):
    committee_id: int


class CommitteeDecision(BaseModel):
    decision: str  # approved or rejected
    decision_notes: str = None


class CommitteeResponse(BaseModel):
    id: int
    committee_date: date
    location: str
    notes: str = None
    application_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


# ════════════════════════════════════════════════════════════════════════════
# ENDPOINTS
# ════════════════════════════════════════════════════════════════════════════

@router.post("/", response_model=CommitteeResponse)
async def create_committee(
    committee_data: CommitteeCreate,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Create committee meeting (Pass Section, Admin)"""
    from main import get_current_user

    async def _create(user: User = Depends(get_current_user)):
        # Check permission
        if not check_permission(db, user, "committees", "create"):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied")

        # CRITICAL COMPLIANCE: Back-date validation
        # Committee date must be today or in the future
        today = date.today()
        if committee_data.committee_date < today:
            raise HTTPException(
                status_code=400,
                detail=f"COMPLIANCE ERROR: Committee date must be today ({today}) or later. Back-dating is not permitted per AVSEC Order 02/2022."
            )

        # Create committee
        committee = Committee(
            committee_date=committee_data.committee_date,
            location=committee_data.location,
            notes=committee_data.notes,
            committee_member_ids=committee_data.committee_member_ids
        )
        db.add(committee)
        db.flush()

        # Audit log
        audit = AuditLog(
            actor_id=user.id,
            action="created",
            entity_type="committee",
            object_id=committee.id,
            after_values=committee_data.dict()
        )
        db.add(audit)
        db.commit()

        return {
            "id": committee.id,
            "committee_date": committee.committee_date,
            "location": committee.location,
            "notes": committee.notes,
            "application_count": 0,
            "created_at": committee.created_at
        }

    return await _create()


@router.get("/")
async def list_committees(
    skip: int = Query(0),
    limit: int = Query(100),
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """List all committees"""
    from main import get_current_user

    async def _list(user: User = Depends(get_current_user)):
        committees = db.query(Committee).order_by(Committee.committee_date).offset(skip).limit(limit).all()

        return [
            {
                "id": c.id,
                "committee_date": c.committee_date,
                "location": c.location,
                "notes": c.notes,
                "application_count": len(c.schedulings),
                "created_at": c.created_at
            }
            for c in committees
        ]

    return await _list()


@router.post("/schedule-application")
async def schedule_application_to_committee(
    app_id: int,
    schedule_data: CommitteeScheduleRequest,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Schedule application for committee review"""
    from main import get_current_user

    async def _schedule(user: User = Depends(get_current_user)):
        # Check permission
        if not check_permission(db, user, "committees", "update"):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied")

        # Verify application exists
        application = db.query(Application).filter(Application.id == app_id).first()
        if not application:
            raise HTTPException(status_code=404, detail="Application not found")

        # Verify committee exists
        committee = db.query(Committee).filter(Committee.id == schedule_data.committee_id).first()
        if not committee:
            raise HTTPException(status_code=404, detail="Committee not found")

        # Application must be in clarification state
        if application.state != ApplicationState.CLARIFICATION:
            raise HTTPException(
                status_code=400,
                detail=f"Application must be in clarification state. Current state: {application.state}"
            )

        # Back-date check (committee date must be today or future)
        if committee.committee_date < date.today():
            raise HTTPException(
                status_code=400,
                detail="Cannot schedule to past committee date"
            )

        # Create scheduling
        scheduling = CommitteeScheduling(
            application_id=app_id,
            committee_id=schedule_data.committee_id,
            scheduled_by_id=user.id,
            scheduled_date=dt.datetime.combine(committee.committee_date, dt.time(9, 0))
        )

        # Update application state
        application.state = ApplicationState.COMMITTEE_SCHEDULED

        # Create notification
        notification = Notification(
            user_id=application.entity.users[0].id if application.entity.users else None,
            notification_type=NotificationType.APPLICATION_STATUS,
            title="Application Scheduled for Committee Review",
            message=f"Your application {application.application_number} is scheduled for committee review on {committee.committee_date}",
            related_entity="application",
            related_id=app_id
        )

        # Audit log
        audit = AuditLog(
            actor_id=user.id,
            action="scheduled",
            entity_type="application",
            object_id=app_id,
            entity_id=application.entity_id,
            after_values={"state": ApplicationState.COMMITTEE_SCHEDULED, "committee_date": str(committee.committee_date)}
        )

        db.add(scheduling)
        db.add(notification)
        db.add(audit)
        db.commit()

        return {
            "status": "scheduled",
            "application_id": app_id,
            "committee_date": committee.committee_date,
            "message": f"Scheduled for {committee.committee_date}"
        }

    return await _schedule()


@router.post("/record-decision/{scheduling_id}")
async def record_committee_decision(
    scheduling_id: int,
    decision_data: CommitteeDecision,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Record committee decision (approval/rejection)"""
    from main import get_current_user

    async def _decide(user: User = Depends(get_current_user)):
        # Check permission
        if not check_permission(db, user, "committees", "update"):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied")

        # Verify scheduling exists
        scheduling = db.query(CommitteeScheduling).filter(
            CommitteeScheduling.id == scheduling_id
        ).first()
        if not scheduling:
            raise HTTPException(status_code=404, detail="Committee scheduling not found")

        # Validate decision
        if decision_data.decision not in ["approved", "rejected"]:
            raise HTTPException(status_code=400, detail="Decision must be 'approved' or 'rejected'")

        # Update scheduling
        scheduling.decision = decision_data.decision
        scheduling.decision_notes = decision_data.decision_notes

        # Update application state
        application = scheduling.application
        if decision_data.decision == "approved":
            application.state = ApplicationState.APPROVED
        else:
            application.state = ApplicationState.REJECTED

        # Create notification
        notification = Notification(
            user_id=application.entity.users[0].id if application.entity.users else None,
            notification_type=NotificationType.APPLICATION_STATUS,
            title=f"Application {decision_data.decision.upper()}",
            message=f"Your application {application.application_number} has been {decision_data.decision} by the committee.\nNotes: {decision_data.decision_notes}",
            related_entity="application",
            related_id=application.id
        )

        # Audit log
        audit = AuditLog(
            actor_id=user.id,
            action="decision_recorded",
            entity_type="application",
            object_id=application.id,
            entity_id=application.entity_id,
            after_values={
                "state": ApplicationState.APPROVED if decision_data.decision == "approved" else ApplicationState.REJECTED,
                "decision": decision_data.decision,
                "decision_notes": decision_data.decision_notes
            }
        )

        db.add(notification)
        db.add(audit)
        db.commit()

        return {
            "status": "success",
            "decision": decision_data.decision,
            "application_id": application.id,
            "new_state": application.state
        }

    return await _decide()


@router.get("/{committee_id}/applications")
async def get_committee_applications(
    committee_id: int,
    current_user: User = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    """Get all applications scheduled for committee"""
    from main import get_current_user

    async def _get(user: User = Depends(get_current_user)):
        schedulings = db.query(CommitteeScheduling).filter(
            CommitteeScheduling.committee_id == committee_id
        ).all()

        return [
            {
                "id": s.id,
                "application_number": s.application.application_number,
                "individual": s.application.individual.full_name,
                "entity": s.application.entity.name,
                "scheduled_date": s.scheduled_date,
                "decision": s.decision,
                "decision_notes": s.decision_notes
            }
            for s in schedulings
        ]

    return await _get()
