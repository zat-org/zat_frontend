<template>
    <div v-if="match.team1.players?.length > 0 && match.team2.players?.length > 0">
        <USeparator>لاعبي الفريقين</USeparator>
        <div class="flex justify-around text-sm text-text-caption">
            <div>
                <div v-for="player, index in match.team1.players" :key="player.id"
                    class="flex justify-start  items-center  mb-3">
                    <Image :src="url + player.image" class="object-top me-4 object-cover" :alt="player.name"
                        icon="i-heroicons-user" />
                    <div>
                        <p class="text-right text-md text-text-heading lg:text-lg">
                            {{ player.name }}
                        </p>
                        <p class="text-right text-xs text-text-caption lg:text-sm">
                            {{ index === 0 ? `كابتن الفريق` : `لاعب بالفريق` }}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div v-for="player, index in match.team2.players" :key="player.id"
                    class="flex justify-end items-center mb-3">
                    <div>
                        <p class="text-left text-md text-text-heading lg:text-lg">
                            {{ player.name }}
                        </p>
                        <p class="text-left text-xs text-text-caption lg:text-sm">
                            {{ index === 0 ? `كابتن الفريق` : `لاعب بالفريق` }}
                        </p>
                    </div>
                    <Image :src="url + player.image" class="object-top ms-4 object-cover" :alt="player.name"
                        icon="i-heroicons-user" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IMatchFullDetails } from "~/features/matches/types/IMatchFullDetails"
const url = useRuntimeConfig().public.apiBaseUrl;
defineProps({
    match: {
        required: true,
        type: Object as PropType<IMatchFullDetails>
    }
});
</script>

<style scoped></style>
