<template>
  <section
    id="section-video"
    data-section="video"
    class="section-base min-h-screen bg-night-100 relative py-24"
  >
    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-800 to-transparent opacity-40" />

    <div class="relative z-10 w-full max-w-4xl mx-auto px-6">
      <!-- Cabeçalho -->
      <div ref="headerRef" class="text-center mb-12">
        <p class="text-xs uppercase tracking-[0.3em] text-rose-400 mb-3">Capítulo VI</p>
        <h2 class="font-serif text-4xl md:text-5xl text-blush-text">
          Reviver em<br />
          <span class="italic text-gradient-rose">movimento</span>
        </h2>
      </div>

      <!-- Player de vídeo placeholder -->
      <div
        ref="playerRef"
        data-gsap="scale-in"
        class="video-player relative w-full aspect-video rounded-2xl overflow-hidden glass-card
               cursor-pointer group"
        role="button"
        tabindex="0"
        aria-label="Reproduzir vídeo especial"
        @click="handlePlay"
        @keydown.enter="handlePlay"
        @keydown.space.prevent="handlePlay"
      >
        <!-- Thumbnail placeholder -->
        <div
          class="absolute inset-0 flex items-center justify-center
                 bg-gradient-to-br from-night-300 via-night-200 to-night-300"
        >
          <!-- Gradiente dinâmico no hover -->
          <div
            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style="background: radial-gradient(ellipse at center, rgba(219,39,119,0.1), transparent)"
          />

          <!-- Botão play -->
          <div
            class="relative z-10 flex flex-col items-center gap-4
                   transition-transform duration-300 group-hover:scale-110"
          >
            <div
              class="w-20 h-20 rounded-full border-2 border-rose-600/60 flex items-center justify-center
                     bg-night-200/80 backdrop-blur-sm shadow-[0_0_40px_rgba(219,39,119,0.2)]
                     group-hover:border-rose-500 group-hover:shadow-[0_0_60px_rgba(219,39,119,0.35)]
                     transition-all duration-300"
            >
              <svg
                width="28" height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-rose-400 ml-1"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p class="text-xs text-blush-muted tracking-[0.2em] uppercase">Assistir</p>
          </div>

          <!-- Ícone de vídeo de fundo (decorativo) -->
          <div class="absolute bottom-6 right-6 opacity-10">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                    stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <!-- Ring decorativo -->
        <div class="absolute inset-0 rounded-2xl ring-1 ring-rose-900/20 pointer-events-none" />
      </div>

      <!-- Legenda -->
      <p ref="captionRef" class="mt-6 text-center text-sm text-blush-muted">
        Um vídeo especial feito com todo o amor do mundo — para você.
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useGsapAnimations } from '~/composables/useGsapAnimations'

defineOptions({ name: 'VideoSection' })

const headerRef  = ref<HTMLElement | null>(null)
const playerRef  = ref<HTMLElement | null>(null)
const captionRef = ref<HTMLElement | null>(null)

const { fadeInUp, scaleIn } = useGsapAnimations()

function handlePlay() {
  // Implementar lógica de reprodução de vídeo aqui
}

onMounted(() => {
  fadeInUp(headerRef.value)
  scaleIn(playerRef.value)
  fadeInUp(captionRef.value)
})
</script>
