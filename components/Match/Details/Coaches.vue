<template>
    <div v-if="match.team1.coach && match.team2.coach">
        <UDivider>مدربى الفريقين</UDivider>
        <div class="flex text-gray-500 justify-around  text-sm">
            <div class="flex justify-start  items-center  mb-3">

                <Image :src="url + match.team1.coach.image" class="object-top me-4 object-cover"
                    :alt="match.team1.coach.name" icon="i-heroicons-user" />
                <div>
                    <p class="text-gray-950 text-md lg:text-lg dark:text-slate-50 text-right">
                        {{ match.team1.coach.name }}
                    </p>
                    <p class="text-xs lg:text-sm text-right dark:text-slate-400">
                        مدرب الفريق
                    </p>
                </div>
            </div>
            <div class="flex justify-end items-center mb-3">
                <div>
                    <p class="text-gray-950 text-md lg:text-lg dark:text-slate-50 text-left">
                        {{ match.team2.coach.name }}
                    </p>
                    <p class="text-xs lg:text-sm text-left dark:text-slate-400">
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
import type { IMatchFullDetails } from "@/Models/IMatchFullDetails"
const url = useRuntimeConfig().public.apiBaseUrl;
defineProps<{ match: IMatchFullDetails }>();
</script>

<style scoped></style>
