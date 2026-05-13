import { useState } from 'react'
import Landing from './pages/Landing.jsx'
import RoadmapApp from './components/RoadmapApp.jsx'
import AviationApp from './components/AviationApp.jsx'
import ChecklistApp from './components/ChecklistApp.jsx'

const T = { blue: '#1A56DB', navy: '#0D2B6E', border: '#D6E0FF', surface: '#FFFFFF', muted: '#7A90BF', teal: '#0891B2' }

function BackBar({ title, subtitle, onBack }) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: T.surface, borderBottom: `1px solid ${T.border}`,
      padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12,
      boxShadow: '0 1px 8px rgba(26,86,219,0.08)',
    }}>
      <button
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 20,
          background: 'transparent', border: `1px solid ${T.border}`,
          color: T.muted, fontSize: 12, fontWeight: 600, cursor: 'pointer',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = T.blue; e.currentTarget.style.color = T.blue }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted }}
      >
        ← Home
      </button>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{title}</div>
      <div style={{ marginLeft: 'auto', fontSize: 10, color: T.muted, background: '#F0F4FF', padding: '3px 10px', borderRadius: 20 }}>
        {subtitle}
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('home')

  if (page === 'roadmap') {
    return (
      <div>
        <BackBar title="Platform Vision & Roadmap" subtitle="Internal Blueprint" onBack={() => setPage('home')} />
        <RoadmapApp />
      </div>
    )
  }

  if (page === 'aviation') {
    return (
      <div>
        <BackBar title="Airport Compliance Dashboard" subtitle="Aviation Demo" onBack={() => setPage('home')} />
        <AviationApp />
      </div>
    )
  }

  if (page === 'checklists') {
    return (
      <div>
        <BackBar title="Airport Operational Checklists" subtitle="Ground Team Tool" onBack={() => setPage('home')} />
        <ChecklistApp />
      </div>
    )
  }

  return <Landing onViewRoadmap={() => setPage('roadmap')} onViewAviation={() => setPage('aviation')} onViewChecklists={() => setPage('checklists')} />
}
