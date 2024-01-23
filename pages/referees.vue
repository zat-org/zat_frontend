<template>
    <UModal v-model="isOpen">
        <RefereeJoinRequestForm @cancel="isOpen = false" />
    </UModal>
    <FetchDataWrapper :error="error ? 'تعذر تحميل الحكام' : null" :pending="pending">
        <div class="flex justify-between items-center mb-5">
            <div>
                <h1 class="sm:text-3xl text-2xl mb-2 ">
                    <Icon name="fluent-emoji:balance-scale" size="50px" />
                    حكام زات
                </h1>
                <div class="h-1 w-32 bg-yellow-500 rounded"></div>
            </div>
            <UButton label="انضم لحكامنا" @click="isOpen = true" size="lg" trailing-icon="i-heroicons-user-group" />
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 "
            v-if="data && data.referees && data.referees.length > 0">
            <RefereeCard v-for="referee in data.referees" :key="referee.id" v-bind:referee="referee" />
        </div>
        <div v-else class="text-zinc-700 dark:text-slate-50 text-lg h-50 flex flex-col justify-center items-center py-10">
            <Icon name="line-md:alert-circle" class="block text-9xl" />
            <h3>لا يوجد حكام حاليا</h3>
        </div>

    </FetchDataWrapper>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const { $api } = useNuxtApp();

const {
    data,
    pending,
    error
} = await $api.referees.getAll();

</script>

<style scoped></style>