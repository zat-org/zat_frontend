<template>
    <div class="bg-zinc-200 w-full rounded-lg">
        <div v-if="!error && !pending" ref="matchCards"
            class="scroll-smooth overflow-x-hidden overflow-y-scroll max-h-[60vh] px-2 md:px-10  ">
            <template v-if="orderedEvents.length > 0" v-for="event in orderedEvents" :key="event.id">
                <MatchCard :match="event" :id="event.id" :champId="route.params.id" class="my-4" />
            </template>
            <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا توجد مباريات حاليا</h3>
            </div>
        </div>
        <div v-else-if="pending" class=" text-zinc-700 flex flex-col space-y-4 justify-center items-center  p-10">
            <Icon name="svg-spinners:blocks-shuffle-3" class="text-4xl block" />
            <h2>تحميل</h2>
        </div>
        <div v-else-if="error" class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center p-4">
            <Icon name="line-md:close-circle" class="block text-9xl text-red-500" />
            <h3>{{ error }}</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import IMatchLessDetails from "@/Models/IMatchLessDetails"
const route = useRoute();
const client = useStrapiClient()
const matches = ref<IMatchLessDetails[]>([]);
const error = ref<string | null>(null);
const matchCards = ref<HTMLElement | null>(null);
const pending = ref(false);

definePageMeta({
    name: "leagueMatches"
})

const orderedEvents = computed((): (IMatchLessDetails)[] => {
    return matches.value.sort((a, b) => {
        let d1 = new Date(a.start_at);
        let d2 = new Date(b.start_at);
        return d1.getTime() - d2.getTime();
    })
})

onBeforeMount(() => {
    pending.value = true;
    client(`/leagues/${route.params.id}/matches`, { method: 'GET' })
        .then((data: any) => {
            matches.value = (data.matches as IMatchLessDetails[])
            // console.log(data.matches);
            pending.value = false;

        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل المباريات";
            pending.value = false;

        })
})

const offsetOfComingMatch = computed(() => {
    if (matches.value) {
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
    if (matches.value) {
        if (matchCards.value && offsetOfComingMatch.value) {
            matchCards.value.scrollTop = (matchCards.value.children[offsetOfComingMatch.value - 1] as HTMLElement).offsetTop;
        }
    }
})

</script>

<style scoped></style>