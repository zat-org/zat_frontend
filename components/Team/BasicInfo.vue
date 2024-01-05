<template>
    <section class="flex justify-around items-center ">
        <div class=" flex flex-col justify-center items-center space-y-3">
            <Icon name="fluent-emoji:calendar" class="text-4xl md:text-7xl" />
            <p class="text-sm text-center ">
                تأسس منذ
                <span class="text-amber-700 dark:text-amber-300">
                    {{ getElapsedTime(team.founded_in) }}
                </span>
            </p>
        </div>
        <div class="flex flex-col justify-center items-center space-y-3">
            <Icon name="fluent-emoji:trophy" class="text-4xl md:text-7xl" />
            <p class="text-sm   text-center">
                {{ ChampWinText }}
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
import getElapsedTime from "@/utils/getElapsedTime"
import type { PropType } from 'nuxt/dist/app/compat/capi';
import type { ITeamFullDetails } from '@/Models/ITeam';

const props = defineProps({
    team: { type: Object as PropType<ITeamFullDetails>, required: true }
})

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