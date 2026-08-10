<template>
    <section
        class="w-full bg-surface-base py-4 sm:py-6"
        aria-label="نتيجة المباراة"
        dir="rtl"
    >
        <div class="page-container">
            <article
                class="relative flex w-full flex-col items-center gap-3 overflow-hidden rounded-zat-md bg-surface-raised px-3 py-5 sm:gap-4 sm:px-6 sm:py-8 lg:px-10 lg:py-10"
            >
                <!-- <div
                    class="pointer-events-none absolute inset-t-1/2 inset-s-1/4 size-93 rounded-full bg-white/80 blur-[90px]"
                    aria-hidden="true"
                /> -->

                <div class="relative z-10 flex w-full items-center justify-between gap-2 px-1">
                    <NuxtLink
                        v-if="prevMatch"
                        :to="matchHref(prevMatch.id)"
                        class="flex size-9 shrink-0 items-center justify-center rounded-zat-full border-2 border-surface-tone2 text-text-body transition-opacity hover:opacity-70 sm:size-10"
                        :aria-label="`المباراة السابقة: ${neighborLabel(prevMatch)}`"
                    >
                        <UIcon
                            name="i-heroicons-chevron-right-20-solid"
                            class="size-5 sm:size-6"
                        />
                    </NuxtLink>
                    <span
                        v-else
                        class="size-9 shrink-0 sm:size-10"
                        aria-hidden="true"
                    />

                    <h2 class="min-w-0 flex-1 truncate text-center text-lg font-bold leading-8 text-text-subtitle sm:text-xl sm:leading-9 lg:text-2xl lg:leading-12">
                        {{ displayTextValue(match.tournament) }}
                    </h2>

                    <NuxtLink
                        v-if="nextMatch"
                        :to="matchHref(nextMatch.id)"
                        class="flex size-9 shrink-0 items-center justify-center rounded-zat-full border-2 border-surface-tone2 text-text-body transition-opacity hover:opacity-70 sm:size-10"
                        :aria-label="`المباراة التالية: ${neighborLabel(nextMatch)}`"
                    >
                        <UIcon
                            name="i-heroicons-chevron-left-20-solid"
                            class="size-5 sm:size-6"
                        />
                    </NuxtLink>
                    <span
                        v-else
                        class="size-9 shrink-0 sm:size-10"
                        aria-hidden="true"
                    />
                </div>

                <div
                    class="relative z-10 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-6 lg:gap-10"
                    dir="ltr"
                >
                    <div class="flex min-w-0 flex-col items-center gap-1 sm:gap-2">
                        <div class="flex size-16 items-center justify-center rounded-zat-full bg-surface-off-base p-1.5 sm:size-24 sm:p-2 lg:size-28">
                            <Image
                                v-if="match.team2.logo"
                                :src="mediaBaseUrl + match.team2.logo"
                                :alt="match.team2.name"
                                icon="i-heroicons-user-group"
                                class="size-12 object-contain sm:size-20 lg:size-24"
                            />
                            <UIcon
                                v-else
                                name="i-heroicons-user-group"
                                class="size-8 text-text-caption sm:size-10"
                            />
                        </div>
                        <p class="w-full truncate text-center text-base font-bold leading-7 text-text-body sm:text-2xl sm:leading-12 lg:text-3xl">
                            {{ displayTextValue(match.team2.name) }}
                        </p>
                    </div>

                    <div class="flex flex-col items-center justify-center gap-1 px-1 sm:gap-2 sm:px-2">
                        <p class="flex items-center gap-2 font-numbers text-[28px] font-bold leading-none text-[#ED1C24] sm:gap-4 sm:text-[40px] lg:text-[48px]">
                            <template v-if="match.state === MatchState.Done">
                                <span>{{ scoreDisplay(match.team2.score) }}</span>
                                <span>-</span>
                                <span>{{ scoreDisplay(match.team1.score) }}</span>
                            </template>
                            <template v-else-if="match.state === MatchState.Live">
                                <span class="text-sm font-bold text-zat-500 sm:text-xl">مباشر</span>
                            </template>
                            <template v-else>
                                <span class="text-xl font-bold text-text-subtitle sm:text-3xl">VS</span>
                            </template>
                        </p>
                        <p class="text-xs font-semibold leading-5 text-text-subtitle sm:text-base sm:leading-7">
                            النتيجة
                        </p>
                    </div>

                    <div class="flex min-w-0 flex-col items-center gap-1 sm:gap-2">
                        <div class="flex size-16 items-center justify-center rounded-zat-full bg-surface-off-base p-1.5 sm:size-24 sm:p-2 lg:size-28">
                            <Image
                                v-if="match.team1.logo"
                                :src="mediaBaseUrl + match.team1.logo"
                                :alt="match.team1.name"
                                icon="i-heroicons-user-group"
                                class="size-12 object-contain sm:size-20 lg:size-24"
                            />
                            <UIcon
                                v-else
                                name="i-heroicons-user-group"
                                class="size-8 text-text-caption sm:size-10"
                            />
                        </div>
                        <p class="w-full truncate text-center text-base font-bold leading-7 text-text-body sm:text-2xl sm:leading-12 lg:text-3xl">
                            {{ displayTextValue(match.team1.name) }}
                        </p>
                    </div>
                </div>

                <div class="relative z-10 flex w-full flex-col items-center gap-3 pt-1 sm:pt-3">
                    <AppButton
                        v-if="match.url"
                        :href="match.url"
                        label="شاهد المبارة"
                        icon="zat:youtube"
                    />

                    <ClientOnly>
                        <MatchDetailsEstimation :match="match" />
                    </ClientOnly>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup lang="ts">
import MatchState from '~/features/matches/types/MatchState'
import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import { displayTextValue } from '~/features/championships/utils/championWinnerStats'
import { useChampMatchNeighbors } from '~/features/matches/composables/useChampMatchNeighbors'

const props = defineProps<{
    match: IMatchFullDetails
    champId: number | string
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const { prevMatch, nextMatch } = await useChampMatchNeighbors(
    () => props.champId,
    () => props.match.id,
)

function matchHref(matchId: number) {
    return `/championships/${props.champId}/match/${matchId}`
}

function neighborLabel(neighbor: IMatchLessDetails) {
    return `${displayTextValue(neighbor.team_1_name)} ضد ${displayTextValue(neighbor.team_2_name)}`
}

function scoreDisplay(score: number | null | undefined) {
    if (score === null || score === undefined || Number.isNaN(score)) return '-'
    return String(score)
}
</script>
