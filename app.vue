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

const userStore = useUserStore()
onMounted(async () => {
  try{
    await userStore.refetchUser();
  } catch (error) {
    console.log(error)
  }
})

onMounted(async () => {
 try{
  await $api.websiteAssets.addOneToVisitorCounter()
 } catch (error) {
  console.log(error)
 }
})
</script>
