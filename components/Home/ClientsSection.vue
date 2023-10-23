<template>
    <section v-if="images.length > 0" id="clients" class="mt-20">
        <h2 class="text-3xl font-bold text-center  ">شركائنا بالنجاح</h2>
        <div class="py-10">

            <Carousel :autoplay="images.length > 1 ? 2000 : 0" :wrap-around="true">
                <Slide v-for="img in images" :key="img.id">
                    <div class="carousel__item ">
                        <div
                            class="p-2 bg-white rounded-lg flex justify-center items-center w-36 sm:w-44 md:w-52 h-36 sm:h-44 md:h-52">
                            <nuxt-img :src="img.url" class="w-36 sm:w-44 md:w-52" />
                        </div>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
        </div>
    </section>
</template>

<script setup lang="ts">

import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'

const client = useStrapiClient()
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
type Image = {
    id: number, url: string
}
const images = ref<Image[]>([])
onMounted(async () => {
    client(`/clients-image?populate=*`, { method: 'GET' })
        .then((data: any) => {
            images.value = data.data.attributes.images.data.map((elm: any) => { return { id: elm.id, url: url + elm.attributes.url } })
        }).catch(err => console.error(err))
})

</script>

<style scoped></style>