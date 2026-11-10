import type { IGetChampSummaryResponse } from '~/features/championships/types/IChamp'

function resolveApiBaseUrl() {
  const config = useRuntimeConfig()
  const base = (config.public.apiBaseUrl || config.public.strapi?.url || '') as string
  return base.replace(/\/+$/, '')
}

/**
 * Live championship summary: load GET /summary first, then listen to SSE
 * for incremental screen updates.
 */
export function useLeagueSummaryLive(
  champId: MaybeRefOrGetter<number | string | null | undefined>,
) {
  const { $api } = useNuxtApp()

  const summary = ref<IGetChampSummaryResponse | null>(null)
  const isConnected = ref(false)
  const isReconnecting = ref(false)
  const error = ref<string | null>(null)
  const pending = ref(true)

  const table = computed(() => summary.value?.table)
  const resolvedChampId = computed(() => {
    const raw = toValue(champId)
    if (raw === null || raw === undefined || raw === '') return null
    return String(raw)
  })

  let eventSource: EventSource | null = null
  let intentionalClose = false
  let activeRequestId = 0

  function close() {
    intentionalClose = true
    if (eventSource) {
      eventSource.close()
      eventSource = null
    }
    isConnected.value = false
    isReconnecting.value = false
  }

  async function loadInitial(id: string, requestId: number) {
    try {
      const data = await $api.champions.fetchChampSummaryByChampId(id)
      if (requestId !== activeRequestId) return
      summary.value = data
      error.value = null
    }
    catch {
      if (requestId !== activeRequestId) return
      if (!summary.value) {
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

    close()
    intentionalClose = false
    isReconnecting.value = false

    if (typeof EventSource === 'undefined') return

    const apiBase = resolveApiBaseUrl()
    if (!apiBase) return

    const url = `${apiBase}/api/leagues/${id}/summary/live`
    eventSource = new EventSource(url)

    eventSource.addEventListener('summary', (event: Event) => {
      const message = event as MessageEvent<string>
      try {
        const data = JSON.parse(message.data) as IGetChampSummaryResponse
        summary.value = data
        isConnected.value = true
        isReconnecting.value = false
        error.value = null
        pending.value = false
      }
      catch {
        // Keep last REST/SSE snapshot; ignore malformed events.
      }
    })

    eventSource.onerror = () => {
      if (intentionalClose) return

      isConnected.value = false
      isReconnecting.value = Boolean(summary.value)
    }
  }

  async function bootstrap(id: string) {
    const requestId = ++activeRequestId
    close()
    intentionalClose = false
    if (!summary.value) pending.value = true
    error.value = null
    isReconnecting.value = false

    await loadInitial(id, requestId)
    if (requestId !== activeRequestId) return
    connectSse(id)
  }

  function reconnect() {
    const id = resolvedChampId.value
    if (!id) return
    connectSse(id)
  }

  watch(
    resolvedChampId,
    (id, previousId) => {
      if (id === previousId) return

      summary.value = null
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

  onBeforeUnmount(() => {
    activeRequestId += 1
    close()
  })

  onDeactivated(() => {
    activeRequestId += 1
    close()
  })

  onActivated(() => {
    const id = resolvedChampId.value
    if (id) void bootstrap(id)
  })

  return {
    summary,
    table,
    isConnected,
    isReconnecting,
    error,
    pending,
    reconnect,
    close,
  }
}
