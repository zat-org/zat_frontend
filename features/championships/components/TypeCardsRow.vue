<template>
    <div class="-mx-4 px-4 pb-2 md:mx-0 md:overflow-x-auto md:px-0 lg:overflow-visible">
        <div
            class="flex flex-wrap justify-center gap-3 md:w-max md:min-w-full md:flex-nowrap md:justify-start md:gap-4 lg:w-full lg:justify-center lg:gap-5"
            role="list"
            aria-label="أنواع البطولات"
        >
            <div
                v-for="card in CHAMPIONSHIP_TYPE_CARDS"
                :key="card.label"
                role="listitem"
                class="shrink-0 py-1"
            >
                <ChampionshipsTypeCard :config="card" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CHAMPIONSHIP_TYPE_CARDS } from '~/features/championships/utils/championshipTypes'
</script>
