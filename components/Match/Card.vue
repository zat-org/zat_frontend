<template>
    <div class="relative rounded-lg overflow-hidden  shadow-md text-slate-600 bg-gradient-to-r from-[#f2994a] to-[#f2c94c]"
        @click.prevent="handleMatchCardClick">

        <p class="text-center text-sm truncate pt-2"> {{ match.name }} - {{ match.tournament_name }} </p>

        <div class="flex justify-between items-center my-2 ">
            <div class="w-1/3 text-center  flex flex-col items-center">
                <Image :src="url + match.team_1_logo" class="bg-white object-contain mb-1" :alt="match.team_1_name"
                    icon="i-heroicons-user-group" />
                <p class="font-semibold truncate text-sm"> {{ match.team_1_name }} </p>
            </div>
            <div class="w-1/3 flex flex-col justify-center items-center">
                <template v-if="match.state === MatchState.Done">
                    <p v-if="match.team_1_score !== null && match.team_2_score !== null"
                        class="text-slate-700 font-mono text-4xl xl:text-6xl">
                        {{ match.team_1_score }} <span class="text-gray-800">-</span> {{ match.team_2_score }}
                    </p>
                </template>
                <Icon v-else-if="match.state === MatchState.Upcoming" name="twemoji:crossed-swords" width="50"
                    height="50" />
                <Icon v-else-if="match.state === MatchState.Live" name="svg-spinners:pulse-rings-3" color="red" width="50"
                    height="50" />
            </div>
            <div class="w-1/3 text-center flex flex-col items-center">
                <Image :src="url + match.team_2_logo" class="bg-white  object-contain mb-1" :alt="match.team_2_name"
                    icon="i-heroicons-user-group" />
                <p class="font-semibold truncate text-sm"> {{ match.team_2_name }} </p>
            </div>
        </div>

        <div class="flex items-center">
            <div class="w-1/3  flex justify-center">
                <p class="w-24 text-center  text-xs md:text-sm text-white py-1 rounded-t-lg" :class="{
                    'bg-gray-800': match.state === MatchState.Done,
                    'bg-red-500': match.state === MatchState.Live,
                    'bg-amber-700': match.state === MatchState.Upcoming
                }">
                    {{ match.state }}
                </p>
            </div>
            <div class="w-1/3">
                <div class="w-14 h-14 bg-white rounded-full absolute left-1/2 bottom-0 translate-y-1/2  -translate-x-1/2"
                    v-if="match.url" @click.prevent="handleYoutubeClick">
                    <Icon name="ion:logo-youtube" class="text-red-600 absolute top-1 left-1/2 -translate-x-1/2" size="25">
                    </Icon>
                </div>
            </div>
            <div class="w-1/3  flex justify-center">
                <p class="w-24 text-center text-xs md:text-sm text-white py-1 rounded-t-lg " :class="{
                    'bg-gray-800': match.state === MatchState.Done,
                    'bg-red-500': match.state === MatchState.Live,
                    'bg-amber-700': match.state === MatchState.Upcoming
                }">
                    {{ new Date(match.start_at).toLocaleDateString("ar-EG") }}
                </p>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import MatchState from "@/Models/MatchState";
import type { IMatchLessDetails } from "@/Models/IMatchLessDetails"

const props = defineProps<{
    match: IMatchLessDetails,
    champId: number
}>()
const url = useRuntimeConfig().public.apiBaseUrl

function handleMatchCardClick() {
    if (props.match.state === MatchState.Live && props.match.url) {
        window.open(props.match.url, "_blank")
    } else {
        navigateTo(`/championships/${props.champId}/match/${props.match.id}`)
    }
}

function handleYoutubeClick(event: Event) {
    window.open(props.match.url, "_blank")
    event.stopImmediatePropagation()
}
</script>

<style scoped></style>    