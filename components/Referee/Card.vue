<template>
    <div class=" bg-zinc-100 dark:bg-slate-600  dark:text-slate-50 rounded-xl shadow-lg p-4 flex justify-start  ">
        <UAvatar size="3xl" :src="baseUrl + referee.image" class="w-24 h-24 me-4 " icon="i-heroicons-user"
            :ui="{ rounded: 'object-top object-cover' }" />

        <div class="flex flex-col justify-center items-start space-y-1  text-amber-900 dark:text-slate-50">
            <p class=" text-center font-semibold ">
                {{ referee.name }}
            </p>
            <p class="text-xs  te">
                بدأ التحكيم منذ <span class="text-amber-700 dark:text-amber-300 ">{{
                    getElapsedTime(referee.start_refereeing_at)
                }}</span>
            </p>
            <p class="text-xs "> حكم بـ <span class="text-amber-700 dark:text-amber-300">
                    {{ `${parseInt(referee.refereed_matches_count) > 1 ?
                        ` ${referee.refereed_matches_count} مباريات`
                        : ' مباراة واحدة'}` }}
                </span> </p>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'nuxt/dist/app/compat/capi';
import type { IReferee } from '@/Models/IReferee';

const baseUrl = useRuntimeConfig().public.apiBaseUrl;

const props = defineProps({
    referee: {
        type: Object as PropType<IReferee>,
        required: true
    }
})
</script>

<style scoped></style>