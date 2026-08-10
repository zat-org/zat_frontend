<template>
    <div
        class="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[clamp(4.5rem,32cqw,11.6875rem)] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
    >
        <img
            :src="vsIconUrl"
            alt=""
            class="size-full object-contain drop-shadow-[0_2px_41px_rgba(90,149,251,0.25)]"
            :class="tone === 'strong' ? 'opacity-100 dark:opacity-10' : 'opacity-20 dark:opacity-10'"
        />
    </div>
</template>

<script setup lang="ts">
import vsIconUrl from '~/assets/icons/vs-icon.svg'

withDefaults(defineProps<{
    tone?: 'subtle' | 'strong'
}>(), {
    tone: 'subtle',
})
</script>
