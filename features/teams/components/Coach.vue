<template>
    <div class="flex flex-col justify-center items-center ">
        <Image :src="url + coach.image" class="object-top object-cover" :alt="coach.name" icon="i-heroicons-user" />
        <div class="text-center">
            <p class="mt-2 truncate text-sm font-semibold text-text-heading">
                {{ coach.name }}
            </p>
            <p class="text-xs text-amber-500">
                مدرب الفريق
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Person } from '~/features/matches/types/IMatchFullDetails';
const url = useRuntimeConfig().public.apiBaseUrl

defineProps<{ coach: Person }>()
</script>

<style scoped></style>