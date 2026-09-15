import { phaseBadge, phaseCounts } from '../data/roadmap'
import SkillCard from './SkillCard'

export default function Phase({
  phase,
  statuses,
  selectedId,
  onSelect,
  onCycleStatus,
}) {
  const badge = phaseBadge(phase, statuses)
  const { done, total, percent } = phaseCounts(phase, statuses)

  return (
    <section className="phase" id={phase.id}>
      <div className="phase-header">
        <div className="phase-number">{phase.number}</div>
        <div className="phase-title-block">
          <div className="phase-status-row">
            <div className={`phase-status ${badge.className}`}>{badge.label}</div>
            <div className="phase-count">
              {done}/{total} done
            </div>
          </div>
          <h2 className="phase-title">{phase.title}</h2>
          <div className="phase-subtitle">{phase.subtitle}</div>
          <div
            className={`phase-progress${done === total ? ' is-complete' : ''}`}
            aria-hidden="true"
          >
            <div className="phase-progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
      <div className="phase-salary">
        <div>
          <div className="salary-label">Target salary · NYC</div>
          <div className="salary-range">{phase.salaryRange}</div>
          <div className="salary-location">{phase.location}</div>
        </div>
        <div className="salary-jump">{phase.jump}</div>
      </div>
      <div className="skills-grid">
        {phase.skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            status={statuses[skill.id]}
            selected={selectedId === skill.id}
            onSelect={onSelect}
            onCycleStatus={onCycleStatus}
            readOnly={!onCycleStatus}
          />
        ))}
      </div>
      <div className="roles-row">
        {phase.roles.map((role) => (
          <div key={role} className="role-tag">
            {role}
          </div>
        ))}
      </div>
    </section>
  )
}
