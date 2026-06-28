import React from 'react';

/** Radio group — single select. Pass `options` as strings or {value,label}. */
export function Radio({ options = [], value, defaultValue, onChange, name, disabled = false, style = {} }) {
  const norm = options.map(o => (typeof o === 'string' ? { value: o, label: o } : o));
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? norm[0]?.value);
  const active = isControlled ? value : internal;
  const select = (v) => { if (disabled) return; if (!isControlled) setInternal(v); onChange && onChange(v); };
  return (
    <div role="radiogroup" style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      {norm.map(o => {
        const on = o.value === active;
        return (
          <label key={o.value} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
            <button
              type="button" role="radio" aria-checked={on} name={name} onClick={() => select(o.value)}
              style={{
                width: 19, height: 19, flex: 'none', padding: 0, borderRadius: '50%',
                border: `1.5px solid ${on ? 'var(--action-primary)' : 'var(--border-strong)'}`,
                background: 'var(--surface-card)', cursor: disabled ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color var(--dur-fast) var(--ease-cruise)',
              }}
            >
              <span style={{
                width: 9, height: 9, borderRadius: '50%', background: 'var(--action-primary)',
                transform: on ? 'scale(1)' : 'scale(0)', transition: 'transform var(--dur-fast) var(--ease-flap)',
              }} />
            </button>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}
