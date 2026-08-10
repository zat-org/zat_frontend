<template>
    <div v-if="match.team1.coach && match.team2.coach">
        <USeparator>مدربى الفريقين</USeparator>
        <div class="flex justify-around text-sm text-text-caption">
            <div class="flex justify-start  items-center  mb-3">

                <Image :src="url + match.team1.coach.image" class="object-top me-4 object-cover"
                    :alt="match.team1.coach.name" icon="i-heroicons-user" />
                <div>
                    <p class="text-right text-md text-text-heading lg:text-lg">
                        {{ match.team1.coach.name }}
                    </p>
                    <p class="text-right text-xs text-text-caption lg:text-sm">
                        مدرب الفريق
                    </p>
                </div>
            </div>
            <div class="flex justify-end items-center mb-3">
                <div>
                    <p class="text-left text-md text-text-heading lg:text-lg">
                        {{ match.team2.coach.name }}
                    </p>
                    <p class="text-left text-xs text-text-caption lg:text-sm">
                        مدرب الفريق
                    </p>
                </div>
                <Image :src="url + match.team2.coach.image" class="object-top ms-4 object-cover"
                    :alt="match.team2.coach.name" icon="i-heroicons-user" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IMatchFullDetails } from "~/features/matches/types/IMatchFullDetails"
const url = useRuntimeConfig().public.apiBaseUrl;
defineProps<{ match: IMatchFullDetails }>();
</script>

<style scoped></style>
