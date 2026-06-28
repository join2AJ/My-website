import React from 'react';

/** Toggle switch — mechanical flap motion. Navy when on. */
export function Switch({ checked, defaultChecked = false, onChange, label, disabled = false, style = {} }) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(v => !v);
    onChange && onChange(!on);
  };
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={toggle}
        style={{
          position: 'relative', width: 40, height: 23, flex: 'none',
          borderRadius: 'var(--radius-pill)', border: 'none', padding: 0,
          background: on ? 'var(--action-primary)' : 'var(--cloud-300)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background var(--dur-base) var(--ease-cruise)',
        }}
      >
        <span style={{
          position: 'absolute', top: 2.5, left: on ? 19.5 : 2.5,
          width: 18, height: 18, borderRadius: '50%', background: 'var(--white)',
          boxShadow: 'var(--shadow-sm)',
          transition: 'left var(--dur-base) var(--ease-flap)',
        }} />
      </button>
      {label && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
