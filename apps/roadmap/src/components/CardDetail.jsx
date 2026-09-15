import { useEffect, useRef } from 'react'
import {
  CATEGORY_CLASS,
  STATUS_LABELS,
  nextStatus,
} from '../data/roadmap'

export default function CardDetail({
  skill,
  phase,
  status,
  onClose,
  onCycleStatus,
  readOnly = false,
}) {
  const closeRef = useRef(null)
  const categoryClass = CATEGORY_CLASS[skill.category] ?? 'cat-tools'

  useEffect(() => {
    closeRef.current?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('drawer-open')
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('drawer-open')
    }
  }, [skill.id, onClose])

  return (
    <div className="drawer-root">
      <button
        type="button"
        className="drawer-overlay"
        aria-label="Close details"
        onClick={onClose}
      />
      <aside className="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <div className="drawer-header">
          <div>
            <div className={`skill-category ${categoryClass}`}>{skill.category}</div>
            <p className="drawer-phase">
              Phase {phase.number} · {phase.shortLabel}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="drawer-close"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <h2 id="drawer-title" className="drawer-title">
          {skill.name}
        </h2>
        <p className="drawer-summary">{skill.summary}</p>
        {readOnly ? (
          <div className={`status-chip status-chip-${status} drawer-status is-static`}>
            <span className="status-pip" aria-hidden="true" />
            {STATUS_LABELS[status]}
          </div>
        ) : (
          <button
            type="button"
            className={`status-chip status-chip-${status} drawer-status`}
            onClick={() => onCycleStatus(skill.id)}
            aria-label={`${skill.name} is ${STATUS_LABELS[status]}. Mark as ${STATUS_LABELS[nextStatus(status)]}.`}
          >
            <span className="status-pip" aria-hidden="true" />
            {STATUS_LABELS[status]} — click to cycle
          </button>
        )}

        <section className="drawer-section">
          <h3>Study notes</h3>
          <p>{skill.notes}</p>
        </section>

        <section className="drawer-section">
          <h3>Resources</h3>
          <ul className="drawer-list">
            {skill.resources.map((resource) => (
              <li key={resource.href}>
                <a href={resource.href} target="_blank" rel="noreferrer">
                  {resource.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="drawer-section">
          <h3>{skill.category === 'Project' ? 'Build steps' : 'Practice'}</h3>
          <ul className="drawer-actions">
            {skill.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  )
}
