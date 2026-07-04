import React from 'react';

/* Variant resting styles. Solid variants get a faint inner top-highlight +
   soft drop shadow for an instrument-key feel (no gradients). */
const VARIANTS = {
  primary: {
    background: 'var(--action-primary)',
    color: 'var(--text-on-accent)',
    border: '1px solid transparent',
    boxShadow: '0 1px 2px rgba(7,24,48,0.18), inset 0 1px 0 rgba(255,255,255,0.16)',
    hoverBg: 'var(--action-primary-hover)',
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--ink-700)',
    border: '1px solid var(--border-strong)',
    boxShadow: '0 1px 1.5px rgba(7,24,48,0.05)',
    hoverBg: 'var(--surface-sunken)',
    hoverBorder: 'var(--ink-300)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--navy-500)',
    border: '1px solid transparent',
    boxShadow: 'none',
    hoverBg: 'var(--surface-sunken)',
  },
  danger: {
    background: 'var(--status-stop)',
    color: 'var(--text-on-accent)',
    border: '1px solid transparent',
    boxShadow: '0 1px 2px rgba(196,30,30,0.24), inset 0 1px 0 rgba(255,255,255,0.16)',
    hoverBg: 'var(--red-700)',
  },
  dark: {
    background: 'var(--navy-700)',
    color: 'var(--text-on-dark)',
    border: '1px solid var(--navy-600)',
    boxShadow: '0 1px 2px rgba(5,15,34,0.30), inset 0 1px 0 rgba(255,255,255,0.08)',
    hoverBg: 'var(--navy-600)',
  },
};

const SIZES = {
  sm: { fontSize: 13, padding: '0 13px', height: 34, gap: 7, icon: 15 },
  md: { fontSize: 14, padding: '0 18px', height: 42, gap: 8, icon: 16 },
  lg: { fontSize: 16, padding: '0 26px', height: 50, gap: 10, icon: 18 },
};

/**
 * Primary action control. Instrument-key depth, gentle hover lift, mechanical
 * press, blue focus ring. Pill-capable (fuselage radius).
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  block = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const [focus, setFocus] = React.useState(false);

  const elevated = variant === 'primary' || variant === 'danger' || variant === 'dark';
  const restShadow = v.boxShadow;
  const hoverShadow = elevated
    ? '0 4px 12px rgba(7,24,48,0.20), inset 0 1px 0 rgba(255,255,255,0.16)'
    : v.boxShadow;
  const focusRing = focus && !disabled ? ', 0 0 0 3px rgba(18,73,192,0.28)' : '';

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        display: block ? 'flex' : 'inline-flex',
        width: block ? '100%' : 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: s.fontSize,
        letterSpacing: '0.005em',
        lineHeight: 1,
        borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transform: press && !disabled ? 'translateY(1px)' : hover && !disabled && elevated ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'transform var(--dur-fast) var(--ease-cruise), background var(--dur-base) var(--ease-cruise), border-color var(--dur-base) var(--ease-cruise), box-shadow var(--dur-base) var(--ease-cruise)',
        whiteSpace: 'nowrap',
        outline: 'none',
        background: v.background,
        color: v.color,
        border: v.border,
        boxShadow: (press && !disabled ? restShadow : hover && !disabled ? hoverShadow : restShadow) + focusRing,
        ...(hover && !disabled ? { background: v.hoverBg, ...(v.hoverBorder ? { borderColor: v.hoverBorder } : {}) } : {}),
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <span style={{ display: 'inline-flex', width: s.icon, height: s.icon, alignItems: 'center', justifyContent: 'center' }}>{iconLeft}</span>}
      {children}
      {iconRight && <span style={{ display: 'inline-flex', width: s.icon, height: s.icon, alignItems: 'center', justifyContent: 'center' }}>{iconRight}</span>}
    </button>
  );
}
