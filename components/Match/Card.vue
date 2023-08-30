<template>
    <!-- -->
    <div dir="rtl" class="rounded-lg shadow-md relative bg-white pb-2" @click.prevent="handleMatchCardClick">
        <div class="bg-gradient-to-r from-[#ffcc33] to-[#ffb347] px-2 py-1 flex justify-between rounded-t-lg items-center">
            <div class="w-1/3  flex justify-center items-center">
                <p class="text-xs md:text-sm ">{{ match.name }} - {{ match.tournament_name }} </p>
            </div>
            <div class="w-1/3 flex justify-center items-center">
                <div v-if="match.url" @click.prevent="handleYoutubeClick" style="cursor: pointer;"
                    class="bg-white h-8 w-8 rounded-full flex justify-center items-center">
                    <Icon name="ion:logo-youtube" class="text-red-600" size="23"></Icon>
                </div>
            </div>
            <div class="w-1/3 flex justify-center items-center text-xs md:text-sm">
                {{ new Date(match.start_at).toLocaleDateString("ar-EG") }}
                <Icon name="fontisto:date" size="18" class="mx-1 text-zinc-600" />
            </div>
        </div>

        <div class="flex justify-center items-center my-2 ">
            <div class="w-1/3 flex justify-center items-center flex-col">
                <img :src="`${url}${match.team_1_logo}`" class="rounded-lg h-16 sm:h-20 md:h-24 object-cover"
                    alt="team logo">
                <p class="text-xl font-semibold "> {{ match.team_1_name }} </p>

            </div>
            <div class="w-1/3 flex justify-center items-center ">
                <div v-if="match.state === MatchState.Done && match.team_1_score !== null && match.team_2_score !== null">
                    <p class="text-yellow-400 text-4xl md:text-6xl md:font-mono">
                        {{ match.team_1_score }} <span class="text-gray-600">-</span> {{ match.team_2_score }}
                    </p>
                    <p
                        class="w-fit py-1 px-4 bg-gray-600 text-xs md:text-sm text-white rounded-t-lg absolute bottom-0 left-1/2 -translate-x-1/2">
                        {{ MatchState.Done }}
                    </p>

                </div>
                <div v-else-if="match.state === MatchState.Upcoming">
                    <Icon name="fxemoji:squaredvs" width="50" height="50" />
                    <p
                        class="w-fit py-1 px-4 bg-yellow-400 text-xs md:text-sm text-white rounded-t-lg absolute bottom-0 left-1/2 -translate-x-1/2">
                        {{ MatchState.Upcoming }}
                    </p>


                </div>
                <div v-else-if="match.state === MatchState.Live">
                    <Icon name="svg-spinners:pulse-rings-3" color="red" width="50" height="50" />
                    <p
                        class="w-fit py-1 px-4 bg-red-500 text-xs md:text-sm text-white rounded-t-lg absolute bottom-0 left-1/2 -translate-x-1/2">
                        {{ MatchState.Live }}
                    </p>
                </div>
            </div>
            <div class="w-1/3 flex justify-center items-center flex-col">
                <img :src="`${url}${match.team_2_logo}`" class="rounded-lg h-16 sm:h-20 md:h-24 object-cover"
                    alt="team logo">
                <p class="text-xl font-semibold"> {{ match.team_2_name }} </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import MatchState from "@/Models/MatchState";
const props = defineProps(["match", "champId"])
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 

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

<style scoped>
.background-color {
    background: #ffb347;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ffcc33, #ffb347);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ffcc33, #ffb347);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>    