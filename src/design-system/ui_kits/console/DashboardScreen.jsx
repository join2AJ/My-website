/* Flight-deck overview — EFIS stat readouts, readiness, live strips, comm box. */
const { Card, FlightStrip, ProgressBar, CommBox, StatusBadge } = window.CompliantBharatAviationDesignSystem_77e7f4;

const TONE = {
  clear: 'var(--status-clear)', caution: 'var(--amber-700)', stop: 'var(--status-stop)', info: 'var(--navy-500)',
};
const TONE_SOFT = {
  clear: 'var(--status-clear-soft)', caution: 'var(--status-caution-soft)', stop: 'var(--status-stop-soft)', info: 'var(--status-info-soft)',
};

function Stat({ label, value, tone, sub, delta, icon }) {
  const c = TONE[tone] || TONE.info;
  const I = window.CBIcons;
  const Glyph = icon ? I[icon] : null;
  return (
    <Card padding="18px 20px" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: c }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{label}</span>
        {Glyph && <span style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: TONE_SOFT[tone], color: c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Glyph size={15} /></span>}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 34, color: 'var(--text-strong)', lineHeight: 1 }}>{value}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 9 }}>
        {delta && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: c, background: TONE_SOFT[tone], borderRadius: 'var(--radius-pill)', padding: '2px 8px' }}>{delta}</span>}
        {sub && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</span>}
      </div>
    </Card>
  );
}

function SectionHead({ children, action, onAction }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', margin: 0, color: 'var(--text-strong)' }}>{children}</h3>
      {action && <a onClick={onAction} style={{ fontSize: 13, color: 'var(--text-link)', cursor: 'pointer', fontWeight: 600 }}>{action}</a>}
    </div>
  );
}

function DashboardScreen({ go }) {
  const d = window.CBData;
  const live = d.OBLIGATIONS.filter(o => o.status !== 'clear').slice(0, 5);
  const clearedPct = Math.round((d.summary.clear / d.summary.total) * 100);
  return (
    <div className="cb-fade" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <Stat label="Obligations" value={d.summary.total} tone="info" icon="layers" sub="21 departments" />
        <Stat label="Cleared" value={d.summary.clear} tone="clear" icon="check" delta={clearedPct + '%'} sub="compliant" />
        <Stat label="Caution" value={d.summary.caution} tone="caution" icon="clock" sub="due ≤ 30 days" />
        <Stat label="Breach" value={d.summary.stop} tone="stop" icon="alert" delta="ACTION" sub="now" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 22, alignItems: 'start' }}>
        <Card padding="22px">
          <SectionHead action="View register →" onAction={() => go('obligations')}>On approach — needs attention</SectionHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--strip-gap)' }}>
            {live.map(o => (
              <FlightStrip key={o.code} code={o.code} regulator={o.regulator} status={o.status}
                title={o.title} due={o.due} department={o.dept} detail={o.detail} />
            ))}
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Card padding="22px">
            <SectionHead>Airport readiness</SectionHead>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 40, color: 'var(--status-clear)', lineHeight: 1 }}>{d.summary.readiness}<span style={{ fontSize: 20 }}>%</span></span>
              <StatusBadge status="clear" dot={false}>On track</StatusBadge>
            </div>
            <ProgressBar value={d.summary.readiness} tone="clear" label="Overall posture" />
            <div style={{ height: 14 }} />
            <ProgressBar value={71} tone="caution" label="Cyber (CERT-In)" />
            <div style={{ height: 14 }} />
            <ProgressBar value={95} tone="clear" label="Economic (AERA)" />
          </Card>
          <CommBox title="AUDIT · TRAIL" lines={d.AUDIT} />
        </div>
      </div>
    </div>
  );
}
window.CBDashboardScreen = DashboardScreen;
