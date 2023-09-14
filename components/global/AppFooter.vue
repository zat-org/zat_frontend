<template>
    <footer
        class=" flex flex-row justify-center items-center dark:text-slate-50 border-t border-slate-600 dark:border-slate-100 py-2">
        <img class="mx-5" width="75" height="75"
            :src="useColorMode().preference === 'dark' ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg'" alt="zat logo"/>
        <p class="mx-5 text-sm">زات لبطولات البلوت الاحترافية<br />نوفر مواد ترفيهية وتنافسية منذ عام 2020</p>

    </footer>
</template>

<script setup lang="ts">

</script>

<style scoped></style>