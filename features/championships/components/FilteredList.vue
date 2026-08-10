<template>
    <FetchDataWrapper
        class="page-container py-8 sm:py-10"
        :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null"
        :pending="pending"
    >
        <div class="mb-6 flex items-center justify-between gap-4">
            <h2 class="section-title">
                {{ sectionTitle }}
            </h2>
            <UButton
                v-if="champType"
                to="/championships"
                variant="ghost"
                class="section-link p-0"
                trailing-icon="i-heroicons-arrow-up-left"
            >
                جميع البطولات
            </UButton>
        </div>

        <div v-if="champs.length > 0" class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ChampionshipsListItem
                v-for="champ in champs"
                :key="champ.leagueid"
                :champion="champ"
                :media-base-url="mediaBaseUrl"
            />
        </div>

        <div v-else class="flex h-50 flex-col items-center justify-center text-lg text-text-subtitle">
            <UIcon name="line-md:alert-circle" class="mb-2 block text-7xl sm:text-9xl" />
            <h3>لا توجد بطولات حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import { getChampionshipTypeLabel } from '~/features/championships/utils/championshipTypes'

const route = useRoute()
const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
const champType = computed(() => route.query.type as string | undefined)
const { $api } = useNuxtApp()
const { data, pending, error } = await $api.champions.getAll(champType, { watch: [champType] })
const champs = computed(() => data.value?.champs ?? [])

const sectionTitle = computed(() => {
    if (!champType.value) return 'جميع البطولات'
    return `بطولات ${getChampionshipTypeLabel(champType.value)}`
})
</script>
