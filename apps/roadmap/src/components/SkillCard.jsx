import { CATEGORY_CLASS, STATUS_LABELS, nextStatus } from '../data/roadmap'

export default function SkillCard({
  skill,
  status,
  selected,
  onSelect,
  onCycleStatus,
}) {
  const categoryClass = CATEGORY_CLASS[skill.category] ?? 'cat-tools'

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(skill.id)
    }
  }

  return (
    <article
      className={`skill-card is-${status}${selected ? ' is-selected' : ''}`}
      onClick={() => onSelect(skill.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={selected}
      aria-label={`${skill.name}. ${STATUS_LABELS[status]}. Open study details.`}
    >
      <div className="skill-card-top">
        <span className={`skill-category ${categoryClass}`}>{skill.category}</span>
        <button
          type="button"
          className={`status-chip status-chip-${status}`}
          onClick={(event) => {
            event.stopPropagation()
            onCycleStatus(skill.id)
          }}
          aria-label={`${skill.name} is ${STATUS_LABELS[status]}. Mark as ${STATUS_LABELS[nextStatus(status)]}.`}
        >
          <span className="status-pip" aria-hidden="true" />
          {STATUS_LABELS[status]}
        </button>
      </div>
      <h3 className="skill-name">{skill.name}</h3>
      <p className="skill-desc">{skill.summary}</p>
    </article>
  )
}
