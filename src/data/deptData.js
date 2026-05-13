// 21 airport departments with Regulatory / Standards / Cyber compliance items
export const departments = [
  {
    id:'atc', name:'ATC', full:'Air Traffic Control', icon:'🗼', color:'#1249C0', tag:'DGCA · AAI',
    regulatory:[
      {text:'DGCA Watch Duty Time Limitation — ATCOs at 57 airports (CAR mandated)',ref:'DGCA/CAR'},
      {text:'DGCA CPDLC (Controller-Pilot Data Link) implementation',ref:'DGCA 2025'},
      {text:'Performance-Based Navigation (PBN) standards compliance',ref:'DGCA/ICAO'},
      {text:'ATC simulator currency and software version compliance',ref:'DGCA'},
      {text:'CNS (Communication, Navigation, Surveillance) systems audit',ref:'DGCA'},
      {text:'Runway visual aids compliance — markings, lighting, PAPI (daily checks)',ref:'DGCA CAR'},
      {text:'NOTAM issuance and AFTN network compliance',ref:'AAI/DGCA'},
      {text:'ICAO Annex 11 — Air Traffic Services implementation record',ref:'ICAO A11'},
    ],
    standards:[
      {text:'ICAO PANS-ATM (Doc 4444) — procedures for air navigation services',ref:'ICAO'},
      {text:'ISO 9001 — Quality Management for ATC operations',ref:'ISO 9001'},
      {text:'ICAO Doc 9859 — Safety Management Manual alignment',ref:'ICAO Doc 9859'},
    ],
    cyber:[
      {text:'CERT-In 6-hour reporting: ATC system cyber incident or disruption',ref:'CERT-In 2025'},
      {text:'ICAO Annex 17 §4.9.1 — cybersecurity safeguards for ATC ICT systems',ref:'ICAO A17'},
      {text:'BCAS cyber threat advisory compliance (UAV, cyber, CBRN — 2024)',ref:'BCAS 2024'},
      {text:'180-day security log retention for ATC systems',ref:'CERT-In 2025'},
    ],
  },
  {
    id:'aocc', name:'AOCC', full:'Airport Operations Control Centre', icon:'🖥️', color:'#1A5FE8', tag:'DGCA · AAI · AERA',
    regulatory:[
      {text:'AAI Operational Circulars — AOCC standard operating procedures',ref:'AAI'},
      {text:'AERA Performance Standards 2025 — AOCC response time KPIs',ref:'AERA 2025'},
      {text:'Slot coordination compliance — seasonal schedule (Summer/Winter)',ref:'DGCA/AAI'},
      {text:'AirSewa portal — passenger complaint SLA (24-hour resolution)',ref:'MoCA'},
      {text:'DGCA surveillance findings — ramp safety, vehicle speed governors',ref:'DGCA'},
      {text:'OMDA concession agreement — operational KPI reporting to AAI',ref:'AAI/OMDA'},
      {text:'Emergency/contingency operations plan documentation',ref:'DGCA'},
    ],
    standards:[
      {text:'ACI ASQ (Airport Service Quality) — operational standards',ref:'ACI'},
      {text:'ISO 9001 — Quality Management System for operations',ref:'ISO 9001'},
      {text:'ICAO Annex 14 — Aerodrome Standards and Recommended Practices',ref:'ICAO A14'},
    ],
    cyber:[
      {text:'AOCC system (FIDS, BMS, SCADA) cyber incident reporting — CERT-In 6hr',ref:'CERT-In'},
      {text:'Network segmentation compliance for operational technology systems',ref:'ICAO A17'},
      {text:'Access log retention 180 days — all AOCC system access',ref:'CERT-In 2025'},
    ],
  },
  {
    id:'ismc', name:'ISMC', full:'Integrated Security Management Centre', icon:'🔒', color:'#5B21B6', tag:'BCAS · CISF · MHA',
    regulatory:[
      {text:'BCAS CCTV monitoring — live monitoring mandatory (2024/25 advisory)',ref:'BCAS 2025'},
      {text:'BCAS CACS (Centralised Access Control System) — real-time biometric logs to NIC',ref:'BCAS/ECIL'},
      {text:'AVSEC Order implementation — tracking from issuance to closure',ref:'BCAS'},
      {text:'Perimeter security audit — intrusion detection system coverage',ref:'BCAS'},
      {text:'BCAS QRT (Quick Reaction Team) deployment readiness documentation',ref:'BCAS'},
      {text:'CISF joint security exercise records — monthly + per-incident',ref:'CISF/MHA'},
      {text:'Anti-hijack rules compliance — BCAS revised framework',ref:'BCAS'},
      {text:'CBRN threat protocol — BCAS 2024 expanded advisory',ref:'BCAS 2024'},
      {text:'UAV/drone threat response protocol — BCAS 2024',ref:'BCAS 2024'},
    ],
    standards:[
      {text:'ISO 27001 — ISMS for all ISMC systems and data',ref:'ISO 27001'},
      {text:'IEC 62443 — Industrial/OT security for SCADA/BMS/access control',ref:'IEC 62443'},
      {text:'ICAO Annex 17 — Security Standards and Recommended Practices',ref:'ICAO A17'},
    ],
    cyber:[
      {text:'CERT-In 6-hour reporting: access control breach, CCTV system compromise',ref:'CERT-In 2025'},
      {text:'ICAO Annex 17 §4.9.1 — ICT security for security management systems',ref:'ICAO A17'},
      {text:'Vulnerability assessment — all ISMC systems (quarterly, CERT-In mandate)',ref:'CERT-In'},
      {text:'180-day log retention — all access control, CCTV, alarm system events',ref:'CERT-In 2025'},
      {text:'BCAS cyber threat advisory — 2024 expansion to include cyber threat categories',ref:'BCAS 2024'},
    ],
  },
  {
    id:'socc', name:'SOCC / CISF', full:'CISF Security Control Room', icon:'🚔', color:'#047857', tag:'CISF · MHA · BCAS',
    regulatory:[
      {text:'CISF deployment agreement compliance — staffing, equipment, response SLA',ref:'CISF/MHA'},
      {text:'BCAS mock drill records — hijack, bomb threat, suspicious baggage (quarterly)',ref:'BCAS'},
      {text:'MHA directives — heightened security protocol records (Operation Sindoor 2025)',ref:'MHA 2025'},
      {text:'Airport category compliance — normal / sensitive / hypersensitive (MoCA 2022)',ref:'MoCA'},
      {text:'K9 unit maintenance and deployment log',ref:'BCAS/CISF'},
      {text:'Canine unit certification and training records',ref:'CISF'},
      {text:'Profiling and threat assessment records — CISF compliance',ref:'CISF'},
    ],
    standards:[
      {text:'BCAS National Civil Aviation Security Training Programme (NCASTP)',ref:'BCAS 2024'},
      {text:'ICAO Annex 17 — armed response standards',ref:'ICAO A17'},
    ],
    cyber:[
      {text:'SOCC communication system cyber incident reporting to CERT-In',ref:'CERT-In'},
      {text:'Radio communication system security audit',ref:'BCAS/CISF'},
    ],
  },
  {
    id:'aep', name:'AEP Section', full:'Aerodrome Entry Permit Section', icon:'🪪', color:'#B45309', tag:'BCAS · eSahaj',
    regulatory:[
      {text:'BCAS 2022 AEP Guidelines — all permits issued ONLY through eSahaj portal',ref:'BCAS 2022'},
      {text:'Background verification compliance — every AEP holder before issuance',ref:'BCAS'},
      {text:'CACS biometric smart card integration — access logs in real-time to NIC',ref:'BCAS/ECIL'},
      {text:'AEP renewal tracking — expiry dates, category-wise (ADPs, AVPs, AEPs)',ref:'BCAS'},
      {text:'Cancelled/suspended AEP holder — immediate system deactivation record',ref:'BCAS'},
      {text:'Visitor entry restriction record (BCAS May 2025 ban during heightened security)',ref:'BCAS 2025'},
      {text:'Contractor staff AEP — contract labour licence verification before issuance',ref:'BCAS'},
    ],
    standards:[
      {text:'Digi Yatra biometric system integration compliance (24 airports)',ref:'MoCA 2024'},
      {text:'ISO 27001 — data protection for AEP biometric database',ref:'ISO 27001'},
    ],
    cyber:[
      {text:'eSahaj portal data access — CERT-In compliance for biometric data',ref:'CERT-In'},
      {text:'DPDPA 2023 — biometric data processing under BCAS AEP scheme',ref:'DPDPA'},
      {text:'Access control system breach reporting — 6-hour CERT-In requirement',ref:'CERT-In 2025'},
    ],
  },
  {
    id:'apron', name:'Apron Control', full:'Apron / Ramp Control Room', icon:'🛬', color:'#0E7490', tag:'DGCA · AAI',
    regulatory:[
      {text:'DGCA ramp safety compliance — vehicle speed governors on all ramp vehicles',ref:'DGCA 2025'},
      {text:'Aerodrome Vehicle Pass (AVP) issuance and cancellation records',ref:'BCAS/DGCA'},
      {text:'Aircraft Driver\'s Permit (ADP) maintenance — suspension records',ref:'DGCA'},
      {text:'Apron safety audit — ground handling agent compliance',ref:'DGCA'},
      {text:'Wildlife Hazard Management Plan (WHMP) — daily apron log',ref:'DGCA'},
      {text:'DGCA surveillance response — corrective actions within 7 days',ref:'DGCA 2025'},
      {text:'Ground Support Equipment (GSE) airworthiness compliance',ref:'DGCA'},
    ],
    standards:[
      {text:'IATA Ground Operations Manual (IGOM) — ground handling standards',ref:'IATA IGOM'},
      {text:'ACI/ICAO apron management best practices',ref:'ACI'},
      {text:'ISO 45001 — Occupational Health and Safety for ramp operations',ref:'ISO 45001'},
    ],
    cyber:[
      {text:'Apron management system cyber incident reporting (CERT-In)',ref:'CERT-In'},
    ],
  },
  {
    id:'terminal', name:'Terminal Ops', full:'Terminal Operations', icon:'🏛️', color:'#1249C0', tag:'DGCA · AERA · AAI',
    regulatory:[
      {text:'AERA Performance Standards 2025 — terminal service quality KPIs',ref:'AERA 2025'},
      {text:'DGCA Annex 9 facilitation standards — passenger processing times',ref:'DGCA'},
      {text:'AirSewa complaint SLA — 24-hour resolution and portal upload',ref:'MoCA'},
      {text:'Terminal cleanliness and hygiene standards — DGCA audit readiness',ref:'DGCA'},
      {text:'Persons with Disabilities (PwD) accessibility standards',ref:'DGCA 2025'},
      {text:'Commercial area compliance — duty-free, F&B operator FSSAI licences',ref:'FSSAI'},
    ],
    standards:[
      {text:'ACI ASQ — Airport Service Quality passenger satisfaction score',ref:'ACI ASQ'},
      {text:'ISO 9001 — Quality Management for terminal operations',ref:'ISO 9001'},
    ],
    cyber:[
      {text:'FIDS (Flight Information Display System) cyber incident reporting',ref:'CERT-In'},
      {text:'Passenger data handling — DPDPA 2023 compliance',ref:'DPDPA'},
    ],
  },
  {
    id:'ilhbs', name:'ILHBS', full:'Inline Handling Baggage System Control Room', icon:'🧳', color:'#C2410C', tag:'BCAS · DGCA · Customs',
    regulatory:[
      {text:'BCAS baggage screening compliance — 100% hold baggage screening requirement',ref:'BCAS'},
      {text:'BCAS X-ray screener certification — annual recertification for all operators',ref:'BCAS'},
      {text:'Explosive Detection System (EDS/CTX) calibration and maintenance records',ref:'BCAS'},
      {text:'Customs bonded area compliance for baggage reconciliation',ref:'CBIC'},
      {text:'Unaccompanied baggage protocol records',ref:'BCAS'},
      {text:'BRS (Baggage Reconciliation System) compliance',ref:'BCAS'},
    ],
    standards:[
      {text:'IATA Baggage Improvement Programme (BIP) standards',ref:'IATA BIP'},
      {text:'ISO 9001 — Quality for baggage handling operations',ref:'ISO 9001'},
      {text:'IEC 62443 — OT security for baggage handling automation',ref:'IEC 62443'},
    ],
    cyber:[
      {text:'BHS SCADA/PLC system — CERT-In incident reporting if compromised',ref:'CERT-In'},
      {text:'ICAO Annex 17 §4.9.1 — cyber safeguards for BHS ICT systems',ref:'ICAO A17'},
      {text:'Network isolation of BHS OT network from corporate IT network',ref:'CERT-In'},
    ],
  },
  {
    id:'bhs', name:'BHS Team', full:'Baggage Handling Services Team', icon:'🛄', color:'#7C3AED', tag:'BCAS · Labour · DGCA',
    regulatory:[
      {text:'BCAS screener certification — all baggage handlers cleared and certified',ref:'BCAS'},
      {text:'Contract Labour (R&A) Act — licence for all handling agency contractors',ref:'Labour'},
      {text:'EPFO/ESIC compliance for all BHS staff including contract workers',ref:'EPFO/ESIC'},
      {text:'BCAS training compliance — background verification for all BHS staff',ref:'BCAS'},
      {text:'Lost and found protocol documentation',ref:'DGCA'},
    ],
    standards:[
      {text:'IATA ISAGO (Ground Operations Audit) — handling agent certification',ref:'IATA ISAGO'},
      {text:'ISO 45001 — OHS for baggage handling (high-injury-risk environment)',ref:'ISO 45001'},
    ],
    cyber:[
      {text:'Staff access to BHS systems — access control log retention 180 days',ref:'CERT-In'},
    ],
  },
  {
    id:'engg', name:'Engineering', full:'Engineering & Maintenance', icon:'⚙️', color:'#0E7490', tag:'DGCA · MoEF · CEA',
    regulatory:[
      {text:'DGCA Annex 14 — aerodrome infrastructure maintenance standards',ref:'DGCA A14'},
      {text:'Runway and taxiway centre line marking — maintenance log (DGCA surveillance 2025)',ref:'DGCA 2025'},
      {text:'Obstruction Limitation Surface (OLS) data — updated when new construction occurs',ref:'DGCA'},
      {text:'ILS calibration records — NAVCAL/Flight Inspection Unit certification',ref:'AAI/DGCA'},
      {text:'Rapid Exit Taxiway (RET) lighting compliance',ref:'DGCA 2025'},
      {text:'Electrical installation compliance — CEA regulations for HV/LV systems',ref:'CEA'},
      {text:'ARFF equipment certification — DGCA annual inspection',ref:'DGCA'},
      {text:'Environmental Clearance conditions — construction/expansion compliance',ref:'MoEF'},
    ],
    standards:[
      {text:'ISO 14001 — Environmental Management for airport infrastructure',ref:'ISO 14001'},
      {text:'ISO 45001 — OHS for engineering and maintenance operations',ref:'ISO 45001'},
      {text:'LEED/GRIHA green building certification for new infrastructure',ref:'GRIHA'},
    ],
    cyber:[
      {text:'Building Management System (BMS) — CERT-In incident reporting',ref:'CERT-In'},
      {text:'SCADA systems for utilities — OT security compliance ICAO Annex 17',ref:'ICAO A17'},
      {text:'IEC 62443 — security for industrial control systems in airport infrastructure',ref:'IEC 62443'},
    ],
  },
  {
    id:'it', name:'IT Team', full:'Information Technology', icon:'💻', color:'#1249C0', tag:'CERT-In · BCAS · DPDPA',
    regulatory:[
      {text:'CERT-In 6-hour incident reporting — mandatory for all cyber incidents',ref:'CERT-In 2025'},
      {text:'Security log retention — 180 days minimum (CERT-In 2025 mandate)',ref:'CERT-In 2025'},
      {text:'Vulnerability assessment and penetration testing — quarterly',ref:'CERT-In 2025'},
      {text:'DPDPA 2023 — personal data processing compliance for all airport IT systems',ref:'DPDPA'},
      {text:'NIC/MeghRaj cloud compliance for any data shared with government systems',ref:'MeitY'},
      {text:'BCAS cyber advisory implementation — tracking all BCAS cyber directives',ref:'BCAS 2024'},
    ],
    standards:[
      {text:'ISO 27001:2022 — Information Security Management System (ISMS)',ref:'ISO 27001'},
      {text:'ISO 22301 — Business Continuity for critical IT systems',ref:'ISO 22301'},
      {text:'ISO 27701 — Privacy Information Management (DPDPA alignment)',ref:'ISO 27701'},
    ],
    cyber:[
      {text:'ICAO Annex 17 §4.9.1 — cybersecurity safeguards for all aviation ICT',ref:'ICAO A17'},
      {text:'CyberPeace/CERT-In threat intelligence integration for airport systems',ref:'CERT-In'},
      {text:'Network segmentation — OT (BMS/SCADA) isolated from IT network',ref:'CERT-In'},
      {text:'Backup and disaster recovery — documented and tested quarterly',ref:'ISO 22301'},
    ],
  },
  {
    id:'cyber_team', name:'Cybersecurity', full:'Cybersecurity Team', icon:'🛡️', color:'#5B21B6', tag:'CERT-In · BCAS · NCIIPC',
    regulatory:[
      {text:'CERT-In Directions 2022 — implementation across all airport systems',ref:'CERT-In 2022'},
      {text:'CERT-In 6-hour incident reporting — own the process, own the SLA',ref:'CERT-In 2025'},
      {text:'NCIIPC guidelines — airports as Critical Information Infrastructure',ref:'NCIIPC'},
      {text:'Vulnerability disclosure reporting to CERT-In within stipulated timelines',ref:'CERT-In'},
      {text:'Monthly vulnerability scanning — mandatory for critical systems',ref:'CERT-In 2025'},
      {text:'Information Security Policy — updated annually, board approved',ref:'ISO 27001'},
    ],
    standards:[
      {text:'ISO 27001:2022 — lead certification responsibility (Clause 6.1 risk treatment)',ref:'ISO 27001'},
      {text:'ICAO Annex 17 §4.9 — aviation cybersecurity programme documentation',ref:'ICAO A17'},
      {text:'NIST CSF alignment — as recommended by ICAO for aviation operators',ref:'NIST CSF'},
      {text:'IEC 62443 — OT security standards for airport operational technology',ref:'IEC 62443'},
    ],
    cyber:[
      {text:'A-ISAC (Aviation Information Sharing and Analysis Centre) threat intelligence',ref:'IATA'},
      {text:'SOC operations — 24/7 monitoring with documented alert response SLAs',ref:'CERT-In'},
      {text:'Pen testing records — all critical systems, at least annual',ref:'CERT-In 2025'},
      {text:'Supply chain security — third-party vendor cybersecurity assessments',ref:'ISO 27001'},
    ],
  },
  {
    id:'fire', name:'Fire Services', full:'Airport Fire & Rescue Services', icon:'🔥', color:'#CC2222', tag:'DGCA · MoEF',
    regulatory:[
      {text:'DGCA ARFF CAR compliance — aircraft rescue and fire fighting category',ref:'DGCA/CAR'},
      {text:'DGCA ARFF equipment certification — annual inspection (fire tenders, foam, PPE)',ref:'DGCA'},
      {text:'ARFF crew training and certification — DGCA approved annual refresher',ref:'DGCA'},
      {text:'Airport category (ARFF) maintenance — minimum vehicle + equipment compliance',ref:'DGCA'},
      {text:'Emergency Response Plan — fire section — DGCA and ICAO Annex 14',ref:'DGCA'},
      {text:'Mock fire drill records — frequency per DGCA requirement',ref:'DGCA'},
    ],
    standards:[
      {text:'ICAO Annex 14 — Aerodrome Design and Operations (ARFF standards)',ref:'ICAO A14'},
      {text:'NFPA 403 — Standard for Aircraft Rescue and Fire-Fighting Services',ref:'NFPA 403'},
      {text:'ISO 45001 — OHS for fire fighting operations',ref:'ISO 45001'},
    ],
    cyber:[
      {text:'Fire alarm and suppression system — cyber incident reporting (CERT-In)',ref:'CERT-In'},
      {text:'BMS integration points — network security for fire system connections',ref:'CERT-In'},
    ],
  },
  {
    id:'hr', name:'HR & Legal', full:'HR, Labour & Legal Compliance', icon:'👥', color:'#047857', tag:'EPFO · ESIC · Labour',
    regulatory:[
      {text:'EPFO ECR filing — monthly by 25th, all employees including contract staff',ref:'EPFO'},
      {text:'ESIC challan submission — monthly by 15th',ref:'ESIC'},
      {text:'Contract Labour (R&A) Act — licence for every contractor engaged at airport',ref:'Labour'},
      {text:'POSH Act — Internal Committee constitution + annual report to District Officer',ref:'POSH Act'},
      {text:'Minimum Wages Act — compliance with state notifications',ref:'Labour'},
      {text:'BCAS background verification records — all staff and contractors with AEP',ref:'BCAS'},
      {text:'DGCA — ATCO, pilot, AME licence tracking (if airport employs these)',ref:'DGCA'},
    ],
    standards:[
      {text:'SA8000 — Social Accountability standard for fair labour practices',ref:'SA8000'},
      {text:'ISO 45001 — Occupational Health and Safety management system',ref:'ISO 45001'},
      {text:'Great Place to Work certification',ref:'GPTW'},
    ],
    cyber:[
      {text:'HRMS system — DPDPA compliance for employee personal data',ref:'DPDPA'},
      {text:'Biometric attendance system — data protection and 180-day log retention',ref:'CERT-In'},
    ],
  },
  {
    id:'env', name:'Environment', full:'Environment & Sustainability', icon:'🌱', color:'#047857', tag:'MoEF · CPCB · SPCB',
    regulatory:[
      {text:'Environmental Clearance (EC) conditions — quarterly/annual reporting to MoEFCC',ref:'MoEF'},
      {text:'Consent to Operate (CTO) — SPCB annual renewal',ref:'SPCB'},
      {text:'Solid Waste Management Rules 2016 — airport waste segregation compliance',ref:'MoEF'},
      {text:'Noise monitoring records — ICAO Annex 16 + CPCB limits',ref:'CPCB/ICAO'},
      {text:'CORSIA — Carbon Offsetting and Reduction Scheme (international airports)',ref:'ICAO CORSIA'},
      {text:'Stormwater management plan — SPCB compliance',ref:'SPCB'},
      {text:'Aviation Environment Cell — DGCA circular compliance (2009 circular)',ref:'DGCA 2009'},
    ],
    standards:[
      {text:'ISO 14001 — Environmental Management System certification',ref:'ISO 14001'},
      {text:'LEED / GRIHA certification for terminal and infrastructure',ref:'GRIHA'},
      {text:'ACI Level 3+ Airport Carbon Accreditation',ref:'ACI ACA'},
    ],
    cyber:[
      {text:'Environmental monitoring systems — CERT-In compliance for connected sensors',ref:'CERT-In'},
    ],
  },
  {
    id:'cargo', name:'Cargo', full:'Cargo Terminal Operations', icon:'📦', color:'#A85500', tag:'BCAS · Customs · DGCA',
    regulatory:[
      {text:'BCAS cargo security programme — Known Consignor and Regulated Agent compliance',ref:'BCAS'},
      {text:'BCAS X-ray screening — 100% cargo screening, screener certification',ref:'BCAS'},
      {text:'Customs bonded warehouse compliance — CBIC regulations',ref:'CBIC'},
      {text:'DGCA dangerous goods handling compliance — IATA DGR',ref:'DGCA/IATA'},
      {text:'BCAS cargo seal integrity records',ref:'BCAS'},
      {text:'Cold chain cargo — FSSAI for perishable air cargo',ref:'FSSAI'},
    ],
    standards:[
      {text:'IATA CEIV (Centre of Excellence for Independent Validators) — pharma/perishables',ref:'IATA CEIV'},
      {text:'ISO 9001 — Quality for cargo operations',ref:'ISO 9001'},
      {text:'TAPA (Transported Asset Protection Association) standards',ref:'TAPA'},
    ],
    cyber:[
      {text:'Cargo management system (CMS) — CERT-In incident reporting',ref:'CERT-In'},
      {text:'DPDPA — shipper/consignee data protection in cargo systems',ref:'DPDPA'},
    ],
  },
  {
    id:'cleaning', name:'Cleaning (BVG)', full:'Cleaning & Facility Services (Vendors)', icon:'🧹', color:'#617AB0', tag:'Labour · BCAS',
    regulatory:[
      {text:'Contract Labour (R&A) Act — cleaning contractor licence verification',ref:'Labour'},
      {text:'BCAS — all cleaning staff with airside access require valid AEP',ref:'BCAS'},
      {text:'Background verification — BCAS compliance for every cleaning staff with AEP',ref:'BCAS'},
      {text:'EPFO/ESIC — principal employer liability for contract cleaning workers',ref:'EPFO/ESIC'},
      {text:'Minimum wages — state-specific compliance for cleaning staff category',ref:'Labour'},
      {text:'Biomedical waste handling — CPCB rules for airport medical areas',ref:'CPCB'},
    ],
    standards:[
      {text:'ISO 9001 — Quality Management for vendor services',ref:'ISO 9001'},
      {text:'ISO 14001 — Environmental compliance for cleaning chemicals',ref:'ISO 14001'},
    ],
    cyber:[
      {text:'Vendor access to airport systems — third-party access control log retention',ref:'CERT-In'},
    ],
  },
  {
    id:'hort', name:'Horticulture', full:'Horticulture & Landside', icon:'🌿', color:'#047857', tag:'DGCA · MoEF',
    regulatory:[
      {text:'Wildlife Hazard Management Plan — horticulture\'s role in bird hazard mitigation',ref:'DGCA'},
      {text:'Pesticide use compliance — Central Insecticide Board + CPCB restrictions',ref:'CIB/CPCB'},
      {text:'Environmental Clearance — land use and vegetation management compliance',ref:'MoEF'},
      {text:'DGCA bird/wildlife strike log — daily airside vegetation management record',ref:'DGCA'},
      {text:'Birdstrike reporting — DGCA online reporting system',ref:'DGCA'},
    ],
    standards:[
      {text:'ICAO Bird Strike Information System (IBIS) data submission',ref:'ICAO IBIS'},
      {text:'ISO 14001 — Environmental management for ground operations',ref:'ISO 14001'},
    ],
    cyber:[],
  },
  {
    id:'procurement', name:'Procurement', full:'Procurement & Supply Chain', icon:'🛒', color:'#B45309', tag:'MCA · Labour · GFR',
    regulatory:[
      {text:'GeM (Government e-Marketplace) compliance for government-owned airports',ref:'GFR/GeM'},
      {text:'MSME procurement targets — compliance with MoMSME directives',ref:'MoMSME'},
      {text:'Customs duty compliance for imported airport equipment',ref:'CBIC'},
      {text:'Vendor due diligence — BCAS compliance for any vendor with airside access',ref:'BCAS'},
      {text:'Anti-corruption compliance — Prevention of Corruption Act provisions',ref:'MCA'},
    ],
    standards:[
      {text:'ISO 28000 — Supply Chain Security Management System',ref:'ISO 28000'},
      {text:'ISO 9001 — procurement quality management integration',ref:'ISO 9001'},
    ],
    cyber:[
      {text:'Vendor/supply chain cybersecurity assessments — ISO 27001 A.5.19',ref:'ISO 27001'},
      {text:'Procurement system access log — DPDPA compliance for vendor data',ref:'DPDPA'},
    ],
  },
  {
    id:'design', name:'Design Team', full:'Design & Project Development', icon:'📐', color:'#1249C0', tag:'DGCA · MoEF',
    regulatory:[
      {text:'DGCA safety assessment — all infrastructure changes and new construction',ref:'DGCA'},
      {text:'OLS (Obstacle Limitation Surface) survey — before and after construction',ref:'DGCA'},
      {text:'Environmental Clearance for expansion projects — MoEFCC process',ref:'MoEF'},
      {text:'National Building Code (NBC) compliance for all airport structures',ref:'BIS/NBC'},
      {text:'RERA compliance for any commercial development components',ref:'RERA'},
      {text:'Fire NOC from State Fire Department — all new buildings',ref:'Fire Dept'},
    ],
    standards:[
      {text:'LEED / GRIHA green building rating for all new construction',ref:'GRIHA'},
      {text:'ACI APEX in Sustainability — project design alignment',ref:'ACI APEX'},
      {text:'ICAO Annex 14 — design standards for runways, taxiways, aprons',ref:'ICAO A14'},
    ],
    cyber:[
      {text:'BIM (Building Information Modelling) system — data security compliance',ref:'ISO 27001'},
      {text:'Design data protection — DPDPA for any personal data in design systems',ref:'DPDPA'},
    ],
  },
  {
    id:'medical', name:'Medical', full:'Airport Medical Centre', icon:'🏥', color:'#CC2222', tag:'MoHFW · DGCA',
    regulatory:[
      {text:'Clinical Establishment Act — airport medical centre registration',ref:'CEA'},
      {text:'DGCA — ATCO and aircrew medical examination compliance',ref:'DGCA'},
      {text:'Emergency medical equipment compliance — AED availability (DGCA)',ref:'DGCA'},
      {text:'Biomedical Waste Management Rules 2016 — medical waste disposal',ref:'MoEF'},
      {text:'DPDPA 2023 — patient health data processing and consent',ref:'DPDPA'},
    ],
    standards:[
      {text:'NABH Entry Level Accreditation for airport clinic',ref:'NABH'},
      {text:'ISO 15189 — Medical Laboratory Standards (if lab present)',ref:'ISO 15189'},
    ],
    cyber:[
      {text:'Hospital Information System (HIS) — CERT-In compliance for patient data breach',ref:'CERT-In'},
      {text:'DPDPA — patient health data as sensitive personal data',ref:'DPDPA'},
    ],
  },
]
