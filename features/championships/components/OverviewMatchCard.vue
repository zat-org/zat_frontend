<template>
    <article
        class="relative flex w-full flex-col overflow-hidden rounded-zat-md border border-surface-tone2"
        :class="[
            cardStatusClass,
            compact ? 'gap-1.5 px-3 py-2.5' : 'gap-2 px-6 py-4',
        ]"
        dir="rtl"
    >
        <div
            class="pointer-events-none absolute -top-10 inset-s-1/4 size-93 rounded-full bg-white/80 blur-[90px]"
            aria-hidden="true"
        />

        <div class="relative z-10 flex items-center justify-between gap-2">
            <NuxtLink
                :to="matchHref"
                class="flex items-center justify-center rounded-zat-full text-text-body transition-opacity hover:opacity-70"
                :class="compact ? 'size-6' : 'size-8'"
                :aria-label="`تفاصيل ${displayTextValue(match.name)}`"
            >
                <UIcon
                    name="zat:external-website"
                    :class="compact ? 'size-6' : 'size-8'"
                />
            </NuxtLink>

            <h3
                class="min-w-0 flex-1 truncate px-2 text-center font-bold text-text-subtitle"
                :class="compact ? 'text-sm leading-6' : 'text-xl leading-9'"
            >
                {{ displayTextValue(match.name) }}
            </h3>

            <a
                v-if="match.url"
                :href="match.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center rounded-zat-full text-text-body transition-opacity hover:opacity-70"
                :class="compact ? 'size-6' : 'size-8'"
                aria-label="مشاهدة على يوتيوب"
            >
                <UIcon
                    name="zat:youtube"
                    :class="compact ? 'size-6' : 'size-8'"
                />
            </a>
            <span
                v-else
                :class="compact ? 'size-6' : 'size-8'"
                aria-hidden="true"
            />
        </div>

        <div
            class="relative z-10 flex items-center justify-center"
            :class="compact ? 'gap-3' : 'gap-6'"
            dir="ltr"
        >
            <div class="flex min-w-0 flex-col items-center gap-1">
                <div
                    class="flex items-center justify-center rounded-zat-full bg-surface-off-base"
                    :class="compact ? 'size-12 p-1' : 'size-24 p-2'"
                >
                    <Image
                        v-if="match.team_1_logo"
                        :src="mediaBaseUrl + match.team_1_logo"
                        :alt="match.team_1_name"
                        icon="i-heroicons-user-group"
                        class="object-contain"
                        :class="compact ? 'size-10' : 'size-20'"
                    />
                    <UIcon
                        v-else
                        name="i-heroicons-user-group"
                        class="text-text-caption"
                        :class="compact ? 'size-5' : 'size-10'"
                    />
                </div>
                <p
                    class="truncate text-center font-bold text-text-body"
                    :class="compact ? 'max-w-20 text-sm leading-6' : 'max-w-28 text-2xl leading-12'"
                >
                    {{ displayTextValue(match.team_1_name) }}
                </p>
            </div>

            <div
                class="flex min-w-0 flex-col items-center justify-center text-center"
                :class="compact ? 'gap-0.5' : 'gap-2'"
            >
                <template v-if="isDone">
                    <p
                        class="flex items-center font-numbers font-bold text-text-action"
                        :class="compact ? 'gap-2 text-xl leading-8' : 'gap-4 text-[40px] leading-16'"
                    >
                        <span>{{ scoreDisplay(match.team_1_score) }}</span>
                        <span>-</span>
                        <span>{{ scoreDisplay(match.team_2_score) }}</span>
                    </p>
                    <p
                        v-if="!compact"
                        class="text-base font-semibold leading-7 text-text-subtitle"
                    >
                        النتيجة
                    </p>
                </template>

                <template v-else>
                    <p
                        v-if="kickoffTime"
                        class="font-numbers font-bold text-text-action"
                        :class="compact ? 'text-lg leading-7' : 'text-2xl leading-10 sm:text-[32px] sm:leading-14'"
                        dir="ltr"
                    >
                        {{ kickoffTime }}
                    </p>
                    <p
                        v-if="kickoffDate"
                        class="font-semibold text-text-subtitle"
                        :class="compact ? 'text-xs leading-5' : 'text-sm leading-6 sm:text-base sm:leading-7'"
                        dir="ltr"
                    >
                        {{ kickoffDate }}
                    </p>
                </template>
            </div>

            <div class="flex min-w-0 flex-col items-center gap-1">
                <div
                    class="flex items-center justify-center rounded-zat-full bg-surface-off-base"
                    :class="compact ? 'size-12 p-1' : 'size-24 p-2'"
                >
                    <Image
                        v-if="match.team_2_logo"
                        :src="mediaBaseUrl + match.team_2_logo"
                        :alt="match.team_2_name"
                        icon="i-heroicons-user-group"
                        class="object-contain"
                        :class="compact ? 'size-10' : 'size-20'"
                    />
                    <UIcon
                        v-else
                        name="i-heroicons-user-group"
                        class="text-text-caption"
                        :class="compact ? 'size-5' : 'size-10'"
                    />
                </div>
                <p
                    class="truncate text-center font-bold text-text-body"
                    :class="compact ? 'max-w-20 text-sm leading-6' : 'max-w-28 text-2xl leading-12'"
                >
                    {{ displayTextValue(match.team_2_name) }}
                </p>
            </div>
        </div>

        <div
            v-if="hasEstimationWindow"
            class="relative z-10 flex justify-center"
            :class="compact ? 'pt-0' : 'pt-1'"
            @click.stop
        >
            <MatchCardEstimation
                :match="match"
                :champ-id="Number(champId)"
                tone="light"
            />
        </div>
    </article>
</template>

<script setup lang="ts">
import MatchState from '~/features/matches/types/MatchState'
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import { displayTextValue } from '~/features/championships/utils/championWinnerStats'

const props = withDefaults(defineProps<{
    match: IMatchLessDetails
    champId: number | string
    compact?: boolean
}>(), {
    compact: false,
})

const mediaBaseUrl = useRuntimeConfig().public.apiBaseUrl

const matchHref = computed(
    () => `/championships/${props.champId}/match/${props.match.id}`,
)

const isDone = computed(() => String(props.match.state) === MatchState.Done)
const isLive = computed(() => String(props.match.state) === MatchState.Live)
const isUpcoming = computed(() => String(props.match.state) === MatchState.Upcoming)

const cardStatusClass = computed(() => {
    if (isDone.value) return 'bg-surface-secondary/10'
    if (isLive.value) return 'bg-zat-500/15'
    if (isUpcoming.value) return 'bg-amber-500/15'
    return 'bg-surface-off-base'
})

const kickoffDateObj = computed(() => {
    if (!props.match.start_at) return null
    const date = new Date(props.match.start_at)
    return Number.isNaN(date.getTime()) ? null : date
})

const kickoffTime = computed(() => {
    if (!kickoffDateObj.value) return ''
    return kickoffDateObj.value.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
})

const kickoffDate = computed(() => {
    if (!kickoffDateObj.value) return ''
    return kickoffDateObj.value.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
})

const hasEstimationWindow = computed(() =>
    Boolean(props.match.start_estimations && props.match.end_estimations),
)

function scoreDisplay(score: number | null | undefined) {
    if (score === null || score === undefined || Number.isNaN(score)) return '-'
    return String(score)
}
</script>
