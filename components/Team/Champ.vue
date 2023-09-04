<template>
    <div class="flex justify-evenly items-center  bg-gray-200 rounded-xl shadow-lg">
        <div class="avatar avatar-contain w-1/4 flex justify-start items-center h-full ">
            <div class=" w-16 sm:w-20 md:w-32 rounded-r-xl h-full shadow-lg bg-white p-1 ">
                <nuxt-img loading="lazy" class="object-center" :src="url + champ.logo" :alt="champ.name" />
            </div>
        </div>
        <div class="text-center w-2/4 flex flex-col justify-center items-center py-2 space-y-0.5">
            <Icon name="fluent-emoji:trophy" size="35" />
            <p class="text-md text-center font-semibold  text-amber-900">
                {{ champ.name }}
            </p>
            <p class="text-sm text-amber-500">
                موسم {{ new Date(champ.end_at).getFullYear() }}
            </p>

        </div>
        <div class="w-1/4  flex justify-end items-center h-full">
            <NuxtLink :to="`/championships/${champ.id}`"
                class=" btn bg-blue-300 rounded-l-xl h-full rounded-r-none border-0 text-white hover:text-slate-700 hover:bg-gray-300">
                <Icon name="fluent:arrow-circle-left-24-filled" size="35" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi';
import { IChampLessDetails } from '@/Models/ITeam';

const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 

const props = defineProps({
    champ: { type: Object as PropType<IChampLessDetails>, required: true }
})
</script>

<style scoped></style>