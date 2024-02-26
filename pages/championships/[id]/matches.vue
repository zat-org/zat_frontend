<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل المباريات برجاء المحاولة لاحقا.' : null" :pending="pending"
        class="flex flex-col">
        <MatchList v-if="matches" :matches="matches" />
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IChamp } from "@/Models/IChamp"
const props = defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>
    }
});

const { $api } = useNuxtApp();
const { data, error, pending } = await $api.champions.getChampMatchesByChampId(props.champ.leagueid.toString());
const matches = computed(() => data.value?.matches);


definePageMeta({
    name: "leagueMatches"
})

useHead({
    title: ` المباريات - ${props.champ.name} `,
})

</script>

<style scoped></style>