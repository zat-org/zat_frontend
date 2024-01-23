<template>
    <div class="h-screen w-screen flex flex-col justify-center items-center">
        <h2 class="text-3xl">
            هذه الصفحة غير متاحة حاليا
        </h2>
        <img class="h-1/2" src="https://storage.googleapis.com/qydha_bucket/zatbaloot_assets/404.svg">
        <UButton @click="handleError">
            العودة للصفحة الرئيسية
        </UButton>
    </div>
</template>

<script setup lang="ts">
const error = useError()
console.log(error.value);
//TODO Log the error to logs service
const handleError = () => {
    navigateTo("/")
}
</script>

<style scoped></style>