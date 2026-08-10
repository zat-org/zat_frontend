<template>
    <div class="flex items-center gap-2">
        <button
            type="button"
            class="flex size-6 items-center justify-center text-text-action disabled:opacity-40"
            :disabled="model >= 2"
            aria-label="زيادة"
            @click="increase"
        >
            <span class="size-6 [&>svg]:size-full" v-html="addIcon" />
        </button>
        <div class="flex size-8 items-center justify-center rounded-lg border border-surface-tone2 bg-surface-raised">
            <span class="text-base font-semibold leading-7 text-text-body">
                {{ model }}
            </span>
        </div>
        <button
            type="button"
            class="flex size-6 items-center justify-center text-text-action disabled:opacity-40"
            :disabled="model <= 0"
            aria-label="إنقاص"
            @click="decrease"
        >
            <span class="size-6 [&>svg]:size-full" v-html="minusIcon" />
        </button>
     
    </div>
</template>

<script setup lang="ts">
import minusIcon from '~/assets/images/estimations/minus-square.svg?raw'
import addIcon from '~/assets/images/estimations/add-square.svg?raw'

const model = defineModel<number>({ required: true })

function clamp(value: number) {
    return Math.min(2, Math.max(0, value))
}

function decrease() {
    model.value = clamp(Number(model.value) - 1)
}

function increase() {
    model.value = clamp(Number(model.value) + 1)
}
</script>
