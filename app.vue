<template>
  <div dir="rtl" lang="ar" class="flex flex-col min-h-screen bg-white  dark:bg-slate-800">
    <NuxtLoadingIndicator />
    <Navbar />
    <main class="p-2 grow items-start w-full relative">
      <NuxtPage />
      <UNotifications />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
await $api.websiteAssets.addOneToVisitorCounter();
</script>
