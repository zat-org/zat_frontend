<template>
    <div class="flex rounded-xl shadow-lg w-full border dark:border-0 bg-gray-50  dark:bg-slate-900 clickable"
        @click="$router.push(`/teams/${team.id}`)">
        <div class="w-32 h-32 rounded-r-xl overflow-hidden bg-white flex justify-center items-center">
            <object type="image/png" :data="url + team.team_logo" :aria-label="team.name"
                class="object-center w-28 flex justify-center items-center">
                <UIcon name="i-heroicons-users" class="text-[75px] text-amber-500" />
            </object>
        </div>
        <div class="flex flex-col justify-center grow">
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
import type { ITeamLessDetails } from '@/Models/ITeam';

const props = defineProps({
    team: { type: Object as PropType<ITeamLessDetails>, required: true }
})
const url = useRuntimeConfig().public.apiBaseUrl; // remove /api from strapi url 

const ChampWinText = computed(() => {
    switch (props.team.winning_count) {
        case '0':
            return "لم يفز بأي بطولات "
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