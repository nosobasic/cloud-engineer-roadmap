import { PHASES, computeProgress, phaseCounts } from '../data/roadmap'

export default function Hero({ statuses }) {
  const { done, remaining, percent, total, currentPhase } = computeProgress(statuses)

  return (
    <header className="hero">
      <div className="hero-eyebrow">
        Willis Empire Group · Cloud Engineering Roadmap 2025–2027
      </div>
      <h1 className="hero-name">
        Donte&apos;s
        <br />
        <span>Path to $170k+</span>
      </h1>
      <p className="hero-sub">
        AWS SAA certified · Healthcare IT · Epic EHR · Long Island, NY
        <br />
        Click a card to study it. Cycle the status chip to track progress — it
        saves in this browser.
      </p>
      <div className="hero-stats">
        <div className="stat">
          <div className="stat-value">
            {done}/{total}
          </div>
          <div className="stat-label">Skills done</div>
        </div>
        <div className="stat">
          <div className="stat-value">{remaining}</div>
          <div className="stat-label">Left to go</div>
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
          <div key={phase.id} className="tl-label">
            {phase.shortLabel}
          </div>
        ))}
      </div>
    </header>
  )
}
