<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل الاستديو التحليلي برجاء المحاولة لاحقا.' : null" :pending="pending">
            <div v-if="orderedEvents && orderedEvents.length > 0" ref="matchCards"
                class=" bg-zinc-200 dark:bg-slate-700  rounded-lg scroll-smooth overflow-x-hidden overflow-y-scroll max-h-[60vh] px-2 md:px-10  ">
                <template v-for="event in orderedEvents" :key="event.id">
                    <MatchStudioCard :studio="event" class="my-4" />
                </template>
            </div>
            <div v-else class=" text-lg h-50 flex flex-col justify-center items-center py-10">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا يوجد استديو تحليلي حاليا</h3>
            </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import type { IStudio } from "@/Models/IStudio"
import type { IChamp } from "@/Models/IChamp"
const props = defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>
    }
});
const matchCards = ref<HTMLElement | null>(null);

const { $api } = useNuxtApp();
const { data, error, pending } = await $api.champions.getChampStudiosByChampId(props.champ.leagueid.toString());
const studios = computed(() => data.value?.studios);


definePageMeta({
    name: "leagueStudios"
})

const orderedEvents = computed((): (IStudio)[] | undefined => {
    return studios.value?.sort((a, b) => {
        let d1 = new Date(a.start_at);
        let d2 = new Date(b.start_at);
        return d1.getTime() - d2.getTime();
    })
})

const offsetOfComingMatch = computed(() => {
    if (studios.value && orderedEvents.value) {
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
    if (studios.value && studios.value.length > 0) {
        if (matchCards.value && offsetOfComingMatch.value) {
            matchCards.value.scrollTop = (matchCards.value.children[offsetOfComingMatch.value - 1] as HTMLElement).offsetTop;
        }
    }
})

</script>

<style scoped></style>