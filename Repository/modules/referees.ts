import type { AsyncDataOptions } from '#app'
import FetchFactory from '../factory'
import type { IJoinAsRefereeRequest, IReferee } from '~/Models/IReferee'

class RefereesModule extends FetchFactory {
  private RESOURCE = '/api/referees'

  async getAll(asyncDataOptions?: AsyncDataOptions<{ referees: IReferee[] }>) {
    return this.asyncData(
      'referees:all',
      () => this.get<{ referees: IReferee[] }>(this.RESOURCE),
      asyncDataOptions,
    )
  }

  useSendJoinRequest() {
    const error = ref<string | null>(null)
    const pending = ref<boolean>(false)

    const send = async (request: IJoinAsRefereeRequest): Promise<unknown> => {
      error.value = null
      pending.value = true

      const data = {
        ...request,
        sentAt: new Date(),
      }

      try {
        return await this.post<unknown>('/api/join-as-referee-requests', { data })
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

export default RefereesModule
