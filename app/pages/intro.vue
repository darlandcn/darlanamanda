<template>
  <div
    style="position: relative; width: 100%; min-height: 100dvh; background: #0A0F1A; overflow: hidden; cursor: pointer;"
    @click="onScreenClick"
  >
    <!-- Foto do casal -->
    <div
      ref="bgPhoto"
      style="position: fixed; inset: 0; z-index: 1; overflow: hidden;"
    >
      <img
        :src="media.img('couple2.jpeg')"
        alt=""
        aria-hidden="true"
        style="display: block; width: 100%; height: 100%; object-fit: cover; object-position: 10% top; transform: translateY(-19%); filter: brightness(0.5) saturate(0.7); -webkit-mask-image: linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.5) 75%, transparent 93%); mask-image: linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.5) 75%, transparent 93%);"
      />
    </div>

    <!-- Overlay de vinheta -->
    <div style="position: fixed; inset: 0; z-index: 2; pointer-events: none; background: radial-gradient(ellipse 110% 90% at 50% 0%, transparent 25%, #0A0F1A 80%), radial-gradient(ellipse 50% 25% at 50% 4%, rgba(148,163,184,0.05) 0%, transparent 100%);" />

    <!-- Partículas — apenas nas bordas escuras -->
    <div style="position: fixed; inset: 0; z-index: 3; pointer-events: none; -webkit-mask-image: radial-gradient(ellipse 65% 60% at 50% 28%, transparent 0%, transparent 38%, black 73%); mask-image: radial-gradient(ellipse 65% 60% at 50% 28%, transparent 0%, transparent 38%, black 73%);">
      <ParticlesBackground />
    </div>

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
        stroke="#94A3B8"
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
        stroke="#94A3B8"
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
          font-family: 'Pier Sans';
          font-size: clamp(1.4rem, 4vw, 2rem);
          font-weight: 400;
          line-height: 1.5;
          color: #F8FAFC;
          letter-spacing: 0.01em;
        "
      >
        {{ currentPhrase }}
      </p>
    </div>

    <!-- Convite para deslizar (Cena 7) -->
    <div
      ref="scrollEl"
      style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        opacity: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        white-space: nowrap;
      "
      @click="navigate"
    >
      <span
        style="
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.14em;
          color: #CBD5E1;
          text-transform: uppercase;
        "
      >
        Clique para começar
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMedia } from '~/composables/useMedia'
import { gsap } from 'gsap'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

definePageMeta({ ssr: false })
defineOptions({ name: 'IntroPage' })

const router = useRouter()
const media  = useMedia()

const bgPhoto   = ref<HTMLElement | null>(null)
const lockEl    = ref<HTMLElement | null>(null)
const phraseEl  = ref<HTMLElement | null>(null)
const scrollEl  = ref<HTMLElement | null>(null)

const lockOpen      = ref(false)
const currentPhrase = ref('')
const isReady       = ref(false)

async function showPhrase(text: string, inDuration: number, hold: number, outDuration: number) {
  currentPhrase.value = text
  await gsap.to(phraseEl.value, { opacity: 1, duration: inDuration, ease: 'power2.out' })
  await new Promise(resolve => setTimeout(resolve, hold * 1000))
  await gsap.to(phraseEl.value, { opacity: 0, duration: outDuration, ease: 'power2.in' })
}

let touchStartX = 0

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
}

function onTouchEnd(e: TouchEvent) {
  const deltaX = e.changedTouches[0].clientX - touchStartX
  if (deltaX > 50) navigate()
}

onMounted(async () => {
  let granted = false
  try {
    granted = sessionStorage.getItem('granted') === 'true'
  } catch (e) {
    granted = true // storage indisponível (Safari privado) — não bloqueia
  }
  if (!granted) {
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

  // ── Cena 7: convite para rolar ─────────────────────────────────
  await gsap.to(scrollEl.value, { opacity: 1, duration: 1, ease: 'power2.out' })
  isReady.value = true

  window.addEventListener('touchstart', onTouchStart)
  window.addEventListener('touchend', onTouchEnd)
})

function onScreenClick() {
  if (isReady.value) navigate()
}

async function navigate() {
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)
  gsap.to(scrollEl.value, { opacity: 0, duration: 0.4 })
  await router.push('/nossa-historia')
}

onUnmounted(() => {
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)
})
</script>
