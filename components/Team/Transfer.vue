<template>
    <div class="flex justify-evenly items-center bg-gray-200 rounded-xl shadow-lg h-24">
        <div
            class="avatar avatar-contain w-1/4 flex flex-col justify-center rounded-r-xl shadow-lg items-center overflow-hidden h-full bg-white ">
            <div v-if="trans.to_team_logo !== null" class=" w-20 md:w-32  h-full  bg-white p-1 ">
                <nuxt-img loading="lazy" class="object-center" :src="url + trans.to_team_logo" :alt="trans.to_team_name" />
            </div>
            <p v-else class="font-semibold text-center dark:text-slate-700">لاعب <br /> حر </p>
            <p class=" font-semibold text-center dark:text-slate-700 text-sm">{{ trans.to_team_name }}</p>
        </div>
        <div class="text-center w-2/4 flex flex-nowrap justify-around ">
            <div class="flex justify-center items-center">
                <Icon name="gg:arrow-long-right" :rotate="0" size="50"
                    :class="trans.to_team_name === currentTeamName ? 'text-green-400' : 'text-red-400'" />
            </div>
            <div class="flex flex-col justify-center items-center py-2 space-y-0.5">
                <div class="avatar ">
                    <div class=" w-16  mask mask-squircle bg-white">
                        <nuxt-img loading="lazy" :src="url + trans.image" class="object-top" />
                    </div>
                </div>
                <p class="text-sm text-center font-semibold  text-amber-900">
                    {{ trans.name }}
                    <NuxtLink :to="`/players/${trans.player_id}`">
                        <Icon name="solar:square-arrow-right-up-broken" class="text-blue-400" size="18" />
                    </NuxtLink>
                </p>
            </div>
        </div>
        <div
            class="avatar avatar-contain w-1/4 flex flex-col  justify-center items-center h-full  shadow-lg overflow-hidden rounded-l-xl  bg-white">
            <div v-if="trans.from_team_logo !== null" class=" w-20 md:w-32  h-full bg-white p-1 ">
                <nuxt-img loading="lazy" class="object-center" :src="url + trans.from_team_logo"
                    :alt="trans.from_team_name" />
            </div>
            <p v-else class="font-semibold text-center dark:text-slate-700">لاعب <br /> حر </p>
            <p class="font-semibold text-center dark:text-slate-700 text-sm">{{ trans.from_team_name }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi';
import { ITransfer } from '@/Models/ITeam';

const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 

const props = defineProps({
    trans: { type: Object as PropType<ITransfer>, required: true }
    , currentTeamName: { type: String, required: false }

})
</script>

<style scoped></style>