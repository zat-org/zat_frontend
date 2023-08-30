<template>
    <div class="relative md:w-5/6 lg:w2/3 mx-auto">
        <template v-if="!pending && !error && blog">
            <div class="flex flex-col justify-center items-center my-5 space-y-5">
                <nuxt-img class="h-96 rounded w-full md:w-3/4 lg:w-2/3 object-cover object-center mb-2"
                    :src="url + blog.image" :alt="blog.title" />
                <MarkdownRender :markdownString="blog.details" />
            </div>
            <div class=" flex justify-center mt-9 text-white">
                <NuxtLink to="/blogs" class="btn btn-info text-white bg-blue-500 border-none  hover:bg-blue-300">
                    جميع الاخبار
                </NuxtLink>
            </div>
        </template>
        <div v-else-if="pending" class="text-zinc-700 flex flex-col space-y-4 justify-center items-center p-10">
            <Icon name="svg-spinners:blocks-shuffle-3" class="text-4xl block" />
            <h2 class="font-semibold">تحميل</h2>
        </div>
        <div v-else-if="error" class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center p-4">
            <Icon name="line-md:close-circle" class="block text-9xl text-red-500" />
            <h3>{{ error }}</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
import getElapsedTime from "~/utils/getElapsedTime"
import { IBlogFullDetails } from '~/Models/IBlog';
const url = useStrapiUrl().slice(0, -4) // remove /api from strapi url 
const client = useStrapiClient()
const blog = ref<IBlogFullDetails | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/blogs/${route.params.id}`, { method: 'GET' })
        .then((res: any) => {
            blog.value = res.data
            pending.value = false
            useHead({
                title: ` اخبار زات - ${blog.value?.title}`,
            })
        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false
        })
}
onServerPrefetch(fetchData)
onBeforeMount(fetchData)

</script>

<style scoped>
.team-avatar img {
    object-fit: contain;
}
</style>