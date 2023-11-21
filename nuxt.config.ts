// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['nuxt-primevue', '@nuxtjs/tailwindcss'],
  css: ['primevue/resources/themes/md-dark-deeppurple/theme.css', 'primeicons/primeicons.css'],
  primevue: {
    usePrimeVue: true,
    options: {},
    importPT: undefined,
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    components: {
      prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined
    },
    directives: {
      prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined
    },
    composables: {
      prefix: '',
      name: undefined,
      include: undefined,
      exclude: undefined
    }
  }
})
