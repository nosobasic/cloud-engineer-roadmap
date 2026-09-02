import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { PHASES, findSkill } from './data/roadmap'
import { useProgress } from './hooks/useProgress'
import Hero from './components/Hero'
import Phase from './components/Phase'
import CardDetail from './components/CardDetail'

function App() {
  const { statuses, cycleStatus } = useProgress()
  const [selectedId, setSelectedId] = useState(null)

  const selected = useMemo(
    () => (selectedId ? findSkill(selectedId) : null),
    [selectedId],
  )

  const closeDetail = useCallback(() => {
    setSelectedId(null)
  }, [])

  return (
    <div className={`roadmap${selectedId ? ' has-drawer' : ''}`}>
      <Hero statuses={statuses} />

      <main className="container">
        {PHASES.map((phase) => (
          <Phase
            key={phase.id}
            phase={phase}
            statuses={statuses}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onCycleStatus={cycleStatus}
          />
        ))}
      </main>

      <footer className="footer">
        <div className="footer-brand">WILLIS EMPIRE GROUP · CLOUD DIVISION</div>
        <div className="footer-note">
          No degree required. Every dollar on this roadmap is earned through
          certifications, real projects, and healthcare IT expertise nobody can
          replicate in a classroom.
        </div>
      </footer>

      {selected && (
        <CardDetail
          skill={selected.skill}
          phase={selected.phase}
          status={statuses[selected.skill.id]}
          onClose={closeDetail}
          onCycleStatus={cycleStatus}
        />
      )}
    </div>
  )
}

export default App
