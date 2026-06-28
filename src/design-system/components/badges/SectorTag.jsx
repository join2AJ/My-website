import React from 'react';

/**
 * The 11-sector compliance map. Each sector owns one fixed livery hue and the
 * authorities it answers to. Universal = obligations every business carries.
 */
export const SECTORS = {
  aviation:      { label: 'Aviation',            color: 'var(--sector-aviation)',      soft: 'var(--sector-aviation-soft)',      regulators: ['DGCA', 'BCAS', 'AAI', 'AERA', 'CISF', 'CERT-In', 'CPCB', 'EPFO', 'ICAO'] },
  finance:       { label: 'Finance & Banking',   color: 'var(--sector-finance)',       soft: 'var(--sector-finance-soft)',       regulators: ['RBI', 'SEBI', 'IRDAI', 'PFRDA', 'NHB', 'NABARD', 'DPDPA', 'EPFO'] },
  healthcare:    { label: 'Healthcare',          color: 'var(--sector-healthcare)',    soft: 'var(--sector-healthcare-soft)',    regulators: ['CDSCO', 'NABH', 'NABL', 'NMC', 'INC', 'NPPA', 'MoHFW', 'DPDPA'] },
  manufacturing: { label: 'Manufacturing',       color: 'var(--sector-manufacturing)', soft: 'var(--sector-manufacturing-soft)', regulators: ['BIS', 'FSSAI', 'CPCB', 'MoEF', 'PESO', 'CEA', 'ESIC', 'Factory Insp.'] },
  food:          { label: 'Food & Agri',         color: 'var(--sector-food)',          soft: 'var(--sector-food-soft)',          regulators: ['FSSAI', 'APEDA', 'NPOP', 'EIC', 'AgMark', 'CIB&RC', 'Plant Qrntn', 'WDRA'] },
  it:            { label: 'IT / Tech',           color: 'var(--sector-it)',            soft: 'var(--sector-it-soft)',            regulators: ['CERT-In', 'TRAI', 'MeitY', 'DPDPA', 'DOT', 'SEBI', 'RBI'] },
  energy:        { label: 'Energy',              color: 'var(--sector-energy)',        soft: 'var(--sector-energy-soft)',        regulators: ['CERC', 'SERC', 'PNGRB', 'CEA', 'MNRE', 'MoP', 'OISD', 'PESO'] },
  education:     { label: 'Education',           color: 'var(--sector-education)',     soft: 'var(--sector-education-soft)',      regulators: ['UGC', 'AICTE', 'NAAC', 'NBA', 'CBSE', 'RTE', 'NMC', 'State Boards'] },
  universal:     { label: 'Universal',           color: 'var(--sector-universal)',     soft: 'var(--sector-universal-soft)',      regulators: ['EPFO', 'ESIC', 'Labour', 'GST', 'MCA', 'DPDPA', 'CCI', 'FEMA'] },
};

/**
 * Sector livery tag. `soft` (default) for inline use, `solid` for emphasis,
 * `outline` for quiet contexts. Pass `icon` to lead with a sector glyph.
 */
export function SectorTag({ sector = 'aviation', variant = 'soft', icon = null, style = {}, ...rest }) {
  const s = SECTORS[sector] || SECTORS.aviation;
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 7, height: 24, padding: icon ? '0 12px 0 9px' : '0 12px',
    fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)',
    letterSpacing: 'var(--tracking-wide)', borderRadius: 'var(--radius-pill)', whiteSpace: 'nowrap',
  };
  const variants = {
    soft:    { background: s.soft, color: s.color },
    solid:   { background: s.color, color: 'var(--white)' },
    outline: { background: 'transparent', color: s.color, boxShadow: `inset 0 0 0 1px ${s.color}` },
  };
  return (
    <span style={{ ...base, ...(variants[variant] || variants.soft), ...style }} {...rest}>
      {icon
        ? <span style={{ display: 'inline-flex', color: variant === 'solid' ? 'var(--white)' : s.color }}>{icon}</span>
        : <span style={{ width: 7, height: 7, borderRadius: '50%', background: variant === 'solid' ? 'var(--white)' : s.color, flex: 'none' }} />}
      {s.label}
    </span>
  );
}
