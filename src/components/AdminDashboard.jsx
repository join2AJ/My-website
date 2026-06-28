import { useState } from 'react'
import { DEPT_METRICS, FUNCTION_METRICS, USERS, AUDIT_TRAIL, MONTHLY_TREND, SUMMARY, CRITERIA } from '../data/adminData.js'
import { LIGHT, DARK } from '../themes.js'

const NAVS = [
  { id:'overview', icon:'📊', label:'Overview'     },
  { id:'depts',    icon:'🏢', label:'Departments'  },
  { id:'audit',    icon:'📝', label:'Audit Trail'  },
  { id:'users',    icon:'👤', label:'Users'        },
  { id:'settings', icon:'⚙️', label:'Settings'     },
]

function scoreColor(score) {
  if (score >= 80) return '#10B981'
  if (score >= 65) return '#F59E0B'
  return '#EF4444'
}

/* ── Mini Progress Ring ── */
function Ring({ score, size = 72, stroke = 7 }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const c = scoreColor(score)
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={c} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
    </svg>
  )
}

/* ── Donut Chart (C/NC/OFI) ── */
function DonutChart({ compliant, nc, ofi, total, T }) {
  const segs = [
    { val: compliant, color: '#10B981' },
    { val: nc,        color: '#EF4444' },
    { val: ofi,       color: '#F59E0B' },
  ]
  const r = 44, cx = 56, cy = 56, sw = 18
  let angle = -Math.PI / 2
  const paths = segs.map((s, i) => {
    if (s.val === 0) return null
    const a = (s.val / total) * 2 * Math.PI
    const x1 = cx + r * Math.cos(angle)
    const y1 = cy + r * Math.sin(angle)
    angle += a
    const x2 = cx + r * Math.cos(angle)
    const y2 = cy + r * Math.sin(angle)
    return <path key={i} d={`M ${x1} ${y1} A ${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${x2} ${y2}`}
      fill="none" stroke={s.color} strokeWidth={sw} />
  })
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', width: 112, height: 112, flexShrink: 0 }}>
        <svg width={112} height={112}>{paths}</svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: T.text, lineHeight: 1 }}>{Math.round((compliant/total)*100)}%</div>
          <div style={{ fontSize: 9, color: T.muted, marginTop: 2 }}>Compliant</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[['Compliant','#10B981',compliant],['Non-Conformity','#EF4444',nc],['OFI','#F59E0B',ofi]].map(([l,c,v]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: c, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: T.sub }}>{l}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.text, marginLeft: 'auto', paddingLeft: 16 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Trend Line (CSS) ── */
function TrendLine({ data, T }) {
  const max = Math.max(...data.map(d => d.score))
  const min = Math.min(...data.map(d => d.score)) - 5
  return (
    <div style={{ display: 'flex', gap: 0, alignItems: 'flex-end', height: 80, paddingBottom: 24, position: 'relative' }}>
      {data.map((d, i) => {
        const pct = ((d.score - min) / (max - min)) * 70
        return (
          <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', position: 'relative' }}>
            {i > 0 && (
              <div style={{
                position: 'absolute', bottom: `${pct + 5}px`, right: '50%', width: '100%',
                height: 2, background: '#3B82F6', transformOrigin: 'right center',
                transform: `rotate(${Math.atan2(
                  ((data[i].score - data[i-1].score) / (max - min)) * 70,
                  -100
                ) * (180/Math.PI)}deg)`,
              }} />
            )}
            <div style={{
              width: 8, height: 8, borderRadius: '50%', background: '#3B82F6',
              border: '2px solid white', zIndex: 1, flexShrink: 0,
              marginBottom: `${pct}px`,
            }} />
            <div style={{ fontSize: 10, color: T.muted, position: 'absolute', bottom: 4 }}>{d.month}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: T.blue || '#3B82F6', position: 'absolute', bottom: pct + 12 }}>{d.score}%</div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Dept Compliance Bar ── */
function DeptBar({ d, T, onClick, selected }) {
  const c = scoreColor(d.score)
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
      background: selected ? (d.color + '10') : T.surface,
      borderRadius: 10, cursor: 'pointer', marginBottom: 6,
      border: `1px solid ${selected ? d.color : T.border}`,
      transition: 'all 0.15s',
    }}>
      <div style={{ fontSize: 20, flexShrink: 0 }}>{d.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: c, flexShrink: 0, marginLeft: 8 }}>{d.score}%</span>
        </div>
        <div style={{ height: 6, background: T.card, borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: 4, background: c, width: `${d.score}%`, transition: 'width 0.5s' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 10, color: '#10B981' }}>✓ {d.compliant}</span>
          <span style={{ fontSize: 10, color: '#EF4444' }}>✗ {d.nc} NC</span>
          <span style={{ fontSize: 10, color: '#F59E0B' }}>△ {d.ofi} OFI</span>
        </div>
      </div>
    </div>
  )
}

/* ── KPI Card ── */
function KPICard({ icon, label, value, sub, color, bg, T }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: T.muted, marginBottom: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: color || T.text, lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  )
}

/* ── Status Pill ── */
function Pill({ type }) {
  const map = {
    compliant: { bg: '#D1FAE5', color: '#059669', label: 'Compliant' },
    nc:        { bg: '#FEE2E2', color: '#DC2626', label: 'NC'        },
    ofi:       { bg: '#FEF3C7', color: '#D97706', label: 'OFI'       },
    info:      { bg: '#EFF6FF', color: '#3B82F6', label: 'Info'      },
  }
  const s = map[type] || map.info
  return (
    <span style={{ padding: '2px 9px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>{s.label}</span>
  )
}

/* ── Modal ── */
function Modal({ title, children, onClose, T }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div style={{ background: T.surface, borderRadius: 20, padding: 28, maxWidth: 440, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', border: `1px solid ${T.border}` }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{title}</div>
          <button onClick={onClose} style={{ background: T.card, border: 'none', borderRadius: 8, padding: '4px 10px', cursor: 'pointer', fontSize: 14, color: T.muted }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', options, T }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: T.sub, marginBottom: 6 }}>{label}</label>
      {options
        ? <select value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.text, background: T.bg || T.card, outline: 'none' }}>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        : <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.text, background: T.bg || T.card, outline: 'none', boxSizing: 'border-box' }} />
      }
    </div>
  )
}

export default function AdminDashboard({ dark = false }) {
  const T = dark ? DARK : LIGHT
  const [nav, setNav] = useState('overview')
  const [selectedDept, setSelectedDept] = useState(null)
  const [userModal, setUserModal] = useState(null)
  const [users, setUsers] = useState(USERS)
  const [criteria, setCriteria] = useState(CRITERIA)
  const [newUser, setNewUser] = useState({ name:'', email:'', dept:'Security Operations', role:'Dept Head' })
  const [criteriaModal, setCriteriaModal] = useState(null)
  const [newCrit, setNewCrit] = useState({ ref:'', name:'', dept:'All Depts', regulator:'', mandatory:false })
  const [auditSearch, setAuditSearch] = useState('')
  const [auditFilter, setAuditFilter] = useState('all')
  const [settingsTab, setSettingsTab] = useState('criteria')

  const filteredAudit = AUDIT_TRAIL.filter(a => {
    const matchType = auditFilter === 'all' || a.type === auditFilter
    const matchSearch = !auditSearch || a.item.toLowerCase().includes(auditSearch.toLowerCase()) || a.user.toLowerCase().includes(auditSearch.toLowerCase())
    return matchType && matchSearch
  })

  const deptFunctions = selectedDept ? FUNCTION_METRICS.filter(f => f.deptId === selectedDept) : []

  function saveUser() {
    if (!newUser.name || !newUser.email) return
    if (userModal === 'add') {
      setUsers(u => [...u, { id: `u${Date.now()}`, ...newUser, lastActive: '2025-06-28', status: 'active', assigned: 0, completed: 0 }])
    } else {
      setUsers(u => u.map(x => x.id === userModal.id ? { ...x, ...newUser } : x))
    }
    setUserModal(null)
    setNewUser({ name:'', email:'', dept:'Security Operations', role:'Dept Head' })
  }

  function deleteUser(id) {
    if (window.confirm('Delete this user?')) setUsers(u => u.filter(x => x.id !== id))
  }

  function saveCriteria() {
    if (!newCrit.name) return
    if (criteriaModal === 'add') {
      setCriteria(c => [...c, { id: `c${Date.now()}`, ...newCrit }])
    } else {
      setCriteria(c => c.map(x => x.id === criteriaModal.id ? { ...x, ...newCrit } : x))
    }
    setCriteriaModal(null)
    setNewCrit({ ref:'', name:'', dept:'All Depts', regulator:'', mandatory:false })
  }

  const navBtn = (id) => ({
    padding: '7px 16px', borderRadius: 8, fontSize: 12, fontWeight: 600,
    border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
    background: nav === id ? '#3B82F6' : 'transparent',
    color: nav === id ? '#fff' : T.sub,
    boxShadow: nav === id ? '0 2px 8px #3B82F644' : 'none',
  })

  const btnPrimary = { padding: '9px 18px', borderRadius: 8, background: '#3B82F6', color: '#fff', border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer' }
  const btnGhost  = { padding: '7px 14px', borderRadius: 8, background: T.card, color: T.sub, border: `1px solid ${T.border}`, fontSize: 12, fontWeight: 600, cursor: 'pointer' }

  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text, fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .fade { animation: fd 0.18s ease-out; }
        @keyframes fd { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📋</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: T.text, lineHeight: 1 }}>Compliance Admin</div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>Airport · Internal Dashboard</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <div style={{ padding: '5px 12px', borderRadius: 8, background: '#D1FAE5', color: '#059669', fontSize: 11, fontWeight: 700 }}>● LIVE</div>
          <div style={{ padding: '5px 12px', borderRadius: 8, background: T.card, color: T.muted, fontSize: 11, fontWeight: 600, border: `1px solid ${T.border}` }}>Admin User</div>
        </div>
      </div>

      {/* ── TAB NAV ── */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: '6px 24px', display: 'flex', gap: 4, overflowX: 'auto' }}>
        {NAVS.map(n => (
          <button key={n.id} style={navBtn(n.id)} onClick={() => setNav(n.id)}>{n.icon} {n.label}</button>
        ))}
      </div>

      <div className="fade avia-page" key={nav}>

        {/* ─── OVERVIEW ─── */}
        {nav === 'overview' && (
          <div>
            {/* Score hero */}
            <div style={{
              background: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
              borderRadius: 16, padding: '24px 28px', marginBottom: 16, color: '#fff',
              display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap',
            }}>
              <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
                <Ring score={SUMMARY.score} size={72} stroke={7} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 900, lineHeight: 1 }}>{SUMMARY.score}</div>
                  <div style={{ fontSize: 8, opacity: 0.7 }}>Score</div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.2, marginBottom: 6 }}>Overall Compliance Score</div>
                <div style={{ fontSize: 13, opacity: 0.75 }}>
                  {SUMMARY.compliant} of {SUMMARY.total} criteria compliant across {SUMMARY.departments} departments
                </div>
                <div style={{ display: 'flex', gap: 20, marginTop: 12, flexWrap: 'wrap' }}>
                  {[['▲ +1% vs last month','rgba(255,255,255,0.6)'],['8 Departments','rgba(255,255,255,0.6)'],['10 Users','rgba(255,255,255,0.6)']].map(([t,c]) => (
                    <span key={t} style={{ fontSize: 12, color: c, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
              <KPICard icon="✅" label="Compliant" value={SUMMARY.compliant} sub={`of ${SUMMARY.total} criteria`} color="#10B981" bg="#D1FAE5" T={T} />
              <KPICard icon="❌" label="Non-Conformities" value={SUMMARY.nc} sub="require corrective action" color="#EF4444" bg="#FEE2E2" T={T} />
              <KPICard icon="💡" label="Opportunities (OFI)" value={SUMMARY.ofi} sub="for improvement" color="#F59E0B" bg="#FEF3C7" T={T} />
              <KPICard icon="🏢" label="Departments" value={SUMMARY.departments} sub={`${SUMMARY.users} active users`} T={T} />
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>
              {/* Donut */}
              <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 16 }}>Overall Breakdown</div>
                <DonutChart compliant={SUMMARY.compliant} nc={SUMMARY.nc} ofi={SUMMARY.ofi} total={SUMMARY.total} T={T} />
              </div>

              {/* Monthly Trend */}
              <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 4 }}>6-Month Trend</div>
                <div style={{ fontSize: 11, color: T.muted, marginBottom: 12 }}>Compliance score Jan–Jun 2025</div>
                <div style={{ display: 'flex', gap: 0, alignItems: 'flex-end', height: 90 }}>
                  {MONTHLY_TREND.map((d, i) => {
                    const h = ((d.score - 55) / 20) * 70
                    return (
                      <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: 9, color: T.muted, marginBottom: 4 }}>{d.score}%</div>
                        <div style={{ width: '70%', background: i === MONTHLY_TREND.length - 1 ? '#3B82F6' : '#BFDBFE', borderRadius: '4px 4px 0 0', height: `${h}px`, minHeight: 4 }} />
                        <div style={{ fontSize: 10, color: T.muted, marginTop: 4 }}>{d.month}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Dept Quick Summary */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>Department Compliance Scores</div>
                <button onClick={() => setNav('depts')} style={{ ...btnGhost, fontSize: 11 }}>View All →</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
                {DEPT_METRICS.map(d => {
                  const c = scoreColor(d.score)
                  return (
                    <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: T.card, borderRadius: 10, border: `1px solid ${T.border}` }}>
                      <div style={{ fontSize: 18 }}>{d.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                        <div style={{ height: 4, background: T.border, borderRadius: 2, overflow: 'hidden', marginTop: 4 }}>
                          <div style={{ height: '100%', borderRadius: 2, background: c, width: `${d.score}%` }} />
                        </div>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: c, flexShrink: 0 }}>{d.score}%</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── DEPARTMENTS ─── */}
        {nav === 'depts' && (
          <div>
            <div style={{ fontSize: 13, color: T.sub, marginBottom: 16 }}>
              Click any department to drill down by function.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {/* Dept list */}
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Departments</div>
                {DEPT_METRICS.map(d => (
                  <DeptBar key={d.id} d={d} T={T} selected={selectedDept === d.id} onClick={() => setSelectedDept(selectedDept === d.id ? null : d.id)} />
                ))}
              </div>

              {/* Function drill-down */}
              <div>
                {selectedDept ? (() => {
                  const dept = DEPT_METRICS.find(d => d.id === selectedDept)
                  const funcs = FUNCTION_METRICS.filter(f => f.deptId === selectedDept)
                  return (
                    <div className="fade">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ fontSize: 22 }}>{dept.icon}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: T.text }}>{dept.name}</div>
                          <div style={{ fontSize: 11, color: T.muted }}>{dept.head} · {dept.staff} staff</div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontSize: 22, fontWeight: 900, color: scoreColor(dept.score) }}>{dept.score}%</div>
                      </div>

                      {/* Dept donut */}
                      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 16, marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                        <DonutChart compliant={dept.compliant} nc={dept.nc} ofi={dept.ofi} total={dept.total} T={T} />
                      </div>

                      {/* Functions table */}
                      <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Functions</div>
                      {funcs.length === 0
                        ? <div style={{ fontSize: 12, color: T.muted, padding: '12px 0' }}>No function breakdown available</div>
                        : funcs.map(f => {
                          const score = Math.round((f.compliant / f.total) * 100)
                          const c = scoreColor(score)
                          return (
                            <div key={f.id} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: '10px 14px', marginBottom: 6, boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{f.name}</div>
                                <div style={{ fontSize: 13, fontWeight: 800, color: c }}>{score}%</div>
                              </div>
                              <div style={{ height: 5, background: T.card, borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
                                <div style={{ height: '100%', borderRadius: 3, background: c, width: `${score}%` }} />
                              </div>
                              <div style={{ display: 'flex', gap: 10 }}>
                                <span style={{ fontSize: 10, color: '#10B981' }}>✓ {f.compliant} C</span>
                                <span style={{ fontSize: 10, color: '#EF4444' }}>✗ {f.nc} NC</span>
                                <span style={{ fontSize: 10, color: '#F59E0B' }}>△ {f.ofi} OFI</span>
                                <span style={{ fontSize: 10, color: T.muted, marginLeft: 'auto' }}>{f.total} total</span>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })() : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, color: T.muted, textAlign: 'center' }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>👈</div>
                    <div style={{ fontSize: 13 }}>Select a department to see function-level breakdown</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── AUDIT TRAIL ─── */}
        {nav === 'audit' && (
          <div>
            {/* Filters */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                placeholder="Search items or users…"
                value={auditSearch}
                onChange={e => setAuditSearch(e.target.value)}
                style={{ flex: 1, minWidth: 200, padding: '9px 14px', border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, color: T.text, background: T.surface, outline: 'none' }}
              />
              <div style={{ display: 'flex', gap: 6 }}>
                {[['all','All'],['compliant','Compliant'],['nc','NC'],['ofi','OFI'],['info','Info']].map(([v,l]) => (
                  <button key={v} onClick={() => setAuditFilter(v)} style={{
                    padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    background: auditFilter === v ? '#3B82F6' : T.card,
                    color: auditFilter === v ? '#fff' : T.sub,
                    border: `1px solid ${auditFilter === v ? '#3B82F6' : T.border}`,
                  }}>{l}</button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>{filteredAudit.length} entries</div>

            {/* Timeline */}
            {filteredAudit.map((a, i) => (
              <div key={a.id} style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
                {/* Timeline line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%', flexShrink: 0, marginTop: 4,
                    background: a.type === 'compliant' ? '#10B981' : a.type === 'nc' ? '#EF4444' : a.type === 'ofi' ? '#F59E0B' : '#3B82F6',
                  }} />
                  {i < filteredAudit.length - 1 && <div style={{ width: 1, flex: 1, background: T.border, marginTop: 4, minHeight: 24 }} />}
                </div>

                {/* Entry card */}
                <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: '12px 16px', flex: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.03)', marginBottom: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 2 }}>{a.item}</div>
                      <div style={{ fontSize: 11, color: T.sub }}>{a.action} by <strong style={{ color: T.blue || '#3B82F6' }}>{a.user}</strong> · {a.dept}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                      <Pill type={a.type} />
                      <div style={{ fontSize: 10, color: T.muted }}>{a.ts}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: T.muted, padding: '6px 10px', background: T.card, borderRadius: 8, lineHeight: 1.5 }}>{a.note}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── USERS ─── */}
        {nav === 'users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 10, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.text }}>User Management</div>
                <div style={{ fontSize: 12, color: T.muted }}>{users.length} users · compliance tracking per user</div>
              </div>
              <button onClick={() => { setNewUser({ name:'', email:'', dept:'Security Operations', role:'Dept Head' }); setUserModal('add') }} style={btnPrimary}>
                + Add User
              </button>
            </div>

            {/* Users table */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              {/* Table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr 1fr auto', gap: 0, padding: '10px 16px', background: T.card, borderBottom: `1px solid ${T.border}` }}>
                {['Name','Department','Role','Status','Compliance','Last Active',''].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</div>
                ))}
              </div>

              {users.map((u, i) => {
                const pct = u.assigned > 0 ? Math.round((u.completed / u.assigned) * 100) : 0
                return (
                  <div key={u.id} style={{
                    display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr 1fr auto',
                    gap: 0, padding: '12px 16px', alignItems: 'center',
                    background: i % 2 === 0 ? T.surface : T.card,
                    borderBottom: i < users.length - 1 ? `1px solid ${T.border}` : 'none',
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{u.name}</div>
                      <div style={{ fontSize: 11, color: T.muted }}>{u.email}</div>
                    </div>
                    <div style={{ fontSize: 12, color: T.sub, paddingRight: 8 }}>{u.dept}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{u.role}</div>
                    <div>
                      <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700, background: u.status === 'active' ? '#D1FAE5' : '#F1F5F9', color: u.status === 'active' ? '#059669' : '#94A3B8' }}>
                        {u.status}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: scoreColor(pct) }}>{pct}%</div>
                      <div style={{ fontSize: 10, color: T.muted }}>{u.completed}/{u.assigned}</div>
                    </div>
                    <div style={{ fontSize: 11, color: T.muted }}>{u.lastActive}</div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => { setNewUser({ name:u.name, email:u.email, dept:u.dept, role:u.role }); setUserModal(u) }} style={{ ...btnGhost, padding: '4px 10px', fontSize: 11 }}>Edit</button>
                      <button onClick={() => deleteUser(u.id)} style={{ padding: '4px 10px', borderRadius: 8, background: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Del</button>
                    </div>
                  </div>
                )
              })}
            </div>

            {userModal && (
              <Modal title={userModal === 'add' ? 'Add New User' : 'Edit User'} onClose={() => setUserModal(null)} T={T}>
                <Field label="Full Name" value={newUser.name} onChange={v => setNewUser(p => ({...p, name:v}))} T={T} />
                <Field label="Email" type="email" value={newUser.email} onChange={v => setNewUser(p => ({...p, email:v}))} T={T} />
                <Field label="Department" value={newUser.dept} onChange={v => setNewUser(p => ({...p, dept:v}))} options={DEPT_METRICS.map(d => d.name).concat(['All Departments'])} T={T} />
                <Field label="Role" value={newUser.role} onChange={v => setNewUser(p => ({...p, role:v}))} options={['Dept Head','Compliance Admin','Internal Auditor','Staff Member','Viewer']} T={T} />
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
                  <button onClick={() => setUserModal(null)} style={btnGhost}>Cancel</button>
                  <button onClick={saveUser} style={btnPrimary}>Save User</button>
                </div>
              </Modal>
            )}
          </div>
        )}

        {/* ─── SETTINGS ─── */}
        {nav === 'settings' && (
          <div>
            {/* Settings sub-tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
              {[['criteria','Criteria'],['depts','Departments'],['functions','Functions']].map(([id,l]) => (
                <button key={id} onClick={() => setSettingsTab(id)} style={{
                  padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                  background: settingsTab === id ? T.text : T.card,
                  color: settingsTab === id ? T.surface : T.sub,
                }}>{l}</button>
              ))}
            </div>

            {settingsTab === 'criteria' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ fontSize: 13, color: T.muted }}>{criteria.length} compliance criteria</div>
                  <button onClick={() => { setNewCrit({ ref:'', name:'', dept:'All Depts', regulator:'', mandatory:false }); setCriteriaModal('add') }} style={btnPrimary}>+ Add Criteria</button>
                </div>
                <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  {criteria.map((c, i) => (
                    <div key={c.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 16px', background: i % 2 === 0 ? T.surface : T.card, borderBottom: i < criteria.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 3, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: '#3B82F6', background: '#EFF6FF', padding: '2px 7px', borderRadius: 6 }}>{c.ref}</span>
                          {c.mandatory && <span style={{ fontSize: 10, fontWeight: 700, color: '#DC2626', background: '#FEE2E2', padding: '2px 7px', borderRadius: 6 }}>Mandatory</span>}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{c.dept} · {c.regulator}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                        <button onClick={() => { setNewCrit({ ref:c.ref, name:c.name, dept:c.dept, regulator:c.regulator, mandatory:c.mandatory }); setCriteriaModal(c) }} style={{ ...btnGhost, padding: '4px 10px', fontSize: 11 }}>Edit</button>
                        <button onClick={() => setCriteria(cr => cr.filter(x => x.id !== c.id))} style={{ padding: '4px 10px', borderRadius: 8, background: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Del</button>
                      </div>
                    </div>
                  ))}
                </div>

                {criteriaModal && (
                  <Modal title={criteriaModal === 'add' ? 'Add Criteria' : 'Edit Criteria'} onClose={() => setCriteriaModal(null)} T={T}>
                    <Field label="Reference No." value={newCrit.ref} onChange={v => setNewCrit(p => ({...p, ref:v}))} T={T} />
                    <Field label="Criteria Name" value={newCrit.name} onChange={v => setNewCrit(p => ({...p, name:v}))} T={T} />
                    <Field label="Department" value={newCrit.dept} onChange={v => setNewCrit(p => ({...p, dept:v}))} options={['All Depts', ...DEPT_METRICS.map(d => d.name)]} T={T} />
                    <Field label="Regulator / Standard" value={newCrit.regulator} onChange={v => setNewCrit(p => ({...p, regulator:v}))} T={T} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                      <input type="checkbox" id="mandatory" checked={newCrit.mandatory} onChange={e => setNewCrit(p => ({...p, mandatory:e.target.checked}))} />
                      <label htmlFor="mandatory" style={{ fontSize: 13, color: T.sub, cursor: 'pointer' }}>Mandatory compliance</label>
                    </div>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 20 }}>
                      <button onClick={() => setCriteriaModal(null)} style={btnGhost}>Cancel</button>
                      <button onClick={saveCriteria} style={btnPrimary}>Save</button>
                    </div>
                  </Modal>
                )}
              </div>
            )}

            {settingsTab === 'depts' && (
              <div>
                <div style={{ fontSize: 13, color: T.muted, marginBottom: 14 }}>{DEPT_METRICS.length} departments</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
                  {DEPT_METRICS.map(d => (
                    <div key={d.id} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: '14px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                        <div style={{ fontSize: 20 }}>{d.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{d.name}</div>
                          <div style={{ fontSize: 11, color: T.muted }}>{d.head}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, fontSize: 11, color: T.muted }}>
                        <span>{d.staff} staff</span>
                        <span>·</span>
                        <span>{d.total} criteria</span>
                        <span>·</span>
                        <span style={{ color: scoreColor(d.score), fontWeight: 700 }}>{d.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {settingsTab === 'functions' && (
              <div>
                <div style={{ fontSize: 13, color: T.muted, marginBottom: 14 }}>{FUNCTION_METRICS.length} functions across all departments</div>
                {DEPT_METRICS.map(dept => {
                  const fns = FUNCTION_METRICS.filter(f => f.deptId === dept.id)
                  if (!fns.length) return null
                  return (
                    <div key={dept.id} style={{ marginBottom: 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{ fontSize: 16 }}>{dept.icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{dept.name}</div>
                      </div>
                      {fns.map((f, i) => (
                        <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, marginBottom: 4, boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                          <div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: T.text }}>{f.name}</div>
                          <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
                            <span style={{ color: '#10B981' }}>✓ {f.compliant}</span>
                            <span style={{ color: '#EF4444' }}>✗ {f.nc}</span>
                            <span style={{ color: '#F59E0B' }}>△ {f.ofi}</span>
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: scoreColor(Math.round(f.compliant/f.total*100)) }}>{Math.round(f.compliant/f.total*100)}%</div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
