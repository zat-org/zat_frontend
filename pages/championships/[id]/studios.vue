<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل الاستديو التحليلي برجاء المحاولة لاحقا.' : null" :pending="pending"
        class="flex flex-col">
        <VerticalCarousal class="grow" v-if="studios && studios.length > 0" :startAtIndex="offsetOfComingMatch">
            <VerticalCarousalItem v-for="event in studios" :key="event.id">
                <MatchStudioCard :studio="event" />
            </VerticalCarousalItem>
        </VerticalCarousal>

        <div v-else class=" text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا يوجد استديو تحليلي حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IChamp } from "@/Models/IChamp"
import { sortByTime, getIndexOfUpcomingEvent } from "@/utils/CollectionsWithTimeUtils"
const props = defineProps<{ champ: IChamp }>();

const { $api } = useNuxtApp();
const { data, error, pending } = await $api.champions.getChampStudiosByChampId(props.champ.leagueid.toString());
const studios = computed(() => data.value?.studios.sort(sortByTime));
const offsetOfComingMatch = computed(() => {
    if (studios.value)
        return getIndexOfUpcomingEvent(studios.value)
    return 0
})

definePageMeta({
    name: "ChampStudios"
})






</script>

<style scoped>
.swiper {
    width: 100%;
    height: 200px;
}
</style>