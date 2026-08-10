<template>
    <div class="flex w-full flex-wrap items-start justify-center gap-4">
        <MatchDetailsMemberCard
            v-for="player in sortedPlayers"
            :key="player.id"
            :person="toPerson(player)"
            :role="player.isCaptain ? 'كابتن الفريق' : 'لاعب'"
        />
        <MatchDetailsMemberCard
            v-for="coach in coaches"
            :key="`coach-${coach.id}`"
            :person="coach"
            role="مدرب الفريق"
        />
    </div>
</template>

<script setup lang="ts">
import type { IPlayerLessDetails } from '~/features/teams/types/ITeam'
import type { Person } from '~/features/matches/types/IMatchFullDetails'

const props = defineProps<{
    players: IPlayerLessDetails[]
    coaches: Person[]
}>()

const sortedPlayers = computed(() =>
    [...props.players].sort((a, b) => Number(b.isCaptain) - Number(a.isCaptain)),
)

function toPerson(player: IPlayerLessDetails): Person {
    return {
        id: player.id,
        name: player.name,
        image: player.image,
    }
}
</script>
