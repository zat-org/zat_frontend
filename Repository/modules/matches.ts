import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import FetchFactory from '../factory';
import type { IMatchFullDetails } from "@/Models/IMatchFullDetails";
import type { IMatchLessDetails } from "@/Models/IMatchLessDetails";

class MatchesModule extends FetchFactory {

    async getById(matchId: string, asyncDataOptions?: AsyncDataOptions<IMatchFullDetails>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IMatchFullDetails>(
                    'GET',
                    `/api/match/getById/${matchId}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }
    async getUpcoming(asyncDataOptions?: AsyncDataOptions<{ matches: IMatchLessDetails[], name: string | null }>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<{ matches: IMatchLessDetails[], name: string | null }>(
                    'GET',
                    `/api/match/upcoming/`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

}

export default MatchesModule;