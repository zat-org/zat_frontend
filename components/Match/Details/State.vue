<template>
    <UDivider> بيانات المباراة </UDivider>
    <div class="my-2">
        <p class="text-center  text-gray-400 dark:text-slate-300"> {{ match.leagueName }}</p>
        <p class="text-center  text-amber-500 ">{{ match.tournament }}</p>
    </div>
    <div class="flex items-end flex-wrap justify-around w-full text-center my-5 ">
        <div
            class="bg-gray-50 border px-3 py-1 h-[4rem] rounded-lg flex justify-center my-1 items-center text-amber-500">
            <div>
                <p class="text-sm lg:text-md text-gray-700">
                    تاريخ المباراة
                </p>
                <p>
                    {{ new Date(match.start_at).toLocaleDateString("ar-EG") }}
                </p>
            </div>
            <UIcon name="i-heroicons-calendar-days-solid" class="ms-3 text-3xl" />
        </div>

        <ClientOnly>
            <MatchDetailsEstimation :match="match"  />
        </ClientOnly>

        <div v-if="match.url" class=" flex  justify-center h-[4rem] my-1">
            <a :href="match.url" target="_blank"
                class="rounded-lg clickable bg-gray-50 border flex py-2 px-3 justify-center items-center">
                <Icon name="ion:logo-youtube" class="text-red-500 me-3" size="28"></Icon>
                <div>
                    <p class="text-sm lg:text-md text-slate-700">شاهد المباراة</p>
                    <p class="text-sm lg:text-md text-slate-700"> على قناة زات</p>
                </div>
            </a>
        </div>
    </div>

    <div class="flex items-center justify-around w-full text-center relative my-5">
        <div class="w-1/3 flex flex-col items-center">
            <Image :src="url + match.team1.logo" class="bg-white p-1 object-contain" :alt="match.team1.name"
                icon="i-heroicons-user-group" />
            <p class="text-xl font-semibold truncate mt-3"> {{ match.team1.name }} </p>
        </div>
        <div class="w-1/3">
            <div class="h-20 md:h-24">

                <template v-if="match.state === MatchState.Done">
                    <p class="text-yellow-400 text-4xl md:text-6xl font-mono">
                        {{ match.team1.score }} <span class="text-gray-600">-</span> {{ match.team2.score }}
                    </p>
                </template>

                <template v-else-if="match.state === MatchState.Upcoming">
                    <Icon name="fxemoji:squaredvs" width="50" height="50" />
                </template>

                <template v-else-if="match.state === MatchState.Live">
                    <Icon name="svg-spinners:pulse-rings-3" color="red" width="50" height="50" />
                </template>
            </div>
            <div class="py-1 px-3 rounded-full text-xs absolute bottom-0 left-1/2 -translate-x-1/2 text-white"
                :class="[`${chipBg()}`]">
                {{ match.state }}
            </div>
        </div>
        <div class="w-1/3 flex flex-col items-center">
            <Image :src="url + match.team2.logo" class="bg-white p-1 object-contain" :alt="match.team2.name"
                icon="i-heroicons-user-group" />
            <p class="text-xl font-semibold truncate mt-3"> {{ match.team2.name }} </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import MatchState from '@/Models/MatchState';
import type { IMatchFullDetails } from "@/Models/IMatchFullDetails"

const props = defineProps<{ match: IMatchFullDetails }>();
const url = useRuntimeConfig().public.apiBaseUrl;

const chipBg = () => {
    switch (props.match.state) {
        case MatchState.Done:
            return 'bg-gray-500';
        case MatchState.Live:
            return 'bg-red-500';
        case MatchState.Upcoming:
            return 'bg-amber-500';
    }
}

</script>

<style scoped></style>
