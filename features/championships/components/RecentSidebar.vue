<template>
    <FetchDataWrapper
        :error="error ? 'تعذر تحميل البيانات' : null"
        :pending="pending"
        class="w-full shrink-0 lg:w-[411px]"
    >
        <aside
            v-if="champs.length > 0"
            class="flex h-full max-h-[720px] w-full flex-col overflow-hidden rounded-zat-md border-2 border-surface-tone2 bg-surface-raised xl:max-h-[760px]"
            aria-label="البطولات السابقة"
        >
            <!-- Title bar (Figma 1260:28571) -->
            <div class="flex w-full shrink-0 items-center bg-surface-secondary px-4 pb-4 pt-6">
                <h2 class="min-w-0 flex-1 truncate text-right text-xl font-bold leading-9 text-text-on-action">
                    {{ title }}
                </h2>
            </div>

            <!-- Championships list (Figma 1270:12547) -->
            <div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-4 py-4">
                <ChampionshipsListItem
                    v-for="champ in champs"
                    :key="champ.leagueid"
                    :champion="champ"
                    :media-base-url="mediaBaseUrl"
                />
            </div>

            <!-- Show more (Figma 1588:31823) -->
            <div class="flex h-20 w-full shrink-0 items-center justify-center border-t border-surface-tone2 px-4">
                <NuxtLink
                    :to="moreLink"
                    class="inline-flex items-center justify-center border-b border-text-action px-0.5 text-xl font-bold leading-9 text-text-action transition-opacity hover:opacity-80"
                >
                    عرض المزيد
                </NuxtLink>
            </div>
        </aside>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    title?: string
    type?: string
    limit?: number
    moreTo?: string
}>(), {
    title: 'البطولات السابقة',
    type: 'done',
    limit: 6,
})

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
const champType = computed(() => props.type)
const moreLink = computed(() => props.moreTo ?? `/championships/${props.type}`)

const { $api } = useNuxtApp()
const { data, pending, error } = await $api.champions.getAll(champType, { watch: [champType] })
const champs = computed(() => (data.value?.champs ?? []).slice(0, props.limit))
</script>
