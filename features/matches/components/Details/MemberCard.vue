<template>
    <component
        :is="playerTo ? NuxtLink : 'div'"
        :to="playerTo"
        class="group relative flex w-32 flex-col items-center gap-1"
        :class="playerTo ? 'cursor-pointer' : undefined"
        :aria-label="playerTo ? `عرض صفحة ${person.name}` : undefined"
    >
        <p class="relative z-10 w-full truncate text-center text-sm font-semibold leading-6 text-text-heading sm:text-base sm:leading-7">
            {{ displayTextValue(person.name) }}
        </p>

        <div class="relative z-10 size-20 sm:size-22">
            <div
                class="relative z-10 size-full origin-bottom overflow-hidden rounded-zat-sm bg-surface-raised shadow-[0_8px_16px_rgba(22,19,19,0.35)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-105"
            >
                <Image
                    v-if="person.image"
                    :src="mediaBaseUrl + person.image"
                    :alt="person.name"
                    icon="i-heroicons-user"
                    class="size-full object-cover object-top"
                />
                <div
                    v-else
                    class="flex size-full items-center justify-center bg-surface-overlay"
                >
                    <UIcon
                        name="i-heroicons-user"
                        class="size-8 text-text-caption"
                    />
                </div>
            </div>

            <span
                class="pointer-events-none absolute -bottom-4 left-1/2 z-20 origin-center -translate-x-1/2 whitespace-nowrap font-zaatar text-base leading-none text-white transition-transform duration-300 ease-out group-hover:-translate-x-1/2 group-hover:-translate-y-0.5 group-hover:skew-x-[-4deg] sm:-bottom-5 sm:text-lg"
            >
                {{ roleLabel }}
            </span>

            <img
                :src="memberGlow"
                alt=""
                class="pointer-events-none absolute -bottom-5 left-1/2 z-1 w-28 max-w-none origin-center -translate-x-1/2 transition-transform duration-300 ease-out group-hover:-translate-x-1/2 group-hover:scale-105 group-hover:skew-x-[-8deg] sm:-bottom-6 sm:w-32"
                aria-hidden="true"
            >
        </div>
    </component>
</template>

<script setup lang="ts">
import type { Person } from '~/features/matches/types/IMatchFullDetails'
import { displayTextValue } from '~/features/championships/utils/championWinnerStats'
import memberGlow from '~/assets/images/matches/member-name-glow.svg'

const NuxtLink = resolveComponent('NuxtLink')

const props = defineProps<{
    person: Person
    role: string
}>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const roleLabel = computed(() => {
    const role = props.role
    if (role.includes('كابتن')) return 'كابتن'
    if (role.includes('مدرب')) return 'مدرب'
    if (role.includes('حكم')) {
        if (role.includes('مساعد')) return 'حكم مساعد'
        if (role.includes('نشرة')) return 'حكم النشرة'
        if (role.includes('طاولة')) return 'حكم الطاولة'
        return 'حكم'
    }
    return 'لاعب'
})

const playerTo = computed(() => {
    const label = roleLabel.value
    if (!props.person.id || (label !== 'لاعب' && label !== 'كابتن')) {
        return undefined
    }
    return `/players/${props.person.id}`
})
</script>
