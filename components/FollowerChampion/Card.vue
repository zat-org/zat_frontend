<template>
    <UCard class="bg-gray-200">
        <div class="relative z-0">
            <div class="space-y-5 text-center ">
                <h2 class="text-lg md:text-xl font-semibold ">{{ champion.attributes.name }}</h2>
                <p class="text-sm ms-3 grow">{{ champion.attributes.descriptions }}</p>
                <UButton :to="`/join-us/${champion.id}`" class="px-5 self-end" icon="i-heroicons-paper-airplane-20-solid">
                    انضم الان
                </UButton>
            </div>
            <UIcon name="i-heroicons-trophy"
                class="absolute text-[220px]  text-gray-400 dark:text-gray-600 -top-10  -right-24 z-[-1]" />
        </div>
    </UCard>
</template>

<script setup lang="ts">
import type { IFollowerChampion } from "@/Models/IFollowerChampion";
defineProps({
    champion: {
        type: Object as PropType<IFollowerChampion>,
        required: true
    }
})

</script>

<style scoped></style>