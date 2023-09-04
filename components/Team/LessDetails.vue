<template>
    <div
        class="bg-zinc-100 rounded-xl shadow-lg p-4 text-amber-900 dark:text-slate-50 dark:bg-slate-700 flex justify-evenly relative overflow-hidden">
        <NuxtLink :to="`/teams/${team.id}`"
            class="absolute  h-12 w-12 rounded-full bg-blue-400 -top-3 -left-3 btn dark:border-slate-700 text-white  hover:text-slate-700 ">
            <Icon name="fluent:arrow-circle-up-left-24-filled" class=" text-xl absolute bottom-2 right-2" />
        </NuxtLink>
        <div class="avatar avatar-contain">
            <div class=" w-20 sm:w-24 md:w-32 rounded-xl bg-white p-1  shadow-lg ">
                <nuxt-img :src="url + team.team_logo" />
            </div>
        </div>

        <div class="w-full">
            <p class="text-lg text-center font-semibold  mb-3">
                فريق {{ team.name }}
            </p>
            <div class="flex justify-around">
                <div class="w-1/2 flex flex-col justify-center items-center space-y-3">
                    <Icon name="fluent-emoji:calendar" size="35" />
                    <p class="text-xs text-center ">
                        تأسس منذ
                        <span class="text-amber-700 dark:text-amber-300">
                            {{ getElapsedTime(team.founded_in) }}
                        </span>
                    </p>
                </div>
                <div class=" w-1/2 flex flex-col justify-center items-center space-y-3">
                    <Icon name="fluent-emoji:trophy" size="35" />
                    <p class="text-xs  text-center">
                        {{ ChampWinText }}
                    </p>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi';
import getElapsedTime from "@/utils/getElapsedTime"
import { ITeamLessDetails } from '@/Models/ITeam';

const props = defineProps({
    team: { type: Object as PropType<ITeamLessDetails>, required: true }
})
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 

const ChampWinText = computed(() => {
    switch (props.team.winning_count) {
        case '0':
            return "لم يفز بأي بطولات حتى الاّن"
        case '1':
            return "فاز ببطولة واحدة"
        case '2':
            return "فاز ببطولتان"
        default:
            return `فاز بـ ${props.team.winning_count} بطولات`
    }
})
</script>

<style scoped></style>