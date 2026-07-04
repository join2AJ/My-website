import { useState } from 'react'

/**
 * COMPLIANTBHARAT MODERN LANDING PAGE
 *
 * Custom Design System - Modern, Clean, Professional
 * Built with custom color psychology and engaging UI patterns
 */

const CUSTOM_DESIGN = {
  // Primary Brand Colors - Modern palette
  primary: '#6366F1',        // Indigo
  primaryDark: '#4F46E5',    // Darker Indigo
  primaryLight: '#818CF8',   // Light Indigo

  // Accent Colors - Energy & Status
  success: '#10B981',        // Emerald - positive
  warning: '#F59E0B',        // Amber - caution
  danger: '#EF4444',         // Red - alert
  info: '#3B82F6',           // Blue - information

  // Surfaces - Modern grays
  bg: '#FFFFFF',
  bgLight: '#F9FAFB',
  bgDark: '#111827',
  bgDarkAlt: '#1F2937',
  surface: '#FFFFFF',
  surfaceDark: '#1F2937',

  // Text - High contrast
  text: '#111827',
  textLight: '#6B7280',
  textLighter: '#9CA3AF',
  textInverse: '#F9FAFB',
}

function HeroSection() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${CUSTOM_DESIGN.primary} 0%, ${CUSTOM_DESIGN.primaryDark} 100%)`,
      color: CUSTOM_DESIGN.textInverse,
      padding: '120px 6% 80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '10%', left: '10%',
        width: 300, height: 300,
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 20s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%', right: '10%',
        width: 200, height: 200,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 15s ease-in-out infinite reverse',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.2)',
          padding: '8px 16px',
          borderRadius: '20px',
          marginBottom: 24,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.3)',
        }}>
          🚀 The Future of Compliance
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 24,
          letterSpacing: '-0.02em',
        }}>
          Compliance Made<br />
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0 12px', borderRadius: 8 }}>Effortlessly Simple</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          lineHeight: 1.6,
          maxWidth: 600,
          margin: '0 auto 40px',
          opacity: 0.95,
          fontWeight: 400,
        }}>
          Stop wrestling with spreadsheets. Start sleeping peacefully. Our unified compliance platform handles 50+ regulators across 11 sectors—so you can focus on your business.
        </p>

        <div style={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 40,
        }}>
          <button style={{
            background: CUSTOM_DESIGN.textInverse,
            color: CUSTOM_DESIGN.primary,
            border: 'none',
            padding: '14px 32px',
            fontSize: 16,
            fontWeight: 700,
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Get Started Free →
          </button>
          <button style={{
            background: 'rgba(255,255,255,0.15)',
            color: CUSTOM_DESIGN.textInverse,
            border: '1.5px solid rgba(255,255,255,0.4)',
            padding: '14px 32px',
            fontSize: 16,
            fontWeight: 700,
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.25)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.15)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Watch Demo
          </button>
        </div>

        <div style={{
          display: 'flex',
          gap: 24,
          justifyContent: 'center',
          fontSize: 14,
          opacity: 0.9,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 20 }}>✓</span>
            <span>No credit card required</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 20 }}>✓</span>
            <span>14-day free trial</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 20 }}>✓</span>
            <span>Instant setup</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProblemsSection() {
  const problems = [
    {
      icon: '📊',
      title: 'Compliance Chaos',
      description: 'Juggling 50+ regulators across multiple spreadsheets? Hours spent on manual tracking instead of strategy.',
      metric: '15 hrs/week wasted',
    },
    {
      icon: '⏰',
      title: 'Deadline Disasters',
      description: 'One missed deadline. One regulatory fine. One sleepless night. It only takes one.',
      metric: '₹500Cr+ in fines',
    },
    {
      icon: '🤝',
      title: 'Consultant Dependency',
      description: 'Paying premium rates for external consultants to interpret regulations you need to understand yourself.',
      metric: '40% budget drain',
    },
    {
      icon: '🔍',
      title: 'Audit Nightmares',
      description: 'When regulators come calling, you need proof. Scrambling for documentation is not a strategy.',
      metric: '1 failed audit = crisis',
    },
  ]

  return (
    <section style={{
      background: CUSTOM_DESIGN.bgDark,
      color: CUSTOM_DESIGN.textInverse,
      padding: '100px 6%',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          marginBottom: 60,
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>
          The Compliance Problem<br />
          <span style={{ color: CUSTOM_DESIGN.danger }}>You're Facing Right Now</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 24,
        }}>
          {problems.map((problem, idx) => (
            <div key={idx} style={{
              background: CUSTOM_DESIGN.bgDarkAlt,
              padding: 32,
              borderRadius: 12,
              border: `1px solid rgba(255,255,255,0.1)`,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = CUSTOM_DESIGN.warning
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(${245},${158},${11},0.2)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{problem.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{problem.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 16, opacity: 0.8 }}>
                {problem.description}
              </p>
              <div style={{
                background: `rgba(${239},${68},${68},0.1)`,
                color: CUSTOM_DESIGN.danger,
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                display: 'inline-block',
              }}>
                {problem.metric}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionSection() {
  const [activeTab, setActiveTab] = useState('regulatory')

  const solutions = {
    regulatory: {
      title: 'Regulatory Compliance',
      description: 'Track obligations from 50+ regulators across all sectors. Automated deadline management. Real-time status.',
      features: ['DGCA', 'RBI', 'SEBI', 'MeitY', 'MOEF', 'Ministry of Labour', 'CERT-IN'],
      icon: '⚖️',
    },
    standards: {
      title: 'Standards & Certifications',
      description: 'ISO, NABH, NABET compliance. Automated assessment scheduling. Evidence collection.',
      features: ['ISO 9001', 'ISO 27001', 'NABH', 'NABET', 'Custom Standards'],
      icon: '📋',
    },
    gold: {
      title: 'Industry Gold Standards',
      description: 'Beyond-compliance excellence. ESG, GFSI, industry-specific best practices.',
      features: ['ESG Framework', 'GFSI Standards', 'Sector Benchmarks', 'Best Practices'],
      icon: '⭐',
    },
  }

  return (
    <section style={{
      background: CUSTOM_DESIGN.bgLight,
      color: CUSTOM_DESIGN.text,
      padding: '100px 6%',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          marginBottom: 60,
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>
          Three Layers of<br />
          <span style={{ color: CUSTOM_DESIGN.primary }}>Compliance Mastery</span>
        </h2>

        <div style={{
          display: 'flex',
          gap: 16,
          marginBottom: 48,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {Object.keys(solutions).map(key => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: '12px 24px',
                fontSize: 15,
                fontWeight: 600,
                border: activeTab === key ? 'none' : `2px solid ${CUSTOM_DESIGN.textLighter}`,
                background: activeTab === key ? CUSTOM_DESIGN.primary : 'transparent',
                color: activeTab === key ? CUSTOM_DESIGN.textInverse : CUSTOM_DESIGN.text,
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== key) {
                  e.target.style.borderColor = CUSTOM_DESIGN.primary
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== key) {
                  e.target.style.borderColor = CUSTOM_DESIGN.textLighter
                }
              }}
            >
              {solutions[key].icon} {solutions[key].title.split(' ')[0]}
            </button>
          ))}
        </div>

        <div style={{
          background: CUSTOM_DESIGN.surface,
          padding: '48px',
          borderRadius: 16,
          border: `2px solid ${CUSTOM_DESIGN.primary}`,
          animation: 'fadeIn 0.4s ease-out',
        }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 48, flex: 'none' }}>
              {solutions[activeTab].icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: 28,
                fontWeight: 800,
                marginBottom: 16,
                color: CUSTOM_DESIGN.primary,
              }}>
                {solutions[activeTab].title}
              </h3>
              <p style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: CUSTOM_DESIGN.textLight,
                marginBottom: 24,
              }}>
                {solutions[activeTab].description}
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 12,
              }}>
                {solutions[activeTab].features.map((feature, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: CUSTOM_DESIGN.text,
                    fontSize: 14,
                    fontWeight: 500,
                  }}>
                    <span style={{ color: CUSTOM_DESIGN.success, fontSize: 18 }}>✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustSection() {
  const stats = [
    { label: '99.9% Uptime', value: 'Enterprise Grade', color: CUSTOM_DESIGN.success },
    { label: '₹500Cr+ Saved', value: 'Client Fines Prevented', color: CUSTOM_DESIGN.danger },
    { label: '40+ Hours', value: 'Monthly Time Saved', color: CUSTOM_DESIGN.info },
    { label: 'ISO 27001', value: 'Security Certified', color: CUSTOM_DESIGN.primary },
    { label: '24/7 Support', value: 'Expert Availability', color: CUSTOM_DESIGN.warning },
    { label: '500+ Companies', value: 'Across All Sectors', color: CUSTOM_DESIGN.primary },
  ]

  return (
    <section style={{
      background: CUSTOM_DESIGN.bgDark,
      color: CUSTOM_DESIGN.textInverse,
      padding: '100px 6%',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          marginBottom: 60,
          textAlign: 'center',
          letterSpacing: '-0.02em',
        }}>
          Built on Trust,<br />
          <span style={{ color: CUSTOM_DESIGN.success }}>Proven by Results</span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 24,
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              background: CUSTOM_DESIGN.bgDarkAlt,
              padding: 32,
              borderRadius: 12,
              border: `2px solid ${stat.color}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}40`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                color: stat.color,
                fontSize: 32,
                fontWeight: 900,
                marginBottom: 8,
              }}>
                {stat.label.split(' ')[0]}
              </div>
              <div style={{
                fontSize: 14,
                color: CUSTOM_DESIGN.textLighter,
                marginBottom: 8,
              }}>
                {stat.label.split(' ').slice(1).join(' ')}
              </div>
              <div style={{
                fontSize: 13,
                color: CUSTOM_DESIGN.textLighter,
                fontWeight: 500,
              }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setEmail('')
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <section style={{
      background: `linear-gradient(135deg, ${CUSTOM_DESIGN.primary} 0%, ${CUSTOM_DESIGN.primaryDark} 100%)`,
      color: CUSTOM_DESIGN.textInverse,
      padding: '100px 6%',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <h2 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 900,
        marginBottom: 24,
        letterSpacing: '-0.02em',
      }}>
        Stop Wasting Time<br />
        <span style={{ opacity: 0.9 }}>Start Winning Audits</span>
      </h2>

      <p style={{
        fontSize: 18,
        marginBottom: 40,
        opacity: 0.95,
        maxWidth: 600,
        margin: '0 auto 40px',
      }}>
        Join 500+ companies that have simplified compliance. Get your free 14-day trial today—no credit card required.
      </p>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        gap: 12,
        maxWidth: 500,
        margin: '0 auto',
        marginBottom: 32,
      }}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            flex: 1,
            padding: '14px 16px',
            fontSize: 16,
            border: 'none',
            borderRadius: 8,
            fontFamily: 'inherit',
          }}
        />
        <button
          type="submit"
          style={{
            background: CUSTOM_DESIGN.success,
            color: CUSTOM_DESIGN.textInverse,
            border: 'none',
            padding: '14px 32px',
            fontSize: 16,
            fontWeight: 700,
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {submitted ? '✓ Check Email' : 'Get Started'}
        </button>
      </form>

      <div style={{
        display: 'flex',
        gap: 24,
        justifyContent: 'center',
        fontSize: 14,
        opacity: 0.9,
        flexWrap: 'wrap',
      }}>
        <span>📞 Chat with us</span>
        <span>📧 Email: hello@compliantbharat.in</span>
        <span>💬 Live support 24/7</span>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{
      background: CUSTOM_DESIGN.bgDark,
      color: CUSTOM_DESIGN.textLighter,
      padding: '60px 6% 20px',
      borderTop: `1px solid ${CUSTOM_DESIGN.bgDarkAlt}`,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 40,
        }}>
          <div>
            <h3 style={{ color: CUSTOM_DESIGN.textInverse, marginBottom: 16, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Product
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Features</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Security</a>
            </div>
          </div>
          <div>
            <h3 style={{ color: CUSTOM_DESIGN.textInverse, marginBottom: 16, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Company
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Careers</a>
            </div>
          </div>
          <div>
            <h3 style={{ color: CUSTOM_DESIGN.textInverse, marginBottom: 16, fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Legal
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: `1px solid ${CUSTOM_DESIGN.bgDarkAlt}`,
          paddingTop: 20,
          textAlign: 'center',
          fontSize: 13,
        }}>
          <p>© 2024 CompliantBharat. All rights reserved. | India's First Unified Compliance Platform</p>
        </div>
      </div>
    </footer>
  )
}

export default function Landing({ dark: forceDark = false, onToggleDark, onViewRoadmap, onViewAviation, onViewChecklists, onViewAdmin }) {
  return (
    <div>
      <HeroSection />
      <ProblemsSection />
      <SolutionSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  )
}
