import { useState, useCallback } from 'react'
import { CHECKLISTS } from '../data/checklistData.js'

const T = {
  navy:'#051525', blue:'#1249C0', sky:'#2D6BE4',
  tint:'#EEF4FF', tint2:'#F5F8FF', surface:'#FFF',
  border:'#D0DFFF', border2:'#B8CCFF',
  text:'#091428', sub:'#2E4A82', muted:'#617AB0',
  red:'#C41E1E', redL:'#FEF0F0',
  green:'#047857', greenL:'#ECFDF5',
  amber:'#B45309', amberL:'#FEF3C7',
  purple:'#5B21B6', purpleL:'#F5F3FF',
  teal:'#0E7490', tealL:'#ECFEFF',
  pass:'#D1FAE5', fail:'#FEE2E2', na:'#F3F4F6',
}

const sections = [...new Set(CHECKLISTS.map(c => c.section))]

// Evaluate measurement result against standard string
function evalResult(val, std) {
  const n = parseFloat(val)
  if (isNaN(n)) return null
  const m = std.match(/[≥≤><]=?\s*([\d.]+)/)
  if (!m) return null
  const threshold = parseFloat(m[1])
  if (std.includes('≥') || std.startsWith('>')) return n >= threshold ? 'pass' : 'fail'
  if (std.includes('≤') || std.startsWith('<')) return n <= threshold ? 'pass' : 'fail'
  return null
}

function ProgBar({ value, color }) {
  return (
    <div style={{ height: 3, background: T.border, margin: '0 0 14px', borderRadius: 2, overflow: 'hidden' }}>
      <div style={{ height: '100%', borderRadius: 2, background: color, width: `${value}%`, transition: 'width 0.4s' }} />
    </div>
  )
}

function ATCBox({ label, tx, rx }) {
  return (
    <div style={{ margin: '0 0 14px', padding: '12px 14px', borderRadius: 10, background: '#0A1E3C', border: '1px solid #1A3060' }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: '#4D7EFF', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
        🎙️ {label}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#93C5FD', lineHeight: 1.7 }}>TX: {tx}</div>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#6EE7B7', lineHeight: 1.7, marginTop: 4 }}>RX: {rx}</div>
    </div>
  )
}

function StepCard({ step, phaseColor, states, onToggle, onStatus, onFinding, onMeasure }) {
  const st = states[step.id] || {}
  return (
    <div style={{
      marginBottom: 8, borderRadius: 10, border: `1px solid ${T.border}`,
      background: st.done ? T.greenL : T.tint2, overflow: 'hidden',
    }}>
      {/* Header row */}
      <div style={{ padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={{
          width: 22, height: 22, borderRadius: 6, background: phaseColor, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 800, color: '#fff', marginTop: 1,
        }}>{step.id.split('_').pop()}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.text, lineHeight: 1.4, marginBottom: 4 }}>{step.action}</div>
          <div style={{ fontSize: 11, color: T.sub, lineHeight: 1.5 }}>{step.detail}</div>
        </div>
        {/* Checkbox */}
        <div onClick={() => onToggle(step.id)} style={{
          width: 20, height: 20, borderRadius: 5, flexShrink: 0,
          border: `2px solid ${st.done ? T.green : T.border}`,
          background: st.done ? T.green : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          {st.done && <svg width="11" height="9" viewBox="0 0 11 9"><path d="M1 4.5L4 7.5L10 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
      </div>

      {/* ATC comm (inline) */}
      {step.atcComm && (
        <div style={{ padding: '0 12px 10px' }}>
          <ATCBox label="Radio Phraseology" tx={step.atcComm.tx} rx={step.atcComm.rx} />
        </div>
      )}

      {/* Measurements */}
      {step.measurements && step.measurements.length > 0 && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 6,
          padding: '0 12px 10px', borderTop: `1px solid ${T.border}`,
          paddingTop: 10,
        }}>
          {step.measurements.map(m => {
            const val = st.measurements?.[m.key] || ''
            const res = val ? evalResult(val, m.std) : null
            return (
              <div key={m.key} style={{
                background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: '8px 10px',
              }}>
                <div style={{ fontSize: 9, color: T.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, color: T.blue, marginBottom: 4 }}>
                  STD: {m.std} <span style={{ fontSize: 9, color: T.muted }}>[{m.icao}]</span>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    type="text"
                    value={val}
                    placeholder="Measured value"
                    onChange={e => onMeasure(step.id, m.key, e.target.value)}
                    style={{
                      width: 80, padding: '5px 8px', border: `1.5px solid ${T.border}`, borderRadius: 6,
                      fontSize: 12, fontFamily: 'monospace', fontWeight: 500, color: T.navy,
                      background: '#fff', outline: 'none',
                    }}
                  />
                  <span style={{ fontSize: 10, color: T.muted, fontWeight: 600 }}>{m.unit}</span>
                  {res && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6,
                      background: res === 'pass' ? T.pass : T.fail,
                      color: res === 'pass' ? T.green : T.red,
                    }}>{res === 'pass' ? 'PASS' : 'FAIL'}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Status buttons */}
      {step.status && (
        <div style={{ display: 'flex', gap: 6, padding: '0 12px 10px', borderTop: `1px solid ${T.border}`, paddingTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: T.muted, fontWeight: 600 }}>Result:</span>
          {['pass','fail','na'].map(s => (
            <button key={s} onClick={() => onStatus(step.id, s)} style={{
              padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer',
              border: `1.5px solid ${st.status === s
                ? s === 'pass' ? '#6EE7B7' : s === 'fail' ? '#FCA5A5' : '#D1D5DB'
                : T.border}`,
              background: st.status === s
                ? s === 'pass' ? T.pass : s === 'fail' ? T.fail : T.na
                : T.surface,
              color: st.status === s
                ? s === 'pass' ? T.green : s === 'fail' ? T.red : '#6B7280'
                : T.muted,
            }}>{s.toUpperCase()}</button>
          ))}
        </div>
      )}

      {/* Finding textarea */}
      {step.finding && (
        <div style={{ padding: '0 12px 10px', borderTop: `1px solid ${T.border}`, paddingTop: 6 }}>
          <textarea
            value={st.finding || ''}
            placeholder="Finding / Notes (optional)"
            rows={1}
            onChange={e => onFinding(step.id, e.target.value)}
            style={{
              width: '100%', padding: '7px 10px', border: `1.5px solid ${T.border}`, borderRadius: 8,
              fontSize: 11, color: T.navy, background: '#fff', fontFamily: 'inherit',
              outline: 'none', resize: 'vertical', boxSizing: 'border-box',
            }}
          />
        </div>
      )}
    </div>
  )
}

function ChecklistBlock({ cl, states, dispatch }) {
  const allSteps = cl.phases.flatMap(p => p.steps)
  const doneCount = allSteps.filter(s => states[s.id]?.done).length
  const failCount = allSteps.filter(s => states[s.id]?.status === 'fail').length
  const progress = allSteps.length ? Math.round((doneCount / allSteps.length) * 100) : 0

  function signOff() {
    const incomplete = allSteps.filter(s => !states[s.id]?.done).length
    alert(`Sign-off: ${cl.name}\n✓ ${doneCount} complete · ✗ ${failCount} fail${incomplete > 0 ? `\n⚠️ ${incomplete} steps not yet marked complete` : '\nAll steps complete — report submitted.'}`)
  }

  return (
    <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, marginBottom: 14, overflow: 'hidden' }}>
      {/* Checklist header */}
      <div style={{ padding: '16px 18px 0' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: cl.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
            {cl.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Georgia,serif', fontSize: 17, color: T.navy, marginBottom: 3 }}>{cl.name}</div>
            <div style={{ fontSize: 11, color: T.muted }}>{cl.sub}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
          {cl.pills.map((p, i) => (
            <span key={i} style={{ padding: '3px 9px', borderRadius: 12, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: p.bg, color: p.color }}>
              {p.text}
            </span>
          ))}
        </div>
      </div>

      {/* ATC entry comm */}
      {cl.atcEntry && (
        <div style={{ margin: '0 18px 14px' }}>
          <ATCBox label={cl.atcEntry.label} tx={cl.atcEntry.tx} rx={cl.atcEntry.rx} />
        </div>
      )}

      {/* Progress bar */}
      <div style={{ margin: '0 18px' }}>
        <ProgBar value={progress} color={cl.color} />
      </div>

      {/* Phases */}
      {cl.phases.map((ph, pi) => (
        <div key={pi} style={{ borderTop: `1px solid ${T.border}`, padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: ph.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>{pi + 1}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: T.navy }}>{ph.icon} {ph.title}</div>
          </div>
          <div style={{ fontSize: 10, color: T.muted, marginBottom: 10, paddingLeft: 32 }}>{ph.meta}</div>
          {ph.steps.map(step => (
            <StepCard
              key={step.id}
              step={step}
              phaseColor={ph.color}
              states={states}
              onToggle={id => dispatch({ type: 'toggle', id })}
              onStatus={(id, s) => dispatch({ type: 'status', id, s })}
              onFinding={(id, v) => dispatch({ type: 'finding', id, v })}
              onMeasure={(id, key, v) => dispatch({ type: 'measure', id, key, v })}
            />
          ))}
        </div>
      ))}

      {/* Summary */}
      <div style={{
        padding: '12px 18px', borderTop: `1px solid ${T.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8,
      }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: cl.color }}>{doneCount} / {allSteps.length} complete</span>
          {failCount > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: T.red }}>{failCount} fail</span>}
        </div>
        <button onClick={signOff} style={{
          padding: '8px 16px', borderRadius: 10, border: 'none', fontSize: 12, fontWeight: 700,
          cursor: 'pointer', background: cl.color, color: '#fff',
        }}>✍️ Sign & Submit Report</button>
      </div>
    </div>
  )
}

function stateReducer(state, action) {
  const prev = state[action.id] || {}
  switch (action.type) {
    case 'toggle':
      return { ...state, [action.id]: { ...prev, done: !prev.done } }
    case 'status':
      return { ...state, [action.id]: { ...prev, status: prev.status === action.s ? null : action.s } }
    case 'finding':
      return { ...state, [action.id]: { ...prev, finding: action.v } }
    case 'measure':
      return { ...state, [action.id]: { ...prev, measurements: { ...prev.measurements, [action.key]: action.v } } }
    default:
      return state
  }
}

export default function ChecklistApp() {
  const [activeSection, setActiveSection] = useState(sections[0])
  const [states, dispatch] = useState({})

  const dispatchFn = useCallback((action) => {
    dispatch(prev => stateReducer(prev, action))
  }, [])

  const visible = CHECKLISTS.filter(c => c.section === activeSection)

  return (
    <div style={{ fontFamily: "'Outfit','DM Sans',sans-serif", background: T.tint2, minHeight: '100vh', color: T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Hero */}
      <div style={{ background: T.navy, color: '#fff', padding: '20px 16px 18px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 18,
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
          fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.8)',
          textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10,
        }}>🔧 Operational Level — Ground Team Use</div>
        <div style={{ fontFamily: 'Georgia,serif', fontSize: 20, lineHeight: 1.2, marginBottom: 6 }}>
          Step-by-step checklists. <em style={{ color: '#93C5FD' }}>Exact values. Real measurements.</em>
        </div>
        <div style={{ fontSize: 11, opacity: 0.6, lineHeight: 1.7 }}>
          Built from Annex 14, Annex 17, Annex 19 + DGCA India. Every check has the ICAO standard value, a field to record measurements, and ATC phraseology.
        </div>
      </div>

      {/* Section tabs */}
      <div style={{
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        padding: '8px 14px', display: 'flex', gap: 4, overflowX: 'auto',
      }}>
        {sections.map(sec => (
          <button key={sec} onClick={() => setActiveSection(sec)} style={{
            padding: '6px 14px', borderRadius: 18, fontSize: 11, fontWeight: 700,
            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            background: activeSection === sec ? T.blue : 'transparent',
            color: activeSection === sec ? '#fff' : T.sub,
          }}>{sec}</button>
        ))}
      </div>

      {/* Checklists */}
      <div style={{ padding: '14px 14px 56px' }}>
        {visible.map(cl => (
          <ChecklistBlock
            key={cl.id}
            cl={cl}
            states={states}
            dispatch={dispatchFn}
          />
        ))}
      </div>
    </div>
  )
}
