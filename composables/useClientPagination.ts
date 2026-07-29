export function useClientPagination<T>(
    items: Ref<T[] | undefined>,
    pageSize: number,
) {
    const page = ref(1)

    const totalItems = computed(() => items.value?.length ?? 0)
    const totalPages = computed(() =>
        Math.max(1, Math.ceil(totalItems.value / pageSize)),
    )

    const paginatedItems = computed(() => {
        const list = items.value ?? []
        const start = (page.value - 1) * pageSize
        return list.slice(start, start + pageSize)
    })

    const showPagination = computed(() => totalItems.value > pageSize)

    watch(totalPages, (max) => {
        if (page.value > max) {
            page.value = max
        }
    })

    watch(items, () => {
        page.value = 1
    })

    watch(page, () => {
        if (import.meta.client) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    })

    return {
        page,
        pageSize,
        paginatedItems,
        totalItems,
        totalPages,
        showPagination,
    }
}
