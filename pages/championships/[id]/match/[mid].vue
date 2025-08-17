<template>
    <div class="w-full">
        <FetchDataWrapper class="mx-auto md:w-5/6" :error="error ? 'تعذر تحميل المباراة برجاء المحاولة لاحقا.' : null"
            :pending="pending">
            <MatchDetails v-if="match" :match="match" />
        </FetchDataWrapper>
    </div>
</template>

<script setup lang="ts">
import type { IChamp } from "@/Models/IChamp"
defineProps({
    champ: {
        required: true,
        type: Object as PropType<IChamp>
    }
});

const route = useRoute()
const { $api } = useNuxtApp()

const { data: match, error, pending } = await $api.matches.getById(route.params.mid as string);

useHead({
    title: match.value ? `(${match.value.team1.name} ضد ${match.value.team2.name}) - ${match.value.leagueName}` : 'مباريات زات',
})
</script>

<style scoped></style>