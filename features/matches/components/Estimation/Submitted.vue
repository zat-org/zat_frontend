<template>
    <UModal
        v-model:open="isOpen"
        :dismissible="true"
        :close="false"
        :ui="{
            content: 'sm:max-w-[47rem]',
            header: 'bg-surface-off-base p-4 sm:px-4',
            body: 'p-0',
            footer: 'justify-center gap-4 bg-surface-base',
        }"
    >
        <template #header>
            <div class="flex w-full items-center justify-between gap-3">
                <p class="text-2xl font-bold leading-12 text-text-subtitle">
                    توقعك
                </p>
                <UButton
                    icon="i-heroicons-x-mark"
                    color="neutral"
                    variant="ghost"
                    square
                    aria-label="اغلاق"
                    @click="isOpen = false"
                />
            </div>
        </template>

        <template #body>
            <div class="flex flex-col items-center gap-6 p-4 sm:p-6">
                <div
                    v-if="isMatchEnded && estimation.estimation_score !== null"
                    class="rounded-zat-md bg-green-600/10 px-4 py-2 text-center text-base font-bold text-green-700 dark:text-green-400"
                >
                    نقاطك: {{ estimation.estimation_score }}/10
                </div>

                <div class="flex w-full flex-col items-center gap-2">
                    <h3 class="text-center text-xl font-bold leading-10 text-text-subtitle">
                        النتيجة المتوقعة
                    </h3>
                    <div class="flex items-center justify-center gap-6 sm:gap-10">
                        <div class="flex w-24 flex-col items-center gap-2 sm:w-28">
                            <div class="flex size-16 items-center justify-center rounded-full bg-surface-off-base p-2 sm:size-20">
                                <Image
                                    class="size-full rounded-full bg-surface-raised object-contain"
                                    :src="mediaBaseUrl + match.team_1_logo"
                                    :alt="match.team_1_name"
                                    icon="i-heroicons-users"
                                />
                            </div>
                            <p class="w-full truncate text-center text-sm font-bold text-text-body sm:text-base">
                                {{ match.team_1_name }}
                            </p>
                            <p class="font-numbers text-3xl font-bold text-text-action">
                                {{ team1Score }}
                            </p>
                        </div>

                        <span class="text-xl font-bold text-text-caption">-</span>

                        <div class="flex w-24 flex-col items-center gap-2 sm:w-28">
                            <div class="flex size-16 items-center justify-center rounded-full bg-surface-off-base p-2 sm:size-20">
                                <Image
                                    class="size-full rounded-full bg-surface-raised object-contain"
                                    :src="mediaBaseUrl + match.team_2_logo"
                                    :alt="match.team_2_name"
                                    icon="i-heroicons-users"
                                />
                            </div>
                            <p class="w-full truncate text-center text-sm font-bold text-text-body sm:text-base">
                                {{ match.team_2_name }}
                            </p>
                            <p class="font-numbers text-3xl font-bold text-text-action">
                                {{ team2Score }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-3">
                    <div class="rounded-zat-md border border-surface-tone2 bg-surface-raised px-3 py-3 text-center">
                        <p class="text-xs text-text-caption">كم 400</p>
                        <p class="mt-1 font-numbers text-2xl font-bold text-text-body">
                            {{ estimation.countOf400 }}
                        </p>
                    </div>
                    <div class="rounded-zat-md border border-surface-tone2 bg-surface-raised px-3 py-3 text-center">
                        <p class="text-xs text-text-caption">كبوت / حكم</p>
                        <p class="mt-1 font-numbers text-2xl font-bold text-text-body">
                            {{ estimation.countOfKaboots }}
                        </p>
                    </div>
                    <div class="rounded-zat-md border border-surface-tone2 bg-surface-raised px-3 py-3 text-center">
                        <p class="text-xs text-text-caption">كروت حمراء</p>
                        <p class="mt-1 font-numbers text-2xl font-bold text-text-body">
                            {{ estimation.countOfRedCards }}
                        </p>
                    </div>
                </div>

                <div class="flex w-full max-w-xs flex-col items-center gap-2">
                    <h3 class="text-center text-xl font-bold leading-10 text-text-subtitle">
                        افضل لاعب
                    </h3>
                    <div class="flex flex-col items-center gap-2">
                        <div class="size-16 overflow-hidden rounded-lg bg-surface-overlay">
                            <Image
                                v-if="bestPlayerImage"
                                :src="bestPlayerImage"
                                :alt="bestPlayerName"
                                icon="i-heroicons-user"
                                class="size-full object-cover object-top"
                            />
                            <div
                                v-else
                                class="flex size-full items-center justify-center"
                            >
                                <UIcon
                                    name="i-heroicons-user"
                                    class="size-7 text-text-caption"
                                />
                            </div>
                        </div>
                        <p class="text-center text-base font-semibold text-text-heading">
                            {{ bestPlayerName }}
                        </p>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <AppButton
                label="اغلاق"
                icon="i-heroicons-x-mark"
                color-class="text-surface-tone2"
                label-class="text-text-body"
                @click="isOpen = false"
            />
        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'
import type { IEstimationRelation, IMatchEstimation } from '~/features/matches/types/MatchEstimationsModels'
import MatchState from '~/features/matches/types/MatchState'

const props = defineProps<{
    match: IMatchLessDetails
    estimation: IMatchEstimation
    fullMatch?: IMatchFullDetails | null
}>()

const isOpen = defineModel<boolean>({ default: false })
const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const isMatchEnded = computed(() =>
    String(props.match.state) === MatchState.Done
    || String(props.fullMatch?.state) === MatchState.Done,
)

function relationId(value: IMatchEstimation['winner_team'] | IMatchEstimation['best_player']): number | null {
    if (value === null || value === undefined) return null
    if (typeof value === 'number') return value
    return value.id
}

function relationName(value: IEstimationRelation | number | null | undefined): string | null {
    if (!value || typeof value === 'number') return null
    return value.name ?? null
}

function relationImage(value: IEstimationRelation | number | null | undefined): string | null {
    if (!value || typeof value === 'number') return null
    return value.image ?? value.logo ?? null
}

const winnerTeamId = computed(() => relationId(props.estimation.winner_team))

const team1Score = computed(() => {
    const loser = props.estimation.loserScore
    const winnerId = winnerTeamId.value
    if (!winnerId || winnerId < 0) return 1
    const team1Id = props.fullMatch?.team1.id
    if (team1Id && winnerId === team1Id) return 2
    if (team1Id && winnerId !== team1Id) return loser
    const winnerName = relationName(props.estimation.winner_team)
    if (winnerName && winnerName === props.match.team_1_name) return 2
    if (winnerName && winnerName === props.match.team_2_name) return loser
    return 2
})

const team2Score = computed(() => {
    const loser = props.estimation.loserScore
    const winnerId = winnerTeamId.value
    if (!winnerId || winnerId < 0) return 1
    const team2Id = props.fullMatch?.team2.id
    if (team2Id && winnerId === team2Id) return 2
    if (team2Id && winnerId !== team2Id) return loser
    const winnerName = relationName(props.estimation.winner_team)
    if (winnerName && winnerName === props.match.team_2_name) return 2
    if (winnerName && winnerName === props.match.team_1_name) return loser
    return loser
})

const bestPlayerId = computed(() => relationId(props.estimation.best_player))

const bestPlayerFromMatch = computed(() => {
    const id = bestPlayerId.value
    if (!id || !props.fullMatch) return null
    return [...props.fullMatch.team1.players, ...props.fullMatch.team2.players]
        .find(player => player.id === id) ?? null
})

const bestPlayerName = computed(() =>
    relationName(props.estimation.best_player)
    ?? bestPlayerFromMatch.value?.name
    ?? '-',
)

const bestPlayerImage = computed(() => {
    const fromRelation = relationImage(props.estimation.best_player)
    if (fromRelation) {
        return fromRelation.startsWith('http') ? fromRelation : mediaBaseUrl + fromRelation
    }
    const fromMatch = bestPlayerFromMatch.value?.image
    return fromMatch ? mediaBaseUrl + fromMatch : ''
})
</script>
