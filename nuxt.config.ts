// https://nuxt.com/docs/api/configuration/nuxt-config
const Title = "زات لبطولات البلوت الاحترافية"
const Description = `قناة متخصصة ببث وتنظيم بطولات البلوت في المملكة العربية السعودية 
تهدف إلى نشر محتوى لعبة البلوت بشكل واسع في جميع أنحاء الوطن العربي ورفع التنافسية الى مستوى جديد في
                    عالم اللعبة الشهيرة، تضم القناة عدد من اللاعبين المحترفين الذين يتنافسون لحصد الجوائز والألقاب الموسمية
                    على مدار السنة وقد بلغ عدد الجوائز حتى الآن ما يتجاوز 200,000 ريال سعودي.
`
const Keywords = "زات , سام , بلوت , ورقة , لعب , اوساسيونا , الادهم , طويق , دوري , الحزام , كاس , سوبر , اوراق , zat , baloot , sam , calculator"
const LogoURL = "https://storage.googleapis.com/qydha_bucket/zatbaloot_assets/zat.jpg"
const WebsiteUrl = "https://zatbaloot.com/"

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      youtubeApi: process.env.YOUTUBE_API_KEY,
      apiBaseUrl: process.env.STRAPI_URL
    }
  },
  modules: [
    '@nuxt/ui',
    '@samk-dev/nuxt-vcalendar',
    "@nuxt/content",
    'nuxt-icon',
    "@nuxt/image",
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
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
      meta: [
         { name: 'image' , property : 'og:image', content: LogoURL }
         , { name: 'og:title', content: Title }
         , { name: 'og:description', content: Description }
         , { name: 'og:image', content: LogoURL }
         , { name: 'og:url', content: WebsiteUrl }
         , { name: 'author', content: "Zat Compony" }
         , { hid: 'description', name: 'description', content: Description }
        , { hid: 'keywords', name: 'keywords', content: Keywords }
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
  devtools: {
    enabled: false
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return tag.startsWith("swiper-")
      }
    }
  }

})