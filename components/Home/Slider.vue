<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا' : null" :pending="pending">
        <section class="mb-20 w-full" v-if="champs && champs.length > 0">
            <SectionHeader title="احدث البطولات" icon="i-heroicons-trophy" />
            <div class=" overflow-hidden h-[200px]">
                <swiper-container class="w-full h-full" :loop="true" :slides-per-view="1" :space-between="30"
                    :keyboard="{ enabled: true }" :mousewheel="true" :pagination="true" :control="true"
                    :autoplay-delay="champs.length > 1 ? 5000 : 0">
                    <swiper-slide v-for="champ in champs" :key="champ.id">
                        <div class="h-[200px] bg-center bg-cover bg-gray-500 rounded-lg flex justify-evenly items-center relative"
                            :style="`background-image:url(${url + champ.logo_background})`">
                            <nuxt-img :src="url + champ.champ_logo" class="w-36 sm:w-44 md:w-52" loading="lazy" />
                            <UButton :to="`/championships/${champ.id}`" variant="outline" class="absolute top-3 right-3"
                                size="2xs" trailing-icon="i-heroicons-chevron-double-left-16-solid">
                                اذهب للبطولة
                            </UButton>
                        </div>
                    </swiper-slide>
                </swiper-container>
            </div>
        </section>
    </FetchDataWrapper>
</template>

<script setup lang="ts">

const url = useRuntimeConfig().public.apiBaseUrl
const { $api } = useNuxtApp();
const { data, error, pending } = await $api.champions.getUpcoming();
const champs = computed(() => data.value?.data);
</script>

<style scoped></style>