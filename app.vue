<template>
  <div dir="rtl" lang="ar" class="flex flex-col min-h-screen bg-white  dark:bg-slate-800">
    <NuxtLoadingIndicator />
    <Navbar />
    <main class="p-2 grow w-full relative flex flex-col justify-start items-center">
      <NuxtPage />
      <UNotifications />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { useUserStore } from '~/stores/useUserStore';

const { $api } = useNuxtApp();
await $api.websiteAssets.addOneToVisitorCounter();
const userStore = useUserStore()

onMounted(async () => {
  await userStore.refetchUser();
})
</script>
