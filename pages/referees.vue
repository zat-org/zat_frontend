<template>
    <div class="flex w-full flex-col bg-surface-base">
        <section
            class="w-full bg-surface-secondary bg-repeat py-6"
            :style="{ backgroundImage: `url(${darkHeroPattern})` }"
            aria-label="حكام زات"
        >
            <div class="page-container flex flex-col items-center gap-3 text-center">
                <h1 class="font-zaatar text-3xl leading-normal text-white sm:text-4xl lg:text-[48px]">
                    حكام زات
                </h1>
                <p class="max-w-xl text-base font-semibold leading-7 text-white sm:text-xl sm:leading-9">
                    تعرف على الحكام الرسميين المشاركين في بطولات البلوت الاحترافية
                </p>
                <AppButton
                    label="انضم لحكامنا"
                    variant="primary"
                    size="lg"
                    icon="i-heroicons-user-group"
                    @click="isOpen = true"
                />
            </div>
        </section>

        <FetchDataWrapper
            class="w-full"
            :error="error ? 'تعذر تحميل الحكام برجاء المحاولة لاحقا.' : null"
            :pending="pending"
        >
            <section
                class="w-full bg-poker-pattern bg-surface-off-base py-6"
                aria-label="قائمة الحكام"
                dir="rtl"
            >
                <div class="page-container flex flex-col items-center gap-6">
                    <div
                        v-if="pagedReferees.length"
                        class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
                    >
                        <RefereeCard
                            v-for="referee in pagedReferees"
                            :key="referee.id"
                            :referee="referee"
                        />
                    </div>
                    <div
                        v-else
                        class="flex flex-col items-center justify-center py-16 text-lg text-text-body"
                    >
                        <UIcon
                            name="i-heroicons-scale"
                            class="mb-4 size-16 text-text-caption"
                        />
                        <h3 class="text-center">
                            لا يوجد حكام حاليا
                        </h3>
                        <AppButton
                            class="mt-6"
                            label="انضم لحكامنا"
                            variant="primary"
                            size="lg"
                            @click="isOpen = true"
                        />
                    </div>

                    <Pagination
                        v-if="referees.length > pgSize"
                        :page-size="pgSize"
                        :total-items-count="referees.length"
                        :current-page="pageNumber"
                        @go-to-page="handlePageChange"
                    />
                </div>
            </section>
        </FetchDataWrapper>

        <UModal
            v-model:open="isOpen"
            title="راسلنا وكن احد حكامنا المحترفين"
            :ui="{
                content: 'sm:max-w-2xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden',
                header: 'shrink-0 bg-nav-bar',
                title: 'text-text-on-action',
                close: 'text-text-on-action hover:bg-white/10',
                body: 'min-h-0 overflow-y-auto bg-surface-raised p-4 sm:p-6',
            }"
        >
            <template #body>
                <RefereeJoinRequestForm
                    @cancel="isOpen = false"
                    @done="isOpen = false"
                />
            </template>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import darkHeroPattern from '~/assets/images/shared/dark-hero-pattern.png'

const isOpen = ref(false)
const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()

const pgSize = 9
const pgNumStr = route.query.pageNum as string
const pageNumber = ref(
    pgNumStr && !Number.isNaN(Number.parseInt(pgNumStr, 10))
        ? Number.parseInt(pgNumStr, 10)
        : 1,
)

const { data, pending, error } = await $api.referees.getAll()
const referees = computed(() => data.value?.referees ?? [])
const pagedReferees = computed(() => {
    const start = (pageNumber.value - 1) * pgSize
    return referees.value.slice(start, start + pgSize)
})

function handlePageChange(val: number) {
    pageNumber.value = val
    router.replace({ query: { ...route.query, pageNum: String(val) } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(referees, (list) => {
    const maxPage = Math.max(1, Math.ceil(list.length / pgSize) || 1)
    if (pageNumber.value > maxPage) {
        pageNumber.value = maxPage
    }
})

useHead({
    title: 'حكام زات - قائمة الحكام الرسميين',
    meta: [
        {
            name: 'description',
            content: 'تعرف على حكام زات، قائمة الحكام الرسميين المشاركين في بطولات البلوت الاحترافية.',
        },
    ],
})

useSchemaOrg([
    defineWebPage({
        '@type': 'CollectionPage',
        name: 'حكام زات - قائمة الحكام الرسميين',
        description: 'تعرف على حكام زات، قائمة الحكام الرسميين المشاركين في بطولات البلوت الاحترافية.',
    }),
])
</script>
