# AEP Portal — Airport Entry Pass Management System

A complete, production-grade compliance portal for managing Airport Entry Passes (AEPs) in India, governed by **BCAS AEP Guidelines 2022 (AVSEC Order 02/2022)**.

## Overview

The AEP Portal digitizes the complete AEP lifecycle:
- Entity onboarding with category-specific requirements
- Individual application submission and tracking
- Mandatory checklist verification against BCAS clauses
- Pre-committee clarification workflows
- Committee scheduling and decision recording
- Zone assignment with escalation for out-of-scope requests
- Automatic expiry reminders (30 days before expiration)
- Late surrender and penalty management
- Full audit trail for regulatory compliance

## Architecture

### Tech Stack
- **Backend:** FastAPI (Python) + SQLAlchemy ORM
- **Database:** PostgreSQL (SQLite for dev/testing)
- **Authentication:** JWT-based with role-based access control (RBAC)
- **Frontend:** React SPA (separate `/src` directory)
- **Task Scheduling:** APScheduler for automated reminders
- **Audit:** Append-only audit log table

### Key Design Principles
1. **Compliance-First:** Every rule references a BCAS clause number
2. **Audit-Trail:** Every action logged with actor, timestamp, before/after values
3. **Role-Based Access:** 5 distinct roles with granular per-vertical permissions
4. **State Machines:** Applications follow strict state transitions
5. **Mandatory Justifications:** Suspensions, penalties, and escalations require written justification

## Roles & Permissions

| Role | Scope | Key Permissions |
|------|-------|-----------------|
| **Admin** | All | Create/read/update/delete everything |
| **BCAS** | All entities | Read all, override zones, raise penalties, change assignments |
| **Pass Section** | All entities | Create entities, onboard individuals, manage checklists, schedule committees |
| **Entity** | Own organization | Self-service AEP management (if ≥15 employees) |
| **Others** | Own applications | Contractors and temporary categories |

### Permission Matrix (per vertical)
Verticals: `entities`, `individuals`, `committees`, `zones`, `documents`, `reports`, `penalties`

Each role has C/R/U/D flags per vertical, stored in `permissions` table.

---

## Database Models (Schema Overview)

### Core Tables

**Users & Roles**
- `users` — All system users with hashed passwords and role assignments
- `roles` — Role types: admin, bcas, pass_section, entity, others
- `permissions` — RBAC matrix: role + vertical + C/R/U/D flags

**Compliance & Guidelines**
- `guideline_clauses` — BCAS AEP Guidelines 2022 clauses (source of truth)
- `compliance_rules` — Configurable rules referencing clauses
- `entity_categories` — Dynamic categories (Airline, Ground Handling, Contractor, etc.)

**Organization & Personnel**
- `entities` — Organizations (airports, airlines, service providers)
  - `status`: Active, Suspended (requires justification), Archived
  - `employee_strength` — Determines self-service eligibility (≥15 = self-service)
- `entity_documents` — Dynamically required docs per category
- `individuals` — Personnel seeking AEPs
- `entity_zone_entitlements` — Contract-permitted zones

**Applications & Workflows**
- `applications` — State machine: Draft → Checklist-Pending → Clarification → Committee-Scheduled → Approved/Rejected → Issued → Surrendered
- `checklist_items` — Category-specific requirements with states: Pending → Uploaded → Verified
- `clarifications` — Pre-committee Q&A threads
- `committee_schedulings` — Application scheduled for committee review

**Zones & Access**
- `zones` — Airport secure areas (Landside, Airside, Sterile Area, etc.)
- `job_role_zone_matrix` — Job role → required zones mapping
- `zone_assignments` — Historical individual-zone assignments with validity dates
- `zone_escalations` — Out-of-scope zone requests (require letterhead PDF + text justification)

**Oversight & Compliance**
- `notifications` — User notifications with read status
- `penalties` — Late surrender and non-compliance penalties (BCAS-raised with mandatory justification)
- `audit_logs` — Append-only: actor, action, entity, before/after values, IP, timestamp

---

## Setup & Installation

### Prerequisites
- Python 3.9+
- PostgreSQL 12+ (or SQLite for development)
- Node.js 16+ (for frontend)

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env

# Edit .env with your database credentials
nano .env  # Update DATABASE_URL

# Initialize database and seed with sample data
python seed.py

# Start development server
python main.py
# Server runs on http://localhost:8000
# API docs: http://localhost:8000/api/docs
```

### 2. Database Configuration

**PostgreSQL:**
```bash
# Create database
createdb aep_portal

# Update .env
DATABASE_URL=postgresql://user:password@localhost:5432/aep_portal
```

**SQLite (Development):**
```bash
# Just use the default in .env
DATABASE_URL=sqlite:///./aep_portal.db
```

### 3. Frontend Setup

```bash
cd ../src

npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Default Credentials

After running `seed.py`, login with:
- **Email:** `admin@aepportal.in`
- **Password:** `Admin@123456`

⚠️ **IMPORTANT:** Change this password immediately in production!

---

## API Endpoints (Planned)

### Authentication
- `POST /api/auth/login` — User login
- `POST /api/auth/refresh` — Refresh JWT token
- `GET /api/auth/me` — Current user info

### Entities
- `POST /api/entities` — Create entity (Admin, Pass Section)
- `GET /api/entities` — List entities (role-scoped)
- `GET /api/entities/{id}` — Entity details with documents and status
- `PATCH /api/entities/{id}` — Update entity
- `POST /api/entities/{id}/suspend` — Suspend entity (Admin only, requires justification)

### Individuals & Applications
- `POST /api/individuals` — Create individual (Entity, Pass Section)
- `POST /api/applications` — Submit application
- `GET /api/applications/{id}` — Get application with checklist
- `POST /api/applications/{id}/checklist/{item_id}/upload` — Upload document
- `POST /api/applications/{id}/submit-clarification` — Submit clarification response
- `GET /api/applications/{id}/history` — Full state transition history

### Committees & Approvals
- `POST /api/committees` — Create committee meeting (Pass Section, Admin)
- `POST /api/committees/{id}/schedule-application` — Schedule application for review
- `POST /api/committees/{id}/record-decision` — Record approval/rejection with decision notes

### Zones
- `GET /api/zones` — List all zones
- `GET /api/job-roles/{role}/required-zones` — Get job role → zone requirements
- `POST /api/individuals/{id}/zones` — Request zone assignment
- `POST /api/individuals/{id}/zones/{zone_id}/escalate` — Escalate out-of-scope zone request (with letterhead)
- `GET /api/escalations` — List escalations (Admin, BCAS)

### Penalties & Compliance
- `POST /api/penalties` — Raise penalty (BCAS only, requires justification)
- `GET /api/penalties` — List penalties (role-scoped)
- `POST /api/penalties/{id}/entity-response` — Entity submits justification
- `GET /api/audit-logs` — Audit trail (Admin, BCAS)

### Dashboards
- `GET /api/dashboards/summary` — Role-scoped dashboard stats
- `GET /api/dashboards/expiring-passes` — Passes expiring in next 30 days
- `GET /api/dashboards/pending-clarifications` — Sent-for-clarification queue
- `GET /api/dashboards/late-surrenders` — Late surrender incidents (BCAS)

---

## Compliance Features

### Mandatory Compliance Checks
✓ **Application State Gates:** Can't move to next state until checklist is verified  
✓ **Back-Date Blocking:** Committee dates must be current or future (server-side validation)  
✓ **<15/>15 Login Rule:** Entities with <15 employees use Pass Section; ≥15 get self-service  
✓ **Zone Escalation:** Out-of-scope zones hard-blocked until letterhead + justification provided  
✓ **Suspension Enforcement:** Suspended entities can't create new applications  
✓ **Expiry Reminders:** Automated 30-day warnings before pass expiry  
✓ **Audit Trail:** Every action logged with actor, timestamp, before/after values  

### Clause References in UI
Every mandatory field, checklist item, and workflow gate displays a badge:
```
[AVSEC Order 02/2022 — Clause 3.2.1]
```
Clause references are stored in `guideline_clauses` table and linked via foreign keys.

---

## Scheduled Jobs (APScheduler)

- **Expiry Reminder Job** (daily at 6 AM): Finds passes expiring in 30 days, sends notifications
- **Late Surrender Check** (daily at 7 AM): Flags surrendered passes, notifies BCAS
- **Notification Cleanup** (weekly): Archives read notifications older than 90 days

---

## Key Workflows

### 1. Application Submission
```
Draft 
  → Checklist-Pending (all docs required)
    → Clarification (questions asked)
      → Committee-Scheduled (forward date only)
        → Approved/Rejected (committee decision)
          → Issued (pass created)
            → Surrendered (on termination/expiry)
```

### 2. Zone Escalation
```
User requests zone outside contract/role scope
  → System detects violation
    → Hard-blocks submission
      → User must upload:
         - Company letterhead PDF
         - Text justification field
      → Routed to BCAS/Committee for review
        → BCAS approves/rejects
          → If approved, zone assignment created
```

### 3. Late Surrender & Penalty
```
Pass surrendered after expiry/termination date
  → System flags as "Late Surrender"
    → Notifies BCAS in-app + email
      → BCAS raises Penalty with mandatory written justification
        → Entity given response opportunity
          → BCAS closes or escalates
            → Full trail in audit log
```

---

## Assumptions & TBD Items

⚠️ **Clause Number Mapping:** Many checklist items are seeded with `Clause TBD`. These require mapping to exact clause/sub-clause numbers from the official BCAS document before production go-live.

**TBD Clauses:**
```
- [AVSEC Order 02/2022 — Clause TBD] Security Programme Maintenance
- [AVSEC Order 02/2022 — Clause TBD] Individual Background Check
- [AVSEC Order 02/2022 — Clause TBD] Contract Renewal Process
... (see seed.py for full list)
```

**To fix:** Update `guideline_clauses` table with exact clause numbers from BCAS official guidelines.

---

## Testing

```bash
# Run pytest (tests TBD - compliance-critical rules)
pytest tests/ -v

# Test coverage
pytest --cov=. tests/
```

### Compliance Test Cases (Priority)
- ✓ Back-date rejection: Committee date must be ≥ today
- ✓ Zone escalation hard-block: Out-of-scope zones blocked until letterhead provided
- ✓ <15/>15 rule: Entities <15 employees can't create own login
- ✓ Checklist gate: Application can't advance until all items verified
- ✓ Suspended entity block: Suspended entity can't submit applications
- ✓ Audit trail: Every action recorded with before/after values

---

## Deployment Checklist

- [ ] Update `SECRET_KEY` in .env (generate with `openssl rand -hex 32`)
- [ ] Change default admin password
- [ ] Switch DATABASE_URL to production PostgreSQL
- [ ] Enable HTTPS (FastAPI + reverse proxy like Nginx)
- [ ] Configure SMTP for email notifications
- [ ] Set up APScheduler in production (Celery + Redis recommended for scale)
- [ ] Map all "Clause TBD" items to official BCAS numbers
- [ ] Run full compliance test suite
- [ ] Set up log aggregation and monitoring
- [ ] Backup and disaster recovery plan

---

## File Structure

```
backend/
├── main.py                  # FastAPI app, routing, dependencies
├── config.py                # Settings and environment vars
├── database.py              # SQLAlchemy setup
├── models.py                # All database models
├── auth.py                  # JWT, hashing, RBAC utilities
├── seed.py                  # Database initialization script
├── requirements.txt         # Python dependencies
├── .env.example              # Environment template
├── routers/                 # API route modules (by resource)
│   ├── __init__.py
│   ├── auth.py              # Login, token refresh, user info
│   ├── entities.py          # Entity CRUD and compliance
│   ├── individuals.py       # Individual and application workflows
│   ├── committees.py        # Committee scheduling and decisions
│   ├── zones.py             # Zone assignments and escalations
│   ├── penalties.py         # Penalty management
│   ├── audit.py             # Audit log viewer
│   └── dashboards.py        # Role-scoped dashboards
├── services/                # Business logic (TBD)
│   ├── __init__.py
│   ├── application_service.py
│   ├── checklist_service.py
│   ├── zone_service.py
│   └── notification_service.py
├── scheduler/               # APScheduler tasks (TBD)
│   ├── __init__.py
│   └── jobs.py
└── tests/                   # Pytest suite (TBD)
    ├── __init__.py
    ├── test_auth.py
    ├── test_compliance.py
    └── test_workflows.py
```

---

## Support

For questions or issues, refer to the BCAS AEP Guidelines 2022 (AVSEC Order 02/2022) official documentation.

---

**Last Updated:** July 2024  
**Version:** 1.0.0-alpha
