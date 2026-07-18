import type { AsyncDataOptions } from '#app'
import FetchFactory from '../factory'
import type { GetPlayerByIdResponse } from '~/Models/ITeam'

class PlayersModule extends FetchFactory {
  async getById(playerId: string, asyncDataOptions?: AsyncDataOptions<GetPlayerByIdResponse>) {
    return this.asyncData(
      `players:${playerId}`,
      () => this.get<GetPlayerByIdResponse>(`/api/players/getbyid/${playerId}`),
      asyncDataOptions,
    )
  }
}

export default PlayersModule
