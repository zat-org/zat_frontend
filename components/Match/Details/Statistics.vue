<template>
    <div v-if="match.state === 'انتهت'">
        <UDivider>احصائيات المباراة</UDivider>
        <table class="w-full rounded-t-lg text-center table-fixed table-pin-rows my-3 shadow-lg">
            <thead>
                <tr class="h-12 bg-gray-200 dark:bg-slate-700">
                    <th class="text-lg text-gray-900 dark:text-white">
                        {{ match.team1.name }}
                    </th>
                    <th>
                        <Icon name="fxemoji:squaredvs" width="30" height="30" />
                    </th>
                    <th class="text-lg text-gray-900 dark:text-white">
                        {{ match.team2.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="_, index in match.team1.statistics" :key="index"
                    class="h-8 even:dark:bg-slate-500 odd:dark:bg-slate-600 even:bg-slate-50 odd:bg-slate-100">
                    <td class="font-semibold text-md text-blue-950 dark:text-slate-50">
                        {{ match.team1.statistics[index].value }}</td>
                    <td class="px-0">{{ match.team1.statistics[index].name }}</td>
                    <td class="font-semibold text-md text-blue-950 dark:text-slate-50">
                        {{ match.team2.statistics[index].value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import type { IMatchFullDetails } from "@/Models/IMatchFullDetails"
defineProps({
    match: {
        required: true,
        type: Object as PropType<IMatchFullDetails>
    }
});
</script>

<style scoped></style>
