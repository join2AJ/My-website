import React from 'react';

/** Toast — runway-light status notification. Status rule + icon + message. */
export function Toast({ status = 'info', title, message, onClose, style = {} }) {
  const tones = {
    clear:   { c: 'var(--status-clear)',   soft: 'var(--status-clear-soft)' },
    caution: { c: 'var(--status-caution)', soft: 'var(--status-caution-soft)' },
    stop:    { c: 'var(--status-stop)',    soft: 'var(--status-stop-soft)' },
    info:    { c: 'var(--status-info)',    soft: 'var(--status-info-soft)' },
  };
  const t = tones[status] || tones.info;
  return (
    <div style={{
      position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 12,
      width: 340, padding: '14px 16px 14px 18px',
      background: 'var(--surface-card)', border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
      ...style,
    }}>
      <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: t.c }} />
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: t.c, marginTop: 5, flex: 'none', boxShadow: `0 0 0 4px ${t.soft}` }} />
      <div style={{ flex: 1 }}>
        {title && <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-strong)' }}>{title}</div>}
        {message && <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 2, lineHeight: 1.5 }}>{message}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--ink-400)', fontSize: 16, lineHeight: 1, padding: 0, flex: 'none' }}>✕</button>
      )}
    </div>
  );
}
