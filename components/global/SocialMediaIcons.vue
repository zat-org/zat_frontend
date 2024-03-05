<template>
    <div class="flex justify-center my-3">
        <UButton v-for="sma in socialMediaAccounts" target="_blank" :to="sma.href" :key="sma.href"
            class="rounded-full transition-transform duration-500 ease-out hover:-translate-y-2 mx-1" size="lg"
            square variant="outline">
            <template #trailing>
                <Icon :name="sma.iconName" width="22" height="22" />
            </template>
        </UButton>
    </div>
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

<style scoped>

</style>