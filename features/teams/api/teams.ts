import type { AsyncDataOptions } from '#app'
import FetchFactory from '~/features/shared/api/factory'
import type { GetAllTeamsResponse, GetTeamByIdResponse } from '~/features/teams/types/ITeam'

class TeamsModule extends FetchFactory {
  async getAll(asyncDataOptions?: AsyncDataOptions<GetAllTeamsResponse>) {
    return this.asyncData(
      'teams:all',
      () => this.get<GetAllTeamsResponse>('/api/teams/getall'),
      asyncDataOptions,
    )
  }

  async getById(teamId: string, asyncDataOptions?: AsyncDataOptions<GetTeamByIdResponse>) {
    return this.asyncData(
      `teams:${teamId}`,
      () => this.get<GetTeamByIdResponse>(`/api/teams/getbyid/${teamId}`),
      asyncDataOptions,
    )
  }
}

export default TeamsModule
