<template>
  <section
    id="section-hero"
    data-section="hero"
    class="section-base relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    style="background: transparent;"
  >
    <!-- Partículas -->
    <ParticlesBackground id="hero-particles" />

    <!-- Orb decorativo — calor suave no centro -->
    <div
      aria-hidden="true"
      class="hero-orb pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div
        class="w-[600px] h-[600px] rounded-full blur-[180px]"
        style="background: radial-gradient(circle, rgba(226,232,240,0.08) 0%, rgba(226,232,240,0.04) 50%, transparent 70%)"
      />
    </div>


    <div class="relative z-10 text-left px-6 max-w-2xl w-full ml-6 md:ml-12 -mt-24">
      <!-- Título principal -->
      <h1
        ref="titleRef"
        data-gsap="fade-up"
        class="hero-title font-serif text-[3.45rem] md:text-[5.175rem] font-semibold text-ink mb-6 opacity-0 leading-none"
      >
        Darlan &amp;<br />
        <em class="not-italic text-ink">Amanda</em>
      </h1>
    </div>

    <!-- Subtítulo fixo perto do rodapé -->
    <p
      ref="subtitleRef"
      data-gsap="fade-up"
      class="hero-subtitle absolute bottom-[7.5rem] left-10 right-10 text-base md:text-lg text-ink-light leading-relaxed"
    >
      Eii você... Bolei isso com muito amor, muito carinho, pra recordar tudo o que vivemos e nos fez chegar até aqui. Tá preparada?
    </p>

    <!-- Swipe hint -->
    <Transition name="hint-fade">
      <div
        v-if="showSwipeHint"
        ref="swipeHintRef"
        class="absolute bottom-8 left-1/2 -translate-x-1/2"
        style="display: flex; flex-direction: column; gap: 12px; pointer-events: none; align-items: center;"
      >
        <div style="display: flex; align-items: center; gap: 8px;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 11V6a2 2 0 1 1 4 0v5" stroke="#F0EBE0" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M13 10V8a2 2 0 1 1 4 0v4" stroke="#F0EBE0" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M9 11a2 2 0 0 0-2 2v1l.5 4A4 4 0 0 0 11.4 21h1.2a4 4 0 0 0 3.9-3l.5-4V8" stroke="#F0EBE0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 11V9a2 2 0 0 0-2 0v2" stroke="#F0EBE0" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="rgba(201,169,110,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span style="
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7A7168;
        ">deslize para continuar</span>
      </div>
    </Transition>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

defineOptions({ name: 'HeroSection' })

const props = defineProps<{ showSwipeHint?: boolean }>()

const titleRef     = ref<HTMLElement | null>(null)
const subtitleRef  = ref<HTMLElement | null>(null)
const swipeHintRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'power3.out' } })

  tl.fromTo(
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

  gsap.to('.hero-orb > div', {
    scale: 1.15,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  if (swipeHintRef.value) {
    gsap.to(swipeHintRef.value, {
      x: 12,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1,
    })
  }
})
</script>

<style scoped>
.hint-fade-leave-active { transition: opacity 0.4s ease; }
.hint-fade-leave-to     { opacity: 0; }
</style>
