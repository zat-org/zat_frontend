<template>
    <div class="divider"> بيانات المباراة </div>
    <div class="grid grid-cols-5  grid-flow-row gap-1 md:gap-4 place-items-center text-center">
        <div class="col-start-1 col-end-3">
            <p class="text-sm text-gray-400"> {{ match.leagueName }}</p>
            <p class="text-sm text-amber-500 ">الجولة {{ match.tournament }}</p>
        </div>
        <div>
            <a v-if="match.url" :href="`${match.url}`" target="_blank">
                <div class="bg-gray-100 h-10 w-10 rounded-full flex justify-center items-center  ">
                    <Icon name="ion:logo-youtube" class="text-red-500" size="23"></Icon>
                </div>
            </a>
        </div>
        <div class="col-start-4 col-end-6 ">
            <p class="text-sm text-gray-400">
                تاريخ المباراة
            </p>
            <p class="text-sm text-amber-500 ">
                {{ new Date(match.start_at).toLocaleDateString("ar-EG") }}
            </p>
        </div>
        <div class="col-start-1 col-end-6 flex justify-around w-full items-center relative ">
            <div>
                <div class="avatar">
                    <div class="mask mask-squircle bg-white p-3 ">
                        <div class="overflow-hidden w-16 h-16  sm:h-24 sm:w-24 bg-no-repeat bg-contain bg-center"
                            :style="`background-image:url(${url + match.team1.logo})`">
                        </div>
                    </div>
                </div>
                <p class="col-start-1 col-end-3">{{ match.team1.name }}</p>

            </div>
            <div>
                <template v-if="match.state === MatchState.Done">
                    <p class="text-yellow-400 text-4xl md:text-6xl md:font-mono">
                        {{ match.team1.score }} <span class="text-gray-600">-</span> {{ match.team2.score }}
                    </p>
                </template>
                <template v-else-if="match.state === MatchState.Upcoming">
                    <Icon name="fxemoji:squaredvs" width="50" height="50" />
                </template>
                <template v-else-if="match.state === MatchState.Live">
                    <Icon name="svg-spinners:pulse-rings-3" color="red" width="50" height="50" />
                </template>
                <div class="py-1 px-3 rounded-full text-xs absolute bottom-0 left-1/2 -translate-x-1/2"
                    :class="Object.keys(MatchState)[Object.values(MatchState).indexOf(match.state)]">
                    {{ match.state }}
                </div>
            </div>
            <div>
                <div class="avatar">
                    <div class="mask mask-squircle bg-white  p-3 ">
                        <div class="overflow-hidden w-16 h-16  sm:h-24 sm:w-24 bg-no-repeat bg-contain bg-center"
                            :style="`background-image:url(${url + match.team2.logo})`">
                        </div>
                    </div>
                </div>
                <p class="col-start-4 col-end-6">{{ match.team2.name }}</p>

            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import IMatchFullDetails from '~/Models/IMatchFullDetails';
import MatchState from '~/Models/MatchState';

const props = defineProps(["match"])
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const match = toRef(props.match as IMatchFullDetails)
</script>

<style scoped>
.Upcoming {
    @apply bg-amber-500 text-white
}

.Done {
    @apply bg-gray-500 text-white
}

.Live {
    @apply bg-red-500 text-white
}
</style>
