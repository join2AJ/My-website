import { useState } from 'react'

const T = {
  bg: '#F0F4FF', surface: '#FFFFFF', card: '#F8FAFF',
  border: '#D6E0FF', text: '#0F1733', sub: '#3D5080', muted: '#7A90BF',
  blue: '#1A56DB', blueL: '#EBF2FF', blueM: '#93B4F8', navy: '#0D2B6E',
  accent: '#FF6B35', green: '#0E9F6E', greenL: '#ECFDF5',
  purple: '#7C3AED', purpleL: '#F5F3FF',
  gold: '#D97706', goldL: '#FFFBEB',
  red: '#DC2626', redL: '#FEF2F2', teal: '#0891B2', tealL: '#ECFEFF',
}

const sectors = [
  { icon:'🏦', name:'Finance & Banking', color:T.red,    count:'200+' },
  { icon:'✈️', name:'Aviation',          color:T.blue,   count:'150+' },
  { icon:'🏥', name:'Healthcare',        color:T.purple, count:'180+' },
  { icon:'🏭', name:'Manufacturing',     color:T.teal,   count:'250+' },
  { icon:'🌾', name:'Food & Agri',       color:T.green,  count:'120+' },
  { icon:'💻', name:'IT / Tech',         color:T.blue,   count:'80+'  },
  { icon:'⚡', name:'Energy',            color:T.gold,   count:'130+' },
  { icon:'🎓', name:'Education',         color:T.purple, count:'90+'  },
  { icon:'🏢', name:'Universal',         color:T.muted,  count:'60+'  },
]

const buildingNow = [
  {
    phase: 'Phase 1 — Building Now',
    color: T.blue, bg: T.blueL,
    badge: '🔨 In Progress',
    items: [
      { name: 'ComplianceOS Core', desc: 'Compliance calendar, task tracking, deadline alerts across all 3 layers' },
      { name: 'Evidence Vault', desc: 'Tamper-proof document storage with AI auto-tagging and version control' },
      { name: 'ComplianceScore™', desc: 'Three-dimensional score: Regulatory / Standards / Gold — board-ready dashboard' },
      { name: 'Circular Intelligence Engine', desc: 'Auto-monitors 50+ regulator portals daily, creates tasks on new circulars' },
    ],
  },
  {
    phase: 'Phase 2 — Coming Next',
    color: T.green, bg: T.greenL,
    badge: '📋 Planned',
    items: [
      { name: 'GapAI', desc: 'Upload any document → Claude AI maps gaps to regulatory controls in seconds' },
      { name: 'AuditWorkspace', desc: 'Multi-client dashboard for CA firms and ISO certification bodies' },
      { name: 'ReportForge', desc: 'One-click audit reports in BCAS / DGCA / NABH / ISO / SEBI formats' },
      { name: 'PolicyGen AI', desc: 'Describe your company → get fully drafted ISO 27001 policies and DPDPA notices' },
    ],
  },
  {
    phase: 'Phase 3 — Future',
    color: T.purple, bg: T.purpleL,
    badge: '🔭 Roadmap',
    items: [
      { name: 'ConsultantMarketplace', desc: 'Verified ISO consultants and CA firms — browse, compare, book' },
      { name: 'ComplianceScore API', desc: 'Banks and PE firms query vendor compliance scores for due diligence' },
      { name: 'AuditCopilot AI', desc: 'GitHub Copilot for auditors — highlights anomalies, suggests follow-ups' },
      { name: 'VirtualCISO', desc: 'Senior security expert embedded part-time, manages auditors and regulators' },
    ],
  },
  {
    phase: 'Phase 4 — Scale',
    color: T.gold, bg: T.goldL,
    badge: '🏛️ Enterprise',
    items: [
      { name: 'RegulatorDashboard', desc: 'SEBI sees all 5,000 brokers\' scores. BCAS sees all 157 airports. Real-time.' },
      { name: 'StateGovPortal', desc: 'White-labelled state government portals — one MoU brings 50,000 MSMEs onboard' },
      { name: 'InspectionQueue AI', desc: 'AI prioritises which entities to inspect next based on scores and history' },
      { name: 'InsuranceConnect', desc: 'High compliance score = lower cyber insurance premium. Referral marketplace.' },
    ],
  },
]

function Stat({ num, label }) {
  return (
    <div style={{ textAlign: 'center', flex: 1, minWidth: 80 }}>
      <div style={{ fontSize: 28, fontWeight: 900, color: T.blue, letterSpacing: '-0.03em' }}>{num}</div>
      <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{label}</div>
    </div>
  )
}

export default function Landing({ onViewRoadmap, onViewAviation }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const btnPrimary = {
    padding: '13px 28px', borderRadius: 50, border: 'none', cursor: 'pointer',
    background: `linear-gradient(135deg, ${T.blue}, ${T.navy})`,
    color: '#fff', fontSize: 14, fontWeight: 700,
    boxShadow: `0 4px 20px ${T.blue}44`, letterSpacing: '-0.01em',
  }
  const btnOutline = {
    padding: '13px 28px', borderRadius: 50, cursor: 'pointer',
    background: T.surface, color: T.navy, border: `1.5px solid ${T.border}`,
    fontSize: 14, fontWeight: 600,
  }

  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text }}>

      {/* ── NAV ── */}
      <nav style={{
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        padding: '13px 6%', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 12px rgba(26,86,219,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: `linear-gradient(135deg, ${T.blue}, ${T.navy})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}>🇮🇳</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.navy, letterSpacing: '-0.02em', lineHeight: 1, whiteSpace: 'nowrap' }}>CompliantBharat</div>
            <div style={{ fontSize: 9, color: T.muted, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>India's Compliance OS</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <button onClick={onViewAviation} style={{
            padding: '7px 14px', borderRadius: 24, background: '#ECFEFF',
            color: T.teal, border: `1px solid ${T.teal}33`, fontSize: 12,
            fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>✈️ Aviation Demo</button>
          <button onClick={onViewRoadmap} style={{
            padding: '7px 14px', borderRadius: 24, background: T.blueL,
            color: T.blue, border: `1px solid ${T.blue}33`, fontSize: 12,
            fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
          }}>Platform Vision</button>
          <button style={{
            padding: '7px 14px', borderRadius: 24, border: 'none', cursor: 'pointer',
            background: `linear-gradient(135deg, ${T.blue}, ${T.navy})`,
            color: '#fff', fontSize: 12, fontWeight: 600,
            boxShadow: `0 2px 10px ${T.blue}44`, whiteSpace: 'nowrap',
          }}>Join Waitlist</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: '64px 6% 52px', textAlign: 'center', maxWidth: 920, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '5px 16px', borderRadius: 24,
          background: T.blueL, border: `1px solid ${T.blue}33`,
          color: T.blue, fontSize: 11, fontWeight: 700, marginBottom: 28, letterSpacing: '0.04em',
        }}>🇮🇳 BUILT FOR INDIA · NOW IN DEVELOPMENT</div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 900, color: T.navy,
          lineHeight: 1.08, letterSpacing: '-0.04em', marginBottom: 22,
        }}>
          India's First<br />
          <span style={{
            background: `linear-gradient(135deg, ${T.blue} 0%, ${T.navy} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Compliance Operating System</span>
        </h1>

        <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: T.sub, lineHeight: 1.75, marginBottom: 36, maxWidth: 620, margin: '0 auto 36px' }}>
          The first platform that unifies{' '}
          <strong style={{ color: T.red }}>Regulatory</strong> +{' '}
          <strong style={{ color: T.blue }}>Standards</strong> +{' '}
          <strong style={{ color: T.gold }}>Gold</strong> compliance for every Indian business.{' '}
          50+ regulators. 11 sectors. One dashboard.
        </p>

        {/* Stats bar */}
        <div style={{
          display: 'flex', justifyContent: 'center', background: T.surface,
          border: `1px solid ${T.border}`, borderRadius: 16, padding: '20px 10px',
          maxWidth: 580, margin: '0 auto 36px', gap: 0,
        }}>
          {[['50+','Regulators'],['11','Sectors'],['1,500+','Obligations'],['4','Delivery Models']].map(([n,l], i, arr) => (
            <div key={l} style={{ flex: 1, borderRight: i < arr.length - 1 ? `1px solid ${T.border}` : 'none' }}>
              <Stat num={n} label={l} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={btnPrimary} onClick={onViewRoadmap}>Explore Platform Vision →</button>
          <button style={btnOutline}>Join Early Access</button>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ padding: '52px 6%', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.red, letterSpacing: '0.1em', marginBottom: 8 }}>THE PROBLEM</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, color: T.text, letterSpacing: '-0.03em', marginBottom: 10 }}>Today, compliance is chaos</h2>
          <p style={{ fontSize: 13, color: T.sub, maxWidth: 500, margin: '0 auto' }}>Every Indian business navigates 50+ regulators with no unified system.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14 }}>
          {[
            { icon:'📁', title:'Excel & WhatsApp', desc:'Compliance tracked in spreadsheets and paper registers. One missed message = missed deadline = fine.' },
            { icon:'⏰', title:'Missed Deadlines', desc:'EPFO by 25th. ESIC by 15th. CERT-In in 6 hours. No system alerts you. Fines arrive before awareness.' },
            { icon:'💸', title:'Fragmented Consultants', desc:'Separate consultant for ISO, another for NABH, another for BCAS. Expensive, siloed, uncoordinated.' },
            { icon:'😰', title:'Audit Anxiety', desc:'Inspections come unannounced. Evidence scattered across drives and WhatsApp. Panic mode every time.' },
          ].map(p => (
            <div key={p.title} style={{ background: T.surface, borderRadius: 14, padding: '20px 18px', border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 30, marginBottom: 12 }}>{p.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 7 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.65 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THREE LAYERS ── */}
      <section style={{ padding: '52px 6%', background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, letterSpacing: '0.1em', marginBottom: 8 }}>THE SOLUTION</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, color: T.text, letterSpacing: '-0.03em', marginBottom: 10 }}>One Platform. Three Layers.</h2>
            <p style={{ fontSize: 13, color: T.sub, maxWidth: 500, margin: '0 auto' }}>From legally mandatory → industry standard → world-class excellence. Tracked in one unified dashboard.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 16 }}>
            {[
              { icon:'⚖️', color:T.red, bg:T.redL, sub:'Layer 1 — Mandatory', title:'Regulatory Compliance', desc:'Every law, circular, and order from 50+ regulators. MUST comply or face fines, licence suspension, criminal liability.', tag:'Non-negotiable' },
              { icon:'🏅', color:T.blue, bg:T.blueL, sub:'Layer 2 — Quality Markers', title:'Industry Standards', desc:'BIS, ISO, NABH, NABL standards. Required for contracts, export markets, insurance empanelment, government procurement.', tag:'Competitive Edge' },
              { icon:'🏆', color:T.gold, bg:T.goldL, sub:'Layer 3 — Excellence', title:'Gold Standards', desc:'ACI Level 4, CMMI Level 5, SA8000, JCI. World-class benchmarks that attract premium clients and foreign investment.', tag:'Best-in-Class' },
            ].map(l => (
              <div key={l.title} style={{ background: l.bg, borderRadius: 18, padding: 24, border: `1.5px solid ${l.color}33` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 13, background: T.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: `0 2px 10px ${l.color}22` }}>{l.icon}</div>
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: l.color, letterSpacing: '0.08em' }}>{l.sub}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.text }}>{l.title}</div>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.7, marginBottom: 14 }}>{l.desc}</p>
                <span style={{ display: 'inline-flex', padding: '3px 12px', borderRadius: 20, background: T.surface, color: l.color, fontSize: 10, fontWeight: 700, border: `1px solid ${l.color}44` }}>{l.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE'RE BUILDING ── */}
      <section style={{ padding: '52px 6%', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, letterSpacing: '0.1em', marginBottom: 8 }}>WHAT WE'RE BUILDING</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, color: T.text, letterSpacing: '-0.03em', marginBottom: 10 }}>The Build Roadmap</h2>
          <p style={{ fontSize: 13, color: T.sub, maxWidth: 500, margin: '0 auto' }}>35+ services across 4 phases. Start with core, expand into an AWS-scale compliance ecosystem.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {buildingNow.map(phase => (
            <div key={phase.phase} style={{ background: T.surface, borderRadius: 18, border: `1.5px solid ${phase.color}33`, overflow: 'hidden' }}>
              <div style={{ background: phase.bg, padding: '14px 18px', borderBottom: `1px solid ${phase.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: phase.color }}>{phase.phase}</div>
                <span style={{ fontSize: 10, fontWeight: 700, background: T.surface, color: phase.color, padding: '3px 10px', borderRadius: 20, border: `1px solid ${phase.color}33` }}>{phase.badge}</span>
              </div>
              <div style={{ padding: '14px 18px' }}>
                {phase.items.map((item, i) => (
                  <div key={item.name} style={{ paddingBottom: i < phase.items.length - 1 ? 12 : 0, marginBottom: i < phase.items.length - 1 ? 12 : 0, borderBottom: i < phase.items.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 3 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: T.sub, lineHeight: 1.55 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <button onClick={onViewRoadmap} style={{ ...btnPrimary, fontSize: 13 }}>
            View Full Platform Blueprint →
          </button>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section style={{ padding: '52px 6%', background: T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, letterSpacing: '0.1em', marginBottom: 8 }}>COVERAGE</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, color: T.text, letterSpacing: '-0.03em', marginBottom: 8 }}>Every Indian sector. Every regulator.</h2>
            <p style={{ fontSize: 13, color: T.sub }}>Pre-built compliance libraries across 11 sectors — ready on day one.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 10 }}>
            {sectors.map(s => (
              <div key={s.name} style={{ background: T.card, borderRadius: 14, padding: '18px 8px', textAlign: 'center', border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.text, lineHeight: 1.3, marginBottom: 5 }}>{s.name}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: s.color }}>{s.count} items</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE USERS ── */}
      <section style={{ padding: '52px 6%', background: `linear-gradient(135deg, ${T.navy} 0%, ${T.blue} 100%)` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', marginBottom: 8 }}>THE ECOSYSTEM</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 10 }}>Three Users. One Ecosystem.</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', maxWidth: 440, margin: '0 auto' }}>Each user makes the others more valuable — the classic platform flywheel.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { icon:'🏢', role:'Business', color:'#93B4F8', desc:'Know exactly which compliances apply to you. Track every deadline. Upload evidence. See your ComplianceScore. Never face a surprise inspection.' },
              { icon:'🔍', role:'Auditor / CA Firm', color:'#6EE7B7', desc:'Multi-client dashboard. Verify evidence remotely. Generate audit reports in BCAS/DGCA/ISO format automatically. Issue tamper-proof digital certificates.' },
              { icon:'🏛️', role:'Regulator', color:'#FCD34D', desc:'Real-time sector-wide compliance health. Issue circulars that auto-populate in every affected business. AI-prioritised inspection queue.' },
            ].map(u => (
              <div key={u.role} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 18, padding: 24, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontSize: 34, marginBottom: 12 }}>{u.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: u.color, marginBottom: 10 }}>{u.role}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7 }}>{u.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + WAITLIST ── */}
      <section style={{ padding: '64px 6%', textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.blue, letterSpacing: '0.1em', marginBottom: 14 }}>PLATFORM BLUEPRINT</div>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, color: T.text, letterSpacing: '-0.03em', marginBottom: 16 }}>See the complete platform vision</h2>
        <p style={{ fontSize: 13, color: T.sub, lineHeight: 1.8, marginBottom: 32 }}>
          Explore the full interactive blueprint — 3 compliance layers, 11 sectors, 4 delivery models,
          35+ services, 12 revenue streams, and the AWS-scale vision for Indian compliance infrastructure.
        </p>
        <button onClick={onViewRoadmap} style={{ ...btnPrimary, marginBottom: 40 }}>
          View Platform Roadmap →
        </button>

        {/* Waitlist */}
        <div style={{ background: T.surface, borderRadius: 20, padding: '28px 24px', border: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: T.text, marginBottom: 6 }}>Join the Early Access Waitlist</div>
          <div style={{ fontSize: 12, color: T.muted, marginBottom: 20 }}>Be first to know when we launch. No spam, ever.</div>
          {submitted ? (
            <div style={{ padding: '13px 20px', background: T.greenL, borderRadius: 12, color: T.green, fontSize: 13, fontWeight: 700, border: `1px solid ${T.green}33` }}>
              ✓ You're on the list! We'll reach out soon.
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" type="email"
                style={{ flex: 1, minWidth: 200, padding: '11px 18px', borderRadius: 50, border: `1.5px solid ${T.border}`, fontSize: 13, outline: 'none', color: T.text, background: T.bg }}
                onFocus={e => e.target.style.borderColor = T.blue}
                onBlur={e => e.target.style.borderColor = T.border}
              />
              <button
                onClick={() => email && setSubmitted(true)}
                style={{ padding: '11px 24px', borderRadius: 50, background: T.blue, color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
              >Join Waitlist</button>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: T.navy, padding: '28px 6%', textAlign: 'center' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 6 }}>CompliantBharat</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>India's National Compliance Intelligence Platform · Building for 2026</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
          <span>Regulatory</span> · <span>Standards</span> · <span>Gold</span> ·{' '}
          <span style={{ color: T.accent }}>One Platform.</span>
        </div>
      </footer>
    </div>
  )
}
