<template>
    <UCard class="w-full bg-slate-50" :ui="ui">
        <template #header>
            <div class="flex justify-between items-center">
                <UAvatar class=" bg-white h-10 w-10 p-0.5 me-2" src="https://zatbaloot.com/images/zat-logo-black.svg"
                    icon="i-heroicons-briefcase" />
                <div class="grow">
                    <h2 class="text-sm text-gray-500 relative">المسمى الوظيفى
                        <span class=" text-gray-400 text-xs absolute left-2 top-0">
                            منذ {{ getElapsedTime(job.attributes.createdAt.toLocaleString()) }}
                        </span>
                    </h2>
                    <h2 class="text-xl truncate">{{ job.attributes.jobTitle }}</h2>
                </div>
            </div>
        </template>
        <template #default>
            <div class="text-sm">
                <h2 class="text-amber-500 text-lg">وصف الوظيفة</h2>
                <p class="mt-2 ms-2 ">{{ job.attributes.jobDescription }}</p>
            </div>
        </template>

        <template #footer>
            <div class="flex justify-around">
                <UButton :to="`/jobs/${job.id}`" class=" flex justify-center " color="gray"
                    icon="i-heroicons-cursor-arrow-ripple-16-solid">تعرف علي المزيد</UButton>
                <UButton @click="emit('callus')" class=" flex justify-center " icon="i-heroicons-paper-airplane">
                    راسلنا الان</UButton>
            </div>
        </template>
    </UCard>
</template>

<script setup lang="ts">
import type { IJob } from "@/Models/IJob";
const props = defineProps({
    job: {
        type: Object as PropType<IJob>,
        required: true
    }
})
const emit = defineEmits(['callus'])

const ui = {
    "base": " flex flex-col",
    "body": {
        "base": "grow",
    }
}
</script>

<style scoped></style>