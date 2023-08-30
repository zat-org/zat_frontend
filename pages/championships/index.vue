<template>
    <div>
        <template v-if="!pending && !error">
            <div v-if="champs && champs.length > 0" v-for="champ in champs"
                class="card border-[1px] border-blue-300 md:card-side bg-base-100 shadow-xl">
                <figure class="bg-blue-200  md:px-2"><nuxt-img loading="lazy" :src="url + champ.url" class="py-2 w-36"
                        alt="championship logo" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ champ.name }}</h2>
                    <p>{{ champ.description }}</p>
                    <div class="card-actions justify-start ">
                        <NuxtLink :to="`/championships/${champ.leagueid}`" class="btn btn-info btn-md ">
                            تفاصيل البطولة
                            <Icon name="mingcute:arrow-left-fill" />
                        </NuxtLink>
                    </div>
                </div>

            </div>
            <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا توجد بطولات حاليا</h3>
            </div>
        </template>
        <div v-else-if="pending" class="text-zinc-700 flex flex-col space-y-4 justify-center items-center p-10">
            <Icon name="svg-spinners:blocks-shuffle-3" class="text-4xl block" />
            <h2 class="font-semibold">تحميل</h2>
        </div>
        <div v-else-if="error" class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center p-4">
            <Icon name="line-md:close-circle" class="block text-9xl text-red-500" />
            <h3>{{ error }}</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import IChamp from '@/Models/IChamp';
const client = useStrapiClient()
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 

const route = useRoute()
const champs = ref<null | IChamp[]>(null)
const error = ref<string | null>(null)
const pending = ref(false)
const loadChamps = () => {
    pending.value = true
    return client(`/leagues/get?type=${route.query.type}`, { method: 'GET' })
        .then((data: any) => {
            champs.value = data.champs
            pending.value = false
        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false

        })
}
onServerPrefetch(loadChamps)
watch(() => route.query.type, loadChamps)
onBeforeMount(loadChamps)

</script>

<style scoped></style>