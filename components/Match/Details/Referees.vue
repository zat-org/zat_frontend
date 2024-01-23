<template>
    <div v-if="match.referees && match.referees.length > 0">
        <UDivider>حكام المباراة</UDivider>
        <div class="text-gray-500 dark:text-slate-300 text-sm text-center mt-3 mb-5">
            <div class="flex justify-center">
                <div class="w-1/3 flex flex-col justify-center items-center  ">
                    <Image :src="url + match.referees[0].image" class="object-cover object-top"
                        :alt="match.referees[0].name" icon="i-heroicons-user" />
                    <p class="text-gray-950 text-md lg:text-lg dark:text-slate-50 ">
                        {{ match.referees[0].name }}
                    </p>
                    <p class="text-xs lg:text-sm ">
                        حكم الطاولة
                    </p>
                </div>
            </div>
            <div class="flex justify-between ">
                <div class="w-5/12 flex justify-center items-center flex-col  ">
                    <Image :src="url + match.referees[1].image" class="object-cover object-top"
                        :alt="match.referees[1].name" icon="i-heroicons-user" />
                    <p class="text-gray-950 text-md lg:text-lg dark:text-slate-50 ">
                        {{ match.referees[1].name }}
                    </p>
                    <p class="text-xs lg:text-sm ">
                        حكم مساعد
                    </p>
                </div>
                <div class="w-5/12 flex justify-center items-center flex-col ">
                    <Image :src="url + match.referees[2].image" class="object-cover object-top"
                        :alt="match.referees[2].name" icon="i-heroicons-user" />
                    <p class="text-gray-950 text-md lg:text-lg dark:text-slate-50 ">
                        {{ match.referees[2].name }}
                    </p>
                    <p class="text-xs lg:text-sm ">
                        حكم النشرة
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IMatchFullDetails } from "@/Models/IMatchFullDetails"
const url = useRuntimeConfig().public.apiBaseUrl;
defineProps({
    match: {
        required: true,
        type: Object as PropType<IMatchFullDetails>
    }
});
</script>

<style scoped></style>
