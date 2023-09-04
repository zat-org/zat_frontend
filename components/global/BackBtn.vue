<template>
    <button @click="() => $router.go(-1)"
        class="btn btn-glass bg-blue-400  text-white hover:text-slate-700 absolute -top-2 left-0 rounded-full border-0">
        <Icon name="fluent:arrow-circle-left-24-filled" size="20" />
    </button>
</template>

<script setup lang="ts">

</script>

<style scoped></style>