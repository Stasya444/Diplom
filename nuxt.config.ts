import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@nuxt/fonts",
    "@nuxt/scripts",
    "@nuxt/ui",
    "nuxt-icon",
  ],

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },
  pinia: {
      storesDirs: ['./stores/**'],
    },
  components: [
    {
      path: "~/assets/pages/components",
      pathPrefix: false,
    },
  ],

  nitro: {
    publicAssets: [{ dir: "public" }],
  },
});
