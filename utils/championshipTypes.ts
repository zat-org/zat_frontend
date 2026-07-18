import ChampType from '@/Models/ChampType'

export interface ChampionshipTypeConfig {
    type: ChampType | 'followers'
    label: string
    title: string
    /** Page title e.g. بطولات الكأس */
    pageTitle: string
    subtitle: string
    to: string
    emblem: string
    titleImage: string
    titleHeight: number
    titleTop: number
    titleWidth: number
}

const BASE = '/images/championships'

export const CHAMPIONSHIP_CARD_SHARED = {
    bg: `${BASE}/bg-red.svg`,
    watermark: `${BASE}/watermark.svg`,
    glint: `${BASE}/glint.svg`,
} as const

/** Visual order matches Figma: Super → Belt → Cup → League → Followers */
export const CHAMPIONSHIP_TYPE_CARDS: ChampionshipTypeConfig[] = [
    {
        type: ChampType.SUPER,
        label: 'super',
        title: 'السوبر',
        pageTitle: 'بطولات السوبر',
        subtitle: 'عرض المباريات',
        to: '/championships/super',
        emblem: `${BASE}/super-emblem.svg`,
        titleImage: `${BASE}/super-title.svg`,
        titleHeight: 71,
        titleTop: 151,
        titleWidth: 126,
    },
    {
        type: ChampType.HEZAM,
        label: 'hezam',
        title: 'الحزام',
        pageTitle: 'بطولات الحزام',
        subtitle: 'عرض المباريات',
        to: '/championships/hezam',
        emblem: `${BASE}/hezam-emblem.svg`,
        titleImage: `${BASE}/hezam-title.svg`,
        titleHeight: 87,
        titleTop: 143,
        titleWidth: 104,
    },
    {
        type: ChampType.CUP,
        label: 'cup',
        title: 'الكأس',
        pageTitle: 'بطولات الكأس',
        subtitle: 'عرض المباريات',
        to: '/championships/cup',
        emblem: `${BASE}/cup-emblem.svg`,
        titleImage: `${BASE}/cup-title.svg`,
        titleHeight: 62,
        titleTop: 151,
        titleWidth: 113,
    },
    {
        type: ChampType.LEAGUE,
        label: 'league',
        title: 'الدوري',
        pageTitle: 'بطولات الدوري',
        subtitle: 'عرض المباريات',
        to: '/championships/league',
        emblem: `${BASE}/league-emblem.svg`,
        titleImage: `${BASE}/league-title.svg`,
        titleHeight: 45,
        titleTop: 163,
        titleWidth: 157,
    },
    {
        type: 'followers',
        label: 'followers',
        title: 'المتابعين',
        pageTitle: 'بطولات المتابعين',
        subtitle: 'عرض المباريات',
        to: '/join-us',
        emblem: `${BASE}/followers-emblem.svg`,
        titleImage: `${BASE}/followers-title.svg`,
        titleHeight: 49,
        titleTop: 151,
        titleWidth: 142,
    },
]

const EXTRA_TYPE_TITLES: Record<string, string> = {
    done: 'المباريات السابقة',
    upcoming: 'المباريات القادمة',
}

export const CHAMPIONSHIP_TYPE_SLUGS = CHAMPIONSHIP_TYPE_CARDS
    .filter(c => c.label !== 'followers')
    .map(c => c.label)

export function getChampionshipTypeConfig(type: string | undefined) {
    return CHAMPIONSHIP_TYPE_CARDS.find(card => card.label === type)
}

export function getChampionshipTypeLabel(type: string | undefined) {
    return getChampionshipTypeConfig(type)?.title ?? EXTRA_TYPE_TITLES[type ?? ''] ?? 'البطولات'
}

export function getChampionshipTypePageTitle(type: string | undefined) {
    return getChampionshipTypeConfig(type)?.pageTitle
        ?? EXTRA_TYPE_TITLES[type ?? '']
        ?? 'البطولات'
}

export function isValidChampionshipTypeSlug(type: string) {
    return CHAMPIONSHIP_TYPE_SLUGS.includes(type) || type in EXTRA_TYPE_TITLES
}
