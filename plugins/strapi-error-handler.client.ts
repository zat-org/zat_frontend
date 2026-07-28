export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('strapi:error', (error: { error?: { status?: number }, statusCode?: number }) => {
    const status = error?.error?.status ?? error?.statusCode
    if (status === 401 && import.meta.client) {
      useUserStore().logoutUser()
    }
  })
})
