<template>
  <section
    id="section-hero"
    data-section="hero"
    class="section-base relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-night"
  >
    <!-- Orb decorativo -->
    <div
      aria-hidden="true"
      class="hero-orb pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div class="w-[700px] h-[700px] rounded-full opacity-10 blur-[140px]"
           style="background: radial-gradient(circle, #db2777 0%, #500724 50%, transparent 70%)" />
    </div>

    <!-- Linha decorativa -->
    <div
      ref="lineRef"
      aria-hidden="true"
      class="hero-line absolute top-1/2 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-rose-700 to-transparent opacity-30"
      style="height: 40vh"
    />

    <div ref="contentRef" class="relative z-10 text-center px-6 max-w-2xl mx-auto">
      <!-- Eyebrow -->
      <p
        ref="eyebrowRef"
        data-gsap="fade-up"
        class="hero-eyebrow text-xs uppercase tracking-[0.35em] text-rose-400 mb-6 opacity-0"
      >
        O começo de tudo
      </p>

      <!-- Título principal -->
      <h1
        ref="titleRef"
        data-gsap="fade-up"
        class="hero-title font-serif text-5xl md:text-7xl font-semibold text-blush-text mb-6 opacity-0 leading-[1.1]"
      >
        Nossa<br />
        <em class="italic text-gradient-rose not-italic">História</em>
      </h1>

      <!-- Subtítulo -->
      <p
        ref="subtitleRef"
        data-gsap="fade-up"
        class="hero-subtitle text-base md:text-lg text-blush-muted max-w-md mx-auto leading-relaxed opacity-0"
      >
        Cada momento que vivemos juntos, guardado aqui com todo o amor do mundo.
      </p>

      <!-- Indicador de scroll -->
      <div
        ref="scrollIndicatorRef"
        data-gsap="fade-up"
        class="hero-scroll mt-16 flex flex-col items-center gap-2 opacity-0"
        aria-label="Role para baixo"
      >
        <span class="text-xs text-blush-muted tracking-widest uppercase">Continue</span>
        <div class="w-px h-12 bg-gradient-to-b from-rose-700 to-transparent animate-pulse-slow" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

defineOptions({ name: 'HeroSection' })

const lineRef            = ref<HTMLElement | null>(null)
const contentRef         = ref<HTMLElement | null>(null)
const eyebrowRef         = ref<HTMLElement | null>(null)
const titleRef           = ref<HTMLElement | null>(null)
const subtitleRef        = ref<HTMLElement | null>(null)
const scrollIndicatorRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'power3.out' } })

  tl.fromTo(
    lineRef.value,
    { scaleY: 0, transformOrigin: 'top' },
    { scaleY: 1, duration: 1.2, ease: 'power2.inOut' },
  )
  .fromTo(
    eyebrowRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.5',
  )
  .fromTo(
    titleRef.value,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1 },
    '-=0.4',
  )
  .fromTo(
    subtitleRef.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.5',
  )
  .fromTo(
    scrollIndicatorRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.6 },
    '-=0.2',
  )

  // Orb pulsante
  gsap.to('.hero-orb > div', {
    scale: 1.15,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
})
</script>
