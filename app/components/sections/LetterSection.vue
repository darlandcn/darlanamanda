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
      padding-bottom: 3.5rem;
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
          <div style="
            position: relative;
            z-index: 1;
            background: #F8FAFC;
            border-radius: 2px;
            box-shadow: 0 24px 64px rgba(0,0,0,0.6);
            width: 100%;
            max-width: 340px;
            max-height: min(68dvh, 440px);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          " @click.stop>

            <!-- Área scrollável com linhas pautadas -->
            <div style="
              flex: 1;
              overflow-y: auto;
              overflow-x: hidden;
              -webkit-overflow-scrolling: touch;
              padding: 20px 20px 16px;
              background-image: repeating-linear-gradient(
                transparent, transparent 27px,
                rgba(0,0,0,0.12) 27px, rgba(0,0,0,0.12) 28px
              );
              background-size: 100% 28px;
              background-position: 0 21px;
            ">
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
                flex-shrink: 0;
                display: block; width: 100%; padding: 14px;
                background: transparent; border: none;
                border-top: 1px solid rgba(0,0,0,0.08);
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
import { ref, watch, onMounted } from 'vue'
import { gsap } from 'gsap'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

defineOptions({ name: 'LetterSection' })

const props = defineProps<{ isActive?: boolean }>()

const headerRef   = ref<HTMLElement | null>(null)
const envelopeRef = ref<HTMLElement | null>(null)
const hintRef     = ref<HTMLElement | null>(null)
const isOpen      = ref(false)
const animPlayed  = ref(false)

const letterText = `Meu amor,

Estou escrevendo essa carta como uma tentativa de expressar meu amor e minha alegria em ter você.
Sou muito grato ao Senhor porque realmente encontrei em você tudo o que eu sempre pedi a Ele em oração: alguém que fosse a minha paz, meu descanso e que me aproximasse Dele. Mas Ele foi muito além disso; trouxe você, que é amável, companheira, espontânea e cheia de amor.
Amanda, você torna os meus dias mais leves e me incentiva a buscar a melhor versão de mim mesmo todos os dias, e não só no nosso relacionamento, mas também na minha relação com a minha família, nos meus estudos e no meu trabalho. E não por mérito meu, mas por você ser quem você é.
Enquanto eu fazia esta pequena página, vinham à minha memória todos os momentos que nos trouxeram até o dia de hoje, e percebi que ainda tenho muito a agradecer ao Senhor por ter me dado você. Durante o período em que ficamos afastados, eu cheguei a dizer que "não enxergava ninguém ocupando o seu lugar", e hoje tenho convicção de que essa frase é a mais pura verdade.
Fico muito feliz por todas as fases que passamos, pelo que estamos vivendo hoje e ansioso pelo que está por vir. De fato, tinha que ser você e vai ser você pra sempre.

Com todo o meu amor,

Darlan, vulgo "seu momozi"`

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
  gsap.set([envelopeRef.value, hintRef.value], { opacity: 0, y: 40 })
})

watch(() => props.isActive, (active) => {
  if (!active || animPlayed.value) return
  animPlayed.value = true
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo([envelopeRef.value, hintRef.value], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 })
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
