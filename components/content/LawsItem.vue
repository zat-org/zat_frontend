<template>
    <div>
        <UAccordion :items="items" :default-open="false" :ui="ui">
            <template #default="{ open }">
                <div class="flex h-12 items-center justify-center rounded-t-lg bg-surface-overlay px-5 text-lg font-semibold text-text-heading"
                    :class="[!open && 'rounded-b-lg ']">
                    <Icon v-if="icon" :name="icon" :color="color" class="text-2xl mx-1 text-amber-500 " />

                    <span class="truncate grow">{{ title }}</span>

                    <UIcon name="i-heroicons-chevron-left-20-solid"
                        class="w-5 h-5 ms-auto transform transition-transform duration-200"
                        :class="[open && '-rotate-90']" />
                </div>
            </template>
            <template #item>
                <div
                    class="w-[98%] md:w-[90%] mx-auto prose-h2:py-1 prose-li:marker:text-amber-600 prose-hr:border-amber-500 prose-hr:py-1 prose-ol:p-0 prose-ol:pr-[1.625rem] prose-ul:p-0 prose-ul:pr-[1.625rem]">
                    <slot name="default"></slot>
                </div>
            </template>
        </UAccordion>

    </div>
</template>
  
<script setup>
const props = defineProps({
    post: {
        type: Boolean
    },
    color: {
        type: String
    },
    icon: {
        type: String
    },
    title: {
        type: String
    }
})
const items = [{
    defaultOpen: false,
}]
const ui = { wrapper: 'flex flex-col w-full my-3', item: { base: 'rounded-b-lg bg-surface-tone py-2 text-text-heading', padding: 'p-0' } }
</script>
  
<style scoped></style>