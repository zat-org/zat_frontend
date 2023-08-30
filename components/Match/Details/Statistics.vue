<template>
    <div v-if="match.state === 'انتهت'">
        <div class="divider">احصائيات المباراة</div>
        <div class="container mx-auto rounded-lg shadow-lg mb-2 ">

            <table class="table table-zebra rounded-t-lg text-center table-fixed table-pin-rows">
                <thead>
                    <tr class="">
                        <th class="text-lg text-gray-900">
                            {{ match.team1.name }}
                        </th>
                        <th>
                            <Icon name="fxemoji:squaredvs" width="30" height="30" />
                        </th>
                        <th class="text-lg text-gray-900">
                            {{ match.team2.name }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="_, index in match.team1.statistics" :key="index">
                        <td class="font-semibold text-md text-blue-950">{{ match.team1.statistics[index].value }}</td>
                        <td class="px-0">{{ match.team1.statistics[index].name }}</td>
                        <td class="font-semibold text-md text-blue-950">{{ match.team2.statistics[index].value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(["match"])
</script>

<style scoped>
/* tr:nth-child(even) {
    @apply bg-blue-50 !important
} */
</style>
