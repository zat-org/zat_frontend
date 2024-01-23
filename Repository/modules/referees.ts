import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import FetchFactory from '../factory';
import type { IJoinAsRefereeRequest, IReferee } from "~/Models/IReferee";

class RefereesModule extends FetchFactory {
    private RESOURCE = `/api/referees`;

    /**
     * Return the products as array 
     * @param asyncDataOptions options for `useAsyncData`
     * @returns 
     */
    async getAll(asyncDataOptions?: AsyncDataOptions<{ referees: IReferee[] }>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<{ referees: IReferee[] }>(
                    'GET',
                    `${this.RESOURCE}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

    useSendJoinRequest() {
        const error = ref<string | null>(null);
        const pending = ref<boolean>(false);
        const send = async (request: IJoinAsRefereeRequest): Promise<unknown> => {
            error.value = null;
            pending.value = true;


            let data = {
                ...request,
                sentAt: new Date(),
            };


            try {
                return this.call<unknown>(
                    'POST',
                    "/api/join-as-referee-requests",
                    { data }, // body
                )
            } catch (err) {
                console.error(err);
                error.value = "تعذر الارسال برجاء المحاولة مرة اخري لاحقا."
            }
            finally {
                pending.value = false;
            }
        }
        return { error, pending, send }
    }
}

export default RefereesModule;