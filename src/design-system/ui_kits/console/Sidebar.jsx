/* Cockpit-display sidebar — dark navy, white text, regulator legend at foot. */
const { RegulatorTag } = window.CompliantBharatAviationDesignSystem_77e7f4;

function NavItem({ icon: Icon, label, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 11, width: '100%',
        padding: '10px 12px', border: 'none', cursor: 'pointer', textAlign: 'left',
        borderRadius: 'var(--radius-sm)',
        background: active ? 'rgba(59,130,246,0.16)' : hover ? 'rgba(255,255,255,0.05)' : 'transparent',
        color: active ? 'var(--white)' : 'var(--blue-200)',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: active ? 600 : 500,
        transition: 'var(--transition)', position: 'relative',
      }}>
      {active && <span style={{ position: 'absolute', left: -10, top: 8, bottom: 8, width: 3, borderRadius: 999, background: 'var(--blue-400)' }} />}
      <span style={{ color: active ? 'var(--blue-300)' : 'var(--ink-400)', display: 'inline-flex' }}><Icon /></span>
      {label}
    </button>
  );
}

function Sidebar({ screen, go }) {
  const I = window.CBIcons;
  const nav = [
    { id: 'dashboard', label: 'Flight deck', icon: I.gauge },
    { id: 'obligations', label: 'Obligations', icon: I.layers },
    { id: 'departments', label: 'Departments', icon: I.building },
  ];
  return (
    <aside style={{
      width: 'var(--nav-width)', flex: 'none', background: 'var(--surface-nav)',
      borderRight: '1px solid var(--navy-600)', display: 'flex', flexDirection: 'column',
      padding: '18px 14px', boxShadow: 'var(--shadow-nav)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '4px 8px 22px' }}>
        <img src="../../assets/logo-mark.svg" width="34" height="34" alt="" />
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', color: 'var(--white)', lineHeight: 1 }}>
            Compliant<span style={{ color: 'var(--blue-300)' }}>Bharat</span>
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', color: 'var(--ink-400)', marginTop: 4 }}>DEL · TERMINAL OPS</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {nav.map(n => <NavItem key={n.id} icon={n.icon} label={n.label} active={screen === n.id} onClick={() => go(n.id)} />)}
      </div>

      <div style={{ marginTop: 'auto' }}>
        <div className="cb-label" style={{ color: 'var(--ink-400)', padding: '0 8px 10px' }}>Regulators tracked</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '0 6px' }}>
          {window.CBData.REGS.map(r => <RegulatorTag key={r} regulator={r} variant="soft" style={{ height: 20 }} />)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 20, padding: '10px 8px', borderTop: '1px solid var(--navy-600)' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--navy-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-200)' }}><I.user /></div>
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontSize: 12, color: 'var(--cloud-50)', fontWeight: 600 }}>R. Iyer</div>
            <div style={{ fontSize: 10, color: 'var(--ink-400)' }}>Compliance Officer</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
window.CBSidebar = Sidebar;
