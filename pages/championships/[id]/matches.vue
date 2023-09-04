<template>
    <FetchDataWraper :error="error" :pending="pending" class="w-full text-zinc-700 dark:text-slate-50">
        <template #main>
            <div v-if="orderedEvents.length > 0" ref="matchCards"
                class="scroll-smooth overflow-x-hidden overflow-y-scroll max-h-[60vh] px-2 md:px-10 bg-zinc-200 dark:bg-slate-700  rounded-lg ">
                <template v-for="event in orderedEvents" :key="event.id">
                    <MatchCard :match="event" :id="event.id" :champId="route.params.id" class="my-4" />
                </template>
            </div>
            <div v-else class=" text-lg h-50 flex flex-col justify-center items-center py-10">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا توجد مباريات حاليا</h3>
            </div>
        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts">
import IMatchLessDetails from "@/Models/IMatchLessDetails"
const props = defineProps(["leagueData"])

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
const fetchData = () => {
    pending.value = true;
    return client(`/leagues/${route.params.id}/matches`, { method: 'GET' })
        .then((data: any) => {
            matches.value = (data.matches as IMatchLessDetails[])
            // console.log(data.matches);
            pending.value = false;
            useHead({
                title: ` المباريات - ${props.leagueData.name} `,
            })

        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل المباريات";
            pending.value = false;

        })

}
onServerPrefetch(fetchData)
onBeforeMount(fetchData)

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
    if (matches.value && matches.value.length > 0) {
        if (matchCards.value && offsetOfComingMatch.value) {
            matchCards.value.scrollTop = (matchCards.value.children[offsetOfComingMatch.value - 1] as HTMLElement).offsetTop;
        }
    }
})

</script>

<style scoped></style>