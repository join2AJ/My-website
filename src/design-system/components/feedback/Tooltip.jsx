import React from 'react';

/** Tooltip — hover label for icons/affordances. Dark cockpit chip, fades in. */
export function Tooltip({ label, children, placement = 'top', style = {} }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top:    { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    left:   { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 },
    right:  { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
  }[placement];
  return (
    <span
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
    >
      {children}
      <span
        role="tooltip"
        style={{
          position: 'absolute', ...pos, zIndex: 30, pointerEvents: 'none',
          whiteSpace: 'nowrap', padding: '5px 9px', borderRadius: 'var(--radius-sm)',
          background: 'var(--navy-800)', color: 'var(--cloud-50)',
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 500,
          boxShadow: 'var(--shadow-md)',
          opacity: show ? 1 : 0, transform: `${pos.transform} translateY(${show ? 0 : 3}px)`,
          transition: 'opacity var(--dur-fast) var(--ease-cruise), transform var(--dur-fast) var(--ease-cruise)',
        }}
      >
        {label}
      </span>
    </span>
  );
}
