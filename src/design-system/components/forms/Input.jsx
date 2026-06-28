import React from 'react';

/** Instrument-panel text input. Crisp border, blue focus glow. */
export function Input({ label, hint, error, prefix, mono = false, style = {}, id, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || (label ? `cb-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--status-stop)' : focus ? 'var(--border-focus)' : 'var(--border-strong)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <label htmlFor={fieldId} className="cb-label">{label}</label>}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--surface-card)',
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--radius-sm)',
        boxShadow: focus ? 'var(--shadow-focus)' : 'none',
        padding: '0 12px', height: 40,
        transition: 'var(--transition)',
      }}>
        {prefix && <span style={{ color: 'var(--ink-300)', display: 'inline-flex' }}>{prefix}</span>}
        <input
          id={fieldId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
            fontSize: 'var(--text-base)', color: 'var(--text-strong)', height: '100%',
            letterSpacing: mono ? 'var(--tracking-mono)' : 'normal',
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <span style={{ fontSize: 'var(--text-xs)', color: error ? 'var(--status-stop)' : 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
