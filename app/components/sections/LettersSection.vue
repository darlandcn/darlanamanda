<template>
  <section
    id="section-letters"
    data-section="letters"
    class="section-base min-h-screen bg-abyss relative py-24"
  >
    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-20" />

    <!-- Orb decorativo -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             w-[500px] h-[500px] rounded-full opacity-5 blur-[120px]"
      style="background: radial-gradient(circle, rgba(148,163,184,0.4), transparent)"
    />

    <div class="relative z-10 w-full max-w-4xl mx-auto px-6">
      <!-- Cabeçalho -->
      <div ref="headerRef" class="text-center mb-16">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-300 mb-3">Capítulo IV</p>
        <h2 class="font-serif text-4xl md:text-5xl text-ivory">
          Palavras do<br />
          <span class="italic text-gradient-gold">coração</span>
        </h2>
      </div>

      <!-- Cards de cartas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="letter in letters"
          :key="letter.id"
          ref="lettersRefs"
          data-gsap="letter-card"
          class="letter-card glass-card relative rounded-2xl p-8 group cursor-default
                 hover:border-slate-500/20 transition-all duration-500"
        >
          <!-- Ícone de envelope decorativo -->
          <div class="mb-5 flex items-center justify-between">
            <span class="text-xs uppercase tracking-[0.25em] text-slate-400">
              {{ letter.label }}
            </span>
            <svg
              width="20" height="20"
              viewBox="0 0 24 24"
              fill="none"
              class="text-slate-300 opacity-40 group-hover:opacity-70 transition-opacity"
            >
              <path
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <h3 class="font-serif text-xl text-ivory mb-3">{{ letter.title }}</h3>
          <p class="text-sm text-ivory-200 leading-relaxed">{{ letter.preview }}</p>

          <!-- Linha de data -->
          <div class="mt-6 flex items-center gap-2">
            <div class="flex-1 h-px bg-abyss-300" />
            <span class="text-xs text-ivory-200">{{ letter.date }}</span>
          </div>

          <!-- Brilho no hover -->
          <div
            class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                   transition-opacity duration-500 pointer-events-none"
            style="background: radial-gradient(ellipse at top left, rgba(148,163,184,0.04), transparent)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useGsapAnimations } from '~/composables/useGsapAnimations'

defineOptions({ name: 'LettersSection' })

const headerRef  = ref<HTMLElement | null>(null)
const lettersRefs = ref<HTMLElement[]>([])

const { fadeInUp, staggerFadeIn } = useGsapAnimations()

const letters = [
  {
    id: 1,
    label: 'Para você',
    title: 'Uma carta especial',
    preview: 'Aqui vai o conteúdo da primeira carta. Um texto cheio de amor e carinho, escrito do fundo do coração...',
    date: 'Data especial',
  },
  {
    id: 2,
    label: 'Recordando',
    title: 'Memórias que guardo',
    preview: 'Esta carta fala sobre as memórias mais queridas que guardo de nós dois. Cada detalhe é precioso...',
    date: 'Data especial',
  },
  {
    id: 3,
    label: 'Sonhos',
    title: 'O que sonho para nós',
    preview: 'Tudo o que imagino para o nosso futuro, os lugares que quero ir, os momentos que quero viver ao seu lado...',
    date: 'Data especial',
  },
  {
    id: 4,
    label: 'Gratidão',
    title: 'Por tudo que vivemos',
    preview: 'Sou grato por cada sorriso, cada abraço, cada momento compartilhado. Você mudou a minha vida...',
    date: 'Data especial',
  },
]

onMounted(() => {
  fadeInUp(headerRef.value)
  staggerFadeIn(lettersRefs.value, 0.15)
})
</script>
