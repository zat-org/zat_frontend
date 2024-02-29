<template>
    <div class="w-full flex justify-around flex-wrap px-2 ">
        <template v-for="(player, index) in  players " :key="player.id">
            <TeamPlayer :player="player" class="w-1/2 md:w-1/3 mt-3" />
        </template>
        <template v-for="coach in  coaches" :key="coach.id">
            <TeamCoach :coach="coach" class="w-1/2 md:w-1/3 mt-3" />
        </template>
    </div>
</template>

<script setup lang="ts">
import type { IPlayerLessDetails } from '@/Models/ITeam';
import type { Person } from '~/Models/IMatchFullDetails';
defineProps<{ players: IPlayerLessDetails[], coaches: Person[] }>()
</script>

<style scoped></style>