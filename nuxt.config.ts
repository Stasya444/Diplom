import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: ["@nuxt/fonts", "@nuxt/scripts", "@nuxt/ui", "nuxt-icon"],

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  components: [
    {
      path: "~/assets/pages/components",
      pathPrefix: false,
    },
  ],

  nitro: {
    publicAssets: [{ dir: "public" }], // Щоб працювало завантаження фото
  },
});
