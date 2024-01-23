<template>
    <div class="flex justify-evenly items-center bg-white rounded-xl shadow-lg h-24 ">
        <div class="w-1/4 flex flex-col justify-center items-center rounded-r-xl  overflow-hidden  ">
            <div v-if="trans.to_team_logo !== null">
                <object type="image/png" :data="url + trans.to_team_logo" :aria-label="trans.to_team_name"
                    class="object-center object-cover flex justify-center items-center rounded-lg  w-16">
                    <UIcon name="i-heroicons-user-group" class="text-[75px] text-amber-500" />
                </object>
                <p class=" font-semibold text-center dark:text-slate-700 text-sm">{{ trans.to_team_name }}</p>
            </div>
            <p v-else class="font-semibold text-center dark:text-slate-700">لاعب <br /> حر </p>
        </div>
        <div class="text-center w-2/4 flex flex-nowrap justify-around ">
            <div class="flex justify-center items-center ms-2">
                <UIcon name="i-heroicons-arrow-long-right" :rotate="0"
                    :class="[trans.to_team_name === currentTeamName ? 'text-green-400' : 'text-red-400', 'text-[50px]']" />
            </div>
            <div class="flex flex-col justify-center grow items-center py-2 space-y-1 hover:cursor-pointer hover:scale-105 active:scale-100 transition-transform duration-500 ease-out "
                @click="$router.push(`/players/${trans.player_id}`)">
                <UAvatar size="xl" :ui="{ rounded: 'rounded-lg object-cover object-center shadow-lg' }"
                    :src="url + trans.image" icon="i-heroicons-user" :alt="trans.name" />
                <p class="text-xs md:text-sm text-center font-semibold truncate text-amber-900">
                    {{ trans.name }}
                </p>
            </div>
        </div>
        <div class="w-1/4 flex flex-col justify-center  items-center rounded-l-xl h-full overflow-hidden bg-white">
            <div v-if="trans.from_team_logo !== null">
                <object type="image/png" :data="url + trans.from_team_logo" :aria-label="trans.from_team_name"
                    class="object-center  flex justify-center items-center rounded-lg  w-16">
                    <UIcon name="i-heroicons-user-group" class="text-[75px] text-amber-500" />
                </object>
                <p class=" font-semibold text-center dark:text-slate-700 text-sm">{{ trans.from_team_name }}</p>
            </div>
            <p v-else class="font-semibold text-center dark:text-slate-700">لاعب <br /> حر </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITransfer } from '@/Models/ITeam';

const url = useRuntimeConfig().public.apiBaseUrl;

const props = defineProps({
    trans: { type: Object as PropType<ITransfer>, required: true }
    , currentTeamName: { type: String, required: false }

})
</script>

<style scoped></style>