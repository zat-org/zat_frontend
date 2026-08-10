<template>
    <article
        class="flex flex-col bg-surface-raised text-right"
        :class="variant === 'featured'
            ? 'h-70 justify-between rounded-zat-md p-4'
            : 'gap-2 border-b-2 border-surface-tone2 px-4 py-4 sm:px-20'"
    >
        <div class="flex w-full flex-col items-stretch gap-2">
            <NuxtLink
                :to="`/jobs/${job.id}`"
                class="text-2xl font-bold leading-12 text-text-body transition-opacity hover:opacity-80"
            >
                {{ job.jobTitle }}
            </NuxtLink>
            <div class="flex items-center gap-2 text-xs font-semibold leading-6 text-text-subtitle">
                <img :src="locationIcon" alt="" class="size-4" aria-hidden="true">
                <span>المملكة العربية السعودية</span>
                <span aria-hidden="true">•</span>
                <span>{{ job.isApplyingOpen ? 'مفتوح للتقديم' : 'التقديم مغلق' }}</span>
            </div>
            <p
                class="text-base leading-7 text-text-body"
                :class="variant === 'featured' ? 'line-clamp-4' : ''"
            >
                {{ job.jobDescription }}
            </p>
        </div>

       <div>

           <AppButton
               label="قدّم طلبك الآن"
               class="shrink-0"
               :to="job.isApplyingOpen ? `/jobs/${job.id}/apply` : undefined"
               :disabled="!job.isApplyingOpen"
           />
       </div>
    </article>
</template>

<script setup lang="ts">
import type { IJob } from '~/features/jobs/types/IJob'
import locationIcon from '~/assets/images/contact/icon-location.svg'

withDefaults(defineProps<{
    job: IJob
    variant?: 'featured' | 'list'
}>(), {
    variant: 'featured',
})
</script>
