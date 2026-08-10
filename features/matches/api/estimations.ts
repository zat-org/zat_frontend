import type { AsyncDataOptions } from '#app'
import type { IError } from '~/features/auth/types/AuthModels'
import FetchFactory from '~/features/shared/api/factory'
import type { IResponse } from '~/features/shared/types/IResponse'
import type {
  ICreateMatchEstimation,
  IEstimationRelation,
  IEstimationTable,
  IMatchEstimation,
  IUserEstimationsResult,
} from '~/features/matches/types/MatchEstimationsModels'
import { unwrapStrapiPaginatedCollection } from '~/features/shared/utils/strapiMappers'

type StrapiRelation = {
  data?: {
    id: number
    attributes?: Record<string, unknown>
  } | null
} | number | null

type StrapiEstimationAttributes = {
  loserScore: 0 | 1
  countOf400: number
  countOfKaboots: number
  countOfRedCards: number
  estimation_score: number | null
  winner_team?: StrapiRelation
  best_player?: StrapiRelation
}

function mediaPath(value: unknown): string | null {
  if (typeof value === 'string') return value
  if (!value || typeof value !== 'object') return null
  const record = value as Record<string, unknown>
  if (typeof record.url === 'string') return record.url
  const nested = record.data as { attributes?: { url?: string } } | undefined
  return nested?.attributes?.url ?? null
}

function unwrapRelation(value: StrapiRelation | undefined): IEstimationRelation | number | null {
  if (value === null || value === undefined) return null
  if (typeof value === 'number') return value
  const entity = value.data
  if (!entity?.id) return null
  const attributes = entity.attributes ?? {}
  return {
    id: entity.id,
    name: typeof attributes.name === 'string' ? attributes.name : null,
    image: mediaPath(attributes.image),
    logo: mediaPath(attributes.logo),
  }
}

function mapEstimationItem(item: { id: number } & StrapiEstimationAttributes): IMatchEstimation {
  return {
    id: item.id,
    loserScore: item.loserScore,
    countOf400: item.countOf400,
    countOfKaboots: item.countOfKaboots,
    countOfRedCards: item.countOfRedCards,
    estimation_score: item.estimation_score,
    winner_team: unwrapRelation(item.winner_team),
    best_player: unwrapRelation(item.best_player),
  }
}

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
          `/api/match-estimations?filters[match][id][$eq]=${matchId}&filters[user][id][$eq]=${userStore.user.id}&populate[winner_team]=*&populate[best_player]=*`,
        )
        const { items, pagination } = unwrapStrapiPaginatedCollection<StrapiEstimationAttributes>(raw)
        data.value = {
          items: items.map(mapEstimationItem),
          total: pagination.total,
        }
      }
      catch (err) {
        console.error(err)
        data.value = null
        error.value = 'تعذر تحميل البيانات برجاء المحاولة مرة اخري لاحقا.'
      }
      finally {
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
      }
      catch (err: unknown) {
        const errorData = (err as { data: IError }).data
        if (errorData.error.name === 'BadRequestError') {
          error.value = errorData.error.details.message
        }
        else {
          error.value = 'تعذر تسجيل الدخول برجاء المحاولة مرة اخري لاحقا.'
        }
      }
      finally {
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
