<template>
    <div class="grid grid-cols-3 w-full mt-2">
        <div v-for="(player, index) in players" :key="player.id" class=" flex flex-col justify-start items-center "
            :class="player.isCaptain ? '' : index % 2 === 0 ? 'order-first' : 'order-last'">
            <div class="avatar">
                <div class="rounded-xl shadow-lg  mask mask-squircle bg-white"
                    :class="player.isCaptain ? 'w-14 sm:w-18 md:w-24 ' : `w-12 sm:w-16 md:w-20 `">
                    <nuxt-img loading="lazy" class="object-top" :src="url + player.image" :alt="player.name" />
                </div>
            </div>
            <p class="text-sm text-center font-semibold mt-2 text-amber-900 dark:text-slate-50">
                {{ player.name }}
                <NuxtLink :to="`/players/${player.id}`">
                    <Icon name="solar:square-arrow-right-up-broken" class="text-blue-400" size="18" />
                </NuxtLink>
            </p>
            <p class="text-xs text-amber-500">
                {{ player.isCaptain ? `كابتن الفريق` : `لاعب بالفريق` }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi';
import { IPlayerLessDetails } from '@/Models/ITeam';

const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 

const props = defineProps({
    players: { type: Object as PropType<IPlayerLessDetails[]>, required: true }
})
</script>

<style scoped></style>