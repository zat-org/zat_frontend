<template>
    <div dir="rtl" class="relative background-color rounded-lg shadow-lg p-2 text-zinc-900">
        <UIcon name="i-heroicons-microphone" class="absolute z-0 text-8xl text-[#264a52] left-0 bottom-0 opacity-10" />

        <div class="flex items-center font-semibold justify-between text-xs mb-2">
            <p class="w-2/5">
                {{ props.studio.tournament_name }}
            </p>
            <button class=" rounded-full bg-white w-8 h-6 cursor-pointer clickable" v-if="props.studio.url"
                @click.prevent="handleYoutubeClick">
                <Icon name="ion:logo-youtube" class="text-red-600 " size="20"></Icon>
            </button>
            <p class="flex justify-end items-end w-2/5">
                <span> {{ new Date(props.studio.start_at).toLocaleDateString("ar-EG") }}</span>
                <UIcon name="i-heroicons-calendar-days" class="text-xl ms-2" />
            </p>
        </div>

        <h5 class="font-semibold text-sm md:text-md mb-2 line-clamp-3">{{ props.studio.name }}</h5>
        <div v-for="analyst in props.studio.analysts" class="text-sm text-center font-semibold ">
            {{ analyst.name }}
        </div>

    </div>
</template> 

<script setup lang="ts">
import type { IStudio } from "@/Models/IStudio"

const props = defineProps({
    studio: {
        required: true,
        type: Object as PropType<IStudio>
    }
})

function handleYoutubeClick(event: Event) {
    window.open(props.studio.url, "_blank")
    event.stopImmediatePropagation()
}
</script>

<style scoped>
.background-color {
    background: #007991;
    background-image: linear-gradient(to right, #78ffd6, #007991);
}
</style>    


