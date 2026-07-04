---
name: compliantbharat-design
description: Use this skill to generate well-branded interfaces and assets for CompliantBharat Aviation, India's airport compliance intelligence platform, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

CompliantBharat is an EFIS-style airport compliance platform: cockpit/runway
visual language, strict hierarchy, color always carries meaning (runway-light
status: green=clear, amber=caution, red=stop; each regulator owns a fixed
livery hue). Headings use Instrument Serif, body uses Outfit, all data uses
JetBrains Mono, labels are ALL-CAPS + tracked.

Key files:
- `styles.css` + `tokens/` — link `styles.css`; use the CSS custom properties.
- `components/` — React primitives (Button, StatusBadge, RegulatorTag,
  FlightStrip ★, Card, CommBox, ProgressBar, Input, Select, Switch). Each has a
  `.prompt.md` with usage.
- `ui_kits/console/` — full interactive product recreation to reference.
- `guidelines/` — foundation specimen cards.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy
assets out and create static HTML files for the user to view. If working on
production code, copy assets and read the rules here to become an expert in
designing with this brand.

If the user invokes this skill without any other guidance, ask them what they
want to build or design, ask some questions, and act as an expert designer who
outputs HTML artifacts _or_ production code, depending on the need.
