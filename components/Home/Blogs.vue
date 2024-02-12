<template>
    <FetchDataWrapper :error="error ? 'تعذر تحميل الاخبار.' : null" :pending="pending">
        <section class="mb-20  w-full" v-if="data && data.blogs && data.blogs.length > 0">
            <SectionHeader title="احدث اخبار زات" icon="i-heroicons-newspaper" />
            <div class=" mx-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <template v-for="(blog, index) in data.blogs" :key="index">
                    <BlogCard :blog="blog" />
                </template>
            </div>
            <div class="flex justify-center">
                <UButton to="/blogs" size="xl" class="my-8 px-32" icon="i-heroicons-megaphone">
                    جميع الاخبار
                </UButton>
            </div>
        </section>
        <div v-else class="text-zinc-700 text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا يوجد اخبار حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const pageNum = ref(1);
const { data, error, pending } = await $api.blogs.getAll(pageNum, 3);

</script>

<style scoped></style>