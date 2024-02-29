<template>
    <div v-if="match.team1.players?.length > 0 && match.team2.players?.length > 0">
        <UDivider>لاعبي الفريقين</UDivider>
        <div class="flex text-gray-500 justify-around  text-sm">
            <div>
                <div v-for="player, index in match.team1.players" :key="player.id"
                    class="flex justify-start  items-center  mb-3">
                    <Image :src="url + player.image" class="object-top me-4 object-cover" :alt="player.name"
                        icon="i-heroicons-user" />
                    <div>
                        <p class="text-gray-950 text-md lg:text-lg dark:text-slate-50 text-right">
                            {{ player.name }}
                        </p>
                        <p class="text-xs lg:text-sm text-right dark:text-slate-400">
                            {{ index === 0 ? `كابتن الفريق` : `لاعب بالفريق` }}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div v-for="player, index in match.team2.players" :key="player.id"
                    class="flex justify-end items-center mb-3">
                    <div>
                        <p class="text-gray-950 text-md lg:text-lg dark:text-slate-50 text-left">
                            {{ player.name }}
                        </p>
                        <p class="text-xs lg:text-sm text-left dark:text-slate-400">
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
import type { IMatchFullDetails } from "@/Models/IMatchFullDetails"
const url = useRuntimeConfig().public.apiBaseUrl;
defineProps({
    match: {
        required: true,
        type: Object as PropType<IMatchFullDetails>
    }
});
</script>

<style scoped></style>
