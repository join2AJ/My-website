import { useState } from 'react'
import { Button } from '../design-system/components/buttons/Button.jsx'
import { Card } from '../design-system/components/data/Card.jsx'
import { SectorTag, SECTORS } from '../design-system/components/badges/SectorTag.jsx'
import { StatusBadge } from '../design-system/components/badges/StatusBadge.jsx'

export default function Landing({ dark = false, onToggleDark, onViewRoadmap, onViewAviation, onViewChecklists, onViewAdmin }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const heroBg = dark
    ? 'radial-gradient(130% 120% at 80% -10%, #0D2B6E 0%, #071830 50%, #050F22 100%)'
    : 'linear-gradient(180deg, var(--cloud-150) 0%, var(--surface-card) 100%)'

  const heroText = dark ? 'var(--white)' : 'var(--text-strong)'
  const heroAccent = dark ? 'var(--blue-300)' : 'var(--navy-500)'
  const heroSub = dark ? 'var(--blue-200)' : 'var(--text-secondary)'

  return (
    <div style={{ background: 'var(--surface-app)', minHeight: '100vh', color: 'var(--text-body)' }}>
      {/* ─── NAVIGATION ─── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: dark ? 'var(--navy-800)' : 'var(--white)',
        borderBottom: '1px solid var(--border-hairline)',
        padding: '16px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'var(--navy-500)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 800, color: 'var(--white)',
          }}>✓</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>CompliantBharat</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>COMPLIANCE OS</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <button onClick={onViewRoadmap} style={{
            background: 'transparent', border: 'none', color: 'var(--text-body)',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>Platform Vision</button>
          <button onClick={onViewAviation} style={{
            background: 'transparent', border: 'none', color: 'var(--text-body)',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>Aviation</button>
          <button onClick={onViewChecklists} style={{
            background: 'transparent', border: 'none', color: 'var(--text-body)',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>Checklists</button>
          <div style={{ width: 1, height: 20, background: 'var(--border-hairline)' }} />
          <button onClick={onToggleDark} style={{
            background: 'transparent', border: 'none', color: 'var(--text-body)',
            fontSize: 16, cursor: 'pointer', padding: 0,
          }}>{dark ? '☀️' : '🌙'}</button>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <header style={{ background: heroBg }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '84px 40px 64px',
          display: 'grid', gridTemplateColumns: dark ? '1.1fr 0.9fr' : '1fr',
          gap: 56, alignItems: 'center',
        }}>
          <div>
            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 'var(--radius-pill)',
              background: dark ? 'rgba(59,130,246,0.16)' : 'var(--blue-100)',
              marginBottom: 22,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: 'var(--green-300)',
                boxShadow: '0 0 6px var(--green-300)',
              }} />
              <span style={{
                fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: dark ? 'var(--blue-200)' : 'var(--navy-500)',
              }}>India's First Unified Platform</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 56,
              lineHeight: 1.08, color: heroText, margin: '0 0 20px',
              letterSpacing: '-0.03em',
            }}>
              Compliance, unified into<br />
              <span style={{ color: heroAccent }}>one clear dashboard</span>
            </h1>

            {/* Subheading */}
            <p style={{
              fontSize: 18, lineHeight: 1.55, color: heroSub,
              maxWidth: 540, margin: '0 0 30px',
            }}>
              The first platform that unifies <strong>Regulatory + Standards + Gold</strong> compliance for every Indian business.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <Button variant={dark ? 'primary' : 'primary'} size="lg">
                Book a demo →
              </Button>
              <Button variant={dark ? 'dark' : 'secondary'} size="lg">
                {dark ? 'See sectors' : 'See how it works'}
              </Button>
            </div>
          </div>

          {/* Cockpit Preview (dark mode only) */}
          {dark && (
            <div style={{
              background: 'var(--navy-700)', border: '1px solid var(--navy-600)',
              borderRadius: 'var(--radius-lg)', padding: 18,
              boxShadow: 'var(--shadow-lg)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: 'var(--green-300)',
                  boxShadow: '0 0 6px var(--green-300)',
                }} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.12em', color: 'var(--blue-200)',
                }}>LIVE · ALL SECTORS</span>
                <span style={{
                  marginLeft: 'auto', fontFamily: 'var(--font-mono)',
                  fontSize: 11, color: 'var(--ink-300)',
                }}>1,500+ obligations</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['aviation', 'BCAS-AEP-11', 'stop'],
                  ['finance', 'RBI-KYC-07', 'caution'],
                  ['healthcare', 'NABH-3.2', 'clear'],
                  ['it', 'CERT-IN-06', 'caution'],
                ].map(([sector, code, status]) => {
                  const s = SECTORS[sector]
                  const dot = { clear: 'var(--green-300)', caution: 'var(--amber-500)', stop: 'var(--red-500)' }[status]
                  return (
                    <div key={code} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)',
                      padding: '10px 12px', borderLeft: `3px solid ${s.color}`,
                    }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: dot, flex: 'none',
                      }} />
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 12,
                        color: 'var(--cloud-50)',
                      }}>{code}</span>
                      <span style={{
                        marginLeft: 'auto', fontFamily: 'var(--font-sans)',
                        fontSize: 11, fontWeight: 600, color: s.color,
                        textTransform: 'capitalize',
                      }}>{sector}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div style={{
          borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--border-hairline)'}`,
          padding: '28px 40px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 40, textAlign: 'center',
        }}>
          {[
            { num: '50+', label: 'Regulators' },
            { num: '11', label: 'Sectors' },
            { num: '1,500+', label: 'Obligations' },
            { num: '4', label: 'Delivery Models' },
          ].map((stat, i) => (
            <div key={i}>
              <div style={{
                fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 28,
                color: heroAccent, marginBottom: 4,
              }}>{stat.num}</div>
              <div className="cb-label" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* ─── SECTORS SECTION ─── */}
      <section style={{ padding: '60px 40px', background: dark ? 'var(--navy-800)' : 'var(--surface-app)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--navy-500)',
              marginBottom: 16,
            }}>Coverage</div>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 40,
              color: 'var(--text-strong)', letterSpacing: '-0.02em',
            }}>Every Indian sector. Every regulator.</h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 12,
          }}>
            {Object.keys(SECTORS).map(key => (
              <SectorTag key={key} sector={key} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPLIANCE LAYERS ─── */}
      <section style={{ padding: '60px 40px', background: dark ? 'var(--navy-900)' : 'var(--white)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--navy-500)',
              marginBottom: 16,
            }}>Three Layers</div>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 40,
              color: 'var(--text-strong)', letterSpacing: '-0.02em',
            }}>Regulatory + Standards + Gold</h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {[
              {
                icon: '⚖️', color: 'var(--red-500)',
                title: 'Regulatory', subtitle: 'Mandatory',
                desc: 'Every law, rule, circular from 50+ regulators. Must comply or face fines, licence suspension.',
              },
              {
                icon: '🏅', color: 'var(--navy-500)',
                title: 'Standards', subtitle: 'Quality Markers',
                desc: 'BIS, ISO, NABH standards. Required for contracts, export, insurance empanelment.',
              },
              {
                icon: '🏆', color: 'var(--amber-500)',
                title: 'Gold', subtitle: 'Excellence',
                desc: 'ACI Level 4, CMMI Level 5, SA8000. World-class benchmarks that attract premium clients.',
              },
            ].map((item, i) => (
              <Card key={i} interactive style={{
                borderLeft: `4px solid ${item.color}`,
                padding: 'var(--space-7)',
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: item.color, marginBottom: 4 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 8 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section style={{ padding: '60px 40px', background: dark ? 'var(--navy-800)' : 'var(--surface-app)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--navy-500)',
            marginBottom: 16,
          }}>Early Access</div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 36,
            color: 'var(--text-strong)', letterSpacing: '-0.02em', marginBottom: 16,
          }}>Get early access</h2>
          <p style={{
            fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6,
            marginBottom: 32,
          }}>Be first to know when we launch. No spam, ever.</p>

          <div style={{ display: 'flex', gap: 8, maxWidth: 400, margin: '0 auto' }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1, padding: 'var(--space-5)', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-hairline)', background: 'var(--surface-card)',
                fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-body)',
                outline: 'none',
              }}
            />
            <Button
              variant="primary"
              onClick={() => { setSubmitted(true); setTimeout(() => setEmail(''), 1500) }}
            >
              {submitted ? '✓' : 'Join'}
            </Button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        padding: '40px',
        borderTop: '1px solid var(--border-hairline)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: 12,
      }}>
        <div style={{ fontWeight: 600, marginBottom: 8, color: 'var(--text-body)' }}>
          CompliantBharat
        </div>
        <div style={{ fontSize: 11, letterSpacing: '0.03em' }}>
          India's National Compliance Intelligence Platform · Building for 2026
        </div>
        <div style={{ marginTop: 12, fontSize: 11 }}>
          Regulatory · Standards · Gold · One Platform.
        </div>
      </footer>
    </div>
  )
}
