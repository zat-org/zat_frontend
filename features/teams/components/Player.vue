<template>
    <div @click="$router.push(`/players/${player.id}`)" class="flex flex-col justify-center items-center clickable"
        :class="player.isCaptain ? 'order-first' : ''">
        <Image :src="url + player.image" class="object-top object-cover" :alt="player.name" icon="i-heroicons-user" />
        <div class="text-center mt-1">
            <p class="truncate text-sm font-semibold text-text-heading">
                {{ player.name }}
            </p>
            <p class="text-xs text-amber-500">
                {{ player.isCaptain ? `كابتن الفريق` : `لاعب بالفريق` }}
            </p>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { IPlayerLessDetails } from '~/features/teams/types/ITeam';
const url = useRuntimeConfig().public.apiBaseUrl
defineProps<{ player: IPlayerLessDetails }>()
</script>

<style scoped></style>