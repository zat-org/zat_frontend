<template>
    <div class="container mx-auto rounded-lg shadow-lg mb-2 h-96 overflow-auto">
        <table class="table table-zebra rounded-t-lg text-center  table-pin-rows">
            <thead>
                <tr class="text-lg text-gray-100 bg-blue-400">
                    <th>
                        الاحصائية
                    </th>
                    <th>
                        القيمة
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="value, key, index in statistics" :key="index">
                    <td class="px-0 dark:text-slate-50 ">{{ key }}</td>
                    <td class="font-semibold  text-md text-blue-950 dark:text-slate-50">{{ value }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi';
import { ITeamStatistics } from '@/Models/ITeam';


const props = defineProps({
    statistics: { type: Object as PropType<ITeamStatistics>, required: true }
})
</script>

<style scoped>
tbody tr:nth-child(even) {
    @apply bg-slate-100 dark:bg-slate-500 !important;
}


tbody tr:nth-child(odd) {
    @apply bg-slate-200 dark:bg-slate-600 !important;
}
</style>