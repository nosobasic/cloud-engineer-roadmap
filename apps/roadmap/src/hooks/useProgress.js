import { useCallback, useEffect, useState } from 'react'
import { defaultStatuses, nextStatus } from '../data/roadmap'

const STORAGE_KEY = 'roadmap-progress-v1'

function loadStatuses() {
  const defaults = defaultStatuses()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    const saved = JSON.parse(raw)
    if (!saved || typeof saved !== 'object') return defaults
    return { ...defaults, ...saved }
  } catch {
    return defaults
  }
}

export function useProgress() {
  const [statuses, setStatuses] = useState(loadStatuses)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses))
  }, [statuses])

  const cycleStatus = useCallback((id) => {
    setStatuses((prev) => ({
      ...prev,
      [id]: nextStatus(prev[id]),
    }))
  }, [])

  return { statuses, cycleStatus }
}
