from database import Base
from sqlalchemy import (
    Column, Integer, String, Text, DateTime, Boolean, ForeignKey,
    Enum, JSON, Float, Date, UniqueConstraint, Index, Table
)
from sqlalchemy.orm import relationship
from datetime import datetime
import enum


# ════════════════════════════════════════════════════════════════════════════
# ENUMS - Compliance & Workflow States
# ════════════════════════════════════════════════════════════════════════════

class RoleType(str, enum.Enum):
    ADMIN = "admin"                    # Airport Operator - Super User
    BCAS = "bcas"                      # Regulatory Body - Oversight
    PASS_SECTION = "pass_section"      # Pass Section Staff
    ENTITY = "entity"                  # Entity/Organization
    OTHERS = "others"                  # Contractors, Temporary


class EntityStatus(str, enum.Enum):
    ACTIVE = "active"
    SUSPENDED = "suspended"            # Requires written justification
    ARCHIVED = "archived"              # Permanently inactive


class ApplicationState(str, enum.Enum):
    DRAFT = "draft"
    CHECKLIST_PENDING = "checklist_pending"
    CLARIFICATION = "clarification"
    COMMITTEE_SCHEDULED = "committee_scheduled"
    APPROVED = "approved"
    REJECTED = "rejected"
    ISSUED = "issued"
    SURRENDERED = "surrendered"


class ChecklistItemState(str, enum.Enum):
    PENDING = "pending"                # Not started
    UPLOADED = "uploaded"              # Document provided
    VERIFIED = "verified"              # Verified by Pass Section/BCAS
    REJECTED = "rejected"              # Requires resubmission


class DocumentVerificationState(str, enum.Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    EXPIRED = "expired"
    REJECTED = "rejected"


class ZoneAssignmentStatus(str, enum.Enum):
    REQUESTED = "requested"
    APPROVED = "approved"
    ESCALATED = "escalated"            # Requires letterhead justification
    REJECTED = "rejected"


class PenaltyStatus(str, enum.Enum):
    OPEN = "open"
    JUSTIFIED = "justified"
    CLOSED = "closed"


class NotificationType(str, enum.Enum):
    EXPIRY_REMINDER = "expiry_reminder"
    APPLICATION_STATUS = "application_status"
    LATE_SURRENDER = "late_surrender"
    PENALTY = "penalty"
    CLARIFICATION = "clarification"


# ════════════════════════════════════════════════════════════════════════════
# CORE ENTITIES
# ════════════════════════════════════════════════════════════════════════════

class GuidelineClause(Base):
    """BCAS AEP Guidelines 2022 Clauses - source of truth for compliance rules"""
    __tablename__ = "guideline_clauses"

    id = Column(Integer, primary_key=True)
    order_no = Column(String(50), unique=True)          # e.g., "AVSEC Order 02/2022"
    clause_number = Column(String(50))                  # e.g., "3.2.1"
    sub_clause = Column(String(255), nullable=True)     # e.g., "Maintenance of Records"
    description = Column(Text)                          # Full text of the clause
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    checklist_items = relationship("ChecklistItem", back_populates="clause")
    entity_documents = relationship("EntityDocument", back_populates="clause")
    rules = relationship("ComplianceRule", back_populates="clause")

    def __repr__(self):
        return f"<GuidelineClause {self.order_no} - {self.clause_number}>"


class Role(Base):
    """Role types with permission matrix"""
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True)
    name = Column(RoleType, unique=True)                 # admin, bcas, pass_section, entity, others
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    users = relationship("User", back_populates="role")
    permissions = relationship("Permission", back_populates="role")

    def __repr__(self):
        return f"<Role {self.name}>"


class Permission(Base):
    """Granular per-vertical CRUD permissions"""
    __tablename__ = "permissions"

    id = Column(Integer, primary_key=True)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    vertical = Column(String(50))                       # entities, individuals, committees, zones, documents, reports, penalties
    can_create = Column(Boolean, default=False)
    can_read = Column(Boolean, default=False)
    can_update = Column(Boolean, default=False)
    can_delete = Column(Boolean, default=False)

    # Relationships
    role = relationship("Role", back_populates="permissions")

    __table_args__ = (
        UniqueConstraint('role_id', 'vertical', name='unique_role_vertical'),
    )

    def __repr__(self):
        return f"<Permission {self.role.name}:{self.vertical}>"


class User(Base):
    """System users across all roles"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    is_active = Column(Boolean, default=True)
    entity_id = Column(Integer, ForeignKey("entities.id"), nullable=True)  # For entity users
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

    # Relationships
    role = relationship("Role", back_populates="users")
    entity = relationship("Entity", back_populates="users")
    audit_logs = relationship("AuditLog", back_populates="actor")

    __table_args__ = (
        Index('ix_users_email', 'email'),
        Index('ix_users_role_id', 'role_id'),
    )

    def __repr__(self):
        return f"<User {self.email} ({self.role.name})>"


class EntityCategory(Base):
    """Dynamic entity categories with category-specific document requirements"""
    __tablename__ = "entity_categories"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)              # Aviation, Airport, Logistics, etc.
    description = Column(Text)
    required_documents = Column(JSON)                    # Structured schema of required docs
    requires_security_programme = Column(Boolean, default=True)
    requires_security_clearance = Column(Boolean, default=True)
    min_strength_for_selfservice = Column(Integer, default=15)  # Below this, Pass Section manages
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    entities = relationship("Entity", back_populates="category")

    def __repr__(self):
        return f"<EntityCategory {self.name}>"


class Entity(Base):
    """Organizations applying for AEPs (airports, airlines, service providers)"""
    __tablename__ = "entities"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    category_id = Column(Integer, ForeignKey("entity_categories.id"), nullable=False)
    status = Column(EntityStatus, default=EntityStatus.ACTIVE)
    employee_strength = Column(Integer, nullable=False)           # Determines self-service eligibility
    avsec_nodal_officer = Column(String(255), nullable=False)
    avsec_officer_email = Column(String(255), nullable=False)
    registration_number = Column(String(100), unique=True, nullable=False)
    ncasp_compliant = Column(Boolean, default=False)
    aop_linked = Column(Boolean, default=False)
    contract_start_date = Column(Date, nullable=False)
    contract_end_date = Column(Date, nullable=False)
    suspension_reason = Column(Text, nullable=True)
    suspension_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    category = relationship("EntityCategory", back_populates="entities")
    documents = relationship("EntityDocument", back_populates="entity", cascade="all, delete-orphan")
    individuals = relationship("Individual", back_populates="entity", cascade="all, delete-orphan")
    zone_assignments = relationship("EntityZoneEntitlement", back_populates="entity", cascade="all, delete-orphan")
    users = relationship("User", back_populates="entity")
    applications = relationship("Application", back_populates="entity")
    audit_logs = relationship("AuditLog", foreign_keys="AuditLog.entity_id", back_populates="entity")

    __table_args__ = (
        Index('ix_entities_category_id', 'category_id'),
        Index('ix_entities_status', 'status'),
    )

    def __repr__(self):
        return f"<Entity {self.name}>"


class EntityDocument(Base):
    """Dynamic documents per entity category (Security Programme, Clearance, Contracts, etc.)"""
    __tablename__ = "entity_documents"

    id = Column(Integer, primary_key=True)
    entity_id = Column(Integer, ForeignKey("entities.id"), nullable=False)
    clause_id = Column(Integer, ForeignKey("guideline_clauses.id"), nullable=False)
    document_type = Column(String(255))                 # e.g., "Security Programme", "Contract"
    file_path = Column(String(500))
    verification_state = Column(DocumentVerificationState, default=DocumentVerificationState.PENDING)
    verified_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    verified_at = Column(DateTime, nullable=True)
    expiry_date = Column(Date, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    entity = relationship("Entity", back_populates="documents")
    clause = relationship("GuidelineClause", back_populates="entity_documents")
    verified_by = relationship("User", foreign_keys=[verified_by_id])

    __table_args__ = (
        Index('ix_entity_documents_entity_id', 'entity_id'),
        Index('ix_entity_documents_verification_state', 'verification_state'),
    )

    def __repr__(self):
        return f"<EntityDocument {self.entity.name}:{self.document_type}>"


class Individual(Base):
    """Personnel requiring AEPs"""
    __tablename__ = "individuals"

    id = Column(Integer, primary_key=True)
    entity_id = Column(Integer, ForeignKey("entities.id"), nullable=False)
    aadhar_number = Column(String(12), unique=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    date_of_birth = Column(Date, nullable=False)
    job_role = Column(String(255), nullable=False)                # Driver, Security Officer, Handler, etc.
    email = Column(String(255), nullable=True)
    phone = Column(String(20), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    entity = relationship("Entity", back_populates="individuals")
    applications = relationship("Application", back_populates="individual")
    zone_assignments = relationship("ZoneAssignment", back_populates="individual")

    __table_args__ = (
        UniqueConstraint('entity_id', 'aadhar_number', name='unique_entity_aadhar'),
        Index('ix_individuals_entity_id', 'entity_id'),
    )

    def __repr__(self):
        return f"<Individual {self.full_name} ({self.aadhar_number})>"


class JobRoleZoneMatrix(Base):
    """Defines which zones are needed for each job role"""
    __tablename__ = "job_role_zone_matrix"

    id = Column(Integer, primary_key=True)
    job_role = Column(String(255), nullable=False)      # e.g., "Baggage Handler"
    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False)
    required = Column(Boolean, default=True)             # Is this zone required for this role?
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    zone = relationship("Zone", back_populates="job_roles")

    __table_args__ = (
        UniqueConstraint('job_role', 'zone_id', name='unique_role_zone'),
    )

    def __repr__(self):
        return f"<JobRoleZoneMatrix {self.job_role}→{self.zone.name}>"


class Zone(Base):
    """Secure zones at airports"""
    __tablename__ = "zones"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), unique=True)              # e.g., "Landside", "Airside", "Sterile Area"
    code = Column(String(50), unique=True)
    description = Column(Text)
    risk_level = Column(String(50))                      # low, medium, high
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    job_roles = relationship("JobRoleZoneMatrix", back_populates="zone")
    entity_entitlements = relationship("EntityZoneEntitlement", back_populates="zone")
    assignments = relationship("ZoneAssignment", back_populates="zone")

    def __repr__(self):
        return f"<Zone {self.name} ({self.code})>"


class EntityZoneEntitlement(Base):
    """Zones permitted per entity per contract"""
    __tablename__ = "entity_zone_entitlements"

    id = Column(Integer, primary_key=True)
    entity_id = Column(Integer, ForeignKey("entities.id"), nullable=False)
    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False)
    permitted_from = Column(Date, nullable=False)
    permitted_until = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    entity = relationship("Entity", back_populates="zone_assignments")
    zone = relationship("Zone", back_populates="entity_entitlements")

    __table_args__ = (
        UniqueConstraint('entity_id', 'zone_id', name='unique_entity_zone_entitlement'),
    )

    def __repr__(self):
        return f"<EntityZoneEntitlement {self.entity.name}→{self.zone.name}>"


class Application(Base):
    """AEP Application with state machine workflow"""
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True)
    individual_id = Column(Integer, ForeignKey("individuals.id"), nullable=False)
    entity_id = Column(Integer, ForeignKey("entities.id"), nullable=False)
    application_number = Column(String(50), unique=True)
    state = Column(ApplicationState, default=ApplicationState.DRAFT)
    submitted_date = Column(DateTime, nullable=True)
    created_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    individual = relationship("Individual", back_populates="applications")
    entity = relationship("Entity", back_populates="applications")
    created_by = relationship("User", foreign_keys=[created_by_id])
    checklists = relationship("ChecklistItem", back_populates="application", cascade="all, delete-orphan")
    clarifications = relationship("Clarification", back_populates="application", cascade="all, delete-orphan")
    committee_scheduling = relationship("CommitteeScheduling", back_populates="application")
    zone_escalations = relationship("ZoneEscalation", back_populates="application")

    __table_args__ = (
        Index('ix_applications_individual_id', 'individual_id'),
        Index('ix_applications_state', 'state'),
    )

    def __repr__(self):
        return f"<Application {self.application_number} ({self.state})>"


class Checklist(Base):
    """Category-specific checklist templates"""
    __tablename__ = "checklists"

    id = Column(Integer, primary_key=True)
    category_id = Column(Integer, ForeignKey("entity_categories.id"), nullable=False)
    name = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    items = relationship("ChecklistItem", back_populates="checklist")

    def __repr__(self):
        return f"<Checklist {self.name}>"


class ChecklistItem(Base):
    """Individual checklist requirements"""
    __tablename__ = "checklist_items"

    id = Column(Integer, primary_key=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    clause_id = Column(Integer, ForeignKey("guideline_clauses.id"), nullable=False)
    item_name = Column(String(255))
    state = Column(ChecklistItemState, default=ChecklistItemState.PENDING)
    file_path = Column(String(500), nullable=True)
    uploaded_date = Column(DateTime, nullable=True)
    verified_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    verified_date = Column(DateTime, nullable=True)
    rejection_reason = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    application = relationship("Application", back_populates="checklists")
    clause = relationship("GuidelineClause", back_populates="checklist_items")
    verified_by = relationship("User", foreign_keys=[verified_by_id])

    __table_args__ = (
        Index('ix_checklist_items_application_id', 'application_id'),
        Index('ix_checklist_items_state', 'state'),
    )

    def __repr__(self):
        return f"<ChecklistItem {self.item_name} ({self.state})>"


class Clarification(Base):
    """Pre-committee clarification requests"""
    __tablename__ = "clarifications"

    id = Column(Integer, primary_key=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    raised_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    checklist_item_id = Column(Integer, ForeignKey("checklist_items.id"), nullable=True)
    query_text = Column(Text, nullable=False)
    response_text = Column(Text, nullable=True)
    is_resolved = Column(Boolean, default=False)
    raised_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

    # Relationships
    application = relationship("Application", back_populates="clarifications")
    raised_by = relationship("User", foreign_keys=[raised_by_id])

    __table_args__ = (
        Index('ix_clarifications_application_id', 'application_id'),
    )

    def __repr__(self):
        return f"<Clarification {self.id}>"


class Committee(Base):
    """Committee meetings for AEP approvals"""
    __tablename__ = "committees"

    id = Column(Integer, primary_key=True)
    committee_date = Column(Date, nullable=False)
    location = Column(String(255), nullable=False)
    committee_member_ids = Column(JSON)                 # List of User IDs
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    schedulings = relationship("CommitteeScheduling", back_populates="committee")

    def __repr__(self):
        return f"<Committee {self.committee_date}>"


class CommitteeScheduling(Base):
    """Application scheduled for committee review"""
    __tablename__ = "committee_schedulings"

    id = Column(Integer, primary_key=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    committee_id = Column(Integer, ForeignKey("committees.id"), nullable=False)
    scheduled_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scheduled_date = Column(DateTime, nullable=False)
    decision = Column(String(50), nullable=True)        # approved, rejected
    decision_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    application = relationship("Application", back_populates="committee_scheduling")
    committee = relationship("Committee", back_populates="schedulings")
    scheduled_by = relationship("User", foreign_keys=[scheduled_by_id])

    __table_args__ = (
        Index('ix_committee_schedulings_application_id', 'application_id'),
    )

    def __repr__(self):
        return f"<CommitteeScheduling {self.application.application_number}>"


class ZoneAssignment(Base):
    """Historical zone assignments for individuals"""
    __tablename__ = "zone_assignments"

    id = Column(Integer, primary_key=True)
    individual_id = Column(Integer, ForeignKey("individuals.id"), nullable=False)
    zone_id = Column(Integer, ForeignKey("zones.id"), nullable=False)
    assigned_date = Column(DateTime, default=datetime.utcnow)
    valid_from = Column(Date, nullable=False)
    valid_until = Column(Date, nullable=False)
    status = Column(ZoneAssignmentStatus, default=ZoneAssignmentStatus.APPROVED)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    individual = relationship("Individual", back_populates="zone_assignments")
    zone = relationship("Zone", back_populates="assignments")

    __table_args__ = (
        Index('ix_zone_assignments_individual_id', 'individual_id'),
        Index('ix_zone_assignments_zone_id', 'zone_id'),
    )

    def __repr__(self):
        return f"<ZoneAssignment {self.individual.full_name}→{self.zone.name}>"


class ZoneEscalation(Base):
    """Zone requests that exceed contract/role scope (require letterhead justification)"""
    __tablename__ = "zone_escalations"

    id = Column(Integer, primary_key=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    requested_zones = Column(JSON)                      # List of zone IDs
    justification_text = Column(Text, nullable=False)  # Why zones are needed
    letterhead_file_path = Column(String(500))         # Company letterhead PDF
    status = Column(ZoneAssignmentStatus, default=ZoneAssignmentStatus.ESCALATED)
    reviewed_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    review_decision = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    application = relationship("Application", back_populates="zone_escalations")
    reviewed_by = relationship("User", foreign_keys=[reviewed_by_id])

    def __repr__(self):
        return f"<ZoneEscalation {self.id}>"


class Penalty(Base):
    """Penalties for late surrender or non-compliance"""
    __tablename__ = "penalties"

    id = Column(Integer, primary_key=True)
    entity_id = Column(Integer, ForeignKey("entities.id"), nullable=False)
    reason = Column(String(255))                        # late_surrender, non_compliance
    incident_date = Column(Date, nullable=False)
    raised_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)  # BCAS user
    justification = Column(Text, nullable=False)       # BCAS written justification (mandatory)
    entity_response = Column(Text, nullable=True)      # Entity justification
    status = Column(PenaltyStatus, default=PenaltyStatus.OPEN)
    amount = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    entity = relationship("Entity")
    raised_by = relationship("User", foreign_keys=[raised_by_id])

    def __repr__(self):
        return f"<Penalty {self.entity.name}:{self.reason}>"


class Notification(Base):
    """User notifications and audit trail"""
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    notification_type = Column(NotificationType, nullable=False)
    title = Column(String(255))
    message = Column(Text)
    related_entity = Column(String(100), nullable=True)  # entity, application, penalty
    related_id = Column(Integer, nullable=True)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User")

    __table_args__ = (
        Index('ix_notifications_user_id', 'user_id'),
    )

    def __repr__(self):
        return f"<Notification {self.notification_type}>"


class AuditLog(Base):
    """Append-only audit trail for compliance"""
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True)
    actor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    action = Column(String(255))                        # created, updated, verified, rejected, approved
    entity_type = Column(String(100))                   # user, entity, application, etc.
    entity_id = Column(Integer, nullable=True)
    object_id = Column(Integer, nullable=True)          # Foreign key to actual object
    before_values = Column(JSON, nullable=True)         # Previous state
    after_values = Column(JSON, nullable=True)          # Current state
    ip_address = Column(String(45), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    actor = relationship("User", back_populates="audit_logs", foreign_keys=[actor_id])
    entity = relationship("Entity", foreign_keys=[entity_id], back_populates="audit_logs")

    __table_args__ = (
        Index('ix_audit_logs_actor_id', 'actor_id'),
        Index('ix_audit_logs_created_at', 'created_at'),
        Index('ix_audit_logs_entity_type', 'entity_type'),
    )

    def __repr__(self):
        return f"<AuditLog {self.action} by {self.actor.email}>"


class ComplianceRule(Base):
    """Configurable compliance rules"""
    __tablename__ = "compliance_rules"

    id = Column(Integer, primary_key=True)
    clause_id = Column(Integer, ForeignKey("guideline_clauses.id"), nullable=False)
    rule_name = Column(String(255))
    enforcement_level = Column(String(50))              # mandatory, recommended
    check_function = Column(String(500))                # Name of check function to execute
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    clause = relationship("GuidelineClause", back_populates="rules")

    def __repr__(self):
        return f"<ComplianceRule {self.rule_name}>"
