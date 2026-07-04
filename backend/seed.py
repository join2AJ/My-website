"""
Database Seeding Script
Initializes the AEP Portal with:
1. BCAS AEP Guidelines 2022 clauses
2. User roles and permissions
3. Sample zones
4. Entity categories
5. Admin user account
"""

from database import SessionLocal, engine
from models import (
    Base, GuidelineClause, Role, Permission, User, Zone, EntityCategory,
    RoleType, JobRoleZoneMatrix
)
from auth import hash_password
from sqlalchemy.orm import Session


def seed_guideline_clauses(db: Session):
    """Seed BCAS AEP Guidelines 2022 clauses"""
    clauses = [
        {
            "order_no": "AVSEC Order 02/2022",
            "clause_number": "2.1",
            "sub_clause": "Entity Registration and Security Programme Requirement",
            "description": "Every entity applying for AEP must register with AAI and maintain an approved Security Programme as per AVSEC standards.",
        },
        {
            "order_no": "AVSEC Order 02/2022",
            "clause_number": "2.2",
            "sub_clause": "Security Clearance Requirement",
            "description": "All individuals seeking AEP must have cleared security clearance from BCAS.",
        },
        {
            "order_no": "AVSEC Order 02/2022",
            "clause_number": "3.1",
            "sub_clause": "Checklist Verification",
            "description": "All required documents must be uploaded and verified before application can proceed to committee stage.",
        },
        {
            "order_no": "AVSEC Order 02/2022",
            "clause_number": "3.2",
            "sub_clause": "Committee Approval",
            "description": "Final approval of AEP requires endorsement from the Airport Security Committee.",
        },
        {
            "order_no": "AVSEC Order 02/2022",
            "clause_number": "4.1",
            "sub_clause": "Zone Assignment",
            "description": "Individuals can only access zones justified by their job role and permitted in entity's contract.",
        },
        {
            "order_no": "AVSEC Order 02/2022",
            "clause_number": "5.1",
            "sub_clause": "Pass Renewal and Expiry",
            "description": "AEPs must be renewed annually. System sends automated reminders 30 days before expiry.",
        },
        {
            "order_no": "AVSEC Order 02/2022",
            "clause_number": "6.1",
            "sub_clause": "Late Surrender and Penalties",
            "description": "Late surrender of AEP may result in penalties. Entity must provide justification through portal.",
        },
        {
            "order_no": "AVSEC Order 02/2022",
            "clause_number": "6.2",
            "sub_clause": "Entity Suspension for Non-Compliance",
            "description": "Entities with significant compliance gaps can be suspended pending remediation. Requires written justification.",
        },
    ]

    for clause_data in clauses:
        existing = db.query(GuidelineClause).filter(
            GuidelineClause.clause_number == clause_data["clause_number"]
        ).first()
        if not existing:
            clause = GuidelineClause(**clause_data)
            db.add(clause)

    db.commit()
    print("✓ Guideline clauses seeded")


def seed_roles(db: Session):
    """Seed user roles"""
    role_data = [
        {
            "name": RoleType.ADMIN,
            "description": "Airport Operator - Full system access"
        },
        {
            "name": RoleType.BCAS,
            "description": "BCAS Regulatory Body - Oversight and approval authority"
        },
        {
            "name": RoleType.PASS_SECTION,
            "description": "Pass Section Staff - Processes AEP applications"
        },
        {
            "name": RoleType.ENTITY,
            "description": "Entity/Organization - Self-service AEP management"
        },
        {
            "name": RoleType.OTHERS,
            "description": "Contractors and Temporary Categories"
        },
    ]

    for data in role_data:
        existing = db.query(Role).filter(Role.name == data["name"]).first()
        if not existing:
            role = Role(**data)
            db.add(role)

    db.commit()
    print("✓ Roles seeded")


def seed_permissions(db: Session):
    """Seed role-based permissions"""
    permissions = [
        # Admin - Full access
        {"role": RoleType.ADMIN, "vertical": "entities", "create": True, "read": True, "update": True, "delete": True},
        {"role": RoleType.ADMIN, "vertical": "individuals", "create": True, "read": True, "update": True, "delete": True},
        {"role": RoleType.ADMIN, "vertical": "committees", "create": True, "read": True, "update": True, "delete": True},
        {"role": RoleType.ADMIN, "vertical": "zones", "create": True, "read": True, "update": True, "delete": True},
        {"role": RoleType.ADMIN, "vertical": "documents", "create": True, "read": True, "update": True, "delete": True},
        {"role": RoleType.ADMIN, "vertical": "reports", "create": True, "read": True, "update": True, "delete": True},
        {"role": RoleType.ADMIN, "vertical": "penalties", "create": True, "read": True, "update": True, "delete": True},

        # BCAS - Read all, override zone assignments, raise queries and penalties
        {"role": RoleType.BCAS, "vertical": "entities", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.BCAS, "vertical": "individuals", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.BCAS, "vertical": "committees", "create": False, "read": True, "update": True, "delete": False},
        {"role": RoleType.BCAS, "vertical": "zones", "create": False, "read": True, "update": True, "delete": False},
        {"role": RoleType.BCAS, "vertical": "documents", "create": False, "read": True, "update": True, "delete": False},
        {"role": RoleType.BCAS, "vertical": "reports", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.BCAS, "vertical": "penalties", "create": True, "read": True, "update": True, "delete": False},

        # Pass Section - Create entities, individuals, manage checklists
        {"role": RoleType.PASS_SECTION, "vertical": "entities", "create": True, "read": True, "update": False, "delete": False},
        {"role": RoleType.PASS_SECTION, "vertical": "individuals", "create": True, "read": True, "update": True, "delete": False},
        {"role": RoleType.PASS_SECTION, "vertical": "committees", "create": True, "read": True, "update": True, "delete": False},
        {"role": RoleType.PASS_SECTION, "vertical": "zones", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.PASS_SECTION, "vertical": "documents", "create": False, "read": True, "update": True, "delete": False},
        {"role": RoleType.PASS_SECTION, "vertical": "reports", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.PASS_SECTION, "vertical": "penalties", "create": False, "read": True, "update": False, "delete": False},

        # Entity - Self-service for their own data
        {"role": RoleType.ENTITY, "vertical": "entities", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.ENTITY, "vertical": "individuals", "create": True, "read": True, "update": True, "delete": False},
        {"role": RoleType.ENTITY, "vertical": "committees", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.ENTITY, "vertical": "zones", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.ENTITY, "vertical": "documents", "create": True, "read": True, "update": True, "delete": False},
        {"role": RoleType.ENTITY, "vertical": "reports", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.ENTITY, "vertical": "penalties", "create": False, "read": True, "update": True, "delete": False},

        # Others - Basic access
        {"role": RoleType.OTHERS, "vertical": "entities", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.OTHERS, "vertical": "individuals", "create": True, "read": True, "update": True, "delete": False},
        {"role": RoleType.OTHERS, "vertical": "committees", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.OTHERS, "vertical": "zones", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.OTHERS, "vertical": "documents", "create": True, "read": True, "update": True, "delete": False},
        {"role": RoleType.OTHERS, "vertical": "reports", "create": False, "read": True, "update": False, "delete": False},
        {"role": RoleType.OTHERS, "vertical": "penalties", "create": False, "read": True, "update": True, "delete": False},
    ]

    for perm in permissions:
        role_name = perm.pop("role")
        role = db.query(Role).filter(Role.name == role_name).first()

        existing = db.query(Permission).filter(
            Permission.role_id == role.id,
            Permission.vertical == perm["vertical"]
        ).first()

        if not existing:
            permission = Permission(role_id=role.id, **perm)
            db.add(permission)

    db.commit()
    print("✓ Permissions seeded")


def seed_zones(db: Session):
    """Seed airport security zones"""
    zones = [
        {"name": "Landside", "code": "LS", "description": "Public area", "risk_level": "low"},
        {"name": "Airside", "code": "AS", "description": "Aircraft parking and taxiway area", "risk_level": "high"},
        {"name": "Sterile Area", "code": "SA", "description": "Post-security checkpoint", "risk_level": "high"},
        {"name": "Cargo Terminal", "code": "CT", "description": "Cargo handling area", "risk_level": "medium"},
        {"name": "Maintenance Area", "code": "MA", "description": "Aircraft maintenance zone", "risk_level": "high"},
        {"name": "Security Control Room", "code": "SCR", "description": "CCTV and security monitoring", "risk_level": "high"},
    ]

    for zone_data in zones:
        existing = db.query(Zone).filter(Zone.code == zone_data["code"]).first()
        if not existing:
            zone = Zone(**zone_data)
            db.add(zone)

    db.commit()
    print("✓ Zones seeded")


def seed_entity_categories(db: Session):
    """Seed entity categories with dynamic document requirements"""
    categories = [
        {
            "name": "Airline",
            "description": "Scheduled and charter airlines",
            "requires_security_programme": True,
            "requires_security_clearance": True,
            "min_strength_for_selfservice": 15,
            "required_documents": [
                {"type": "Security Programme", "mandatory": True, "expiry_months": 24},
                {"type": "Company Registration", "mandatory": True, "expiry_months": None},
                {"type": "Insurance Certificate", "mandatory": True, "expiry_months": 12},
            ]
        },
        {
            "name": "Ground Handling",
            "description": "Ground services and baggage handlers",
            "requires_security_programme": True,
            "requires_security_clearance": True,
            "min_strength_for_selfservice": 15,
            "required_documents": [
                {"type": "Security Programme", "mandatory": True, "expiry_months": 24},
                {"type": "Company Registration", "mandatory": True, "expiry_months": None},
            ]
        },
        {
            "name": "Airport Contractor",
            "description": "Construction, maintenance, and facility contractors",
            "requires_security_programme": False,
            "requires_security_clearance": True,
            "min_strength_for_selfservice": 15,
            "required_documents": [
                {"type": "Company Registration", "mandatory": True, "expiry_months": None},
                {"type": "Contract Agreement", "mandatory": True, "expiry_months": None},
            ]
        },
    ]

    for cat_data in categories:
        existing = db.query(EntityCategory).filter(EntityCategory.name == cat_data["name"]).first()
        if not existing:
            category = EntityCategory(**cat_data)
            db.add(category)

    db.commit()
    print("✓ Entity categories seeded")


def seed_job_role_zone_matrix(db: Session):
    """Seed job role → zone access matrix"""
    # Get zones
    zones = db.query(Zone).all()
    zone_map = {z.code: z for z in zones}

    job_roles = [
        {"role": "Baggage Handler", "zones": ["LS", "AS", "CT"]},
        {"role": "Security Officer", "zones": ["LS", "AS", "SA", "SCR"]},
        {"role": "Aircraft Maintenance", "zones": ["AS", "MA"]},
        {"role": "Cargo Handler", "zones": ["CT"]},
        {"role": "Catering Staff", "zones": ["LS", "AS"]},
        {"role": "Cleaner", "zones": ["LS", "AS"]},
    ]

    for job_data in job_roles:
        for zone_code in job_data["zones"]:
            zone = zone_map.get(zone_code)
            if zone:
                existing = db.query(JobRoleZoneMatrix).filter(
                    JobRoleZoneMatrix.job_role == job_data["role"],
                    JobRoleZoneMatrix.zone_id == zone.id
                ).first()

                if not existing:
                    matrix = JobRoleZoneMatrix(
                        job_role=job_data["role"],
                        zone_id=zone.id,
                        required=True
                    )
                    db.add(matrix)

    db.commit()
    print("✓ Job role-zone matrix seeded")


def seed_admin_user(db: Session):
    """Seed default admin user"""
    admin_role = db.query(Role).filter(Role.name == RoleType.ADMIN).first()

    existing = db.query(User).filter(User.email == "admin@aepportal.in").first()
    if not existing:
        admin = User(
            email="admin@aepportal.in",
            username="admin",
            full_name="System Administrator",
            hashed_password=hash_password("Admin@123456"),  # Change in production!
            role_id=admin_role.id,
            is_active=True,
        )
        db.add(admin)
        db.commit()
        print("✓ Admin user seeded (admin@aepportal.in / Admin@123456)")


def seed_database():
    """Run all seed operations"""
    db = SessionLocal()
    try:
        print("\n🌱 Seeding AEP Portal Database...\n")
        seed_guideline_clauses(db)
        seed_roles(db)
        seed_permissions(db)
        seed_zones(db)
        seed_entity_categories(db)
        seed_job_role_zone_matrix(db)
        seed_admin_user(db)
        print("\n✅ Database seeding completed!\n")
    except Exception as e:
        print(f"\n❌ Seeding failed: {e}\n")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    # Create all tables first
    Base.metadata.create_all(bind=engine)
    # Then seed
    seed_database()
