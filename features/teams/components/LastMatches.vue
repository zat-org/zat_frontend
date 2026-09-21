<template>
    <FetchDataWrapper
        :error="sectionError"
        :pending="pending"
        :retryable="true"
        :skeleton-rows="4"
        @retry="refresh"
    >
        <div class="flex w-full flex-col overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-base">
            <div
                v-if="matches.length > 0"
                class="flex flex-col gap-4 p-4 sm:p-6"
            >
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ChampionshipsOverviewMatchCard
                        v-for="match in matches"
                        :key="match.id"
                        :match="match"
                        :champ-id="match.league_id"
                        compact
                    />
                </div>

                <div
                    v-if="totalItemsCount > pageSize"
                    class="flex justify-center pt-2"
                >
                    <Pagination
                        :page-size="pageSize"
                        :total-items-count="totalItemsCount"
                        :current-page="currentPage"
                        @go-to-page="goToPage"
                    />
                </div>
            </div>

            <div
                v-else
                class="flex min-h-40 flex-col items-center justify-center gap-2 px-4 py-10 text-text-subtitle"
            >
                <UIcon
                    name="line-md:alert-circle"
                    class="text-5xl"
                />
                <p class="text-center text-lg">
                    لا توجد مباريات لهذا الفريق حالياً
                </p>
            </div>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IMatchesByTeamsParams } from '~/features/matches/types/IMatchesByTeams'

const PAGE_SIZE = 10

const props = defineProps<{
    teamId: number | string
}>()

const { $api } = useNuxtApp()

const currentPage = ref(1)

const queryParams = computed<IMatchesByTeamsParams>(() => ({
    teamIds: [props.teamId],
    page: currentPage.value,
    pageSize: PAGE_SIZE,
}))

const {
    data,
    pending,
    error: fetchError,
    refresh,
} = await $api.matches.getByTeams(queryParams)

const matches = computed(() => data.value?.matches ?? [])

const pageSize = computed(() => data.value?.pagination?.pageSize ?? PAGE_SIZE)

const totalItemsCount = computed(() => data.value?.pagination?.total ?? matches.value.length)

const sectionError = computed(() =>
    fetchError.value
        ? 'تعذر تحميل مباريات الفريق برجاء المحاولة لاحقاً.'
        : null,
)

function goToPage(page: number) {
    const pageCount = Math.max(1, Math.ceil(totalItemsCount.value / pageSize.value))
    if (page < 1 || page > pageCount || page === currentPage.value) return
    currentPage.value = page
}
</script>
