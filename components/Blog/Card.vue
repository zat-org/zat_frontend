<template>
    <div class="bg-gray-200 dark:bg-slate-700 clickable rounded-lg shadow-lg relative w-full  h-[22rem] bg-cover bg-center "
        :style="`background-image:url(${baseUrl + blog.image})`" @click="$router.push(`/blogs/${blog.id}`)">
        <div
            class="w-full h-2/5 z-0 bg-gradient-to-t from-gray-500 from-10% rounded-lg absolute bottom-0 left-0 opacity-70">
        </div>
        <div class="w-full h-full z-10 absolute text-white p-3 pb-5 space-y-2 flex flex-col justify-end ">
            <h2 class="text-lg font-semibold"> {{ blog.title }}</h2>
            <p class="text-sm line-clamp-3 ">{{ blog.description }}</p>
        </div>
        <UBadge class="text-xs absolute top-3 left-3 rounded-full">منذ
            {{ getElapsedTime(blog.published_at) }} </UBadge>
    </div>
</template>

<script setup lang="ts">
import getElapsedTime from "@/utils/getElapsedTime"
import type { IBlog } from "@/Models/IBlog";

const baseUrl = useRuntimeConfig().public.apiBaseUrl;

defineProps<{ blog: IBlog }>()

</script>

<style scoped></style>