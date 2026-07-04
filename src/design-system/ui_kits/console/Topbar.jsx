/* Top instrument bar — breadcrumb title, search, scan status, alerts. */
const { Button, IconButton, StatusBadge } = window.CompliantBharatAviationDesignSystem_77e7f4;

function Topbar({ title, subtitle }) {
  const I = window.CBIcons;
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 18, padding: '0 28px', height: 'var(--nav-height)',
      borderBottom: '1px solid var(--border-hairline)', background: 'var(--surface-card)', flex: 'none',
    }}>
      <div style={{ flex: '0 0 auto' }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 19, letterSpacing: '-0.01em', color: 'var(--text-strong)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>{title}</div>
        {subtitle && <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)', marginTop: 3, whiteSpace: 'nowrap' }}>{subtitle}</div>}
      </div>

      <label style={{
        marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 9, width: 300, flex: '0 0 auto',
        height: 40, padding: '0 14px', borderRadius: 'var(--radius-sm)',
        background: 'var(--surface-app)', border: '1px solid var(--border-hairline)', color: 'var(--ink-400)', cursor: 'text',
      }}>
        <I.search size={16} />
        <span style={{ flex: 1, fontSize: 13, color: 'var(--ink-300)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Search obligations, codes…</span>
        <span style={{ flex: 'none', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-300)', border: '1px solid var(--border-hairline)', borderRadius: 4, padding: '1px 5px' }}>⌘K</span>
      </label>

      <StatusBadge status="clear">Live scan</StatusBadge>
      <IconButton label="Alerts" variant="ghost"><I.bell /></IconButton>
      <Button variant="primary" size="sm" iconLeft={<I.plus size={15} />}>New obligation</Button>
    </header>
  );
}
window.CBTopbar = Topbar;
