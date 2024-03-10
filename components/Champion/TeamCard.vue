<template>
    <div
        class="w-full min-h-[30rem] bg-zinc-100 dark:bg-slate-600 rounded-xl shadow-lg flex flex-col items-center relative overflow-hidden pt-5 pb-7">
        <h4 class="font-bold text-lg">فريق {{ team.name }}</h4>
        <Image class="bg-white my-2 object-contain object-center" :src="url + team.team_logo" :alt="team.name"
            icon="i-heroicons-users" />
        <TeamPlayers v-bind:players="team.players" :coaches="team.coaches" />

        <UButton :to="`/teams/${team.id}`" class="absolute h-12 w-12 rounded-full -top-3 -left-3">
            <UIcon name="i-heroicons-arrow-up-left-16-solid" class="text-xl absolute bottom-2.5 right-2.5" />
        </UButton>
    </div>
</template>

<script setup lang="ts">
import type { ITeam } from '~/Models/ITeam';

defineProps<{ team: ITeam }>()
const url = useRuntimeConfig().public.apiBaseUrl;
</script>

<style scoped></style>