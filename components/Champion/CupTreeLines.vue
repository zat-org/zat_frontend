<template>
    <div class="absolute w-full h-full flex flex-col justify-around right-0.25 z-[-1]">
        <div class="border dark:border-zinc-200 border-slate-700  rounded-l-md border-r-0 relative" :class="{
            'h-[15%]': levelIndex + 1 === 1,
            'h-[25%]': levelIndex + 1 === 2,
            'h-[50%]': levelIndex + 1 === 3
        }" v-for="x in Array.from({ length: levelsLength / 2 }, (_, i) => i + 1)">
            <hr class="absolute w-32 top-1/2 left-0 -translate-x-full " :class="{ '-translate-y-full': x % 2 === 0 }">
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    levelIndex: {
        required: true,
        type: Number
    },
    levelsLength: {
        required: true,
        type: Number
    },
});
</script>

<style scoped></style>