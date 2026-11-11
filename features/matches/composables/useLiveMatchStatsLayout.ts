import {
  createDefaultLiveMatchStatsLayout,
  normalizeLiveMatchStatsLayout,
} from '~/features/matches/live-stats/defaultLayout'
import {
  LIVE_MATCH_STATS_LAYOUT_STORAGE_KEY,
  type LiveMatchStatsLayout,
} from '~/features/matches/live-stats/types'

function cloneLayout(layout: LiveMatchStatsLayout): LiveMatchStatsLayout {
  return normalizeLiveMatchStatsLayout(
    JSON.parse(JSON.stringify(layout)) as LiveMatchStatsLayout,
  )
}

function isValidLayout(value: unknown): value is LiveMatchStatsLayout {
  if (!value || typeof value !== 'object') return false
  const layout = value as LiveMatchStatsLayout
  return layout.version === 1
    && !!layout.canvas
    && typeof layout.background === 'string'
    && !!layout.logo
    && !!layout.team1Logo
    && !!layout.team2Logo
    && Array.isArray(layout.rows)
}

export function useLiveMatchStatsLayout() {
  const layout = useState<LiveMatchStatsLayout>('live-match-stats-layout', () =>
    createDefaultLiveMatchStatsLayout(),
  )
  const hasSavedLayout = useState<boolean>('live-match-stats-layout-saved', () => false)

  function loadFromStorage() {
    if (!import.meta.client) return false
    try {
      const raw = localStorage.getItem(LIVE_MATCH_STATS_LAYOUT_STORAGE_KEY)
      if (!raw) return false
      const parsed = JSON.parse(raw) as unknown
      if (!isValidLayout(parsed)) return false
      layout.value = cloneLayout(parsed)
      hasSavedLayout.value = true
      return true
    }
    catch {
      return false
    }
  }

  function saveToStorage(next: LiveMatchStatsLayout = layout.value) {
    if (!import.meta.client) return false
    try {
      const cloned = cloneLayout(next)
      localStorage.setItem(LIVE_MATCH_STATS_LAYOUT_STORAGE_KEY, JSON.stringify(cloned))
      layout.value = cloned
      hasSavedLayout.value = true
      return true
    }
    catch {
      return false
    }
  }

  function resetToDefault() {
    layout.value = createDefaultLiveMatchStatsLayout()
    hasSavedLayout.value = false
    if (!import.meta.client) return
    localStorage.removeItem(LIVE_MATCH_STATS_LAYOUT_STORAGE_KEY)
  }

  function exportJson() {
    return JSON.stringify(layout.value, null, 2)
  }

  function importJson(raw: string) {
    const parsed = JSON.parse(raw) as unknown
    if (!isValidLayout(parsed)) {
      throw new Error('Invalid live match stats layout JSON')
    }
    layout.value = cloneLayout(parsed)
    return saveToStorage(layout.value)
  }

  function onStorage(event: StorageEvent) {
    if (event.key !== LIVE_MATCH_STATS_LAYOUT_STORAGE_KEY) return
    loadFromStorage()
  }

  onMounted(() => {
    loadFromStorage()
    window.addEventListener('storage', onStorage)
  })

  onBeforeUnmount(() => {
    if (!import.meta.client) return
    window.removeEventListener('storage', onStorage)
  })

  return {
    layout,
    hasSavedLayout,
    loadFromStorage,
    saveToStorage,
    resetToDefault,
    exportJson,
    importJson,
  }
}
