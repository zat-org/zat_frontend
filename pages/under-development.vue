<template>
  <div class="ud-page relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden text-center px-4 py-10">
    <!-- Atmosphere -->
    <div class="ud-bg absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="ud-glow ud-glow--one" />
      <div class="ud-glow ud-glow--two" />
    </div>

    <!-- Yellow & black construction tape — 2 corners -->
    <div class="ud-tape ud-tape--tl" aria-hidden="true">
      <div class="ud-tape-stripe" />
      <div class="ud-tape-stripe" />
    </div>
    <div class="ud-tape ud-tape--br" aria-hidden="true">
      <div class="ud-tape-stripe" />
      <div class="ud-tape-stripe" />
    </div>

    <!-- Main content -->
    <div class="relative z-10 flex flex-col items-center max-w-lg">
      <div class="ud-logo-wrap relative mb-8">
        <div class="ud-logo-ring" aria-hidden="true" />
        <img
          :src="colorMode.preference === 'dark' ? '/images/zat-logo-white.svg' : '/images/zat-logo-black.svg'"
          alt="زات"
          class="ud-logo relative h-24 w-auto"
        />
        <span class="ud-spark ud-spark--1" aria-hidden="true" />
        <span class="ud-spark ud-spark--2" aria-hidden="true" />
        <span class="ud-spark ud-spark--3" aria-hidden="true" />
      </div>

      <!-- Building blocks visual -->
      <div class="ud-build mb-8" aria-hidden="true">
        <div class="ud-block ud-block--1" />
        <div class="ud-block ud-block--2" />
        <div class="ud-block ud-block--3" />
        <div class="ud-crane">
          <div class="ud-crane-arm" />
          <div class="ud-crane-hook" />
        </div>
      </div>

      <p class="ud-eyebrow text-amber-500 font-semibold tracking-wide mb-3 text-sm md:text-base">
        شيء عظيم يُبنى الآن
      </p>

      <h1 class="ud-title text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
        الموقع تحت التطوير
      </h1>

      <p class="ud-desc text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-md mb-8 leading-relaxed">
        نعمل على تجربة جديدة لبطولات زات — أجمل، أسرع، وأقوى.
        <br />
        نعود قريباً بإذن الله.
      </p>

      <!-- Progress -->
      <div class="w-full max-w-xs">
        <div class="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span>قيد البناء</span>
          <span>{{ displayProgress }}%</span>
        </div>
        <div class="ud-progress h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div class="ud-progress-bar h-full rounded-full" :style="{ width: `${displayProgress}%` }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const colorMode = useColorMode()

const displayProgress = ref(0)

onMounted(() => {
  const target = 78
  const start = performance.now()
  const duration = 2200

  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    displayProgress.value = Math.round(eased * target)
    if (t < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
})

useHead({
  title: 'تحت التطوير | زات',
  meta: [
    {
      name: 'description',
      content: 'موقع زات تحت التطوير حالياً. شيء عظيم يُبنى الآن — نعود قريباً.',
    },
  ],
})
</script>

<style scoped>
.ud-bg {
  background:
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(245, 158, 11, 0.18), transparent 55%),
    radial-gradient(ellipse 60% 40% at 100% 100%, rgba(245, 158, 11, 0.08), transparent 50%),
    radial-gradient(ellipse 50% 35% at 0% 80%, rgba(148, 163, 184, 0.12), transparent 45%);
}

.ud-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(60px);
  opacity: 0.35;
}

.ud-glow--one {
  width: 280px;
  height: 280px;
  top: 15%;
  left: 20%;
  background: rgba(245, 158, 11, 0.45);
  animation: ud-pulse-glow 5s ease-in-out infinite;
}

.ud-glow--two {
  width: 220px;
  height: 220px;
  bottom: 20%;
  right: 18%;
  background: rgba(251, 191, 36, 0.35);
  animation: ud-pulse-glow 6s ease-in-out infinite 1.5s;
}

/* Construction hazard tape */
.ud-tape {
  position: absolute;
  z-index: 5;
  width: 140%;
  height: 48px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0.95;
}

.ud-tape-stripe {
  flex: 1;
  width: 100%;
  background: repeating-linear-gradient(
    -45deg,
    #111111 0,
    #111111 18px,
    #facc15 18px,
    #facc15 36px
  );
  background-size: 50.91px 50.91px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  animation: ud-tape-scroll 1.2s linear infinite;
}

.ud-tape--br .ud-tape-stripe {
  animation-direction: reverse;
}

.ud-tape--tl {
  top: -8px;
  left: -42%;
  transform: rotate(-38deg);
  transform-origin: center;
}

.ud-tape--br {
  bottom: -8px;
  right: -42%;
  transform: rotate(-38deg);
  transform-origin: center;
}

.ud-logo-wrap {
  animation: ud-fade-up 0.8s ease-out both;
}

.ud-logo {
  animation: ud-logo-breathe 3.5s ease-in-out infinite;
}

.ud-logo-ring {
  position: absolute;
  inset: -18px;
  border-radius: 9999px;
  border: 2px solid rgba(245, 158, 11, 0.35);
  animation: ud-ring 2.8s ease-out infinite;
}

.ud-spark {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: #f59e0b;
  box-shadow: 0 0 10px #f59e0b;
}

.ud-spark--1 {
  top: 8%;
  right: -4%;
  animation: ud-spark 2.2s ease-in-out infinite;
}

.ud-spark--2 {
  bottom: 12%;
  left: -6%;
  animation: ud-spark 2.6s ease-in-out infinite 0.5s;
}

.ud-spark--3 {
  top: 40%;
  right: -12%;
  width: 4px;
  height: 4px;
  animation: ud-spark 2s ease-in-out infinite 1s;
}

.ud-build {
  position: relative;
  width: 120px;
  height: 72px;
  animation: ud-fade-up 0.9s ease-out 0.15s both;
}

.ud-block {
  position: absolute;
  bottom: 0;
  border-radius: 6px;
  background: linear-gradient(145deg, #f59e0b, #d97706);
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.35);
}

.ud-block--1 {
  width: 36px;
  height: 28px;
  left: 12px;
  animation: ud-stack 2.4s ease-in-out infinite;
}

.ud-block--2 {
  width: 36px;
  height: 28px;
  left: 42px;
  animation: ud-stack 2.4s ease-in-out infinite 0.25s;
}

.ud-block--3 {
  width: 36px;
  height: 28px;
  left: 72px;
  animation: ud-stack 2.4s ease-in-out infinite 0.5s;
}

.ud-crane {
  position: absolute;
  top: -8px;
  right: 8px;
  width: 48px;
  height: 48px;
  animation: ud-crane-swing 3s ease-in-out infinite;
  transform-origin: top right;
}

.ud-crane-arm {
  position: absolute;
  top: 8px;
  right: 0;
  width: 42px;
  height: 3px;
  background: #64748b;
  border-radius: 2px;
}

.ud-crane-arm::before {
  content: '';
  position: absolute;
  top: -10px;
  right: -2px;
  width: 4px;
  height: 14px;
  background: #475569;
  border-radius: 2px;
}

.ud-crane-hook {
  position: absolute;
  top: 11px;
  left: 0;
  width: 2px;
  height: 22px;
  background: #94a3b8;
  animation: ud-hook 3s ease-in-out infinite;
}

.ud-crane-hook::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: -5px;
  width: 12px;
  height: 8px;
  border: 2px solid #f59e0b;
  border-top: none;
  border-radius: 0 0 6px 6px;
}

.ud-eyebrow {
  animation: ud-fade-up 0.9s ease-out 0.25s both;
}

.ud-title {
  animation: ud-fade-up 0.9s ease-out 0.35s both;
}

.ud-desc {
  animation: ud-fade-up 0.9s ease-out 0.45s both;
}

.ud-progress {
  animation: ud-fade-up 0.9s ease-out 0.55s both;
}

.ud-progress-bar {
  transition: width 0.05s linear;
  background-image: linear-gradient(
    90deg,
    #d97706,
    #f59e0b,
    #fbbf24,
    #f59e0b,
    #d97706
  );
  background-size: 200% 100%;
  animation: ud-shimmer 1.8s linear infinite;
}

@keyframes ud-tape-scroll {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 50.91px 0;
  }
}

@keyframes ud-logo-breathe {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04);
  }
}

@keyframes ud-ring {
  0% {
    transform: scale(0.92);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.25);
    opacity: 0;
  }
}

@keyframes ud-spark {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.6);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

@keyframes ud-stack {
  0%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-6px);
  }
}

@keyframes ud-crane-swing {
  0%,
  100% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

@keyframes ud-hook {
  0%,
  100% {
    height: 18px;
  }
  50% {
    height: 28px;
  }
}

@keyframes ud-fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ud-pulse-glow {
  0%,
  100% {
    opacity: 0.25;
    transform: scale(1);
  }
  50% {
    opacity: 0.45;
    transform: scale(1.15);
  }
}

@keyframes ud-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 640px) {
  .ud-tape {
    height: 34px;
    gap: 6px;
  }

  .ud-tape--tl {
    top: -6px;
    left: -48%;
  }

  .ud-tape--br {
    bottom: -6px;
    right: -48%;
  }
}
</style>
