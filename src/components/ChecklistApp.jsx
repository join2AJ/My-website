import { useState, useCallback } from 'react'
import { LIGHT, DARK } from '../themes.js'
import { CHECKLISTS } from '../data/checklistData.js'

let T = {
  ...DARK,
  sky: DARK.blueM, tint: DARK.blueL, tint2: DARK.bg,
  border2: '#2A4A7A', pass: DARK.greenL, fail: DARK.redL, na: '#111E30',
}

const sections = [...new Set(CHECKLISTS.map(c => c.section))]

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
    <div style={{ margin: '0 0 14px', padding: '12px 14px', borderRadius: 10, background: T.card, border: `1px solid ${T.border}` }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: T.sky, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6, fontFamily: 'monospace' }}>
        🎙️ {label}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: T.blueM, lineHeight: 1.7 }}>TX: {tx}</div>
      <div style={{ fontFamily: 'monospace', fontSize: 11, color: T.green, lineHeight: 1.7, marginTop: 4 }}>RX: {rx}</div>
    </div>
  )
}

function StepCard({ step, phaseColor, states, onToggle, onStatus, onFinding, onMeasure }) {
  const st = states[step.id] || {}
  return (
    <div style={{
      marginBottom: 8, borderRadius: 10, border: `1px solid ${T.border}`,
      background: st.done ? T.pass : T.surface, overflow: 'hidden',
    }}>
      {/* Header row */}
      <div style={{ padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={{
          width: 22, height: 22, borderRadius: 6, background: phaseColor, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 800, color: '#fff', marginTop: 1, fontFamily: 'monospace',
        }}>{step.id.split('_').pop()}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.text, lineHeight: 1.4, marginBottom: 4 }}>{step.action}</div>
          <div style={{ fontSize: 11, color: T.sub, lineHeight: 1.5 }}>{step.detail}</div>
        </div>
        {/* Checkbox */}
        <div onClick={() => onToggle(step.id)} style={{
          width: 20, height: 20, borderRadius: 5, flexShrink: 0,
          border: `2px solid ${st.done ? T.green : T.border}`,
          background: st.done ? T.green : T.tint,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          {st.done && <svg width="11" height="9" viewBox="0 0 11 9"><path d="M1 4.5L4 7.5L10 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
      </div>

      {/* ATC comm */}
      {step.atcComm && (
        <div style={{ padding: '0 12px 10px' }}>
          <ATCBox label="Radio Phraseology" tx={step.atcComm.tx} rx={step.atcComm.rx} />
        </div>
      )}

      {/* Measurements */}
      {step.measurements && step.measurements.length > 0 && (
        <div className="measure-grid" style={{
          padding: '0 12px 10px', borderTop: `1px solid ${T.border}`,
          paddingTop: 10,
        }}>
          {step.measurements.map(m => {
            const val = st.measurements?.[m.key] || ''
            const res = val ? evalResult(val, m.std) : null
            return (
              <div key={m.key} style={{
                background: T.card, border: `1px solid ${T.border}`, borderRadius: 8, padding: '8px 10px',
              }}>
                <div style={{ fontSize: 9, color: T.muted, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, fontFamily: 'monospace' }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: 11, color: T.sky, marginBottom: 4 }}>
                  STD: {m.std} <span style={{ fontSize: 9, color: T.muted }}>[{m.icao}]</span>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <input
                    type="text"
                    value={val}
                    placeholder="Measured"
                    onChange={e => onMeasure(step.id, m.key, e.target.value)}
                    style={{
                      width: 80, padding: '5px 8px', border: `1.5px solid ${T.border}`, borderRadius: 6,
                      fontSize: 12, fontFamily: 'monospace', fontWeight: 500, color: T.text,
                      background: T.surface, outline: 'none',
                    }}
                  />
                  <span style={{ fontSize: 10, color: T.muted, fontWeight: 600, fontFamily: 'monospace' }}>{m.unit}</span>
                  {res && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6,
                      background: res === 'pass' ? T.pass : T.fail,
                      color: res === 'pass' ? T.green : T.red,
                      fontFamily: 'monospace',
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
          <span style={{ fontSize: 10, color: T.muted, fontWeight: 600, fontFamily: 'monospace' }}>RESULT:</span>
          {['pass','fail','na'].map(s => (
            <button key={s} onClick={() => onStatus(step.id, s)} style={{
              padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'monospace',
              border: `1.5px solid ${st.status === s
                ? s === 'pass' ? T.green : s === 'fail' ? T.red : T.muted
                : T.border}`,
              background: st.status === s
                ? s === 'pass' ? T.pass : s === 'fail' ? T.fail : T.na
                : T.surface,
              color: st.status === s
                ? s === 'pass' ? T.green : s === 'fail' ? T.red : T.muted
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
              fontSize: 11, color: T.text, background: T.card, fontFamily: 'inherit',
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
            <div style={{ fontFamily: 'monospace', fontSize: 16, color: T.text, marginBottom: 3, fontWeight: 700, letterSpacing: '0.01em' }}>{cl.name}</div>
            <div style={{ fontSize: 11, color: T.muted }}>{cl.sub}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
          {cl.pills.map((p, i) => (
            <span key={i} style={{ padding: '3px 9px', borderRadius: 8, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: p.bg, color: p.color, fontFamily: 'monospace' }}>
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
            <div style={{ width: 24, height: 24, borderRadius: 6, background: ph.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0, fontFamily: 'monospace', fontWeight: 800 }}>{pi + 1}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: T.text, fontFamily: 'monospace' }}>{ph.icon} {ph.title}</div>
          </div>
          <div style={{ fontSize: 10, color: T.muted, marginBottom: 10, paddingLeft: 32, fontFamily: 'monospace' }}>{ph.meta}</div>
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
          <span style={{ fontSize: 11, fontWeight: 700, color: cl.color, fontFamily: 'monospace' }}>{doneCount} / {allSteps.length} COMPLETE</span>
          {failCount > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: T.red, fontFamily: 'monospace' }}>{failCount} FAIL</span>}
        </div>
        <button onClick={signOff} style={{
          padding: '8px 16px', borderRadius: 10, border: 'none', fontSize: 12, fontWeight: 700,
          cursor: 'pointer', background: cl.color, color: '#fff', fontFamily: 'monospace',
        }}>✍️ SIGN & SUBMIT</button>
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

export default function ChecklistApp({ dark = false }) {
  const theme = dark ? DARK : LIGHT
  T = {
    ...theme,
    sky: theme.blueM,
    tint: theme.blueL,
    tint2: theme.bg,
    border2: dark ? '#2A4A7A' : '#C3D4E8',
    pass: theme.greenL,
    fail: theme.redL,
    na: dark ? '#111E30' : theme.card,
  }

  const [activeSection, setActiveSection] = useState(sections[0])
  const [states, dispatch] = useState({})

  const dispatchFn = useCallback((action) => {
    dispatch(prev => stateReducer(prev, action))
  }, [])

  const visible = CHECKLISTS.filter(c => c.section === activeSection)

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans','DM Sans',sans-serif", background: T.bg, minHeight: '100vh', color: T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Hero */}
      <div className="chk-hero" style={{ background: dark ? '#040C18' : T.surface, borderBottom: `1px solid ${T.border}` }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 8,
          background: T.blueL, border: `1px solid ${T.blue}33`,
          fontSize: 10, fontWeight: 700, color: T.blue,
          textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, fontFamily: 'monospace',
        }}>🔧 OPERATIONAL LEVEL — GROUND TEAM USE</div>
        <div style={{ fontFamily: 'monospace', fontSize: 18, lineHeight: 1.2, marginBottom: 6, color: T.text, fontWeight: 700 }}>
          Step-by-step checklists. <span style={{ color: T.blueM }}>Exact values. Real measurements.</span>
        </div>
        <div style={{ fontSize: 11, color: T.muted, lineHeight: 1.7, fontFamily: 'monospace' }}>
          Built from Annex 14, Annex 17, Annex 19 + DGCA India. Every check has the ICAO standard value, a field to record measurements, and ATC phraseology.
        </div>
      </div>

      {/* Section tabs */}
      <div className="chk-tabs" style={{
        background: T.surface, borderBottom: `1px solid ${T.border}`,
      }}>
        {sections.map(sec => (
          <button key={sec} onClick={() => setActiveSection(sec)} style={{
            padding: '6px 14px', borderRadius: 8, fontSize: 11, fontWeight: 700,
            border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'monospace',
            background: activeSection === sec ? T.blue : 'transparent',
            color: activeSection === sec ? '#fff' : T.sub,
          }}>{sec}</button>
        ))}
      </div>

      {/* Checklists */}
      <div className="chk-page">
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
