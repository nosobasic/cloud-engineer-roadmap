import { useCallback, useMemo, useState } from 'react'
import './App.css'
import { PHASES, findSkill } from './data/roadmap'
import { useProgress } from './hooks/useProgress'
import Hero from './components/Hero'
import Phase from './components/Phase'
import CardDetail from './components/CardDetail'

const selectedWork = [
  {
    label: 'Infrastructure as code',
    title: 'AWS-hosted portfolio',
    description: 'This roadmap is a live static-site lab. Terraform defines the S3 and CloudFront setup, and GitHub Actions builds and publishes the site.',
    href: 'https://github.com/nosobasic/cloud-engineer-roadmap',
    link: 'View the repository',
  },
  {
    label: 'Product engineering',
    title: 'Revenue Ripple',
    description: 'An AI marketing and training platform I built and deployed. My work spans the React frontend, Supabase-backed features, and release verification.',
    href: 'https://www.revenueripple.org/',
    link: 'View Revenue Ripple',
  },
  {
    label: 'Professional experience',
    title: 'Healthcare IT deployment',
    description: 'I support endpoint and peripheral rollouts in clinical environments, verify device readiness, and help troubleshoot issues during Epic go-lives.',
  },
]

function App() {
  const { statuses, cycleStatus, exportProgress, readOnly } = useProgress()
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
      <Hero
        statuses={statuses}
        readOnly={readOnly}
        onExportProgress={exportProgress}
      />

      <main className="container">
        <section className="selected-work" id="projects" aria-labelledby="projects-title">
          <p className="section-kicker">Portfolio</p>
          <h2 id="projects-title" className="section-title">Selected work</h2>
          <div className="work-grid">
            {selectedWork.map((item) => (
              <article className="work-card" key={item.title}>
                <p className="section-kicker">{item.label}</p>
                <h3>{item.title}</h3>
                <p className="work-description">{item.description}</p>
                {item.href && <a href={item.href}>{item.link}</a>}
              </article>
            ))}
          </div>
        </section>

        <section className="roadmap-section" id="roadmap" aria-labelledby="roadmap-title">
          <p className="section-kicker">Professional development</p>
          <h2 id="roadmap-title" className="section-title">Cloud engineering roadmap</h2>
          <p className="roadmap-intro">Open a skill to see its notes, resources, and practice goals.</p>
          {PHASES.map((phase) => (
            <Phase
              key={phase.id}
              phase={phase}
              statuses={statuses}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onCycleStatus={readOnly ? undefined : cycleStatus}
            />
          ))}
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">WILLIS EMPIRE GROUP · CLOUD DIVISION</div>
        <div className="footer-note">
          Donte Willis · AWS infrastructure, cloud operations, and healthcare IT.
        </div>
      </footer>

      {selected && (
        <CardDetail
          skill={selected.skill}
          phase={selected.phase}
          status={statuses[selected.skill.id]}
          onClose={closeDetail}
          onCycleStatus={readOnly ? undefined : cycleStatus}
          readOnly={readOnly}
        />
      )}
    </div>
  )
}

export default App
