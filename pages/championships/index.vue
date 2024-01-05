<template>
    <FetchDataWraper :error="error" :pending="pending">
        <template #main>
            <div class="flex justify-around items-center flex-wrap">
                <div v-if="champs && champs.length > 0" v-for="champ in champs"
                    class="card border-[1px] border-blue-300  dark:bg-slate-600 bg-base-100 shadow-xl my-3 w-96 ">
                    <figure class="bg-blue-100  md:px-2"><nuxt-img loading="lazy" :src="url + champ.url" class="py-2 w-36"
                            alt="championship logo" />
                    </figure>
                    <div class="card-body  space-y-3 text-right md:text-center">
                        <h2 class="font-semibold text-xl text-right md:text-center">{{ champ.name }}</h2>
                        <p>{{ champ.description }}</p>
                        <div class="card-actions justify-end md:justify-center ">
                            <NuxtLink :to="`/championships/${champ.leagueid}`"
                                class="btn btn-info btn-md  dark:text-slate-50 ">
                                تفاصيل البطولة
                                <!-- <Icon name="mingcute:arrow-left-fill" /> -->
                            </NuxtLink>
                        </div>
                    </div>

                </div>
                <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center">
                    <Icon name="line-md:alert-circle" class="block text-9xl" />
                    <h3>لا توجد بطولات حاليا</h3>
                </div>
            </div>

        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts">
import type {IChamp} from '@/Models/IChamp';
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
useHead({
    title: `بطولات زات`,
})
</script>

<style scoped></style>