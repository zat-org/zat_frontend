import type { AsyncDataOptions } from '#app'
import type { IError } from '~/Models/AuthModels'
import FetchFactory from '../factory'
import type { IResponse } from '~/Models/IResponse'
import type {
  ICreateMatchEstimation,
  IEstimationTable,
  IMatchEstimation,
  IUserEstimationsResult,
} from '~/Models/MatchEstimationsModels'
import { unwrapStrapiPaginatedCollection } from '~/utils/strapiMappers'

type StrapiEstimationAttributes = Omit<IMatchEstimation, 'id'>

class EstimationsModule extends FetchFactory {
  useGetByIds() {
    const error = ref<string | null>(null)
    const pending = ref<boolean>(false)
    const data = ref<IUserEstimationsResult | null>(null)

    const getData = async (matchId: number): Promise<unknown> => {
      const userStore = useUserStore()
      if (!userStore.user?.id || !userStore.jwtToken) {
        error.value = 'برجاء تسجيل الدخول اولا.'
        return
      }

      error.value = null
      pending.value = true

      try {
        const raw = await this.get<IResponse<Array<{ id: number, attributes: StrapiEstimationAttributes }>>>(
          `/api/match-estimations?filters[match][id][$eq]=${matchId}&filters[user][id][$eq]=${userStore.user.id}`,
        )
        const { items, pagination } = unwrapStrapiPaginatedCollection<StrapiEstimationAttributes>(raw)
        data.value = { items, total: pagination.total }
      } catch (err) {
        console.error(err)
        data.value = null
        error.value = 'تعذر تحميل البيانات برجاء المحاولة مرة اخري لاحقا.'
      } finally {
        pending.value = false
      }
    }

    return { error, pending, data, getData }
  }

  useSendEstimation() {
    const error = ref<string | null>(null)
    const pending = ref<boolean>(false)

    const send = async (request: ICreateMatchEstimation): Promise<unknown> => {
      const userStore = useUserStore()
      if (!userStore.user?.id || !userStore.jwtToken) {
        error.value = 'برجاء تسجيل الدخول اولا.'
        return
      }

      error.value = null
      pending.value = true

      const payload = {
        winner_team: request.selectedWinnerId,
        best_player: request.bestPlayerId,
        user: userStore.user.id,
        match: request.matchId,
        countOf400: request.countOf400,
        countOfKaboots: request.countOfKaboots,
        countOfRedCards: request.countOfRedCards,
        loserScore: request.loserScore,
      }

      try {
        return await this.post<unknown>('/api/match-estimations', { data: payload })
      } catch (err: unknown) {
        const errorData = (err as { data: IError }).data
        if (errorData.error.name === 'BadRequestError') {
          error.value = errorData.error.details.message
        } else {
          error.value = 'تعذر تسجيل الدخول برجاء المحاولة مرة اخري لاحقا.'
        }
      } finally {
        pending.value = false
      }
    }

    return { error, pending, send }
  }

  getEstimationTableByChampId(champId: number, asyncDataOptions?: AsyncDataOptions<IEstimationTable>) {
    return this.asyncData(
      `estimations:table:${champId}`,
      () => this.get<IEstimationTable>(`/api/leagues/${champId}/estimations`),
      asyncDataOptions,
    )
  }
}

export default EstimationsModule
