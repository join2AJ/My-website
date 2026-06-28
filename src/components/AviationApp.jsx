import { useState } from 'react'
import { LIGHT, DARK } from '../themes.js'
import { regulatoryItems, standards, counts, regulatoryScore, standardsScore, departments } from '../data/aviationData.js'

let T = { ...DARK, amber: DARK.gold }

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
    fontFamily: 'monospace',
  }}>{children}</div>
)

function StatusBadge({ status, STATUS }) {
  const s = STATUS[status]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: 10, fontWeight: 700,
      padding: '3px 10px', borderRadius: 20,
      background: s.bg, color: s.color,
      border: `1px solid ${s.color}33`,
      whiteSpace: 'nowrap', fontFamily: 'monospace',
    }}>{s.label}</span>
  )
}

function NavBtn({ active, color = T.blue, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '7px 16px', borderRadius: 8, fontSize: 11, fontWeight: 600,
      flexShrink: 0, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
      background: active ? color : 'transparent',
      color: active ? '#fff' : T.sub,
      boxShadow: active ? `0 2px 8px ${color}44` : 'none',
    }}>{children}</button>
  )
}

function ComplianceCard({ item, highlight, STATUS, PRIORITY }) {
  const [open, setOpen] = useState(false)
  return (
    <Card style={{
      borderLeft: `4px solid ${item.regulatorColor}`,
      background: highlight ? T.goldL : T.surface,
    }}>
      {/* HEADER ROW */}
      <div onClick={() => setOpen(o => !o)} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 5 }}>
              <span style={{
                fontSize: 10, fontWeight: 800, color: item.regulatorColor,
                background: item.regulatorBg, padding: '2px 8px', borderRadius: 6,
                border: `1px solid ${item.regulatorColor}33`, whiteSpace: 'nowrap',
                fontFamily: 'monospace',
              }}>{item.regulator}</span>
              <span style={{ fontSize: 10, color: T.muted, fontWeight: 600, whiteSpace: 'nowrap', fontFamily: 'monospace' }}>{item.frequency}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text, lineHeight: 1.45 }}>{item.name}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
            <StatusBadge status={item.status} STATUS={STATUS} />
            <span style={{
              fontSize: 9, fontWeight: 700, color: PRIORITY[item.priority].color,
              whiteSpace: 'nowrap', fontFamily: 'monospace',
            }}>▲ {PRIORITY[item.priority].label}</span>
          </div>
        </div>

        <div style={{ fontSize: 11, color: T.sub, lineHeight: 1.6, marginBottom: 8 }}>{item.desc}</div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {item.teams.map(t => {
            const d = departments.find(x => x.id === t)
            return <Pill key={t} label={d ? d.name : t} color={d ? d.color : T.blue} />
          })}
        </div>

        <div style={{
          marginTop: 8, fontSize: 10, color: T.muted,
          display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'monospace',
        }}>
          <span style={{ fontSize: 12 }}>{open ? '▲' : '▼'}</span>
          <span>{open ? 'COLLAPSE' : 'EXPAND DETAILS'}</span>
        </div>
      </div>

      {/* EXPANDED BODY */}
      {open && (
        <div style={{ marginTop: 12, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 4 }}>
            <div>
              <Sub mt={0}>Due Date</Sub>
              <div style={{
                fontSize: 12, fontWeight: 700, fontFamily: 'monospace',
                color: item.status === 'overdue' ? T.red : T.amber,
              }}>{item.dueDate}</div>
            </div>
            <div>
              <Sub mt={0}>Reference</Sub>
              <div style={{ fontSize: 11, color: T.sub, lineHeight: 1.5, fontFamily: 'monospace' }}>{item.reference}</div>
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
                <div style={{ fontSize: 10, fontWeight: 700, color: T.red, marginBottom: 2, fontFamily: 'monospace' }}>PENALTY</div>
                <div style={{ fontSize: 11, color: T.red, lineHeight: 1.5 }}>{item.penalty}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

export default function AviationApp({ dark = false }) {
  const theme = dark ? DARK : LIGHT
  T = { ...theme, amber: theme.gold }

  const STATUS = {
    compliant: { label:'Compliant', color:T.green,  bg:T.greenL  },
    due:        { label:'Due Soon',  color:T.gold,   bg:T.goldL   },
    overdue:    { label:'Overdue',   color:T.red,    bg:T.redL    },
    gap:        { label:'Gap',       color:T.accent, bg:T.amberL  },
  }

  const PRIORITY = {
    critical: { label:'Critical', color:T.red   },
    high:     { label:'High',     color:T.gold  },
    medium:   { label:'Medium',   color:T.blue  },
  }

  const [nav, setNav] = useState('overview')
  const [dept, setDept] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedDept, setSelectedDept] = useState(null)
  const [deptTab, setDeptTab] = useState('reg')

  const filteredItems = regulatoryItems.filter(item => {
    const matchDept   = !dept || item.teams.includes(dept)
    const matchStatus = statusFilter === 'all' || item.status === statusFilter
    return matchDept && matchStatus
  })

  const deptItemCounts = departments.map(d => ({
    ...d,
    total:   regulatoryItems.filter(i => i.teams.includes(d.id)).length,
    overdue: regulatoryItems.filter(i => i.teams.includes(d.id) && i.status === 'overdue').length,
    due:     regulatoryItems.filter(i => i.teams.includes(d.id) && i.status === 'due').length,
    gap:     regulatoryItems.filter(i => i.teams.includes(d.id) && i.status === 'gap').length,
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
      <div className="avia-hdr" style={{
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        boxShadow: dark ? '0 1px 20px rgba(0,0,0,0.4)' : '0 1px 12px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10, flexShrink: 0,
            background: `linear-gradient(135deg, ${T.blue}, ${T.navy})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            border: `1px solid ${T.border}`,
          }}>✈️</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 15, fontWeight: 800, color: T.text,
              letterSpacing: '-0.02em', lineHeight: 1.2,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              fontFamily: 'monospace',
            }}>AIRPORT COMPLIANCE DASHBOARD</div>
            <div style={{ fontSize: 10, color: T.muted, marginTop: 2, fontFamily: 'monospace' }}>
              REGULATORY · STANDARDS · DEPARTMENTS
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <div style={{
              padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 700,
              background: counts.overdue > 0 ? T.redL : T.greenL,
              color: counts.overdue > 0 ? T.red : T.green,
              border: `1px solid ${counts.overdue > 0 ? T.red : T.green}33`,
              whiteSpace: 'nowrap', fontFamily: 'monospace',
            }}>{counts.overdue} OVD</div>
            <div style={{
              padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 700,
              background: T.goldL, color: T.gold,
              border: `1px solid ${T.gold}44`,
              whiteSpace: 'nowrap', fontFamily: 'monospace',
            }}>{counts.due} DUE</div>
          </div>
        </div>
      </div>

      {/* ── TAB NAV ── */}
      <div className="avia-tab" style={{
        background: T.surface, borderBottom: `1px solid ${T.border}`,
      }}>
        {TOP_NAVS.map(({ id, icon, label }) => (
          <NavBtn key={id} active={nav === id} onClick={() => setNav(id)}>
            {icon} {label}
          </NavBtn>
        ))}
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="fade avia-page" key={nav}>

        {/* ─── OVERVIEW ─── */}
        {nav === 'overview' && (
          <div>
            {/* Departure board hero */}
            <div style={{
              background: `linear-gradient(135deg, ${T.navy}, #0A1829)`,
              borderRadius: 16, padding: 20, marginBottom: 14, color: '#fff',
              border: `1px solid ${T.border}`,
            }}>
              <div style={{ fontFamily: 'monospace', fontSize: 10, color: T.amber, letterSpacing: '0.1em', marginBottom: 6 }}>
                ✈ FLIGHT INFORMATION DISPLAY SYSTEM
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4, fontFamily: 'monospace' }}>
                COMPLIANCE HEALTH STATUS
              </div>
              <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 16, fontFamily: 'monospace' }}>
                {counts.total} OBLIGATIONS · {departments.length} DEPARTMENTS
              </div>
              <div className="health-grid">
                {[
                  { n: counts.compliant, l: 'CLEARED', c: '#6EE7B7' },
                  { n: counts.due,       l: 'DUE SOON', c: '#FCD34D' },
                  { n: counts.overdue,   l: 'OVERDUE',  c: '#FCA5A5' },
                  { n: counts.gap,       l: 'GAP',      c: '#FB923C' },
                ].map(({ n, l, c }) => (
                  <div key={l} style={{
                    background: 'rgba(255,255,255,0.06)', borderRadius: 10,
                    padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: c, lineHeight: 1, fontFamily: 'monospace' }}>{n}</div>
                    <div style={{ fontSize: 10, opacity: 0.7, lineHeight: 1.3, fontFamily: 'monospace', letterSpacing: '0.04em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score cards */}
            <div className="score-grid">
              {[
                { label: 'Regulatory Score', score: regulatoryScore },
                { label: 'Standards Score',  score: standardsScore  },
              ].map(({ label, score }) => {
                const c = score >= 80 ? T.green : score >= 60 ? T.gold : T.red
                return (
                  <Card key={label}>
                    <Sub mt={0}>{label}</Sub>
                    <div style={{ fontSize: 30, fontWeight: 900, color: c, lineHeight: 1, marginBottom: 10, fontFamily: 'monospace' }}>
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
              }} onClick={() => { setDept(d.id); setNav('compliance') }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{d.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{d.name}</div>
                    <div style={{ fontSize: 10, color: T.muted, marginTop: 2, fontFamily: 'monospace' }}>{d.total} OBLIGATIONS</div>
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
                <div style={{ fontSize: 12, fontWeight: 700, color: T.green, marginBottom: 8, fontFamily: 'monospace' }}>
                  ✓ RUNWAY CLEAR — NO OVERDUE OR GAPS
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
            <div style={{ fontSize: 10, color: T.muted, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6, fontFamily: 'monospace' }}>
              FILTER BY DEPARTMENT
            </div>
            <div style={{ overflowX: 'auto', marginBottom: 12, paddingBottom: 4 }}>
              <div style={{ display: 'flex', gap: 6, width: 'max-content' }}>
                <NavBtn active={!dept} color={T.blue} onClick={() => setDept(null)}>All</NavBtn>
                {departments.map(d => (
                  <NavBtn key={d.id} active={dept === d.id} color={d.color}
                    onClick={() => setDept(dept === d.id ? null : d.id)}>
                    {d.icon} {d.name}
                  </NavBtn>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 10, color: T.muted, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6, fontFamily: 'monospace' }}>
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

            {dept && (() => {
              const deptObj = departments.find(d => d.id === dept)
              return (
                <div style={{
                  padding: '10px 14px', background: T.blueL, borderRadius: 10, marginBottom: 12,
                  display: 'flex', alignItems: 'center', gap: 10,
                  border: `1px solid ${T.blue}22`,
                }}>
                  <span style={{ fontSize: 20 }}>{deptObj?.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.blue }}>{deptObj?.full || deptObj?.name}</div>
                    <div style={{ fontSize: 10, color: T.muted, fontFamily: 'monospace' }}>
                      {filteredItems.length} OBLIGATION{filteredItems.length !== 1 ? 'S' : ''}
                    </div>
                  </div>
                  <button onClick={() => setDept(null)} style={{
                    fontSize: 11, color: T.muted, background: T.card, border: `1px solid ${T.border}`,
                    borderRadius: 20, padding: '3px 10px', cursor: 'pointer',
                  }}>✕ Clear</button>
                </div>
              )
            })()}

            <div className="fade" key={`${dept}-${statusFilter}`}>
              {filteredItems.length === 0
                ? (
                  <Card>
                    <div style={{ textAlign: 'center', padding: '28px 0', color: T.muted, fontSize: 12, fontFamily: 'monospace' }}>
                      NO OBLIGATIONS MATCH CURRENT FILTERS
                    </div>
                  </Card>
                )
                : (
                  <div className="compliance-grid">
                    {filteredItems.map(item => (
                      <ComplianceCard key={item.id} item={item} highlight={!!dept} STATUS={STATUS} PRIORITY={PRIORITY} />
                    ))}
                  </div>
                )
              }
            </div>
          </div>
        )}

        {/* ─── DEPARTMENTS ─── */}
        {nav === 'departments' && (
          <div>
            <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.6, marginBottom: 14 }}>
              {departments.length} departments — tap a card to see regulatory, standards & cybersecurity obligations.
            </div>
            <div className="dept-grid">
              {departments.map(d => {
                const cnt = deptItemCounts.find(x => x.id === d.id)
                const isSelected = selectedDept?.id === d.id
                return (
                  <div key={d.id} onClick={() => {
                    if (isSelected) { setSelectedDept(null) } else { setSelectedDept(d); setDeptTab('reg') }
                  }} style={{
                    background: isSelected ? d.color + '12' : T.surface,
                    border: `1.5px solid ${isSelected ? d.color : T.border}`,
                    borderRadius: 12, padding: '12px 10px', cursor: 'pointer',
                    position: 'relative', overflow: 'hidden',
                    transition: 'border-color 0.15s',
                  }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: d.color, borderRadius: '12px 12px 0 0' }} />
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{d.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: T.text, marginBottom: 2, lineHeight: 1.3 }}>{d.full}</div>
                    <div style={{ fontSize: 9, color: T.muted, marginBottom: 6, fontFamily: 'monospace' }}>{d.tag}</div>
                    {cnt && cnt.total > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                        {cnt.overdue > 0 && <Pill label={`${cnt.overdue} OVD`} color={T.red} />}
                        {cnt.due > 0     && <Pill label={`${cnt.due} DUE`}    color={T.gold} />}
                        {cnt.gap > 0     && <Pill label={`${cnt.gap} GAP`}    color={T.accent} />}
                      </div>
                    )}
                    {cnt && cnt.total === 0 && (
                      <div style={{ fontSize: 9, color: T.muted, fontFamily: 'monospace' }}>FRAMEWORK ITEMS</div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Dept detail panel */}
            {selectedDept && (
              <div className="fade" style={{
                background: T.surface, border: `2px solid ${selectedDept.color}`,
                borderRadius: 16, overflow: 'hidden', marginBottom: 14,
              }}>
                <div style={{
                  background: selectedDept.color + '10',
                  borderBottom: `1px solid ${selectedDept.color}33`,
                  padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: selectedDept.color + '20',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }}>{selectedDept.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, lineHeight: 1.2 }}>{selectedDept.full}</div>
                    <div style={{ fontSize: 10, color: T.muted, marginTop: 3, fontFamily: 'monospace' }}>
                      {selectedDept.tag} · {selectedDept.regulatory.length} REG · {selectedDept.standards.length} STD · {selectedDept.cyber.length} CYBER
                    </div>
                  </div>
                  <button onClick={() => setSelectedDept(null)} style={{
                    fontSize: 10, color: T.muted, background: T.card,
                    border: `1px solid ${T.border}`, borderRadius: 20,
                    padding: '4px 10px', cursor: 'pointer', flexShrink: 0,
                  }}>✕</button>
                </div>

                <div style={{ display: 'flex', gap: 6, padding: '10px 14px', borderBottom: `1px solid ${T.border}`, flexWrap: 'wrap' }}>
                  {[
                    { id:'reg',   label:`⚖️ Regulatory (${selectedDept.regulatory.length})`,  activeColor:T.red,    activeBg:T.redL    },
                    { id:'std',   label:`🏅 Standards (${selectedDept.standards.length})`,      activeColor:T.blue,   activeBg:T.blueL   },
                    { id:'cyber', label:`🔐 Cyber (${selectedDept.cyber.length})`,              activeColor:T.purple, activeBg:T.purpleL },
                  ].map(tab => (
                    <button key={tab.id} onClick={() => setDeptTab(tab.id)} style={{
                      padding: '6px 13px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                      border: `1.5px solid ${deptTab === tab.id ? tab.activeColor : T.border}`,
                      background: deptTab === tab.id ? tab.activeBg : T.card,
                      color: deptTab === tab.id ? tab.activeColor : T.muted,
                      cursor: 'pointer', whiteSpace: 'nowrap',
                    }}>{tab.label}</button>
                  ))}
                  <button onClick={() => { setDept(selectedDept.id); setNav('compliance') }} style={{
                    marginLeft: 'auto', padding: '6px 13px', borderRadius: 8, fontSize: 11,
                    fontWeight: 700, border: `1.5px solid ${T.blue}44`, background: T.blueL,
                    color: T.blue, cursor: 'pointer', whiteSpace: 'nowrap',
                  }}>📋 View Actions →</button>
                </div>

                <div style={{ padding: '12px 14px' }}>
                  {(() => {
                    const items = deptTab === 'reg' ? selectedDept.regulatory
                                : deptTab === 'std' ? selectedDept.standards
                                : selectedDept.cyber
                    const dotColor = deptTab === 'reg' ? T.red : deptTab === 'std' ? T.blue : T.purple
                    if (items.length === 0) {
                      return <div style={{ fontSize: 12, color: T.muted, textAlign: 'center', padding: '16px 0', fontFamily: 'monospace' }}>
                        NO SPECIFIC CYBERSECURITY ITEMS BEYOND GENERAL CERT-IN COMPLIANCE
                      </div>
                    }
                    return items.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '10px 12px', borderRadius: 10,
                        border: `1px solid ${T.border}`, background: T.card,
                        marginBottom: i < items.length - 1 ? 6 : 0,
                      }}>
                        <div style={{
                          width: 8, height: 8, borderRadius: 2, flexShrink: 0,
                          background: dotColor, marginTop: 4,
                        }} />
                        <span style={{ flex: 1, fontSize: 11, color: T.sub, lineHeight: 1.5 }}>{item.text}</span>
                        <span style={{
                          fontSize: 9, color: T.muted, fontWeight: 700,
                          whiteSpace: 'nowrap', paddingLeft: 6,
                          background: T.surface, padding: '2px 7px', borderRadius: 6,
                          border: `1px solid ${T.border}`,
                          fontFamily: 'monospace',
                        }}>{item.ref}</span>
                      </div>
                    ))
                  })()}
                </div>
              </div>
            )}
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
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.text }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{s.fullName}</div>
                  </div>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                    flexShrink: 0, fontFamily: 'monospace',
                    background: s.status === 'certified' ? T.greenL : s.status === 'in-progress' ? T.blueL : T.redL,
                    color:      s.status === 'certified' ? T.green  : s.status === 'in-progress' ? T.blue  : T.red,
                    border: `1px solid ${s.status === 'certified' ? T.green : s.status === 'in-progress' ? T.blue : T.red}33`,
                  }}>
                    {s.status === 'certified' ? '✓ CERTIFIED' : s.status === 'in-progress' ? 'IN PROGRESS' : 'GAP'}
                  </span>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: T.sub }}>Overall Progress</span>
                    <span style={{ fontSize: 14, fontWeight: 900, color: s.color, fontFamily: 'monospace' }}>{s.progress}%</span>
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
                    border: `1px solid ${T.green}22`, fontFamily: 'monospace',
                  }}>
                    <span>✓</span> CERTIFIED UNTIL {s.validUntil} · {s.certBody}
                  </div>
                )}

                {!s.validUntil && (
                  <>
                    <Sub mt={0}>Certification Body</Sub>
                    <div style={{ fontSize: 11, color: T.sub, marginBottom: 4 }}>{s.certBody}</div>
                  </>
                )}

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
                        minWidth: 18, textAlign: 'center', fontFamily: 'monospace',
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
                          marginTop: 1, fontFamily: 'monospace',
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
