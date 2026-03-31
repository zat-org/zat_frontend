<template>
    <footer
        class="flex flex-col md:flex-row justify-around items-center border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black text-zinc-800 dark:text-zinc-100">
        <div class="flex justify-center items-center">
            <ClientOnly>
                <img class="mx-3" width="75" height="75"
                    :src="useColorMode().preference === 'dark' ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg'"
                    alt="zat logo" />
            </ClientOnly>
            <p class="mx-3 text-sm"> لبطولات البلوت الاحترافية<br />المنصة الاحترافية الاولى لرياضة البلوت</p>
        </div>
        <SocialMediaIcons/>
    </footer>
</template>

<script setup lang="ts">
</script>

<style scoped></style>