/**
 * CompliantBharat Themes
 *
 * This provides backwards compatibility with the old theme API while
 * using the official design system CSS variables. The actual colors
 * are defined in design-system/tokens/colors.css
 */

// Light theme (default) - uses CSS variables
export const LIGHT = {
  // Surfaces
  bg: 'var(--surface-app)',
  surface: 'var(--surface-card)',
  card: 'var(--surface-card)',
  dark: 'var(--navy-800)',

  // Text
  text: 'var(--text-strong)',
  sub: 'var(--text-secondary)',
  muted: 'var(--text-muted)',

  // Borders
  border: 'var(--border-hairline)',
  divider: 'var(--border-strong)',

  // Primary colors (Navy-blue ramp)
  navy: 'var(--navy-800)',
  navyL: 'var(--navy-400)',
  blue: 'var(--navy-500)',
  blueL: 'var(--blue-100)',
  blueM: 'var(--blue-300)',

  // Status colors (runway lights)
  green: 'var(--status-clear)',
  greenL: 'var(--status-clear-soft)',
  amber: 'var(--status-caution)',
  amberL: 'var(--status-caution-soft)',
  red: 'var(--status-stop)',
  redL: 'var(--status-stop-soft)',

  // Accents
  accent: 'var(--accent)',
  gold: 'var(--status-caution)',
  goldL: 'var(--status-caution-soft)',
  purple: 'var(--navy-600)',
  purpleL: 'var(--blue-100)',
  teal: 'var(--status-clear)',
  tealL: 'var(--status-clear-soft)',

  // Sector liveries
  sectorAviation: 'var(--sector-aviation)',
  sectorFinance: 'var(--sector-finance)',
  sectorHealthcare: 'var(--sector-healthcare)',
  sectorManufacturing: 'var(--sector-manufacturing)',
  sectorFood: 'var(--sector-food)',
  sectorIT: 'var(--sector-it)',
  sectorEnergy: 'var(--sector-energy)',
  sectorEducation: 'var(--sector-education)',
  sectorUniversal: 'var(--sector-universal)',
};

// Dark theme - inverts surfaces, keeps action colors consistent
export const DARK = {
  // Surfaces (inverted)
  bg: 'var(--navy-900)',
  surface: 'var(--navy-800)',
  card: 'var(--navy-800)',
  dark: 'var(--surface-app)',

  // Text (light on dark)
  text: 'var(--text-on-dark)',
  sub: 'var(--blue-200)',
  muted: 'var(--text-muted)',

  // Borders
  border: 'var(--navy-600)',
  divider: 'var(--navy-500)',

  // Primary colors (stay consistent)
  navy: 'var(--navy-500)',
  navyL: 'var(--blue-300)',
  blue: 'var(--blue-400)',
  blueL: 'var(--navy-600)',
  blueM: 'var(--blue-300)',

  // Status colors (brighter for contrast on dark)
  green: 'var(--green-500)',
  greenL: 'var(--green-700)',
  amber: 'var(--amber-500)',
  amberL: 'var(--amber-700)',
  red: 'var(--red-500)',
  redL: 'var(--red-700)',

  // Accents
  accent: 'var(--blue-400)',
  gold: 'var(--amber-500)',
  goldL: 'var(--amber-700)',
  purple: 'var(--navy-600)',
  purpleL: 'var(--navy-500)',
  teal: 'var(--green-500)',
  tealL: 'var(--green-700)',

  // Sector liveries (brightened for dark mode)
  sectorAviation: 'var(--sector-aviation)',
  sectorFinance: 'var(--sector-finance)',
  sectorHealthcare: 'var(--sector-healthcare)',
  sectorManufacturing: 'var(--sector-manufacturing)',
  sectorFood: 'var(--sector-food)',
  sectorIT: 'var(--sector-it)',
  sectorEnergy: 'var(--sector-energy)',
  sectorEducation: 'var(--sector-education)',
  sectorUniversal: 'var(--sector-universal)',
};

export default { LIGHT, DARK };
