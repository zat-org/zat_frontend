<template>
  <ContentRenderer v-if="parsed.data" :value="parsed.data" class="prose " />
</template>

<script setup lang="ts">
import { parseMarkdown } from '~/utils/parseMarkdown';
const parsed = ref<Record<string, any>>({ data: "" });
const props = defineProps(["markdownString"])

parseMarkdown(props.markdownString)
  .then((str: string) => parsed.value.data = str)
</script>

<style scoped></style>