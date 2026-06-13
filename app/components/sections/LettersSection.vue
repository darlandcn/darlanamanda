<template>
  <section
    id="section-letters"
    data-section="letters"
    class="section-base relative flex flex-col justify-center overflow-hidden pb-12"
    style="min-height: 100dvh; background: transparent;"
  >
    <ParticlesBackground id="letters-particles" />

    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,232,240,0.18)] to-transparent opacity-60" />

    <!-- Orb decorativo quente -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             w-[500px] h-[500px] rounded-full blur-[140px]"
      style="background: radial-gradient(circle, rgba(226,232,240,0.08), transparent)"
    />

    <!-- Label + Título -->
    <div ref="headerRef" class="relative z-10 w-full max-w-2xl mx-auto px-6 space-y-3 text-center">
      <p class="text-xs uppercase tracking-[0.3em] text-ink-muted font-semibold text-center">pra finalizar</p>
      <h2 class="font-serif text-4xl md:text-5xl text-ink leading-none text-center">
        Uma cartinha<br />
        <span class="text-gradient-gold">pro momozi</span>
      </h2>
    </div>

    <div class="relative z-10 w-full max-w-2xl mx-auto px-6 mt-12 flex flex-col items-center">

      <!-- Envelope -->
      <div
        ref="envelopeRef"
        class="relative cursor-pointer select-none"
        style="width: min(85vw, 320px); aspect-ratio: 320 / 220; perspective: 1000px;"
        @click="toggleEnvelope"
      >
        <!-- Corpo do envelope — papel creme -->
        <svg
          viewBox="0 0 320 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="absolute inset-0 w-full h-full"
        >
          <!-- Fundo -->
          <rect x="1" y="40" width="318" height="179" rx="6" fill="#F8FAFC" stroke="rgba(0,0,0,0.10)" stroke-width="1.2"/>
          <!-- Aba inferior (dobra) -->
          <path d="M1 48 L160 140 L319 48" fill="#E2E8F0" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
          <!-- Laterais -->
          <path d="M1 48 L1 219 L160 140 Z" fill="#EEF2F7" stroke="rgba(0,0,0,0.06)" stroke-width="1"/>
          <path d="M319 48 L319 219 L160 140 Z" fill="#EEF2F7" stroke="rgba(0,0,0,0.06)" stroke-width="1"/>
        </svg>

        <!-- Aba superior animada -->
        <div
          ref="flapRef"
          class="absolute inset-x-0 top-10"
          style="transform-style: preserve-3d; z-index: 10;"
        >
          <svg
            viewBox="0 0 320 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full"
          >
            <path d="M1 0 L160 100 L319 0 L319 2 L1 2 Z" fill="#F8FAFC" stroke="rgba(0,0,0,0.10)" stroke-width="1.2"/>
          </svg>
        </div>

        <!-- Lacre central -->
        <div
          ref="sealRef"
          class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center
                 w-9 h-9 rounded-full border border-[#0A0F1A] bg-[#F8FAFC]"
          style="top: 43%; box-shadow: 0 0 0 1px #0A0F1A; z-index: 20;"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="color: #0A0F1A;">
            <path
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

      </div>

      <!-- Dica de interação -->
      <p class="mt-6 text-xs uppercase tracking-[0.25em] text-ink-muted/60 transition-opacity duration-500">
        {{ isOpen ? '' : 'clique para abrir' }}
      </p>

    </div>

    <!-- Carta centralizada na tela -->
    <Teleport to="body">
      <Transition name="letter">
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-6"
          @click="closeEnvelope"
        >
          <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            class="relative z-10 w-full max-w-sm overflow-hidden"
            style="background: #F8FAFC; border-radius: 2px;"
            @click.stop
          >
            <!-- Linhas pautadas -->
            <div class="absolute inset-0 pointer-events-none z-0" style="overflow: hidden;">
              <div
                v-for="n in 20"
                :key="n"
                class="absolute w-full"
                style="height: 1px; background: rgba(0,0,0,0.12);"
                :style="{ top: (16 + n * 28) + 'px' }"
              />
            </div>
            <!-- Conteúdo -->
            <div class="relative z-10 px-5 py-4">
              <p class="font-caveat text-[#111827] text-[19px] leading-[28px] whitespace-pre-line">{{ letterText }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useGsapAnimations } from '~/composables/useGsapAnimations'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

defineOptions({ name: 'LettersSection' })

const headerRef   = ref<HTMLElement | null>(null)
const envelopeRef = ref<HTMLElement | null>(null)
const flapRef     = ref<HTMLElement | null>(null)
const sealRef     = ref<HTMLElement | null>(null)

const isOpen = ref(false)

const letterText = `Meu amor,

Escrever essa carta não é fácil — não porque as palavras faltam, mas porque são tantas que não cabem em nenhuma folha. Desde o dia em que você entrou na minha vida, tudo ficou mais colorido, mais leve, mais cheio de sentido.

Cada momento ao seu lado é um presente que guardo com cuidado no coração. Você me ensinou que o amor não é perfeito — é verdadeiro. E o nosso é os dois.

Com todo o meu amor,
Para sempre seu.`

const { fadeInUp, scaleIn } = useGsapAnimations()

function toggleEnvelope() {
  if (isOpen.value) {
    closeEnvelope()
  } else {
    openEnvelope()
  }
}

function openEnvelope() {
  // transformOrigin via GSAP para garantir consistência cross-browser
  gsap.set(flapRef.value, { transformOrigin: '50% 0%', rotateX: 0 })

  const tl = gsap.timeline()
  // Lacre some primeiro
  tl.to(sealRef.value, { opacity: 0, scale: 0.8, duration: 0.25, ease: 'power2.in' })
  // Aba gira pra cima em torno do topo (hinge = borda superior)
  tl.to(flapRef.value, {
    rotateX: -175,
    duration: 0.7,
    ease: 'power2.inOut',
    onComplete: () => { isOpen.value = true },
  }, '+=0.05')
}

function closeEnvelope() {
  isOpen.value = false
  gsap.set(flapRef.value, { transformOrigin: '50% 0%' })

  const tl = gsap.timeline()
  tl.to(flapRef.value, { rotateX: 0, duration: 0.5, ease: 'power2.inOut' })
  tl.to(sealRef.value, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' })
}

onMounted(() => {
  gsap.set(flapRef.value, { transformOrigin: '50% 0%', rotateX: 0 })
  fadeInUp(headerRef.value)
  scaleIn(envelopeRef.value)
})
</script>

<style scoped>
.letter-enter-active {
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.letter-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.letter-enter-from,
.letter-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>
