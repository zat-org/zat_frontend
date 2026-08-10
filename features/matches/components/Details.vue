<template>
    <div class="relative flex w-full flex-col overflow-hidden bg-surface-base">
        <!-- <img
            src="/images/zat-logo-black.svg"
            alt=""
            class="pointer-events-none absolute start-1/2 top-1/2 z-0 w-[min(420px,70vw)] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
            aria-hidden="true"
        > -->

        <div class="relative z-10 flex w-full flex-col">
            <MatchDetailsPageHeader :champ="champ" />
            <MatchDetailsState
                :match="match"
                :champ-id="champId"
            />
            <MatchDetailsTeams :match="match" />
            <MatchDetailsStatistics :match="match" />
            <MatchDetailsOtherMatches
                :champ-id="champId"
                :current-match-id="match.id"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IChamp } from '~/features/championships/types/IChamp'
import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'

defineProps<{
    match: IMatchFullDetails
    champ: IChamp | null
    champId: number | string
}>()
</script>
