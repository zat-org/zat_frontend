import type { AsyncDataOptions } from '#app'
import FetchFactory from '~/features/shared/api/factory'
import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import type { IMatchHistoryParams, IMatchHistoryResponse } from '~/features/matches/types/IMatchHistory'
import type { IMatchesByTeamsParams, IMatchesByTeamsResponse, IMatchesByTeamsApiResponse, IMatchByTeam } from '~/features/matches/types/IMatchesByTeams'
import type { IPagination } from '~/features/shared/types/IResponse'
import MatchState from '~/features/matches/types/MatchState'

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

  private buildByTeamsQuery(params: IMatchesByTeamsParams) {
    const searchParams = new URLSearchParams()
    searchParams.set('teamIds', params.teamIds.map(String).join(','))
    if (params.page !== undefined) {
      searchParams.set('page', String(params.page))
    }
    if (params.pageSize !== undefined) {
      searchParams.set('pageSize', String(params.pageSize))
    }
    return `/api/match/by-teams?${searchParams.toString()}`
  }

  private mapByTeamMatch(match: IMatchByTeam): IMatchLessDetails {
    return {
      id: match.id,
      team_1_name: match.team_1_name,
      team_1_score: match.team_1_score,
      team_1_logo: match.team_1_logo,
      team_2_name: match.team_2_name,
      team_2_score: match.team_2_score,
      team_2_logo: match.team_2_logo,
      state: (match.state as MatchState) ?? MatchState.Done,
      url: match.url ?? '',
      start_at: match.start_at as unknown as Date,
      start_estimations: match.start_estimations ?? null,
      end_estimations: match.end_estimations ?? null,
      tournament_name: match.tournament_name,
      name: match.name || match.tournament_name || match.league_name || '',
      type: match.type,
      league_id: match.league_id,
    }
  }

  private normalizeByTeamsResponse(
    raw: IMatchesByTeamsApiResponse | null | undefined,
    fallbackPage: number,
    fallbackPageSize: number,
  ): IMatchesByTeamsResponse {
    const matches = Array.isArray(raw?.matches)
      ? raw.matches.map(match => this.mapByTeamMatch(match))
      : []

    const pagination: IPagination = raw?.meta?.pagination ?? {
      page: fallbackPage,
      pageSize: fallbackPageSize,
      pageCount: matches.length < fallbackPageSize ? fallbackPage : fallbackPage + 1,
      total: matches.length,
    }

    return { matches, pagination }
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

  async getByTeams(
    params: Ref<IMatchesByTeamsParams>,
    asyncDataOptions?: AsyncDataOptions<IMatchesByTeamsResponse>,
  ) {
    return this.asyncData(
      () => {
        const { teamIds, page = 1, pageSize = 10 } = params.value
        return `matches:by-teams:${teamIds.map(String).join(',')}:${page}:${pageSize}`
      },
      () => this.fetchByTeams(params.value),
      {
        ...asyncDataOptions,
        watch: [...(asyncDataOptions?.watch ?? []), params],
      },
    )
  }

  async fetchByTeams(params: IMatchesByTeamsParams): Promise<IMatchesByTeamsResponse> {
    const page = params.page ?? 1
    const pageSize = params.pageSize ?? 10
    const raw = await this.get<IMatchesByTeamsApiResponse>(this.buildByTeamsQuery({
      ...params,
      page,
      pageSize,
    }))
    return this.normalizeByTeamsResponse(raw, page, pageSize)
  }
}

export default MatchesModule
