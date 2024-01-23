<template>
    <div class="mx-auto rounded-lg shadow-lg mb-2 h-96 overflow-auto">
        <table class="rounded-t-lg text-center w-full">
            <thead>
                <tr class="text-lg text-amber-50 bg-gray-400 h-12">
                    <th>
                        الاحصائية
                    </th>
                    <th>
                        القيمة
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="value, key, index in statistics" :key="index"
                    class="h-10  even:bg-slate-100 even:dark:bg-slate-500 odd:bg-slate-200 odd:dark:bg-slate-600">
                    <td class="px-0 dark:text-slate-50 ">{{ key }}</td>
                    <td class="font-semibold text-md text-blue-950 dark:text-slate-50">{{ value }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import type { ITeamStatistics } from '@/Models/ITeam';
const props = defineProps({
    statistics: { type: Object as PropType<ITeamStatistics>, required: true }
})

</script>

<style scoped></style>