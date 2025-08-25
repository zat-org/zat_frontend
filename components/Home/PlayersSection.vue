<template>
    <section v-if="images && images.length > 0" id="players" class="mt-20">
        <div class="w-full flex justify-center" dir="rtl">
            <SectionHeader icon="i-heroicons-users" title="اللاعبين في القناه " />
        </div>
        <div class="py-8 h-80 sm:h-88 md:h-96 overflow-hidden">
            <ClientOnly>
                <swiper-container 
                    class="w-full h-full" 
                    :loop="true" 
                    :slides-per-view="1" 
                    :space-between="30"
                    :keyboard="{ enabled: true }" 
                    :mousewheel="true" 
                    :autoplay-delay="3000"
                    :autoplay-disable-on-interaction="false"
                >
                    <swiper-slide v-for="img in images" :key="img.id" class="flex justify-center items-center">
                        <div class="player-card group">
                            <!-- Image Container with fixed aspect ratio -->
                            <div class="image-container">
                                <nuxt-img 
                                    :src="img.url" 
                                    :alt="img.name"
                                    class="player-image" 
                                    loading="lazy"
                                    format="webp"
                                    quality="80"
                                    width="400"
                                    height="500"
                                    sizes="sm:300px md:400px lg:500px"
                                    densities="1x 2x"
                                    placeholder
                                />
                                <!-- Strong overlay for text visibility -->
                                <div class="image-overlay"></div>
                                
                                <!-- Player Name positioned over image -->
                                <div class="name-container">
                                    <h3 class="player-name">{{ img.name }}</h3>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper-container>
            </ClientOnly>
        </div>
    </section> 
</template>

<script setup lang="ts">
// const url = useRuntimeConfig().public.apiBaseUrl
const url ='https://sam-baloot-admin.online'

const { $api } = useNuxtApp()
const { data, error, pending } = await $api.websiteAssets.getPlayersImages();

const images = computed(() => data.value?.data.map((ele: any) => {
  console.log(ele.attributes.playerImage.data.attributes.url)
    return {
        id: ele.id,
        name: ele.attributes.playerName,
        url: url + ele.attributes.playerImage.data.attributes.url
    }
}))

// Handle image loading errors
const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    // You can set a fallback image here
    console.warn('Failed to load player image:', img.src);
}
</script>

<style scoped>
.player-card {
  @apply relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden;
  @apply w-56 sm:w-64 md:w-72 h-64 sm:h-72 md:h-80;
  @apply border border-gray-200 dark:border-gray-700;
  @apply hover:scale-105 hover:-translate-y-2;
}

.image-container {
  @apply relative w-full h-full overflow-hidden rounded-2xl;
  @apply bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800;
}

.player-image {
  @apply w-full h-full object-cover object-center;
  @apply transition-transform duration-500 group-hover:scale-105;
}

.image-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent;
  @apply opacity-80 group-hover:opacity-70 transition-opacity duration-300;
}

.name-container {
  @apply absolute bottom-0 left-0 right-0 z-10;
  @apply bg-gradient-to-t from-black/95 via-black/80 to-transparent;
  @apply p-4 sm:p-5 md:p-6;
  @apply min-h-[80px] flex items-center justify-center;
}

.player-name {
  @apply text-white font-bold text-lg sm:text-xl md:text-2xl;
  @apply text-center leading-tight;
  @apply drop-shadow-2xl;
  @apply group-hover:text-amber-300 transition-colors duration-300;
  /* Enhanced text shadow for better visibility */
  /* RTL text alignment for Arabic names */
  direction: rtl;
  text-align: center;
  /* Ensure text is always on top */
  position: relative;
  z-index: 20;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .player-card {
    @apply w-48 h-56;
  }
  
  .player-name {
    @apply text-sm font-extrabold;
    text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.9), 0 0 12px rgba(0, 0, 0, 0.8);
  }
  
  .name-container {
    @apply p-2 min-h-[50px];
  }
  
  .image-overlay {
    @apply opacity-85;
  }
}

/* Dark mode specific adjustments */
@media (prefers-color-scheme: dark) {
  .player-card {
    @apply bg-gray-900 border-gray-600;
  }
  
  .image-container {
    @apply from-gray-800 to-gray-900;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .player-name {
    @apply text-white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  }
  
  .image-overlay {
    @apply opacity-80;
  }
}

/* Animation for loading states */
.player-image[src=""] {
  @apply animate-pulse bg-gray-300 dark:bg-gray-600;
}

/* Focus states for accessibility */
.player-card:focus-within {
  @apply ring-4 ring-amber-500 ring-opacity-50 outline-none;
}

/* Smooth transitions for theme switching */
* {
  @apply transition-colors duration-200;
}
</style>