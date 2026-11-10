<template>
  <div
    dir="rtl"
    lang="ar"
    class="obs-layout-root flex h-full w-full items-center justify-center overflow-hidden bg-transparent"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const OBS_CLASS = 'obs-layout'

function enableObsBackground() {
  if (!import.meta.client) return
  document.documentElement.classList.add(OBS_CLASS)
}

function disableObsBackground() {
  if (!import.meta.client) return
  document.documentElement.classList.remove(OBS_CLASS)
}

onMounted(() => {
  enableObsBackground()
})

onActivated(() => {
  enableObsBackground()
})

onBeforeUnmount(() => {
  disableObsBackground()
})

onDeactivated(() => {
  disableObsBackground()
})
</script>
