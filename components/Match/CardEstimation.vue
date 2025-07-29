<template>
    <div class="flex justify-center">
        <!-- If user is authenticated -->
        <template v-if="userStore.isAuthenticated">
            <!-- Loading state -->
            <template v-if="estimationStatus === null">
                <UButton size="sm" disabled 
                    class="bg-white/20 border-white/30 text-white backdrop-blur-sm px-4 py-2">
                    <UIcon name="i-heroicons-arrow-path" class="animate-spin me-1" />
                    جاري التحميل...
                </UButton>
            </template>

            <!-- No estimation submitted and match is open -->
            <template v-else-if="estimationStatus === 'available'">
                <UButton @click="openEstimationForm" size="sm"
                    class="bg-white/90 hover:bg-white text-orange-600 font-semibold shadow-sm px-4 py-2">
                    <UIcon name="i-heroicons-chart-bar" class="me-1" />
                    توقع النتيجة
                </UButton>
            </template>

            <!-- Estimation already submitted -->
            <template v-else-if="estimationStatus === 'submitted'">
                <UButton size="sm" disabled 
                    class="bg-green-600/90 text-white px-4 py-2">
                    <UIcon name="i-heroicons-check-circle" class="me-1" />
                    <span v-if="estimationScore">
                        نقاطك: {{ estimationScore }}/10
                    </span>
                    <span v-else>
                        تم التوقع
                    </span>
                </UButton>
            </template>

            <!-- Match not open for estimations -->
            <template v-else>
                <UButton size="sm" disabled 
                    class="bg-gray-500/70 text-white px-4 py-2">
                    <UIcon name="i-heroicons-clock" class="me-1" />
                    التوقع غير متاح
                </UButton>
            </template>
        </template>

        <!-- If user is not authenticated -->
        <template v-else>
            <UButton @click="openLoginForm" size="sm"
                class="bg-white/90 hover:bg-white text-orange-600 font-semibold shadow-sm px-4 py-2">
                <UIcon name="i-heroicons-user-circle" class="me-1" />
                سجل دخول وتوقع
            </UButton>
        </template>

        <!-- Login Form Modal -->
        <LoginForm v-model="isLoginFormOpened" />

        <!-- Estimation Form Modal (only when we have full match data) -->
        <MatchEstimationForm v-if="fullMatchData" 
            :match="fullMatchData" 
            v-model="isEstimationFormOpened"
            @estimationSubmitted="handleEstimationSubmitted" />
    </div>
</template>

<script setup lang="ts">
import type { IMatchLessDetails } from "@/Models/IMatchLessDetails"
import type { IMatchFullDetails } from "@/Models/IMatchFullDetails"

const props = defineProps<{
    match: IMatchLessDetails,
    champId: number
}>()

const { $api } = useNuxtApp()
const userStore = useUserStore()

// State
const isLoginFormOpened = ref(false)
const isEstimationFormOpened = ref(false)
const fullMatchData = ref<IMatchFullDetails | null>(null)
const estimationStatus = ref<'available' | 'submitted' | 'closed' | null>(null)
const estimationScore = ref<number | null>(null)

// API calls
const { data: estimationData, error: estimationError, getData: getUserEstimation } = $api.estimation.useGetByIds()

// Computed
const userSubmittedEstimationCount = computed(() => {
    if (estimationData.value) {
        return estimationData.value.meta.pagination.total
    }
    return null
})

// Check if match is open for estimations
const isMatchOpenForEstimations = (matchData: IMatchFullDetails | null) => {
    if (!matchData?.startEstimationAt || !matchData?.endEstimationAt) return false
    const start = new Date(matchData.startEstimationAt)
    const end = new Date(matchData.endEstimationAt)
    const now = new Date()
    return now >= start && now <= end
}

// Check estimation status
const checkEstimationStatus = async () => {
    if (!userStore.isAuthenticated) return
    
    try {
        await getUserEstimation(props.match.id)
        
        if (userSubmittedEstimationCount.value !== null) {
            if (userSubmittedEstimationCount.value > 0) {
                estimationStatus.value = 'submitted'
                // Get the score if available
                if (estimationData.value?.data[0]?.attributes.estimation_score) {
                    estimationScore.value = estimationData.value.data[0].attributes.estimation_score
                }
            } else {
                // Check if match is open for estimations
                // We need full match data to check timing accurately
                if (fullMatchData.value) {
                    estimationStatus.value = isMatchOpenForEstimations(fullMatchData.value) ? 'available' : 'closed'
                } else {
                    // If we don't have full data yet, assume it might be available
                    estimationStatus.value = 'available'
                }
            }
        }
    } catch (error) {
        console.error('Error checking estimation status:', error)
        estimationStatus.value = 'closed'
    }
}

// Fetch full match data when needed
const fetchFullMatchData = async () => {
    try {
        const { data: matchData } = await $api.matches.getById(props.match.id.toString())
        if (matchData.value) {
            fullMatchData.value = matchData.value
        }
    } catch (error) {
        console.error('Error fetching full match data:', error)
    }
}

// Event handlers
const openLoginForm = () => {
    isLoginFormOpened.value = true
}

const openEstimationForm = async () => {
    await fetchFullMatchData()
    if (fullMatchData.value) {
        isEstimationFormOpened.value = true
    }
}

const handleEstimationSubmitted = () => {
    checkEstimationStatus()
}

// Lifecycle
onMounted(() => {
    checkEstimationStatus()
})

// Watch for auth changes
watch(() => userStore.user, () => {
    checkEstimationStatus()
})
</script>

<style scoped></style> 