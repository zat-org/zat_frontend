    <template>
    <div class="flex items-center gap-4 sm:gap-[68px]">
        <div class="h-[3px] min-w-0 flex-1 bg-surface-tone" aria-hidden="true" />
        <h2 class="shrink-0 text-center text-xl font-bold text-text-subtitle sm:text-2xl lg:text-3xl">
            {{ title }}
        </h2>
        <div class="h-[3px] min-w-0 flex-1 bg-surface-tone" aria-hidden="true" />
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    title?: string
}>(), {
    title: 'البطولات',
})
</script>
