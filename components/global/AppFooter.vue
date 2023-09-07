<template>
    <footer
        class="footer px-7 py-4 border-t dark:bg-slate-800 dark:border-slate-400 bg-base-200 text-base-content border-base-300 flex flex-col md:flex-row justify-center items-center md:justify-between ">
        <div class="items-center grid-flow-col">
            <img class="h-20"
                :src="useColorMode().preference === 'dark' ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg'" />
            <p class="dark:text-slate-50">زات لبطولات البلوت الاحترافية<br />نوفر مواد ترفيهية وتنافسية منذ عام 2020</p>
        </div>

    </footer>
</template>

<script setup lang="ts">

</script>

<style scoped></style>