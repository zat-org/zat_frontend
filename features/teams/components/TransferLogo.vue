<template>
    <div
        class="group/team relative flex size-12 items-center justify-center overflow-hidden rounded-zat-sm bg-surface-overlay p-1 sm:size-22 sm:p-2"
        :title="label"
    >
        <template v-if="isFreeAgent">
            <span
                class="flex flex-col items-center justify-center px-0.5 text-center font-zaatar text-xs leading-tight text-text-body sm:text-lg sm:leading-none"
            >
                <span>لاعب</span>
                <span>حر</span>
            </span>
        </template>

        <template v-else-if="logoSrc && !logoFailed">
            <Image
                :src="logoSrc"
                :alt="label"
                icon="i-heroicons-user-group"
                class="size-full object-contain transition-[filter,transform] duration-300 ease-out group-hover/team:scale-105 group-hover/team:blur-[6px]"
                @error="logoFailed = true"
            />
            <span
                class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-nav-bar/55 px-1 text-center text-[10px] font-bold leading-tight text-text-on-action opacity-0 transition-opacity duration-300 ease-out group-hover/team:opacity-100 sm:text-xs sm:leading-5"
            >
                {{ label }}
            </span>
        </template>

        <span
            v-else
            class="line-clamp-3 px-0.5 text-center text-[10px] font-bold leading-tight text-text-body sm:text-xs sm:leading-5"
        >
            {{ label }}
        </span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name?: string | null
    logo?: string | null
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
const FREE_AGENT_LABEL = 'لاعب حر'

const logoFailed = ref(false)

watch(() => props.logo, () => {
    logoFailed.value = false
})

const teamName = computed(() => props.name?.trim() || '')
const logoSrc = computed(() => {
    const logo = props.logo?.trim()
    return logo ? mediaBaseUrl + logo : ''
})

const isFreeAgent = computed(() => !teamName.value && !logoSrc.value)

const label = computed(() => teamName.value || FREE_AGENT_LABEL)
</script>
