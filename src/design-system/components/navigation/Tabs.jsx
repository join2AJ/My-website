import React from 'react';

/**
 * Underline tabs — view switcher for product surfaces. Controlled or
 * uncontrolled. The active tab slides with a cruise ease.
 */
export function Tabs({ tabs = [], value, defaultValue, onChange, style = {} }) {
  const norm = tabs.map(t => (typeof t === 'string' ? { value: t, label: t } : t));
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? norm[0]?.value);
  const active = isControlled ? value : internal;
  const select = (v) => { if (!isControlled) setInternal(v); onChange && onChange(v); };
  return (
    <div role="tablist" style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-hairline)', ...style }}>
      {norm.map(t => {
        const on = t.value === active;
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={on}
            onClick={() => select(t.value)}
            style={{
              position: 'relative', border: 'none', background: 'transparent', cursor: 'pointer',
              padding: '10px 14px 12px', marginBottom: -1,
              fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: on ? 700 : 500,
              letterSpacing: '0.005em', color: on ? 'var(--text-strong)' : 'var(--text-secondary)',
              display: 'inline-flex', alignItems: 'center', gap: 7, transition: 'color var(--dur-base) var(--ease-cruise)',
            }}
          >
            {t.label}
            {t.count != null && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
                color: on ? 'var(--navy-500)' : 'var(--ink-400)',
                background: on ? 'var(--blue-100)' : 'var(--surface-sunken)',
                borderRadius: 'var(--radius-pill)', padding: '1px 7px',
              }}>{t.count}</span>
            )}
            <span style={{
              position: 'absolute', left: 8, right: 8, bottom: 0, height: 2.5, borderRadius: 2,
              background: on ? 'var(--navy-500)' : 'transparent',
              transition: 'background var(--dur-base) var(--ease-cruise)',
            }} />
          </button>
        );
      })}
    </div>
  );
}
