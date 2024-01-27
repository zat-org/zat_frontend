<template>
    <footer class="flex flex-col md:flex-row justify-around items-center border-t">
        <div class="flex justify-center items-center">
            <ClientOnly>
                <img class="mx-3" width="75" height="75"
                    :src="useColorMode().preference === 'dark' ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg'"
                    alt="zat logo" />
            </ClientOnly>
            <p class="mx-3 text-sm"> لبطولات البلوت الاحترافية<br />المنصة الاحترافية الاولى لرياضة البلوت</p>
        </div>
        <div class="flex justify-around my-3">
            <UButton v-for="sma in socialMediaAccounts" target="_blank" :to="sma.href" :key="sma.href"
                class="rounded-full transition-transform duration-500 ease-out hover:-translate-y-2 mx-1" size="lg" square
                variant="outline">
                <template #trailing>
                    <Icon :name="sma.iconName" width="22" height="22" />
                </template>
            </UButton>
        </div>
    </footer>
</template>

<script setup lang="ts">
let socialMediaAccounts = [
    { iconName: "simple-icons:snapchat", href: "https://www.snapchat.com/add/zat_baloot" },
    { iconName: "mingcute:youtube-fill", href: "https://youtube.com/@zat_baloot?si=vPFZgZSdWQXns47V" },
    { iconName: "ri:twitter-x-fill", href: "https://x.com/zat_baloot" },
    { iconName: "fa-brands:twitch", href: "https://twitch.tv/zat_baloot" },
    { iconName: "lets-icons:insta", href: "https://www.instagram.com/zat_baloot?igsh=OGQ5ZDc2ODk2ZA==" },
]; 
</script>

<style scoped></style>