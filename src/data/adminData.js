export const DEPT_METRICS = [
  { id:'sec',  name:'Security Operations',  icon:'🛡️', color:'#3B82F6', total:24, compliant:18, nc:4, ofi:2, score:75, head:'Rajesh Kumar',  staff:12 },
  { id:'ops',  name:'Terminal Operations',  icon:'🏢', color:'#10B981', total:36, compliant:28, nc:6, ofi:2, score:78, head:'Priya Sharma',  staff:28 },
  { id:'arff', name:'Fire & Rescue',        icon:'🔥', color:'#EF4444', total:18, compliant:16, nc:1, ofi:1, score:89, head:'Amit Singh',    staff:18 },
  { id:'eng',  name:'Engineering',          icon:'⚙️', color:'#F59E0B', total:22, compliant:14, nc:6, ofi:2, score:64, head:'Sunita Rao',    staff:22 },
  { id:'it',   name:'IT & Cybersecurity',   icon:'💻', color:'#8B5CF6', total:28, compliant:18, nc:7, ofi:3, score:64, head:'Vikram Nair',   staff:10 },
  { id:'hr',   name:'HR & Legal',           icon:'📋', color:'#0891B2', total:16, compliant:12, nc:2, ofi:2, score:75, head:'Meena Joshi',   staff:8  },
  { id:'env',  name:'Environment',          icon:'🌿', color:'#059669', total:8,  compliant:4,  nc:2, ofi:2, score:50, head:'Ravi Patel',    staff:6  },
  { id:'fin',  name:'Finance & Admin',      icon:'💰', color:'#D97706', total:4,  compliant:2,  nc:0, ofi:2, score:50, head:'Kavitha Nair',  staff:14 },
]

export const FUNCTION_METRICS = [
  { id:'f1',  deptId:'sec',  name:'Access Control',         total:8,  compliant:6,  nc:1, ofi:1 },
  { id:'f2',  deptId:'sec',  name:'CCTV Surveillance',      total:6,  compliant:5,  nc:0, ofi:1 },
  { id:'f3',  deptId:'sec',  name:'Staff Screening',        total:10, compliant:7,  nc:3, ofi:0 },
  { id:'f4',  deptId:'ops',  name:'Check-in Operations',    total:12, compliant:10, nc:1, ofi:1 },
  { id:'f5',  deptId:'ops',  name:'Baggage Handling',       total:10, compliant:8,  nc:2, ofi:0 },
  { id:'f6',  deptId:'ops',  name:'Gate Management',        total:8,  compliant:6,  nc:2, ofi:0 },
  { id:'f7',  deptId:'ops',  name:'Passenger Services',     total:6,  compliant:4,  nc:1, ofi:1 },
  { id:'f8',  deptId:'arff', name:'Fire Fighting',          total:10, compliant:9,  nc:1, ofi:0 },
  { id:'f9',  deptId:'arff', name:'Medical Response',       total:8,  compliant:7,  nc:0, ofi:1 },
  { id:'f10', deptId:'eng',  name:'Runway Maintenance',     total:12, compliant:8,  nc:3, ofi:1 },
  { id:'f11', deptId:'eng',  name:'Equipment Safety',       total:10, compliant:6,  nc:3, ofi:1 },
  { id:'f12', deptId:'it',   name:'Network Security',       total:14, compliant:9,  nc:4, ofi:1 },
  { id:'f13', deptId:'it',   name:'Data Protection',        total:14, compliant:9,  nc:3, ofi:2 },
  { id:'f14', deptId:'hr',   name:'Labour Compliance',      total:10, compliant:8,  nc:1, ofi:1 },
  { id:'f15', deptId:'hr',   name:'Training Records',       total:6,  compliant:4,  nc:1, ofi:1 },
  { id:'f16', deptId:'env',  name:'Air Quality Monitoring', total:4,  compliant:2,  nc:1, ofi:1 },
  { id:'f17', deptId:'env',  name:'Waste Management',       total:4,  compliant:2,  nc:1, ofi:1 },
  { id:'f18', deptId:'fin',  name:'Financial Reporting',    total:4,  compliant:2,  nc:0, ofi:2 },
]

export const USERS = [
  { id:'u1',  name:'Rajesh Kumar',  email:'rajesh@airport.in',  dept:'Security Operations', role:'Dept Head',        lastActive:'2025-06-28', status:'active',   assigned:24,  completed:18 },
  { id:'u2',  name:'Priya Sharma',  email:'priya@airport.in',   dept:'Terminal Operations', role:'Dept Head',        lastActive:'2025-06-28', status:'active',   assigned:36,  completed:28 },
  { id:'u3',  name:'Amit Singh',    email:'amit@airport.in',    dept:'Fire & Rescue',       role:'Dept Head',        lastActive:'2025-06-27', status:'active',   assigned:18,  completed:16 },
  { id:'u4',  name:'Sunita Rao',    email:'sunita@airport.in',  dept:'Engineering',         role:'Dept Head',        lastActive:'2025-06-26', status:'active',   assigned:22,  completed:14 },
  { id:'u5',  name:'Vikram Nair',   email:'vikram@airport.in',  dept:'IT & Cybersecurity',  role:'Dept Head',        lastActive:'2025-06-28', status:'active',   assigned:28,  completed:18 },
  { id:'u6',  name:'Meena Joshi',   email:'meena@airport.in',   dept:'HR & Legal',          role:'Dept Head',        lastActive:'2025-06-25', status:'active',   assigned:16,  completed:12 },
  { id:'u7',  name:'Ravi Patel',    email:'ravi@airport.in',    dept:'Environment',         role:'Dept Head',        lastActive:'2025-06-20', status:'inactive', assigned:8,   completed:4  },
  { id:'u8',  name:'Kavitha Nair',  email:'kavitha@airport.in', dept:'Finance & Admin',     role:'Dept Head',        lastActive:'2025-06-28', status:'active',   assigned:4,   completed:2  },
  { id:'u9',  name:'Admin User',    email:'admin@airport.in',   dept:'All Departments',     role:'Compliance Admin', lastActive:'2025-06-28', status:'active',   assigned:156, completed:112 },
  { id:'u10', name:'Audit Officer', email:'audit@airport.in',   dept:'All Departments',     role:'Internal Auditor', lastActive:'2025-06-27', status:'active',   assigned:156, completed:112 },
]

export const AUDIT_TRAIL = [
  { id:'a1',  ts:'2025-06-28 16:10', user:'Priya Sharma',  action:'MARKED COMPLIANT', item:'BCAS AVSEC Order Compliance',        dept:'Terminal Ops',  type:'compliant', note:'Q2 AVSEC order review completed and documented' },
  { id:'a2',  ts:'2025-06-28 15:42', user:'Admin User',    action:'ADDED USER',       item:'New user: Kavitha Nair',              dept:'Finance',       type:'info',      note:'User account created with Dept Head role' },
  { id:'a3',  ts:'2025-06-28 14:30', user:'Rajesh Kumar',  action:'MARKED NC',        item:'Security Staff Training Records',     dept:'Security Ops',  type:'nc',        note:'3 staff members missing quarterly refresher certification' },
  { id:'a4',  ts:'2025-06-28 12:15', user:'Vikram Nair',   action:'UPLOADED EVIDENCE',item:'ISO 27001 Gap Analysis Report',       dept:'IT & Cyber',    type:'info',      note:'File: ISO27001_Gap_June2025.pdf uploaded successfully' },
  { id:'a5',  ts:'2025-06-28 11:00', user:'Amit Singh',    action:'MARKED COMPLIANT', item:'ARFF Category Certification',         dept:'Fire & Rescue', type:'compliant', note:'Annual ARFF certification renewed — valid until June 2026' },
  { id:'a6',  ts:'2025-06-27 17:30', user:'Sunita Rao',    action:'MARKED NC',        item:'Runway Surface Condition Report',     dept:'Engineering',   type:'nc',        note:'Crack-sealing work overdue — contractor delay reported' },
  { id:'a7',  ts:'2025-06-27 16:00', user:'Meena Joshi',   action:'MARKED OFI',       item:'Employee Grievance Records',          dept:'HR & Legal',    type:'ofi',       note:'Response time can improve from 10 days to 5 days' },
  { id:'a8',  ts:'2025-06-27 14:45', user:'Admin User',    action:'ADDED CRITERIA',   item:'DPDPA Data Retention Policy',         dept:'All Depts',     type:'info',      note:'New DPDPA 2023 criteria added across all departments' },
  { id:'a9',  ts:'2025-06-26 10:30', user:'Vikram Nair',   action:'MARKED NC',        item:'CERT-In Incident Response Plan',      dept:'IT & Cyber',    type:'nc',        note:'Incident response drill not conducted in Q2' },
  { id:'a10', ts:'2025-06-26 09:15', user:'Ravi Patel',    action:'MARKED NC',        item:'Environmental Monitoring Records',    dept:'Environment',   type:'nc',        note:'Q2 ambient air quality report pending from external lab' },
  { id:'a11', ts:'2025-06-25 15:00', user:'Priya Sharma',  action:'MARKED OFI',       item:'Customer Feedback System',            dept:'Terminal Ops',  type:'ofi',       note:'Digital feedback kiosks in Terminal 2 under-utilized' },
  { id:'a12', ts:'2025-06-25 11:30', user:'Rajesh Kumar',  action:'MARKED COMPLIANT', item:'CCTV Coverage Compliance',            dept:'Security Ops',  type:'compliant', note:'100% coverage restored after Camera 14 replacement' },
]

export const MONTHLY_TREND = [
  { month:'Jan', score:61 },
  { month:'Feb', score:64 },
  { month:'Mar', score:67 },
  { month:'Apr', score:69 },
  { month:'May', score:71 },
  { month:'Jun', score:72 },
]

export const SUMMARY = {
  total:156, compliant:112, nc:28, ofi:16,
  score:72, prevScore:71,
  departments:8, users:10, criteria:156,
}

export const CRITERIA = [
  { id:'c1', ref:'BCAS/AVSEC/2024',     name:'Airport Security Programme',         dept:'All Depts',     regulator:'BCAS',    mandatory:true  },
  { id:'c2', ref:'DGCA/CAR/2023',       name:'Aerodrome Licence Conditions',        dept:'All Depts',     regulator:'DGCA',    mandatory:true  },
  { id:'c3', ref:'ISO27001:2022',        name:'Information Security Management',    dept:'IT & Cyber',    regulator:'ISO',     mandatory:false },
  { id:'c4', ref:'CERT-In/2023/01',     name:'Cyber Incident Reporting (6-hr)',     dept:'IT & Cyber',    regulator:'CERT-In', mandatory:true  },
  { id:'c5', ref:'DPDPA/2023',          name:'Personal Data Protection Policy',     dept:'All Depts',     regulator:'MeitY',   mandatory:true  },
  { id:'c6', ref:'EPFO/ECR/Monthly',    name:'EPFO ECR Filing (by 25th)',           dept:'HR & Legal',    regulator:'EPFO',    mandatory:true  },
  { id:'c7', ref:'ISO14001:2015',       name:'Environmental Management System',     dept:'Environment',   regulator:'ISO',     mandatory:false },
  { id:'c8', ref:'AERA/2025/PS',        name:'Performance Standards Compliance',    dept:'Terminal Ops',  regulator:'AERA',    mandatory:true  },
  { id:'c9', ref:'MoEF/CPA/2023',       name:'Environmental Clearance Conditions', dept:'Environment',   regulator:'MoEF',    mandatory:true  },
  { id:'c10',ref:'ISO45001:2018',       name:'Occupational Health & Safety',        dept:'Engineering',   regulator:'ISO',     mandatory:false },
]
