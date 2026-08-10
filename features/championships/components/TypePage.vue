<template>
    <FetchDataWrapper
        :error="error ? 'تعذر تحميل البطولات برجاء المحاولة لاحقا.' : null"
        :pending="pending"
    >
        <section class="bg-surface-base" aria-label="قائمة البطولات">
            <div class="mx-auto w-full max-w-[1500px]">
                <!-- Title bar -->
                <div
                    class="flex items-center  gap-4 bg-surface-raised px-4 py-6 sm:px-8 lg:px-[80px]"
                >
                <div
                    v-if="typeConfig"
                    class="relative h-[60px] w-[52px] shrink-0 drop-shadow-[0_2px_8px_rgba(22,19,19,0.25)]"
                >
                    <img
                        :src="typeConfig.emblem"
                        :alt="typeConfig.title"
                        class="size-full object-contain dark:invert"
                    >
                </div>
                    <h1 class="text-center text-2xl font-bold leading-[48px] text-text-body">
                        {{ pageTitle }}
                    </h1>
                </div>

                <!-- Cards grid -->
                <div
                    v-if="champs.length > 0"
                    class="flex flex-wrap content-start items-start justify-center gap-6 px-4 pb-8 sm:px-8 lg:px-10"
                >
                    <ChampionshipsTournamentCard
                        v-for="champ in champs"
                        :key="champ.leagueid"
                        :champion="champ"
                        :media-base-url="mediaBaseUrl"
                    />
                </div>

                <div
                    v-else
                    class="flex min-h-50 flex-col items-center justify-center py-16 text-lg text-text-subtitle"
                >
                    <UIcon name="line-md:alert-circle" class="mb-2 block text-7xl" />
                    <p>لا توجد بطولات حاليا</p>
                </div>
            </div>
        </section>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import {
    getChampionshipTypeConfig,
    getChampionshipTypePageTitle,
} from '~/features/championships/utils/championshipTypes'

const props = defineProps<{
    type: string
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
const champType = computed(() => props.type)
const { $api } = useNuxtApp()
const { data, pending, error } = await $api.champions.getAll(champType, { watch: [champType] })
const champs = computed(() => data.value?.champs ?? [])
const typeConfig = computed(() => getChampionshipTypeConfig(props.type))
const pageTitle = computed(() => getChampionshipTypePageTitle(props.type))

useHead({
    title: () => `${pageTitle.value} - زات`,
    meta: [
        {
            name: 'description',
            content: () => `استكشف ${pageTitle.value} من زات — تابع النتائج والبطولات.`,
        },
    ],
})
</script>
