import { useState } from 'react'
import Landing from './pages/Landing.jsx'
import RoadmapApp from './components/RoadmapApp.jsx'

const T = { blue: '#1A56DB', navy: '#0D2B6E', border: '#D6E0FF', surface: '#FFFFFF', muted: '#7A90BF' }

export default function App() {
  const [page, setPage] = useState('home')

  if (page === 'roadmap') {
    return (
      <div>
        {/* Back bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: T.surface, borderBottom: `1px solid ${T.border}`,
          padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 1px 8px rgba(26,86,219,0.08)',
        }}>
          <button
            onClick={() => setPage('home')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 20,
              background: 'transparent', border: `1px solid ${T.border}`,
              color: T.muted, fontSize: 12, fontWeight: 600,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.blue; e.currentTarget.style.color = T.blue }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted }}
          >
            ← Home
          </button>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>Platform Vision & Roadmap</div>
          <div style={{ marginLeft: 'auto', fontSize: 10, color: T.muted, background: '#F0F4FF', padding: '3px 10px', borderRadius: 20 }}>
            Internal Blueprint
          </div>
        </div>
        <RoadmapApp />
      </div>
    )
  }

  return <Landing onViewRoadmap={() => setPage('roadmap')} />
}
