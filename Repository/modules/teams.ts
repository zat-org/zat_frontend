import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import FetchFactory from '../factory';
import type { GetAllTeamsResponse, GetTeamByIdResponse } from "~/Models/ITeam";

class TeamsModule extends FetchFactory {
    async getAll(asyncDataOptions?: AsyncDataOptions<GetAllTeamsResponse>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                // console.log("from repo before fetch.")
                return this.call<GetAllTeamsResponse>(
                    'GET',
                    `/api/teams/getall`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

    async getById(teamId: string, asyncDataOptions?: AsyncDataOptions<GetTeamByIdResponse>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<GetTeamByIdResponse>(
                    'GET',
                    `/api/teams/getbyid/${teamId}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

}

export default TeamsModule;