<template>
  <ContentRenderer v-if="parsed.data" :value="parsed.data" class="prose max-w-full rtl:prose-table:text-right
            prose-h2:my-3 prose-li:marker:text-amber-500 prose-hr:border-amber-500 prose-hr:my-5 
            prose-ol:p-0 prose-ol:pr-[1.625rem] prose-ul:p-0 prose-ul:pr-[1.625rem]
            rtl:prose-blockquote:border-r-4 prose-blockquote:border-[1px]  rtl:prose-blockquote:border-gray-300 
            rtl:prose-blockquote:border-r-amber-500 prose-blockquote:text-center 
            rtl:prose-blockquote:not-italic
            dark:prose-invert
            " />
</template>


<script setup lang="ts">
import { parseMarkdown } from "@/utils/parseMarkdown";
const parsed = ref<Record<string, any>>({ data: "" });
const props = defineProps({ markdownString: { required: true, type: String } })
const parse = () => {
  return props.markdownString && props.markdownString.length > 0 && parseMarkdown(props.markdownString)
    .then((str: string) => parsed.value.data = str)
}
onServerPrefetch(parse)
onBeforeMount(parse)
</script>

<style scoped></style>

