<template>
    <div class="flex flex-col justify-center items-center ">
        <UAvatar size="xl" :src="url + coach.image" class="object-top object-cover" :alt="coach.name"
            icon="i-heroicons-user" />
        <div class="text-center">
            <p class="text-sm font-semibold mt-2 text-amber-900 dark:text-slate-50 truncate">
                {{ coach.name }}
            </p>
            <p class="text-xs text-amber-500">
                مدرب الفريق
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Person } from '~/Models/IMatchFullDetails';
const url = useRuntimeConfig().public.apiBaseUrl

defineProps<{ coach: Person }>()
</script>

<style scoped></style>