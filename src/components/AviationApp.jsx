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
  <div style={{ background:T.surface, borderRadius:14, padding:14, border:`1px solid ${T.border}`, ...style }}>{children}</div>
)
const Pill = ({ label, color, bg }) => (
  <span style={{ display:'inline-flex', alignItems:'center', padding:'2px 8px', borderRadius:20, fontSize:10, fontWeight:700, background:bg||color+'18', color, border:`1px solid ${color}33`, marginRight:4, marginBottom:3 }}>{label}</span>
)
const Sub = ({ children }) => (
  <div style={{ fontSize:10, color:T.muted, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>{children}</div>
)

function StatusBadge({ status }) {
  const s = STATUS[status]
  return <span style={{ fontSize:10, fontWeight:700, padding:'2px 9px', borderRadius:20, background:s.bg, color:s.color, border:`1px solid ${s.color}33` }}>{s.label}</span>
}

function ComplianceCard({ item, highlight }) {
  const [open, setOpen] = useState(false)
  return (
    <Card style={{ marginBottom:8, borderLeft:`4px solid ${item.regulatorColor}`, background: highlight ? '#FFFBF0' : T.surface }}>
      <div onClick={() => setOpen(o => !o)} style={{ cursor:'pointer' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8, marginBottom:6 }}>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap', marginBottom:4 }}>
              <span style={{ fontSize:10, fontWeight:800, color:item.regulatorColor, background:item.regulatorBg, padding:'1px 7px', borderRadius:10, border:`1px solid ${item.regulatorColor}33` }}>{item.regulator}</span>
              <span style={{ fontSize:10, color:T.muted, fontWeight:600 }}>{item.frequency}</span>
            </div>
            <div style={{ fontSize:13, fontWeight:700, color:T.text, lineHeight:1.4 }}>{item.name}</div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4, flexShrink:0 }}>
            <StatusBadge status={item.status} />
            <span style={{ fontSize:9, fontWeight:700, color:PRIORITY[item.priority].color }}>▲ {PRIORITY[item.priority].label}</span>
          </div>
        </div>
        <div style={{ fontSize:11, color:T.sub, lineHeight:1.5, marginBottom:6 }}>{item.desc}</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:0 }}>
          {item.teams.map(t => <Pill key={t} label={t} color={T.blue} bg={T.blueL} />)}
        </div>
        {!open && <div style={{ fontSize:10, color:T.muted, marginTop:6 }}>Tap to expand ↓</div>}
      </div>
      {open && (
        <div style={{ marginTop:12, borderTop:`1px solid ${T.border}`, paddingTop:12 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:10 }}>
            <div>
              <Sub>Due Date</Sub>
              <div style={{ fontSize:12, color: item.status==='overdue'?T.red:T.text, fontWeight:600 }}>{item.dueDate}</div>
            </div>
            <div>
              <Sub>Reference</Sub>
              <div style={{ fontSize:11, color:T.sub, lineHeight:1.4 }}>{item.reference}</div>
            </div>
          </div>
          <Sub>Evidence Required</Sub>
          <div style={{ marginBottom:10 }}>
            {item.evidence.map((e,i) => (
              <div key={i} style={{ display:'flex', gap:6, marginBottom:4 }}>
                <span style={{ fontSize:10, color:T.green, fontWeight:800, flexShrink:0 }}>✓</span>
                <span style={{ fontSize:11, color:T.sub }}>{e}</span>
              </div>
            ))}
          </div>
          <Sub>Actions</Sub>
          {item.actions.map((a,i) => (
            <div key={i} style={{ display:'flex', gap:6, marginBottom:4 }}>
              <span style={{ fontSize:10, color:T.blue, fontWeight:800, flexShrink:0 }}>→</span>
              <span style={{ fontSize:11, color: a.startsWith('URGENT') ? T.red : T.sub, fontWeight: a.startsWith('URGENT') ? 700 : 400 }}>{a}</span>
            </div>
          ))}
          {item.penalty && (
            <div style={{ marginTop:10, padding:'8px 10px', background:T.redL, borderRadius:8, border:`1px solid ${T.red}22` }}>
              <span style={{ fontSize:10, fontWeight:700, color:T.red }}>⚠ Penalty: </span>
              <span style={{ fontSize:11, color:T.red }}>{item.penalty}</span>
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
    const matchDept = !dept || item.teams.includes(dept)
    const matchStatus = statusFilter === 'all' || item.status === statusFilter
    return matchDept && matchStatus
  })

  const deptItemCounts = departments.map(d => ({
    ...d,
    total: regulatoryItems.filter(i => i.teams.includes(d.name)).length,
    overdue: regulatoryItems.filter(i => i.teams.includes(d.name) && i.status === 'overdue').length,
    due: regulatoryItems.filter(i => i.teams.includes(d.name) && i.status === 'due').length,
    gap: regulatoryItems.filter(i => i.teams.includes(d.name) && i.status === 'gap').length,
  }))

  return (
    <div style={{ fontFamily:"'Plus Jakarta Sans','DM Sans',sans-serif", background:T.bg, minHeight:'100vh', color:T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .fade { animation:fd 0.18s ease-out; }
        @keyframes fd { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:none} }
      `}</style>

      {/* HEADER */}
      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:'12px 16px', boxShadow:'0 1px 12px rgba(26,86,219,0.08)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${T.blue}, ${T.navy})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>✈️</div>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:T.navy, letterSpacing:'-0.02em', lineHeight:1 }}>Airport Compliance Dashboard</div>
            <div style={{ fontSize:10, color:T.muted, marginTop:2, letterSpacing:'0.04em' }}>Regulatory · Standards · Departments</div>
          </div>
          <div style={{ marginLeft:'auto', display:'flex', gap:6 }}>
            <div style={{ padding:'4px 10px', borderRadius:20, background:counts.overdue>0?T.redL:T.greenL, fontSize:10, fontWeight:700, color:counts.overdue>0?T.red:T.green, border:`1px solid ${counts.overdue>0?T.red:T.green}33` }}>
              {counts.overdue} Overdue
            </div>
            <div style={{ padding:'4px 10px', borderRadius:20, background:T.goldL, fontSize:10, fontWeight:700, color:T.gold, border:`1px solid ${T.gold}44` }}>
              {counts.due} Due
            </div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <div style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:'6px 14px', display:'flex', overflowX:'auto', gap:4 }}>
        {TOP_NAVS.map(({ id, icon, label }) => (
          <button key={id} onClick={() => setNav(id)} style={{
            padding:'7px 14px', borderRadius:24, fontSize:11, fontWeight:600, flexShrink:0, border:'none',
            background: nav===id ? T.blue : 'transparent',
            color: nav===id ? '#fff' : T.sub,
            boxShadow: nav===id ? `0 2px 8px ${T.blue}44` : 'none',
          }}>{icon} {label}</button>
        ))}
      </div>

      <div className="fade" key={nav} style={{ padding:'16px 14px 48px' }}>

        {/* OVERVIEW */}
        {nav === 'overview' && (
          <div>
            <div style={{ background:`linear-gradient(135deg, ${T.navy}, ${T.blue})`, borderRadius:18, padding:20, marginBottom:14, color:'#fff' }}>
              <div style={{ fontSize:18, fontWeight:800, letterSpacing:'-0.02em', marginBottom:6 }}>Compliance Health</div>
              <div style={{ fontSize:12, opacity:0.8, marginBottom:14 }}>{counts.total} regulatory obligations · {departments.length} departments</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                {[
                  { n:counts.compliant, l:'Compliant', c:'#6EE7B7' },
                  { n:counts.due,       l:'Due Soon',  c:'#FCD34D' },
                  { n:counts.overdue,   l:'Overdue',   c:'#FCA5A5' },
                  { n:counts.gap,       l:'Gap',       c:'#FB923C' },
                ].map(({ n,l,c }) => (
                  <div key={l} style={{ background:'rgba(255,255,255,0.12)', borderRadius:10, padding:'10px 6px', textAlign:'center' }}>
                    <div style={{ fontSize:22, fontWeight:800, color:c }}>{n}</div>
                    <div style={{ fontSize:9, opacity:0.75, marginTop:2 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
              <Card>
                <Sub>Regulatory Score</Sub>
                <div style={{ fontSize:28, fontWeight:900, color: regulatoryScore>=80?T.green:regulatoryScore>=60?T.gold:T.red }}>{regulatoryScore}%</div>
                <div style={{ height:6, background:T.border, borderRadius:4, marginTop:8 }}>
                  <div style={{ height:'100%', borderRadius:4, background: regulatoryScore>=80?T.green:regulatoryScore>=60?T.gold:T.red, width:`${regulatoryScore}%` }} />
                </div>
              </Card>
              <Card>
                <Sub>Standards Score</Sub>
                <div style={{ fontSize:28, fontWeight:900, color: standardsScore>=80?T.green:standardsScore>=60?T.gold:T.red }}>{standardsScore}%</div>
                <div style={{ height:6, background:T.border, borderRadius:4, marginTop:8 }}>
                  <div style={{ height:'100%', borderRadius:4, background: standardsScore>=80?T.green:standardsScore>=60?T.gold:T.red, width:`${standardsScore}%` }} />
                </div>
              </Card>
            </div>

            <Sub>Departments at Risk</Sub>
            {deptItemCounts.filter(d => d.overdue > 0 || d.gap > 0).map(d => (
              <Card key={d.id} style={{ marginBottom:8, display:'flex', alignItems:'center', gap:10, cursor:'pointer', borderLeft:`4px solid ${d.overdue>0?T.red:T.accent}` }}
                onClick={() => { setDept(d.name); setNav('compliance') }}>
                <div style={{ fontSize:22 }}>{d.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.text }}>{d.name}</div>
                  <div style={{ fontSize:10, color:T.muted }}>{d.total} obligations</div>
                </div>
                <div style={{ display:'flex', gap:4 }}>
                  {d.overdue>0 && <span style={{ fontSize:10, fontWeight:700, color:T.red, background:T.redL, padding:'2px 7px', borderRadius:20, border:`1px solid ${T.red}22` }}>{d.overdue} overdue</span>}
                  {d.gap>0    && <span style={{ fontSize:10, fontWeight:700, color:T.accent, background:'#FFF3EE', padding:'2px 7px', borderRadius:20, border:`1px solid ${T.accent}22` }}>{d.gap} gap</span>}
                  {d.due>0    && <span style={{ fontSize:10, fontWeight:700, color:T.gold, background:T.goldL, padding:'2px 7px', borderRadius:20, border:`1px solid ${T.gold}22` }}>{d.due} due</span>}
                </div>
              </Card>
            ))}
            {deptItemCounts.filter(d => d.overdue===0 && d.gap===0).length > 0 && (
              <Card style={{ marginTop:4, background:T.greenL, border:`1px solid ${T.green}22` }}>
                <div style={{ fontSize:12, fontWeight:700, color:T.green, marginBottom:4 }}>✓ Departments with no overdue / gaps</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                  {deptItemCounts.filter(d => d.overdue===0 && d.gap===0 && d.total>0).map(d => (
                    <span key={d.id} style={{ fontSize:11, color:T.green }}>{d.icon} {d.name}</span>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* COMPLIANCE */}
        {nav === 'compliance' && (
          <div>
            {/* Department filter bar */}
            <div style={{ overflowX:'auto', marginBottom:10 }}>
              <div style={{ display:'flex', gap:6, paddingBottom:4 }}>
                <button onClick={() => setDept(null)} style={{ flexShrink:0, padding:'6px 12px', borderRadius:20, fontSize:10, fontWeight:700, border:'none', background:!dept?T.navy:'transparent', color:!dept?'#fff':T.muted, boxShadow:!dept?`0 2px 8px ${T.navy}44`:`0 0 0 1.5px ${T.border}` }}>All</button>
                {departments.map(d => (
                  <button key={d.id} onClick={() => setDept(dept===d.name?null:d.name)} style={{ flexShrink:0, padding:'6px 12px', borderRadius:20, fontSize:10, fontWeight:700, border:'none', background:dept===d.name?d.color:'transparent', color:dept===d.name?'#fff':T.muted, boxShadow:dept===d.name?`0 2px 8px ${d.color}44`:`0 0 0 1.5px ${T.border}` }}>
                    {d.icon} {d.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Status filter */}
            <div style={{ display:'flex', gap:6, marginBottom:12, flexWrap:'wrap' }}>
              {['all','compliant','due','overdue','gap'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} style={{ padding:'5px 12px', borderRadius:20, fontSize:10, fontWeight:700, border:'none', cursor:'pointer',
                  background: statusFilter===s ? (s==='all'?T.blue:STATUS[s]?.color||T.blue) : T.surface,
                  color: statusFilter===s ? '#fff' : T.muted,
                  boxShadow: statusFilter===s ? `0 2px 8px ${s==='all'?T.blue:STATUS[s]?.color||T.blue}44` : `0 0 0 1.5px ${T.border}`,
                }}>
                  {s==='all'?'All Statuses':STATUS[s].label}
                </button>
              ))}
            </div>

            {dept && (
              <div style={{ padding:'8px 12px', background:T.blueL, borderRadius:10, marginBottom:10, display:'flex', alignItems:'center', gap:8, border:`1px solid ${T.blue}22` }}>
                <span style={{ fontSize:18 }}>{departments.find(d=>d.name===dept)?.icon}</span>
                <span style={{ fontSize:12, fontWeight:700, color:T.blue }}>{dept}</span>
                <span style={{ fontSize:11, color:T.muted, marginLeft:4 }}>{filteredItems.length} obligation{filteredItems.length!==1?'s':''}</span>
                <button onClick={() => setDept(null)} style={{ marginLeft:'auto', fontSize:10, color:T.muted, background:'none', border:'none', cursor:'pointer' }}>✕ Clear</button>
              </div>
            )}

            <div className="fade" key={`${dept}-${statusFilter}`}>
              {filteredItems.length === 0
                ? <Card><div style={{ textAlign:'center', padding:24, color:T.muted, fontSize:12 }}>No compliance items match the current filters.</div></Card>
                : filteredItems.map(item => <ComplianceCard key={item.id} item={item} highlight={!!dept} />)
              }
            </div>
          </div>
        )}

        {/* DEPARTMENTS */}
        {nav === 'departments' && (
          <div>
            <div style={{ fontSize:12, color:T.sub, marginBottom:14, lineHeight:1.6 }}>{departments.length} airport departments · tap any to see their compliance obligations.</div>
            {deptItemCounts.map(d => (
              <Card key={d.id} style={{ marginBottom:10, cursor:'pointer', borderLeft:`4px solid ${d.color}` }}
                onClick={() => { setDept(d.name); setNav('compliance') }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:d.total>0?10:0 }}>
                  <div style={{ width:44, height:44, borderRadius:11, background:d.color+'18', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{d.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{d.name}</div>
                    <div style={{ fontSize:11, color:T.muted }}>{d.total} compliance obligation{d.total!==1?'s':''}</div>
                  </div>
                  <div style={{ fontSize:10, color:T.blue, fontWeight:600 }}>View →</div>
                </div>
                {d.total > 0 && (
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {d.overdue>0 && <Pill label={`${d.overdue} Overdue`} color={T.red} />}
                    {d.due>0    && <Pill label={`${d.due} Due`}     color={T.gold}  />}
                    {d.gap>0    && <Pill label={`${d.gap} Gap`}     color={T.accent}/>}
                    {(d.total - d.overdue - d.due - d.gap) > 0 && <Pill label={`${d.total - d.overdue - d.due - d.gap} Compliant`} color={T.green} />}
                  </div>
                )}
                {d.total === 0 && <div style={{ fontSize:11, color:T.muted, fontStyle:'italic' }}>No direct obligations tracked</div>}
              </Card>
            ))}
          </div>
        )}

        {/* STANDARDS */}
        {nav === 'standards' && (
          <div>
            <div style={{ fontSize:12, color:T.sub, marginBottom:14, lineHeight:1.6 }}>{standards.length} ISO/industry standards · certification status and gap analysis.</div>
            {standards.map(s => (
              <Card key={s.id} style={{ marginBottom:12, borderTop:`3px solid ${s.color}` }}>
                <div style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:10 }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:800, color:T.text }}>{s.name}</div>
                    <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>{s.fullName}</div>
                  </div>
                  <span style={{ fontSize:10, fontWeight:700, padding:'2px 9px', borderRadius:20,
                    background: s.status==='certified'?T.greenL:s.status==='in-progress'?T.blueL:T.redL,
                    color: s.status==='certified'?T.green:s.status==='in-progress'?T.blue:T.red,
                    border:`1px solid ${s.status==='certified'?T.green:s.status==='in-progress'?T.blue:T.red}33`,
                    flexShrink:0,
                  }}>
                    {s.status==='certified'?'✓ Certified':s.status==='in-progress'?'In Progress':'Gap'}
                  </span>
                </div>

                <div style={{ marginBottom:10 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:11, color:T.sub }}>Progress</span>
                    <span style={{ fontSize:13, fontWeight:800, color:s.color }}>{s.progress}%</span>
                  </div>
                  <div style={{ height:7, background:T.border, borderRadius:4, overflow:'hidden' }}>
                    <div style={{ height:'100%', borderRadius:4, background:s.color, width:`${s.progress}%`, transition:'width 0.5s' }} />
                  </div>
                </div>

                {s.validUntil && (
                  <div style={{ padding:'6px 10px', background:T.greenL, borderRadius:8, marginBottom:10, fontSize:11, color:T.green, fontWeight:600 }}>
                    Certified until {s.validUntil}
                  </div>
                )}

                <Sub>Certification Body</Sub>
                <div style={{ fontSize:11, color:T.sub, marginBottom:10 }}>{s.certBody}</div>

                <Sub>Clause Status</Sub>
                <div style={{ marginBottom:10 }}>
                  {s.clauses.map(c => (
                    <div key={c.ref} style={{ display:'flex', gap:8, alignItems:'flex-start', padding:'5px 0', borderBottom:`1px solid ${T.border}` }}>
                      <span style={{ fontSize:10, fontWeight:800, color: c.status==='done'?T.green:c.status==='partial'?T.gold:T.red, minWidth:22, flexShrink:0 }}>
                        {c.status==='done'?'✓':c.status==='partial'?'◑':'✗'}
                      </span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:11, fontWeight:600, color:T.text }}>Cl. {c.ref} — {c.name}</div>
                        <div style={{ fontSize:10, color:T.muted, marginTop:2 }}>{c.evidence}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {s.nextSteps.length > 0 && (
                  <>
                    <Sub>Next Steps</Sub>
                    {s.nextSteps.map((step,i) => (
                      <div key={i} style={{ display:'flex', gap:6, marginBottom:5 }}>
                        <span style={{ fontSize:10, color:s.color, fontWeight:800, flexShrink:0 }}>{i+1}.</span>
                        <span style={{ fontSize:11, color:T.sub, lineHeight:1.5 }}>{step}</span>
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
