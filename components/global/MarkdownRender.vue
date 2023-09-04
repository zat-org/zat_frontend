<template>
  <ContentRenderer v-if="parsed.data" :value="parsed.data" class="prose rtl:prose-table:text-right
            prose-h2:my-3 prose-li:marker:text-amber-700 prose-hr:border-amber-500 prose-hr:my-5 
           prose-strong:bg-amber-300 prose-strong:text-zinc-700 prose-strong:py-[0.06rem] prose-strong:px-2 prose-strong:rounded-full   
            prose-ol:p-0 prose-ol:pr-[1.625rem] prose-ul:p-0 prose-ul:pr-[1.625rem]
            rtl:prose-blockquote:border-r-4 prose-blockquote:border-[1px]  rtl:prose-blockquote:border-gray-300 
             rtl:prose-blockquote:border-r-amber-500 prose-blockquote:text-center 
            rtl:prose-blockquote:not-italic
            
            dark:prose-invert
            " />
</template>

<script setup lang="ts">
import { parseMarkdown } from '~/utils/parseMarkdown';
const parsed = ref<Record<string, any>>({ data: "" });
const props = defineProps(["markdownString"])

const parse = () => {
  return parseMarkdown(props.markdownString)
    .then((str: string) => parsed.value.data = str)
}
onServerPrefetch(parse)
onBeforeMount(parse)
</script>

<style scoped></style>

