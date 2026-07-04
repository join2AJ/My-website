/* Marketing landing sections — composes DS components. */
const { Button, SectorTag, SECTORS, StatusBadge, Card, RegulatorTag } = window.CompliantBharatAviationDesignSystem_77e7f4;
const ICON = () => window.CBMIcons;

const SECTOR_ORDER = ['aviation','finance','healthcare','manufacturing','food','it','energy','education','universal'];

/* ── Top nav ─────────────────────────────────────────────────────────────── */
function Nav({ dark }) {
  const fg = dark ? 'var(--cloud-50)' : 'var(--text-body)';
  const border = dark ? 'rgba(255,255,255,0.10)' : 'var(--border-hairline)';
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 20, display: 'flex', alignItems: 'center', gap: 28,
      padding: '0 40px', height: 64, borderBottom: `1px solid ${border}`,
      background: dark ? 'rgba(7,24,48,0.72)' : 'rgba(255,255,255,0.82)', backdropFilter: 'blur(12px)',
    }}>
      <img src={dark ? '../../assets/logo-wordmark-light.svg' : '../../assets/logo-wordmark.svg'} height="30" alt="CompliantBharat" />
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 26, fontSize: 14, fontWeight: 500, color: fg }}>
        <a>Platform</a><a>Sectors</a><a>Regulators</a><a>Pricing</a>
        <Button variant={dark ? 'dark' : 'secondary'} size="sm">Sign in</Button>
        <Button variant="primary" size="sm">Book a demo</Button>
      </div>
    </nav>
  );
}

/* ── Stats strip ─────────────────────────────────────────────────────────── */
function StatsBar({ dark }) {
  const stats = [['50+','Regulators'],['11','Sectors'],['1,500+','Obligations'],['1','Dashboard']];
  const fg = dark ? 'var(--white)' : 'var(--text-strong)';
  const sub = dark ? 'var(--blue-200)' : 'var(--text-muted)';
  const border = dark ? 'rgba(255,255,255,0.12)' : 'var(--border-hairline)';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
      {stats.map(([n,l],i) => (
        <div key={l} style={{ padding: '26px 28px', borderLeft: i ? `1px solid ${border}` : 'none', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 38, color: fg, lineHeight: 1 }}>{n}</div>
          <div className="cb-label" style={{ color: sub, marginTop: 8 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Sectors grid ────────────────────────────────────────────────────────── */
function SectorsGrid() {
  const I = window.CBMIcons;
  return (
    <section style={{ padding: '88px 40px', background: 'var(--surface-app)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="cb-label" style={{ color: 'var(--navy-500)' }}>Eleven sectors · one platform</div>
          <h2 style={{ font: 'var(--type-h1)', color: 'var(--text-strong)', margin: '10px 0 0' }}>Built for every Indian business</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {SECTOR_ORDER.map(key => {
            const s = SECTORS[key];
            const Glyph = I[key] || I.universal;
            return (
              <Card key={key} interactive padding="20px 22px">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: s.soft, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Glyph size={22} /></span>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 17, color: 'var(--text-strong)' }}>{s.label}</div>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: s.color }}>{s.regulators.length}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {s.regulators.slice(0,5).map(r => (
                    <span key={r} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: 'var(--ink-500)', background: 'var(--surface-sunken)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-pill)', padding: '2px 9px' }}>{r}</span>
                  ))}
                  {s.regulators.length > 5 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)', padding: '2px 4px' }}>+{s.regulators.length - 5}</span>}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Three compliance tiers (Regulatory + Standards + Gold) ──────────────── */
function ComplianceTiers() {
  const I = window.CBMIcons;
  const tiers = [
    { icon: I.scale, name: 'Regulatory', tone: 'var(--navy-500)', soft: 'var(--blue-100)', desc: 'Every statutory obligation from 50+ Indian regulators — licences, filings, audits, returns — mapped to the departments that own them.' },
    { icon: I.layers, name: 'Standards', tone: 'var(--sector-it)', soft: 'var(--sector-it-soft)', desc: 'ISO, BIS, NABH, NABL and sector codes tracked alongside the law, so certification readiness never drifts from compliance.' },
    { icon: I.award, name: 'Gold', tone: 'var(--sector-energy)', soft: 'var(--sector-energy-soft)', desc: 'Voluntary best-practice frameworks that signal trust — the gold standard above the minimum bar, benchmarked continuously.' },
  ];
  return (
    <section style={{ padding: '88px 40px', background: 'var(--surface-card)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="cb-label" style={{ color: 'var(--navy-500)' }}>Three layers of assurance</div>
          <h2 style={{ font: 'var(--type-h1)', color: 'var(--text-strong)', margin: '10px 0 0' }}>Regulatory + Standards + Gold</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {tiers.map(t => {
            const Glyph = t.icon;
            return (
              <Card key={t.name} padding="26px">
                <span style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: t.soft, color: t.tone, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Glyph size={24} /></span>
                <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-strong)', margin: '0 0 8px' }}>{t.name}</h3>
                <p style={{ font: 'var(--type-small)', color: 'var(--text-secondary)', margin: 0, lineHeight: 'var(--leading-relaxed)' }}>{t.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Footer CTA ──────────────────────────────────────────────────────────── */
function FooterCTA() {
  return (
    <section style={{ background: 'var(--navy-800)', padding: '72px 40px', textAlign: 'center' }}>
      <h2 style={{ font: 'var(--type-h1)', color: 'var(--white)', margin: '0 0 12px' }}>One dashboard for every obligation</h2>
      <p style={{ fontSize: 16, color: 'var(--blue-200)', margin: '0 auto 28px', maxWidth: 540 }}>See your whole compliance posture — regulatory, standards and gold — across every department, in real time.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Button variant="primary" size="lg">Book a demo</Button>
        <Button variant="dark" size="lg">Explore the platform</Button>
      </div>
      <div style={{ marginTop: 40, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-400)', letterSpacing: '0.08em' }}>
        © 2026 CompliantBharat · Compliance Intelligence · Made in India
      </div>
    </section>
  );
}

window.CBSections = { Nav, StatsBar, SectorsGrid, ComplianceTiers, FooterCTA };
