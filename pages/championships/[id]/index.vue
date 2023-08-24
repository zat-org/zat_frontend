<template>
    <div v-if="$props.leagueData" class="card border-[1px] border-blue-300 bg-base-100 shadow-xl w-full">
        <figure class="bg-blue-200  md:px-2">
            <nuxt-img loading="lazy" :src="url + league.league_logo" class="w-24 md:w-32 py-2" alt="championship logo" />
        </figure>
        <div class="card-body text-center flex flex-col justify-center items-center space-y-3 ">
            <h2 class="card-title ">{{ league.name }}</h2>
            <p class=" text-gray-600"> {{ league.description }}</p>

            <div class="stat p-0 flex flex-col justify-center items-center space-y-2">
                <template v-if="league.state === LeagueState.done">
                    <p class="font-semibold"> الفائز فريق {{ league.winner_name }}</p>
                    <div class="flex justify-center items-center">
                        <Icon name="fluent-emoji:1st-place-medal" size="30" class="mx-3" />
                        <div class="avatar team-avatar ">
                            <div class=" w-16 sm:w-20 md:w-24 rounded-xl bg-white p-1  shadow-lg ">
                                <nuxt-img loading="lazy" :src="url + league.winner_logo" />
                            </div>
                        </div>
                        <Icon name="fluent-emoji:1st-place-medal" size="30" class="mx-3" />
                    </div>
                </template>
                <template v-else-if="league.state === LeagueState.upcoming">
                    <Icon name="fluent-emoji:fire" size="50" />
                    <p class="font-semibold">تبدأ قريبا كن متيقظا</p>
                </template>
                <template v-else-if="league.state === LeagueState.live">
                    <Icon name="fluent-emoji:crossed-swords" class="text-4xl" />
                    <p class="font-semibold">يجري الان وفي انتظار حسم اللقب</p>
                </template>
            </div>

            <div class="stats p-0 w-full overflow-hidden">
                <div class="stat flex flex-col p-0">
                    <div class="stat-figure text-secondary">
                        <Icon name="fluent-emoji:calendar" size="30" />
                    </div>
                    <div class="stat-title  text-md"> بداية البطولة</div>
                    <div class="stat-value  text-lg">{{ new Date(league.start_at).toLocaleDateString("ar-eg") }}</div>
                </div>

                <div class="stat flex flex-col p-0">
                    <div class="stat-figure text-secondary">
                        <Icon name="fluent-emoji:calendar" size="30" />
                    </div>
                    <div class="stat-title  text-md"> نهاية البطولة</div>
                    <div class="stat-value text-lg">{{ new Date(league.end_at).toLocaleDateString("ar-eg") }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IChamp from "~/Models/IChamp"

import LeagueState from "~/Models/ChampState";
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const props = defineProps({
    leagueData: {
        type: Object,
        required: true
    }
})
const league = toRef<IChamp>(props.leagueData as IChamp);

useHead({
    title: `${props.leagueData.name} `,
})

</script>

<style scoped>
.team-avatar img {
    object-fit: contain;
}
</style>