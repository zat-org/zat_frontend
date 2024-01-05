<template>
    <UCard>
        <template #header>
            <div class="flex justify-between items-center">

                <div>
                    <h2 class="text-sm text-gray-500">المسمى الوظيفى</h2>
                    <h2 class="text-xl truncate">{{ job.attributes.jobTitle }}</h2>
                </div>
                <UAvatar class=" bg-white h-10 w-10 p-0.5" src="https://zatbaloot.com/images/zat-logo-black.svg"
                    alt="زات" />

            </div>

        </template>

        <div class="text-sm">
            <div class="">
                <h2 class="text-amber-500 text-lg">وصف الوظيفة</h2>
                <p class="mt-2 ms-2 ">{{ job.attributes.jobDescription }}</p>
            </div>
            <p class="text-gray-400 text-xs text-left  mt-3">
                منذ
                {{ getElapsedTime(job.attributes.createdAt.toLocaleString()) }}
            </p>
        </div>

        <template #footer>
            <div class="flex  justify-around w-full ">
                <UButton :to="`/jobs/${job.id}`" class=" flex justify-center" color="gray"
                    icon="i-heroicons-cursor-arrow-ripple-16-solid">تعرف علي المزيد</UButton>
                <UButton :to="`/jobs/${job.id}`" class=" flex justify-center" color="amber"
                    icon="i-heroicons-paper-airplane">راسلنا الان</UButton>
            </div>
        </template>
    </UCard>
</template>

<script setup lang="ts">
import type { IJob } from "@/Models/IJob";
import type { PropType } from 'nuxt/dist/app/compat/capi';

const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 

const props = defineProps({
    job: {
        type: Object as PropType<IJob>,
        required: true
    }
})
</script>

<style scoped></style>