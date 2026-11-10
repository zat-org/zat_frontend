import {
  createDefaultLiveTableLayout,
  normalizeLiveTableLayout,
} from '~/features/championships/live-table/defaultLayout'
import {
  LIVE_TABLE_LAYOUT_STORAGE_KEY,
  type LiveTableLayout,
} from '~/features/championships/live-table/types'
import ChampType from '~/features/championships/types/ChampType'

function cloneLayout(layout: LiveTableLayout): LiveTableLayout {
  return normalizeLiveTableLayout(JSON.parse(JSON.stringify(layout)) as LiveTableLayout)
}

function isValidLayout(value: unknown): value is LiveTableLayout {
  if (!value || typeof value !== 'object') return false
  const layout = value as LiveTableLayout
  return layout.version === 1
    && !!layout.canvas
    && typeof layout.background === 'string'
    && Array.isArray(layout.columns)
    && !!layout.logo
    && !!layout.headers
    && Array.isArray(layout.cells)
}

export function useLiveTableLayout(champType?: MaybeRefOrGetter<ChampType | null | undefined>) {
  const resolvedType = computed(() => {
    const raw = toValue(champType)
    return raw === ChampType.HEZAM ? ChampType.HEZAM : ChampType.LEAGUE
  })

  const layout = useState<LiveTableLayout>('live-table-layout', () =>
    createDefaultLiveTableLayout(ChampType.LEAGUE),
  )
  const hasSavedLayout = useState<boolean>('live-table-layout-saved', () => false)

  function loadFromStorage() {
    if (!import.meta.client) return false
    try {
      const raw = localStorage.getItem(LIVE_TABLE_LAYOUT_STORAGE_KEY)
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

  function saveToStorage(next: LiveTableLayout = layout.value) {
    if (!import.meta.client) return false
    try {
      const cloned = cloneLayout(next)
      localStorage.setItem(LIVE_TABLE_LAYOUT_STORAGE_KEY, JSON.stringify(cloned))
      layout.value = cloned
      hasSavedLayout.value = true
      return true
    }
    catch {
      return false
    }
  }

  function resetToDefault() {
    layout.value = createDefaultLiveTableLayout(resolvedType.value)
    hasSavedLayout.value = false
    if (!import.meta.client) return
    localStorage.removeItem(LIVE_TABLE_LAYOUT_STORAGE_KEY)
  }

  function exportJson() {
    return JSON.stringify(layout.value, null, 2)
  }

  function importJson(raw: string) {
    const parsed = JSON.parse(raw) as unknown
    if (!isValidLayout(parsed)) {
      throw new Error('Invalid live table layout JSON')
    }
    layout.value = cloneLayout(parsed)
    return saveToStorage(layout.value)
  }

  function onStorage(event: StorageEvent) {
    if (event.key !== LIVE_TABLE_LAYOUT_STORAGE_KEY) return
    loadFromStorage()
  }

  watch(
    resolvedType,
    (type) => {
      if (hasSavedLayout.value) return
      layout.value = createDefaultLiveTableLayout(type)
    },
  )

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
