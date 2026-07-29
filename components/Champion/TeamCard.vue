<template>
    <div class="w-full">
        <!-- Mobile: compact row card (Figma state=default/hovered, size=mobile) -->
        <NuxtLink
            :to="`/teams/${team.id}`"
            class="team-card-mobile group flex w-full items-center justify-between gap-3 rounded-zat-md border border-[#D0D0D0] bg-white p-4 transition-colors duration-300 hover:border-[#444242] md:hidden" 
        >
        <div class="flex min-w-0 items-center gap-2">
            <div class="flex size-8 shrink-0 items-center justify-center overflow-hidden">
                <Image
                    v-if="team.team_logo"
                    :src="mediaBaseUrl + team.team_logo"
                    :alt="team.name"
                    icon="i-heroicons-user-group"
                    class="size-8 object-contain"
                />
                <UIcon
                    v-else
                    name="i-heroicons-user-group"
                    class="size-5 text-text-caption"
                />
            </div>
            <span class="truncate text-xl font-bold leading-8 text-text-body">
                {{ displayTextValue(team.name) }}
            </span>
        </div>
        <UIcon
            name="i-heroicons-arrow-left-20-solid"
            class="size-6 shrink-0 text-text-body transition-transform duration-300 group-hover:-translate-x-0.5"
        />
    </NuxtLink>

        <!-- Desktop: expandable team card (Figma state=default/hovered/clicked, size=desktop) -->
        <div
            class="relative hidden w-full max-w-102.5 md:block"
            :class="isExpanded ? 'mt-4' : ''"
            dir="rtl"
            @mouseenter="isHovered = true"
            @mouseleave="onMouseLeave"
        >
            <button
                v-if="isExpanded"
                type="button"
                class="absolute left-1/2 top-0 z-30 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ED1C24] text-white shadow-[0_2px_16px_0_rgba(241,73,80,0.5)]"
                aria-label="إخفاء أعضاء الفريق"
                @click.stop="collapse"
            >
                <UIcon name="zat:arrow-down" class="size-4" />
            </button>

            <article
                class="team-card-desktop relative flex h-72 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-zat-md px-8 py-10 transition-colors duration-300 sm:px-16"
                :class="isExpanded ? 'bg-white' : 'bg-white hover:bg-[#D0D0D0]'"
            >
        <div
            class="flex size-38 shrink-0 items-center justify-center overflow-hidden transition-[filter] duration-300"
            :class="showMembersPeek && !isExpanded ? 'blur-[44px]' : ''"
        >
            <Image
                v-if="team.team_logo"
                :src="mediaBaseUrl + team.team_logo"
                :alt="team.name"
                icon="i-heroicons-user-group"
                class="size-38 object-contain"
            />
            <UIcon
                v-else
                name="i-heroicons-user-group"
                class="size-20 text-text-caption"
            />
        </div>

        <h3
            class="w-full text-center text-[32px] font-bold leading-14 text-text-body"
            :class="showMembersPeek && !isExpanded ? 'opacity-0' : 'opacity-100'"
        >
            {{ displayTextValue(team.name) }}
        </h3>

        <!-- Members panel -->
        <div
            class="absolute inset-x-0 bottom-0 z-10 flex h-full flex-col rounded-zat-md bg-[#F14950] transition-transform duration-300 ease-out"
            :class="{
                'pointer-events-none translate-y-full': !showMembersPeek,
                'pointer-events-none translate-y-2/3': showMembersPeek && !isExpanded,
                'translate-y-0': isExpanded,
            }"
        >
            <div class="relative flex h-full w-full items-stretch gap-2 px-2 py-4">
                <div
                    v-for="(slot, index) in playerSlots"
                    :key="slot?.id ?? `empty-${index}`"
                    class="relative flex min-h-0 min-w-0 flex-1 items-end justify-center overflow-hidden rounded-lg bg-[#F36166]"
                >
                    <img
                        v-if="slot?.image && !imageErrors[index]"
                        :src="mediaBaseUrl + slot.image"
                        :alt="slot.name || 'لاعب'"
                        class="absolute inset-0 size-full object-cover object-top"
                        loading="lazy"
                        @error="imageErrors[index] = true"
                    >
                    <div
                        v-else
                        class="flex size-full min-h-0 items-center justify-center bg-[#E8E8E8]"
                        aria-hidden="true"
                    >
                        <UIcon name="zat:profile" class="size-10 text-[#737171]" />
                    </div>
                </div>
            </div>

            <div
                v-if="showMembersPeek "
                class="pointer-events-none absolute inset-0 z-10 rounded-zat-md bg-[#F14950]/30 transition-opacity duration-300"
                aria-hidden="true"
            />
        </div>

        <!-- Hover peek: white team name -->
        <p
            v-if="showMembersPeek && !isExpanded"
            class="pointer-events-none absolute inset-x-16 top-24 z-20 text-center text-2xl font-bold leading-12 text-white"
        >
            {{ displayTextValue(team.name) }}
        </p>

        <!-- Expand button -->
        <button
            v-if="showMembersPeek && !isExpanded"
            type="button"
            class="absolute left-1/2 top-38 z-20 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-[#ED1C24] text-white shadow-[0_2px_16px_0_rgba(241,73,80,0.5)]"
            aria-label="عرض أعضاء الفريق"
            @click.stop="expand"
        >
            <UIcon name="zat:arrow-up" class="size-4" />
        </button>

        <NuxtLink
            v-if="isExpanded"
            :to="`/teams/${team.id}`"
            class="team-details-btn absolute bottom-4 left-1/2 z-30 inline-flex h-10 min-w-26 -translate-x-1/2 items-center justify-center px-2 py-0.5 transition-opacity hover:opacity-90"
        >
            <svg
                class="pointer-events-none absolute inset-0 size-full"
                viewBox="0 0 122 40"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    d="M10.5 3L119.61 0L122 25.7447L114.932 40H0L2.46836 12.9121L10.5 3Z"
                    fill="#231F1F"
                />
            </svg>
            <span class="relative z-10 px-2 text-xs font-bold leading-6 text-white">
                تفاصيل الفريق
            </span>
        </NuxtLink>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IPlayerLessDetails, ITeam } from '~/Models/ITeam'
import { displayTextValue } from '~/utils/championWinnerStats'

const props = defineProps<{ team: ITeam }>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
const isHovered = ref(false)
const isExpanded = ref(false)
const imageErrors = reactive<Record<number, boolean>>({})

const showMembersPeek = computed(() => isHovered.value || isExpanded.value)

const playerSlots = computed<(IPlayerLessDetails | null)[]>(() => {
    const players = props.team.players ?? []
    const slots: (IPlayerLessDetails | null)[] = players.slice(0, 5)
    while (slots.length < 5) slots.push(null)
    return slots
})

watch(playerSlots, () => {
    Object.keys(imageErrors).forEach((key) => {
        delete imageErrors[Number(key)]
    })
})

function onMouseLeave() {
    isHovered.value = false
}

function expand() {
    isExpanded.value = true
}

function collapse() {
    isExpanded.value = false
}
</script>

<style scoped>
.team-card-desktop :deep(img) {
    max-width: 100%;
    max-height: 100%;
}
</style>
