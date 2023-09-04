<template>
    <div v-if="champs.length > 0" class="grid grid-cols-1 gap-3 w-full">
        <TeamChamp v-for="(champ, index) in champs" v-bind:champ="champ" :key="index" />
    </div>
    <div v-else class="flex flex-col justify-center items-center">
        <Icon name="line-md:close-small" size="100" />
        <h4 class="text-center">لم يفز الفريق بأى بطولات حتي الان</h4>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi';
import { IChampLessDetails } from '@/Models/ITeam';

const props = defineProps({
    champs: { type: Object as PropType<IChampLessDetails[]>, required: true }
})
</script>

<style scoped></style>