<template>
    <FetchDataWrapper :error="error ? 'تعذر البيانات برجاء المحاولة لاحقا.' : null" :pending="pending">
        <ChampionLeagueTable v-if="champType === ChampType.LEAGUE" :table="(table as LeagueTeamSummary[])" />
        <ChampionHezamTable v-else-if="champType === ChampType.HEZAM" :table="(table as HezamTeamSummary[])" />
        <ChampionCupMap v-else-if="champType === ChampType.CUP" :table="(table as ICupMatchData[][])" />
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IChamp, LeagueTeamSummary, HezamTeamSummary } from "@/Models/IChamp"
import type { ICupMatchData } from "~/Models/ICupSummary";

import ChampType from "@/Models/ChampType"

const props = defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>
    }
});

const { $api } = useNuxtApp();
const { data, error, pending } = await $api.champions.getChampSummaryByChampId(props.champ.leagueid.toString());
const table = computed(() => data.value?.table);
const champType = computed(() => data.value?.type as ChampType);

useHead({
    title: `جدول بطولة - ${props.champ.name} `,
})

definePageMeta({
    name: "leagueTable"
})


</script>

<style scoped></style>