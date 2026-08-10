<template>
    <div
        class="flex min-w-0 flex-1 items-center gap-2"
        :class="side === 'team2' ? 'justify-end pe-4' : 'justify-end ps-4'"
    >
        <template v-if="side === 'team2'">
            <p class="min-w-0  truncate text-base leading-7 " :class="nameClass">
                {{ teamName }}
            </p>
            <div class="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded bg-surface-overlay">
                <Image
                    v-if="team?.logoUrl"
                    :src="mediaBaseUrl + team.logoUrl"
                    :alt="teamName"
                    icon="i-heroicons-user-group"
                    class="size-7 object-contain"
                />
                <UIcon
                    v-else
                    name="i-heroicons-question-mark-circle"
                    class="size-7 text-[#737171]"
                />
            </div>
            <span class="shrink-0 text-center text-xl font-bold leading-10" :class="scoreClass">
                {{ scoreDisplay }}
            </span>
        </template>

        <template v-else>
            <span class="shrink-0 text-center text-xl font-bold leading-10" :class="scoreClass">
                {{ scoreDisplay }}
            </span>
            <div class="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded bg-surface-overlay">
                <Image
                    v-if="team?.logoUrl"
                    :src="mediaBaseUrl + team.logoUrl"
                    :alt="teamName"
                    icon="i-heroicons-user-group"
                    class="size-7 object-contain"
                />
                <UIcon
                    v-else
                    name="i-heroicons-question-mark-circle"
                    class="size-7 text-[#737171]"
                />
            </div>
            <p class="min-w-0 flex-1 truncate text-base leading-7" :class="nameClass">
                {{ teamName }}
            </p>
        </template>
    </div>
</template>

<script setup lang="ts">
import MatchState from '~/features/matches/types/MatchState'
import type { ITeamData } from '~/features/championships/types/ICupSummary'

const props = defineProps<{
    team: ITeamData | null
    score: number
    matchState: MatchState
    isWinner: boolean
    isUpcoming: boolean
    side: 'team1' | 'team2'
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const teamName = computed(() => {
    if (!props.team?.name) {
        return props.side === 'team2' ? 'لم يحدد بعد' : 'غير محدد'
    }
    return props.team.name
})

const scoreDisplay = computed(() => {
    if (props.isUpcoming || props.matchState === MatchState.Undefined) return '-'
    if (props.matchState !== MatchState.Done && props.matchState !== MatchState.Live) return '-'
    return String(props.score)
})

const nameClass = computed(() => {
    if (!props.team?.name) return 'font-semibold text-[#737171]'
    if (props.isUpcoming) return 'font-semibold text-text-body'
    if (props.isWinner) return 'font-bold text-text-body'
    return 'font-semibold text-[#5C5A5A]'
})

const scoreClass = computed(() => {
    if (props.isUpcoming || props.isWinner) {
        return 'text-text-body drop-shadow-[0_2px_4px_rgba(22,19,19,0.25)]'
    }
    return 'text-[#5C5A5A]'
})
</script>
