/* Cockpit night-mode login. */
const { Button, Input } = window.CompliantBharatAviationDesignSystem_77e7f4;

function LoginScreen({ onEnter }) {
  const I = window.CBIcons;
  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(120% 120% at 50% 0%, #0D2B6E 0%, #071830 55%, #050F22 100%)',
    }}>
      <div className="cb-fade" style={{ width: 380 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 26, justifyContent: 'center' }}>
          <img src="../../assets/logo-mark.svg" width="44" height="44" alt="" />
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.01em', color: '#fff' }}>Compliant<span style={{ color: 'var(--blue-300)' }}>Bharat</span></div>
        </div>
        <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', padding: 28, boxShadow: 'var(--shadow-lg)' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, letterSpacing: '-0.01em', margin: '0 0 4px', color: 'var(--text-strong)' }}>Pre-flight check</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 22px' }}>Sign in to the compliance flight deck.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Officer ID" mono prefix={<I.user size={16} />} defaultValue="DEL-CO-0041" />
            <Input label="Passcode" type="password" prefix={<I.lock size={16} />} defaultValue="••••••••" />
            <Button variant="primary" block onClick={onEnter} iconRight={<I.arrowRight size={16} />}>Enter flight deck</Button>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: 'var(--ink-400)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
          DGCA · BCAS · AAI · AERA · MoEF · EPFO · CERT-In
        </div>
      </div>
    </div>
  );
}
window.CBLoginScreen = LoginScreen;
