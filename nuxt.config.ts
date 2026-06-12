// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.cdnfonts.com' },
        { rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/pier-sans' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: '',
    },
  },
  vite: {
    optimizeDeps: {
      include: ['gsap', 'lenis'],
    },
  },
})
