// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', "@nuxt/content", 'nuxt-icon','@nuxtjs/strapi'],
  content: {
    markdown: {
      anchorLinks: false,
    }
    // https://content.nuxtjs.org/api/configuration
  },
  runtimeConfig: {
    public: {
      apiLink: process.env.API_LINK
    }
  }
})
