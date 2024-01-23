<template>
    <FetchDataWrapper class="md:w-5/6 lg:w2/3 mx-auto text-gray-900 dark:text-slate-50"
        :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا' : ''" :pending="pending">
        <section class="py-10" v-if="blogs && blogs.length > 0">
            <div class="flex flex-wrap w-full mb-3 md:mb-6">
                <div>
                    <h1 class=" font-medium title-font mb-2 flex items-center ">
                        <UIcon name="i-heroicons-newspaper" class="me-1 text-3xl text-amber-500" />
                        <span class="sm:text-3xl text-2xl">
                            اخبار زات
                        </span>
                    </h1>
                    <div class="h-1 w-32 bg-yellow-500 rounded"></div>
                </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-20 justify-items-center">
                <template v-for="blog in blogs">
                    <BlogCard :blog="blog" />
                </template>
            </div>
            <div class="flex justify-center mt-8 absolute bottom-3 left-1/2 -translate-x-1/2">
                <Pagination :pageSize="pgSize" :totalItemsCount="totalBlogsCount" :currentPage="pageNumber"
                    @goToPage="handlePageChange">
                </Pagination>
            </div>
        </section>
        <div v-else class="text-zinc-700 dark:text-slate-50 text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا يوجد اخبار حاليا</h3>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();
const route = useRoute()
const router = useRouter()

const pgSize = 10;

let pgNumStr = route.query.pageNum as string;
const indicator = useLoadingIndicator();
const pageNumber = ref<number>((pgNumStr && !isNaN(parseInt(pgNumStr))) ? parseInt(pgNumStr) : 1);
const { data, pending, error } = await $api.blogs.getAll(pageNumber, pgSize, { watch: [pageNumber] })
const blogs = computed(() => data.value?.blogs);
const totalBlogsCount = computed(() => data.value ? parseInt(data.value.totalCount) : 1);
const handlePageChange = (val: number) => {
    pageNumber.value = val
    router.replace(`/blogs?pageNum=${val}`);
}
useHead({
    title: `اخبار زات`,
})

watch(pending, (newValue) => {
    if (newValue)
        indicator.start();
    else
        indicator.finish();
})
</script>

<style scoped></style>