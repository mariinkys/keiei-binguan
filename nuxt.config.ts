// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['nuxt-primevue', '@nuxtjs/tailwindcss'],
  css: ['primevue/resources/themes/md-dark-deeppurple/theme.css', 'primeicons/primeicons.css'],
  primevue: {
    usePrimeVue: true,
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities'
  }
})
