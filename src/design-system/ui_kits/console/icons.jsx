/* Lucide-style stroke icons (1.75px, round joins) — inline subset shipped with
   the kit. Production may swap for the full Lucide CDN; geometry matches. */
const I = ({ children, size = 18 }) => (
  <svg className="cb-icon" width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const CBIcons = {
  gauge: (p) => <I {...p}><path d="M12 14l3-3" /><path d="M3.5 16a9 9 0 1 1 17 0" /><circle cx="12" cy="14" r="1" /></I>,
  layers: (p) => <I {...p}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></I>,
  building: (p) => <I {...p}><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" /></I>,
  radar: (p) => <I {...p}><path d="M19.07 4.93A10 10 0 1 0 21 12" /><path d="M12 12l7-5" /><circle cx="12" cy="12" r="1" /><path d="M12 12V2" opacity="0" /></I>,
  shield: (p) => <I {...p}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" /></I>,
  plane: (p) => <I {...p}><path d="M10.5 13.5L3 12v-1l7.5-1.5L11 4a1 1 0 0 1 2 0l.5 5.5L21 11v1l-7.5 1.5L13 19l1.5 1v1l-2.5-.6L9.5 21v-1l1.5-1 -.5-5.5z" /></I>,
  search: (p) => <I {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></I>,
  bell: (p) => <I {...p}><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10.5 19a1.5 1.5 0 0 0 3 0" /></I>,
  chevronDown: (p) => <I {...p}><path d="M6 9l6 6 6-6" /></I>,
  chevronRight: (p) => <I {...p}><path d="M9 6l6 6-6 6" /></I>,
  plus: (p) => <I {...p}><path d="M12 5v14M5 12h14" /></I>,
  filter: (p) => <I {...p}><path d="M3 5h18l-7 8v6l-4-2v-4L3 5z" /></I>,
  check: (p) => <I {...p}><path d="M5 12l5 5L20 6" /></I>,
  alert: (p) => <I {...p}><path d="M12 3l9 16H3l9-16z" /><path d="M12 10v4M12 17.5v.5" /></I>,
  x: (p) => <I {...p}><path d="M6 6l12 12M18 6L6 18" /></I>,
  lock: (p) => <I {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></I>,
  user: (p) => <I {...p}><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></I>,
  settings: (p) => <I {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></I>,
  clock: (p) => <I {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></I>,
  arrowRight: (p) => <I {...p}><path d="M5 12h14M13 6l6 6-6 6" /></I>,
  leaf: (p) => <I {...p}><path d="M4 20c0-8 6-14 16-14 0 10-6 16-14 16-1 0-2 0-2-2z" /><path d="M9 15c3-3 5-5 7-6" /></I>,
  cpu: (p) => <I {...p}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 9h6v6H9z" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></I>,
  scale: (p) => <I {...p}><path d="M12 4v16M7 20h10M6 7l-3 6h6l-3-6zM18 7l-3 6h6l-3-6zM5 7h14" /></I>,
};

window.CBIcons = CBIcons;
