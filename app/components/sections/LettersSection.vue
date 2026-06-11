<template>
  <section
    id="section-letters"
    data-section="letters"
    class="section-base min-h-screen bg-abyss relative py-24 flex flex-col items-center justify-center"
  >
    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-20" />

    <!-- Orb decorativo -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             w-[500px] h-[500px] rounded-full opacity-5 blur-[120px]"
      style="background: radial-gradient(circle, rgba(148,163,184,0.4), transparent)"
    />

    <div class="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center">
      <!-- Cabeçalho -->
      <div ref="headerRef" class="text-center mb-16">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-300 mb-3">Capítulo IV</p>
        <h2 class="font-serif text-4xl md:text-5xl text-ivory">
          Uma carta<br />
          <span class="italic text-gradient-gold">especial</span>
        </h2>
      </div>

      <!-- Envelope -->
      <div
        ref="envelopeRef"
        class="relative cursor-pointer select-none"
        style="width: 320px; height: 220px;"
        @click="toggleEnvelope"
      >
        <!-- Corpo do envelope -->
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute inset-0 w-full h-full drop-shadow-2xl"
        >
          <!-- Fundo do envelope -->
          <rect x="1" y="40" width="318" height="179" rx="8" fill="#1a1f2e" stroke="rgba(148,163,184,0.2)" stroke-width="1.5"/>

          <!-- Aba inferior esquerda (triângulo) -->
          <path d="M1 48 L160 140 L319 48" fill="#141824" stroke="rgba(148,163,184,0.15)" stroke-width="1"/>

          <!-- Aba lateral esquerda -->
          <path d="M1 48 L1 219 L160 140 Z" fill="#111520" stroke="rgba(148,163,184,0.1)" stroke-width="1"/>

          <!-- Aba lateral direita -->
          <path d="M319 48 L319 219 L160 140 Z" fill="#111520" stroke="rgba(148,163,184,0.1)" stroke-width="1"/>
        </svg>

        <!-- Aba superior (animada) -->
        <div
          ref="flapRef"
          class="absolute inset-x-0 top-10 origin-top"
          style="transform-style: preserve-3d;"
        >
          <svg
            viewBox="0 0 320 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full"
          >
            <path d="M1 0 L160 100 L319 0 L319 2 L1 2 Z" fill="#1a1f2e" stroke="rgba(148,163,184,0.2)" stroke-width="1.5"/>
          </svg>
        </div>

        <!-- Lacre / ícone central -->
        <div
          ref="sealRef"
          class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center
                 w-10 h-10 rounded-full border border-amber-400/30 bg-abyss"
          style="top: 42%;"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="text-amber-300/70">
            <path
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <!-- Carta (sobe de dentro do envelope) -->
        <div
          ref="letterRef"
          class="absolute left-1/2 -translate-x-1/2 w-[280px] overflow-hidden pointer-events-none"
          style="bottom: 20px; height: 0; opacity: 0;"
        >
          <div class="glass-card rounded-xl p-7 border border-amber-400/10">
            <p class="text-xs uppercase tracking-[0.25em] text-amber-300/60 mb-4">Para você</p>
            <p class="font-serif text-sm text-ivory/90 leading-relaxed">
              Meu amor,<br /><br />
              Escrever essa carta não é fácil — não porque as palavras faltam, mas porque são tantas
              que não cabem em nenhuma folha. Desde o dia em que você entrou na minha vida, tudo
              ficou mais colorido, mais leve, mais cheio de sentido.<br /><br />
              Cada momento ao seu lado é um presente que guardo com cuidado no coração. Você me
              ensinou que o amor não é perfeito — é verdadeiro. E o nosso é os dois.<br /><br />
              Com todo o meu amor,<br />
              <span class="italic text-amber-300/80">Para sempre seu.</span>
            </p>
            <div class="mt-5 flex items-center gap-2">
              <div class="flex-1 h-px bg-amber-400/10" />
              <span class="text-xs text-ivory/30">com amor</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Dica de interação -->
      <p
        ref="hintRef"
        class="mt-10 text-xs uppercase tracking-[0.25em] text-slate-500 transition-opacity duration-500"
      >
        {{ isOpen ? 'clique para fechar' : 'clique para abrir' }}
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useGsapAnimations } from '~/composables/useGsapAnimations'

defineOptions({ name: 'LettersSection' })

const headerRef  = ref<HTMLElement | null>(null)
const envelopeRef = ref<HTMLElement | null>(null)
const flapRef    = ref<HTMLElement | null>(null)
const letterRef  = ref<HTMLElement | null>(null)
const sealRef    = ref<HTMLElement | null>(null)
const hintRef    = ref<HTMLElement | null>(null)

const isOpen = ref(false)

const { fadeInUp, scaleIn } = useGsapAnimations()

function toggleEnvelope() {
  if (isOpen.value) {
    closeEnvelope()
  } else {
    openEnvelope()
  }
}

function openEnvelope() {
  isOpen.value = true
  const tl = gsap.timeline()

  // Lacre some
  tl.to(sealRef.value, { opacity: 0, scale: 0.8, duration: 0.25, ease: 'power2.in' })

  // Aba abre (rotaciona pra cima em perspectiva)
  tl.to(flapRef.value, {
    rotateX: -180,
    duration: 0.55,
    ease: 'power2.inOut',
  }, '-=0.1')

  // Carta sobe
  tl.to(letterRef.value, {
    height: 'auto',
    opacity: 1,
    bottom: 160,
    duration: 0.7,
    ease: 'power3.out',
    pointerEvents: 'auto',
  }, '-=0.2')
}

function closeEnvelope() {
  isOpen.value = false
  const tl = gsap.timeline()

  // Carta desce
  tl.to(letterRef.value, {
    height: 0,
    opacity: 0,
    bottom: 20,
    duration: 0.5,
    ease: 'power3.in',
    pointerEvents: 'none',
  })

  // Aba fecha
  tl.to(flapRef.value, {
    rotateX: 0,
    duration: 0.5,
    ease: 'power2.inOut',
  }, '-=0.2')

  // Lacre reaparece
  tl.to(sealRef.value, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' })
}

onMounted(() => {
  fadeInUp(headerRef.value)
  scaleIn(envelopeRef.value)
})
</script>
