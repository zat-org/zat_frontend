<template>
    <VerticalCarousal class="grow" v-if="matches && matches.length > 0" :startAtIndex="offsetOfComingMatch">
        <VerticalCarousalItem v-for="event in matches" :key="event.id" class="md:ps-8 ">
            <MatchCard :match="event" :id="event.id" :champId="event.league_id" />
        </VerticalCarousalItem>
    </VerticalCarousal>
    <div v-else class="text-lg h-50 flex flex-col justify-center items-center py-10">
        <Icon name="line-md:alert-circle" class="block text-9xl" />
        <h3>لا توجد مباريات حاليا</h3>
    </div>
</template>

<script setup lang="ts">
import type { IMatchLessDetails } from '@/Models/IMatchLessDetails';
import { sortByTime, getIndexOfUpcomingEvent } from "@/utils/CollectionsWithTimeUtils"
const props = defineProps<{ matches: IMatchLessDetails[] }>();
const matches = computed(() => props.matches.sort(sortByTime));
const offsetOfComingMatch = computed(() => {
    if (matches.value)
        return getIndexOfUpcomingEvent(matches.value)
    return 0
})
</script>

<style scoped></style>
