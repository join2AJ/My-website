# Console UI Kit

Interactive EFIS-style recreation of the CompliantBharat compliance console.

**Entry:** `index.html` (loads React, the DS bundle, then the JSX files below).

Flow: **login → flight deck → obligations register → departments**. Sign in
(prefilled), navigate via the cockpit sidebar.

Files:
- `App.jsx` — shell: login gate + sidebar + screen router.
- `Sidebar.jsx` — cockpit-display nav, regulator legend, officer chip.
- `Topbar.jsx` — search, live-scan status, alerts, new-obligation action.
- `DashboardScreen.jsx` — EFIS stat readouts, readiness bars, live flight strips, ATC comm box.
- `ObligationsScreen.jsx` — filter flight strips by regulator livery.
- `DepartmentScreen.jsx` — instrument card per department.
- `LoginScreen.jsx` — cockpit night-mode sign-in.
- `icons.jsx` — Lucide-style stroke icon subset (`window.CBIcons`).
- `data.jsx` — mock compliance data (`window.CBData`). Not production data.

Screens compose the design-system components (`FlightStrip`, `StatusBadge`,
`RegulatorTag`, `Card`, `CommBox`, `ProgressBar`, `Button`, `Input`) from
`window.CompliantBharatAviationDesignSystem_77e7f4` — they do not re-implement them.
