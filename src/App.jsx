import { useState } from 'react'
import { LIGHT, DARK } from './themes.js'
import Landing from './pages/Landing.jsx'
import RoadmapApp from './components/RoadmapApp.jsx'
import AviationApp from './components/AviationApp.jsx'
import ChecklistApp from './components/ChecklistApp.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'

function BackBar({ title, subtitle, onBack, dark, onToggleDark }) {
  const T = dark ? DARK : LIGHT
  return (
    <div className="backbar" style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: T.surface, borderBottom: `1px solid ${T.border}`,
      boxShadow: dark ? '0 1px 16px rgba(0,0,0,0.5)' : '0 1px 12px rgba(0,0,0,0.06)',
    }}>
      <button
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 20,
          background: 'transparent', border: `1px solid ${T.border}`,
          color: T.muted, fontSize: 12, fontWeight: 600, cursor: 'pointer',
          fontFamily: 'monospace',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = T.blue; e.currentTarget.style.color = T.blue }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted }}
      >← Back</button>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: 'monospace', letterSpacing: '0.02em' }}>{title}</div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          fontSize: 10, color: T.gold, background: T.goldL,
          padding: '3px 10px', borderRadius: 6, fontFamily: 'monospace',
          fontWeight: 700, border: `1px solid ${T.gold}33`,
        }}>{subtitle}</div>
        <button
          onClick={onToggleDark}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            border: `1px solid ${T.border}`, background: T.card,
            cursor: 'pointer', fontSize: 15,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >{dark ? '☀️' : '🌙'}</button>
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('home')
  const [isDark, setIsDark] = useState(false)
  const T = isDark ? DARK : LIGHT
  const toggleDark = () => setIsDark(d => !d)

  if (page === 'admin') return (
    <div style={{ background: T.bg, minHeight: '100vh' }}>
      <BackBar title="ADMIN DASHBOARD" subtitle="COMPLIANCE HQ" onBack={() => setPage('home')} dark={isDark} onToggleDark={toggleDark} />
      <AdminDashboard dark={isDark} />
    </div>
  )

  if (page === 'roadmap') return (
    <div style={{ background: T.bg, minHeight: '100vh' }}>
      <BackBar title="PLATFORM VISION & ROADMAP" subtitle="INTERNAL BLUEPRINT" onBack={() => setPage('home')} dark={isDark} onToggleDark={toggleDark} />
      <RoadmapApp dark={isDark} />
    </div>
  )

  if (page === 'aviation') return (
    <div style={{ background: T.bg, minHeight: '100vh' }}>
      <BackBar title="AIRPORT COMPLIANCE DASHBOARD" subtitle="AVIATION DEMO" onBack={() => setPage('home')} dark={isDark} onToggleDark={toggleDark} />
      <AviationApp dark={isDark} />
    </div>
  )

  if (page === 'checklists') return (
    <div style={{ background: T.bg, minHeight: '100vh' }}>
      <BackBar title="AIRPORT OPERATIONAL CHECKLISTS" subtitle="GROUND TEAM" onBack={() => setPage('home')} dark={isDark} onToggleDark={toggleDark} />
      <ChecklistApp dark={isDark} />
    </div>
  )

  return (
    <Landing
      dark={isDark}
      onToggleDark={toggleDark}
      onViewRoadmap={() => setPage('roadmap')}
      onViewAviation={() => setPage('aviation')}
      onViewChecklists={() => setPage('checklists')}
      onViewAdmin={() => setPage('admin')}
    />
  )
}
