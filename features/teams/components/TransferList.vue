<template>
    <div
        class="flex w-full flex-col overflow-hidden rounded-zat-md border border-surface-tone2 bg-surface-base"
    >
        <div class="relative bg-nav-bar px-6 pb-4 pt-6">
            <h3 class="text-base font-bold leading-7 text-text-on-action">
                {{ title }}
            </h3>
        </div>

        <div
            v-if="previewTransfers.length"
            class="flex flex-col gap-4 px-4 py-2"
        >
            <TeamTransfer
                v-for="(trans, index) in previewTransfers"
                :key="`${trans.player_id}-${index}`"
                :trans="trans"
                :current-team-name="currentTeamName"
                :show-details="showDetails"
            />
        </div>
        <div
            v-else
            class="flex flex-col items-center justify-center gap-2 px-4 py-10 text-text-subtitle"
        >
            <UIcon
                name="i-heroicons-arrows-right-left"
                class="size-10"
            />
            <p class="text-center">
                <slot name="noTransText">
                    لا يوجد انتقالات حتي الان
                </slot>
            </p>
        </div>

        <button
            v-if="hasMore"
            type="button"
            class="flex h-14 w-full items-center justify-center border-t border-surface-tone2 text-xl font-bold text-zat-500 transition-opacity hover:opacity-80"
            @click="isModalOpen = true"
        >
            <span class="border-b border-zat-500 pb-0.5">
                عرض المزيد
            </span>
        </button>
    </div>

    <UModal
        v-model:open="isModalOpen"
        :title="title"
        :ui="{
            content: 'sm:max-w-2xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden',
            header: 'shrink-0 bg-nav-bar',
            title: 'text-text-on-action',
            close: 'text-text-on-action hover:bg-white/10',
            body: 'min-h-0 overflow-y-auto bg-surface-base p-4 sm:p-6',
        }"
    >
        <template #body>
            <div
                class="flex flex-col gap-4"
                dir="rtl"
            >
                <TeamTransfer
                    v-for="(trans, index) in transfers"
                    :key="`modal-${trans.player_id}-${index}`"
                    :trans="trans"
                    :current-team-name="currentTeamName"
                    :show-details="showDetails"
                />
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { ITransfer } from '~/features/teams/types/ITeam'

const props = withDefaults(defineProps<{
    transfers: ITransfer[]
    currentTeamName?: string
    title?: string
    showDetails?: boolean
}>(), {
    title: 'انتقالات الاعبين',
    showDetails: true,
})

const PREVIEW_COUNT = 3
const isModalOpen = ref(false)

const allTransfers = computed(() => props.transfers ?? [])

const hasMore = computed(() => allTransfers.value.length > PREVIEW_COUNT)

const previewTransfers = computed(() => allTransfers.value.slice(0, PREVIEW_COUNT))
</script>
