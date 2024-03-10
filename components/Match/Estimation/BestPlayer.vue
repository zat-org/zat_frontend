<template>
    <UFormGroup name="bestPlayerId" size="xl" hint="نقطتان" label="افضل لاعب بالمباراة">
        <USelectMenu v-model="bestPlayer" :options="bestPlayerOptions">
            <template #label>
                <span class="flex items-center" v-if="bestPlayer === null">
                    <UAvatar class="me-2" icon="i-hericons-user" />
                    <span class="truncate">اختر احد لاعبى الفريقين</span>
                </span>
                <span v-else class="flex items-center">
                    <UAvatar class="me-2" :src="`${url}${bestPlayer.image}`" icon="i-hericons-user" />
                    <span class="truncate">
                        {{ bestPlayer.name }}
                    </span>
                </span>
            </template>

            <template #option="{ option: person }">
                <UAvatar :src="`${url}${person.image}`" icon="i-heroicons-user" />
                <span class="truncate">{{ person.name }}</span>
            </template>

            <template #error="{ error }">
                <span :class="[error ? 'form-control-error' : '']">
                    {{ error ? error : '' }}
                </span>
            </template>
        </USelectMenu>
    </UFormGroup>
</template>

<script setup lang="ts">
import type { Person } from "@/Models/IMatchFullDetails"
defineProps<{ bestPlayerOptions: Person[] }>();
const bestPlayerId = defineModel("bestPlayerId", { required: true, type: Number });
const url = useRuntimeConfig().public.apiBaseUrl;
const bestPlayer = ref<null | Person>(null);
watch(bestPlayer, (newVal) => {
    bestPlayerId.value = newVal?.id ?? -1
}, { immediate: true })
</script>

<style scoped></style>