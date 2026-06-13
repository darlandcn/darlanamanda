// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Nossa História',
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Uma viagem por tudo o que vivemos até aqui.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Caveat:wght@400&family=Inter:wght@300;400;500;600&display=swap' },
        { rel: 'preconnect', href: 'https://fonts.cdnfonts.com' },
        { rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/pier-sans' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: '',
      supabaseProjectUrl: '',
      supabaseAnonKey: '',
    },
  },
  vite: {
    optimizeDeps: {
      include: ['gsap', 'lenis'],
    },
  },
})
