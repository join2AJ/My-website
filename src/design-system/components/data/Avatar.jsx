import React from 'react';

const SIZES = { sm: 26, md: 34, lg: 44 };

/** User/identity avatar — initials on a deterministic navy-family tint, or image. */
export function Avatar({ name = '', src, size = 'md', status, style = {} }) {
  const dim = SIZES[size] || SIZES.md;
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const palette = ['var(--navy-500)', 'var(--reg-aai)', 'var(--reg-aera)', 'var(--green-700)', 'var(--amber-700)'];
  const tint = palette[(name.charCodeAt(0) || 0) % palette.length];
  const statusColor = { clear: 'var(--status-clear)', caution: 'var(--status-caution)', stop: 'var(--status-stop)' }[status];
  return (
    <span style={{ position: 'relative', display: 'inline-flex', flex: 'none', ...style }}>
      <span style={{
        width: dim, height: dim, borderRadius: '50%', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: src ? 'transparent' : tint, color: 'var(--white)',
        fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: dim * 0.4,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.16)',
      }}>
        {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
      </span>
      {statusColor && (
        <span style={{
          position: 'absolute', right: -1, bottom: -1, width: dim * 0.3, height: dim * 0.3,
          borderRadius: '50%', background: statusColor, border: '2px solid var(--surface-card)',
        }} />
      )}
    </span>
  );
}
