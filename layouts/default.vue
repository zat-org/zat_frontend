<template>
  <div
    dir="rtl"
    lang="ar"
    class="flex min-h-screen flex-col bg-surface-base"
  >
    <Navbar />
    <main class="relative flex w-full grow flex-col items-stretch justify-start">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
