<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا' : null" :pending="pending">
        <section class="mb-20 w-full" v-if="champs && champs.length > 0">
            <SectionHeader title="احدث البطولات" icon="i-heroicons-trophy" />
            <Carousel :autoplay="champs.length > 1 ? 5000 : 0" :wrap-around="true">
                <Slide v-for="champ in champs" :key="champ.id">
                    <div class="carousel__item h-[200px] bg-center bg-cover flex justify-evenly items-center relative"
                        :style="`background-image:url(${url + champ.logo_background})`">
                        <!-- <p class="text-white font-family-aref text-sm sm:text-md md:text-lg">قريبا</p> -->
                        <nuxt-img :src="url + champ.champ_logo" class="w-36 sm:w-44 md:w-52" loading="lazy" />
                        <!-- <p class="text-white font-family-aref text-sm sm:text-md md:text-lg">انتظرونا</p> -->
                        <UButton :to="`/championships/${champ.id}`" variant="outline" class="absolute top-3 right-3"
                            size="2xs" icon="i-heroicons-chevron-double-left-16-solid">
                            اذهب للبطولة
                        </UButton>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
        </section>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
const url = useRuntimeConfig().public.apiBaseUrl
const { $api } = useNuxtApp();
const { data, error, pending } = await $api.champions.getUpcoming();
const champs = computed(() => data.value?.data);
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