<template>
    <div class="h-20 flex justify-between items-center border-b ">
        <div class="ms-3 w-1/3 ">
            <UButton class="rounded-full transition-transform duration-500 ease-out hover:scale-105 active:scale-95"
                icon="i-heroicons-ellipsis-horizontal-16-solid" size="lg" square variant="outline"
                @click="isSidebarOpen = true" />
        </div>

        <div>
            <ClientOnly>
                <NuxtLink to="/">
                    <img width="75" height="75"
                        :src="colorMode.preference === 'dark' ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg'"
                        alt="zat logo" />
                </NuxtLink>
            </ClientOnly>
        </div>
        <div class="me-3 w-1/3 text-left">
            <ClientOnly>
                <UButton class="rounded-full transition-transform duration-1000 ease-out active:rotate-180"
                    :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" size="lg" square
                    variant="outline" @click="isDark = !isDark" aria-label="Theme" />
            </ClientOnly>
        </div>
        <SideBar v-model="isSidebarOpen"  />      
    </div>
</template>
  
<script setup lang="ts">
const isSidebarOpen = ref(false);
const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})


</script>
<style scoped></style>