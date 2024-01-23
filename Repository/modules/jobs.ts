import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import FetchFactory from '../factory';
import type { IApplyToJobRequest, IJob } from "~/Models/IJob";
import type { IResponse } from '~/Models/IResponse';

class JobsModule extends FetchFactory {
    async getAll(pageNumber: Ref<number>, pageSize: number = 10, asyncDataOptions?: AsyncDataOptions<IResponse<IJob[]>>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                console.log("from repo before fetch.")
                return this.call<IResponse<IJob[]>>(
                    'GET',
                    `/api/jobs?filters[isApplyingOpen][$eq]=true&pagination[page]=${pageNumber.value}&pagination[pageSize]=${pageSize}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

    async getById(jobId: string, asyncDataOptions?: AsyncDataOptions<IResponse<IJob>>) {
        return useAsyncData(
            () => {
                const fetchOptions: FetchOptions<'json'> = {
                    headers: {
                        'Accept-Language': 'en-US'
                    }
                };
                return this.call<IResponse<IJob>>(
                    'GET',
                    `/api/jobs/${jobId}`,
                    undefined, // body
                    fetchOptions
                )
            },
            asyncDataOptions
        )
    }

    useSendApplyRequest() {
        const error = ref<string | null>(null);
        const pending = ref<boolean>(false);
        const send = async (request: IApplyToJobRequest, jobId: number | null): Promise<unknown> => {
            error.value = null;
            pending.value = true;

            const formData = new FormData();
            let cvFile: File = request.cv as File;
            formData.append("files.CV", cvFile, `(cv-${request.name})-(${new Date()})-${cvFile.name}`);

            let data = {
                name: request.name,
                phone: request.phone,
                email: request.email,
                aboutMe: request.aboutMe,
                address: request.address,
                date: new Date(),
                job: jobId
            };

            formData.append('data', JSON.stringify(data));

            try {
                return this.call<unknown>(
                    'POST',
                    "/api/apply-to-job-requests",
                    formData, // body
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

export default JobsModule;