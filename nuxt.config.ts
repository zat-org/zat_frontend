// https://nuxt.com/docs/api/configuration/nuxt-config
const Title = "زات لبطولات البلوت الاحترافية";
const Description = `قناة متخصصة ببث وتنظيم بطولات البلوت في المملكة العربية السعودية 
تهدف إلى نشر محتوى لعبة البلوت بشكل واسع في جميع أنحاء الوطن العربي ورفع التنافسية الى مستوى جديد في
                    عالم اللعبة الشهيرة، تضم القناة عدد من اللاعبين المحترفين الذين يتنافسون لحصد الجوائز والألقاب الموسمية
                    على مدار السنة وقد بلغ عدد الجوائز حتى الآن ما يتجاوز 200,000 ريال سعودي.
`;
const Keywords =
  "زات , سام , بلوت , ورقة , لعب , اوساسيونا , الادهم , طويق , دوري , الحزام , كاس , سوبر , اوراق , zat , baloot , sam , calculator";
const LogoURL =
  "https://storage.googleapis.com/qydha_bucket/zatbaloot_assets/zat.jpg";
const WebsiteUrl = "https://zatbaloot.com/";

const strapiUrl = process.env.STRAPI_URL || "http://localhost:1337";
let strapiHostname = "localhost";
try {
  strapiHostname = new URL(strapiUrl).hostname;
} catch {
  /* keep default */
}

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css', '~/assets/css/styles.css'],
  runtimeConfig: {
    public: {
      youtubeApi: process.env.YOUTUBE_API_KEY,
      apiBaseUrl: process.env.STRAPI_URL,
      websiteUrl: WebsiteUrl || "http://localhost:3000",
      strapi: {
        url: process.env.STRAPI_URL || "http://localhost:1337",
      },
    },
  },
  modules: [
    "@nuxtjs/strapi",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "nuxt-swiper",
    "nuxt-schema-org",
    "motion-v/nuxt",
  ],
  strapi: {
    url: process.env.STRAPI_URL || "http://localhost:1337",
    prefix: "/api",
    version: "v4",
    cookie: {
      path: "/",
      maxAge: 14 * 24 * 60 * 60,
      sameSite: "strict",
    },
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage",
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  content: {
    markdown: {
      anchorLinks: false,
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      title: Title,
      meta: [
        { name: "image", property: "og:image", content: LogoURL },
        { name: "og:title", content: Title },
        { name: "og:description", content: Description },
        { name: "og:image", content: LogoURL },
        { name: "og:url", content: WebsiteUrl },
        { name: "author", content: "Zat Compony" },
        { key: "description", name: "description", content: Description },
        { key: "keywords", name: "keywords", content: Keywords },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
      noscript: [
        {
          innerHTML: `
          <p style='text-align: center;color:white ; background-color:rgb(218, 55, 55); margin:5px 10px; padding: 10px 5px ;  border-radius:10px '>Warning: Please Enable Js</p>
        `,
        },
      ],
    },
  },
  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
    storageKey: "zat-color-mode",
  },
  devtools: {
    enabled: false,
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => {
        return tag.startsWith("swiper-");
      },
    },
  },
  image: {
    domains: ["storage.googleapis.com", "picsum.photos", strapiHostname],
  },
  ui:{
    theme: {
      colors: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "neutral",
        "white", 
      ],
    }
  },
  icon: {
    customCollections: [
      {
        prefix: 'zat',
        dir: './assets/icons',
      },
    ],
  },
});
