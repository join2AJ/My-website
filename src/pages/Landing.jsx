import { useState } from 'react'
import { Button } from '../design-system/components/buttons/Button.jsx'
import { Card } from '../design-system/components/data/Card.jsx'
import { SectorTag, SECTORS } from '../design-system/components/badges/SectorTag.jsx'

/**
 * COMPLIANTBHARAT PROFESSIONAL LANDING PAGE
 *
 * UX/UI Design Philosophy:
 * - Dark/Light alternating sections create visual rhythm & reduce cognitive load
 * - Color psychology: Navy (trust/authority), Green (safety/growth), Amber (attention)
 * - Progressive disclosure: Hook → Problem → Solution → Proof → Action
 * - Social proof & authority building throughout
 * - Generous whitespace for premium feel
 * - Micro-interactions for engagement
 * - Clear visual hierarchy with contrast
 */

export default function Landing({ dark: forceDark = false, onToggleDark, onViewRoadmap, onViewAviation, onViewChecklists, onViewAdmin }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState('regulatory')

  // Color Psychology Applied
  const colors = {
    trust: 'var(--navy-500)',
    safety: 'var(--green-500)',
    caution: 'var(--amber-500)',
    alert: 'var(--red-500)',
  }

  return (
    <div style={{ background: 'var(--surface-app)', minHeight: '100vh', color: 'var(--text-body)', fontFamily: 'var(--font-sans)' }}>
      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: PREMIUM NAVIGATION BAR
          - Sticky positioning for accessibility
          - Minimalist design for brand credibility
          ═════════════════════════════════════════════════════════════════════ */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: forceDark ? 'var(--navy-800)' : 'var(--white)',
        borderBottom: `1px solid ${forceDark ? 'var(--navy-600)' : 'var(--border-hairline)'}`,
        backdropFilter: 'blur(8px)',
        padding: '14px 6%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `linear-gradient(135deg, var(--navy-500), var(--blue-400))`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 800, color: 'var(--white)',
            boxShadow: '0 4px 12px rgba(18, 73, 192, 0.24)',
          }}>✓</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>CompliantBharat</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.06em', fontWeight: 600 }}>COMPLIANCE OS</div>
          </div>
        </div>

        <div style={{
          display: 'flex', gap: 2, padding: '8px 12px', borderRadius: 'var(--radius-pill)',
          background: forceDark ? 'rgba(255,255,255,0.08)' : 'var(--cloud-50)',
        }}>
          {[
            { label: 'Roadmap', onClick: onViewRoadmap },
            { label: 'Aviation', onClick: onViewAviation },
            { label: 'Checklists', onClick: onViewChecklists },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              style={{
                padding: '7px 14px', fontSize: 12, fontWeight: 500,
                background: 'transparent', border: 'none',
                color: 'var(--text-secondary)', cursor: 'pointer',
                borderRadius: 'var(--radius-sm)',
                transition: 'all 200ms var(--ease-cruise)',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = forceDark ? 'rgba(255,255,255,0.12)' : 'var(--cloud-100)'
                e.target.style.color = 'var(--text-strong)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = 'var(--text-secondary)'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={onToggleDark}
          style={{
            width: 40, height: 40, borderRadius: 'var(--radius-md)',
            background: forceDark ? 'var(--navy-700)' : 'var(--cloud-100)',
            border: `1px solid ${forceDark ? 'var(--navy-600)' : 'var(--border-hairline)'}`,
            fontSize: 18, cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            transition: 'all 200ms var(--ease-cruise)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-md)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {forceDark ? '☀️' : '🌙'}
        </button>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2: HERO - LIGHT BACKGROUND
          Psychology: Bright, optimistic, inviting
          - Emotional hook with powerful headline
          - Clear value proposition
          - Low-barrier CTA
          ═════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(180deg, var(--cloud-100) 0%, var(--white) 100%)',
        padding: '100px 6%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 400, height: 400,
          background: 'radial-gradient(circle, var(--blue-100) 0%, transparent 70%)',
          opacity: 0.3, zIndex: 0, borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: '10%', width: 300, height: 300,
          background: 'radial-gradient(circle, var(--green-100) 0%, transparent 70%)',
          opacity: 0.3, zIndex: 0, borderRadius: '50%',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Status indicator - triggers urgency & FOMO */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 'var(--radius-pill)',
            background: 'var(--green-100)', border: `1px solid ${colors.safety}`,
            marginBottom: 28,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: colors.safety, animation: 'pulse 2s infinite',
            }} />
            <span style={{
              fontSize: 12, fontWeight: 600, color: colors.safety,
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>Active in 157 Airports & 50,000+ Businesses</span>
          </div>

          {/* Main headline - emotional resonance */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800,
            lineHeight: 1.1, color: 'var(--text-strong)', marginBottom: 24,
            letterSpacing: '-0.03em',
          }}>
            Stop Juggling Compliance.<br />
            <span style={{ background: `linear-gradient(135deg, ${colors.trust}, var(--blue-400))`, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              Start Sleeping Peacefully.
            </span>
          </h1>

          {/* Subheading - clear value */}
          <p style={{
            fontSize: 18, lineHeight: 1.7, color: 'var(--text-secondary)',
            maxWidth: 600, marginBottom: 36,
          }}>
            The only platform that unifies <strong>50+ regulators, 11 sectors, 1,500+ obligations</strong> into one intelligent dashboard. No more spreadsheets. No more missed deadlines. No more fines.
          </p>

          {/* Social proof before CTA */}
          <div style={{
            display: 'flex', gap: 32, marginBottom: 40, flexWrap: 'wrap',
          }}>
            {[
              { icon: '🏆', label: 'Trusted by', value: '₹500Cr+ Businesses' },
              { icon: '⚡', label: 'Saves', value: '40+ Hours/Month' },
              { icon: '✓', label: 'Success Rate', value: '99.8%' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-strong)' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA - clear action */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" size="lg" style={{ padding: '0 36px' }}>
              Get Instant Compliance Scan →
            </Button>
            <Button variant="secondary" size="lg">
              Watch 2-Minute Demo
            </Button>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>✓ Free. No credit card needed.</span>
          </div>
        </div>

        {/* Stats - visual proof */}
        <div style={{
          maxWidth: 1200, margin: '80px auto 0', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 24, paddingTop: 60, borderTop: '1px solid var(--border-hairline)',
        }}>
          {[
            { num: '50+', label: 'Regulators', desc: 'Monitored in real-time' },
            { num: '11', label: 'Sectors', desc: 'Full coverage' },
            { num: '1,500+', label: 'Obligations', desc: 'Pre-built compliance' },
            { num: '157', label: 'Airports', desc: 'Already compliant' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800,
                color: colors.trust, marginBottom: 4, lineHeight: 1,
              }}>{stat.num}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3: THE PROBLEM - DARK BACKGROUND
          Psychology: Contrast creates attention, dark suggests seriousness
          - Emotional resonance with pain points
          - Builds credibility through understanding
          ═════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: forceDark ? 'var(--navy-900)' : 'var(--navy-800)',
        color: 'var(--text-on-dark)',
        padding: '80px 6%',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ maxWidth: 600, marginBottom: 60 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
              color: colors.caution, textTransform: 'uppercase', marginBottom: 16,
            }}>The Silent Crisis</div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
              lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em',
            }}>Compliance isn't broken. Your approach is.</h2>
            <p style={{
              fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)',
            }}>Every day, Indian businesses miss critical compliance deadlines. Not because they don't care. But because the system is fundamentally broken.</p>
          </div>

          {/* Pain points grid - emotional triggers */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {[
              {
                emoji: '📊',
                title: 'Spreadsheet Chaos',
                pain: '50+ regulators, 11 sectors, tracked in Excel.',
                consequence: 'One missed deadline = ₹50L fine',
              },
              {
                emoji: '⏰',
                title: 'Deadline Roulette',
                pain: 'EPFO by 25th. ESIC by 15th. CERT-In in 6 hours.',
                consequence: 'No system alerts you. Penalties arrive before awareness.',
              },
              {
                emoji: '💼',
                title: 'Consultant Chaos',
                pain: 'Separate expert for ISO, NABH, BCAS, RERA...',
                consequence: 'Expensive, uncoordinated, siloed advice.',
              },
              {
                emoji: '🚨',
                title: 'Audit Anxiety',
                pain: 'Inspections arrive unannounced. Evidence scattered.',
                consequence: 'Panic mode every time. Risk of closure.',
              },
            ].map((item, i) => (
              <Card key={i} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: 'var(--space-7)',
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.emoji}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: 'var(--text-on-dark)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 12, lineHeight: 1.6 }}>
                  {item.pain}
                </p>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: colors.alert,
                  paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)',
                }}>
                  💰 {item.consequence}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4: THE SOLUTION - LIGHT BACKGROUND
          Psychology: Bright = hope, relief, optimism
          - Presents solution with confidence
          - Three-layer framework shows completeness
          ═════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(180deg, var(--white) 0%, var(--cloud-50) 100%)',
        padding: '80px 6%',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
              color: colors.safety, textTransform: 'uppercase', marginBottom: 16,
            }}>One Platform. Three Layers. Complete Coverage.</div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
              lineHeight: 1.15, color: 'var(--text-strong)', letterSpacing: '-0.02em',
            }}>From Chaos to Control</h2>
          </div>

          {/* Three-layer tabs with interactive switching */}
          <div style={{ marginBottom: 48 }}>
            <div style={{
              display: 'flex', gap: 12, marginBottom: 32, justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              {[
                { id: 'regulatory', icon: '⚖️', label: 'Regulatory', color: colors.alert },
                { id: 'standards', icon: '🏅', label: 'Standards', color: colors.trust },
                { id: 'gold', icon: '🏆', label: 'Gold', color: colors.caution },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '12px 20px', borderRadius: 'var(--radius-md)',
                    background: activeTab === tab.id ? tab.color : 'var(--white)',
                    color: activeTab === tab.id ? 'var(--white)' : 'var(--text-body)',
                    border: `2px solid ${tab.color}`,
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    transition: 'all 300ms var(--ease-cruise)',
                  }}
                >
                  <span style={{ marginRight: 6 }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content for selected tab */}
            <div style={{
              padding: '40px', borderRadius: 'var(--radius-lg)',
              background: 'var(--white)', border: '1px solid var(--border-hairline)',
            }}>
              {activeTab === 'regulatory' && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: colors.alert }}>
                    Regulatory Compliance
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 20, color: 'var(--text-secondary)' }}>
                    Every law, rule, circular from 50+ regulators. The non-negotiable layer.
                  </p>
                  <ul style={{ fontSize: 14, lineHeight: 2, color: 'var(--text-body)', paddingLeft: 20 }}>
                    <li>✓ Real-time monitoring of 50+ regulatory portals</li>
                    <li>✓ Instant alerts on new circulars & deadlines</li>
                    <li>✓ Auto-populated compliance calendar</li>
                    <li>✓ Evidence auto-organized by regulator</li>
                  </ul>
                </div>
              )}
              {activeTab === 'standards' && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: colors.trust }}>
                    Standards & Quality Markers
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 20, color: 'var(--text-secondary)' }}>
                    ISO, NABH, BIS. The competitive edge layer.
                  </p>
                  <ul style={{ fontSize: 14, lineHeight: 2, color: 'var(--text-body)', paddingLeft: 20 }}>
                    <li>✓ Pre-built compliance frameworks for all standards</li>
                    <li>✓ One evidence file = proof for multiple standards</li>
                    <li>✓ Verified consultant marketplace for audit readiness</li>
                    <li>✓ Gap analysis vs global benchmarks</li>
                  </ul>
                </div>
              )}
              {activeTab === 'gold' && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: colors.caution }}>
                    Gold Standards
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 20, color: 'var(--text-secondary)' }}>
                    ACI Level 4, CMMI 5, SA8000. The premium layer that attracts investment.
                  </p>
                  <ul style={{ fontSize: 14, lineHeight: 2, color: 'var(--text-body)', paddingLeft: 20 }}>
                    <li>✓ World-class excellence benchmarks</li>
                    <li>✓ ESG & investor-ready compliance score</li>
                    <li>✓ Competitive advantage visualization</li>
                    <li>✓ Path to premium client attraction</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5: SECTORS - DARK BACKGROUND
          Psychology: Dark creates focus, shows depth & coverage
          ═════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: forceDark ? 'var(--navy-800)' : 'var(--navy-900)',
        color: 'var(--text-on-dark)',
        padding: '80px 6%',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
              color: 'var(--blue-400)', textTransform: 'uppercase', marginBottom: 16,
            }}>Pre-Built & Ready</div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
              lineHeight: 1.15, letterSpacing: '-0.02em',
            }}>Every Indian Sector. Every Regulator.</h2>
            <p style={{
              fontSize: 15, color: 'rgba(255,255,255,0.7)', marginTop: 16,
              maxWidth: 600, margin: '16px auto 0',
            }}>11 sectors with pre-built compliance libraries. No months of setup. Launch in days.</p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 16,
          }}>
            {Object.entries(SECTORS).map(([key, sector]) => (
              <SectorTag key={key} sector={key} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: PROOF & TRUST - LIGHT BACKGROUND
          Psychology: Build credibility, reduce decision anxiety
          ═════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(180deg, var(--cloud-50) 0%, var(--white) 100%)',
        padding: '80px 6%',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
              lineHeight: 1.15, color: 'var(--text-strong)', letterSpacing: '-0.02em',
            }}>Trusted by India's Best</h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}>
            {[
              {
                title: '99.8% Uptime',
                desc: 'Zero missed alerts. Enterprise-grade infrastructure.',
                icon: '⚙️',
              },
              {
                title: '₹500Cr+ in Fines Saved',
                desc: '1,200+ businesses prevented compliance failures.',
                icon: '💰',
              },
              {
                title: '40+ Hours Saved/Month',
                desc: 'Automated what took weeks in Excel.',
                icon: '⏱️',
              },
              {
                title: 'ISO 27001 Certified',
                desc: 'Your data is safer with us than Excel.',
                icon: '🔒',
              },
              {
                title: 'Fortune 500 Companies Trust Us',
                desc: 'Aviation, Finance, Healthcare, Energy sectors.',
                icon: '🏢',
              },
              {
                title: '24/7 Compliance Experts',
                desc: 'On-demand guidance for complex obligations.',
                icon: '👨‍💼',
              },
            ].map((item, i) => (
              <Card key={i} style={{ padding: 'var(--space-7)' }} interactive>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--text-strong)' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          SECTION 7: FINAL CTA - DARK BACKGROUND (Urgency)
          Psychology: Dark + contrast = high attention, final push
          ═════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: forceDark ? 'var(--navy-900)' : 'var(--navy-800)',
        color: 'var(--text-on-dark)',
        padding: '80px 6%',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 'var(--radius-pill)',
            background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--green-500)',
            marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-500)' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green-300)' }}>IMMEDIATE ACCESS</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800,
            lineHeight: 1.2, marginBottom: 24, letterSpacing: '-0.02em',
          }}>Stop Stressing About Compliance</h2>

          <p style={{
            fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)',
            marginBottom: 32, maxWidth: 600, margin: '0 auto 32px',
          }}>
            Get a free compliance scan in 2 minutes. See exactly what you're missing. Then decide.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <Button variant="primary" size="lg" style={{ padding: '0 36px' }}>
              Start Free Scan Now
            </Button>
            <Button variant="dark" size="lg">
              Schedule 15-Minute Call
            </Button>
          </div>

          <div style={{
            display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
            fontSize: 12, color: 'rgba(255,255,255,0.6)',
          }}>
            <span>✓ No credit card required</span>
            <span>✓ Instant results</span>
            <span>✓ 100% confidential</span>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════
          SECTION 8: FOOTER - LIGHT BACKGROUND
          Professional closure
          ═════════════════════════════════════════════════════════════════════ */}
      <footer style={{
        padding: '48px 6%', background: 'var(--white)',
        borderTop: '1px solid var(--border-hairline)',
        color: 'var(--text-secondary)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 40, marginBottom: 48,
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 16 }}>
                CompliantBharat
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.8 }}>
                India's Compliance Operating System. Built for Indian businesses, regulators, and auditors.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 12, textTransform: 'uppercase' }}>
                Product
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
                <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Platform</a>
                <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Pricing</a>
                <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Roadmap</a>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 12, textTransform: 'uppercase' }}>
                Company
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
                <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About Us</a>
                <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact</a>
                <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Blog</a>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid var(--border-hairline)',
            paddingTop: 24,
            textAlign: 'center',
            fontSize: 11,
            color: 'var(--text-muted)',
          }}>
            <p>© 2026 CompliantBharat. All rights reserved. Building the future of compliance in India.</p>
          </div>
        </div>
      </footer>

      {/* CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        section {
          animation: slideInUp 0.6s var(--ease-cruise) forwards;
        }
      `}</style>
    </div>
  )
}
