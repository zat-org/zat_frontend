/**
 * Keeps @nuxtjs/strapi token/user in sync with Pinia (custom OTP auth flow).
 */
import type { StrapiUser } from '@nuxtjs/strapi'
export default defineNuxtPlugin(() => {
  const userStore = useUserStore()
  const strapiToken = useStrapiToken()
  const strapiUser = useStrapiUser()

  watch(
    () => userStore.jwtToken,
    (jwt) => {
      strapiToken.value = jwt
    },
    { immediate: true },
  )

  watch(
    () => userStore.user,
    (user) => {
      strapiUser.value = user as StrapiUser
    },
    { immediate: true },
  )
})
