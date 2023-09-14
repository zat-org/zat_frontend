<template>
    <FetchDataWraper :error="error" :pending="pending">
        <template #main>
            <section class="mb-20" v-if="champs && champs.length > 0">
                <div class="flex flex-wrap w-full mb-2">
                    <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 ">احدث البطولات</h1>
                        <div class="h-1 w-20 bg-yellow-500 rounded"></div>
                    </div>
                </div>
                <Carousel :autoplay="5000" :wrap-around="true">
                    <Slide v-for="champ in champs" :key="champ.id">
                        <div class="carousel__item h-[200px] bg-center bg-cover flex justify-evenly items-center relative"
                            :style="`background-image:url(${url + champ.logo_background})`">
                            <!-- <p class="text-white font-family-aref text-sm sm:text-md md:text-lg">قريبا</p> -->
                            <nuxt-img :src="url + champ.champ_logo" class="w-36 sm:w-44 md:w-52" />
                            <!-- <p class="text-white font-family-aref text-sm sm:text-md md:text-lg">انتظرونا</p> -->
                            <NuxtLink :to="`/championships/${champ.id}`"
                                class="absolute top-1 right-1 text-white text-[0.7rem] hover:bg-blue-400 rounded-md py-1 px-3 flex justify-center items-center">
                                <Icon name="ei:arrow-left" class="text-[1rem]" />
                                اذهب للبطولة
                            </NuxtLink>
                        </div>
                    </Slide>
                    <template #addons>
                        <Navigation />
                        <Pagination />
                    </template>
                </Carousel>
            </section>
        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { IUpcomingChamp } from "@/Models/IChamp"
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const client = useStrapiClient()
const champs = ref<IUpcomingChamp[] | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/leagues/upcoming`, { method: 'GET' })
        .then((data: any) => {
            champs.value = data.data
            pending.value = false

        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false
        })
}
onServerPrefetch(fetchData)
onBeforeMount(fetchData)

</script>

<style scoped>
.carousel__item {
    width: 100%;
    background-color: #5f5e5e;
    color: #000;
    font-size: 20px;
    border-radius: 8px;

}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}
</style>