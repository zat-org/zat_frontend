<template>
    <nav
        v-if="availableNavigation.length"
        class="w-full border-b-2 border-surface-primary bg-surface-primary"
        aria-label="أقسام البطولة"
        dir="rtl"
    >
        <div class="page-container py-3 md:hidden">
            <USelectMenu
                v-model="selectedHref"
                :items="dropdownItems"
                value-key="value"
                label-key="label"
                :search-input="false"
                trailing-icon="i-heroicons-chevron-down-20-solid"
                color="neutral"
                variant="soft"
                size="lg"
                class="w-full"
                :ui="{
                    base: 'bg-white/10 text-white ring-0',
                    trailingIcon: 'text-white',
                    content: 'min-w-60',
                }"
            />
        </div>

        <ul
            class="page-container hidden h-18 items-stretch justify-start gap-4 overflow-x-auto pt-4 sm:gap-6 md:flex"
        >
            <li
                v-for="link in availableNavigation"
                :key="link.href"
                class="flex shrink-0"
            >
                <NuxtLink
                    :to="link.href"
                    class="flex h-full items-center justify-center border-b-4 px-1 text-xl leading-9 whitespace-nowrap transition-colors"
                    :class="tabClass(link.href)"
                >
                    {{ link.name }}
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import ChampType from '~/features/championships/types/ChampType'
import type { IChamp } from '~/features/championships/types/IChamp'

const props = defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>,
    },
})

const route = useRoute()
const champId = computed(() => String(route.params.id || ''))

const navigation = computed(() => {
    const id = champId.value
    return [
        {
            name: 'لوحة المتصدرين',
            href: `/championships/${id}/`,
            availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM],
            exact: true,
        },
        {
            name: 'الاحصائيات',
            href: `/championships/${id}/statistics`,
            availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM],
        },
        {
            name: 'جدول البطولة',
            href: `/championships/${id}/table`,
            availableAt: [ChampType.LEAGUE, ChampType.CUP, ChampType.HEZAM],
        },
        {
            name: 'الفرق',
            href: `/championships/${id}/teams`,
            availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM],
        },
        {
            name: 'القوانين',
            href: `/championships/${id}/laws`,
            availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM],
        },
        {
            name: 'المباريات',
            href: `/championships/${id}/matches`,
            availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM],
        },
        {
            name: 'التحليل',
            href: `/championships/${id}/studios`,
            availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM],
        },
        {
            name: 'التوقعات',
            href: `/championships/${id}/estimations`,
            availableAt: [ChampType.CUP, ChampType.LEAGUE, ChampType.SUPER, ChampType.HEZAM],
        },
    ]
})

const champType = computed(() => props.champ.type as ChampType)

const availableNavigation = computed(() =>
    navigation.value.filter(link =>
        props.champ?.type ? link.availableAt.includes(champType.value) : true,
    ),
)

const dropdownItems = computed(() =>
    availableNavigation.value.map(link => ({
        label: link.name,
        value: normalizePath(link.href),
    })),
)

const selectedHref = computed({
    get() {
        const active = availableNavigation.value.find(link =>
            isActive(link.href, link.exact),
        )
        return normalizePath(active?.href ?? availableNavigation.value[0]?.href ?? '')
    },
    set(href: string) {
        const target = availableNavigation.value.find(
            link => normalizePath(link.href) === normalizePath(href),
        )
        if (target && normalizePath(route.path) !== normalizePath(target.href)) {
            navigateTo(target.href)
        }
    },
})

function normalizePath(path: string) {
    return path.replace(/\/+$/, '') || '/'
}

function isActive(href: string, exact = false) {
    const current = normalizePath(route.path)
    const target = normalizePath(href)
    if (exact) return current === target
    return current === target || current.startsWith(`${target}/`)
}

function tabClass(href: string) {
    const item = availableNavigation.value.find(link => link.href === href)
    const active = isActive(href, item?.exact)
    return active
        ? 'border-white font-bold text-text-on-action'
        : 'border-transparent font-normal text-text-on-action/90 hover:text-text-on-action'
}
</script>
