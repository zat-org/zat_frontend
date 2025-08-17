<template>
    <table class="shadow-lg text-center w-full table-auto border-separate border-spacing-0">
        <thead>
            <tr class="bg-amber-500 text-slate-50 text-sm  md:text-lg h-12">
                <th class="px-1 w-2/12 md:w-6/12 text-start ps-6">
                    الفريق
                </th>
                <th class="px-1 w-1/12 md:w-1/12">
                    لعب
                </th>
                <th class="px-1 w-1/12 md:w-1/12">
                    فاز
                </th>
                <th class="px-1 w-1/12 md:w-1/12">
                    تعادل
                </th>
                <th class="px-1 w-1/12 md:w-1/12">
                    خسر
                </th>
                <th class="px-1 w-1/12 md:w-1/12">
                    أبناط
                </th>
                <th class="px-1 w-1/12 md:w-1/12">
                    نقاط
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for=" teamSummary, index  in  table " :key="teamSummary.id"
                class="h-10 even:bg-slate-100 even:dark:bg-slate-500 odd:bg-slate-200 odd:dark:bg-slate-600">
                <td class="px-1 text-start relative">
                    <div
                        class="h-[100%] w-5 bg-transparent absolute top-0 right-0 flex justify-center items-center text-amber-500">
                        <span class="">{{ index + 1 }}</span>
                    </div>
                    <span class="font-semibold text-blue-900 dark:text-slate-50 pl-6 pr-0">
                        {{ teamSummary.name }}</span>
                </td>
                <td class="px-1 text-gray-700 dark:text-slate-300">{{ teamSummary.play }}</td>
                <td class="px-1 text-gray-700 dark:text-slate-300">{{ teamSummary.win }}</td>
                <td class="px-1 text-gray-700 dark:text-slate-300">{{ teamSummary.draw }}</td>
                <td class="px-1 text-gray-700 dark:text-slate-300">{{ teamSummary.lost }}</td>
                <td class="px-1 text-gray-700 dark:text-slate-300">{{ teamSummary.abnat }}</td>
                <td class="px-1 font-bold text-blue-900 dark:text-slate-50">
                    {{ teamSummary.totalScore }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import type { LeagueTeamSummary } from "@/Models/IChamp"
defineProps({
    table: {
        required: true,
        type: Object as PropType<LeagueTeamSummary[]>
    }
});
</script>

<style scoped></style>