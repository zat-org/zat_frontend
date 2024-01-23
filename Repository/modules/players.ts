import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import FetchFactory from '../factory';
import type { GetPlayerByIdResponse } from "~/Models/ITeam";

class PlayersModule extends FetchFactory {
    async getById(playerId: string, asyncDataOptions?: AsyncDataOptions<GetPlayerByIdResponse>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<GetPlayerByIdResponse>(
                    'GET',
                    `/api/players/getbyid/${playerId}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

}

export default PlayersModule;