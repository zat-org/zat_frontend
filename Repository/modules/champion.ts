import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import FetchFactory from '../factory';
import type { IGetAllChampionsResponse, IUpcomingChamp, IChamp, IGetChampTeamsResponse, IGetChampSummaryResponse, IGetChampStudiosResponse, IGetChampMatchesResponse } from "~/Models/IChamp";
import type { IStatistics } from "~/Models/IStatistics"

class ChampionsModule extends FetchFactory {
    async getAll(champType: Ref<string>, asyncDataOptions?: AsyncDataOptions<IGetAllChampionsResponse>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                // console.log("from repo before fetch.")
                return this.call<IGetAllChampionsResponse>(
                    'GET',
                    `/api/leagues/get?type=${champType.value}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }
    async getUpcoming(asyncDataOptions?: AsyncDataOptions<{ data: IUpcomingChamp[] }>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                // console.log("from repo before fetch.")
                return this.call<{ data: IUpcomingChamp[] }>(
                    'GET',
                    `/api/leagues/upcoming`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }
    async getById(champId: string, asyncDataOptions?: AsyncDataOptions<IChamp>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IChamp>(
                    'GET',
                    `/api/leagues/getById/${champId}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

    async getChampTeamsByChampId(champId: string, asyncDataOptions?: AsyncDataOptions<IGetChampTeamsResponse>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IGetChampTeamsResponse>(
                    'GET',
                    `/api/leagues/${champId}/teams`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

    async getChampSummaryByChampId(champId: string, asyncDataOptions?: AsyncDataOptions<IGetChampSummaryResponse>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IGetChampSummaryResponse>(
                    'GET',
                    `/api/leagues/${champId}/summary`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }
    async getChampStudiosByChampId(champId: string, asyncDataOptions?: AsyncDataOptions<IGetChampStudiosResponse>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IGetChampStudiosResponse>(
                    'GET',
                    `/api/leagues/${champId}/studios`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

    async getChampMatchesByChampId(champId: string, asyncDataOptions?: AsyncDataOptions<IGetChampMatchesResponse>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IGetChampMatchesResponse>(
                    'GET',
                    `/api/leagues/${champId}/matches`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }
    async getChampStatisticsByChampId(champId: string, asyncDataOptions?: AsyncDataOptions<{ data: IStatistics[] }>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<{ data: IStatistics[] }>(
                    'GET',
                    `/api/leagues/${champId}/statistics`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

}

export default ChampionsModule;