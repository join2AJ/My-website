import React from 'react';

/** Regulator liveries — like airline colors. Each authority owns one hue. */
export const REGULATORS = {
  BCAS:   { color: 'var(--reg-bcas)',   soft: 'var(--reg-bcas-soft)',   name: 'Bureau of Civil Aviation Security' },
  DGCA:   { color: 'var(--reg-dgca)',   soft: 'var(--reg-dgca-soft)',   name: 'Directorate General of Civil Aviation' },
  AAI:    { color: 'var(--reg-aai)',    soft: 'var(--reg-aai-soft)',    name: 'Airports Authority of India' },
  AERA:   { color: 'var(--reg-aera)',   soft: 'var(--reg-aera-soft)',   name: 'Airport Economic Regulatory Authority' },
  MoEF:   { color: 'var(--reg-moef)',   soft: 'var(--reg-moef-soft)',   name: 'Ministry of Environment & Forests' },
  EPFO:   { color: 'var(--reg-epfo)',   soft: 'var(--reg-epfo-soft)',   name: "Employees' Provident Fund Organisation" },
  'CERT-In': { color: 'var(--reg-certin)', soft: 'var(--reg-certin-soft)', name: 'Indian Computer Emergency Response Team' },
};

/**
 * Regulator livery tag — fuselage pill. `solid` for emphasis, `soft` (default)
 * for inline use, `bar` adds a leading color rule like a flight strip.
 */
export function RegulatorTag({ regulator = 'DGCA', variant = 'soft', style = {}, ...rest }) {
  const r = REGULATORS[regulator] || REGULATORS.DGCA;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: 22,
    padding: '0 11px',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-2xs)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: 'var(--tracking-wide)',
    borderRadius: 'var(--radius-pill)',
    whiteSpace: 'nowrap',
  };
  const variants = {
    soft:   { background: r.soft, color: r.color },
    solid:  { background: r.color, color: 'var(--white)' },
    outline:{ background: 'transparent', color: r.color, boxShadow: `inset 0 0 0 1px ${r.color}` },
  };
  return (
    <span style={{ ...base, ...(variants[variant] || variants.soft), ...style }} {...rest}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: variant === 'solid' ? 'var(--white)' : r.color, flex: 'none' }} />
      {regulator}
    </span>
  );
}
