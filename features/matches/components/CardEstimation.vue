<template>
    <div
        v-if="shouldShow"
        class="flex justify-center"
    >
        <AppButton
            v-if="!userStore.isAuthenticated"
            label="سجل دخول وتوقع"
            icon="i-heroicons-user-circle"
            variant="primary"
            @click="openLoginForm"
        />

        <AppButton
            v-else-if="estimationStatus === null"
            label="جاري التحميل..."
            icon="i-heroicons-arrow-path"
            variant="primary"
            disabled
        />

        <AppButton
            v-else-if="estimationStatus === 'available'"
            label="توقع النتيجة"
            icon="i-heroicons-chart-bar"
            variant="primary"
            @click="openEstimationForm"
        />

        <AppButton
            v-else-if="estimationStatus === 'submitted'"
            :label="submittedLabel"
            icon="i-heroicons-check-circle"
            color-class="text-green-600"
            @click="openSubmittedDetails"
        />

        <LoginForm v-model="isLoginFormOpened" />

        <MatchEstimationForm
            v-if="fullMatchData"
            v-model="isEstimationFormOpened"
            :match="fullMatchData"
            @estimation-submitted="handleEstimationSubmitted"
        />

        <MatchEstimationSubmitted
            v-if="submittedEstimation"
            v-model="isSubmittedOpen"
            :match="match"
            :estimation="submittedEstimation"
            :full-match="fullMatchData"
        />
    </div>
</template>

<script setup lang="ts">
import type { IMatchLessDetails } from '~/features/matches/types/IMatchLessDetails'
import type { IMatchFullDetails } from '~/features/matches/types/IMatchFullDetails'
import type { IMatchEstimation } from '~/features/matches/types/MatchEstimationsModels'
import MatchState from '~/features/matches/types/MatchState'

const props = withDefaults(defineProps<{
    match: IMatchLessDetails
    champId: number
    tone?: 'dark' | 'light'
    fullMatch?: IMatchFullDetails | null
}>(), {
    tone: 'dark',
    fullMatch: null,
})

const { $api } = useNuxtApp()
const userStore = useUserStore()

const isLoginFormOpened = ref(false)
const isEstimationFormOpened = ref(false)
const isSubmittedOpen = ref(false)
const openFormAfterLogin = ref(false)
const fetchedFullMatch = ref<IMatchFullDetails | null>(null)
const estimationStatus = ref<'available' | 'submitted' | 'closed' | null>(null)
const estimationScore = ref<number | null>(null)
const submittedEstimation = ref<IMatchEstimation | null>(null)

const { data: estimationData, getData: getUserEstimation } = $api.estimation.useGetByIds()

const fullMatchData = computed(() => props.fullMatch ?? fetchedFullMatch.value)

const isWindowOpen = computed(() => {
    if (!props.match.start_estimations || !props.match.end_estimations) return false
    const start = new Date(props.match.start_estimations)
    const end = new Date(props.match.end_estimations)
    const now = new Date()
    return now >= start && now <= end
})

const shouldShow = computed(() => {
    if (!props.match.start_estimations || !props.match.end_estimations) return false
    if (!userStore.isAuthenticated) return isWindowOpen.value
    if (estimationStatus.value === null) return isWindowOpen.value
    if (estimationStatus.value === 'submitted') return true
    if (estimationStatus.value === 'available') return true
    return false
})

const isMatchEnded = computed(() =>
    String(props.match.state) === MatchState.Done
    || String(fullMatchData.value?.state) === MatchState.Done,
)

const submittedLabel = computed(() => {
    if (isMatchEnded.value && estimationScore.value !== null) {
        return `نقاطك: ${estimationScore.value}/10`
    }
    return 'تم التوقع'
})

async function checkEstimationStatus() {
    if (!userStore.isAuthenticated) {
        estimationStatus.value = null
        estimationScore.value = null
        submittedEstimation.value = null
        return
    }

    try {
        await getUserEstimation(props.match.id)
        const total = estimationData.value?.total ?? 0
        const item = estimationData.value?.items[0] ?? null

        if (total > 0 && item) {
            estimationStatus.value = 'submitted'
            estimationScore.value = item.estimation_score ?? null
            submittedEstimation.value = item
            return
        }

        estimationScore.value = null
        submittedEstimation.value = null
        estimationStatus.value = isWindowOpen.value ? 'available' : 'closed'
    }
    catch (error) {
        console.error('Error checking estimation status:', error)
        estimationStatus.value = 'closed'
        estimationScore.value = null
        submittedEstimation.value = null
    }
}

async function fetchFullMatchData() {
    if (props.fullMatch || fetchedFullMatch.value) return
    try {
        fetchedFullMatch.value = await $api.matches.fetchById(props.match.id.toString())
    }
    catch (error) {
        console.error('Error fetching full match data:', error)
    }
}

function openLoginForm() {
    openFormAfterLogin.value = true
    isLoginFormOpened.value = true
}

async function openEstimationForm() {
    if (!fullMatchData.value) {
        await fetchFullMatchData()
    }
    if (fullMatchData.value) {
        isEstimationFormOpened.value = true
    }
}

async function openSubmittedDetails() {
    if (!fullMatchData.value) {
        await fetchFullMatchData()
    }
    isSubmittedOpen.value = true
}

function handleEstimationSubmitted() {
    checkEstimationStatus()
}

onMounted(() => {
    checkEstimationStatus()
})

watch(() => userStore.isAuthenticated, async (authenticated) => {
    if (!authenticated) {
        openFormAfterLogin.value = false
        estimationStatus.value = null
        estimationScore.value = null
        submittedEstimation.value = null
        return
    }

    await checkEstimationStatus()

    if (openFormAfterLogin.value && estimationStatus.value === 'available') {
        openFormAfterLogin.value = false
        await openEstimationForm()
    }
})

watch(() => props.match.id, () => {
    fetchedFullMatch.value = null
    checkEstimationStatus()
})
</script>
