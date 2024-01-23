<template>
    <UCard :ui="ui" class="shadow-xl w-full clickable relative bg-gray-200"
        @click="$router.push(`/championships/${champion.leagueid}`)">
        <template #default>
            <div class="flex ">
                <UChip size="2xl" :ui="{ background: 'h-[35px] w-[35px] ', position: { 'top-right': 'top-1 right-1' } }">
                    <div class="w-32 h-32 rounded-xl shrink-0 overflow-hidden bg-white flex justify-center items-center">
                        <object type="image/png" :data="url + champion.url" :aria-label="champion.name"
                            class="object-center w-28 flex justify-center items-center">
                            <UIcon name="i-heroicons-trophy" class="text-[75px] text-amber-500" />
                        </object>
                    </div>
                    <template #content>
                        <template v-if="champion.state === LeagueState.done">
                            <UIcon name="i-heroicons-check-badge" class="text-white-500 text-[35px]" />
                        </template>
                        <template v-else-if="champion.state === LeagueState.upcoming">
                            <UIcon name="i-heroicons-clock" class="text-white-500 text-[35px]" />
                        </template>
                        <template v-else-if="champion.state === LeagueState.live">
                            <UIcon name="i-heroicons-fire-16-solid" class="text-white-500 text-[35px]" />
                        </template>
                    </template>
                </UChip>
                <div class=" ms-5 space-y-2 grow ">
                    <h2 class="font-semibold text-lg">{{ champion.name }}</h2>
                    <p class="text-sm line-clamp-4 ">{{ champion.description }}</p>
                </div>
            </div>
        </template>
    </UCard>
</template>

<script setup lang="ts">
import type { IChamp } from '@/Models/IChamp';
import LeagueState from '@/Models/ChampState';

const props = defineProps({
    champion: {
        required: true,
        type: Object as PropType<IChamp>
    }
})
const url = useRuntimeConfig().public.apiBaseUrl;
const ui = {
    size: {
        "3xl": "h-44 w-44"
    }
}
</script>

<style scoped></style>