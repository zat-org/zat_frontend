<template>
    <div class="flex justify-center items-start flex-wrap w-full mt-2">
        <div v-for="(player, index) in  players " :key="player.id" @click="$router.push(`/players/${player.id}`)"
            class=" my-2 flex flex-col justify-center items-center clickable w-1/3"
            :class="player.isCaptain ? 'order-first' : ''">
            <Image :src="url + player.image" class="object-top object-cover" :alt="player.name" icon="i-heroicons-user" />
            <div class="flex justify-start items-end">
                <div class="grow text-center">
                    <p class="text-sm font-semibold mt-2 text-amber-900 dark:text-slate-50 text-clip">
                        {{ player.name }}
                    </p>
                    <p class="text-xs text-amber-500">
                        {{ player.isCaptain ? `كابتن الفريق` : `لاعب بالفريق` }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'nuxt/dist/app/compat/capi';
import type { IPlayerLessDetails } from '@/Models/ITeam';

const url = useRuntimeConfig().public.apiBaseUrl

defineProps({
    players: { type: Object as PropType<IPlayerLessDetails[]>, required: true }
})
</script>

<style scoped></style>