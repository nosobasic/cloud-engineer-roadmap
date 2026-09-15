import { useCallback, useEffect, useState } from 'react'
import { defaultStatuses, nextStatus } from '../data/roadmap'
import { downloadProgressSnapshot } from '../lib/progressSnapshot.js'

const STORAGE_KEY = 'roadmap-progress-v1'
const isEditor = import.meta.env.DEV

function loadLocalStatuses() {
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
  const [statuses, setStatuses] = useState(() =>
    isEditor ? loadLocalStatuses() : defaultStatuses(),
  )

  useEffect(() => {
    if (isEditor) return undefined

    let cancelled = false
    fetch('/progress.json', { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (cancelled || !data?.statuses || typeof data.statuses !== 'object') {
          return
        }
        setStatuses({ ...defaultStatuses(), ...data.statuses })
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isEditor) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses))
  }, [statuses])

  const cycleStatus = useCallback((id) => {
    if (!isEditor) return
    setStatuses((prev) => ({
      ...prev,
      [id]: nextStatus(prev[id]),
    }))
  }, [])

  const exportProgress = useCallback(() => {
    downloadProgressSnapshot(statuses)
  }, [statuses])

  return {
    statuses,
    cycleStatus,
    exportProgress,
    readOnly: !isEditor,
  }
}
