<template>
    <nav
        v-if="availableNavigation.length"
        class="w-full border-b-2 border-surface-primary bg-surface-primary"
        aria-label="أقسام البطولة"
        dir="rtl"
    >
        <ul
            class="page-container flex h-18 items-stretch justify-start gap-4 overflow-x-auto pt-4 sm:gap-6"
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
