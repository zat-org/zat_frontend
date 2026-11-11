import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'

type TeamStatsSlice = Partial<IMatchFullDetails['team1']> & {
  statistics?: IMatchFullDetails['team1']['statistics']
}

function resolveApiBaseUrl() {
  const config = useRuntimeConfig()
  const base = (config.public.apiBaseUrl || config.public.strapi?.url || '') as string
  return base.replace(/\/+$/, '')
}

function unwrapPayload(raw: unknown): unknown {
  if (!raw || typeof raw !== 'object') return raw
  const obj = raw as Record<string, unknown>
  if (obj.data && typeof obj.data === 'object') return obj.data
  if (obj.match && typeof obj.match === 'object') return obj.match
  return raw
}

function looksLikeFullMatch(value: unknown): value is IMatchFullDetails {
  if (!value || typeof value !== 'object') return false
  const obj = value as Record<string, unknown>
  return obj.id != null && (obj.team1 != null || obj.team2 != null)
}

/**
 * Live match details: load GET /api/match/getById/:id first (statistics snapshot),
 * then listen to SSE at /api/match/getById/:id/live for updates.
 */
export function useMatchLive(
  matchId: MaybeRefOrGetter<number | string | null | undefined>,
) {
  const { $api } = useNuxtApp()

  const match = ref<IMatchFullDetails | null>(null)
  const isConnected = ref(false)
  const isReconnecting = ref(false)
  const error = ref<string | null>(null)
  const pending = ref(true)

  const resolvedMatchId = computed(() => {
    const raw = toValue(matchId)
    if (raw === null || raw === undefined || raw === '') return null
    return String(raw)
  })

  let eventSource: EventSource | null = null
  let intentionalClose = false
  let activeRequestId = 0

  function mergeTeam(
    current: IMatchFullDetails['team1'],
    incoming: TeamStatsSlice | null | undefined,
  ): IMatchFullDetails['team1'] {
    if (!incoming || typeof incoming !== 'object') return current
    return {
      ...current,
      ...incoming,
      statistics: Array.isArray(incoming.statistics)
        ? incoming.statistics
        : current.statistics,
    }
  }

  function applyMatchPayload(raw: unknown) {
    const payload = unwrapPayload(raw)
    if (!payload || typeof payload !== 'object') return false

    if (looksLikeFullMatch(payload)) {
      match.value = payload
      isConnected.value = true
      isReconnecting.value = false
      error.value = null
      pending.value = false
      return true
    }

    // Partial SSE: merge statistics / team fields into the REST snapshot.
    if (!match.value) return false
    const partial = payload as {
      team1?: TeamStatsSlice
      team2?: TeamStatsSlice
      statistics?: unknown
      state?: IMatchFullDetails['state']
      score?: number
    }

    match.value = {
      ...match.value,
      ...(partial.state != null ? { state: partial.state } : {}),
      team1: mergeTeam(match.value.team1, partial.team1),
      team2: mergeTeam(match.value.team2, partial.team2),
    }
    isConnected.value = true
    isReconnecting.value = false
    error.value = null
    pending.value = false
    return true
  }

  function parseMatchEvent(raw: string) {
    try {
      applyMatchPayload(JSON.parse(raw) as unknown)
    }
    catch {
      // Keep last REST/SSE snapshot; ignore malformed events.
    }
  }

  function disconnectSse() {
    if (eventSource) {
      eventSource.close()
      eventSource = null
    }
    isConnected.value = false
  }

  function close() {
    intentionalClose = true
    disconnectSse()
    isReconnecting.value = false
  }

  async function loadInitial(id: string, requestId: number) {
    try {
      const data = await $api.matches.fetchById(id)
      if (requestId !== activeRequestId) return
      match.value = data
      error.value = null
    }
    catch {
      if (requestId !== activeRequestId) return
      if (!match.value) {
        error.value = 'تعذر البيانات برجاء المحاولة لاحقا.'
      }
    }
    finally {
      if (requestId === activeRequestId) {
        pending.value = false
      }
    }
  }

  function connectSse(id: string) {
    if (!import.meta.client) return
    if (typeof EventSource === 'undefined') return

    const apiBase = resolveApiBaseUrl()
    if (!apiBase) return

    intentionalClose = true
    disconnectSse()
    intentionalClose = false
    isReconnecting.value = false

    const url = `${apiBase}/api/match/getById/${id}/live`
    eventSource = new EventSource(url)

    const onEvent = (event: Event) => {
      const message = event as MessageEvent<string>
      parseMatchEvent(message.data)
    }

    eventSource.addEventListener('match', onEvent)
    eventSource.addEventListener('statistics', onEvent)
    eventSource.addEventListener('stats', onEvent)
    eventSource.onmessage = onEvent

    eventSource.onopen = () => {
      isConnected.value = true
      isReconnecting.value = false
    }

    eventSource.onerror = () => {
      if (intentionalClose) return
      isConnected.value = false
      isReconnecting.value = Boolean(match.value)
    }
  }

  async function bootstrap(id: string) {
    const requestId = ++activeRequestId
    close()
    intentionalClose = false
    if (!match.value) pending.value = true
    error.value = null
    isReconnecting.value = false

    // 1) REST snapshot first (stats + logos + names)
    await loadInitial(id, requestId)
    if (requestId !== activeRequestId) return

    // 2) Then SSE for live changes
    connectSse(id)
  }

  function reconnect() {
    const id = resolvedMatchId.value
    if (!id) return
    connectSse(id)
  }

  watch(
    resolvedMatchId,
    (id, previousId) => {
      if (id === previousId) return

      match.value = null
      pending.value = true
      error.value = null
      isReconnecting.value = false

      if (!id) {
        activeRequestId += 1
        close()
        pending.value = false
        return
      }

      void bootstrap(id)
    },
    { immediate: true },
  )

  // After SSR hydrate the match-id watch may not re-run, so SSE would never connect.
  onMounted(() => {
    const id = resolvedMatchId.value
    if (!id) return
    if (match.value) {
      connectSse(id)
      return
    }
    void bootstrap(id)
  })

  onBeforeUnmount(() => {
    activeRequestId += 1
    close()
  })

  onDeactivated(() => {
    activeRequestId += 1
    close()
  })

  onActivated(() => {
    const id = resolvedMatchId.value
    if (id) void bootstrap(id)
  })

  return {
    match,
    isConnected,
    isReconnecting,
    error,
    pending,
    reconnect,
    close,
  }
}
