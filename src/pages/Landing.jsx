import { useState } from 'react'
import { LIGHT, DARK } from '../themes.js'

export default function Landing({ dark = false, onToggleDark, onViewRoadmap, onViewAviation, onViewChecklists, onViewAdmin }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const T = dark ? DARK : LIGHT

  const sectors = [
    { icon:'🏦', name:'Finance & Banking', count:'200+' },
    { icon:'✈️', name:'Aviation', count:'150+' },
    { icon:'🏥', name:'Healthcare', count:'180+' },
    { icon:'🏭', name:'Manufacturing', count:'250+' },
    { icon:'🌾', name:'Food & Agri', count:'120+' },
    { icon:'💻', name:'IT / Tech', count:'80+' },
    { icon:'⚡', name:'Energy', count:'130+' },
    { icon:'🎓', name:'Education', count:'90+' },
    { icon:'💊', name:'Pharma', count:'160+' },
    { icon:'🛢️', name:'Oil & Gas', count:'140+' },
    { icon:'📡', name:'Telecom', count:'100+' },
    { icon:'🏗️', name:'Real Estate', count:'110+' },
    { icon:'🚢', name:'Maritime', count:'120+' },
    { icon:'🛡️', name:'Insurance', count:'100+' },
    { icon:'🚛', name:'Logistics', count:'90+' },
    { icon:'📺', name:'Media & OTT', count:'70+' },
    { icon:'🛒', name:'Retail', count:'80+' },
    { icon:'🏢', name:'MSME', count:'60+' },
  ]

  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* ─── NAVIGATION ─── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: `linear-gradient(to bottom, ${T.bg}, ${T.bg}dd)`,
        backdropFilter: 'blur(12px)',
        padding: '16px 6%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: T.sage, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: T.white,
          }}>✓</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em' }}>CompliantBharat</div>
            <div style={{ fontSize: 10, color: T.sub, letterSpacing: '0.04em' }}>COMPLIANCE OS</div>
          </div>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 20, padding: '8px 24px',
          background: T.navy, borderRadius: 30, color: T.cream,
        }}>
          <button onClick={onViewRoadmap} style={{
            background: 'transparent', border: 'none', color: 'inherit',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', opacity: 0.8,
          }}>Platform Vision</button>
          <button onClick={onViewAviation} style={{
            background: 'transparent', border: 'none', color: 'inherit',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', opacity: 0.8,
          }}>Aviation Demo</button>
          <button onClick={onViewChecklists} style={{
            background: 'transparent', border: 'none', color: 'inherit',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', opacity: 0.8,
          }}>Checklists</button>
          <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)' }} />
          <button onClick={onToggleDark} style={{
            background: 'transparent', border: 'none', color: 'inherit',
            fontSize: 16, cursor: 'pointer', padding: 0,
          }}>{dark ? '☀️' : '🌙'}</button>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section style={{
        padding: '80px 6% 100px',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <div style={{ maxWidth: 700, marginBottom: 60 }}>
          <div style={{
            fontSize: 13, letterSpacing: '0.08em', color: T.sage,
            fontWeight: 600, marginBottom: 20, textTransform: 'uppercase',
          }}>India's Compliance OS</div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800,
            lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.03em',
            color: T.text,
          }}>Unify regulatory, standards, and gold compliance</h1>

          <p style={{
            fontSize: 18, color: T.sub, lineHeight: 1.7,
            marginBottom: 32, maxWidth: 500,
          }}>50+ regulators. 18 sectors. 2,000+ obligations. One unified dashboard that puts every compliance requirement where it needs to be.</p>

          <div style={{ display: 'flex', gap: 16 }}>
            <button style={{
              padding: '14px 32px', fontSize: 14, fontWeight: 600,
              background: T.sage, color: T.white, border: 'none',
              borderRadius: 8, cursor: 'pointer', letterSpacing: '0.02em',
            }}>Explore Platform</button>
            <button style={{
              padding: '14px 32px', fontSize: 14, fontWeight: 600,
              background: T.white, color: T.navy, border: `1px solid ${T.border}`,
              borderRadius: 8, cursor: 'pointer', letterSpacing: '0.02em',
            }}>Request Demo</button>
          </div>
        </div>

        {/* Key Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 24, marginTop: 60,
        }}>
          {[
            { num: '50+', label: 'Regulators' },
            { num: '18', label: 'Sectors' },
            { num: '2,000+', label: 'Obligations' },
            { num: '4', label: 'Delivery Models' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '24px', background: T.white, borderRadius: 12,
              border: `1px solid ${T.border}`, textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: T.sage, marginBottom: 8 }}>{stat.num}</div>
              <div style={{ fontSize: 12, color: T.sub, letterSpacing: '0.03em', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section style={{
        padding: '80px 6%',
        background: T.dark, color: T.cream,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{
            fontSize: 13, letterSpacing: '0.08em', color: T.sage,
            fontWeight: 600, marginBottom: 20, textTransform: 'uppercase',
          }}>The Challenge</div>

          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
            lineHeight: 1.15, marginBottom: 48, letterSpacing: '-0.02em',
          }}>Compliance is fragmented across tools, teams, and time</h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 32, marginBottom: 48,
          }}>
            {[
              {
                icon: '📊',
                title: 'Spreadsheet Chaos',
                desc: 'Tracked across Excel, emails, WhatsApp, and paper registers. One missed deadline = fine.',
              },
              {
                icon: '⏰',
                title: 'Missed Deadlines',
                desc: 'EPFO by 25th. ESIC by 15th. CERT-In in 6 hours. No single system alerts you.',
              },
              {
                icon: '💼',
                title: 'Fragmented Experts',
                desc: 'Separate consultant for ISO, another for NABH, another for BCAS. Expensive and uncoordinated.',
              },
              {
                icon: '🚨',
                title: 'Audit Anxiety',
                desc: 'Inspections come unannounced. Evidence scattered. Panic mode every time.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '28px', background: `rgba(255,255,255,0.05)`,
                borderRadius: 12, border: `1px solid ${T.border}`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{item.title}</div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE SOLUTION ─── */}
      <section style={{
        padding: '80px 6%',
        background: T.bg,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{
            fontSize: 13, letterSpacing: '0.08em', color: T.sage,
            fontWeight: 600, marginBottom: 20, textTransform: 'uppercase',
          }}>The Solution</div>

          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
            lineHeight: 1.15, marginBottom: 60, letterSpacing: '-0.02em',
          }}>Three layers. One platform. Complete clarity.</h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {[
              {
                color: T.red,
                layer: 'Layer 1',
                title: 'Regulatory',
                subtitle: 'Mandatory — Non-negotiable',
                desc: 'Every law, circular, and order from 50+ regulators. MUST comply or face fines, licence suspension, criminal liability.',
              },
              {
                color: T.blue,
                layer: 'Layer 2',
                title: 'Standards',
                subtitle: 'Competitive Advantage',
                desc: 'BIS, ISO, NABH, NABL standards. Required for contracts, export markets, insurance empanelment, government procurement.',
              },
              {
                color: T.gold,
                layer: 'Layer 3',
                title: 'Gold',
                subtitle: 'World-Class Excellence',
                desc: 'ACI Level 4, CMMI Level 5, SA8000, JCI. World-class benchmarks that attract premium clients and foreign investment.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '32px', background: T.white, borderRadius: 12,
                border: `2px solid ${item.color}`, borderLeft: `6px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: item.color, letterSpacing: '0.04em', marginBottom: 8 }}>{item.layer}</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: T.sub, marginBottom: 16 }}>{item.subtitle}</div>
                <p style={{ fontSize: 14, color: T.sub, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTORS ─── */}
      <section style={{
        padding: '80px 6%',
        background: T.dark, color: T.cream,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{
              fontSize: 13, letterSpacing: '0.08em', color: T.sage,
              fontWeight: 600, marginBottom: 20, textTransform: 'uppercase',
            }}>Coverage</div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
              lineHeight: 1.15, letterSpacing: '-0.02em',
            }}>Every Indian sector. Every regulator.</h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 16,
          }}>
            {sectors.map((sector, i) => (
              <div key={i} style={{
                padding: '24px 16px', background: `rgba(255,255,255,0.05)`,
                borderRadius: 12, textAlign: 'center', border: `1px solid ${T.border}`,
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{sector.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{sector.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{sector.count} items</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section style={{
        padding: '80px 6%',
        background: T.bg,
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontSize: 13, letterSpacing: '0.08em', color: T.sage,
            fontWeight: 600, marginBottom: 20, textTransform: 'uppercase',
          }}>Early Access</div>

          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800,
            lineHeight: 1.2, marginBottom: 24, letterSpacing: '-0.02em',
          }}>Get early access to build with us</h2>

          <p style={{
            fontSize: 16, color: T.sub, lineHeight: 1.7,
            marginBottom: 32,
          }}>Be first to know when we launch. Shape the future of compliance for India.</p>

          <div style={{ display: 'flex', gap: 12, maxWidth: 400, margin: '0 auto' }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1, padding: '12px 16px', borderRadius: 8,
                border: `1px solid ${T.border}`, background: T.white,
                fontSize: 14, color: T.text, outline: 'none',
              }}
            />
            <button
              onClick={() => { setSubmitted(true); setTimeout(() => setEmail(''), 1500) }}
              style={{
                padding: '12px 24px', background: T.sage, color: T.white,
                border: 'none', borderRadius: 8, fontWeight: 600,
                cursor: 'pointer', fontSize: 14, letterSpacing: '0.02em',
              }}
            >
              {submitted ? '✓ Joined' : 'Join Waitlist'}
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        padding: '40px 6%', borderTop: `1px solid ${T.border}`,
        textAlign: 'center', color: T.sub, fontSize: 12,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>CompliantBharat</div>
          <div style={{ fontSize: 11, letterSpacing: '0.03em' }}>
            India's National Compliance Intelligence Platform · Building for 2026
          </div>
          <div style={{ marginTop: 12, fontSize: 11 }}>Regulatory · Standards · Gold · One Platform.</div>
        </div>
      </footer>
    </div>
  )
}
