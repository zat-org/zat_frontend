<template>
    <article
        class="group relative flex h-72 w-full max-w-102.5 flex-col items-center justify-center gap-2 overflow-hidden rounded-zat-md bg-surface-raised px-8 py-10 transition-colors duration-300 sm:px-16"
        :class="[
            isExpanded ? 'bg-surface-raised' : 'hover:bg-surface-tone',
        ]"
        dir="rtl"
        @mouseenter="isHovered = true"
        @mouseleave="onMouseLeave"
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
            class="w-full text-center text-2xl font-bold leading-12 text-text-body sm:text-[32px] sm:leading-14"
            :class="showMembersPeek && !isExpanded ? 'opacity-0' : 'opacity-100'"
        >
            {{ displayTextValue(team.name) }}
        </h3>

        <!-- Hover peek / expanded members panel -->
        <div
            class="absolute inset-x-0 bottom-0 z-10 flex h-full flex-col bg-[#F14950] transition-transform duration-300 ease-out"
            :class="{
                'translate-y-full pointer-events-none': !showMembersPeek,
                'translate-y-[50%] pointer-events-none': showMembersPeek && !isExpanded,
                'translate-y-0': isExpanded,
            }"
        >
            <div class="grid h-full w-full grid-cols-5 gap-2 px-2 py-4">
                <div
                    v-for="(slot, index) in memberSlots"
                    :key="slot ? `${slot.role}-${slot.id}` : `empty-${index}`"
                    class="relative flex min-h-0 min-w-0 items-end justify-center overflow-hidden rounded-lg bg-[#F36166]"
                >
                    <img
                        v-if="slot?.image && !imageErrors[index]"
                        :src="mediaBaseUrl + slot.image"
                        :alt="slot.name || (slot.role === 'coach' ? 'مدرب' : 'لاعب')"
                        class="absolute inset-0 size-full object-cover object-top"
                        loading="lazy"
                        @error="imageErrors[index] = true"
                    >
                    <div
                        v-else
                        class="flex size-full min-h-48 items-center justify-center bg-[#E8E8E8]"
                        aria-hidden="true"
                    >
                        <UIcon name="i-heroicons-user" class="size-10 text-[#737171]" />
                    </div>
                    <span
                        v-if="slot?.role === 'coach'"
                        class="absolute inset-x-0 bottom-0 z-10 bg-black/50 py-0.5 text-center text-[10px] font-bold leading-4 text-white"
                    >
                        مدرب
                    </span>
                </div>
            </div>
        </div>

        <!-- Hover label + expand affordance -->
        <p
            v-if="showMembersPeek && !isExpanded"
            class="pointer-events-none absolute inset-x-8 top-24 z-20 text-center text-2xl font-bold leading-12 text-white"
        >
            {{ displayTextValue(team.name) }}
        </p>

        <button
            v-if="showMembersPeek && !isExpanded"
            type="button"
            class="absolute inset-end-1/2  top-38 z-20 flex size-8  items-center justify-center rounded-full bg-[#ED1C24] text-white shadow-[0_2px_16px_0_rgba(241,73,80,0.5)]"
            aria-label="عرض أعضاء الفريق"
            @click.stop="expand"
        >
            <UIcon name="i-heroicons-chevron-up" class="size-4" />
        </button>

        <template v-if="isExpanded">
            <button
                type="button"
                class="absolute inset-end-1/2 top-0 z-30 flex size-8  -translate-y-1/2 items-center justify-center rounded-full bg-[#ED1C24] text-white shadow-[0_2px_16px_0_rgba(241,73,80,0.5)]"
                aria-label="إخفاء أعضاء الفريق"
                @click.stop="collapse"
            >
                <UIcon name="i-heroicons-chevron-down" class="size-4" />
            </button>

            <NuxtLink
                :to="`/teams/${team.id}`"
                class="absolute bottom-10 inset-end-1/2 z-30  rounded-zat-sm bg-text-body px-3 py-2 text-xs font-bold leading-6 text-white transition-opacity hover:opacity-90"
            >
                تفاصيل الفريق
            </NuxtLink>
        </template>
    </article>
</template>

<script setup lang="ts">
import type { ITeam } from '~/features/teams/types/ITeam'
import { displayTextValue } from '~/features/championships/utils/championWinnerStats'

type TeamMemberSlot = {
    id: number
    name: string
    image: string
    role: 'coach' | 'player'
}

const props = defineProps<{ team: ITeam }>()

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
const isHovered = ref(false)
const isExpanded = ref(false)
const imageErrors = reactive<Record<number, boolean>>({})

const showMembersPeek = computed(() => isHovered.value || isExpanded.value)

const memberSlots = computed<(TeamMemberSlot | null)[]>(() => {
    const slots: TeamMemberSlot[] = []
    const coach = props.team.coaches?.[0]

    if (coach) {
        slots.push({
            id: coach.id,
            name: coach.name,
            image: coach.image,
            role: 'coach',
        })
    }

    for (const player of props.team.players ?? []) {
        if (slots.length >= 5) break
        slots.push({
            id: player.id,
            name: player.name,
            image: player.image,
            role: 'player',
        })
    }

    const padded: (TeamMemberSlot | null)[] = [...slots]
    while (padded.length < 5) padded.push(null)
    return padded
})

watch(memberSlots, () => {
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
