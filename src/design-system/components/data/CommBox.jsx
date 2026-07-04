import React from 'react';

/**
 * ATC comm box — dark cockpit night-mode display for datalink-style messages,
 * audit trails, system log. Monospace, navy-night background.
 */
export function CommBox({ title = 'ATC · DATALINK', lines = [], children, style = {} }) {
  return (
    <div style={{
      background: 'var(--surface-comm)',
      border: '1px solid var(--navy-600)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-md)',
      ...style,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px', borderBottom: '1px solid var(--navy-600)',
        background: 'var(--navy-800)',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green-300)', boxShadow: '0 0 6px var(--green-300)' }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-semibold)',
          letterSpacing: 'var(--tracking-label)', color: 'var(--blue-200)',
        }}>{title}</span>
      </div>
      <div style={{ padding: '14px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', lineHeight: 1.8, color: 'var(--cloud-50)' }}>
        {children}
        {lines.map((ln, i) => {
          const obj = typeof ln === 'string' ? { text: ln } : ln;
          const toneColor = { clear: 'var(--green-300)', caution: 'var(--amber-500)', stop: 'var(--red-500)', dim: 'var(--ink-300)' }[obj.tone] || 'var(--cloud-50)';
          return (
            <div key={i} style={{ display: 'flex', gap: 10, color: toneColor }}>
              {obj.time && <span style={{ color: 'var(--blue-300)', flex: 'none' }}>{obj.time}</span>}
              <span style={{ whiteSpace: 'pre-wrap' }}>{obj.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
