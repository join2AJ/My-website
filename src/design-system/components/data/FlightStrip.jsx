import React from 'react';
import { REGULATORS } from '../badges/RegulatorTag.jsx';
import { StatusBadge } from '../badges/StatusBadge.jsx';

const STATUS_DOT = {
  clear: 'var(--status-clear)',
  caution: 'var(--status-caution)',
  stop: 'var(--status-stop)',
  info: 'var(--status-info)',
};

/**
 * The signature unit: a "flight strip" for one compliance obligation.
 * Compact and scannable; expands like flap deployment to reveal detail.
 * Leading rule carries the owning regulator's livery.
 */
export function FlightStrip({
  code,
  title,
  regulator = 'DGCA',
  status = 'clear',
  due,
  department,
  detail,
  defaultExpanded = false,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  const [hover, setHover] = React.useState(false);
  const r = REGULATORS[regulator] || REGULATORS.DGCA;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        border: 'var(--border-card)',
        borderRadius: 'var(--radius-md)',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        overflow: 'hidden',
        transition: 'var(--transition)',
        ...style,
      }}
      {...rest}
    >
      {/* regulator livery rule */}
      <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: r.color }} />

      <button
        type="button"
        onClick={() => detail && setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-5)',
          width: '100%', padding: '14px 18px 14px 22px',
          background: 'transparent', border: 'none',
          cursor: detail ? 'pointer' : 'default', textAlign: 'left',
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: STATUS_DOT[status], flex: 'none', boxShadow: `0 0 0 3px ${r.soft}` }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)',
          letterSpacing: 'var(--tracking-mono)', color: r.color, flex: 'none', minWidth: 92,
        }}>{code}</span>
        <span style={{
          flex: 1, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', fontWeight: 'var(--fw-medium)',
          color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{title}</span>
        {due && (
          <span className="cb-label" style={{ flex: 'none' }}>{due}</span>
        )}
        <StatusBadge status={status} dot={false} style={{ flex: 'none' }} />
        {detail && (
          <span style={{
            flex: 'none', color: 'var(--ink-300)', fontSize: 18, lineHeight: 1,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform var(--dur-base) var(--ease-flap)',
          }}>⌄</span>
        )}
      </button>

      {detail && (
        <div style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows var(--dur-slow) var(--ease-flap)',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              padding: '0 18px 16px 22px', borderTop: 'var(--border)',
              marginTop: 2, paddingTop: 14,
              fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)',
              color: 'var(--text-secondary)',
            }}>
              {department && (
                <div className="cb-label" style={{ marginBottom: 8 }}>{r.name} · {department}</div>
              )}
              {detail}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
