/* Obligations register — filter strips by regulator livery. */
const { FlightStrip, RegulatorTag, Tag } = window.CompliantBharatAviationDesignSystem_77e7f4;

function ObligationsScreen() {
  const d = window.CBData;
  const [reg, setReg] = React.useState('ALL');
  const list = reg === 'ALL' ? d.OBLIGATIONS : d.OBLIGATIONS.filter(o => o.regulator === reg);
  const Chip = ({ value, children }) => {
    const active = reg === value;
    return (
      <button onClick={() => setReg(value)} style={{
        padding: '6px 13px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
        fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.02em',
        border: '1px solid ' + (active ? 'var(--navy-500)' : 'var(--border-strong)'),
        background: active ? 'var(--navy-500)' : 'var(--surface-card)',
        color: active ? '#fff' : 'var(--ink-500)', transition: 'var(--transition)',
      }}>{children}</button>
    );
  };
  return (
    <div className="cb-fade" style={{ padding: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <Chip value="ALL">All · {d.OBLIGATIONS.length}</Chip>
        {d.REGS.map(r => <Chip key={r} value={r}>{r}</Chip>)}
        <span style={{ marginLeft: 'auto' }}><Tag mono>{list.length} shown</Tag></span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--strip-gap)' }}>
        {list.map(o => (
          <FlightStrip key={o.code} code={o.code} regulator={o.regulator} status={o.status}
            title={o.title} due={o.due} department={o.dept} detail={o.detail} />
        ))}
      </div>
    </div>
  );
}
window.CBObligationsScreen = ObligationsScreen;
