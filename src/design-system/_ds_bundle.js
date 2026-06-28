/* @ds-bundle: {"format":3,"namespace":"CompliantBharatAviationDesignSystem_77e7f4","components":[{"name":"REGULATORS","sourcePath":"components/badges/RegulatorTag.jsx"},{"name":"RegulatorTag","sourcePath":"components/badges/RegulatorTag.jsx"},{"name":"SECTORS","sourcePath":"components/badges/SectorTag.jsx"},{"name":"SectorTag","sourcePath":"components/badges/SectorTag.jsx"},{"name":"StatusBadge","sourcePath":"components/badges/StatusBadge.jsx"},{"name":"Tag","sourcePath":"components/badges/Tag.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"CommBox","sourcePath":"components/data/CommBox.jsx"},{"name":"FlightStrip","sourcePath":"components/data/FlightStrip.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/badges/RegulatorTag.jsx":"2523f80be18d","components/badges/SectorTag.jsx":"83637083f8c4","components/badges/StatusBadge.jsx":"0c9a8068642e","components/badges/Tag.jsx":"c1f9bfcad3e9","components/buttons/Button.jsx":"1ce468083afe","components/buttons/IconButton.jsx":"7f94a693ded6","components/data/Avatar.jsx":"04460ce4d96e","components/data/Card.jsx":"9ec313621d39","components/data/CommBox.jsx":"c045e7925ca4","components/data/FlightStrip.jsx":"28ace8c30e20","components/data/ProgressBar.jsx":"c0f4e4c034bb","components/feedback/Dialog.jsx":"672f1790f265","components/feedback/Toast.jsx":"108340cf91c9","components/feedback/Tooltip.jsx":"5b9d18960416","components/forms/Checkbox.jsx":"52af8988c9cf","components/forms/Input.jsx":"9d19d92568f6","components/forms/Radio.jsx":"a105722232e7","components/forms/Select.jsx":"26a43b53f9a6","components/forms/Switch.jsx":"22229b8f03b0","components/navigation/Tabs.jsx":"0f655e4e6ee2","ui_kits/console/App.jsx":"57fc35db30ab","ui_kits/console/DashboardScreen.jsx":"404340c63e5b","ui_kits/console/DepartmentScreen.jsx":"bb8e6f4be6ca","ui_kits/console/LoginScreen.jsx":"cbde924356a0","ui_kits/console/ObligationsScreen.jsx":"07a2e6c51576","ui_kits/console/Sidebar.jsx":"130b6bb71256","ui_kits/console/Topbar.jsx":"71d18dc6ecbb","ui_kits/console/data.jsx":"cdd718b15266","ui_kits/console/icons.jsx":"64425804016f","ui_kits/marketing/Landing.jsx":"359b19d2a02b","ui_kits/marketing/icons.jsx":"5f9f0c2539b2","ui_kits/marketing/sections.jsx":"be47c259b74a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CompliantBharatAviationDesignSystem_77e7f4 = window.CompliantBharatAviationDesignSystem_77e7f4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/badges/RegulatorTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Regulator liveries — like airline colors. Each authority owns one hue. */
const REGULATORS = {
  BCAS: {
    color: 'var(--reg-bcas)',
    soft: 'var(--reg-bcas-soft)',
    name: 'Bureau of Civil Aviation Security'
  },
  DGCA: {
    color: 'var(--reg-dgca)',
    soft: 'var(--reg-dgca-soft)',
    name: 'Directorate General of Civil Aviation'
  },
  AAI: {
    color: 'var(--reg-aai)',
    soft: 'var(--reg-aai-soft)',
    name: 'Airports Authority of India'
  },
  AERA: {
    color: 'var(--reg-aera)',
    soft: 'var(--reg-aera-soft)',
    name: 'Airport Economic Regulatory Authority'
  },
  MoEF: {
    color: 'var(--reg-moef)',
    soft: 'var(--reg-moef-soft)',
    name: 'Ministry of Environment & Forests'
  },
  EPFO: {
    color: 'var(--reg-epfo)',
    soft: 'var(--reg-epfo-soft)',
    name: "Employees' Provident Fund Organisation"
  },
  'CERT-In': {
    color: 'var(--reg-certin)',
    soft: 'var(--reg-certin-soft)',
    name: 'Indian Computer Emergency Response Team'
  }
};

/**
 * Regulator livery tag — fuselage pill. `solid` for emphasis, `soft` (default)
 * for inline use, `bar` adds a leading color rule like a flight strip.
 */
function RegulatorTag({
  regulator = 'DGCA',
  variant = 'soft',
  style = {},
  ...rest
}) {
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
    whiteSpace: 'nowrap'
  };
  const variants = {
    soft: {
      background: r.soft,
      color: r.color
    },
    solid: {
      background: r.color,
      color: 'var(--white)'
    },
    outline: {
      background: 'transparent',
      color: r.color,
      boxShadow: `inset 0 0 0 1px ${r.color}`
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...(variants[variant] || variants.soft),
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: variant === 'solid' ? 'var(--white)' : r.color,
      flex: 'none'
    }
  }), regulator);
}
Object.assign(__ds_scope, { REGULATORS, RegulatorTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/RegulatorTag.jsx", error: String((e && e.message) || e) }); }

// components/badges/SectorTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The 11-sector compliance map. Each sector owns one fixed livery hue and the
 * authorities it answers to. Universal = obligations every business carries.
 */
const SECTORS = {
  aviation: {
    label: 'Aviation',
    color: 'var(--sector-aviation)',
    soft: 'var(--sector-aviation-soft)',
    regulators: ['DGCA', 'BCAS', 'AAI', 'AERA', 'CISF', 'CERT-In', 'CPCB', 'EPFO', 'ICAO']
  },
  finance: {
    label: 'Finance & Banking',
    color: 'var(--sector-finance)',
    soft: 'var(--sector-finance-soft)',
    regulators: ['RBI', 'SEBI', 'IRDAI', 'PFRDA', 'NHB', 'NABARD', 'DPDPA', 'EPFO']
  },
  healthcare: {
    label: 'Healthcare',
    color: 'var(--sector-healthcare)',
    soft: 'var(--sector-healthcare-soft)',
    regulators: ['CDSCO', 'NABH', 'NABL', 'NMC', 'INC', 'NPPA', 'MoHFW', 'DPDPA']
  },
  manufacturing: {
    label: 'Manufacturing',
    color: 'var(--sector-manufacturing)',
    soft: 'var(--sector-manufacturing-soft)',
    regulators: ['BIS', 'FSSAI', 'CPCB', 'MoEF', 'PESO', 'CEA', 'ESIC', 'Factory Insp.']
  },
  food: {
    label: 'Food & Agri',
    color: 'var(--sector-food)',
    soft: 'var(--sector-food-soft)',
    regulators: ['FSSAI', 'APEDA', 'NPOP', 'EIC', 'AgMark', 'CIB&RC', 'Plant Qrntn', 'WDRA']
  },
  it: {
    label: 'IT / Tech',
    color: 'var(--sector-it)',
    soft: 'var(--sector-it-soft)',
    regulators: ['CERT-In', 'TRAI', 'MeitY', 'DPDPA', 'DOT', 'SEBI', 'RBI']
  },
  energy: {
    label: 'Energy',
    color: 'var(--sector-energy)',
    soft: 'var(--sector-energy-soft)',
    regulators: ['CERC', 'SERC', 'PNGRB', 'CEA', 'MNRE', 'MoP', 'OISD', 'PESO']
  },
  education: {
    label: 'Education',
    color: 'var(--sector-education)',
    soft: 'var(--sector-education-soft)',
    regulators: ['UGC', 'AICTE', 'NAAC', 'NBA', 'CBSE', 'RTE', 'NMC', 'State Boards']
  },
  universal: {
    label: 'Universal',
    color: 'var(--sector-universal)',
    soft: 'var(--sector-universal-soft)',
    regulators: ['EPFO', 'ESIC', 'Labour', 'GST', 'MCA', 'DPDPA', 'CCI', 'FEMA']
  }
};

/**
 * Sector livery tag. `soft` (default) for inline use, `solid` for emphasis,
 * `outline` for quiet contexts. Pass `icon` to lead with a sector glyph.
 */
function SectorTag({
  sector = 'aviation',
  variant = 'soft',
  icon = null,
  style = {},
  ...rest
}) {
  const s = SECTORS[sector] || SECTORS.aviation;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    height: 24,
    padding: icon ? '0 12px 0 9px' : '0 12px',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--fw-semibold)',
    letterSpacing: 'var(--tracking-wide)',
    borderRadius: 'var(--radius-pill)',
    whiteSpace: 'nowrap'
  };
  const variants = {
    soft: {
      background: s.soft,
      color: s.color
    },
    solid: {
      background: s.color,
      color: 'var(--white)'
    },
    outline: {
      background: 'transparent',
      color: s.color,
      boxShadow: `inset 0 0 0 1px ${s.color}`
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...(variants[variant] || variants.soft),
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: variant === 'solid' ? 'var(--white)' : s.color
    }
  }, icon) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: variant === 'solid' ? 'var(--white)' : s.color,
      flex: 'none'
    }
  }), s.label);
}
Object.assign(__ds_scope, { SECTORS, SectorTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/SectorTag.jsx", error: String((e && e.message) || e) }); }

// components/badges/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATUS = {
  clear: {
    dot: 'var(--status-clear)',
    fg: 'var(--green-700)',
    bg: 'var(--status-clear-soft)',
    label: 'Clear'
  },
  caution: {
    dot: 'var(--status-caution)',
    fg: 'var(--amber-700)',
    bg: 'var(--status-caution-soft)',
    label: 'Caution'
  },
  stop: {
    dot: 'var(--status-stop)',
    fg: 'var(--red-700)',
    bg: 'var(--status-stop-soft)',
    label: 'Stop'
  },
  info: {
    dot: 'var(--status-info)',
    fg: 'var(--navy-500)',
    bg: 'var(--status-info-soft)',
    label: 'Info'
  },
  neutral: {
    dot: 'var(--ink-400)',
    fg: 'var(--ink-500)',
    bg: 'var(--cloud-150)',
    label: 'Pending'
  }
};

/**
 * Runway-light status pill: green = clear, amber = caution, red = stop.
 * Color carries meaning — never decorative.
 */
function StatusBadge({
  status = 'info',
  children,
  dot = true,
  solid = false,
  style = {},
  ...rest
}) {
  const s = STATUS[status] || STATUS.info;
  const solidStyle = {
    background: s.dot,
    color: 'var(--white)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 22,
      padding: dot ? '0 10px 0 8px' : '0 10px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-pill)',
      background: solid ? solidStyle.background : s.bg,
      color: solid ? solidStyle.color : s.fg,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: solid ? 'var(--white)' : s.dot,
      boxShadow: solid ? 'none' : `0 0 0 3px ${s.bg}`,
      flex: 'none'
    }
  }), children || s.label);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/badges/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Generic metadata pill — fuselage cross-section. Quiet, neutral by default. */
function Tag({
  children,
  tone = 'neutral',
  mono = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      background: 'var(--cloud-150)',
      color: 'var(--ink-500)',
      border: '1px solid var(--cloud-200)'
    },
    blue: {
      background: 'var(--blue-100)',
      color: 'var(--navy-500)',
      border: '1px solid transparent'
    },
    dark: {
      background: 'var(--navy-700)',
      color: 'var(--text-on-dark)',
      border: '1px solid var(--navy-600)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 20,
      padding: '0 9px',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--fw-medium)',
      letterSpacing: mono ? 'var(--tracking-mono)' : 'var(--tracking-wide)',
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...(tones[tone] || tones.neutral),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/Tag.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Variant resting styles. Solid variants get a faint inner top-highlight +
   soft drop shadow for an instrument-key feel (no gradients). */
const VARIANTS = {
  primary: {
    background: 'var(--action-primary)',
    color: 'var(--text-on-accent)',
    border: '1px solid transparent',
    boxShadow: '0 1px 2px rgba(7,24,48,0.18), inset 0 1px 0 rgba(255,255,255,0.16)',
    hoverBg: 'var(--action-primary-hover)'
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--ink-700)',
    border: '1px solid var(--border-strong)',
    boxShadow: '0 1px 1.5px rgba(7,24,48,0.05)',
    hoverBg: 'var(--surface-sunken)',
    hoverBorder: 'var(--ink-300)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--navy-500)',
    border: '1px solid transparent',
    boxShadow: 'none',
    hoverBg: 'var(--surface-sunken)'
  },
  danger: {
    background: 'var(--status-stop)',
    color: 'var(--text-on-accent)',
    border: '1px solid transparent',
    boxShadow: '0 1px 2px rgba(196,30,30,0.24), inset 0 1px 0 rgba(255,255,255,0.16)',
    hoverBg: 'var(--red-700)'
  },
  dark: {
    background: 'var(--navy-700)',
    color: 'var(--text-on-dark)',
    border: '1px solid var(--navy-600)',
    boxShadow: '0 1px 2px rgba(5,15,34,0.30), inset 0 1px 0 rgba(255,255,255,0.08)',
    hoverBg: 'var(--navy-600)'
  }
};
const SIZES = {
  sm: {
    fontSize: 13,
    padding: '0 13px',
    height: 34,
    gap: 7,
    icon: 15
  },
  md: {
    fontSize: 14,
    padding: '0 18px',
    height: 42,
    gap: 8,
    icon: 16
  },
  lg: {
    fontSize: 16,
    padding: '0 26px',
    height: 50,
    gap: 10,
    icon: 18
  }
};

/**
 * Primary action control. Instrument-key depth, gentle hover lift, mechanical
 * press, blue focus ring. Pill-capable (fuselage radius).
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  block = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const elevated = variant === 'primary' || variant === 'danger' || variant === 'dark';
  const restShadow = v.boxShadow;
  const hoverShadow = elevated ? '0 4px 12px rgba(7,24,48,0.20), inset 0 1px 0 rgba(255,255,255,0.16)' : v.boxShadow;
  const focusRing = focus && !disabled ? ', 0 0 0 3px rgba(18,73,192,0.28)' : '';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      display: block ? 'flex' : 'inline-flex',
      width: block ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: s.fontSize,
      letterSpacing: '0.005em',
      lineHeight: 1,
      borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transform: press && !disabled ? 'translateY(1px)' : hover && !disabled && elevated ? 'translateY(-1px)' : 'translateY(0)',
      transition: 'transform var(--dur-fast) var(--ease-cruise), background var(--dur-base) var(--ease-cruise), border-color var(--dur-base) var(--ease-cruise), box-shadow var(--dur-base) var(--ease-cruise)',
      whiteSpace: 'nowrap',
      outline: 'none',
      background: v.background,
      color: v.color,
      border: v.border,
      boxShadow: (press && !disabled ? restShadow : hover && !disabled ? hoverShadow : restShadow) + focusRing,
      ...(hover && !disabled ? {
        background: v.hoverBg,
        ...(v.hoverBorder ? {
          borderColor: v.hoverBorder
        } : {})
      } : {}),
      ...style
    }
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.icon,
      height: s.icon,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.icon,
      height: s.icon,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square icon-only control. Matches Button heights; use for toolbar actions.
 */
function IconButton({
  children,
  variant = 'secondary',
  size = 'md',
  pill = false,
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const dim = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
  const [hover, setHover] = React.useState(false);
  const variants = {
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--ink-700)',
      border: '1px solid var(--border-strong)',
      hover: 'var(--surface-sunken)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--ink-500)',
      border: '1px solid transparent',
      hover: 'var(--surface-sunken)'
    },
    dark: {
      background: 'var(--navy-700)',
      color: 'var(--text-on-dark)',
      border: '1px solid var(--navy-600)',
      hover: 'var(--navy-600)'
    }
  };
  const v = variants[variant] || variants.secondary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      background: hover && !disabled ? v.hover : v.background,
      color: v.color,
      border: v.border,
      borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'var(--transition)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/Avatar.jsx
try { (() => {
const SIZES = {
  sm: 26,
  md: 34,
  lg: 44
};

/** User/identity avatar — initials on a deterministic navy-family tint, or image. */
function Avatar({
  name = '',
  src,
  size = 'md',
  status,
  style = {}
}) {
  const dim = SIZES[size] || SIZES.md;
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const palette = ['var(--navy-500)', 'var(--reg-aai)', 'var(--reg-aera)', 'var(--green-700)', 'var(--amber-700)'];
  const tint = palette[(name.charCodeAt(0) || 0) % palette.length];
  const statusColor = {
    clear: 'var(--status-clear)',
    caution: 'var(--status-caution)',
    stop: 'var(--status-stop)'
  }[status];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      flex: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: dim,
      height: dim,
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: src ? 'transparent' : tint,
      color: 'var(--white)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: dim * 0.4,
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.16)'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials), statusColor && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -1,
      bottom: -1,
      width: dim * 0.3,
      height: dim * 0.3,
      borderRadius: '50%',
      background: statusColor,
      border: '2px solid var(--surface-card)'
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Instrument-panel surface — crisp hairline, low cool shadow, no decoration. */
function Card({
  children,
  padding = 'var(--space-7)',
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: 'var(--border-card)',
      borderRadius: 'var(--radius-md)',
      padding,
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-1px)' : 'none',
      transition: 'var(--transition)',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/CommBox.jsx
try { (() => {
/**
 * ATC comm box — dark cockpit night-mode display for datalink-style messages,
 * audit trails, system log. Monospace, navy-night background.
 */
function CommBox({
  title = 'ATC · DATALINK',
  lines = [],
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-comm)',
      border: '1px solid var(--navy-600)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-md)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      borderBottom: '1px solid var(--navy-600)',
      background: 'var(--navy-800)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--green-300)',
      boxShadow: '0 0 6px var(--green-300)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--tracking-label)',
      color: 'var(--blue-200)'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      lineHeight: 1.8,
      color: 'var(--cloud-50)'
    }
  }, children, lines.map((ln, i) => {
    const obj = typeof ln === 'string' ? {
      text: ln
    } : ln;
    const toneColor = {
      clear: 'var(--green-300)',
      caution: 'var(--amber-500)',
      stop: 'var(--red-500)',
      dim: 'var(--ink-300)'
    }[obj.tone] || 'var(--cloud-50)';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 10,
        color: toneColor
      }
    }, obj.time && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--blue-300)',
        flex: 'none'
      }
    }, obj.time), /*#__PURE__*/React.createElement("span", {
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, obj.text));
  })));
}
Object.assign(__ds_scope, { CommBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/CommBox.jsx", error: String((e && e.message) || e) }); }

// components/data/FlightStrip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATUS_DOT = {
  clear: 'var(--status-clear)',
  caution: 'var(--status-caution)',
  stop: 'var(--status-stop)',
  info: 'var(--status-info)'
};

/**
 * The signature unit: a "flight strip" for one compliance obligation.
 * Compact and scannable; expands like flap deployment to reveal detail.
 * Leading rule carries the owning regulator's livery.
 */
function FlightStrip({
  code,
  title,
  regulator = 'DGCA',
  status = 'clear',
  due,
  department,
  detail,
  defaultExpanded = false,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  const [hover, setHover] = React.useState(false);
  const r = __ds_scope.REGULATORS[regulator] || __ds_scope.REGULATORS.DGCA;
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      border: 'var(--border-card)',
      borderRadius: 'var(--radius-md)',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      overflow: 'hidden',
      transition: 'var(--transition)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      background: r.color
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => detail && setOpen(o => !o),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      width: '100%',
      padding: '14px 18px 14px 22px',
      background: 'transparent',
      border: 'none',
      cursor: detail ? 'pointer' : 'default',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: STATUS_DOT[status],
      flex: 'none',
      boxShadow: `0 0 0 3px ${r.soft}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--tracking-mono)',
      color: r.color,
      flex: 'none',
      minWidth: 92
    }
  }, code), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-strong)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), due && /*#__PURE__*/React.createElement("span", {
    className: "cb-label",
    style: {
      flex: 'none'
    }
  }, due), /*#__PURE__*/React.createElement(__ds_scope.StatusBadge, {
    status: status,
    dot: false,
    style: {
      flex: 'none'
    }
  }), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      color: 'var(--ink-300)',
      fontSize: 18,
      lineHeight: 1,
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform var(--dur-base) var(--ease-flap)'
    }
  }, "\u2304")), detail && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: open ? '1fr' : '0fr',
      transition: 'grid-template-rows var(--dur-slow) var(--ease-flap)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 18px 16px 22px',
      borderTop: 'var(--border)',
      marginTop: 2,
      paddingTop: 14,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      lineHeight: 'var(--leading-relaxed)',
      color: 'var(--text-secondary)'
    }
  }, department && /*#__PURE__*/React.createElement("div", {
    className: "cb-label",
    style: {
      marginBottom: 8
    }
  }, r.name, " \xB7 ", department), detail))));
}
Object.assign(__ds_scope, { FlightStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/FlightStrip.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
/**
 * Approach-path progress bar — references runway-length markers.
 * Tone follows runway lighting; shows value as an avionics readout.
 */
function ProgressBar({
  value = 0,
  tone = 'info',
  label,
  showValue = true,
  height = 8,
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value));
  const tones = {
    info: 'var(--navy-500)',
    clear: 'var(--status-clear)',
    caution: 'var(--status-caution)',
    stop: 'var(--status-stop)'
  };
  const fill = tones[tone] || tones.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 6
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "cb-label"
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-body)'
    }
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height,
      background: 'var(--cloud-200)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: `${pct}%`,
      background: fill,
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--dur-slow) var(--ease-cruise)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/**
 * Modal dialog — backdrop blur, instrument-panel card, climb-in. Render
 * conditionally on `open`; pass `footer` for actions.
 */
function Dialog({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 460,
  style = {}
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(7,24,48,0.45)',
      backdropFilter: 'blur(4px)',
      padding: 24,
      animation: 'cb-climb var(--dur-base) var(--ease-cruise) both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    style: {
      width,
      maxWidth: '100%',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      padding: '20px 22px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: '-0.01em',
      margin: 0,
      color: 'var(--text-strong)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      margin: '4px 0 0'
    }
  }, subtitle)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--ink-400)',
      fontSize: 18,
      lineHeight: 1,
      padding: 2,
      flex: 'none'
    }
  }, "\u2715")), children && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 22px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      padding: '14px 22px',
      borderTop: '1px solid var(--border-hairline)',
      background: 'var(--surface-sunken)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/** Toast — runway-light status notification. Status rule + icon + message. */
function Toast({
  status = 'info',
  title,
  message,
  onClose,
  style = {}
}) {
  const tones = {
    clear: {
      c: 'var(--status-clear)',
      soft: 'var(--status-clear-soft)'
    },
    caution: {
      c: 'var(--status-caution)',
      soft: 'var(--status-caution-soft)'
    },
    stop: {
      c: 'var(--status-stop)',
      soft: 'var(--status-stop-soft)'
    },
    info: {
      c: 'var(--status-info)',
      soft: 'var(--status-info-soft)'
    }
  };
  const t = tones[status] || tones.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      width: 340,
      padding: '14px 16px 14px 18px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      background: t.c
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: t.c,
      marginTop: 5,
      flex: 'none',
      boxShadow: `0 0 0 4px ${t.soft}`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-strong)'
    }
  }, title), message && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)',
      marginTop: 2,
      lineHeight: 1.5
    }
  }, message)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--ink-400)',
      fontSize: 16,
      lineHeight: 1,
      padding: 0,
      flex: 'none'
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** Tooltip — hover label for icons/affordances. Dark cockpit chip, fades in. */
function Tooltip({
  label,
  children,
  placement = 'top',
  style = {}
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: 8
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: 8
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: 8
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: 8
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      ...pos,
      zIndex: 30,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      padding: '5px 9px',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--navy-800)',
      color: 'var(--cloud-50)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 500,
      boxShadow: 'var(--shadow-md)',
      opacity: show ? 1 : 0,
      transform: `${pos.transform} translateY(${show ? 0 : 3}px)`,
      transition: 'opacity var(--dur-fast) var(--ease-cruise), transform var(--dur-fast) var(--ease-cruise)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Checkbox — square, navy when checked, mechanical check. */
function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  style = {}
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(v => !v);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "checkbox",
    "aria-checked": on,
    onClick: toggle,
    style: {
      width: 19,
      height: 19,
      flex: 'none',
      padding: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      borderRadius: 'var(--radius-xs)',
      border: `1.5px solid ${on ? 'var(--action-primary)' : 'var(--border-strong)'}`,
      background: on ? 'var(--action-primary)' : 'var(--surface-card)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background var(--dur-fast) var(--ease-cruise), border-color var(--dur-fast) var(--ease-cruise)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--white)",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      opacity: on ? 1 : 0,
      transform: on ? 'scale(1)' : 'scale(0.6)',
      transition: 'all var(--dur-fast) var(--ease-flap)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l5 5L20 6"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Instrument-panel text input. Crisp border, blue focus glow. */
function Input({
  label,
  hint,
  error,
  prefix,
  mono = false,
  style = {},
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || (label ? `cb-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--status-stop)' : focus ? 'var(--border-focus)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    className: "cb-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-sm)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      padding: '0 12px',
      height: 40,
      transition: 'var(--transition)'
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-300)',
      display: 'inline-flex'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-strong)',
      height: '100%',
      letterSpacing: mono ? 'var(--tracking-mono)' : 'normal'
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--status-stop)' : 'var(--text-muted)',
      fontFamily: 'var(--font-sans)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio group — single select. Pass `options` as strings or {value,label}. */
function Radio({
  options = [],
  value,
  defaultValue,
  onChange,
  name,
  disabled = false,
  style = {}
}) {
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? norm[0]?.value);
  const active = isControlled ? value : internal;
  const select = v => {
    if (disabled) return;
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      ...style
    }
  }, norm.map(o => {
    const on = o.value === active;
    return /*#__PURE__*/React.createElement("label", {
      key: o.value,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      role: "radio",
      "aria-checked": on,
      name: name,
      onClick: () => select(o.value),
      style: {
        width: 19,
        height: 19,
        flex: 'none',
        padding: 0,
        borderRadius: '50%',
        border: `1.5px solid ${on ? 'var(--action-primary)' : 'var(--border-strong)'}`,
        background: 'var(--surface-card)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color var(--dur-fast) var(--ease-cruise)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: '50%',
        background: 'var(--action-primary)',
        transform: on ? 'scale(1)' : 'scale(0)',
        transition: 'transform var(--dur-fast) var(--ease-flap)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-body)'
      }
    }, o.label));
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Select control matching Input styling. */
function Select({
  label,
  hint,
  options = [],
  style = {},
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldId = id || (label ? `cb-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    className: "cb-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      border: `1px solid ${focus ? 'var(--border-focus)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-sm)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      background: 'var(--surface-card)',
      transition: 'var(--transition)'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: 40,
      padding: '0 36px 0 12px',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-strong)',
      cursor: 'pointer'
    }
  }, rest), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--ink-400)',
      fontSize: 16
    }
  }, "\u2304")), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-sans)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** Toggle switch — mechanical flap motion. Navy when on. */
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  style = {}
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(v => !v);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": on,
    onClick: toggle,
    style: {
      position: 'relative',
      width: 40,
      height: 23,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      padding: 0,
      background: on ? 'var(--action-primary)' : 'var(--cloud-300)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background var(--dur-base) var(--ease-cruise)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2.5,
      left: on ? 19.5 : 2.5,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: 'var(--white)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--dur-base) var(--ease-flap)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Underline tabs — view switcher for product surfaces. Controlled or
 * uncontrolled. The active tab slides with a cruise ease.
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  style = {}
}) {
  const norm = tabs.map(t => typeof t === 'string' ? {
    value: t,
    label: t
  } : t);
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? norm[0]?.value);
  const active = isControlled ? value : internal;
  const select = v => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--border-hairline)',
      ...style
    }
  }, norm.map(t => {
    const on = t.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => select(t.value),
      style: {
        position: 'relative',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '10px 14px 12px',
        marginBottom: -1,
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: on ? 700 : 500,
        letterSpacing: '0.005em',
        color: on ? 'var(--text-strong)' : 'var(--text-secondary)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        transition: 'color var(--dur-base) var(--ease-cruise)'
      }
    }, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 600,
        color: on ? 'var(--navy-500)' : 'var(--ink-400)',
        background: on ? 'var(--blue-100)' : 'var(--surface-sunken)',
        borderRadius: 'var(--radius-pill)',
        padding: '1px 7px'
      }
    }, t.count), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: 0,
        height: 2.5,
        borderRadius: 2,
        background: on ? 'var(--navy-500)' : 'transparent',
        transition: 'background var(--dur-base) var(--ease-cruise)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/App.jsx
try { (() => {
/* App shell — login → console with sidebar + screen router. */
function CBApp() {
  const [authed, setAuthed] = React.useState(false);
  const [screen, setScreen] = React.useState('dashboard');
  if (!authed) return /*#__PURE__*/React.createElement(window.CBLoginScreen, {
    onEnter: () => setAuthed(true)
  });
  const titles = {
    dashboard: ['Flight deck', 'Indira Gandhi Intl · DEL · live'],
    obligations: ['Obligations register', '418 obligations · 7 regulators'],
    departments: ['Departments', '21 departments tracked']
  };
  const [title, subtitle] = titles[screen];
  const Screen = {
    dashboard: window.CBDashboardScreen,
    obligations: window.CBObligationsScreen,
    departments: window.CBDepartmentScreen
  }[screen];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh'
    }
  }, /*#__PURE__*/React.createElement(window.CBSidebar, {
    screen: screen,
    go: setScreen
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(window.CBTopbar, {
    title: title,
    subtitle: subtitle
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    go: setScreen
  }))));
}
window.CBApp = CBApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/DashboardScreen.jsx
try { (() => {
/* Flight-deck overview — EFIS stat readouts, readiness, live strips, comm box. */
const {
  Card,
  FlightStrip,
  ProgressBar,
  CommBox,
  StatusBadge
} = window.CompliantBharatAviationDesignSystem_77e7f4;
const TONE = {
  clear: 'var(--status-clear)',
  caution: 'var(--amber-700)',
  stop: 'var(--status-stop)',
  info: 'var(--navy-500)'
};
const TONE_SOFT = {
  clear: 'var(--status-clear-soft)',
  caution: 'var(--status-caution-soft)',
  stop: 'var(--status-stop-soft)',
  info: 'var(--status-info-soft)'
};
function Stat({
  label,
  value,
  tone,
  sub,
  delta,
  icon
}) {
  const c = TONE[tone] || TONE.info;
  const I = window.CBIcons;
  const Glyph = icon ? I[icon] : null;
  return /*#__PURE__*/React.createElement(Card, {
    padding: "18px 20px",
    style: {
      flex: 1,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 3,
      background: c
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)'
    }
  }, label), Glyph && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 'var(--radius-sm)',
      background: TONE_SOFT[tone],
      color: c,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Glyph, {
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 34,
      color: 'var(--text-strong)',
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 9
    }
  }, delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 600,
      color: c,
      background: TONE_SOFT[tone],
      borderRadius: 'var(--radius-pill)',
      padding: '2px 8px'
    }
  }, delta), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, sub)));
}
function SectionHead({
  children,
  action,
  onAction
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: '-0.01em',
      margin: 0,
      color: 'var(--text-strong)'
    }
  }, children), action && /*#__PURE__*/React.createElement("a", {
    onClick: onAction,
    style: {
      fontSize: 13,
      color: 'var(--text-link)',
      cursor: 'pointer',
      fontWeight: 600
    }
  }, action));
}
function DashboardScreen({
  go
}) {
  const d = window.CBData;
  const live = d.OBLIGATIONS.filter(o => o.status !== 'clear').slice(0, 5);
  const clearedPct = Math.round(d.summary.clear / d.summary.total * 100);
  return /*#__PURE__*/React.createElement("div", {
    className: "cb-fade",
    style: {
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Obligations",
    value: d.summary.total,
    tone: "info",
    icon: "layers",
    sub: "21 departments"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Cleared",
    value: d.summary.clear,
    tone: "clear",
    icon: "check",
    delta: clearedPct + '%',
    sub: "compliant"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Caution",
    value: d.summary.caution,
    tone: "caution",
    icon: "clock",
    sub: "due \u2264 30 days"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Breach",
    value: d.summary.stop,
    tone: "stop",
    icon: "alert",
    delta: "ACTION",
    sub: "now"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.7fr 1fr',
      gap: 22,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "22px"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    action: "View register \u2192",
    onAction: () => go('obligations')
  }, "On approach \u2014 needs attention"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--strip-gap)'
    }
  }, live.map(o => /*#__PURE__*/React.createElement(FlightStrip, {
    key: o.code,
    code: o.code,
    regulator: o.regulator,
    status: o.status,
    title: o.title,
    due: o.due,
    department: o.dept,
    detail: o.detail
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "22px"
  }, /*#__PURE__*/React.createElement(SectionHead, null, "Airport readiness"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 40,
      color: 'var(--status-clear)',
      lineHeight: 1
    }
  }, d.summary.readiness, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "%")), /*#__PURE__*/React.createElement(StatusBadge, {
    status: "clear",
    dot: false
  }, "On track")), /*#__PURE__*/React.createElement(ProgressBar, {
    value: d.summary.readiness,
    tone: "clear",
    label: "Overall posture"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14
    }
  }), /*#__PURE__*/React.createElement(ProgressBar, {
    value: 71,
    tone: "caution",
    label: "Cyber (CERT-In)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 14
    }
  }), /*#__PURE__*/React.createElement(ProgressBar, {
    value: 95,
    tone: "clear",
    label: "Economic (AERA)"
  })), /*#__PURE__*/React.createElement(CommBox, {
    title: "AUDIT \xB7 TRAIL",
    lines: d.AUDIT
  }))));
}
window.CBDashboardScreen = DashboardScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/DepartmentScreen.jsx
try { (() => {
/* Departments grid — one instrument card per department. */
const {
  Card,
  RegulatorTag,
  ProgressBar,
  StatusBadge
} = window.CompliantBharatAviationDesignSystem_77e7f4;
function DepartmentScreen() {
  const d = window.CBData;
  return /*#__PURE__*/React.createElement("div", {
    className: "cb-fade",
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 16
    }
  }, d.DEPARTMENTS.map(dep => {
    const tone = dep.stop ? 'stop' : dep.caution ? 'caution' : 'clear';
    return /*#__PURE__*/React.createElement(Card, {
      key: dep.name,
      interactive: true,
      padding: "18px"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 16,
        color: 'var(--text-strong)'
      }
    }, dep.name), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 7
      }
    }, /*#__PURE__*/React.createElement(RegulatorTag, {
      regulator: dep.regulator
    }))), /*#__PURE__*/React.createElement(StatusBadge, {
      status: tone,
      dot: false
    }, dep.stop ? dep.stop + ' breach' : dep.caution ? dep.caution + ' caution' : 'Clear')), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 18,
        marginBottom: 14
      }
    }, [['Total', dep.total, 'var(--text-strong)'], ['Clear', dep.clear, 'var(--status-clear)'], ['Caution', dep.caution, 'var(--amber-700)'], ['Breach', dep.stop, 'var(--status-stop)']].map(([l, v, c]) => /*#__PURE__*/React.createElement("div", {
      key: l
    }, /*#__PURE__*/React.createElement("div", {
      className: "cb-label"
    }, l), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        fontSize: 19,
        color: c,
        marginTop: 3
      }
    }, v)))), /*#__PURE__*/React.createElement(ProgressBar, {
      value: dep.readiness,
      tone: tone,
      label: "Readiness"
    }));
  })));
}
window.CBDepartmentScreen = DepartmentScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/DepartmentScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/LoginScreen.jsx
try { (() => {
/* Cockpit night-mode login. */
const {
  Button,
  Input
} = window.CompliantBharatAviationDesignSystem_77e7f4;
function LoginScreen({
  onEnter
}) {
  const I = window.CBIcons;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(120% 120% at 50% 0%, #0D2B6E 0%, #071830 55%, #050F22 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cb-fade",
    style: {
      width: 380
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 26,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "44",
    height: "44",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: '-0.01em',
      color: '#fff'
    }
  }, "Compliant", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--blue-300)'
    }
  }, "Bharat"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      padding: 28,
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: '-0.01em',
      margin: '0 0 4px',
      color: 'var(--text-strong)'
    }
  }, "Pre-flight check"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)',
      margin: '0 0 22px'
    }
  }, "Sign in to the compliance flight deck."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Officer ID",
    mono: true,
    prefix: /*#__PURE__*/React.createElement(I.user, {
      size: 16
    }),
    defaultValue: "DEL-CO-0041"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Passcode",
    type: "password",
    prefix: /*#__PURE__*/React.createElement(I.lock, {
      size: 16
    }),
    defaultValue: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    onClick: onEnter,
    iconRight: /*#__PURE__*/React.createElement(I.arrowRight, {
      size: 16
    })
  }, "Enter flight deck"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 16,
      fontSize: 11,
      color: 'var(--ink-400)',
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.06em'
    }
  }, "DGCA \xB7 BCAS \xB7 AAI \xB7 AERA \xB7 MoEF \xB7 EPFO \xB7 CERT-In")));
}
window.CBLoginScreen = LoginScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/ObligationsScreen.jsx
try { (() => {
/* Obligations register — filter strips by regulator livery. */
const {
  FlightStrip,
  RegulatorTag,
  Tag
} = window.CompliantBharatAviationDesignSystem_77e7f4;
function ObligationsScreen() {
  const d = window.CBData;
  const [reg, setReg] = React.useState('ALL');
  const list = reg === 'ALL' ? d.OBLIGATIONS : d.OBLIGATIONS.filter(o => o.regulator === reg);
  const Chip = ({
    value,
    children
  }) => {
    const active = reg === value;
    return /*#__PURE__*/React.createElement("button", {
      onClick: () => setReg(value),
      style: {
        padding: '6px 13px',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.02em',
        border: '1px solid ' + (active ? 'var(--navy-500)' : 'var(--border-strong)'),
        background: active ? 'var(--navy-500)' : 'var(--surface-card)',
        color: active ? '#fff' : 'var(--ink-500)',
        transition: 'var(--transition)'
      }
    }, children);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "cb-fade",
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    value: "ALL"
  }, "All \xB7 ", d.OBLIGATIONS.length), d.REGS.map(r => /*#__PURE__*/React.createElement(Chip, {
    key: r,
    value: r
  }, r)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    mono: true
  }, list.length, " shown"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--strip-gap)'
    }
  }, list.map(o => /*#__PURE__*/React.createElement(FlightStrip, {
    key: o.code,
    code: o.code,
    regulator: o.regulator,
    status: o.status,
    title: o.title,
    due: o.due,
    department: o.dept,
    detail: o.detail
  }))));
}
window.CBObligationsScreen = ObligationsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/ObligationsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Sidebar.jsx
try { (() => {
/* Cockpit-display sidebar — dark navy, white text, regulator legend at foot. */
const {
  RegulatorTag
} = window.CompliantBharatAviationDesignSystem_77e7f4;
function NavItem({
  icon: Icon,
  label,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      width: '100%',
      padding: '10px 12px',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      borderRadius: 'var(--radius-sm)',
      background: active ? 'rgba(59,130,246,0.16)' : hover ? 'rgba(255,255,255,0.05)' : 'transparent',
      color: active ? 'var(--white)' : 'var(--blue-200)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: active ? 600 : 500,
      transition: 'var(--transition)',
      position: 'relative'
    }
  }, active && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -10,
      top: 8,
      bottom: 8,
      width: 3,
      borderRadius: 999,
      background: 'var(--blue-400)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: active ? 'var(--blue-300)' : 'var(--ink-400)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, null)), label);
}
function Sidebar({
  screen,
  go
}) {
  const I = window.CBIcons;
  const nav = [{
    id: 'dashboard',
    label: 'Flight deck',
    icon: I.gauge
  }, {
    id: 'obligations',
    label: 'Obligations',
    icon: I.layers
  }, {
    id: 'departments',
    label: 'Departments',
    icon: I.building
  }];
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'var(--nav-width)',
      flex: 'none',
      background: 'var(--surface-nav)',
      borderRight: '1px solid var(--navy-600)',
      display: 'flex',
      flexDirection: 'column',
      padding: '18px 14px',
      boxShadow: 'var(--shadow-nav)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '4px 8px 22px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.svg",
    width: "34",
    height: "34",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 16,
      letterSpacing: '-0.01em',
      color: 'var(--white)',
      lineHeight: 1
    }
  }, "Compliant", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--blue-300)'
    }
  }, "Bharat")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: '0.18em',
      color: 'var(--ink-400)',
      marginTop: 4
    }
  }, "DEL \xB7 TERMINAL OPS"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, nav.map(n => /*#__PURE__*/React.createElement(NavItem, {
    key: n.id,
    icon: n.icon,
    label: n.label,
    active: screen === n.id,
    onClick: () => go(n.id)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cb-label",
    style: {
      color: 'var(--ink-400)',
      padding: '0 8px 10px'
    }
  }, "Regulators tracked"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      padding: '0 6px'
    }
  }, window.CBData.REGS.map(r => /*#__PURE__*/React.createElement(RegulatorTag, {
    key: r,
    regulator: r,
    variant: "soft",
    style: {
      height: 20
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      marginTop: 20,
      padding: '10px 8px',
      borderTop: '1px solid var(--navy-600)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: 'var(--navy-600)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--blue-200)'
    }
  }, /*#__PURE__*/React.createElement(I.user, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--cloud-50)',
      fontWeight: 600
    }
  }, "R. Iyer"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: 'var(--ink-400)'
    }
  }, "Compliance Officer")))));
}
window.CBSidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/Topbar.jsx
try { (() => {
/* Top instrument bar — breadcrumb title, search, scan status, alerts. */
const {
  Button,
  IconButton,
  StatusBadge
} = window.CompliantBharatAviationDesignSystem_77e7f4;
function Topbar({
  title,
  subtitle
}) {
  const I = window.CBIcons;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '0 28px',
      height: 'var(--nav-height)',
      borderBottom: '1px solid var(--border-hairline)',
      background: 'var(--surface-card)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 19,
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)',
      lineHeight: 1.1,
      whiteSpace: 'nowrap'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-muted)',
      marginTop: 3,
      whiteSpace: 'nowrap'
    }
  }, subtitle)), /*#__PURE__*/React.createElement("label", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      width: 300,
      flex: '0 0 auto',
      height: 40,
      padding: '0 14px',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-app)',
      border: '1px solid var(--border-hairline)',
      color: 'var(--ink-400)',
      cursor: 'text'
    }
  }, /*#__PURE__*/React.createElement(I.search, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 13,
      color: 'var(--ink-300)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "Search obligations, codes\u2026"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--ink-300)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 4,
      padding: '1px 5px'
    }
  }, "\u2318K")), /*#__PURE__*/React.createElement(StatusBadge, {
    status: "clear"
  }, "Live scan"), /*#__PURE__*/React.createElement(IconButton, {
    label: "Alerts",
    variant: "ghost"
  }, /*#__PURE__*/React.createElement(I.bell, null)), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(I.plus, {
      size: 15
    })
  }, "New obligation"));
}
window.CBTopbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/data.jsx
try { (() => {
/* Mock compliance data for the console UI kit. Not production data. */
const REGS = ['BCAS', 'DGCA', 'AAI', 'AERA', 'MoEF', 'EPFO', 'CERT-In'];
const OBLIGATIONS = [{
  code: 'BCAS-AEP-11',
  regulator: 'BCAS',
  status: 'stop',
  due: 'OVERDUE 3D',
  title: 'Airport Entry Permit register reconciliation',
  dept: 'Aerodrome Security',
  detail: 'Quarterly reconciliation of all active AEPs against current employment records. 4 holders pending de-provisioning after role changes. Reference: BCAS Circular 11/2022.'
}, {
  code: 'BCAS-XBIS-04',
  regulator: 'BCAS',
  status: 'caution',
  due: 'DUE 9D',
  title: 'X-BIS screener recurrent certification',
  dept: 'Terminal Security',
  detail: 'Recurrent certification for 38 hold-baggage screeners. 6 certifications lapse within the window.'
}, {
  code: 'DGCA-CAR-145',
  regulator: 'DGCA',
  status: 'caution',
  due: 'DUE 14D',
  title: 'CAR Section 2 Series F maintenance audit',
  dept: 'Engineering',
  detail: 'Annual airworthiness review of line-maintenance organisation against CAR 145 requirements.'
}, {
  code: 'DGCA-AEP-22',
  regulator: 'DGCA',
  status: 'clear',
  due: 'FILED',
  title: 'Aerodrome licence condition compliance',
  dept: 'Operations',
  detail: 'Bi-annual attestation of aerodrome licence conditions. Filed and acknowledged.'
}, {
  code: 'AAI-OMDA-07',
  regulator: 'AAI',
  status: 'clear',
  due: 'FILED',
  title: 'OMDA monthly performance submission',
  dept: 'Commercial',
  detail: 'Operations, Management & Development Agreement — monthly KPI submission to AAI.'
}, {
  code: 'AAI-RFF-13',
  regulator: 'AAI',
  status: 'caution',
  due: 'DUE 21D',
  title: 'Rescue & Fire Fighting category audit',
  dept: 'Fire Services',
  detail: 'CAT-9 RFF readiness audit; foam stock and response-time verification.'
}, {
  code: 'AERA-TARIFF-02',
  regulator: 'AERA',
  status: 'clear',
  due: 'FILED',
  title: 'Aeronautical tariff true-up submission',
  dept: 'Finance',
  detail: 'Annual true-up of aeronautical charges under the AERA control period.'
}, {
  code: 'MOEF-EC-09',
  regulator: 'MoEF',
  status: 'caution',
  due: 'DUE 30D',
  title: 'Environmental Clearance — half-yearly report',
  dept: 'Sustainability',
  detail: 'Half-yearly EC compliance report: ambient air, noise contours, water discharge.'
}, {
  code: 'MOEF-NOISE-03',
  regulator: 'MoEF',
  status: 'clear',
  due: 'FILED',
  title: 'Noise monitoring terminal readings',
  dept: 'Sustainability',
  detail: 'Continuous noise-monitoring terminal data lodged for the quarter.'
}, {
  code: 'EPFO-ECR-12',
  regulator: 'EPFO',
  status: 'clear',
  due: 'FILED',
  title: 'Electronic Challan-cum-Return filing',
  dept: 'Human Resources',
  detail: 'Monthly EPF ECR filed for 2,140 employees and contractor staff.'
}, {
  code: 'CERT-IN-06',
  regulator: 'CERT-In',
  status: 'stop',
  due: 'OVERDUE 1D',
  title: 'Six-hour incident reporting SOP attestation',
  dept: 'IT & Cyber',
  detail: 'Attestation that the 6-hour cyber-incident reporting SOP is operational and tested. Tabletop exercise overdue.'
}, {
  code: 'CERT-IN-14',
  regulator: 'CERT-In',
  status: 'caution',
  due: 'DUE 7D',
  title: 'Log retention 180-day verification',
  dept: 'IT & Cyber',
  detail: 'Verification that all critical-system logs are retained for 180 days within Indian jurisdiction.'
}];
const DEPARTMENTS = [{
  name: 'Aerodrome Security',
  regulator: 'BCAS',
  total: 34,
  clear: 28,
  caution: 4,
  stop: 2,
  readiness: 82
}, {
  name: 'Terminal Security',
  regulator: 'BCAS',
  total: 26,
  clear: 22,
  caution: 3,
  stop: 1,
  readiness: 85
}, {
  name: 'Engineering',
  regulator: 'DGCA',
  total: 41,
  clear: 36,
  caution: 5,
  stop: 0,
  readiness: 88
}, {
  name: 'Operations',
  regulator: 'DGCA',
  total: 38,
  clear: 35,
  caution: 3,
  stop: 0,
  readiness: 92
}, {
  name: 'Fire Services',
  regulator: 'AAI',
  total: 19,
  clear: 16,
  caution: 3,
  stop: 0,
  readiness: 84
}, {
  name: 'IT & Cyber',
  regulator: 'CERT-In',
  total: 23,
  clear: 18,
  caution: 3,
  stop: 2,
  readiness: 71
}, {
  name: 'Sustainability',
  regulator: 'MoEF',
  total: 17,
  clear: 14,
  caution: 3,
  stop: 0,
  readiness: 82
}, {
  name: 'Finance',
  regulator: 'AERA',
  total: 22,
  clear: 21,
  caution: 1,
  stop: 0,
  readiness: 95
}];
const AUDIT = [{
  time: '0941Z',
  text: 'AEP register synced — 2,140 holders',
  tone: 'clear'
}, {
  time: '1014Z',
  text: 'CERT-In advisory CIAD-2026-04 ingested',
  tone: 'caution'
}, {
  time: '1102Z',
  text: 'BCAS-AEP-11 breach: 4 holders un-reconciled',
  tone: 'stop'
}, {
  time: '1130Z',
  text: 'DGCA-AEP-22 attestation acknowledged',
  tone: 'clear'
}, {
  time: '1147Z',
  text: 'CERT-IN-06 SOP tabletop overdue',
  tone: 'stop'
}, {
  time: '1203Z',
  text: 'Auto-scan complete · 418 obligations',
  tone: 'dim'
}];
window.CBData = {
  REGS,
  OBLIGATIONS,
  DEPARTMENTS,
  AUDIT,
  summary: {
    total: 418,
    clear: 366,
    caution: 41,
    stop: 11,
    readiness: 87
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/icons.jsx
try { (() => {
/* Lucide-style stroke icons (1.75px, round joins) — inline subset shipped with
   the kit. Production may swap for the full Lucide CDN; geometry matches. */
const I = ({
  children,
  size = 18
}) => /*#__PURE__*/React.createElement("svg", {
  className: "cb-icon",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.75",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, children);
const CBIcons = {
  gauge: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 14l3-3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.5 16a9 9 0 1 1 17 0"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "14",
    r: "1"
  })),
  layers: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l9 5-9 5-9-5 9-5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 13l9 5 9-5"
  })),
  building: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "3",
    width: "14",
    height: "18",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"
  })),
  radar: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M19.07 4.93A10 10 0 1 0 21 12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 12l7-5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 12V2",
    opacity: "0"
  })),
  shield: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
  })),
  plane: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M10.5 13.5L3 12v-1l7.5-1.5L11 4a1 1 0 0 1 2 0l.5 5.5L21 11v1l-7.5 1.5L13 19l1.5 1v1l-2.5-.6L9.5 21v-1l1.5-1 -.5-5.5z"
  })),
  search: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4-4"
  })),
  bell: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.5 19a1.5 1.5 0 0 0 3 0"
  })),
  chevronDown: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  })),
  chevronRight: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6"
  })),
  plus: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  })),
  filter: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 5h18l-7 8v6l-4-2v-4L3 5z"
  })),
  check: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l5 5L20 6"
  })),
  alert: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l9 16H3l9-16z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 10v4M12 17.5v.5"
  })),
  x: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18"
  })),
  lock: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "11",
    width: "14",
    height: "9",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 11V8a4 4 0 0 1 8 0v3"
  })),
  user: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "3.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 20a7 7 0 0 1 14 0"
  })),
  settings: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"
  })),
  clock: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "8.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7.5V12l3 2"
  })),
  arrowRight: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })),
  leaf: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M4 20c0-8 6-14 16-14 0 10-6 16-14 16-1 0-2 0-2-2z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 15c3-3 5-5 7-6"
  })),
  cpu: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "6",
    width: "12",
    height: "12",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 9h6v6H9z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"
  })),
  scale: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 4v16M7 20h10M6 7l-3 6h6l-3-6zM18 7l-3 6h6l-3-6zM5 7h14"
  }))
};
window.CBIcons = CBIcons;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Landing.jsx
try { (() => {
/* Parent-brand landing page. Three hero directions to explore — toggle at top
   right. Sections below the hero are shared. */
const {
  Button,
  SectorTag,
  StatusBadge,
  Card
} = window.CompliantBharatAviationDesignSystem_77e7f4;
const Eyebrow = ({
  dark
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 14px',
    borderRadius: 'var(--radius-pill)',
    background: dark ? 'rgba(59,130,246,0.16)' : 'var(--blue-100)',
    marginBottom: 22
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: 'var(--green-300)',
    boxShadow: '0 0 6px var(--green-300)'
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: dark ? 'var(--blue-200)' : 'var(--navy-500)'
  }
}, "India's First Unified Compliance Platform"));
const HEADLINE = (color, accent) => /*#__PURE__*/React.createElement("h1", {
  style: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    fontSize: 56,
    lineHeight: 1.08,
    color,
    margin: '0 0 20px',
    letterSpacing: '-0.03em'
  }
}, "Compliance, unified into", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  style: {
    color: accent
  }
}, "one clear dashboard"));
const SUBCOPY = color => /*#__PURE__*/React.createElement("p", {
  style: {
    fontSize: 18,
    lineHeight: 1.55,
    color,
    maxWidth: 540,
    margin: '0 0 30px'
  }
}, "The first platform that unifies ", /*#__PURE__*/React.createElement("strong", null, "Regulatory + Standards + Gold"), " compliance for every Indian business. 50+ regulators. 11 sectors. One dashboard.");

/* ── A · Cockpit dark ───────────────────────────────────────────────────── */
function HeroDark() {
  const I = window.CBMIcons;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'radial-gradient(130% 120% at 80% -10%, #0D2B6E 0%, #071830 50%, #050F22 100%)'
    }
  }, /*#__PURE__*/React.createElement(window.CBSections.Nav, {
    dark: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '84px 40px 64px',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 56,
      alignItems: 'center'
    },
    className: "cb-fade"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    dark: true
  }), HEADLINE('var(--white)', 'var(--blue-300)'), SUBCOPY('var(--blue-200)'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(I.arrow, {
      size: 17
    })
  }, "Book a demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    size: "lg"
  }, "See sectors"))), /*#__PURE__*/React.createElement(CockpitPreview, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.12)'
    }
  }, /*#__PURE__*/React.createElement(window.CBSections.StatsBar, {
    dark: true
  })));
}

/* mini instrument-panel product preview */
function CockpitPreview() {
  const {
    SECTORS
  } = window.CompliantBharatAviationDesignSystem_77e7f4;
  const I = window.CBMIcons;
  const rows = [['aviation', 'BCAS-AEP-11', 'stop'], ['finance', 'RBI-KYC-07', 'caution'], ['healthcare', 'NABH-3.2', 'clear'], ['it', 'CERT-IN-06', 'caution']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--navy-700)',
      border: '1px solid var(--navy-600)',
      borderRadius: 'var(--radius-lg)',
      padding: 18,
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--green-300)',
      boxShadow: '0 0 6px var(--green-300)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.12em',
      color: 'var(--blue-200)'
    }
  }, "LIVE \xB7 ALL SECTORS"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--ink-300)'
    }
  }, "1,500+ obligations")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, rows.map(([sec, code, st]) => {
    const s = SECTORS[sec];
    const dot = {
      clear: 'var(--green-300)',
      caution: 'var(--amber-500)',
      stop: 'var(--red-500)'
    }[st];
    return /*#__PURE__*/React.createElement("div", {
      key: code,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 12px',
        borderLeft: `3px solid ${s.color}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: dot,
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--cloud-50)'
      }
    }, code), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 600,
        color: s.color,
        textTransform: 'capitalize'
      }
    }, sec));
  })));
}

/* ── B · Cloud light ────────────────────────────────────────────────────── */
function HeroLight() {
  const I = window.CBMIcons;
  const {
    SECTORS
  } = window.CompliantBharatAviationDesignSystem_77e7f4;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'linear-gradient(180deg, var(--cloud-150) 0%, var(--surface-card) 100%)'
    }
  }, /*#__PURE__*/React.createElement(window.CBSections.Nav, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 920,
      margin: '0 auto',
      padding: '84px 40px 56px',
      textAlign: 'center'
    },
    className: "cb-fade"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null)), React.cloneElement(HEADLINE('var(--text-strong)', 'var(--navy-500)'), {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 60,
      lineHeight: 1.08,
      color: 'var(--text-strong)',
      margin: '0 auto 20px',
      letterSpacing: '-0.03em',
      maxWidth: 760
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, SUBCOPY('var(--text-secondary)')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      justifyContent: 'center',
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(I.arrow, {
      size: 17
    })
  }, "Book a demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg"
  }, "See how it works")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, ['aviation', 'finance', 'healthcare', 'manufacturing', 'food', 'it', 'energy', 'education', 'universal'].map(k => /*#__PURE__*/React.createElement(SectorTag, {
    key: k,
    sector: k
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement(window.CBSections.StatsBar, null)));
}

/* ── C · Split aurora ───────────────────────────────────────────────────── */
function HeroSplit() {
  const I = window.CBMIcons;
  return /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement(window.CBSections.Nav, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: 540
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '84px 40px 84px 56px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: 620,
      marginLeft: 'auto'
    },
    className: "cb-fade"
  }, /*#__PURE__*/React.createElement(Eyebrow, null), HEADLINE('var(--text-strong)', 'var(--navy-500)'), SUBCOPY('var(--text-secondary)'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(I.arrow, {
      size: 17
    })
  }, "Book a demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg"
  }, "See sectors"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'radial-gradient(120% 120% at 70% 20%, #1249C0 0%, #0D2B6E 45%, #071830 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '56px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 440
    }
  }, /*#__PURE__*/React.createElement(CockpitPreview, null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-hairline)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(window.CBSections.StatsBar, null))));
}

/* ── Page + hero-direction switcher ─────────────────────────────────────── */
function CBLanding() {
  const OPTIONS = [['dark', 'Cockpit dark'], ['light', 'Cloud light'], ['split', 'Split aurora']];
  const [hero, setHero] = React.useState('dark');
  const Hero = {
    dark: HeroDark,
    light: HeroLight,
    split: HeroSplit
  }[hero];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 18,
      right: 18,
      zIndex: 50,
      display: 'flex',
      gap: 4,
      padding: 4,
      background: 'var(--navy-800)',
      borderRadius: 'var(--radius-pill)',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--navy-600)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px',
      fontFamily: 'var(--font-sans)',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ink-400)'
    }
  }, "Hero"), OPTIONS.map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setHero(id),
    style: {
      border: 'none',
      cursor: 'pointer',
      borderRadius: 'var(--radius-pill)',
      padding: '7px 13px',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      background: hero === id ? 'var(--navy-500)' : 'transparent',
      color: hero === id ? '#fff' : 'var(--blue-200)',
      transition: 'var(--transition)'
    }
  }, label))), /*#__PURE__*/React.createElement(Hero, {
    key: hero
  }), /*#__PURE__*/React.createElement(window.CBSections.SectorsGrid, null), /*#__PURE__*/React.createElement(window.CBSections.ComplianceTiers, null), /*#__PURE__*/React.createElement(window.CBSections.FooterCTA, null));
}
window.CBLanding = CBLanding;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/icons.jsx
try { (() => {
/* Lucide-style stroke icons (1.75px) for the marketing site — sector glyphs +
   UI affordances. Geometry matches Lucide; production may swap for the full set. */
const MI = ({
  children,
  size = 22
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.75",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  style: {
    display: 'inline-flex',
    flex: 'none'
  }
}, children);
const CBMIcons = {
  // sector glyphs
  aviation: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M10.5 13.5L3 12v-1l7.5-1.5L11 4a1 1 0 0 1 2 0l.5 5.5L21 11v1l-7.5 1.5L13 19l1.5 1v1l-2.5-.6L9.5 21v-1l1.5-1-.5-5.5z"
  })),
  finance: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 9l9-5 9 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 9v9M9 9v9M15 9v9M20 9v9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 21h18"
  })),
  healthcare: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 4v16M4 12h16",
    opacity: "0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"
  })),
  manufacturing: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 21V10l5 3V10l5 3V8l5 3v10z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 21h18"
  })),
  food: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 22V9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 9c0-3 2-5 2-5M12 9c0-3-2-5-2-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 11c-1-1-2-3-1-5 2 0 3 2 4 3M16 11c1-1 2-3 1-5-2 0-3 2-4 3"
  })),
  it: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "5",
    width: "14",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 9h6v6H9z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"
  })),
  energy: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M13 2L4 14h7l-1 8 9-12h-7z"
  })),
  education: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 9l9-4 9 4-9 4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 11v5c0 1 2 3 5 3s5-2 5-3v-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 9v5"
  })),
  universal: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"
  })),
  // ui
  shield: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 12l2 2 4-4"
  })),
  layers: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l9 5-9 5-9-5 9-5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 13l9 5 9-5"
  })),
  check: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l5 5L20 6"
  })),
  arrow: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })),
  award: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 14.5L8 22l4-2 4 2-1-7.5"
  })),
  scale: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 3v18M6 21h12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 7l-3 6h6l-3-6zM18 7l-3 6h6l-3-6zM5 7h14l-7-2z"
  })),
  bolt: p => /*#__PURE__*/React.createElement(MI, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 12l2 2 4-4"
  }))
};
window.CBMIcons = CBMIcons;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/sections.jsx
try { (() => {
/* Marketing landing sections — composes DS components. */
const {
  Button,
  SectorTag,
  SECTORS,
  StatusBadge,
  Card,
  RegulatorTag
} = window.CompliantBharatAviationDesignSystem_77e7f4;
const ICON = () => window.CBMIcons;
const SECTOR_ORDER = ['aviation', 'finance', 'healthcare', 'manufacturing', 'food', 'it', 'energy', 'education', 'universal'];

/* ── Top nav ─────────────────────────────────────────────────────────────── */
function Nav({
  dark
}) {
  const fg = dark ? 'var(--cloud-50)' : 'var(--text-body)';
  const border = dark ? 'rgba(255,255,255,0.10)' : 'var(--border-hairline)';
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '0 40px',
      height: 64,
      borderBottom: `1px solid ${border}`,
      background: dark ? 'rgba(7,24,48,0.72)' : 'rgba(255,255,255,0.82)',
      backdropFilter: 'blur(12px)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: dark ? '../../assets/logo-wordmark-light.svg' : '../../assets/logo-wordmark.svg',
    height: "30",
    alt: "CompliantBharat"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 26,
      fontSize: 14,
      fontWeight: 500,
      color: fg
    }
  }, /*#__PURE__*/React.createElement("a", null, "Platform"), /*#__PURE__*/React.createElement("a", null, "Sectors"), /*#__PURE__*/React.createElement("a", null, "Regulators"), /*#__PURE__*/React.createElement("a", null, "Pricing"), /*#__PURE__*/React.createElement(Button, {
    variant: dark ? 'dark' : 'secondary',
    size: "sm"
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Book a demo")));
}

/* ── Stats strip ─────────────────────────────────────────────────────────── */
function StatsBar({
  dark
}) {
  const stats = [['50+', 'Regulators'], ['11', 'Sectors'], ['1,500+', 'Obligations'], ['1', 'Dashboard']];
  const fg = dark ? 'var(--white)' : 'var(--text-strong)';
  const sub = dark ? 'var(--blue-200)' : 'var(--text-muted)';
  const border = dark ? 'rgba(255,255,255,0.12)' : 'var(--border-hairline)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)'
    }
  }, stats.map(([n, l], i) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      padding: '26px 28px',
      borderLeft: i ? `1px solid ${border}` : 'none',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 38,
      color: fg,
      lineHeight: 1
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    className: "cb-label",
    style: {
      color: sub,
      marginTop: 8
    }
  }, l))));
}

/* ── Sectors grid ────────────────────────────────────────────────────────── */
function SectorsGrid() {
  const I = window.CBMIcons;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '88px 40px',
      background: 'var(--surface-app)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cb-label",
    style: {
      color: 'var(--navy-500)'
    }
  }, "Eleven sectors \xB7 one platform"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h1)',
      color: 'var(--text-strong)',
      margin: '10px 0 0'
    }
  }, "Built for every Indian business")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16
    }
  }, SECTOR_ORDER.map(key => {
    const s = SECTORS[key];
    const Glyph = I[key] || I.universal;
    return /*#__PURE__*/React.createElement(Card, {
      key: key,
      interactive: true,
      padding: "20px 22px"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 'var(--radius-sm)',
        background: s.soft,
        color: s.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Glyph, {
      size: 22
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 17,
        color: 'var(--text-strong)'
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        fontWeight: 600,
        color: s.color
      }
    }, s.regulators.length)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 5
      }
    }, s.regulators.slice(0, 5).map(r => /*#__PURE__*/React.createElement("span", {
      key: r,
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 500,
        color: 'var(--ink-500)',
        background: 'var(--surface-sunken)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-pill)',
        padding: '2px 9px'
      }
    }, r)), s.regulators.length > 5 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--ink-400)',
        padding: '2px 4px'
      }
    }, "+", s.regulators.length - 5)));
  }))));
}

/* ── Three compliance tiers (Regulatory + Standards + Gold) ──────────────── */
function ComplianceTiers() {
  const I = window.CBMIcons;
  const tiers = [{
    icon: I.scale,
    name: 'Regulatory',
    tone: 'var(--navy-500)',
    soft: 'var(--blue-100)',
    desc: 'Every statutory obligation from 50+ Indian regulators — licences, filings, audits, returns — mapped to the departments that own them.'
  }, {
    icon: I.layers,
    name: 'Standards',
    tone: 'var(--sector-it)',
    soft: 'var(--sector-it-soft)',
    desc: 'ISO, BIS, NABH, NABL and sector codes tracked alongside the law, so certification readiness never drifts from compliance.'
  }, {
    icon: I.award,
    name: 'Gold',
    tone: 'var(--sector-energy)',
    soft: 'var(--sector-energy-soft)',
    desc: 'Voluntary best-practice frameworks that signal trust — the gold standard above the minimum bar, benchmarked continuously.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '88px 40px',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "cb-label",
    style: {
      color: 'var(--navy-500)'
    }
  }, "Three layers of assurance"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h1)',
      color: 'var(--text-strong)',
      margin: '10px 0 0'
    }
  }, "Regulatory + Standards + Gold")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20
    }
  }, tiers.map(t => {
    const Glyph = t.icon;
    return /*#__PURE__*/React.createElement(Card, {
      key: t.name,
      padding: "26px"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 46,
        height: 46,
        borderRadius: 'var(--radius-md)',
        background: t.soft,
        color: t.tone,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Glyph, {
      size: 24
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        font: 'var(--type-h3)',
        color: 'var(--text-strong)',
        margin: '0 0 8px'
      }
    }, t.name), /*#__PURE__*/React.createElement("p", {
      style: {
        font: 'var(--type-small)',
        color: 'var(--text-secondary)',
        margin: 0,
        lineHeight: 'var(--leading-relaxed)'
      }
    }, t.desc));
  }))));
}

/* ── Footer CTA ──────────────────────────────────────────────────────────── */
function FooterCTA() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--navy-800)',
      padding: '72px 40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-h1)',
      color: 'var(--white)',
      margin: '0 0 12px'
    }
  }, "One dashboard for every obligation"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: 'var(--blue-200)',
      margin: '0 auto 28px',
      maxWidth: 540
    }
  }, "See your whole compliance posture \u2014 regulatory, standards and gold \u2014 across every department, in real time."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg"
  }, "Book a demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    size: "lg"
  }, "Explore the platform")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--ink-400)',
      letterSpacing: '0.08em'
    }
  }, "\xA9 2026 CompliantBharat \xB7 Compliance Intelligence \xB7 Made in India"));
}
window.CBSections = {
  Nav,
  StatsBar,
  SectorsGrid,
  ComplianceTiers,
  FooterCTA
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.REGULATORS = __ds_scope.REGULATORS;

__ds_ns.RegulatorTag = __ds_scope.RegulatorTag;

__ds_ns.SECTORS = __ds_scope.SECTORS;

__ds_ns.SectorTag = __ds_scope.SectorTag;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CommBox = __ds_scope.CommBox;

__ds_ns.FlightStrip = __ds_scope.FlightStrip;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
