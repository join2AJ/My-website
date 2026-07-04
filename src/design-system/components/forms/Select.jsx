import React from 'react';

/** Select control matching Input styling. */
export function Select({ label, hint, options = [], style = {}, id, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || (label ? `cb-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <label htmlFor={fieldId} className="cb-label">{label}</label>}
      <div style={{
        position: 'relative',
        border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-sm)',
        boxShadow: focus ? 'var(--shadow-focus)' : 'none',
        background: 'var(--surface-card)',
        transition: 'var(--transition)',
      }}>
        <select
          id={fieldId}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: 'none', WebkitAppearance: 'none',
            width: '100%', height: 40, padding: '0 36px 0 12px',
            border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', color: 'var(--text-strong)',
            cursor: 'pointer',
          }}
          {...rest}
        >
          {options.map(o => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-400)', fontSize: 16 }}>⌄</span>
      </div>
      {hint && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>{hint}</span>}
    </div>
  );
}
