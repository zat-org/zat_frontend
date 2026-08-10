<template>
    <section
        v-if="otherMatches.length"
        class="w-full bg-surface-base py-6"
        aria-label="مباريات اخرى"
        dir="rtl"
    >
        <div class="page-container flex flex-col gap-4">
            <ChampionshipsSectionDivider title="مباريات اخرى" />

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ChampionshipsOverviewMatchCard
                    v-for="item in otherMatches"
                    :key="item.id"
                    :match="item"
                    :champ-id="champId"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import { sortByTime } from '~/features/matches/utils/CollectionsWithTimeUtils'

const props = defineProps<{
    champId: number | string
    currentMatchId: number | string
}>()

const { $api } = useNuxtApp()

const { data } = await $api.champions.getChampMatchesByChampId(String(props.champId))

const otherMatches = computed(() => {
    const matches = data.value?.matches ?? []
    const currentId = Number(props.currentMatchId)
    return [...matches]
        .filter(match => match.id !== currentId)
        .sort(sortByTime)
        .slice(0, 4) as IMatchLessDetails[]
})
</script>
