import { useState } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  bg:       "#F0F4FF",
  surface:  "#FFFFFF",
  card:     "#F8FAFF",
  border:   "#D6E0FF",
  borderMd: "#B3C5FF",
  text:     "#0F1733",
  sub:      "#3D5080",
  muted:    "#7A90BF",
  blue:     "#1A56DB",
  blueL:    "#EBF2FF",
  blueM:    "#93B4F8",
  navy:     "#0D2B6E",
  accent:   "#FF6B35",
  green:    "#0E9F6E",
  greenL:   "#ECFDF5",
  purple:   "#7C3AED",
  purpleL:  "#F5F3FF",
  gold:     "#D97706",
  goldL:    "#FFFBEB",
  red:      "#DC2626",
  redL:     "#FEF2F2",
  teal:     "#0891B2",
  tealL:    "#ECFEFF",
};

const threeLayers = [
  {
    id: "regulatory", layer: "Layer 1", icon: "⚖️", color: T.red, bg: T.redL,
    title: "Regulatory Compliance",
    subtitle: "Mandatory · Legal Obligation · Non-negotiable",
    tagline: "What you MUST do — or face penalties, licence suspension, criminal liability",
    description: "Every law, rule, circular, and order issued by government regulatory bodies that businesses are legally obligated to follow. Non-compliance = fines, shutdowns, criminal charges.",
    examples: ["BCAS AVSEC Orders → airports must comply or face suspension","CERT-In 6-hour incident reporting → all Indian companies","EPFO monthly ECR filing by 25th → every employer","FSSAI food business licence → every food business","DPDPA 2023 → every entity handling personal data","SEBI CSCRF → stock exchanges, brokers (April 2025)"],
    who: "50+ central regulators + state regulators + ministry circulars",
    penalty: "Fines ₹1L – ₹250 crore · Licence cancellation · Criminal prosecution",
    current: "Excel, paper registers, email folders, WhatsApp",
    build: "2,000+ regulatory requirements pre-built across all sectors",
  },
  {
    id: "standards", layer: "Layer 2", icon: "🏅", color: T.blue, bg: T.blueL,
    title: "Industry Standards",
    subtitle: "Quality Markers · Voluntary or Contractually Required",
    tagline: "What you SHOULD do — to demonstrate quality, win contracts, access global markets",
    description: "National and international standards set by BIS, ISO, NABL, NABH, QCI. Some voluntary. Many become mandatory via contracts, export requirements, or government procurement rules.",
    examples: ["BIS/ISI mark → mandatory for 400+ products under QCOs (Aug 2025)","ISO 27001 → required by SEBI, RBI regulated entities","NABH accreditation → hospitals seeking CGHS/insurance empanelment","NABL accreditation → labs whose test results must be legally accepted","ISO 14001 → required for certain tenders, export markets","ISO 50001 → required for Designated Consumers under BEE"],
    who: "BIS (20,000+ Indian standards) · ISO family · NABH · NABL · QCI · sector bodies",
    penalty: "Loss of contracts · Export bans · Insurance rejections · Market exclusion",
    current: "Separate consultant for each standard, no unified tracking",
    build: "Standards library mapped to regulatory controls — one evidence, multiple standards",
  },
  {
    id: "gold", layer: "Layer 3", icon: "🏆", color: T.gold, bg: T.goldL,
    title: "Gold Standards",
    subtitle: "Excellence Benchmarks · World-Class Aspirational Targets",
    tagline: "What you ASPIRE to — to be world-class, attract investment, lead your sector",
    description: "Frameworks representing the highest global standards of excellence. Not just compliant — genuinely world-class. These become competitive differentiators attracting premium clients and foreign investment.",
    examples: ["ACI Level 4+ Carbon Accreditation → airport environmental excellence","CMMI Level 5 → software maturity (used in defence contracts)","SA8000 Social Accountability → ethical supply chain, export buyer requirement","ESG Rating (SEBI BRSR) → mandatory disclosure, investor confidence","NAAC A++ → university excellence, NIRF rankings","ISO 42001 (AI Governance) → emerging standard for AI-driven businesses"],
    who: "ACI · CMMI Institute · SAI Global · USGBC · Deming Institute · SEBI · global accreditation bodies",
    penalty: "Not mandatory. Absence = competitive disadvantage, lower ratings, missed tenders",
    current: "No tool tracks this. Each standard managed in isolation if at all.",
    build: "Gold standard gap analysis — distance from best-in-class + roadmap to excellence",
  },
];

const regulatoryUniverse = [
  { sector:"Finance & Banking", icon:"🏦", color:T.red, regulators:["RBI","SEBI","IRDAI","PFRDA","IBBI","NHB"], count:"200+", market:"~90,000 NBFCs + 100s of banks", items:["RBI Cyber Security Framework — banks/NBFCs","SEBI CSCRF — stock exchanges, brokers (April 2025)","IRDAI Cyber Guidelines — insurance companies","Basel III capital adequacy reporting","KYC/AML compliance filings","PFRDA NITI annual returns"] },
  { sector:"Aviation", icon:"✈️", color:T.blue, regulators:["BCAS","DGCA","AAI","AERA","CISF","MoEF"], count:"150+", market:"157 airports → 350 by 2047", items:["BCAS AVSEC Orders — all airports","DGCA CARs — aerodrome licence conditions","AERA Performance Standards (2025)","Environmental Clearance conditions","OMDA/Concession Agreement KPIs","Mock drill records and ARFF certification"] },
  { sector:"Healthcare", icon:"🏥", color:T.purple, regulators:["NMC","NABH","CDSCO","AERB","MoHFW","PCPNDT"], count:"180+", market:"70,000+ hospitals + 10L+ clinics", items:["NABH accreditation standards (500+ criteria)","Biomedical Waste Management Rules 2016","CDSCO drug licence compliance","AERB radiation safety for medical equipment","Clinical Establishment Act registration","DPDPA compliance for patient data"] },
  { sector:"Manufacturing", icon:"🏭", color:T.teal, regulators:["BIS","CPCB","SPCB","Factory Inspector","PESO","FSSAI"], count:"250+", market:"33 lakh+ manufacturing units", items:["Factory Licence — state specific","BIS product certification (ISI mark)","Consent to Establish / Operate (SPCB)","PESO licence for hazardous handling","Hazardous Waste Rules compliance","Worker welfare — EPFO, ESIC, Contract Labour"] },
  { sector:"Food & Agri", icon:"🌾", color:T.green, regulators:["FSSAI","APMC","AGMARK","NABARD","FCI"], count:"120+", market:"2 crore+ food businesses", items:["FSSAI food business licence and annual return","FSSAI Schedule 4 — hygienic manufacturing practices","Pesticide Residue Monitoring compliance","AGMARK grading standards","Cold chain facility FSSAI compliance","Export compliance — APEDA, MPEDA"] },
  { sector:"IT / Tech", icon:"💻", color:T.blue, regulators:["CERT-In","MeitY","TRAI","DoT","MCA"], count:"80+", market:"1,700+ licensed telecom + lakhs of IT companies", items:["CERT-In 6-hour incident reporting","DPDPA 2023 + Rules 2025","TRAI QoS reporting","MeitY AI Governance Guidelines (Nov 2025)","Companies Act + GST + Labour","ISO 27001 mandated by RBI/SEBI clients"] },
  { sector:"Energy", icon:"⚡", color:T.gold, regulators:["CEA","CERC","SERC","BEE","PNGRB"], count:"130+", market:"1,000+ power generation/distribution entities", items:["CEA Grid Code compliance","BEE energy audit (Designated Consumers)","RPO (Renewable Purchase Obligation) targets","Environmental clearance for power plants","PNGRB pipeline safety regulations","SERC state tariff order compliance"] },
  { sector:"Education", icon:"🎓", color:T.purple, regulators:["UGC","AICTE","NAAC","NMC","NCTE"], count:"90+", market:"45,000+ higher education institutions", items:["UGC annual returns and disclosure norms","AICTE approval and annual reporting","NAAC accreditation compliance (A++/A+/A)","NCTE recognition for B.Ed. programmes","Fee regulation compliance (state-specific)","Student data protection under DPDPA"] },
  { sector:"Universal", icon:"🏢", color:T.muted, regulators:["MCA","CBDT","CBIC","Labour Dept","EPFO","ESIC"], count:"60+", market:"15 lakh+ registered companies", items:["MCA annual return filing (Form MGT-7)","Income Tax ITR-6 + Audit","GST monthly/quarterly/annual returns","EPFO monthly ECR filing (by 25th)","ESIC challan (by 15th)","POSH Act annual report to District Officer"] },
];

const sectorMatrix = [
  { sector:"Aviation", icon:"✈️", regulatory:["BCAS AVSEC Orders","DGCA CARs + Aerodrome Licence","AERA Performance Standards","MoEF Environmental Clearance","EPFO/ESIC/Labour"], standards:["ISO 27001 (ISMS)","ISO 22301 (BCMS)","ISO 14001 (Environment)","ISO 9001 (Quality)"], gold:["ACI Level 4+ Carbon Accreditation","ACI Airport Service Quality (ASQ)","ICAO Green Airports","IATA IOSA (airlines)"] },
  { sector:"Healthcare", icon:"🏥", regulatory:["Clinical Establishment Act","Biomedical Waste Rules 2016","CDSCO Drug/Device licence","AERB radiation safety","DPDPA (patient data)"], standards:["NABH Accreditation","NABL (lab)","ISO 15189 (medical labs)","ISO 13485 (devices)"], gold:["JCI Accreditation (global gold)","WHO-SEARO Safe Hospital","Green OT / LEED hospital","NABH Full → Teaching Hospital"] },
  { sector:"Manufacturing", icon:"🏭", regulatory:["Factory Licence","BIS/ISI mandatory certification","Consent to Operate (SPCB)","PESO hazardous licence","Contract Labour Act"], standards:["ISO 9001 (Quality)","ISO 14001 (Environment)","ISO 45001 (Safety)","ISO 50001 (Energy)"], gold:["Deming Prize (TQM)","SA8000 Social Accountability","Zero Accident Vision (ZAV)","CMMI (software-linked mfg)"] },
  { sector:"BFSI", icon:"🏦", regulatory:["RBI Cyber Security Framework","SEBI CSCRF (2025)","IRDAI Cyber Guidelines","DPDPA compliance","KYC/AML filings"], standards:["ISO 27001 (mandated by RBI)","ISO 22301 (BCMS)","PCI-DSS (card data)","SOC 2 (fintech SaaS)"], gold:["ISO 42001 (AI Governance)","SWIFT CSP","ESG Rating + SEBI BRSR","Great Place to Work"] },
  { sector:"IT / Tech", icon:"💻", regulatory:["CERT-In 6-hour reporting","DPDPA 2023 + Rules 2025","TRAI QoS reporting","MeitY AI Governance (2025)"], standards:["ISO 27001 (ISMS)","ISO 27701 (Privacy)","SOC 2 Type II","CMMI Level 3+"], gold:["ISO 42001 (AI)","CMMI Level 5","Great Place to Work","CII DX Award"] },
];

const deliveryModels = [
  { id:"saas", name:"SaaS", icon:"☁️", color:T.blue, bg:T.blueL, label:"Software as a Service", tagline:"Log in. Use it. Done.", forWho:"SMBs, startups, mid-size companies, CA firms", description:"Fully hosted on AWS Mumbai. Business accesses via browser or mobile app. Zero installation. Zero IT team needed. Monthly/annual subscription. This is where 90% of customers start.", examples:["Company logs into compliantbharat.in","Gets full dashboard: ISO 27001 + DPDPA + BCAS compliance","Evidence uploaded from mobile","Auditor invited via email link"], pricing:"₹2,999 – ₹75,000/month", complexity:1 },
  { id:"hybrid", name:"Hybrid", icon:"🔀", color:T.green, bg:T.greenL, label:"Hybrid Cloud", tagline:"Cloud intelligence. On-prem control.", forWho:"Banks, hospitals, defence PSUs, airports with data sovereignty needs", description:"Compliance engine runs in customer's data center. Intelligence layer (AI gap analysis, circular updates) synced from our cloud. Customer data never leaves their boundary. Perfect for RBI-regulated entities.", examples:["RBI mandates payment data stays on-prem","Customer's evidence vault hosted on their servers","Circular Intelligence Engine syncs updates from our cloud","AI analysis runs on their infra via our model APIs"], pricing:"₹5L – ₹25L/year + setup", complexity:3 },
  { id:"private", name:"Private Cloud", icon:"🔐", color:T.gold, bg:T.goldL, label:"Private Cloud (Dedicated)", tagline:"Dedicated infrastructure. Shared nothing.", forWho:"Large enterprises, state governments, regulatory bodies", description:"Dedicated AWS instance in Mumbai exclusively for the customer. No multi-tenancy. Their own database cluster, compute, S3 bucket. We manage it; they own the isolation.", examples:["State government portal for 50,000 MSMEs","No data commingled with other customers","Dedicated uptime SLA (99.99%)","Custom branding: 'Maharashtra Compliance Portal powered by CompliantBharat'"], pricing:"₹15L – ₹50L/year", complexity:4 },
  { id:"onprem", name:"On-Prem", icon:"🖥️", color:T.purple, bg:T.purpleL, label:"On-Premises", tagline:"Your servers. Our software.", forWho:"Defence, intelligence agencies, classified government entities", description:"Full CompliantBharat stack on customer's own hardware. Air-gapped if required. Updates via secure channel. Annual licence + support. Think DRDO, RAW, NIC, classified facilities.", examples:["DRDO needs ISO 27001 but cannot connect to internet","Full platform on their servers","Annual update patches via secure channel","Our team provides on-site support visits"], pricing:"₹25L – ₹1Cr+ one-time + ₹10–20L/year support", complexity:5 },
];

const serviceCategories = [
  { id:"core", name:"Core Platform", icon:"🏗️", color:T.blue, services:[
    { name:"ComplianceOS", tier:"Foundation", desc:"The core engine. All 3 layers (regulatory, standards, gold). Evidence vault. Calendar. Score.", delivery:["SaaS","Hybrid","On-Prem"], revenue:"Subscription", phase:"Build first" },
    { name:"Circular Intelligence Engine", tier:"Foundation", desc:"Auto-monitors 50+ regulator portals daily. New circular → task auto-created in every affected business's dashboard.", delivery:["SaaS","Hybrid API"], revenue:"Included", phase:"Build second" },
    { name:"Evidence Vault", tier:"Foundation", desc:"Tamper-proof document store. AI auto-tagged. Version controlled. Unlimited storage.", delivery:["SaaS","Hybrid","On-Prem"], revenue:"Included / overage", phase:"Build first" },
    { name:"ComplianceScore™", tier:"Analytics", desc:"Three-dimensional score: Regulatory / Standards / Gold. Real-time. Board-ready. Shareable with regulators.", delivery:["All models"], revenue:"Included", phase:"Build first" },
  ]},
  { id:"ai", name:"AI Services", icon:"🤖", color:T.purple, services:[
    { name:"GapAI", tier:"Intelligence", desc:"Upload any document → Claude AI maps it to relevant regulatory controls. Gap identified in seconds.", delivery:["SaaS API","Hybrid"], revenue:"Credits / subscription", phase:"Build with MVP" },
    { name:"PolicyGen AI", tier:"Intelligence", desc:"Describe your company → get fully drafted ISO 27001 policies, DPDPA privacy notices, BCAS procedures. Tailored, not templates.", delivery:["SaaS"], revenue:"Credits / Enterprise", phase:"Phase 2" },
    { name:"CircularReader AI", tier:"Intelligence", desc:"Point to any government circular URL → AI extracts: who is affected, what action is needed, deadline, evidence required. 40-page PDF → 5-line action.", delivery:["SaaS","API"], revenue:"Included + API credits", phase:"Phase 2" },
    { name:"AuditCopilot AI", tier:"Intelligence", desc:"Assists auditors during evidence review. Highlights anomalies, suggests follow-up questions, drafts finding language. GitHub Copilot for auditors.", delivery:["SaaS"], revenue:"Auditor add-on", phase:"Phase 3" },
    { name:"RiskPredictor AI", tier:"Intelligence", desc:"Analyses compliance history + score + sector trends → predicts which regulations you're most likely to be inspected on in next 90 days.", delivery:["SaaS","API"], revenue:"Enterprise add-on", phase:"Phase 3" },
  ]},
  { id:"auditor", name:"Auditor Platform", icon:"🔍", color:T.green, services:[
    { name:"AuditWorkspace", tier:"Professional", desc:"Multi-client dashboard for CA firms, ISO CBs, internal audit teams. Manage 50 clients from one view.", delivery:["SaaS"], revenue:"₹4,999–9,999/month/firm", phase:"Phase 2" },
    { name:"SamplingEngine", tier:"Professional", desc:"ISAE/ISO-standard random sampling from evidence pool. Statistical confidence calculations. Defensible methodology baked in.", delivery:["SaaS"], revenue:"Included in Auditor plan", phase:"Phase 2" },
    { name:"ReportForge", tier:"Professional", desc:"Auto-generates audit reports in the exact format for: BCAS, DGCA, NABH, ISO CB, SEBI, RBI, CA Institute. One click → ready-to-submit PDF.", delivery:["SaaS","API"], revenue:"Per-report credits", phase:"Phase 2" },
    { name:"DigitalCert", tier:"Professional", desc:"Tamper-proof digital audit certificates. Timestamped. Verifiable by regulator via QR code directly on our portal.", delivery:["SaaS"], revenue:"₹500/certificate or subscription", phase:"Phase 3" },
    { name:"CAPATracker", tier:"Professional", desc:"Finding raised → Root cause → Corrective action → Evidence → Closure. Full CAPA loop with deadlines and escalation.", delivery:["All models"], revenue:"Included in platform", phase:"Phase 2" },
  ]},
  { id:"api", name:"API & Data", icon:"⚡", color:T.teal, services:[
    { name:"ComplianceScore API", tier:"Data", desc:"Third parties query company X's compliance score. Used by banks for vendor due diligence, PE firms for investment screening.", delivery:["API"], revenue:"₹10–50/query or bulk subscription", phase:"Phase 3" },
    { name:"RegulatoryFeed API", tier:"Data", desc:"Real-time feed of all new Indian regulatory circulars, parsed and structured. Legal tech and GRC tools subscribe.", delivery:["API"], revenue:"₹10K–50K/month", phase:"Phase 3" },
    { name:"NSWS Bridge", tier:"Integration", desc:"Approval granted on NSWS → auto-creates ongoing compliance calendar in CompliantBharat. Closes the gap between getting and maintaining approvals.", delivery:["SaaS","API"], revenue:"Premium integration", phase:"Phase 4" },
    { name:"Webhook Engine", tier:"Integration", desc:"Push compliance events to any system. New BCAS order → fires webhook → client's Jira gets a ticket automatically.", delivery:["SaaS","Hybrid"], revenue:"Included in Growth+", phase:"Phase 2" },
  ]},
  { id:"managed", name:"Managed Services", icon:"🛎️", color:T.gold, services:[
    { name:"ComplianceManager", tier:"Managed", desc:"Dedicated compliance analyst maintains your calendar, uploads evidence, prepares audit packs. Compliance-as-a-service.", delivery:["SaaS + Human"], revenue:"₹25K–1L/month", phase:"Phase 2" },
    { name:"AuditReadiness Sprint", tier:"Managed", desc:"Certification in 60 days? We run a sprint: gap assessment, evidence collection, policy writing, mock audit, sign-off. Fixed price, guaranteed.", delivery:["SaaS + Services"], revenue:"₹1.5L–10L/engagement", phase:"Phase 2" },
    { name:"VirtualCISO", tier:"Managed", desc:"Senior security expert embedded part-time. Attends board meetings, answers BCAS/DGCA queries, manages auditors, builds ISMS.", delivery:["SaaS + Human"], revenue:"₹50K–2L/month", phase:"Phase 3" },
    { name:"TrainingAcademy", tier:"Managed", desc:"Compliance training courses: DPDPA for employees, BCAS AVSEC awareness, ISO 27001 fundamentals. Certificate on completion.", delivery:["SaaS LMS"], revenue:"₹500–2,000/seat", phase:"Phase 2" },
  ]},
  { id:"govt", name:"Regulator Layer", icon:"🏛️", color:T.navy, services:[
    { name:"RegulatorDashboard", tier:"Government", desc:"Sector-wide compliance health. SEBI sees all 5,000 brokers' scores. BCAS sees all 157 airports. Filterable by score, state, risk.", delivery:["Private Cloud","On-Prem"], revenue:"MoU / grant / subscription", phase:"Phase 4" },
    { name:"CircularDistribution", tier:"Government", desc:"Regulators issue circulars THROUGH the platform → auto-distributed to all affected entities with acknowledgement tracking.", delivery:["Private Cloud"], revenue:"Government licensing", phase:"Phase 4" },
    { name:"InspectionQueue AI", tier:"Government", desc:"AI prioritises which entities to inspect next. Lowest scores + approaching deadlines + non-compliance history = inspect first.", delivery:["Private Cloud"], revenue:"Government contract", phase:"Phase 4" },
    { name:"StateGovPortal", tier:"Government", desc:"White-labelled portal for state governments. 'Kerala Compliance Portal powered by CompliantBharat.' One MoU → 50,000 MSMEs onboarded.", delivery:["Private Cloud"], revenue:"₹1–5Cr/year per state", phase:"Phase 4" },
  ]},
  { id:"marketplace", name:"Marketplace", icon:"🛒", color:T.accent, services:[
    { name:"ConsultantMarketplace", tier:"Platform", desc:"Verified ISO consultants, CA firms listed. Business needs ISO 27001 consultant? Browse, compare, book. 10–15% commission.", delivery:["SaaS Marketplace"], revenue:"10–15% commission", phase:"Phase 3" },
    { name:"CertificationBodyConnect", tier:"Platform", desc:"Book ISO certification audit directly. BIS, DNV, Bureau Veritas, TUV listed. Prep done + audit booked + cert delivered in one system.", delivery:["SaaS Marketplace"], revenue:"Referral fee from CBs", phase:"Phase 3" },
    { name:"InsuranceConnect", tier:"Platform", desc:"Cyber insurance providers check your ComplianceScore to price policies. High score = lower premium. Referral fees from insurers.", delivery:["SaaS + API"], revenue:"Commission per policy", phase:"Phase 4" },
  ]},
];

const revenueStreams = [
  { n:"01", name:"SaaS Subscriptions", model:"Monthly/Annual recurring", range:"₹2,999–₹75,000/mo", timing:"Month 1", color:T.blue },
  { n:"02", name:"Enterprise Hybrid/On-Prem", model:"Annual licence + support", range:"₹5L–₹1Cr+/year", timing:"Phase 2+", color:T.green },
  { n:"03", name:"Auditor Platform", model:"Per-firm subscription", range:"₹4,999–₹9,999/mo", timing:"Phase 2", color:T.purple },
  { n:"04", name:"Managed Services", model:"Retainer + project", range:"₹25K–₹2L/mo", timing:"Phase 2", color:T.red },
  { n:"05", name:"Professional Services", model:"Fixed-price projects", range:"₹1.5L–₹10L/engagement", timing:"Phase 2", color:T.accent },
  { n:"06", name:"API Credits", model:"Pay-as-you-go", range:"₹10–₹50/query", timing:"Phase 3", color:T.teal },
  { n:"07", name:"Marketplace Commission", model:"10–15% on bookings", range:"Variable", timing:"Phase 3", color:T.gold },
  { n:"08", name:"Government Contracts", model:"Annual MoU / tender", range:"₹1Cr–₹50Cr", timing:"Phase 4", color:T.navy },
  { n:"09", name:"Training / Certification", model:"Per-seat", range:"₹500–₹2,000/seat", timing:"Phase 2", color:T.muted },
  { n:"10", name:"Data Licensing", model:"B2B data subscription", range:"₹10K–₹50K/mo", timing:"Phase 3", color:T.muted },
  { n:"11", name:"White-label (State Portals)", model:"Government contract", range:"₹1Cr–₹5Cr/year", timing:"Phase 4", color:T.muted },
  { n:"12", name:"Insurance Referrals", model:"Commission per policy", range:"2–5% of premium", timing:"Phase 4", color:T.muted },
];

const awsAnalogy = [
  { aws:"EC2 (compute on demand)", cb:"ComplianceOS (compliance management on demand)", color:T.blue },
  { aws:"S3 (object storage)", cb:"Evidence Vault (compliance document storage)", color:T.green },
  { aws:"CloudWatch (monitoring)", cb:"Circular Intelligence Engine (regulation monitoring)", color:T.purple },
  { aws:"SageMaker (ML platform)", cb:"GapAI / PolicyGen AI / AuditCopilot AI", color:T.gold },
  { aws:"Marketplace (third-party software)", cb:"ConsultantMarketplace (compliance professionals)", color:T.accent },
  { aws:"GovCloud (restricted regions)", cb:"On-Prem / Private Cloud for defence/classified", color:T.red },
  { aws:"Bedrock (foundation AI APIs)", cb:"ComplianceScore API / RegulatoryFeed API", color:T.teal },
  { aws:"Support plans (Basic → Enterprise)", cb:"Managed Services (Self-serve → vCISO)", color:T.muted },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{ background: T.surface, borderRadius: 14, padding: 14, border: `1px solid ${T.border}`, ...style }}>{children}</div>
);
const Pill = ({ label, color, bg }) => (
  <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 9px", borderRadius:20, fontSize:10, fontWeight:700, background: bg || color+"18", color, border:`1px solid ${color}33`, marginRight:4, marginBottom:3 }}>{label}</span>
);
const SectionTitle = ({ children }) => (
  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:17, fontWeight:800, color:T.text, letterSpacing:"-0.02em", marginBottom:4 }}>{children}</div>
);
const Sub = ({ children }) => (
  <div style={{ fontSize:10, color:T.muted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8, marginTop:2 }}>{children}</div>
);

const TOP_NAVS = [
  { id:"overview",  icon:"🌍", label:"Vision" },
  { id:"layers",    icon:"⚖️", label:"3 Layers" },
  { id:"sectors",   icon:"🏭", label:"Sectors" },
  { id:"delivery",  icon:"☁️", label:"Delivery" },
  { id:"services",  icon:"📦", label:"Services" },
  { id:"revenue",   icon:"💰", label:"Revenue" },
  { id:"aws",       icon:"⚡", label:"AWS Model" },
];

// ─── ROADMAP APP ──────────────────────────────────────────────────────────────
export default function RoadmapApp() {
  const [nav, setNav] = useState("overview");
  const [layer, setLayer] = useState(0);
  const [sector, setSector] = useState(0);
  const [sectorTab, setSectorTab] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [cat, setCat] = useState(0);

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif", background:T.bg, minHeight:"100vh", color:T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .fade { animation:fd 0.18s ease-out; }
        @keyframes fd { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:none} }
      `}</style>

      {/* HEADER */}
      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:"12px 16px", boxShadow:"0 1px 12px rgba(26,86,219,0.08)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${T.blue}, ${T.navy})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, boxShadow:`0 2px 12px ${T.blue}44` }}>🇮🇳</div>
          <div>
            <div style={{ fontSize:18, fontWeight:800, color:T.navy, letterSpacing:"-0.02em", lineHeight:1 }}>CompliantBharat</div>
            <div style={{ fontSize:10, color:T.muted, marginTop:2, letterSpacing:"0.04em" }}>Platform Vision & Roadmap</div>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", gap:6, flexShrink:0 }}>
            <div style={{ padding:"4px 10px", borderRadius:20, background:T.blueL, fontSize:10, fontWeight:700, color:T.blue, border:`1px solid ${T.blueM}` }}>Regulatory</div>
            <div style={{ padding:"4px 10px", borderRadius:20, background:T.goldL, fontSize:10, fontWeight:700, color:T.gold, border:`1px solid ${T.gold}55` }}>Standards</div>
            <div style={{ padding:"4px 10px", borderRadius:20, background:"#FFF8F0", fontSize:10, fontWeight:700, color:T.accent, border:`1px solid ${T.accent}44` }}>Gold</div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:"6px 14px", display:"flex", overflowX:"auto", gap:4 }}>
        {TOP_NAVS.map(({ id, icon, label }) => (
          <button key={id} onClick={() => setNav(id)} style={{
            padding:"7px 14px", borderRadius:24, fontSize:11, fontWeight:600, flexShrink:0, border:"none",
            background: nav===id ? T.blue : "transparent",
            color: nav===id ? "#fff" : T.sub,
            boxShadow: nav===id ? `0 2px 8px ${T.blue}44` : "none",
          }}>{icon} {label}</button>
        ))}
      </div>

      <div className="fade" key={nav} style={{ padding:"16px 14px 48px" }}>

        {/* OVERVIEW */}
        {nav === "overview" && (
          <div>
            <div style={{ background:`linear-gradient(135deg, ${T.navy} 0%, ${T.blue} 100%)`, borderRadius:18, padding:20, marginBottom:14, color:"#fff" }}>
              <div style={{ fontSize:22, fontWeight:800, lineHeight:1.3, marginBottom:8, letterSpacing:"-0.02em" }}>India's First Three-Layer<br />Compliance Intelligence Platform</div>
              <div style={{ fontSize:12, opacity:0.82, lineHeight:1.7 }}>50+ regulatory bodies · 11 industry sectors · 1,500+ compliance obligations · 4 delivery models · 12 revenue streams — unified in one national platform.</div>
              <div style={{ marginTop:14, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                {[["50+","Regulators"],["11","Sectors"],["1,500+","Obligations"]].map(([n,l])=>(
                  <div key={l} style={{ background:"rgba(255,255,255,0.12)", borderRadius:10, padding:"10px 8px", textAlign:"center" }}>
                    <div style={{ fontSize:20, fontWeight:800 }}>{n}</div>
                    <div style={{ fontSize:10, opacity:0.75, marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <SectionTitle>Three Users. One Ecosystem.</SectionTitle>
            <div style={{ fontSize:12, color:T.sub, marginBottom:12, lineHeight:1.6 }}>Each user type makes the others more valuable — the classic platform flywheel.</div>
            {[
              { icon:"🏢", role:"Business", color:T.blue, bg:T.blueL, desc:"Know exactly which compliances apply to you. Track every deadline. Upload evidence. See your ComplianceScore. Never miss a renewal." },
              { icon:"🔍", role:"Auditor", color:T.green, bg:T.greenL, desc:"Multi-client dashboard. Verify evidence. Generate reports automatically in BCAS/DGCA/ISO format. Track findings to closure. Digital certificates." },
              { icon:"🏛️", role:"Regulator", color:T.gold, bg:T.goldL, desc:"Real-time dashboard: which entities in your jurisdiction are compliant? Issue circulars that auto-populate in every affected business. Inspection prioritisation AI." },
            ].map(u => (
              <Card key={u.role} style={{ marginBottom:10, borderLeft:`4px solid ${u.color}` }}>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:u.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{u.icon}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:u.color }}>{u.role}</div>
                    <div style={{ fontSize:11, color:T.sub, lineHeight:1.5, marginTop:2 }}>{u.desc}</div>
                  </div>
                </div>
              </Card>
            ))}
            <Card style={{ background:T.blueL, border:`1.5px solid ${T.blue}44`, marginTop:4 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.navy, marginBottom:6 }}>💡 The Gap No One Is Filling</div>
              <div style={{ fontSize:12, color:T.sub, lineHeight:1.8 }}>
                NSWS helps businesses <strong style={{color:T.text}}>get</strong> approvals. MCA21 handles <strong style={{color:T.text}}>corporate filings</strong>. GST portal handles <strong style={{color:T.text}}>tax returns</strong>. But <strong style={{color:T.blue}}>no system tracks ongoing compliance maintenance across all regulators</strong> after initial approvals are obtained. That is exactly the gap CompliantBharat fills.
              </div>
            </Card>
          </div>
        )}

        {/* THREE LAYERS */}
        {nav === "layers" && (
          <div>
            <SectionTitle>The Three-Layer Compliance Model</SectionTitle>
            <div style={{ fontSize:12, color:T.sub, marginBottom:14, lineHeight:1.6 }}>Compliance isn't binary. It's a journey from legal minimum → industry quality → world-class excellence.</div>
            <div style={{ display:"flex", gap:6, marginBottom:14 }}>
              {threeLayers.map((l,i) => (
                <button key={l.id} onClick={()=>setLayer(i)} style={{ flex:1, padding:"12px 6px", borderRadius:12, textAlign:"center", border:"none", background: layer===i ? l.color : T.surface, boxShadow: layer===i ? `0 4px 14px ${l.color}33` : `0 0 0 1.5px ${T.border}` }}>
                  <div style={{ fontSize:22 }}>{l.icon}</div>
                  <div style={{ fontSize:9, fontWeight:700, color:layer===i?"#fff":T.muted, marginTop:3 }}>{l.layer}</div>
                </button>
              ))}
            </div>
            {(() => {
              const l = threeLayers[layer];
              return (
                <div className="fade" key={l.id}>
                  <Card style={{ borderTop:`3px solid ${l.color}`, marginBottom:10 }}>
                    <div style={{ padding:"8px 12px", background:l.bg, borderRadius:8, marginBottom:10, border:`1px solid ${l.color}33` }}>
                      <div style={{ fontSize:12, fontWeight:700, color:l.color }}>{l.tagline}</div>
                    </div>
                    <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:2 }}>{l.title}</div>
                    <div style={{ fontSize:10, color:T.muted, marginBottom:8 }}>{l.subtitle}</div>
                    <div style={{ fontSize:12, color:T.sub, lineHeight:1.7 }}>{l.description}</div>
                  </Card>
                  <Card style={{ marginBottom:10 }}>
                    <Sub>Real examples in India</Sub>
                    {l.examples.map((ex,i)=>(
                      <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
                        <div style={{ width:16, height:16, borderRadius:4, background:l.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                          <div style={{ width:6, height:6, borderRadius:2, background:l.color }} />
                        </div>
                        <span style={{ fontSize:11, color:T.sub, lineHeight:1.5 }}>{ex}</span>
                      </div>
                    ))}
                  </Card>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
                    <Card><Sub>Governed by</Sub><div style={{ fontSize:11, color:T.text, lineHeight:1.5 }}>{l.who}</div></Card>
                    <Card style={{ background:l.bg, border:`1px solid ${l.color}33` }}><Sub>If missed</Sub><div style={{ fontSize:11, color:l.color, fontWeight:600, lineHeight:1.5 }}>{l.penalty}</div></Card>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <Card><Sub>Managed today</Sub><div style={{ fontSize:11, color:T.red, lineHeight:1.4 }}>{l.current}</div></Card>
                    <Card style={{ background:T.greenL, border:`1px solid ${T.green}33` }}><Sub>CompliantBharat builds</Sub><div style={{ fontSize:11, color:T.green, lineHeight:1.4 }}>{l.build}</div></Card>
                  </div>
                  <Card style={{ marginTop:10, background:`linear-gradient(135deg, ${T.blueL}, ${T.surface})`, border:`1px solid ${T.blue}33` }}>
                    <div style={{ fontSize:12, fontWeight:700, color:T.navy, marginBottom:10 }}>🎯 ComplianceScore™ — Three-Dimensional</div>
                    {[{ label:"Regulatory Score", val:71, c:T.red },{ label:"Standards Score", val:45, c:T.blue },{ label:"Gold Score", val:12, c:T.gold },{ label:"Overall Score", val:43, c:T.navy }].map((s,i)=>(
                      <div key={s.label} style={{ marginBottom:10 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                          <span style={{ fontSize:11, color:i<3?T.sub:T.text, fontWeight:i===3?700:400 }}>{s.label}</span>
                          <span style={{ fontSize:13, fontWeight:800, color:s.c }}>{s.val}%</span>
                        </div>
                        <div style={{ height:i===3?8:5, background:T.border, borderRadius:4, overflow:"hidden" }}>
                          <div style={{ height:"100%", borderRadius:4, background:s.c, width:`${s.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </Card>
                </div>
              );
            })()}
          </div>
        )}

        {/* SECTORS */}
        {nav === "sectors" && (
          <div>
            <SectionTitle>Regulatory Universe × Sector Matrix</SectionTitle>
            <div style={{ fontSize:12, color:T.sub, marginBottom:14 }}>11 sectors · 50+ regulators · 1,500+ compliance items — every Indian business mapped.</div>
            <div style={{ display:"flex", gap:6, overflowX:"auto", marginBottom:12, paddingBottom:4 }}>
              {regulatoryUniverse.map((s,i)=>(
                <button key={i} onClick={()=>{setSector(i);setSectorTab(0)}} style={{ flexShrink:0, padding:"8px 10px", borderRadius:10, textAlign:"center", minWidth:68, border:"none", background: sector===i ? s.color : T.surface, boxShadow: sector===i ? `0 2px 8px ${s.color}33` : `0 0 0 1.5px ${T.border}` }}>
                  <div style={{ fontSize:18 }}>{s.icon}</div>
                  <div style={{ fontSize:9, fontWeight:700, color:sector===i?"#fff":T.muted, marginTop:2 }}>{s.sector.split(" ")[0]}</div>
                </button>
              ))}
            </div>
            {(() => {
              const s = regulatoryUniverse[sector];
              const m = sectorMatrix.find(x=>x.sector===s.sector);
              return (
                <div className="fade" key={s.sector}>
                  <Card style={{ borderTop:`3px solid ${s.color}`, marginBottom:10 }}>
                    <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
                      <div style={{ width:48, height:48, borderRadius:12, background:s.color+"18", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{s.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:15, fontWeight:800, color:T.text }}>{s.sector}</div>
                        <div style={{ display:"flex", gap:8, marginTop:4, flexWrap:"wrap" }}>
                          <span style={{ fontSize:12, fontWeight:700, color:s.color }}>{s.count} items</span>
                          <span style={{ fontSize:11, color:T.muted }}>·</span>
                          <span style={{ fontSize:11, color:T.sub }}>{s.market}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                      {s.regulators.map(r=><Pill key={r} label={r} color={s.color} />)}
                    </div>
                  </Card>
                  <div style={{ display:"flex", gap:6, marginBottom:10 }}>
                    {[{ l:"⚖️ Regulatory", c:T.red },{ l:"🏅 Standards", c:T.blue },{ l:"🏆 Gold", c:T.gold }].map(({ l,c },i)=>(
                      <button key={l} onClick={()=>setSectorTab(i)} style={{ flex:1, padding:"8px 4px", borderRadius:10, fontSize:10, fontWeight:700, textAlign:"center", border:"none", background: sectorTab===i ? c+"18" : T.surface, color: sectorTab===i ? c : T.muted, boxShadow: `0 0 0 1.5px ${sectorTab===i ? c : T.border}` }}>{l}</button>
                    ))}
                  </div>
                  <Card className="fade" key={sectorTab}>
                    <Sub>{["Mandatory Regulatory Requirements","Industry Standards to Pursue","Gold Standard Benchmarks"][sectorTab]}</Sub>
                    {(m ? [m.regulatory,m.standards,m.gold][sectorTab] : s.items).map((item,i)=>(
                      <div key={i} style={{ display:"flex", gap:8, marginBottom:7 }}>
                        <div style={{ width:18, height:18, borderRadius:4, background:[T.red,T.blue,T.gold][sectorTab]+"15", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                          <div style={{ width:6, height:6, borderRadius:2, background:[T.red,T.blue,T.gold][sectorTab] }} />
                        </div>
                        <span style={{ fontSize:11, color:T.sub, lineHeight:1.5 }}>{item}</span>
                      </div>
                    ))}
                    {!m && sectorTab > 0 && <div style={{ textAlign:"center", padding:12, color:T.muted, fontSize:11 }}>Select Aviation, Healthcare, Manufacturing, BFSI, or IT to see detailed data.</div>}
                  </Card>
                </div>
              );
            })()}
          </div>
        )}

        {/* DELIVERY */}
        {nav === "delivery" && (
          <div>
            <SectionTitle>4 Delivery Models</SectionTitle>
            <div style={{ fontSize:12, color:T.sub, marginBottom:14, lineHeight:1.6 }}>Same platform. Four ways to consume it. Different customers, different prices, different moats.</div>
            <div style={{ display:"flex", gap:6, marginBottom:14 }}>
              {deliveryModels.map((d,i)=>(
                <button key={d.id} onClick={()=>setDelivery(i)} style={{ flex:1, padding:"12px 6px", borderRadius:12, textAlign:"center", border:"none", background: delivery===i ? d.color : T.surface, boxShadow: delivery===i ? `0 4px 14px ${d.color}33` : `0 0 0 1.5px ${T.border}` }}>
                  <div style={{ fontSize:22 }}>{d.icon}</div>
                  <div style={{ fontSize:9, fontWeight:700, color:delivery===i?"#fff":T.muted, marginTop:3 }}>{d.name}</div>
                </button>
              ))}
            </div>
            {(() => {
              const d = deliveryModels[delivery];
              return (
                <div className="fade" key={d.id}>
                  <Card style={{ borderTop:`3px solid ${d.color}`, marginBottom:10 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <div style={{ width:44, height:44, borderRadius:12, background:d.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{d.icon}</div>
                      <div>
                        <div style={{ fontSize:14, fontWeight:800, color:T.text }}>{d.name}</div>
                        <div style={{ fontSize:10, color:T.muted }}>{d.label}</div>
                      </div>
                    </div>
                    <div style={{ padding:"8px 12px", background:d.bg, borderRadius:8, marginBottom:10, borderLeft:`3px solid ${d.color}` }}>
                      <span style={{ fontSize:12, fontWeight:700, color:d.color }}>"{d.tagline}"</span>
                    </div>
                    <div style={{ fontSize:12, color:T.sub, lineHeight:1.7 }}>{d.description}</div>
                  </Card>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:10 }}>
                    <Card><Sub>Target Customer</Sub><div style={{ fontSize:11, color:T.sub, lineHeight:1.5 }}>{d.forWho}</div></Card>
                    <Card style={{ background:d.bg, border:`1px solid ${d.color}33` }}><Sub>Pricing</Sub><div style={{ fontSize:13, fontWeight:800, color:d.color }}>{d.pricing}</div></Card>
                  </div>
                  <Card style={{ marginBottom:10 }}>
                    <Sub>Complexity</Sub>
                    <div style={{ display:"flex", gap:4, marginBottom:4 }}>
                      {[1,2,3,4,5].map(n=><div key={n} style={{ flex:1, height:6, borderRadius:3, background:n<=d.complexity ? d.color : T.border }} />)}
                    </div>
                    <div style={{ fontSize:10, color:T.muted }}>{["Simple","Low","Medium","High","Very High"][d.complexity-1]}</div>
                  </Card>
                  <Card>
                    <Sub>In Practice</Sub>
                    {d.examples.map((ex,i)=>(
                      <div key={i} style={{ display:"flex", gap:8, marginBottom:6 }}>
                        <div style={{ width:5, height:5, borderRadius:"50%", background:d.color, flexShrink:0, marginTop:5 }} />
                        <span style={{ fontSize:11, color:T.sub, lineHeight:1.5 }}>{ex}</span>
                      </div>
                    ))}
                  </Card>
                </div>
              );
            })()}
          </div>
        )}

        {/* SERVICES */}
        {nav === "services" && (
          <div>
            <SectionTitle>Complete Service Catalog</SectionTitle>
            <div style={{ fontSize:12, color:T.sub, marginBottom:14 }}>7 categories · 35+ services. Like AWS — start with core, expand into adjacent value over time.</div>
            <div style={{ display:"flex", gap:6, overflowX:"auto", marginBottom:12, paddingBottom:4 }}>
              {serviceCategories.map((c,i)=>(
                <button key={c.id} onClick={()=>setCat(i)} style={{ flexShrink:0, padding:"8px 10px", borderRadius:10, textAlign:"center", minWidth:72, border:"none", background: cat===i ? c.color : T.surface, boxShadow: cat===i ? `0 2px 8px ${c.color}33` : `0 0 0 1.5px ${T.border}` }}>
                  <div style={{ fontSize:18 }}>{c.icon}</div>
                  <div style={{ fontSize:9, fontWeight:700, color:cat===i?"#fff":T.muted, marginTop:2 }}>{c.name.split(" ")[0]}</div>
                </button>
              ))}
            </div>
            {(() => {
              const c = serviceCategories[cat];
              return (
                <div className="fade" key={c.id}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:c.color+"15", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:800, color:T.text }}>{c.name}</div>
                      <div style={{ fontSize:10, color:T.muted }}>{c.services.length} services</div>
                    </div>
                  </div>
                  {c.services.map((svc)=>(
                    <Card key={svc.name} style={{ marginBottom:8, borderLeft:`3px solid ${c.color}` }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6, gap:8 }}>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{svc.name}</div>
                          <Pill label={svc.tier} color={c.color} />
                        </div>
                        <span style={{ fontSize:10, fontWeight:600, color:T.green, background:T.greenL, border:`1px solid ${T.green}33`, padding:"2px 8px", borderRadius:20, flexShrink:0 }}>{svc.phase}</span>
                      </div>
                      <div style={{ fontSize:11, color:T.sub, lineHeight:1.6, marginBottom:8 }}>{svc.desc}</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                        {svc.delivery.map(d=><Pill key={d} label={d} color={T.muted} bg={T.card} />)}
                        <Pill label={svc.revenue} color={T.gold} />
                      </div>
                    </Card>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* REVENUE */}
        {nav === "revenue" && (
          <div>
            <SectionTitle>12 Revenue Streams</SectionTitle>
            <div style={{ fontSize:12, color:T.sub, marginBottom:14, lineHeight:1.6 }}>AWS charges for compute, storage, bandwidth, API calls, support, training, marketplace commissions. So do we.</div>
            {revenueStreams.map((r)=>(
              <Card key={r.n} style={{ marginBottom:8, display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:36, height:36, borderRadius:10, background:r.color+"15", border:`1px solid ${r.color}33`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:11, color:r.color, flexShrink:0 }}>{r.n}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.text, marginBottom:2 }}>{r.name}</div>
                  <div style={{ fontSize:10, color:T.muted, marginBottom:4 }}>{r.model} · Start: {r.timing}</div>
                  <div style={{ fontSize:13, fontWeight:800, color:r.color }}>{r.range}</div>
                </div>
              </Card>
            ))}
            <Card style={{ background:`linear-gradient(135deg, ${T.blueL}, ${T.surface})`, border:`1.5px solid ${T.blue}44`, marginTop:4 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.navy, marginBottom:12 }}>📈 Revenue Architecture Over Time</div>
              {[
                { yr:"2026", streams:"2 streams", desc:"SaaS subscriptions + Managed services", mrr:"₹10–15L MRR" },
                { yr:"2027", streams:"5 streams", desc:"+ Auditor platform + APIs + Training", mrr:"₹75L MRR" },
                { yr:"2028", streams:"8 streams", desc:"+ Marketplace + Data licensing + Enterprise", mrr:"₹3–5Cr MRR" },
                { yr:"2029+", streams:"12 streams", desc:"+ Government + Insurance + State portals", mrr:"₹10–15Cr MRR" },
              ].map(({ yr,streams,desc,mrr },i)=>(
                <div key={yr} style={{ display:"flex", gap:12, padding:"10px 0", borderBottom:i<3?`1px solid ${T.border}`:"none", alignItems:"flex-start" }}>
                  <div style={{ minWidth:44, flexShrink:0 }}>
                    <div style={{ fontSize:14, fontWeight:800, color:T.blue }}>{yr}</div>
                    <div style={{ fontSize:10, color:T.muted }}>{streams}</div>
                  </div>
                  <div style={{ flex:1 }}><div style={{ fontSize:11, color:T.sub, lineHeight:1.5 }}>{desc}</div></div>
                  <div style={{ fontSize:14, fontWeight:800, color:T.green, flexShrink:0 }}>{mrr}</div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* AWS MODEL */}
        {nav === "aws" && (
          <div>
            <SectionTitle>Think Like AWS</SectionTitle>
            <div style={{ fontSize:12, color:T.sub, marginBottom:14, lineHeight:1.6 }}>AWS started as "rent a server." Became infrastructure for 70% of the internet. Every service made the platform stickier. That is the model.</div>
            <Card style={{ marginBottom:12 }}>
              <Sub>Service Analogy Map</Sub>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4, marginBottom:4 }}>
                <div style={{ fontSize:10, color:T.muted, fontWeight:700, padding:"4px 0", borderBottom:`1px solid ${T.border}` }}>AWS Service</div>
                <div style={{ fontSize:10, color:T.blue, fontWeight:700, padding:"4px 0", borderBottom:`1px solid ${T.border}` }}>CompliantBharat Equivalent</div>
              </div>
              {awsAnalogy.map(({ aws,cb,color },i)=>(
                <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, padding:"8px 0", borderBottom:`1px solid ${T.border}`, alignItems:"start" }}>
                  <div style={{ fontSize:11, color:T.muted }}>{aws}</div>
                  <div style={{ fontSize:11, fontWeight:600, color }}>→ {cb}</div>
                </div>
              ))}
            </Card>
            {[
              { title:"Start narrow, win deep", color:T.blue, detail:"AWS started with S3 + EC2. Dominated those two. Then expanded. We start with ISO 27001 + DPDPA + Aviation. Win those completely. Then expand sector by sector." },
              { title:"Every service makes others stickier", color:T.green, detail:"AWS: use EC2 → you need S3, RDS, CloudWatch. Us: use ComplianceOS → you need Evidence Vault, CircularEngine, AuditWorkspace, ReportForge. Switching cost compounds with every service added." },
              { title:"The platform is the moat, not the feature", color:T.purple, detail:"AWS doesn't win because EC2 is the best VM. It wins because the ecosystem is unbeatable. We win because content + AI + auditors + regulators + marketplace cannot be replicated in under 5 years." },
              { title:"Charge at every layer", color:T.gold, detail:"AWS charges for compute, storage, bandwidth, API calls, support, training. We charge for subscription, API credits, managed services, audit bookings, training seats, data licensing, commissions." },
              { title:"Government unlocks exponential scale", color:T.navy, detail:"AWS GovCloud unlocked US federal agencies. Our RegulatorDashboard unlocks every regulated entity in India. A single state government MoU brings 50,000 MSMEs onto the platform overnight." },
            ].map(({ title,color,detail })=>(
              <Card key={title} style={{ marginBottom:8, borderLeft:`3px solid ${color}` }}>
                <div style={{ fontSize:12, fontWeight:700, color, marginBottom:4 }}>{title}</div>
                <div style={{ fontSize:11, color:T.sub, lineHeight:1.6 }}>{detail}</div>
              </Card>
            ))}
            <div style={{ background:`linear-gradient(135deg, ${T.navy}, ${T.blue})`, borderRadius:16, padding:18, marginTop:4, textAlign:"center", color:"#fff" }}>
              <div style={{ fontSize:14, fontWeight:800, lineHeight:1.6, letterSpacing:"-0.01em" }}>
                "AWS is infrastructure for the internet.<br />
                <span style={{ color:"#93C5FD" }}>CompliantBharat is infrastructure for Indian compliance.</span><br />
                Every business needs it. No one else is building it."
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
