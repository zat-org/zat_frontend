<template>
    <div class="card border-[1px] border-blue-300 md:card-side bg-base-100 shadow-xl">
        <figure class="bg-blue-200  md:px-2"><img :src="url + league.league_logo" class="w-24 py-2"
                alt="championship logo" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ league.name }}</h2>
            <p>{{ league.description }}</p>
            <div class="flex flex-col justify-center items-center space-y-2">
                <template v-if="league.state === LeagueState.done">
                    <p> الفائز فريق {{ league.winner_name }}</p>
                    <div class="avatar team-avatar ">
                        <div class=" w-16 sm:w-20 md:w-24 rounded-xl bg-white p-1  shadow-lg ">
                            <img :src="url + league.winner_logo" />
                        </div>
                    </div>
                </template>
                <template v-else-if="league.state === LeagueState.upcoming">
                    <Icon name="ep:timer" class="text-4xl text-yellow-500" />
                    <p>قريبا ... </p>
                </template>
                <template v-else-if="league.state === LeagueState.live">
                    <Icon name="octicon:flame-16" class="text-4xl text-red-500" />
                    <p>يجري الان</p>
                </template>
            </div>
            <div class=" flex justify-evenly w-full items-center rounded-lg mt-2">
                <div class="flex flex-col justify-center items-center">
                    <p class="text-zinc-400">يبدأ </p>
                    <p class="text-zinc-700 text-lg">{{ new Date(league.start_at).toLocaleDateString("ar-eg") }}
                    </p>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <p class="text-zinc-400">ينتهي </p>
                    <p class="text-zinc-700 text-lg">{{ new Date(league.end_at).toLocaleDateString("ar-eg") }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IChamp from "~/Models/IChamp"
import ChampState from "~/Models/ChampState";
import LeagueState from "~/Models/ChampState";
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const props = defineProps({
    leagueData: {
        type: Object,
        required: true
    }
})
const league = toRef<IChamp>(props.leagueData as IChamp);



</script>

<style scoped>
.team-avatar img {
    object-fit: contain;
}
</style>