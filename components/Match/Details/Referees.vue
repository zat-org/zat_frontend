<template>
    <div v-if="match.referees && match.referees.length > 0">
        <div class="divider">حكام المباراة</div>
        <div class="text-gray-500  text-sm text-center">
            <div class="flex ">
                <div class="w-1/3"></div>
                <div class="w-1/3 flex flex-col justify-center items-center  space-y-2">
                    <div class="avatar">
                        <div class=" w-10 sm:w-16 md:w-20 rounded-xl shadow-lg ">
                            <img class="object-top" :src="url + match.referees[0].image" :alt="match.referees[0].name" />
                        </div>
                    </div>

                    <div class="">
                        <p class="text-gray-950 ">
                            {{ match.referees[0].name }}
                        </p>
                        <p class="text-xs ">
                            حكم الطاولة
                        </p>
                    </div>
                </div>
                <div class="w-1/3"></div>
            </div>
            <div class="flex ">
                <div class="w-5/12 flex justify-center items-center flex-col  space-y-2">
                    <div class="avatar">
                        <div class=" w-10 sm:w-16 md:w-20 rounded-xl shadow-lg ">
                            <img class="object-top" :src="url + match.referees[1].image" :alt="match.referees[1].name" />
                        </div>
                    </div>
                    <div class="">
                        <p class="text-gray-950 ">
                            {{ match.referees[1].name }}
                        </p>
                        <p class="text-xs ">
                            حكم مساعد
                        </p>
                    </div>
                </div>
                <div class="w-2/12"></div>
                <div class="w-5/12 flex justify-center items-center flex-col space-y-2">
                    <div class="avatar">
                        <div class=" w-10 sm:w-16 md:w-20 rounded-xl shadow-lg ">
                            <img class="object-top" :src="url + match.referees[2].image" :alt="match.referees[2].name" />
                        </div>
                    </div>
                    <div class="">
                        <p class="text-gray-950 ">
                            {{ match.referees[2].name }}
                        </p>
                        <p class="text-xs ">
                            حكم النشرة
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(["match"])
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 

</script>

<style scoped></style>
