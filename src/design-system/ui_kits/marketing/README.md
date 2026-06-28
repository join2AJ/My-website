# Marketing UI Kit

Parent-brand landing page for the CompliantBharat compliance platform.

**Entry:** `index.html` (loads React, the DS bundle, then the JSX below).

Sections: **hero → 11-sector grid → Regulatory + Standards + Gold tiers →
footer CTA**. Hero stats: 50+ regulators · 11 sectors · 1,500+ obligations · 1
dashboard.

Three **hero directions** are toggled bottom-right (state only, not separate
files):
- **Cockpit dark** — navy night-sky hero with a live instrument preview panel.
- **Cloud light** — centered, airy, sector-tag row.
- **Split aurora** — copy left, gradient instrument panel right.

Files:
- `Landing.jsx` — page shell, the three heroes, shared Eyebrow/Headline/Subcopy, the cockpit preview, and the hero switcher.
- `sections.jsx` — `Nav`, `StatsBar`, `SectorsGrid`, `ComplianceTiers`, `FooterCTA` (`window.CBSections`).
- `icons.jsx` — sector glyphs + UI icons (`window.CBMIcons`), Lucide-style stroke.

Composes the design-system components (`Button`, `SectorTag`, `SECTORS`,
`Card`, `StatusBadge`) from `window.CompliantBharatAviationDesignSystem_77e7f4`.
Headline/UI type is Outfit; data is JetBrains Mono. No serif.
