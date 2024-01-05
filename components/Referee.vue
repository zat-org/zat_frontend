<template>
    <div class=" bg-zinc-100 dark:bg-slate-600  dark:text-slate-50 rounded-xl shadow-lg p-4 flex justify-start  ">
        <div class="avatar w-1/3 flex justify-center pr-4">
            <div class="w-16 sm:w-16 md:w-20 rounded-xl shadow-lg  ">
                <nuxt-img loading="lazy" class="object-top" :src="url + referee.image" :alt="referee.name" />
            </div>
        </div>
        <div class="flex flex-col  justify-start items-start space-y-1 w-2/3 text-amber-900 dark:text-slate-50">

            <p class="text-sm text-center font-semibold ">
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
import getElapsedTime from "@/utils/getElapsedTime"
import type {IReferee} from '@/Models/IReferee';

const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 

const props = defineProps({
    referee: {
        type: Object as PropType<IReferee>,
        required: true
    }
})
</script>

<style scoped></style>