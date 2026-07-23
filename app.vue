<template>
  <div dir="rtl" lang="ar" class="flex flex-col min-h-screen bg-white  dark:bg-slate-800">
    <NuxtLoadingIndicator />
    <Navbar v-if="!isUnderDevelopment" />
    <main
      :class="isUnderDevelopment
        ? 'grow w-full relative flex flex-col justify-center items-center'
        : 'p-2 grow w-full relative flex flex-col justify-start items-center'"
    >
    <NuxtPage />
      <UNotifications />
    </main>
    <AppFooter v-if="!isUnderDevelopment" />
  </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { useUserStore } from '~/stores/useUserStore';

const route = useRoute()
const isUnderDevelopment = computed(() => route.path === '/under-development')

const { $api } = useNuxtApp();

const userStore = useUserStore()
onMounted(async () => {
  if (isUnderDevelopment.value) return
  try {
    await userStore.refetchUser();
  } catch (error) {
    console.log(error)
  }
})

onMounted(async () => {
  if (isUnderDevelopment.value) return
  try {
    await $api.websiteAssets.addOneToVisitorCounter()
  } catch (error) {
    console.log(error)
  }
})

// scahema.org intialize globally 
useSchemaOrg([
  defineOrganization({
    name: "زات",
    url: "https://zatbaloot.com",
    logo: "/images/zat-logo-black.svg",
    sameAs: [
      "https://www.instagram.com/zat_baloot/#",
      "https://www.youtube.com/@zat_baloot",
      "https://www.youtube.com/@ZAT_PLUS",
    ],
    contactPoint: [{
      '@type': 'ContactPoint',
      email:'zat@osasyona.com',
      contactType: 'customer support',
      areaServed: 'SA',
      availableLanguage: ['Arabic', 'English'],
      
    }]
  }),
  defineWebSite({
    name: "زات - الموقع الرائد لبطولات البلوت في المملكة",
    url: 'https://zatbaloot.com'
  })
])

</script>
