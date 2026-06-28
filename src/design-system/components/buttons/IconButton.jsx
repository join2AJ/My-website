import React from 'react';

/**
 * Square icon-only control. Matches Button heights; use for toolbar actions.
 */
export function IconButton({
  children,
  variant = 'secondary',
  size = 'md',
  pill = false,
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const dim = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
  const [hover, setHover] = React.useState(false);
  const variants = {
    secondary: { background: 'var(--surface-card)', color: 'var(--ink-700)', border: '1px solid var(--border-strong)', hover: 'var(--surface-sunken)' },
    ghost: { background: 'transparent', color: 'var(--ink-500)', border: '1px solid transparent', hover: 'var(--surface-sunken)' },
    dark: { background: 'var(--navy-700)', color: 'var(--text-on-dark)', border: '1px solid var(--navy-600)', hover: 'var(--navy-600)' },
  };
  const v = variants[variant] || variants.secondary;
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        background: hover && !disabled ? v.hover : v.background,
        color: v.color,
        border: v.border,
        borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'var(--transition)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
