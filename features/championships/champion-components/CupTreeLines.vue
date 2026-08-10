<template>
    <div class="absolute inset-y-0 inset-e-0 z-0 flex w-full flex-col justify-around ps-1">
        <div
            v-for="x in pairCount"
            :key="x"
            class="relative rounded-s-md  border-4 border-s-0   border-surface-tone2 bg-red-500"
            :class="heightClass"
        >
        {{ x }}
            <hr
                class="absolute inset-e-0 top-1/2 w-16 -translate-x-full border-surface-tone2"
                :class="{ '-translate-y-full': x % 2 === 0 }"
            >
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    levelIndex: number
    levelsLength: number
}>()

const pairCount = computed(() => Math.max(1, Math.floor(props.levelsLength / 2)))

const heightClass = computed(() => {
    const round = props.levelIndex + 1
    if (round === 1) return 'h-[15%]'
    if (round === 2) return 'h-[25%]'
    return 'h-[50%]'
})
</script>
