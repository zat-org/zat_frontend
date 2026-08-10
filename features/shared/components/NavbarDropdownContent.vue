<template>
    <div v-if="item.children?.length" class="nav-dropdown-content w-full bg-white dark:bg-white text-right">
        <p class="nav-dropdown-title">
            {{ item.label }}
        </p>
        <div class="nav-dropdown-rows">
            <div
                v-for="row in groupedRows"
                :key="row.number"
                class="nav-dropdown-row"
            >
                <ULink
                    v-for="child in row.links"
                    :key="child.label"
                    :to="child.to"
                    :href="child.href"
                    :target="child.target"
                    raw
                    class="nav-dropdown-link"
                >
                    <UIcon
                        v-if="child.icon"
                        :name="child.icon"
                        class="me-2 size-5 shrink-0"
                    />
                    <span>{{ child.label }}</span>
                </ULink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

type DropdownChild = NavigationMenuItem & {
    row?: number
    icon?: string
}

const props = defineProps<{
    item: NavigationMenuItem
}>()

const groupedRows = computed(() => {
    const children = (props.item.children ?? []) as DropdownChild[]
    const byRow = new Map<number, DropdownChild[]>()

    for (const child of children) {
        const row = child.row ?? 1
        const links = byRow.get(row) ?? []
        links.push(child)
        byRow.set(row, links)
    }

    return [...byRow.entries()]
        .sort(([a], [b]) => a - b)
        .map(([number, links]) => ({ number, links }))
})
</script>
