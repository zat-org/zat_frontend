<template>
    <FetchDataWrapper :error="getBlogError ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا.' : null" :pending="getBlogPending">
        <section v-if="blog" class=" w-full md:w-3/4 lg:w-2/3 mx-auto flex flex-col my-5 space-y-5 ">
            <nuxt-img class=" h-52 rounded  w-full  object-cover object-center " :src="url + blog.image"
                :alt="blog.title" />
            <MarkdownRender :markdownString="blog.details" />
            <div class="text-center">
                <UButton to="/blogs?pageNum=1" icon="i-heroicons-newspaper-solid">
                    جميع الاخبار
                </UButton>
            </div>
        </section>
        <div v-else class="flex flex-col justify-center items-center mt-10">
            <Icon name="line-md:close-small" size="100" />
            <h4 class="text-center">هذا الخبر غير موجود</h4>
            <UButton to="/blogs?pageNum=1" icon="i-heroicons-newspaper-solid"> اخبار زات </UButton>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const route = useRoute();
const url = useRuntimeConfig().public.apiBaseUrl;
const { error: getBlogError, pending: getBlogPending, data } = await $api.blogs.getById(route.params.id as string);
const blog = computed(() => data.value?.data);
useHead({
    title: blog.value?.title ? `اخبار زات - ${blog.value?.title}` : 'اخبار زات',
    meta: computed(() => [
        {
            name: 'description',
            content: blog.value?.title ? 
                `${blog.value.title} - اقرأ المزيد عن آخر أخبار وتحديثات بطولات البلوت من زات.` :
                'آخر أخبار وتحديثات بطولات البلوت من زات'
        },
        {
            property: 'og:title',
            content: blog.value?.title ? `اخبار زات - ${blog.value.title}` : 'اخبار زات'
        },
        {
            property: 'og:description',
            content: blog.value?.title ? 
                `${blog.value.title} - اقرأ المزيد عن آخر أخبار وتحديثات بطولات البلوت من زات.` :
                'آخر أخبار وتحديثات بطولات البلوت من زات'
        },
        {
            property: 'og:image',
            content: blog.value ? url + blog.value.image : undefined
        }
    ])
})
</script>

<style scoped>
.team-avatar img {
    object-fit: contain;
}
</style>