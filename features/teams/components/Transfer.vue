<template>
    <article
        class="group relative flex items-center justify-between gap-2 overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-raised p-2 transition-[border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-surface-tone hover:shadow-zat-sm sm:gap-4 sm:p-4"
        dir="rtl"
    >
        <div
            class="pointer-events-none absolute inset-s-0 top-0 z-0 h-16 sm:h-30"
            aria-hidden="true"
        >
            <img
                :src="transferDecor"
                alt=""
                class="   group-hover:scale-900 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] object-fill"
            >
        </div>

        <component
            :is="showDetails ? NuxtLink : 'div'"
            :to="showDetails ? `/players/${trans.player_id}` : undefined"
            class="relative z-10 size-12 shrink-0 overflow-hidden rounded-zat-sm bg-surface-raised shadow-[0_4px_16px_rgba(22,19,19,0.2)] sm:size-22"
            :class="showDetails ? 'transition-opacity hover:opacity-80' : undefined"
        >
            <Image
                v-if="trans.image"
                :src="mediaBaseUrl + trans.image"
                :alt="trans.name"
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
        </component>

        <div class="relative z-10 flex min-w-0 flex-1 flex-col items-start gap-0.5 sm:gap-2">
            <p
                class="w-full truncate text-sm font-bold leading-5.5 text-text-body transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white sm:text-base sm:leading-7"
            >
                {{ trans.name }}
            </p>
            <NuxtLink
                v-if="showDetails"
                :to="`/players/${trans.player_id}`"
                class="text-[10px] font-bold leading-4 text-text-subtitle underline transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white sm:text-xs sm:leading-5"
            >
                عرض تفاصيل
            </NuxtLink>
        </div>

        <div class="relative z-10 flex shrink-0 items-center gap-1 sm:gap-4">
            <TeamTransferLogo
                :name="trans.from_team_name"
                :logo="trans.from_team_logo"
            />
            <UIcon
                name="i-heroicons-arrow-long-left"
                class="size-5 shrink-0 text-text-subtitle sm:size-6"
            />
            <TeamTransferLogo
                :name="trans.to_team_name"
                :logo="trans.to_team_logo"
            />
        </div>
    </article>
</template>

<script setup lang="ts">
import type { ITransfer } from '~/features/teams/types/ITeam'
import transferDecor from '~/assets/images/teams/transfer-card-decor.svg'

withDefaults(defineProps<{
    trans: ITransfer
    currentTeamName?: string
    showDetails?: boolean
}>(), {
    showDetails: true,
})

const NuxtLink = resolveComponent('NuxtLink')

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl
</script>
