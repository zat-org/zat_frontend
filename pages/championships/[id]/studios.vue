<template>
    <div class="w-full">
        <template v-if="!error && !pending">
            <div v-if="orderedEvents.length > 0" ref="matchCards"
                class=" bg-zinc-200  rounded-lg scroll-smooth overflow-x-hidden overflow-y-scroll max-h-[60vh] px-2 md:px-10  ">
                <template v-for="event in orderedEvents" :key="event.id">
                    <MatchStudioCard :studio="event" class="my-4" />
                </template>
            </div>
            <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center py-10">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا يوجد استديو تحليلي حاليا</h3>
            </div>
        </template>
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
import { IStudio } from "Models/IStudio";

const route = useRoute();
const client = useStrapiClient()
const studios = ref<IStudio[]>([]);
const error = ref<string | null>(null);
const matchCards = ref<HTMLElement | null>(null);
const pending = ref(false);
const props = defineProps(["leagueData"]);

definePageMeta({
    name: "leagueStudios"
})

const orderedEvents = computed((): (IStudio)[] => {
    return studios.value.sort((a, b) => {
        let d1 = new Date(a.start_at);
        let d2 = new Date(b.start_at);
        return d1.getTime() - d2.getTime();
    })
})

const fetchData = () => {
    pending.value = true;
    return client(`/leagues/${route.params.id}/studios`, { method: 'GET' })
        .then((data: any) => {
            studios.value = (data.studios as IStudio[])
            // console.log(data.studios);
            pending.value = false;
            useHead({
                title: ` الاستديو التحليلي - ${props.leagueData.name} `,
            })
        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل الاستديو التحليلي";
            pending.value = false;

        })
}

onServerPrefetch(fetchData)
onBeforeMount(fetchData)

const offsetOfComingMatch = computed(() => {
    if (studios.value) {
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