import React from 'react';

const STATUS = {
  clear:   { dot: 'var(--status-clear)',   fg: 'var(--green-700)',  bg: 'var(--status-clear-soft)',   label: 'Clear' },
  caution: { dot: 'var(--status-caution)', fg: 'var(--amber-700)',  bg: 'var(--status-caution-soft)', label: 'Caution' },
  stop:    { dot: 'var(--status-stop)',    fg: 'var(--red-700)',    bg: 'var(--status-stop-soft)',    label: 'Stop' },
  info:    { dot: 'var(--status-info)',     fg: 'var(--navy-500)',   bg: 'var(--status-info-soft)',    label: 'Info' },
  neutral: { dot: 'var(--ink-400)',         fg: 'var(--ink-500)',    bg: 'var(--cloud-150)',           label: 'Pending' },
};

/**
 * Runway-light status pill: green = clear, amber = caution, red = stop.
 * Color carries meaning — never decorative.
 */
export function StatusBadge({ status = 'info', children, dot = true, solid = false, style = {}, ...rest }) {
  const s = STATUS[status] || STATUS.info;
  const solidStyle = {
    background: s.dot,
    color: 'var(--white)',
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 22,
        padding: dot ? '0 10px 0 8px' : '0 10px',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        borderRadius: 'var(--radius-pill)',
        background: solid ? solidStyle.background : s.bg,
        color: solid ? solidStyle.color : s.fg,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: solid ? 'var(--white)' : s.dot,
          boxShadow: solid ? 'none' : `0 0 0 3px ${s.bg}`,
          flex: 'none',
        }} />
      )}
      {children || s.label}
    </span>
  );
}
