<template>
    <FetchDataWrapper
        class="w-full"
        :error="getPlayerError ? 'تعذر تحميل بيانات اللاعب.' : null"
        :pending="getPlayerPending"
    >
        <template v-if="player">
            <div class="flex w-full flex-col bg-surface-base">
                <TeamPageHeader
                    :team-name="currentTeamName"
                    :team-id="currentTeamId"
                    :player-name="player.player_name"
                />

                <section
                    class="w-full bg-poker-pattern bg-surface-off-base py-6"
                    aria-label="الملف الشخصي للاعب"
                    dir="rtl"
                >
                    <div class="page-container flex justify-center">
                        <div class="relative w-full max-w-[736px] overflow-hidden bg-surface-raised px-4 pb-6 shadow-zat sm:px-6">
                            <div
                                class="pointer-events-none absolute inset-0 text-surface-off-base"
                                aria-hidden="true"
                            >
                                <div
                                    class="absolute start-5 top-0 h-[157px] w-[88px] sm:start-20 [&>svg]:size-full"
                                    v-html="sideDecor"
                                />
                                <div
                                    class="absolute end-5 top-0 h-[157px] w-[88px] sm:end-20 [&>svg]:size-full"
                                    v-html="sideDecor"
                                />
                                <div
                                    class="absolute left-1/2 top-[221px] h-[257px] w-[min(576px,calc(100%-2.5rem))] -translate-x-1/2"
                                    :style="wreathDecorMaskStyle"
                                />
                            </div>

                            <div class="relative z-10 flex flex-col items-center gap-6">
                                <div class="relative mx-auto h-[430px] w-[272px] shrink-0">
                                    <img
                                        :src="playerBadge"
                                        alt=""
                                        class="pointer-events-none absolute inset-0 size-full object-fill [filter:drop-shadow(0_4px_32px_rgba(22,19,19,0.25))]"
                                        aria-hidden="true"
                                    >

                                    <component
                                        :is="currentTeamId ? NuxtLink : 'div'"
                                        :to="currentTeamId ? `/teams/${currentTeamId}` : undefined"
                                        class="absolute left-1/2 top-4 z-10 flex size-14 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full bg-surface-tone p-1 shadow-zat"
                                        :aria-label="currentTeamName ? `فريق ${currentTeamName}` : 'لاعب حر'"
                                    >
                                        <Image
                                            v-if="currentTeamLogo"
                                            :src="toMediaUrl(currentTeamLogo)"
                                            :alt="currentTeamName || 'شعار الفريق'"
                                            icon="i-heroicons-user-group"
                                            class="size-12 object-contain"
                                        />
                                        <span
                                            v-else
                                            class="flex flex-col items-center justify-center text-center font-zaatar text-[11px] leading-none text-text-body"
                                        >
                                            <span>لاعب</span>
                                            <span>حر</span>
                                        </span>
                                    </component>

                                    <div class="absolute inset-x-0 top-20 z-10 flex h-[272px] flex-col items-center">
                                        <div
                                            class="size-[216px] overflow-hidden rounded-zat-md bg-surface-secondary bg-contain bg-center bg-no-repeat shadow-zat"
                                            :style="{ backgroundImage: `url(${playerBadge})` }"
                                        >
                                            <Image
                                                :src="toMediaUrl(player.player_image)"
                                                :alt="player.player_name"
                                                icon="i-heroicons-user"
                                                class="size-full object-cover object-top"
                                            />
                                        </div>
                                        <h1
                                            ref="playerNameEl"
                                            class="mx-auto w-4/5 whitespace-nowrap text-center font-bold leading-tight text-white"
                                            :style="{ fontSize: `${playerNameSize}px` }"
                                        >
                                            {{ player.player_name }}
                                        </h1>
                                    </div>

                                    <p class="absolute inset-x-0 top-[352px] z-10 text-center text-base font-semibold leading-7 text-white">
                                        {{ currentTeamName || 'لاعب حر' }}
                                    </p>
                                </div>

                                <template v-if="socialMediaAccounts.length">
                                    <ChampionshipsSectionDivider :title="`تابع “${player.player_name}”`" />

                                    <div class="flex flex-wrap items-center justify-center gap-3">
                                        <NuxtLink
                                            v-for="account in socialMediaAccounts"
                                            :key="account.href"
                                            :to="account.href"
                                            target="_blank"
                                            external
                                            class="flex size-10 items-center justify-center rounded-lg bg-zat-50 text-zat-500 transition-transform duration-300 hover:-translate-y-1 hover:bg-zat-500 hover:text-white"
                                            :aria-label="account.label"
                                        >
                                            <UIcon
                                                :name="account.iconName"
                                                class="size-5"
                                            />
                                        </NuxtLink>
                                    </div>
                                </template>

                                <ChampionshipsSectionDivider title="الانتقالات" />

                                <TeamTransferList
                                    class="w-full"
                                    :transfers="player.transfers ?? []"
                                    :current-team-name="currentTeamName"
                                    title="انتقالات الاعب"
                                    :show-details="false"
                                >
                                    <template #noTransText>
                                        لم يجري اللاعب اي انتقالات حتي الان
                                    </template>
                                </TeamTransferList>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </template>

        <div
            v-else-if="!getPlayerPending"
            class="flex flex-col items-center justify-center py-16"
        >
            <UIcon
                name="i-heroicons-x-circle"
                class="mb-3 size-20 text-text-caption"
            />
            <h4 class="text-center text-lg text-text-body">
                هذا اللاعب غير موجود
            </h4>
            <UButton
                to="/teams"
                class="mt-5"
                icon="i-heroicons-user-group"
            >
                فرق زات
            </UButton>
        </div>
    </FetchDataWrapper>
</template>

<script setup lang="ts">
import playerBadge from '~/assets/images/players/player-badge.svg'
import heroDecor from '~/assets/images/players/hero-decor.svg'
import sideDecor from '~/assets/images/players/decor-side.svg?raw'

const NuxtLink = resolveComponent('NuxtLink')
const { $api } = useNuxtApp()
const route = useRoute()
const toMediaUrl = useMediaUrl()

const { error: getPlayerError, pending: getPlayerPending, data } = await $api.players.getById(route.params.id as string)
const player = computed(() => data.value?.data)

const latestTransfer = computed(() => {
    const transfers = player.value?.transfers ?? []
    if (!transfers.length) {
        return undefined
    }
    return [...transfers].sort((a, b) =>
        new Date(b.transfered_at).getTime() - new Date(a.transfered_at).getTime(),
    )[0]
})

const currentTeamName = computed(() =>
    player.value?.team_name?.trim()
    || latestTransfer.value?.to_team_name?.trim()
    || undefined,
)

const currentTeamLogo = computed(() =>
    player.value?.team_logo?.trim()
    || latestTransfer.value?.to_team_logo?.trim()
    || undefined,
)

const currentTeamId = computed(() => {
    const id = player.value?.team_id
    return id ? id : undefined
})

const maskStyle = (src: string) => ({
    backgroundColor: 'currentColor',
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
})

const wreathDecorMaskStyle = maskStyle(heroDecor)

const NAME_MAX_SIZE = 32
const NAME_MIN_SIZE = 12
const playerNameEl = ref<HTMLElement | null>(null)
const playerNameSize = ref(NAME_MAX_SIZE)

async function fitPlayerName() {
    const el = playerNameEl.value
    if (!el) {
        return
    }
    playerNameSize.value = NAME_MAX_SIZE
    await nextTick()
    const ratio = el.clientWidth / el.scrollWidth
    if (ratio < 1) {
        playerNameSize.value = Math.max(NAME_MIN_SIZE, Math.floor(NAME_MAX_SIZE * ratio))
    }
}

useResizeObserver(playerNameEl, () => {
    fitPlayerName()
})

watch(() => player.value?.player_name, () => {
    nextTick(fitPlayerName)
}, { immediate: true })

useHead({
    title: computed(() => player.value?.player_name ? `لاعبي زات - ${player.value.player_name}` : 'لاعبي زات'),
    meta: computed(() => [
        {
            name: 'description',
            content: player.value?.player_name
                ? `الصفحة الشخصية للاعب ${player.value.player_name}. تعرف على مسيرته، انتقالاته، وتابع حساباته على مواقع التواصل الاجتماعي.`
                : 'لاعبو زات - تعرف على نجوم البلوت في المملكة',
        },
        {
            property: 'og:title',
            content: player.value?.player_name ? `لاعبي زات - ${player.value.player_name}` : 'لاعبي زات',
        },
        {
            property: 'og:description',
            content: player.value?.player_name
                ? `الصفحة الشخصية للاعب ${player.value.player_name}. تعرف على مسيرته، انتقالاته، وتابع حساباته على مواقع التواصل الاجتماعي.`
                : 'لاعبو زات - تعرف على نجوم البلوت في المملكة',
        },
        {
            property: 'og:image',
            content: player.value?.player_image ? toMediaUrl(player.value.player_image) : undefined,
        },
    ]),
})

const socialMediaAccounts = computed(() => {
    const accounts: { href: string, iconName: string, label: string }[] = []
    if (!player.value) {
        return accounts
    }
    if (player.value.tiktok_link) {
        accounts.push({ iconName: 'streamline:tiktok-solid', href: player.value.tiktok_link, label: 'تيك توك' })
    }
    if (player.value.youtube_link) {
        accounts.push({ iconName: 'zat:youtube', href: player.value.youtube_link, label: 'يوتيوب' })
    }
    if (player.value.twitter_link) {
        accounts.push({ iconName: 'ri:twitter-x-fill', href: player.value.twitter_link, label: 'إكس' })
    }
    if (player.value.snap_link) {
        accounts.push({ iconName: 'simple-icons:snapchat', href: player.value.snap_link, label: 'سناب شات' })
    }
    return accounts
})
</script>
