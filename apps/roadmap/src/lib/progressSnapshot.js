import {
  PHASES,
  computeProgress,
  defaultStatuses,
  phaseCounts,
} from '../data/roadmap.js'

export function buildProgressSnapshot(statuses) {
  const merged = { ...defaultStatuses(), ...statuses }
  const { done, total, percent, currentPhase } = computeProgress(merged)
  const currentIndex = PHASES.findIndex((phase) => phase.id === currentPhase.id)

  return {
    done,
    total,
    percent,
    currentPhaseId: currentPhase.id,
    phases: PHASES.map((phase, index) => {
      const { done: phaseDone, total: phaseTotal } = phaseCounts(phase, merged)
      let status = 'upcoming'
      if (phaseDone === phaseTotal) {
        status = 'complete'
      } else if (index === currentIndex) {
        status = 'current'
      }
      return {
        id: phase.id,
        number: phase.number,
        shortLabel: phase.shortLabel,
        status,
      }
    }),
    statuses: merged,
  }
}

export function downloadProgressSnapshot(statuses) {
  const snapshot = buildProgressSnapshot(statuses)
  const blob = new Blob([`${JSON.stringify(snapshot, null, 2)}\n`], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'progress.json'
  link.click()
  URL.revokeObjectURL(url)
}
