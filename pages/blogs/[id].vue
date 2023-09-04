<template>
    <FetchDataWraper class="md:w-5/6 lg:w2/3 mx-auto text-gray-900 dark:text-slate-50" :error="error" :pending="pending">
        <template #main>
            <section v-if="blog">
                <div class="flex flex-col justify-center items-center my-5 space-y-5">
                    <nuxt-img class="h-96 rounded w-full md:w-3/4 lg:w-2/3 object-cover object-center mb-2"
                        :src="url + blog.image" :alt="blog.title" />
                    <MarkdownRender :markdownString="blog.details" class="" />
                </div>
                <div class=" flex justify-center my-7 text-white">
                    <NuxtLink to="/blogs" class="btn btn-info text-white bg-blue-500 border-none  hover:bg-blue-300">
                        جميع الاخبار
                    </NuxtLink>
                </div>
            </section>
            <div v-else class="flex flex-col justify-center items-center mt-10">
                <Icon name="line-md:close-small" size="100" />
                <h4 class="text-center">هذا الخبر غير موجود</h4>
                <NuxtLink to="/blogs" class="btn btn-warning mt-5"> اخبار زات</NuxtLink>
            </div>
        </template>
    </FetchDataWraper>
</template>

<script setup lang="ts">
const route = useRoute()
import { IBlogFullDetails } from '@/Models/IBlog';
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