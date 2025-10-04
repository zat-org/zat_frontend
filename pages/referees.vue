<template>
    <UModal v-model="isOpen">
        <RefereeJoinRequestForm @cancel="isOpen = false" />
    </UModal>
    <FetchDataWrapper class="mx-auto w-full lg:w-5/6 py-10" :error="error ? 'تعذر تحميل الحكام' : null"
        :pending="pending">
        <SectionHeader title="حكام زات" icon="i-heroicons-scale">
            <UButton label="انضم لحكامنا" @click="isOpen = true" size="lg" trailing-icon="i-heroicons-user-group" />
        </SectionHeader>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 "
            v-if="data && data.referees && data.referees.length > 0">
            <RefereeCard v-for="referee in data.referees" :key="referee.id" v-bind:referee="referee" />
        </div>
        <div v-else
            class="text-zinc-700 dark:text-slate-50 text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا يوجد حكام حاليا</h3>
        </div>

    </FetchDataWrapper>
</template>

<script setup lang="ts">

useHead({
    title: 'حكام زات - قائمة الحكام الرسميين',
    meta: [
        { name: 'description', content: 'تعرف على حكام زات، قائمة الحكام الرسميين المشاركين في بطولات البلوت الاحترافية.' }
    ]
});

useSchemaOrg([
    defineArticle({
        headline: 'حكام زات - قائمة الحكام الرسميين',
        description: 'تعرف على حكام زات، قائمة الحكام الرسميين المشاركين في بطولات البلوت الاحترافية.',
        author: { name: 'Zat Team' }
    })
])
const isOpen = ref(false)
const { $api } = useNuxtApp();

const {
    data,
    pending,
    error
} = await $api.referees.getAll();

</script>

<style scoped></style>