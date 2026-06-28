import React from 'react';

/** Checkbox — square, navy when checked, mechanical check. */
export function Checkbox({ checked, defaultChecked = false, onChange, label, disabled = false, style = {} }) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => { if (disabled) return; if (!isControlled) setInternal(v => !v); onChange && onChange(!on); };
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}>
      <button
        type="button" role="checkbox" aria-checked={on} onClick={toggle}
        style={{
          width: 19, height: 19, flex: 'none', padding: 0, cursor: disabled ? 'not-allowed' : 'pointer',
          borderRadius: 'var(--radius-xs)',
          border: `1.5px solid ${on ? 'var(--action-primary)' : 'var(--border-strong)'}`,
          background: on ? 'var(--action-primary)' : 'var(--surface-card)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background var(--dur-fast) var(--ease-cruise), border-color var(--dur-fast) var(--ease-cruise)',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ opacity: on ? 1 : 0, transform: on ? 'scale(1)' : 'scale(0.6)', transition: 'all var(--dur-fast) var(--ease-flap)' }}>
          <path d="M5 12l5 5L20 6" />
        </svg>
      </button>
      {label && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
