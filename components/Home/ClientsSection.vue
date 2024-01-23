<template>
    <section v-if="images && images.length > 0" id="clients" class="mt-20">
        <div class="w-full flex justify-center" dir="rtl">
            <SectionHeader icon="i-heroicons-sparkles" title="شركائنا بالنجاح" />
        </div>
        <div class="py-10">
            <Carousel :autoplay="images.length > 1 ? 2000 : 0" :wrap-around="true">
                <Slide v-for="img in images" :key="img.id">
                    <div class="carousel__item ">
                        <div
                            class=" bg-white rounded-lg flex justify-center items-center w-36 sm:w-44 md:w-52 h-36 sm:h-44 md:h-52">
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
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel'

const url = useRuntimeConfig().public.apiBaseUrl
const { $api } = useNuxtApp()
const { data, error, pending } = await $api.websiteAssets.getClientsImages();
const images = computed(() => data.value?.data.attributes.images.data.map((elm: any) => { return { id: elm.id, url: url + elm.attributes.url } }))

</script>

<style scoped></style>