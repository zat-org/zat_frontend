<template>
    <section v-if="images && images.length > 0" id="clients" class="mt-20">
        <div class="w-full flex justify-center" dir="rtl">
            <SectionHeader icon="i-heroicons-sparkles" title="شركائنا بالنجاح" />
        </div>
        <div class="py-5 h-64 overflow-hidden">
            <ClientOnly>
                <swiper-container class="w-full h-full" :loop="true" :slides-per-view="1" :space-between="30"
                    :keyboard="{ enabled: true }" :mousewheel="true" :autoplay-delay="1500">
                    <swiper-slide v-for="img in images" :key="img.id" class="flex justify-center">
                        <div
                            class="bg-white  overflow-hidden rounded-lg flex justify-center items-center w-36 sm:w-44 md:w-52 h-36 sm:h-44 md:h-52">
                            <img :src="img.url" class="w-36 sm:w-44 md:w-52 rounded-lg" loading="lazy" />
                        </div>
                    </swiper-slide>
                </swiper-container>
            </ClientOnly>
        </div>
    </section>
</template>

<script setup lang="ts">
const url = 'https://sam-baloot-admin.online'

const { $api } = useNuxtApp()
const { data, error, pending } = await $api.websiteAssets.getClientsImages();
const images = computed(() => data.value?.data.attributes.images.data.map((elm: any) => { return { id: elm.id, url: url + elm.attributes.url } }))

</script>

<style scoped></style>