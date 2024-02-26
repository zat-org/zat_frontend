<template>
    <swiper-slide>
        <li class="swiper-slide-li">
            <slot name="default"></slot>
        </li>
    </swiper-slide>
</template>

<script setup lang="ts">

</script>

<style scoped>
.swiper-slide-li {
    list-style-type: none;
}
</style>