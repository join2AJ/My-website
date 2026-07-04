/* Parent-brand landing page. Three hero directions to explore — toggle at top
   right. Sections below the hero are shared. */
const { Button, SectorTag, StatusBadge, Card } = window.CompliantBharatAviationDesignSystem_77e7f4;

const Eyebrow = ({ dark }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 'var(--radius-pill)',
    background: dark ? 'rgba(59,130,246,0.16)' : 'var(--blue-100)', marginBottom: 22 }}>
    <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green-300)', boxShadow: '0 0 6px var(--green-300)' }} />
    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: dark ? 'var(--blue-200)' : 'var(--navy-500)' }}>India's First Unified Compliance Platform</span>
  </div>
);

const HEADLINE = (color, accent) => (
  <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 56, lineHeight: 1.08, color, margin: '0 0 20px', letterSpacing: '-0.03em' }}>
    Compliance, unified into<br /><span style={{ color: accent }}>one clear dashboard</span>
  </h1>
);

const SUBCOPY = (color) => (
  <p style={{ fontSize: 18, lineHeight: 1.55, color, maxWidth: 540, margin: '0 0 30px' }}>
    The first platform that unifies <strong>Regulatory + Standards + Gold</strong> compliance for every Indian business. 50+ regulators. 11 sectors. One dashboard.
  </p>
);

/* ── A · Cockpit dark ───────────────────────────────────────────────────── */
function HeroDark() {
  const I = window.CBMIcons;
  return (
    <header style={{ background: 'radial-gradient(130% 120% at 80% -10%, #0D2B6E 0%, #071830 50%, #050F22 100%)' }}>
      <window.CBSections.Nav dark />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '84px 40px 64px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }} className="cb-fade">
        <div>
          <Eyebrow dark />
          {HEADLINE('var(--white)', 'var(--blue-300)')}
          {SUBCOPY('var(--blue-200)')}
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="primary" size="lg" iconRight={<I.arrow size={17} />}>Book a demo</Button>
            <Button variant="dark" size="lg">See sectors</Button>
          </div>
        </div>
        <CockpitPreview />
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}><window.CBSections.StatsBar dark /></div>
    </header>
  );
}

/* mini instrument-panel product preview */
function CockpitPreview() {
  const { SECTORS } = window.CompliantBharatAviationDesignSystem_77e7f4;
  const I = window.CBMIcons;
  const rows = [
    ['aviation','BCAS-AEP-11','stop'], ['finance','RBI-KYC-07','caution'], ['healthcare','NABH-3.2','clear'], ['it','CERT-IN-06','caution'],
  ];
  return (
    <div style={{ background: 'var(--navy-700)', border: '1px solid var(--navy-600)', borderRadius: 'var(--radius-lg)', padding: 18, boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-300)', boxShadow: '0 0 6px var(--green-300)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--blue-200)' }}>LIVE · ALL SECTORS</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-300)' }}>1,500+ obligations</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map(([sec, code, st]) => {
          const s = SECTORS[sec]; const dot = { clear: 'var(--green-300)', caution: 'var(--amber-500)', stop: 'var(--red-500)' }[st];
          return (
            <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)', padding: '10px 12px', borderLeft: `3px solid ${s.color}` }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: dot, flex: 'none' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--cloud-50)' }}>{code}</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, color: s.color, textTransform: 'capitalize' }}>{sec}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── B · Cloud light ────────────────────────────────────────────────────── */
function HeroLight() {
  const I = window.CBMIcons;
  const { SECTORS } = window.CompliantBharatAviationDesignSystem_77e7f4;
  return (
    <header style={{ background: 'linear-gradient(180deg, var(--cloud-150) 0%, var(--surface-card) 100%)' }}>
      <window.CBSections.Nav />
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '84px 40px 56px', textAlign: 'center' }} className="cb-fade">
        <div style={{ display: 'flex', justifyContent: 'center' }}><Eyebrow /></div>
        {React.cloneElement(HEADLINE('var(--text-strong)', 'var(--navy-500)'), { style: { fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 60, lineHeight: 1.08, color: 'var(--text-strong)', margin: '0 auto 20px', letterSpacing: '-0.03em', maxWidth: 760 } })}
        <div style={{ display: 'flex', justifyContent: 'center' }}>{SUBCOPY('var(--text-secondary)')}</div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 36 }}>
          <Button variant="primary" size="lg" iconRight={<I.arrow size={17} />}>Book a demo</Button>
          <Button variant="secondary" size="lg">See how it works</Button>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['aviation','finance','healthcare','manufacturing','food','it','energy','education','universal'].map(k => <SectorTag key={k} sector={k} />)}
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', borderTop: '1px solid var(--border-hairline)' }}><window.CBSections.StatsBar /></div>
    </header>
  );
}

/* ── C · Split aurora ───────────────────────────────────────────────────── */
function HeroSplit() {
  const I = window.CBMIcons;
  return (
    <header>
      <window.CBSections.Nav />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 540 }}>
        <div style={{ padding: '84px 40px 84px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 620, marginLeft: 'auto' }} className="cb-fade">
          <Eyebrow />
          {HEADLINE('var(--text-strong)', 'var(--navy-500)')}
          {SUBCOPY('var(--text-secondary)')}
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="primary" size="lg" iconRight={<I.arrow size={17} />}>Book a demo</Button>
            <Button variant="secondary" size="lg">See sectors</Button>
          </div>
        </div>
        <div style={{ background: 'radial-gradient(120% 120% at 70% 20%, #1249C0 0%, #0D2B6E 45%, #071830 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '56px 48px' }}>
          <div style={{ width: '100%', maxWidth: 440 }}><CockpitPreview /></div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border-hairline)', background: 'var(--surface-card)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}><window.CBSections.StatsBar /></div>
      </div>
    </header>
  );
}

/* ── Page + hero-direction switcher ─────────────────────────────────────── */
function CBLanding() {
  const OPTIONS = [['dark','Cockpit dark'],['light','Cloud light'],['split','Split aurora']];
  const [hero, setHero] = React.useState('dark');
  const Hero = { dark: HeroDark, light: HeroLight, split: HeroSplit }[hero];
  return (
    <div>
      <div style={{ position: 'fixed', bottom: 18, right: 18, zIndex: 50, display: 'flex', gap: 4, padding: 4,
        background: 'var(--navy-800)', borderRadius: 'var(--radius-pill)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--navy-600)' }}>
        <span style={{ display: 'flex', alignItems: 'center', padding: '0 10px', fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-400)' }}>Hero</span>
        {OPTIONS.map(([id,label]) => (
          <button key={id} onClick={() => setHero(id)} style={{ border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-pill)', padding: '7px 13px',
            fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
            background: hero === id ? 'var(--navy-500)' : 'transparent', color: hero === id ? '#fff' : 'var(--blue-200)', transition: 'var(--transition)' }}>{label}</button>
        ))}
      </div>
      <Hero key={hero} />
      <window.CBSections.SectorsGrid />
      <window.CBSections.ComplianceTiers />
      <window.CBSections.FooterCTA />
    </div>
  );
}
window.CBLanding = CBLanding;
