import React from 'react';

/** Generic metadata pill — fuselage cross-section. Quiet, neutral by default. */
export function Tag({ children, tone = 'neutral', mono = false, style = {}, ...rest }) {
  const tones = {
    neutral: { background: 'var(--cloud-150)', color: 'var(--ink-500)', border: '1px solid var(--cloud-200)' },
    blue:    { background: 'var(--blue-100)',  color: 'var(--navy-500)', border: '1px solid transparent' },
    dark:    { background: 'var(--navy-700)',  color: 'var(--text-on-dark)', border: '1px solid var(--navy-600)' },
  };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        height: 20,
        padding: '0 9px',
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--fw-medium)',
        letterSpacing: mono ? 'var(--tracking-mono)' : 'var(--tracking-wide)',
        borderRadius: 'var(--radius-pill)',
        whiteSpace: 'nowrap',
        ...(tones[tone] || tones.neutral),
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
