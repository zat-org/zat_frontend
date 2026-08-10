<template>
    <div class="flex w-full flex-col bg-surface-base">
        <BlogPageHero />

        <FetchDataWrapper
            class="w-full"
            :error="error ? 'تعذر تحميل البيانات برجاء المحاولة لاحقا' : null"
            :pending="pending"
        >
            <section
                class="w-full bg-surface-base py-6"
                aria-label="اخبار زات"
                dir="rtl"
            >
                <div class="page-container flex flex-col gap-6">
                    <ChampionshipsSectionDivider title="الاخبار" />

                    <div
                        v-if="blogs?.length"
                        class="columns-1 gap-6 md:columns-2 xl:columns-3"
                    >
                        <div
                            v-for="blog in blogs"
                            :key="blog.id"
                            class="mb-6 break-inside-avoid"
                        >
                            <BlogCard :blog="blog" />
                        </div>
                    </div>
                    <div
                        v-else
                        class="flex h-50 flex-col items-center justify-center py-10 text-lg text-text-subtitle"
                    >
                        <UIcon
                            name="i-heroicons-newspaper"
                            class="mb-2 size-16"
                        />
                        <h3>لا يوجد اخبار حاليا</h3>
                    </div>

                    <div
                        v-if="blogs?.length && totalBlogsCount > pgSize"
                        class="flex justify-center pt-2"
                    >
                        <Pagination
                            :page-size="pgSize"
                            :total-items-count="totalBlogsCount"
                            :current-page="pageNumber"
                            @go-to-page="handlePageChange"
                        />
                    </div>
                </div>
            </section>
        </FetchDataWrapper>
    </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const pgSize = 9
const pgNumStr = route.query.pageNum as string
const indicator = useLoadingIndicator()
const pageNumber = ref<number>(
    pgNumStr && !Number.isNaN(Number.parseInt(pgNumStr, 10))
        ? Number.parseInt(pgNumStr, 10)
        : 1,
)

const { data, pending, error } = await $api.blogs.getAll(pageNumber, pgSize, {
    watch: [pageNumber],
})

const blogs = computed(() => data.value?.blogs)
const totalBlogsCount = computed(() =>
    data.value ? Number.parseInt(data.value.totalCount, 10) : 0,
)

const handlePageChange = (val: number) => {
    pageNumber.value = val
    router.replace(`/blogs?pageNum=${val}`)
}

useHead({
    title: 'اخبار زات - آخر أخبار وتحديثات بطولات البلوت',
    meta: [
        { name: 'description', content: 'تابع آخر أخبار وتحديثات بطولات البلوت من زات. أحداث البطولات، نتائج المباريات، وأخبار اللاعبين.' },
        { property: 'og:title', content: 'اخبار زات - آخر أخبار وتحديثات بطولات البلوت' },
        { property: 'og:description', content: 'تابع آخر أخبار وتحديثات بطولات البلوت من زات. أحداث البطولات، نتائج المباريات، وأخبار اللاعبين.' },
    ],
})

watch(pending, (newValue) => {
    if (newValue)
        indicator.start()
    else
        indicator.finish()
})
</script>
