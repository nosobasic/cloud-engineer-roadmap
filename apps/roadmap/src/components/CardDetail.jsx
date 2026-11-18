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
  returnFocusRef,
  fallbackFocusRef,
  readOnly = false,
}) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)
  const categoryClass = CATEGORY_CLASS[skill.category] ?? 'cat-tools'

  useEffect(() => {
    const panel = panelRef.current
    const returnFocusTo = returnFocusRef?.current
    const fallbackFocusTo = fallbackFocusRef?.current
    closeRef.current?.focus()

    function focusableElements() {
      return [...panel.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
        .filter((element) => element.tabIndex >= 0 && !element.disabled && element.getClientRects().length > 0)
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      } else if (event.key === 'Tab') {
        const elements = focusableElements()
        const first = elements[0] ?? panel
        const last = elements.at(-1) ?? panel
        if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    function onFocusIn(event) {
      if (!panel.contains(event.target)) closeRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)
    document.body.classList.add('drawer-open')
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
      document.body.classList.remove('drawer-open')
      const target = returnFocusTo?.isConnected ? returnFocusTo : fallbackFocusTo
      target?.focus({ preventScroll: true })
    }
  }, [skill.id, onClose, returnFocusRef, fallbackFocusRef])

  return (
    <div className="drawer-root">
      <button
        type="button"
        className="drawer-overlay"
        tabIndex={-1}
        aria-hidden="true"
        aria-label="Close details"
        onClick={onClose}
      />
      <aside ref={panelRef} tabIndex={-1} className="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
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
