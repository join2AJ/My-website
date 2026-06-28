/* Mock compliance data for the console UI kit. Not production data. */
const REGS = ['BCAS', 'DGCA', 'AAI', 'AERA', 'MoEF', 'EPFO', 'CERT-In'];

const OBLIGATIONS = [
  { code: 'BCAS-AEP-11', regulator: 'BCAS', status: 'stop', due: 'OVERDUE 3D', title: 'Airport Entry Permit register reconciliation', dept: 'Aerodrome Security', detail: 'Quarterly reconciliation of all active AEPs against current employment records. 4 holders pending de-provisioning after role changes. Reference: BCAS Circular 11/2022.' },
  { code: 'BCAS-XBIS-04', regulator: 'BCAS', status: 'caution', due: 'DUE 9D', title: 'X-BIS screener recurrent certification', dept: 'Terminal Security', detail: 'Recurrent certification for 38 hold-baggage screeners. 6 certifications lapse within the window.' },
  { code: 'DGCA-CAR-145', regulator: 'DGCA', status: 'caution', due: 'DUE 14D', title: 'CAR Section 2 Series F maintenance audit', dept: 'Engineering', detail: 'Annual airworthiness review of line-maintenance organisation against CAR 145 requirements.' },
  { code: 'DGCA-AEP-22', regulator: 'DGCA', status: 'clear', due: 'FILED', title: 'Aerodrome licence condition compliance', dept: 'Operations', detail: 'Bi-annual attestation of aerodrome licence conditions. Filed and acknowledged.' },
  { code: 'AAI-OMDA-07', regulator: 'AAI', status: 'clear', due: 'FILED', title: 'OMDA monthly performance submission', dept: 'Commercial', detail: 'Operations, Management & Development Agreement — monthly KPI submission to AAI.' },
  { code: 'AAI-RFF-13', regulator: 'AAI', status: 'caution', due: 'DUE 21D', title: 'Rescue & Fire Fighting category audit', dept: 'Fire Services', detail: 'CAT-9 RFF readiness audit; foam stock and response-time verification.' },
  { code: 'AERA-TARIFF-02', regulator: 'AERA', status: 'clear', due: 'FILED', title: 'Aeronautical tariff true-up submission', dept: 'Finance', detail: 'Annual true-up of aeronautical charges under the AERA control period.' },
  { code: 'MOEF-EC-09', regulator: 'MoEF', status: 'caution', due: 'DUE 30D', title: 'Environmental Clearance — half-yearly report', dept: 'Sustainability', detail: 'Half-yearly EC compliance report: ambient air, noise contours, water discharge.' },
  { code: 'MOEF-NOISE-03', regulator: 'MoEF', status: 'clear', due: 'FILED', title: 'Noise monitoring terminal readings', dept: 'Sustainability', detail: 'Continuous noise-monitoring terminal data lodged for the quarter.' },
  { code: 'EPFO-ECR-12', regulator: 'EPFO', status: 'clear', due: 'FILED', title: 'Electronic Challan-cum-Return filing', dept: 'Human Resources', detail: 'Monthly EPF ECR filed for 2,140 employees and contractor staff.' },
  { code: 'CERT-IN-06', regulator: 'CERT-In', status: 'stop', due: 'OVERDUE 1D', title: 'Six-hour incident reporting SOP attestation', dept: 'IT & Cyber', detail: 'Attestation that the 6-hour cyber-incident reporting SOP is operational and tested. Tabletop exercise overdue.' },
  { code: 'CERT-IN-14', regulator: 'CERT-In', status: 'caution', due: 'DUE 7D', title: 'Log retention 180-day verification', dept: 'IT & Cyber', detail: 'Verification that all critical-system logs are retained for 180 days within Indian jurisdiction.' },
];

const DEPARTMENTS = [
  { name: 'Aerodrome Security', regulator: 'BCAS', total: 34, clear: 28, caution: 4, stop: 2, readiness: 82 },
  { name: 'Terminal Security', regulator: 'BCAS', total: 26, clear: 22, caution: 3, stop: 1, readiness: 85 },
  { name: 'Engineering', regulator: 'DGCA', total: 41, clear: 36, caution: 5, stop: 0, readiness: 88 },
  { name: 'Operations', regulator: 'DGCA', total: 38, clear: 35, caution: 3, stop: 0, readiness: 92 },
  { name: 'Fire Services', regulator: 'AAI', total: 19, clear: 16, caution: 3, stop: 0, readiness: 84 },
  { name: 'IT & Cyber', regulator: 'CERT-In', total: 23, clear: 18, caution: 3, stop: 2, readiness: 71 },
  { name: 'Sustainability', regulator: 'MoEF', total: 17, clear: 14, caution: 3, stop: 0, readiness: 82 },
  { name: 'Finance', regulator: 'AERA', total: 22, clear: 21, caution: 1, stop: 0, readiness: 95 },
];

const AUDIT = [
  { time: '0941Z', text: 'AEP register synced — 2,140 holders', tone: 'clear' },
  { time: '1014Z', text: 'CERT-In advisory CIAD-2026-04 ingested', tone: 'caution' },
  { time: '1102Z', text: 'BCAS-AEP-11 breach: 4 holders un-reconciled', tone: 'stop' },
  { time: '1130Z', text: 'DGCA-AEP-22 attestation acknowledged', tone: 'clear' },
  { time: '1147Z', text: 'CERT-IN-06 SOP tabletop overdue', tone: 'stop' },
  { time: '1203Z', text: 'Auto-scan complete · 418 obligations', tone: 'dim' },
];

window.CBData = { REGS, OBLIGATIONS, DEPARTMENTS, AUDIT,
  summary: { total: 418, clear: 366, caution: 41, stop: 11, readiness: 87 } };
