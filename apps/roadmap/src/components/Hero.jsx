import { PHASES, computeProgress, phaseCounts } from '../data/roadmap'

export default function Hero({ statuses, readOnly = false, onExportProgress }) {
  const { done, percent, total, currentPhase } = computeProgress(statuses)

  return (
    <header className="hero">
      <div className="hero-eyebrow">Donte Willis · Long Island, New York</div>
      <h1 className="hero-name">Cloud Engineering <span>Portfolio</span></h1>
      <p className="hero-sub">
        Healthcare IT deployment technician with hands-on experience building and deploying web applications.
        This portfolio shows my work in AWS and Terraform, and what I’m learning next in cloud operations.
      </p>
      <ul className="credential-list" aria-label="Earned certifications">
        <li>AWS Certified Solutions Architect – Associate</li>
        <li>HashiCorp Certified: Terraform Associate</li>
      </ul>
      <nav className="hero-links" aria-label="Portfolio sections">
        <a className="portfolio-link is-primary" href="#projects">View selected work</a>
        <a className="portfolio-link" href="#roadmap">Explore the roadmap</a>
      </nav>
      {!readOnly && onExportProgress ? (
        <button type="button" className="hero-export" onClick={onExportProgress}>
          Download progress.json
        </button>
      ) : null}
      <div className="hero-stats">
        <div className="stat">
          <div className="stat-value">
            {done}/{total}
          </div>
          <div className="stat-label">Skills done</div>
        </div>
        <div className="stat">
          <div className="stat-value">{currentPhase.shortLabel}</div>
          <div className="stat-label">Current focus</div>
        </div>
        <div className="stat">
          <div className="stat-value">{percent}%</div>
          <div className="stat-label">Complete</div>
        </div>
      </div>
      <div className="timeline-bar" aria-hidden="true">
        {PHASES.map((phase) => {
          const { percent: fill } = phaseCounts(phase, statuses)
          const isCurrent = phase.id === currentPhase.id
          return (
            <div
              key={phase.id}
              className={`timeline-segment${fill === 100 ? ' is-complete' : fill > 0 || isCurrent ? ' is-active' : ''}`}
            >
              <div className="timeline-fill" style={{ width: `${fill === 0 && isCurrent ? 18 : fill}%` }} />
            </div>
          )
        })}
      </div>
      <div className="timeline-labels">
        {PHASES.map((phase) => (
          <a key={phase.id} className="tl-label" href={`#${phase.id}`}>
            {phase.shortLabel}
          </a>
        ))}
      </div>
    </header>
  )
}
