<template>
    <div class="flex rounded-xl shadow-lg w-full border dark:border-0 bg-gray-50 dark:bg-slate-900 hover:cursor-pointer hover:scale-105 active:scale-100 transition-transform duration-500 ease-out"
        @click="$router.push(`/championships/${champ.id}`)">
        <object type="image/png" :data="url + champ.logo" :aria-label="champ.name"
            class="object-center w-28 h-28 flex justify-center items-center p-2 bg-white rounded-r-lg object-cover">
            <UIcon name="i-heroicons-trophy" class="text-[75px] text-amber-500" />
        </object>
        <div class="flex flex-col justify-center items-center grow">
            <Icon name="fluent-emoji:trophy" class="text-3xl md:text-4xl" />
            <p class="text-lg text-center font-semibold  ">
                {{ champ.name }}
            </p>
            <p class="text-sm text-amber-500">
                موسم {{ new Date(champ.end_at).getFullYear() }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IChampLessDetails } from '@/Models/ITeam';

const url = useRuntimeConfig().public.apiBaseUrl;

const props = defineProps({
    champ: { type: Object as PropType<IChampLessDetails>, required: true }
})
</script>

<style scoped></style>