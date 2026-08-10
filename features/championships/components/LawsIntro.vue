<template>
    <article
        class="flex w-full flex-col gap-6 rounded-zat-md bg-surface-raised p-4"
        aria-label="قوانين البلوت"
        dir="rtl"
    >
        <div class="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <div class="flex min-w-0 flex-1 flex-col gap-0.5 text-center sm:text-right">
                <h2 class="text-xl font-bold leading-10 text-text-heading">
                    قوانين البلوت كاملة.. مقدمة من زات
                </h2>
                <p class="text-base leading-7 text-text-heading">
                    تعلم البلوت مع زات
                </p>
            </div>

            <NuxtLink
                to="/learn-baloot"
                class="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-surface-secondary px-2 text-xs font-bold leading-6 text-white transition-opacity hover:opacity-90"
            >
                تعلم الان
                <UIcon
                    name="zat:teacher"
                    class="size-4"
                />
            </NuxtLink>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-2">
            <NuxtLink
                to="/rules"
                target="_blank"
                class="flex min-w-40 flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-surface-tone2 bg-surface-base p-4 text-text-body transition-opacity hover:opacity-80 sm:max-w-xs"
            >
                <UIcon
                    name="zat:library"
                    class="size-8"
                />
                <span class="text-base font-bold leading-7">
                    جميع القوانين..
                </span>
            </NuxtLink>

            <NuxtLink
                to="/learn-baloot"
                class="flex min-w-40 flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-surface-tone2 bg-surface-base p-4 text-text-body transition-opacity hover:opacity-80 sm:max-w-xs"
            >
                <UIcon
                    name="zat:teacher"
                    class="size-8"
                />
                <span class="text-base font-bold leading-7">
                    دورات البلوت
                </span>
            </NuxtLink>
        </div>

        <p class="text-center text-[10px] leading-4 text-text-subtitle sm:text-right">
            كورس عملي لتعلم البلوت خطوة بخطوة: من القواعد الأساسية لحد استراتيجيات الفوز. هتتعلم إزاي تفكر زي المحترفين، تقرأ اللعب، وتاخد قرارات ذكية تخليك تكسب بثقة في كل جولة.
        </p>
    </article>
</template>
