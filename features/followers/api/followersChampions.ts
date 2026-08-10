import type { AsyncDataOptions } from '#app'
import FetchFactory from '~/features/shared/api/factory'
import type { IFollowerChampion, IFollowerChampionApplyRequest } from '~/features/followers/types/IFollowerChampion'
import type { IResponse } from '~/features/shared/types/IResponse'
import {
  unwrapStrapiCollection,
  unwrapStrapiSingle,
} from '~/features/shared/utils/strapiMappers'

type StrapiFollowerChampionAttributes = Omit<IFollowerChampion, 'id'>

class FollowersChampionsModule extends FetchFactory {
  async getAll(asyncDataOptions?: AsyncDataOptions<IFollowerChampion[]>) {
    return this.asyncData(
      'followers-champions:all',
      async () => {
        const raw = await this.get<IResponse<Array<{ id: number, attributes: StrapiFollowerChampionAttributes }>>>(
          '/api/followers-champions?filters[IsApplyOpen][$eq]=true',
        )
        return unwrapStrapiCollection<StrapiFollowerChampionAttributes>(raw)
      },
      asyncDataOptions,
    )
  }

  async getById(champId: string, asyncDataOptions?: AsyncDataOptions<IFollowerChampion | null>) {
    return this.asyncData(
      `followers-champions:${champId}`,
      async () => {
        const raw = await this.get<IResponse<{ id: number, attributes: StrapiFollowerChampionAttributes }>>(
          `/api/followers-champions/${champId}`,
        )
        return unwrapStrapiSingle<StrapiFollowerChampionAttributes>(raw)
      },
      asyncDataOptions,
    )
  }

  useSendApplyRequest() {
    const error = ref<string | null>(null)
    const pending = ref<boolean>(false)

    const send = async (request: IFollowerChampionApplyRequest, champId: number | null): Promise<unknown> => {
      error.value = null
      pending.value = true

      try {
        const fpAgeRange = this.getAgeRange(request.fpBirthDate)
        const spAgeRange = this.getAgeRange(request.spBirthDate)

        return await this.post<unknown>('/api/champion-join-requests', {
          data: {
            ...request,
            date: new Date(),
            followers_champion: champId,
            fpAge: fpAgeRange,
            spAge: spAgeRange,
          },
        })
      } catch (err) {
        console.error(err)
        error.value = 'تعذر الارسال برجاء المحاولة مرة اخري لاحقا.'
      } finally {
        pending.value = false
      }
    }

    return { error, pending, send }
  }

  getAgeRange = (birthDateStr: string): string => {
    const age: number = this.calculateAge(birthDateStr)
    if (age < 18) return ' < 18'
    if (age >= 18 && age < 24) return '18 ~ 23'
    if (age >= 24 && age < 30) return '24 ~ 29'
    if (age >= 30 && age < 37) return '30 ~ 36'
    return ' > 37'
  }

  calculateAge = (birthDateStr: string): number => {
    const birthDate: Date = new Date(birthDateStr)
    const currentDate: Date = new Date()
    const timeDiff: number = currentDate.getTime() - birthDate.getTime()
    const msPerYear: number = 365.25 * 24 * 60 * 60 * 1000
    return Math.floor(timeDiff / msPerYear)
  }
}

export default FollowersChampionsModule
