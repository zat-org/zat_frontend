export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== '/under-development') {
    return navigateTo('/under-development')
  }
})
