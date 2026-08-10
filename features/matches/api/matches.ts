import type { AsyncDataOptions } from '#app'
import FetchFactory from '~/features/shared/api/factory'
import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import type { IMatchHistoryParams, IMatchHistoryResponse } from '~/features/matches/types/IMatchHistory'

class MatchesModule extends FetchFactory {
  private buildEndedQuery(params?: { leagueId?: number | string | null, limit?: number | null }) {
    const searchParams = new URLSearchParams()
    if (params?.leagueId !== undefined && params?.leagueId !== null) {
      searchParams.set('leagueId', String(params.leagueId))
    }
    if (params?.limit !== undefined && params?.limit !== null) {
      searchParams.set('limit', String(params.limit))
    }

    const query = searchParams.toString()
    return query ? `/api/match/ended/?${query}` : '/api/match/ended/'
  }

  private buildHistoryQuery(params: IMatchHistoryParams) {
    const searchParams = new URLSearchParams()
    searchParams.set('type', params.type)
    searchParams.set('status', params.status)
    if (params.limit !== undefined) {
      searchParams.set('limit', String(params.limit))
    }
    return `/api/match/history?${searchParams.toString()}`
  }

  async getById(matchId: string, asyncDataOptions?: AsyncDataOptions<IMatchFullDetails>) {
    return this.asyncData(
      `matches:${matchId}`,
      () => this.get<IMatchFullDetails>(`/api/match/getById/${matchId}`),
      asyncDataOptions,
    )
  }

  fetchById(matchId: string) {
    return this.get<IMatchFullDetails>(`/api/match/getById/${matchId}`)
  }

  async getUpcoming(asyncDataOptions?: AsyncDataOptions<{ matches: IMatchLessDetails[], name: string | null }>) {
    return this.asyncData(
      'matches:upcoming',
      () => this.fetchUpcoming(),
      asyncDataOptions,
    )
  }

  fetchUpcoming() {
    return this.get<{ matches: IMatchLessDetails[], name: string | null }>('/api/match/upcoming/')
  }

  async getEnded(
    params?: { leagueId?: number | string | null, limit?: number | null },
    asyncDataOptions?: AsyncDataOptions<{ matches: IMatchLessDetails[], name: string | null }>,
  ) {
    const key = `matches:ended:${params?.leagueId ?? 'all'}:${params?.limit ?? 'all'}`

    return this.asyncData(
      key,
      () => this.fetchEnded(params),
      asyncDataOptions,
    )
  }

  fetchEnded(params?: { leagueId?: number | string | null, limit?: number | null }) {
    return this.get<{ matches: IMatchLessDetails[], name: string | null }>(this.buildEndedQuery(params))
  }

  async getHistory(
    params: Ref<IMatchHistoryParams>,
    asyncDataOptions?: AsyncDataOptions<IMatchHistoryResponse>,
  ) {
    return this.asyncData(
      () => `matches:history:${params.value.type}:${params.value.status}:${params.value.limit ?? 'all'}`,
      () => this.fetchHistory(params.value),
      {
        ...asyncDataOptions,
        watch: [...(asyncDataOptions?.watch ?? []), params],
      },
    )
  }

  fetchHistory(params: IMatchHistoryParams) {
    return this.get<IMatchHistoryResponse>(this.buildHistoryQuery(params))
  }
}

export default MatchesModule
