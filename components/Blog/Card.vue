<template>
    <div class="bg-gray-200 dark:bg-slate-700  rounded-lg shadow-lg relative w-full z-0 hover:z-10 h-[22rem] bg-cover bg-center hover:cursor-pointer
            hover:scale-105 active:scale-100 transition-transform duration-500 ease-out  "
        :style="`background-image:url(${baseUrl + blog.image})`" @click="$router.push(`/blogs/${blog.id}`)">
        <div
            class="w-full h-full  transition-opacity duration-500 rounded-lg hover:bg-black/20  group flex flex-col justify-between ">
            <h2
                class="text-lg font-semibold transition-opacity duration-500 text-white opacity-0 group-hover:opacity-100 rounded-t-lg group-hover:bg-slate-500/40 py-3 ps-3">
                {{ blog.title }}
            </h2>
            <p
                class="text-sm transition-opacity duration-500 text-white opacity-0 group-hover:opacity-100 rounded-b-lg group-hover:bg-slate-500/70 py-3 ps-3">
                {{ blog.description }}
            </p>
        </div>
        <UBadge class="text-xs absolute top-3 left-3 rounded-full">منذ
            {{ getElapsedTime(blog.published_at) }} </UBadge>
    </div>
</template>

<script setup lang="ts">
import getElapsedTime from "@/utils/getElapsedTime"
import type { IBlog } from "@/Models/IBlog";

const baseUrl = useRuntimeConfig().public.apiBaseUrl;

const props = defineProps({
    blog: {
        type: Object as PropType<IBlog>,
        required: true
    }
})

</script>

<style scoped></style>