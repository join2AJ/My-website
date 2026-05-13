import { useState } from 'react'
import { regulatoryItems, standards, counts, regulatoryScore, standardsScore, departments } from '../data/aviationData.js'

const T = {
  bg:'#F0F4FF', surface:'#FFFFFF', card:'#F8FAFF',
  border:'#D6E0FF', text:'#0F1733', sub:'#3D5080', muted:'#7A90BF',
  blue:'#1A56DB', blueL:'#EBF2FF', blueM:'#93B4F8', navy:'#0D2B6E',
  accent:'#FF6B35', green:'#0E9F6E', greenL:'#ECFDF5',
  purple:'#7C3AED', purpleL:'#F5F3FF',
  gold:'#D97706', goldL:'#FFFBEB',
  red:'#DC2626', redL:'#FEF2F2',
  amber:'#B45309', amberL:'#FFFBEB',
  teal:'#0891B2', tealL:'#ECFEFF',
}

const STATUS = {
  compliant: { label:'Compliant', color:T.green,  bg:T.greenL  },
  due:        { label:'Due Soon',  color:T.gold,   bg:T.goldL   },
  overdue:    { label:'Overdue',   color:T.red,    bg:T.redL    },
  gap:        { label:'Gap',       color:T.accent, bg:'#FFF3EE' },
}

const PRIORITY = {
  critical: { label:'Critical', color:T.red   },
  high:     { label:'High',     color:T.gold  },
  medium:   { label:'Medium',   color:T.blue  },
}

const TOP_NAVS = [
  { id:'overview',    icon:'📊', label:'Overview'    },
  { id:'compliance',  icon:'⚖️', label:'Compliance'  },
  { id:'departments', icon:'👥', label:'Departments' },
  { id:'standards',   icon:'🏅', label:'Standards'   },
]

const Card = ({ children, style = {} }) => (
  <div style={{
    background: T.surface, borderRadius: 16, padding: 16,
    border: `1px solid ${T.border}`, ...style,
  }}>{children}</div>
)

const Pill = ({ label, color, bg }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center',
    padding: '3px 9px', borderRadius: 20,
    fontSize: 10, fontWeight: 700,
    background: bg || color + '18', color,
    border: `1px solid ${color}33`,
    whiteSpace: 'nowrap',
  }}>{label}</span>
)

const Sub = ({ children, mt = 12 }) => (
  <div style={{
    fontSize: 10, color: T.muted, textTransform: 'uppercase',
    letterSpacing: '0.1em', marginBottom: 6, marginTop: mt,
  }}>{children}</div>
)

function StatusBadge({ status }) {
  const s = STATUS[status]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: 10, fontWeight: 700,
      padding: '3px 10px', borderRadius: 20,
      background: s.bg, color: s.color,
      border: `1px solid ${s.color}33`,
      whiteSpace: 'nowrap',
    }}>{s.label}</span>
  )
}

function NavBtn({ active, color = T.blue, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '7px 16px', borderRadius: 24, fontSize: 11, fontWeight: 600,
      flexShrink: 0, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
      background: active ? color : 'transparent',
      color: active ? '#fff' : T.sub,
      boxShadow: active ? `0 2px 8px ${color}44` : 'none',
    }}>{children}</button>
  )
}

function ComplianceCard({ item, highlight }) {
  const [open, setOpen] = useState(false)
  return (
    <Card style={{
      marginBottom: 10, borderLeft: `4px solid ${item.regulatorColor}`,
      background: highlight ? '#FFFDF5' : T.surface,
    }}>
      {/* HEADER ROW */}
      <div onClick={() => setOpen(o => !o)} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
          {/* Left: regulator chip + title */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 5 }}>
              <span style={{
                fontSize: 10, fontWeight: 800, color: item.regulatorColor,
                background: item.regulatorBg, padding: '2px 8px', borderRadius: 10,
                border: `1px solid ${item.regulatorColor}33`, whiteSpace: 'nowrap',
              }}>{item.regulator}</span>
              <span style={{ fontSize: 10, color: T.muted, fontWeight: 600, whiteSpace: 'nowrap' }}>{item.frequency}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text, lineHeight: 1.45 }}>{item.name}</div>
          </div>
          {/* Right: status + priority stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
            <StatusBadge status={item.status} />
            <span style={{
              fontSize: 9, fontWeight: 700, color: PRIORITY[item.priority].color,
              whiteSpace: 'nowrap',
            }}>▲ {PRIORITY[item.priority].label}</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ fontSize: 11, color: T.sub, lineHeight: 1.6, marginBottom: 8 }}>{item.desc}</div>

        {/* Teams */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {item.teams.map(t => <Pill key={t} label={t} color={T.blue} bg={T.blueL} />)}
        </div>

        {/* Expand hint */}
        <div style={{
          marginTop: 8, fontSize: 10, color: T.muted,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ fontSize: 12 }}>{open ? '▲' : '▼'}</span>
          <span>{open ? 'Tap to collapse' : 'Tap to expand'}</span>
        </div>
      </div>

      {/* EXPANDED BODY */}
      {open && (
        <div style={{ marginTop: 12, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 4 }}>
            <div>
              <Sub mt={0}>Due Date</Sub>
              <div style={{
                fontSize: 12, fontWeight: 700,
                color: item.status === 'overdue' ? T.red : T.text,
              }}>{item.dueDate}</div>
            </div>
            <div>
              <Sub mt={0}>Reference</Sub>
              <div style={{ fontSize: 11, color: T.sub, lineHeight: 1.5 }}>{item.reference}</div>
            </div>
          </div>

          <Sub>Evidence Required</Sub>
          <div style={{ marginBottom: 4 }}>
            {item.evidence.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: T.green, fontWeight: 800, flexShrink: 0, lineHeight: 1.4 }}>✓</span>
                <span style={{ fontSize: 11, color: T.sub, lineHeight: 1.5 }}>{e}</span>
              </div>
            ))}
          </div>

          <Sub>Actions</Sub>
          <div style={{ marginBottom: 4 }}>
            {item.actions.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: T.blue, fontWeight: 800, flexShrink: 0, lineHeight: 1.4 }}>→</span>
                <span style={{
                  fontSize: 11, lineHeight: 1.5,
                  color: a.startsWith('URGENT') ? T.red : T.sub,
                  fontWeight: a.startsWith('URGENT') ? 700 : 400,
                }}>{a}</span>
              </div>
            ))}
          </div>

          {item.penalty && (
            <div style={{
              marginTop: 12, padding: '10px 12px',
              background: T.redL, borderRadius: 10,
              border: `1px solid ${T.red}22`,
              display: 'flex', gap: 8, alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>⚠️</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.red, marginBottom: 2 }}>Penalty</div>
                <div style={{ fontSize: 11, color: T.red, lineHeight: 1.5 }}>{item.penalty}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

export default function AviationApp() {
  const [nav, setNav] = useState('overview')
  const [dept, setDept] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredItems = regulatoryItems.filter(item => {
    const matchDept   = !dept || item.teams.includes(dept)
    const matchStatus = statusFilter === 'all' || item.status === statusFilter
    return matchDept && matchStatus
  })

  const deptItemCounts = departments.map(d => ({
    ...d,
    total:   regulatoryItems.filter(i => i.teams.includes(d.name)).length,
    overdue: regulatoryItems.filter(i => i.teams.includes(d.name) && i.status === 'overdue').length,
    due:     regulatoryItems.filter(i => i.teams.includes(d.name) && i.status === 'due').length,
    gap:     regulatoryItems.filter(i => i.teams.includes(d.name) && i.status === 'gap').length,
  }))

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", background: T.bg, minHeight: '100vh', color: T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .fade { animation: fd 0.18s ease-out; }
        @keyframes fd { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:none } }
        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 4px; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        padding: '12px 16px', boxShadow: '0 1px 12px rgba(26,86,219,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: `linear-gradient(135deg, ${T.blue}, ${T.navy})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}>✈️</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 15, fontWeight: 800, color: T.navy,
              letterSpacing: '-0.02em', lineHeight: 1.2,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>Airport Compliance Dashboard</div>
            <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>
              Regulatory · Standards · Departments
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <div style={{
              padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700,
              background: counts.overdue > 0 ? T.redL : T.greenL,
              color: counts.overdue > 0 ? T.red : T.green,
              border: `1px solid ${counts.overdue > 0 ? T.red : T.green}33`,
              whiteSpace: 'nowrap',
            }}>{counts.overdue} Overdue</div>
            <div style={{
              padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700,
              background: T.goldL, color: T.gold,
              border: `1px solid ${T.gold}44`,
              whiteSpace: 'nowrap',
            }}>{counts.due} Due</div>
          </div>
        </div>
      </div>

      {/* ── TAB NAV ── */}
      <div style={{
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        padding: '6px 14px', display: 'flex', overflowX: 'auto', gap: 4,
      }}>
        {TOP_NAVS.map(({ id, icon, label }) => (
          <NavBtn key={id} active={nav === id} onClick={() => setNav(id)}>
            {icon} {label}
          </NavBtn>
        ))}
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="fade" key={nav} style={{ padding: '16px 14px 56px' }}>

        {/* ─── OVERVIEW ─── */}
        {nav === 'overview' && (
          <div>
            {/* Hero gradient card */}
            <div style={{
              background: `linear-gradient(135deg, ${T.navy}, ${T.blue})`,
              borderRadius: 18, padding: 20, marginBottom: 14, color: '#fff',
            }}>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
                Compliance Health
              </div>
              <div style={{ fontSize: 11, opacity: 0.75, marginBottom: 16 }}>
                {counts.total} regulatory obligations · {departments.length} departments
              </div>
              {/* 2×2 grid — more readable on mobile */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { n: counts.compliant, l: 'Compliant', c: '#6EE7B7' },
                  { n: counts.due,       l: 'Due Soon',  c: '#FCD34D' },
                  { n: counts.overdue,   l: 'Overdue',   c: '#FCA5A5' },
                  { n: counts.gap,       l: 'Gap',       c: '#FB923C' },
                ].map(({ n, l, c }) => (
                  <div key={l} style={{
                    background: 'rgba(255,255,255,0.13)', borderRadius: 12,
                    padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: c, lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: 11, opacity: 0.8, lineHeight: 1.3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Regulatory Score', score: regulatoryScore },
                { label: 'Standards Score',  score: standardsScore  },
              ].map(({ label, score }) => {
                const c = score >= 80 ? T.green : score >= 60 ? T.gold : T.red
                return (
                  <Card key={label}>
                    <Sub mt={0}>{label}</Sub>
                    <div style={{ fontSize: 30, fontWeight: 900, color: c, lineHeight: 1, marginBottom: 10 }}>
                      {score}%
                    </div>
                    <div style={{ height: 6, background: T.border, borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 4, background: c, width: `${score}%` }} />
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Departments at risk */}
            <Sub mt={0}>Departments at Risk</Sub>
            {deptItemCounts.filter(d => d.overdue > 0 || d.gap > 0).map(d => (
              <Card key={d.id} style={{
                marginBottom: 8, cursor: 'pointer',
                borderLeft: `4px solid ${d.overdue > 0 ? T.red : T.accent}`,
              }} onClick={() => { setDept(d.name); setNav('compliance') }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{d.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{d.name}</div>
                    <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>{d.total} obligations</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                  {d.overdue > 0 && <Pill label={`${d.overdue} Overdue`} color={T.red} />}
                  {d.gap > 0    && <Pill label={`${d.gap} Gap`}          color={T.accent} />}
                  {d.due > 0    && <Pill label={`${d.due} Due`}          color={T.gold} />}
                </div>
              </Card>
            ))}

            {/* All-clear departments */}
            {deptItemCounts.some(d => d.overdue === 0 && d.gap === 0 && d.total > 0) && (
              <Card style={{ marginTop: 4, background: T.greenL, border: `1px solid ${T.green}22` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.green, marginBottom: 8 }}>
                  ✓ No overdue or gaps
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {deptItemCounts.filter(d => d.overdue === 0 && d.gap === 0 && d.total > 0).map(d => (
                    <span key={d.id} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontSize: 11, color: T.green, fontWeight: 600,
                      background: T.surface, padding: '3px 10px', borderRadius: 20,
                      border: `1px solid ${T.green}33`,
                    }}>{d.icon} {d.name}</span>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ─── COMPLIANCE ─── */}
        {nav === 'compliance' && (
          <div>
            {/* Department filter — horizontal scroll */}
            <div style={{ fontSize: 10, color: T.muted, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>
              FILTER BY DEPARTMENT
            </div>
            <div style={{ overflowX: 'auto', marginBottom: 12, paddingBottom: 4 }}>
              <div style={{ display: 'flex', gap: 6, width: 'max-content' }}>
                <NavBtn active={!dept} color={T.navy} onClick={() => setDept(null)}>All</NavBtn>
                {departments.map(d => (
                  <NavBtn key={d.id} active={dept === d.name} color={d.color}
                    onClick={() => setDept(dept === d.name ? null : d.name)}>
                    {d.icon} {d.name}
                  </NavBtn>
                ))}
              </div>
            </div>

            {/* Status filter */}
            <div style={{ fontSize: 10, color: T.muted, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>
              FILTER BY STATUS
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              {['all', 'compliant', 'due', 'overdue', 'gap'].map(s => (
                <NavBtn key={s}
                  active={statusFilter === s}
                  color={s === 'all' ? T.blue : STATUS[s].color}
                  onClick={() => setStatusFilter(s)}>
                  {s === 'all' ? 'All' : STATUS[s].label}
                </NavBtn>
              ))}
            </div>

            {/* Active department banner */}
            {dept && (
              <div style={{
                padding: '10px 14px', background: T.blueL, borderRadius: 12, marginBottom: 12,
                display: 'flex', alignItems: 'center', gap: 10,
                border: `1px solid ${T.blue}22`,
              }}>
                <span style={{ fontSize: 20 }}>{departments.find(d => d.name === dept)?.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.blue }}>{dept}</div>
                  <div style={{ fontSize: 10, color: T.muted }}>
                    {filteredItems.length} obligation{filteredItems.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <button onClick={() => setDept(null)} style={{
                  fontSize: 11, color: T.muted, background: T.surface, border: `1px solid ${T.border}`,
                  borderRadius: 20, padding: '3px 10px', cursor: 'pointer',
                }}>✕ Clear</button>
              </div>
            )}

            <div className="fade" key={`${dept}-${statusFilter}`}>
              {filteredItems.length === 0
                ? (
                  <Card>
                    <div style={{ textAlign: 'center', padding: '28px 0', color: T.muted, fontSize: 12 }}>
                      No compliance items match the current filters.
                    </div>
                  </Card>
                )
                : filteredItems.map(item => (
                  <ComplianceCard key={item.id} item={item} highlight={!!dept} />
                ))
              }
            </div>
          </div>
        )}

        {/* ─── DEPARTMENTS ─── */}
        {nav === 'departments' && (
          <div>
            <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.6, marginBottom: 16 }}>
              {departments.length} airport departments — tap any card to view its compliance obligations.
            </div>
            {deptItemCounts.map(d => (
              <Card key={d.id} style={{
                marginBottom: 10, cursor: 'pointer',
                borderLeft: `4px solid ${d.color}`,
              }} onClick={() => { setDept(d.name); setNav('compliance') }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                    background: d.color + '18',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  }}>{d.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
                      {d.total} compliance obligation{d.total !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 10, color: T.blue, fontWeight: 600,
                    flexShrink: 0, padding: '4px 10px',
                    background: T.blueL, borderRadius: 20,
                    border: `1px solid ${T.blue}22`,
                  }}>View →</div>
                </div>

                {d.total > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
                    {d.overdue > 0 && <Pill label={`${d.overdue} Overdue`}  color={T.red}    />}
                    {d.due > 0     && <Pill label={`${d.due} Due`}          color={T.gold}   />}
                    {d.gap > 0     && <Pill label={`${d.gap} Gap`}          color={T.accent} />}
                    {(d.total - d.overdue - d.due - d.gap) > 0 && (
                      <Pill label={`${d.total - d.overdue - d.due - d.gap} Compliant`} color={T.green} />
                    )}
                  </div>
                )}
                {d.total === 0 && (
                  <div style={{ fontSize: 11, color: T.muted, fontStyle: 'italic', marginTop: 8 }}>
                    No direct obligations tracked yet
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* ─── STANDARDS ─── */}
        {nav === 'standards' && (
          <div>
            <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.6, marginBottom: 16 }}>
              {standards.length} ISO/industry standards — certification status and gap analysis.
            </div>
            {standards.map(s => (
              <Card key={s.id} style={{ marginBottom: 14, borderLeft: `4px solid ${s.color}` }}>
                {/* Standard header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.text }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{s.fullName}</div>
                  </div>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                    flexShrink: 0,
                    background: s.status === 'certified' ? T.greenL : s.status === 'in-progress' ? T.blueL : T.redL,
                    color:      s.status === 'certified' ? T.green  : s.status === 'in-progress' ? T.blue  : T.red,
                    border: `1px solid ${s.status === 'certified' ? T.green : s.status === 'in-progress' ? T.blue : T.red}33`,
                  }}>
                    {s.status === 'certified' ? '✓ Certified' : s.status === 'in-progress' ? 'In Progress' : 'Gap'}
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: T.sub }}>Overall Progress</span>
                    <span style={{ fontSize: 14, fontWeight: 900, color: s.color }}>{s.progress}%</span>
                  </div>
                  <div style={{ height: 8, background: T.border, borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 6,
                      background: s.color, width: `${s.progress}%`,
                      transition: 'width 0.5s',
                    }} />
                  </div>
                </div>

                {s.validUntil && (
                  <div style={{
                    padding: '8px 12px', background: T.greenL, borderRadius: 10, marginBottom: 14,
                    fontSize: 11, color: T.green, fontWeight: 700,
                    display: 'flex', alignItems: 'center', gap: 6,
                    border: `1px solid ${T.green}22`,
                  }}>
                    <span>✓</span> Certified until {s.validUntil} · {s.certBody}
                  </div>
                )}

                {!s.validUntil && (
                  <>
                    <Sub mt={0}>Certification Body</Sub>
                    <div style={{ fontSize: 11, color: T.sub, marginBottom: 4 }}>{s.certBody}</div>
                  </>
                )}

                {/* Clauses */}
                <Sub>Clause Status</Sub>
                <div style={{ marginBottom: 4, border: `1px solid ${T.border}`, borderRadius: 10, overflow: 'hidden' }}>
                  {s.clauses.map((c, i) => (
                    <div key={c.ref} style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                      padding: '10px 12px',
                      background: i % 2 === 0 ? T.surface : T.card,
                      borderBottom: i < s.clauses.length - 1 ? `1px solid ${T.border}` : 'none',
                    }}>
                      <span style={{
                        fontSize: 13, fontWeight: 800, flexShrink: 0, lineHeight: 1.4,
                        color: c.status === 'done' ? T.green : c.status === 'partial' ? T.gold : T.red,
                        minWidth: 18, textAlign: 'center',
                      }}>
                        {c.status === 'done' ? '✓' : c.status === 'partial' ? '◑' : '✗'}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: T.text }}>
                          Cl. {c.ref} — {c.name}
                        </div>
                        <div style={{ fontSize: 10, color: T.muted, marginTop: 3, lineHeight: 1.5 }}>
                          {c.evidence}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next steps */}
                {s.nextSteps.length > 0 && (
                  <>
                    <Sub>Next Steps</Sub>
                    {s.nextSteps.map((step, i) => (
                      <div key={i} style={{
                        display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7,
                      }}>
                        <span style={{
                          width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                          background: s.color + '18', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: 10, fontWeight: 800, color: s.color,
                          marginTop: 1,
                        }}>{i + 1}</span>
                        <span style={{ fontSize: 11, color: T.sub, lineHeight: 1.6 }}>{step}</span>
                      </div>
                    ))}
                  </>
                )}
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
