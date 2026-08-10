<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل البيانات' : null" :pending="pending">
        <section v-if="champs.length > 0" class="page-container py-12 sm:py-16" aria-label="البطولات السابقة">
            <div class="mb-8 flex items-center justify-between gap-4">
                <h2 class="section-title">البطولات السابقة</h2>
                <UButton
                    to="/championships/done"
                    variant="ghost"
                    
                    class="section-link p-0"
                    trailing-icon="i-heroicons-arrow-up-left"
                >
                    تصفح المزيد من هنا
                </UButton>
            </div>

            <div class="-mx-4 px-4 pb-4 sm:mx-0 sm:overflow-x-auto sm:px-0">
                <div class="flex flex-col gap-2 sm:min-w-min sm:flex-row sm:gap-6">
                    <HomeRecentTournamentCard
                        v-for="champ in champs"
                        :key="champ.leagueid"
                        :champ="champ"
                        :media-base-url="mediaBaseUrl"
                    />
                </div>
            </div>
        </section>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
const { $api } = useNuxtApp()
const { data, error, pending } = await $api.champions.getRecentWithStats(6)
const champs = computed(() => data.value?.champs ?? [])
</script>
