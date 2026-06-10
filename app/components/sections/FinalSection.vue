<template>
  <section
    id="section-final"
    data-section="final"
    class="section-base min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
    style="background: linear-gradient(180deg, #0A0108 0%, #0D0210 100%)"
  >
    <!-- Orbs finais -->
    <div
      aria-hidden="true"
      class="final-orb-left pointer-events-none absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
      style="background: radial-gradient(circle, #db2777, transparent); bottom: -10%; left: -15%"
    />
    <div
      aria-hidden="true"
      class="final-orb-right pointer-events-none absolute w-[400px] h-[400px] rounded-full opacity-12 blur-[100px]"
      style="background: radial-gradient(circle, #ca8a04, transparent); top: -5%; right: -10%"
    />

    <!-- Linha superior decorativa -->
    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-800 to-transparent opacity-40" />

    <div class="relative z-10 text-center max-w-2xl mx-auto px-6">
      <!-- Ícone de coração animado -->
      <div ref="heartRef" class="mb-10 flex justify-center" aria-hidden="true">
        <svg
          width="64" height="64"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="final-heart text-rose-600"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"
            fill="currentColor"
          />
        </svg>
      </div>

      <!-- Eyebrow -->
      <p ref="eyebrowRef" class="text-xs uppercase tracking-[0.35em] text-gold-500 mb-4">
        Para sempre
      </p>

      <!-- Título final -->
      <h2 ref="titleRef" class="font-serif text-4xl md:text-6xl text-blush-text mb-6 leading-tight">
        Essa história<br />
        <span class="italic text-gradient-rose">nunca termina</span>
      </h2>

      <!-- Mensagem final -->
      <p ref="messageRef" class="text-blush-muted leading-relaxed max-w-md mx-auto mb-10">
        Cada página que escrevemos juntos é mais bonita do que a anterior.
        Obrigado por ser parte da minha história — a mais bonita de todas.
      </p>

      <!-- Assinatura -->
      <div ref="signatureRef" class="space-y-4">
        <div class="flex items-center justify-center gap-4">
          <div class="flex-1 max-w-[80px] h-px bg-gradient-to-r from-transparent to-rose-700/50" />
          <p class="font-serif text-lg italic text-rose-300">Com todo o meu amor</p>
          <div class="flex-1 max-w-[80px] h-px bg-gradient-to-l from-transparent to-rose-700/50" />
        </div>
        <p class="font-serif text-2xl text-blush-text">— Para sempre seu ♡</p>
      </div>

      <!-- Partículas de coração decorativas -->
      <div
        ref="particlesRef"
        aria-hidden="true"
        class="mt-16 flex items-center justify-center gap-6 opacity-40"
      >
        <span
          v-for="i in 5"
          :key="i"
          class="final-particle inline-block text-rose-600"
          :style="{ fontSize: `${8 + i * 3}px`, opacity: 1 - i * 0.15 }"
        >♥</span>
      </div>
    </div>

    <!-- Footer minimalista -->
    <div
      ref="footerRef"
      class="absolute bottom-8 left-0 right-0 text-center"
    >
      <p class="text-xs text-blush-muted/30 tracking-widest">
        feito com amor ♡
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

defineOptions({ name: 'FinalSection' })

const heartRef     = ref<HTMLElement | null>(null)
const eyebrowRef   = ref<HTMLElement | null>(null)
const titleRef     = ref<HTMLElement | null>(null)
const messageRef   = ref<HTMLElement | null>(null)
const signatureRef = ref<HTMLElement | null>(null)
const particlesRef = ref<HTMLElement | null>(null)
const footerRef    = ref<HTMLElement | null>(null)

onMounted(() => {
  const trigger = { trigger: '#section-final', start: 'top 70%', toggleActions: 'play none none none' }

  const tl = gsap.timeline({ scrollTrigger: trigger })

  tl.fromTo(
    heartRef.value,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(2)' },
  )
  .fromTo(
    [eyebrowRef.value, titleRef.value, messageRef.value, signatureRef.value],
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
    '-=0.3',
  )
  .fromTo(
    particlesRef.value,
    { opacity: 0 },
    { opacity: 0.4, duration: 0.6 },
    '-=0.2',
  )

  // Pulsação contínua do coração
  gsap.to('.final-heart', {
    scale: 1.1,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 1.2,
  })

  // Orbs flutuantes
  gsap.to('.final-orb-left',  { y: -25, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  gsap.to('.final-orb-right', { y: 20,  duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 })

  // Partículas de coração
  gsap.to('.final-particle', {
    y: -10,
    duration: 2,
    stagger: 0.3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  gsap.fromTo(
    footerRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 1, delay: 1.5, ease: 'power2.out', scrollTrigger: trigger },
  )
})
</script>
