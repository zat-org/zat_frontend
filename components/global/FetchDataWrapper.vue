<template>
    <!-- w-full flex flex-col grow justify-start items-center text-zinc-700 dark:text-slate-50 -->
    <div>
        <template v-if="!pending && !error">
            <slot name="default"></slot>
        </template>
        <template v-else-if="pending">
            <slot name="pending" :pending="pending">
                <div class="text-zinc-700 dark:text-slate-50 flex flex-col space-y-4 justify-center items-center p-10">
                    <Icon name="svg-spinners:blocks-shuffle-3" class="text-4xl block" />
                    <h2 class="font-semibold">تحميل</h2>
                </div>
            </slot>
        </template>
        <template v-else-if="error">
            <slot name="error" :error="error">
                <div class="text-zinc-700 dark:text-slate-50 text-lg h-50 flex flex-col justify-center items-center p-4">
                    <Icon name="line-md:close-circle" class="block text-9xl text-red-500" />
                    <h3>{{ error }}</h3>
                </div>
            </slot>
        </template>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    pending: boolean,
    error: string | null
}>();
</script>

<style scoped></style>