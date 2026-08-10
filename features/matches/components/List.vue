<template>
    <div class="flex w-full flex-col gap-4">
        <template v-if="sortedMatches.length > 0">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ChampionshipsOverviewMatchCard
                    v-for="match in pagedMatches"
                    :key="match.id"
                    :match="match"
                    :champ-id="resolvedChampId(match)"
                />
            </div>

            <div
                v-if="totalPages > 1"
                class="flex justify-center pt-2"
            >
                <Pagination
                    :page-size="pageSize"
                    :total-items-count="sortedMatches.length"
                    :current-page="currentPage"
                    @go-to-page="goToPage"
                />
            </div>
        </template>

        <div
            v-else
            class="flex min-h-40 flex-col items-center justify-center gap-2 py-10 text-lg text-text-caption"
        >
            <Icon
                name="line-md:alert-circle"
                class="block text-9xl"
            />
            <h3>لا توجد مباريات حاليا</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import { sortByTime } from '~/features/matches/utils/CollectionsWithTimeUtils'

const props = withDefaults(defineProps<{
    matches: IMatchLessDetails[]
    champId?: number | string
    pageSize?: number
}>(), {
    pageSize: 10,
})

const currentPage = ref(1)

const sortedMatches = computed(() =>
    [...(props.matches ?? [])].sort(sortByTime),
)

const totalPages = computed(() =>
    Math.max(1, Math.ceil(sortedMatches.value.length / props.pageSize)),
)

const pagedMatches = computed(() => {
    const start = (currentPage.value - 1) * props.pageSize
    return sortedMatches.value.slice(start, start + props.pageSize)
})

watch(sortedMatches, () => {
    if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value
    }
})

function goToPage(page: number) {
    if (page < 1 || page > totalPages.value) return
    currentPage.value = page
}

function resolvedChampId(match: IMatchLessDetails) {
    return props.champId ?? match.league_id
}
</script>
