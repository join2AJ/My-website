import React from 'react';

/**
 * Modal dialog — backdrop blur, instrument-panel card, climb-in. Render
 * conditionally on `open`; pass `footer` for actions.
 */
export function Dialog({ open, onClose, title, subtitle, children, footer, width = 460, style = {} }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(7,24,48,0.45)', backdropFilter: 'blur(4px)', padding: 24,
        animation: 'cb-climb var(--dur-base) var(--ease-cruise) both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        role="dialog" aria-modal="true"
        style={{
          width, maxWidth: '100%', background: 'var(--surface-card)',
          border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)', overflow: 'hidden', ...style,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '20px 22px 0' }}>
          <div style={{ flex: 1 }}>
            {title && <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', margin: 0, color: 'var(--text-strong)' }}>{title}</h3>}
            {subtitle && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: '4px 0 0' }}>{subtitle}</p>}
          </div>
          {onClose && <button onClick={onClose} aria-label="Close" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--ink-400)', fontSize: 18, lineHeight: 1, padding: 2, flex: 'none' }}>✕</button>}
        </div>
        {children && <div style={{ padding: '16px 22px', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--text-body)', lineHeight: 'var(--leading-relaxed)' }}>{children}</div>}
        {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '14px 22px', borderTop: '1px solid var(--border-hairline)', background: 'var(--surface-sunken)' }}>{footer}</div>}
      </div>
    </div>
  );
}
