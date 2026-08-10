<template>
    <header
        class="w-full border-b border-surface-tone2 bg-surface-raised"
        :aria-label="headerLabel"
        dir="rtl"
    >
        <div class="page-container flex items-center gap-2 py-4">
            <NuxtLink
                :to="resolvedBackTo"
                class="flex size-8 shrink-0 items-center justify-center rounded-zat-full text-text-body transition-opacity hover:opacity-70"
                :aria-label="resolvedBackLabel"
            >
                <UIcon
                    name="i-heroicons-chevron-right-20-solid"
                    class="size-8"
                />
            </NuxtLink>

            <span
                class="h-8 w-0.5 shrink-0 bg-surface-tone2"
                aria-hidden="true"
            />

            <nav
                class="flex min-w-0 flex-wrap items-center gap-2"
                :aria-label="headerLabel"
            >
                <template
                    v-for="(crumb, index) in crumbs"
                    :key="crumb.label"
                >
                    <img
                        v-if="index > 0"
                        :src="breadcrumbChevron"
                        alt=""
                        class="hidden size-8 shrink-0 sm:block"
                        aria-hidden="true"
                    >
                    <NuxtLink
                        v-if="crumb.to && !crumb.current"
                        :to="crumb.to"
                        class="shrink-0 text-base font-bold leading-7 text-text-subtitle transition-opacity hover:opacity-70"
                    >
                        {{ crumb.label }}
                    </NuxtLink>
                    <p
                        v-else
                        class="truncate text-base font-bold leading-7"
                        :class="crumb.current ? 'text-text-body' : 'text-text-subtitle'"
                    >
                        {{ crumb.label }}
                    </p>
                </template>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import breadcrumbChevron from '~/assets/images/championships/titlebar-back-arrow.svg'

const props = withDefaults(defineProps<{
    teamName?: string
    teamId?: number | string
    playerName?: string
    backTo?: string
    backLabel?: string
}>(), {
    teamName: undefined,
    teamId: undefined,
    playerName: undefined,
    backTo: undefined,
    backLabel: undefined,
})

const crumbs = computed(() => {
    const items: { label: string, to?: string, current?: boolean }[] = []

    items.push({
        label: 'الفرق',
        to: '/teams',
        current: !props.teamName && !props.playerName,
    })

    if (props.teamName) {
        items.push({
            label: `تفاصيل الفريق “${props.teamName}”`,
            to: props.playerName && props.teamId ? `/teams/${props.teamId}` : undefined,
            current: !props.playerName,
        })
    }

    if (props.playerName) {
        items.push({
            label: `تفاصيل الاعب “${props.playerName}”`,
            current: true,
        })
    }

    return items
})

const headerLabel = computed(() =>
    props.playerName ? 'شريط عنوان اللاعب' : 'شريط عنوان الفريق',
)

const resolvedBackTo = computed(() => {
    if (props.backTo) {
        return props.backTo
    }
    if (props.playerName && props.teamId) {
        return `/teams/${props.teamId}`
    }
    if (props.playerName || props.teamName) {
        return '/teams'
    }
    return '/'
})

const resolvedBackLabel = computed(() => {
    if (props.backLabel) {
        return props.backLabel
    }
    if (props.playerName && props.teamId) {
        return 'العودة إلى تفاصيل الفريق'
    }
    if (props.playerName || props.teamName) {
        return 'العودة إلى الفرق'
    }
    return 'العودة للرئيسية'
})
</script>
