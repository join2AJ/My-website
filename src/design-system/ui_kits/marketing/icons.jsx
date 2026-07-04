/* Lucide-style stroke icons (1.75px) for the marketing site — sector glyphs +
   UI affordances. Geometry matches Lucide; production may swap for the full set. */
const MI = ({ children, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-flex', flex: 'none' }}>
    {children}
  </svg>
);

const CBMIcons = {
  // sector glyphs
  aviation: (p) => <MI {...p}><path d="M10.5 13.5L3 12v-1l7.5-1.5L11 4a1 1 0 0 1 2 0l.5 5.5L21 11v1l-7.5 1.5L13 19l1.5 1v1l-2.5-.6L9.5 21v-1l1.5-1-.5-5.5z" /></MI>,
  finance: (p) => <MI {...p}><path d="M3 9l9-5 9 5" /><path d="M4 9v9M9 9v9M15 9v9M20 9v9" /><path d="M3 21h18" /></MI>,
  healthcare: (p) => <MI {...p}><path d="M12 4v16M4 12h16" opacity="0" /><path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" /></MI>,
  manufacturing: (p) => <MI {...p}><path d="M3 21V10l5 3V10l5 3V8l5 3v10z" /><path d="M3 21h18" /></MI>,
  food: (p) => <MI {...p}><path d="M12 22V9" /><path d="M12 9c0-3 2-5 2-5M12 9c0-3-2-5-2-5" /><path d="M8 11c-1-1-2-3-1-5 2 0 3 2 4 3M16 11c1-1 2-3 1-5-2 0-3 2-4 3" /></MI>,
  it: (p) => <MI {...p}><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 9h6v6H9z" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></MI>,
  energy: (p) => <MI {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></MI>,
  education: (p) => <MI {...p}><path d="M3 9l9-4 9 4-9 4z" /><path d="M7 11v5c0 1 2 3 5 3s5-2 5-3v-5" /><path d="M21 9v5" /></MI>,
  universal: (p) => <MI {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></MI>,
  // ui
  shield: (p) => <MI {...p}><path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" /><path d="M9 12l2 2 4-4" /></MI>,
  layers: (p) => <MI {...p}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></MI>,
  check: (p) => <MI {...p}><path d="M5 12l5 5L20 6" /></MI>,
  arrow: (p) => <MI {...p}><path d="M5 12h14M13 6l6 6-6 6" /></MI>,
  award: (p) => <MI {...p}><circle cx="12" cy="9" r="6" /><path d="M9 14.5L8 22l4-2 4 2-1-7.5" /></MI>,
  scale: (p) => <MI {...p}><path d="M12 3v18M6 21h12" /><path d="M6 7l-3 6h6l-3-6zM18 7l-3 6h6l-3-6zM5 7h14l-7-2z" /></MI>,
  bolt: (p) => <MI {...p}><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" /></MI>,
};

window.CBMIcons = CBMIcons;
