# CompliantBharat — Design System

**CompliantBharat is a unified compliance platform** — the first to
unify *Regulatory + Standards + Gold* compliance for every Indian business:
**50+ regulators, 11 sectors, 1,500+ obligations, one dashboard.** Aviation is
one of those 11 sectors (and the deepest-built one — see the console UI kit).

Two brand layers:
- **Parent (platform):** the multi-sector platform. Sectors are liveries
  (like regulators) — each owns one fixed hue. See the marketing UI kit.
- **Aviation vertical:** an **EFIS** (Electronic Flight Instrument System)
  cockpit/runway language — obligations as "flight strips", the home as the
  "flight deck". This is the reference build for any sector vertical.

Across both: critical data always visible, hierarchy is strict, and **color
always carries meaning** — never decoration.

> Sources: authored from written brand briefs (no external codebase or Figma was
> provided). If a product codebase or Figma exists, attach it via the Import
> menu and the kit can be reconciled against it.

---

---

## SECTORS & REGULATORS (the 11-sector map)

Each sector owns a fixed livery hue (`--sector-*`) and answers to its own set of
authorities. `SECTORS` (exported from `SectorTag.jsx`) is the source of truth.

| Sector | Hue | Key regulators |
|---|---|---|
| Aviation | blue `#1249C0` | DGCA · BCAS · AAI · AERA · CISF · CERT-In · CPCB · EPFO · ICAO |
| Finance & Banking | emerald `#047857` | RBI · SEBI · IRDAI · PFRDA · NHB · NABARD · DPDPA · EPFO |
| Healthcare | teal `#0D9488` | CDSCO · NABH · NABL · NMC · INC · NPPA · MoHFW · DPDPA |
| Manufacturing | ember `#C2410C` | BIS · FSSAI · CPCB · MoEF · PESO · CEA · ESIC · Factory Insp. |
| Food & Agri | harvest `#4D7C0F` | FSSAI · APEDA · NPOP · EIC · AgMark · CIB&RC · Plant Qrntn · WDRA |
| IT / Tech | violet `#6D28D9` | CERT-In · TRAI · MeitY · DPDPA · DOT · SEBI · RBI |
| Energy | amber `#CA8A04` | CERC · SERC · PNGRB · CEA · MNRE · MoP · OISD · PESO |
| Education | indigo `#4338CA` | UGC · AICTE · NAAC · NBA · CBSE · RTE · NMC · State Boards |
| Universal | slate `#475569` | EPFO · ESIC · Labour · GST · MCA · DPDPA · CCI · FEMA |

⚠️ 9 sectors are defined here; the brand claims **11**. Two are not yet named —
supply them and I'll add liveries + regulators. "Universal" = obligations every
business carries regardless of sector.

---

## CONTENT FUNDAMENTALS — how copy is written

- **Voice:** authoritative, calm, operational — air-traffic-control register.
  Short, declarative, scannable. Think cockpit callouts, not marketing.
- **Person:** mostly impersonal/system ("4 holders pending de-provisioning",
  "Auto-scan complete"). Address the officer as "you" only in guidance.
- **Aviation metaphor is load-bearing, not decorative** (in the aviation
  vertical). Obligations are "flight strips"; the home view is the "flight
  deck"; items needing attention are "on approach"; the audit log is the "audit
  trail / datalink". The parent brand keeps the calm/authoritative voice but
  drops cockpit jargon ("one dashboard", "every obligation").
- **Casing:** Sentence case for headings and body. **ALL-CAPS + 0.12em
  tracking** for labels and metrics (cockpit abbreviations): `OBLIGATIONS`,
  `DUE 14D`, `OVERDUE 3D`, `FILED`, regulator codes, `TORA`, `AEP`.
- **Codes & data** are monospace: `BCAS-AEP-11`, `0941Z`, `87.4%`.
- **Status words are fixed:** Clear / Caution / Stop (+ Breach, In review).
  Never invent synonyms — they map to runway-light colors.
- **No emoji.** Iconography is line icons + status dots only.
- **Numbers are specific, never slop:** every metric ties to a real obligation
  count, department, or deadline. Don't pad with decorative stats.

Examples:
> "On approach — needs attention" · "Quarterly reconciliation of all active AEPs
> against current employment records." · "Six-hour incident reporting SOP
> attestation" · "Auto-scan complete · 418 obligations".

---

## VISUAL FOUNDATIONS

**Palette.** A navy→blue sky ramp is primary (`--navy-800 #071830` chrome,
`--navy-500 #1249C0` action, `--blue-400 #3B82F6` accent). Surfaces are
cloud-white (`#F5F8FF` app, `#FFFFFF` cards). Status mirrors runway lighting:
**green = clear, amber = caution, red = stop**. Two parallel livery systems,
both semantic: **regulators** each own one fixed hue (BCAS red, DGCA blue, AAI
teal, AERA purple, MoEF green, EPFO gold, CERT-In deep purple), and **sectors**
each own one (aviation blue, finance emerald, healthcare teal, manufacturing
ember, food harvest-green, IT violet, energy amber, education indigo, universal
slate). Color is never used decoratively — if it's colored, it means something.

**Type.** Instrument Serif for *marketing* display/headings (authoritative, like
instrument labels). **Product UI (console) uses Outfit 700 for titles**, not the
serif — serifs read poorly in dense data chrome. Outfit for all body/UI (Plus
Jakarta Sans as alt for dense tables); JetBrains Mono for all data — IDs, dates,
metrics, comm boxes. Labels are uppercase, 0.12em tracked, 11px, weight 600
(`.cb-label`). The logotype is **Outfit** (spaced), not the serif.

**Spacing & shape.** 4px base grid. Cards use `--radius-md (10px)`; pills/tags
use `--radius-pill` (fuselage cross-section). Default card padding 20–24px.

**Cards = instrument panels.** White, 1px `--cloud-200` hairline border,
`--radius-md`, low **navy-tinted** shadow (`--shadow-sm` at rest, `--shadow-md`
on hover). No gradients on cards, no colored left-border-only accents except the
deliberate **flight-strip regulator rule** (a 4px livery bar on the left edge).

**Backgrounds.** Flat cloud-white app surface. The only gradient permitted is the
login radial (navy night sky). No textures, no patterns, no hand-drawn art.

**Dark chrome.** Sidebar = cockpit display (navy-800, white/blue-200 text).
The **ATC comm box** is night-mode (`--navy-700 #0A1E3C`, JetBrains Mono,
green/amber/red tone lines) for logs and audit trails.

**Motion.** Entrances fade-up ("gentle climb on departure",
`--ease-cruise`, 220–360ms). Expand/collapse is "flap deployment"
(`--ease-flap`, slight overshoot). No jarring transitions, no decorative loops.

**Hover/press.** Hover: subtle lift (`translateY(-1px)`) + shadow step, or a
darker shade of the action color. Press: `scale(0.99)` + 0.5px nudge
(mechanical). Focus: 3px blue glow (`--shadow-focus`).

**Borders & elevation.** Hairlines are `--cloud-200`; stronger dividers
`--cloud-300`. Shadows are cool/navy, never neutral black. Four steps: xs / sm /
md / lg. No heavy drop shadows.

---

## ICONOGRAPHY

- **Style:** Lucide-style line icons — 1.75px stroke, round caps/joins, 24px
  grid. The console ships a small inline subset in `ui_kits/console/icons.jsx`
  (gauge, layers, building, shield, plane, search, bell, lock, user, etc.).
- ⚠️ **Substitution flag:** no brand icon set was provided. The inline subset
  matches Lucide geometry; for production, swap in the full **Lucide** set
  (`https://lucide.dev`, MIT) — drop-in, same stroke weight.
- **Status dots** (7–12px filled circles) are the primary status affordance,
  not icons. They mirror runway lights.
- **No emoji.** No multicolor/filled icon styles. Unicode `⌄` / `→` are used
  sparingly for chevrons/affordances inside controls.
- **Logo:** `assets/logo-mark.svg` (approach-path chevron + runway centerline +
  PAPI dot on a navy tile) is the current default mark; `mark-shield.svg`
  (shield + check) and `mark-monogram.svg` (C-check) are alternates pending a
  pick. `logo-wordmark.svg` (light surfaces) / `logo-wordmark-light.svg` (navy
  surfaces) — **Outfit** logotype, spaced, with a "Compliance Intelligence"
  descriptor.

---

## INDEX — what's in this system

**Foundations**
- `styles.css` — entry point (consumers link this one file).
- `tokens/` — `fonts.css`, `colors.css`, `sectors.css`, `typography.css`,
  `spacing.css`, `effects.css`. 168 tokens (base + semantic aliases, incl. the
  9 sector liveries).
- `guidelines/*.html` — foundation specimen cards (Design System tab):
  colors-sky, colors-status, colors-regulators, colors-sectors, colors-neutrals;
  type-display, type-body, type-mono, type-labels; spacing-scale, radii,
  shadows; logo, motion.

**Components** (`window.CompliantBharatAviationDesignSystem_77e7f4.<Name>`)
- `components/buttons/` — `Button`, `IconButton`
- `components/badges/` — `StatusBadge`, `RegulatorTag` (+ `REGULATORS`),
  `SectorTag` (+ `SECTORS`), `Tag`
- `components/data/` — `Card`, `FlightStrip` ★, `ProgressBar`, `CommBox`, `Avatar`
- `components/forms/` — `Input`, `Select`, `Switch`, `Checkbox`, `Radio`
- `components/navigation/` — `Tabs`
- `components/feedback/` — `Toast`, `Tooltip`, `Dialog`

★ `FlightStrip` is the signature unit — one obligation per strip, compact and
expandable (flap motion), with the owning regulator's livery rule.
`SECTORS` / `REGULATORS` export the full maps (label, color, soft, regulators[])
for building sector grids and filters.

**UI kits**
- `ui_kits/console/` — interactive EFIS **aviation** compliance console (login →
  flight deck → obligations register → departments). Outfit chrome; screens are
  small JSX files composing the components above.
- `ui_kits/marketing/` — **parent-brand** Compliance-OS landing page (hero with
  50+/11/1,500+ stats, 11-sector grid, Regulatory+Standards+Gold tiers). Ships
  **3 hero directions** (Cockpit dark / Cloud light / Split aurora) toggled
  bottom-right.

**Assets** — `assets/logo-mark.svg`, `mark-shield.svg`, `mark-monogram.svg`,
`logo-wordmark.svg`, `logo-wordmark-light.svg`.

**`SKILL.md`** — makes this folder usable as a downloadable Claude Agent Skill.

---

## Notes / open items
- Fonts load from Google Fonts (`tokens/fonts.css`). If you hold licensed
  binaries for Instrument Serif / Outfit / Plus Jakarta Sans / JetBrains Mono,
  drop them in `assets/fonts/` and replace the `@import` with `@font-face`.
- Icons are a Lucide substitution (see ICONOGRAPHY) — confirm or supply a set.
