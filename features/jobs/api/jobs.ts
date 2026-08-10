import type { AsyncDataOptions } from '#app'
import FetchFactory from '~/features/shared/api/factory'
import type { IApplyToJobRequest, IJob, IJobsListResult } from '~/features/jobs/types/IJob'
import type { IResponse } from '~/features/shared/types/IResponse'
import {
  unwrapStrapiPaginatedCollection,
  unwrapStrapiSingle,
} from '~/features/shared/utils/strapiMappers'

type StrapiJobAttributes = Omit<IJob, 'id'>

class JobsModule extends FetchFactory {
  async getAll(pageNumber: Ref<number>, pageSize: number = 10, asyncDataOptions?: AsyncDataOptions<IJobsListResult>) {
    return this.asyncData(
      'jobs:all',
      async () => {
        const raw = await this.get<IResponse<Array<{ id: number, attributes: StrapiJobAttributes }>>>(
          `/api/jobs?filters[isApplyingOpen][$eq]=true&pagination[page]=${pageNumber.value}&pagination[pageSize]=${pageSize}`,
        )
        const { items, pagination } = unwrapStrapiPaginatedCollection<StrapiJobAttributes>(raw)
        return { jobs: items, pagination }
      },
      asyncDataOptions,
    )
  }

  async getById(jobId: string, asyncDataOptions?: AsyncDataOptions<IJob | null>) {
    return this.asyncData(
      `jobs:${jobId}`,
      async () => {
        const raw = await this.get<IResponse<{ id: number, attributes: StrapiJobAttributes }>>(`/api/jobs/${jobId}`)
        return unwrapStrapiSingle<StrapiJobAttributes>(raw)
      },
      asyncDataOptions,
    )
  }

  useSendApplyRequest() {
    const error = ref<string | null>(null)
    const pending = ref<boolean>(false)

    const send = async (request: IApplyToJobRequest, jobId: number | null): Promise<unknown> => {
      error.value = null
      pending.value = true

      const formData = new FormData()
      const cvFile: File = request.cv as File
      formData.append('files.CV', cvFile, `(cv-${request.name})-(${new Date()})-${cvFile.name}`)

      const data = {
        name: request.name,
        phone: request.phone,
        email: request.email,
        aboutMe: request.aboutMe,
        address: request.address,
        date: new Date(),
        job: jobId,
      }

      formData.append('data', JSON.stringify(data))

      try {
        return await this.post<unknown>('/api/apply-to-job-requests', formData)
      } catch (err) {
        console.error(err)
        error.value = 'تعذر الارسال برجاء المحاولة مرة اخري لاحقا.'
      } finally {
        pending.value = false
      }
    }

    return { error, pending, send }
  }
}

export default JobsModule
