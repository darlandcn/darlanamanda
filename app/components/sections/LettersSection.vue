<template>
  <section
    style="
      min-height: 100dvh;
      background: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    "
  >
    <ParticlesBackground id="letters-particles" />

    <!-- Título -->
    <div ref="headerRef" class="relative z-10 w-full max-w-2xl mx-auto px-6 space-y-3 text-center" style="margin-bottom: 48px;">
      <p class="text-xs uppercase tracking-[0.3em] text-ink-muted font-semibold text-center">pra finalizar</p>
      <h2 class="font-serif text-4xl md:text-5xl text-ink leading-none text-center">
        Uma cartinha<br />
        <span class="text-gradient-gold">pro momozi</span>
      </h2>
    </div>

    <!-- Envelope -->
    <div
      ref="envelopeRef"
      style="
        position: relative;
        z-index: 10;
        cursor: pointer;
        width: min(85vw, 320px);
        touch-action: manipulation;
      "
      @click="openLetter"
    >
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="width: 100%; display: block; filter: drop-shadow(0 8px 32px rgba(0,0,0,0.4));"
      >
        <!-- Corpo -->
        <rect x="1" y="40" width="318" height="179" rx="6" fill="#F8FAFC" stroke="rgba(0,0,0,0.10)" stroke-width="1.2"/>
        <!-- Aba fechada -->
        <path d="M1 48 L160 140 L319 48 L319 219 L1 219 Z" fill="#E2E8F0"/>
        <!-- Vincos laterais -->
        <path d="M1 48 L160 140" stroke="rgba(0,0,0,0.06)" stroke-width="0.8"/>
        <path d="M319 48 L160 140" stroke="rgba(0,0,0,0.06)" stroke-width="0.8"/>
        <!-- Aba superior -->
        <path d="M1 40 L160 130 L319 40 Z" fill="#F8FAFC" stroke="rgba(0,0,0,0.10)" stroke-width="1.2"/>
      </svg>

      <!-- Lacre -->
      <div style="
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #0A0F1A;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 0 1px #0A0F1A, 0 4px 16px rgba(0,0,0,0.4);
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            fill="#F8FAFC"/>
        </svg>
      </div>
    </div>

    <!-- Hint -->
    <p ref="hintRef" class="mt-6 text-xs uppercase tracking-[0.25em] text-ink-muted/60 relative z-10">clique para abrir</p>

    <!-- Carta — overlay -->
    <Teleport to="body">
      <Transition name="letter">
        <div
          v-if="isOpen"
          style="
            position: fixed;
            inset: 0;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
          "
          @click="closeLetter"
        >
          <!-- Backdrop -->
          <div style="
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
          "/>

          <!-- Papel da carta -->
          <div style="background: #F8FAFC; border-radius: 2px; box-shadow: 0 24px 64px rgba(0,0,0,0.6); overflow: hidden; width: 100%; max-width: 360px; position: relative;" @click.stop>

            <!-- Linhas pautadas -->
            <div style="position: absolute; inset: 0; pointer-events: none; overflow: hidden;">
              <div
                v-for="n in 13"
                :key="n"
                style="position: absolute; width: 100%; height: 1px; background: rgba(0,0,0,0.12);"
                :style="{ top: (16 + n * 28) + 'px' }"
              />
            </div>

            <!-- Texto -->
            <div style="position: relative; z-index: 10; padding: 16px 20px;">
              <p style="
                font-family: 'Caveat', cursive;
                font-size: 19px;
                line-height: 28px;
                color: #111827;
                white-space: pre-line;
              ">{{ letterText }}</p>
            </div>

            <!-- Botão fechar -->
            <button
              type="button"
              style="
                display: block; width: 100%; padding: 14px;
                background: transparent; border: none;
                font-family: 'Inter', sans-serif; font-size: 0.65rem;
                font-weight: 400; letter-spacing: 0.2em;
                text-transform: uppercase; color: #111827;
                cursor: pointer; touch-action: manipulation;
              "
              @click="closeLetter"
            >fechar</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

defineOptions({ name: 'LettersSection' })

const headerRef   = ref<HTMLElement | null>(null)
const envelopeRef = ref<HTMLElement | null>(null)
const hintRef     = ref<HTMLElement | null>(null)
const isOpen      = ref(false)

const letterText = `Meu amor,

Escrever essa carta não é fácil — não porque as palavras faltam, mas porque são tantas que não cabem em nenhuma folha. Desde o dia em que você entrou na minha vida, tudo ficou mais colorido, mais leve, mais cheio de sentido.

Cada momento ao seu lado é um presente que guardo com cuidado no coração. Você me ensinou que o amor não é perfeito — é verdadeiro. E o nosso é os dois.

Com todo o meu amor,
Para sempre seu.`

function openLetter() {
  if (isOpen.value) return
  gsap.to([envelopeRef.value, hintRef.value], {
    opacity: 0,
    y: -12,
    duration: 0.35,
    ease: 'power2.in',
    onComplete: () => { isOpen.value = true },
  })
}

function closeLetter() {
  isOpen.value = false
  gsap.fromTo(
    [envelopeRef.value, hintRef.value],
    { opacity: 0, y: -12 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
  )
}

onMounted(() => {
  gsap.fromTo(
    headerRef.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 },
  )
  gsap.fromTo(
    envelopeRef.value,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.5 },
  )
})
</script>

<style scoped>
.letter-enter-active {
  transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1);
}
.letter-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.letter-enter-from,
.letter-leave-to {
  opacity: 0;
  transform: scale(0.94) translateY(16px);
}
</style>
