<template>
    <div>
        <template v-if="!pending && !error && blogs">
            <section class="mb-20" v-if="blogs.length > 0">
                <div class="flex flex-wrap w-full mb-3 md:mb-6">
                    <div class="lg:w-1/2 w-full ">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"> حديث اخبار زات</h1>
                        <div class="h-1 w-20 bg-yellow-500 rounded"></div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <template v-for="(blog, index) in blogs" :key="index">
                        <Blog :blog="blog" />
                    </template>
                </div>
                <div class=" flex justify-center mt-9 text-white">
                    <NuxtLink to="/blogs" class="btn btn-info text-white bg-blue-500 border-none  hover:bg-blue-300">
                        جميع الاخبار
                    </NuxtLink>
                </div>
            </section>
            <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center py-10">
                <Icon name="line-md:alert-circle" class="block text-9xl" />
                <h3>لا يوجد اخبار حاليا</h3>
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
import IBlog from '~/Models/IBlog';
const client = useStrapiClient()
const blogs = ref<IBlog[] | null>(null)
const error = ref<string | null>(null)
const pending = ref(false)

const fetchData = () => {
    pending.value = true
    return client(`/blogs?pgSize=3&pgNum=1`, { method: 'GET' })
        .then((data: any) => {
            blogs.value = data.blogs
            pending.value = false
            // console.log(data);
        }).catch((err) => {
            console.error(err)
            error.value = "تعذر تحميل البيانات."
            pending.value = false
        })
}
onServerPrefetch(fetchData)
onBeforeMount(fetchData)


</script>

<style scoped></style>