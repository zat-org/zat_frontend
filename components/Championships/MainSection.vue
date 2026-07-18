<template>
    <section class="relative bg-poker-pattern py-4 sm:py-6" aria-label="إحصائيات وتاريخ البطولات">
        <div class="page-container">
            <div class="flex flex-col gap-6 xl:flex-row xl:items-stretch">
                <ChampionshipsRecentSidebar
                    class="order-2 xl:order-1"
                    :type="sidebarType"
                />
                <ChampionshipsMatchHistory class="order-1 xl:order-2" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    sidebarType?: string
}>(), {
    sidebarType: 'done',
})
</script>
