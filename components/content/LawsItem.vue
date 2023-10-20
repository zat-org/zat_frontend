<template>
    <div class="collapse collapse-arrow  my-5 dark:bg-slate-600 bg-slate-200">
        <input type="checkbox" />
        <div
            class="collapse-title text-zinc-700 dark:text-slate-50 bg-zinc-100 dark:bg-slate-700 text-lg font-semibold flex items-center justify-center">
            <Icon v-if="props.icon && !props.post" :name="props.icon" :color="props.color"
                class="text-2xl mx-1 text-amber-500" />
            {{ props.title }}
            <Icon v-if="props.icon && props.post" :name="props.icon" :color="props.color"
                class="text-2xl mx-1 text-amber-500" />
        </div>
        <div class="collapse-content  bg-zinc-300 dark:bg-slate-600  text-zinc-950 px-5  dark:text-slate-50 transition-all duration-700 ease-out border-2 dark:border-slate-600
            prose-h2:my-3 prose-li:marker:text-amber-700 prose-hr:border-amber-500 prose-hr:my-5  
          prose-strong:bg-amber-300 prose-strong:text-zinc-700 prose-strong:py-[0.06rem] prose-strong:px-2 prose-strong:rounded-full   
            prose-ol:p-0 prose-ol:pr-[1.625rem] prose-ul:p-0 prose-ul:pr-[1.625rem]
            ">
            <slot></slot>
        </div>
    </div>
</template>
  
<script setup>

const props = defineProps(["title", "icon", "color", "post"])

</script>
  
<style scoped></style>