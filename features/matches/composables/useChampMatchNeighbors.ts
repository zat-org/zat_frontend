import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import { sortByTime } from '~/features/matches/utils/CollectionsWithTimeUtils'

export async function useChampMatchNeighbors(
  champId: MaybeRefOrGetter<number | string>,
  currentMatchId: MaybeRefOrGetter<number | string>,
) {
  const { $api } = useNuxtApp()

  const champIdRef = computed(() => String(toValue(champId)))
  const currentId = computed(() => Number(toValue(currentMatchId)))

  const { data, pending } = await $api.champions.getChampMatchesByChampId(champIdRef.value)

  const sortedMatches = computed(() => {
    const matches = (data.value?.matches ?? []) as IMatchLessDetails[]
    return [...matches].sort(sortByTime)
  })

  const currentIndex = computed(() =>
    sortedMatches.value.findIndex(match => match.id === currentId.value),
  )

  const prevMatch = computed<IMatchLessDetails | null>(() => {
    const index = currentIndex.value
    if (index <= 0) return null
    return sortedMatches.value[index - 1] ?? null
  })

  const nextMatch = computed<IMatchLessDetails | null>(() => {
    const index = currentIndex.value
    if (index < 0 || index >= sortedMatches.value.length - 1) return null
    return sortedMatches.value[index + 1] ?? null
  })

  return {
    prevMatch,
    nextMatch,
    pending,
    sortedMatches,
  }
}
