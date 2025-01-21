// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/tailwind.css"],
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  serverHandlers: [
    { route: '/api', middleware: true, handler: '~/server/middleware/db.js' },
    { route: '/api', middleware: true, handler: '~/server/api/index.js' },
  ],

})