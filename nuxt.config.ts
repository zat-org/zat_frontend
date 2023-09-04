
// https://nuxt.com/docs/api/configuration/nuxt-config
const Title = "سام لبطولات البلوت الاحترافية"
const Description = "أوساسيونا مكان صنَّاع المحتوى، والمكان الذي يُمكِّنك من الانطلاقة للعالم الذي تريده."
const Keywords = "سام , زات , بلوت , ورقة , لعب"
const LogoURL = "https://firebasestorage.googleapis.com/v0/b/players-photos.appspot.com/o/channelsLogos%2Fsam.webp?alt=media&token=87b2bf1f-9115-463e-86d7-ec4206488d69"
const WebsiteUrl = "https://osasyona.com/"

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', "@nuxt/content", 'nuxt-icon', '@nuxtjs/strapi', '@nuxt/image', '@tailvue/nuxt', "@nuxtjs/color-mode"],
  content: {
    markdown: {
      anchorLinks: false,
    }
  },
  nitro: {
    compressPublicAssets: true,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ar',
        dir: "rtl"
      },
      title: Title,
      meta: [{ hid: 'description', name: 'description', content: Description }
        , { hid: 'keywords', name: 'keywords', content: Keywords }
        , { name: 'og:title', content: Title }
        , { name: 'og:description', content: Description }
        , { name: 'og:image', content: LogoURL }
        , { name: 'og:url', content: WebsiteUrl }
        , { "name": "viewport", "content": "width=device-width, initial-scale=1" }
        , { "charset": "utf-8" }],
      noscript: [{
        children: `
          <p style='text-align: center;color:white ; background-color:rgb(218, 55, 55); margin:5px 10px; padding: 10px 5px ;  border-radius:10px '>Warning: Please Enable Js</p>
        ` }],
    }
  },
  colorMode: {
    classSuffix: ''
  },
  runtimeConfig: {
    public: {
      apiLink: process.env.API_LINK
    }
  }
})
