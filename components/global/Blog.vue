<template>
    <div class="p-4">
        <div
            class="bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-slate-50 p-6 rounded-lg shadow-lg relative overflow-hidden pb-10 flex justify-center flex-col text-center">
            <img class="w-full h-52 rounded  object-cover object-center mb-2" :src="url + blog.image" alt="content">
            <h2 class="text-lg   font-semibold title-font mb-2">{{ blog.title }}</h2>
            <p class="leading-relaxed text-sm mb-2 text-gray-700 dark:text-slate-100">{{ blog.description }}</p>

            <p class="text-xs absolute bottom-2 left-7 text-gray-700 dark:text-slate-200">منذ {{
                getElapsedTime(blog.published_at) }} </p>
            <NuxtLink :to="`/blogs/${blog.id}`"
                class=" bg-blue-500 hover:bg-blue-400 border-none  absolute  w-40 rounded-tl-full -bottom-0  right-0 flex justify-center btn-sm items-center text-white btn btn-info">
                اقرأ المزيد
                <Icon name="ei:arrow-left" size="30" />
            </NuxtLink>
        </div>

    </div>
</template>

<script setup lang="ts">
import getElapsedTime from "@/utils/getElapsedTime"
import type { IBlog } from "@/Models/IBlog";
import type { PropType } from 'nuxt/dist/app/compat/capi';

const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 

const props = defineProps({
    blog: {
        type: Object as PropType<IBlog>,
        required: true
    }
})

</script>

<style scoped></style>