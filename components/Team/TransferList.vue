<template>
    <div v-if="transfers && transfers.length > 0"
        class="max-h-96 overflow-auto py-5 px-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
        <div class="grid grid-cols-1 gap-3 w-full align-start">
            <TeamTransfer v-for="trans, index in transfers" v-bind:trans="trans" :key="index"
                :currentTeamName="currentTeamName" />
        </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center">
        <Icon name="line-md:close-small" size="100" />
        <h4 class="text-center">
            <slot name="noTransText">
                لا يوجد انتقالات حتي الان
            </slot>
        </h4>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'nuxt/dist/app/compat/capi';
import type { ITransfer } from '@/Models/ITeam';


const props = defineProps({
    transfers: { type: Object as PropType<ITransfer[]>, required: true },
    currentTeamName: { type: String, required: false }
})
</script>

<style scoped></style>