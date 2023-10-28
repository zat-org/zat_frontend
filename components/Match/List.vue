<template>
    <div>
        <div v-if="orderedEvents.length > 0" ref="matchCards"
            class="scroll-smooth overflow-x-hidden overflow-y-scroll max-h-[60vh] px-2 md:px-10 bg-zinc-200 dark:bg-slate-700  rounded-lg ">
            <template v-for="event in orderedEvents" :key="event.id">
                <MatchCard :match="event" :id="event.id" :champId="event.league_id" class="my-4" />
            </template>
        </div>
        <div v-else class=" text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا توجد مباريات حاليا</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import IMatchLessDetails from '@/Models/IMatchLessDetails';
const props = defineProps({
    matches: {
        type: Object as PropType<IMatchLessDetails[]>,
        required: true
    }
});
const matchCards = ref<HTMLElement | null>(null);

const orderedEvents = computed((): (IMatchLessDetails)[] => {
    return props.matches.sort((a, b) => {
        let d1 = new Date(a.start_at);
        let d2 = new Date(b.start_at);
        return d1.getTime() - d2.getTime();
    })
})


const offsetOfComingMatch = computed(() => {
    if (props.matches) {
        let currentDate = new Date()
        for (let i = 0; i < orderedEvents.value.length; i++) {
            if (new Date(orderedEvents.value[i].start_at) >= currentDate) {
                return i - 1 >= 0 ? i - 1 : 0
            }
        }
        return orderedEvents.value.length - 1;
    }
    return null
})
watchEffect(() => {
    if (props.matches && props.matches.length > 0) {
        if (matchCards.value && offsetOfComingMatch.value) {
            matchCards.value.scrollTop = 16 + (((matchCards.value.children[offsetOfComingMatch.value - 1] as HTMLElement).scrollHeight) * (offsetOfComingMatch.value)) + (16 * (offsetOfComingMatch.value));
        }
    }
})
</script>

<style scoped></style>
