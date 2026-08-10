import type { AsyncDataOptions } from '#app'
import FetchFactory from '~/features/shared/api/factory'
import type { IGetAllChampionsResponse, IUpcomingChamp, IChamp, IGetChampTeamsResponse, IGetChampSummaryResponse, IGetChampSummaryWinnerResponse, IGetChampStudiosResponse, IGetChampMatchesResponse, IGetRecentChampsResponse } from '~/features/championships/types/IChamp'
import { mapSummaryWinnerToStats } from '~/features/championships/utils/championWinnerStats'
import type { IStatistics } from '~/features/championships/types/IStatistics'

class ChampionsModule extends FetchFactory {
  async getAll(champType: Ref<string>, asyncDataOptions?: AsyncDataOptions<IGetAllChampionsResponse>) {
    return this.asyncData(
      () => `champions:all:${champType.value}:ready`,
      () => this.get<IGetAllChampionsResponse>(`/api/leagues/get?type=${champType.value}&ready=true`),
      {
        ...asyncDataOptions,
        watch: [...(asyncDataOptions?.watch ?? []), champType],
      },
    )
  }

  async getRecentWithStats(limit = 6, asyncDataOptions?: AsyncDataOptions<IGetRecentChampsResponse>) {
    return this.asyncData(  
      'champions:recent-done',
      async () => {
        const { champs } = await this.get<IGetAllChampionsResponse>('/api/leagues/get?type=done&excludeType=super&ready=true')
        const recent = champs.slice(0, limit)

        const enriched = await Promise.all(
          recent.map(async (champ) => {
            try {
              const summaryWinner = await this.get<IGetChampSummaryWinnerResponse>(
                `/api/leagues/${champ.leagueid}/summary-winner`,
              )
              return {
                ...champ,
                name: summaryWinner.name ?? champ.name,
                url: summaryWinner.url ?? champ.url,
                end_at: summaryWinner.end_at ?? champ.end_at,
                winner_name: summaryWinner.winner?.name ?? champ.winner_name,
                winner_logo: summaryWinner.winner?.logo ?? champ.winner_logo,
                winner_stats: summaryWinner.winner
                  ? mapSummaryWinnerToStats(summaryWinner.winner)
                  : null,
              }
            }
            catch {
              return { ...champ, winner_stats: null }
            }
          }),
        )

        return { champs: enriched }
      },
      asyncDataOptions,
    )
  }

  async getUpcoming(asyncDataOptions?: AsyncDataOptions<{ data: IUpcomingChamp[] }>) {
    return this.asyncData(
      'champions:upcoming',
      () => this.get<{ data: IUpcomingChamp[] }>('/api/leagues/upcoming'),
      asyncDataOptions,
    )
  }

  async getById(champId: string, asyncDataOptions?: AsyncDataOptions<IChamp>) {
    return this.asyncData(
      `champions:${champId}`,
      () => this.get<IChamp>(`/api/leagues/getById/${champId}`),
      asyncDataOptions,
    )
  }

  async getChampTeamsByChampId(champId: string, asyncDataOptions?: AsyncDataOptions<IGetChampTeamsResponse>) {
    return this.asyncData(
      `champions:${champId}:teams`,
      () => this.get<IGetChampTeamsResponse>(`/api/leagues/${champId}/teams`),
      asyncDataOptions,
    )
  }

  async getChampSummaryByChampId(champId: string, asyncDataOptions?: AsyncDataOptions<IGetChampSummaryResponse>) {
    return this.asyncData(
      `champions:${champId}:summary`,
      () => this.get<IGetChampSummaryResponse>(`/api/leagues/${champId}/summary`),
      asyncDataOptions,
    )
  }

  async getChampSummaryWinnerByChampId(
    champId: string,
    asyncDataOptions?: AsyncDataOptions<IGetChampSummaryWinnerResponse>,
  ) {
    return this.asyncData(
      `champions:${champId}:summary-winner`,
      () => this.get<IGetChampSummaryWinnerResponse>(`/api/leagues/${champId}/summary-winner`),
      asyncDataOptions,
    )
  }

  async getChampStudiosByChampId(champId: string, asyncDataOptions?: AsyncDataOptions<IGetChampStudiosResponse>) {
    return this.asyncData(
      `champions:${champId}:studios`,
      () => this.get<IGetChampStudiosResponse>(`/api/leagues/${champId}/studios`),
      asyncDataOptions,
    )
  }

  async getChampMatchesByChampId(champId: string, asyncDataOptions?: AsyncDataOptions<IGetChampMatchesResponse>) {
    return this.asyncData(
      `champions:${champId}:matches`,
      () => this.fetchChampMatchesByChampId(champId),
      asyncDataOptions,
    )
  }

  fetchChampMatchesByChampId(champId: string) {
    return this.get<IGetChampMatchesResponse>(`/api/leagues/${champId}/matches`)
  }

  async getChampStatisticsByChampId(champId: string, asyncDataOptions?: AsyncDataOptions<{ data: IStatistics[] }>) {
    return this.asyncData(
      `champions:${champId}:statistics`,
      () => this.get<{ data: IStatistics[] }>(`/api/leagues/${champId}/statistics`),
      asyncDataOptions,
    )
  }
}

export default ChampionsModule
