<template>
  <div
    style="
      position: relative;
      width: 100%;
      min-height: 100vh;
      background: #080808;
      overflow: hidden;
    "
  >
    <!-- Foto do casal -->
    <div
      ref="bgPhoto"
      style="position: fixed; inset: 0; z-index: 1; overflow: hidden;"
    >
      <img
        src="/images/couple.jpeg"
        alt=""
        aria-hidden="true"
        style="
          display: block; width: 100%; height: 115%;
          object-fit: cover; object-position: 40% top;
          transform: translateY(-15%);
          filter: brightness(0.5) saturate(0.7);
          -webkit-mask-image: linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.5) 65%, transparent 88%);
          mask-image: linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.5) 65%, transparent 88%);
        "
      />
    </div>

    <!-- Partículas douradas -->
    <ParticlesBackground />

    <!-- Cadeado (Cena 2) -->
    <div
      ref="lockEl"
      style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <!-- Cadeado fechado -->
      <svg
        v-if="!lockOpen"
        width="48" height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C9A96E"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>

      <!-- Cadeado aberto -->
      <svg
        v-else
        width="48" height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C9A96E"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    </div>

    <!-- Frases (Cenas 3–6) -->
    <div
      ref="phraseEl"
      style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        opacity: 0;
        width: 100%;
        max-width: 480px;
        padding: 0 40px;
        text-align: center;
      "
    >
      <p
        style="
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.4rem, 4vw, 2rem);
          font-weight: 400;
          line-height: 1.5;
          color: #F0EBE0;
          letter-spacing: 0.01em;
        "
      >
        {{ currentPhrase }}
      </p>
    </div>

    <!-- Convite para rolar (Cena 7) -->
    <div
      ref="scrollEl"
      style="
        position: fixed;
        bottom: 10vh;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        opacity: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      "
    >
      <span
        style="
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          letter-spacing: 0.12em;
          color: #7A7168;
          text-transform: uppercase;
        "
      >
        Role para começar
      </span>
      <div
        ref="arrowEl"
        style="
          color: #C9A96E;
          font-size: 1.2rem;
          opacity: 0.7;
        "
      >
        ↓
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

definePageMeta({ ssr: false })
defineOptions({ name: 'IntroPage' })

const router = useRouter()

const bgPhoto   = ref<HTMLElement | null>(null)
const lockEl    = ref<HTMLElement | null>(null)
const phraseEl  = ref<HTMLElement | null>(null)
const scrollEl  = ref<HTMLElement | null>(null)
const arrowEl   = ref<HTMLElement | null>(null)

const lockOpen      = ref(false)
const currentPhrase = ref('')

const phrases = [
  'Nem tudo aconteceu do jeito que imaginávamos.',
  'Mas cada passo nos trouxe até aqui.',
  'E o melhor...',
  'Ainda temos muito para viver.',
]

async function showPhrase(text: string, inDuration: number, hold: number, outDuration: number) {
  currentPhrase.value = text
  await gsap.to(phraseEl.value, { opacity: 1, duration: inDuration, ease: 'power2.out' })
  await new Promise(resolve => setTimeout(resolve, hold * 1000))
  await gsap.to(phraseEl.value, { opacity: 0, duration: outDuration, ease: 'power2.in' })
}

let scrollHandler: (() => void) | null = null

onMounted(async () => {
  if (!sessionStorage.getItem('granted')) {
    router.push('/')
    return
  }

  // ── Cena 2: cadeado sobe para o centro ─────────────────────────
  gsap.set(lockEl.value, { y: '35vh', opacity: 0 })

  gsap.to(bgPhoto.value, {
    opacity: 0,
    duration: 2,
    ease: 'power2.inOut',
    delay: 0.3,
  })

  await gsap.to(lockEl.value, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.3,
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  // Cadeado abre
  lockOpen.value = true
  await gsap.fromTo(lockEl.value,
    { scale: 1 },
    { scale: 1.15, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 }
  )

  await new Promise(resolve => setTimeout(resolve, 800))

  // Cadeado some
  await gsap.to(lockEl.value, { opacity: 0, scale: 0.8, duration: 0.6, ease: 'power2.in' })

  // ── Cenas 3–6: frases ──────────────────────────────────────────
  await showPhrase(phrases[0], 1, 3.5, 0.5)
  await showPhrase(phrases[1], 1, 3.5, 0.5)
  await showPhrase(phrases[2], 0.8, 1.7, 0.5)
  await showPhrase(phrases[3], 1, 4, 1)

  // ── Cena 7: convite para rolar ─────────────────────────────────
  await gsap.to(scrollEl.value, { opacity: 1, duration: 1, ease: 'power2.out' })

  gsap.to(arrowEl.value, {
    y: 6,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  scrollHandler = () => {
    if (scrollHandler) {
      window.removeEventListener('wheel', scrollHandler)
      window.removeEventListener('touchmove', scrollHandler)
    }
    gsap.to(scrollEl.value, { opacity: 0, duration: 0.5 })
    router.push('/nossa-historia')
  }

  window.addEventListener('wheel', scrollHandler, { once: true })
  window.addEventListener('touchmove', scrollHandler, { once: true })
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('wheel', scrollHandler)
    window.removeEventListener('touchmove', scrollHandler)
  }
})
</script>
