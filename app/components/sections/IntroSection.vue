<template>
  <section
    id="section-intro"
    data-section="intro"
    class="section-base min-h-screen bg-abyss-100 relative"
    :class="{ 'items-start': galleryOpen }"
  >
    <!-- Divisor superior -->
    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-20" />

    <div class="relative z-10 w-full max-w-5xl mx-auto px-6 py-24">

      <!-- Conteúdo principal -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <!-- Coluna de texto -->
        <div ref="textColRef" data-gsap="fade-right" class="space-y-6">
          <p class="text-xs uppercase tracking-[0.3em] text-slate-300">
            Capítulo I
          </p>
          <h2 class="font-serif text-4xl md:text-5xl text-ivory leading-tight">
            Onde tudo<br />
            <span class="italic text-gradient-gold">começou</span>
          </h2>
          <p class="text-ivory-200 leading-relaxed">
            Eii amooor.
          </p>
          <p class="text-ivory-200 leading-relaxed">
            Bolei isso tudo com muito amor, muito carinho, pra deixar guardado um pouquinho
            daquilo que vivemos juntos até hoje.
          </p>
          <p class="text-ivory-200 leading-relaxed">
            Pensei em irmos do início, você se lembra como tudo começou?
          </p>

          <!-- Botão revelar -->
          <button
            v-if="!cardVisible"
            type="button"
            class="block mx-auto text-xs uppercase tracking-[0.25em] text-ivory/80 hover:text-ivory border border-ivory/50 hover:border-ivory rounded-full px-6 py-2 transition-all duration-300"
            @click="cardVisible = true"
          >
            Revelar
          </button>
        </div>

        <!-- Coluna de mídia -->
        <div ref="imageColRef" data-gsap="fade-left" class="flex flex-col items-center md:items-start gap-4">

          <!-- Flip card — Foto / Carta -->
          <Transition name="reveal">
            <div
              v-if="cardVisible"
              class="flip-card w-80 h-80 flex-shrink-0 cursor-pointer"
              @click="photoFlipped = !photoFlipped"
            >
              <div class="flip-card-inner" :class="{ flipped: photoFlipped }">

                <!-- Frente: foto -->
                <div class="flip-card-face rounded-2xl overflow-hidden">
                  <img
                    src="/images/começoimagem.jpeg"
                    alt="Foto especial"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- Verso: carta -->
                <div class="flip-card-face flip-card-back rounded-2xl overflow-hidden bg-[#f7f2e8]">
                  <div class="absolute inset-x-4 top-4 bottom-4 pointer-events-none z-0 flex flex-col justify-between">
                    <div v-for="n in 14" :key="n" class="h-px bg-[#d6cdb8]/70" />
                  </div>
                  <div class="relative z-10 h-full px-4 py-4">
                    <p class="font-caveat text-[#3a2e1e] text-[19px] leading-[1.45] whitespace-pre-line">{{ letterText }}</p>
                  </div>
                </div>

              </div>
            </div>
          </Transition>

          <!-- Botão ver mais -->
          <Transition name="reveal">
            <button
              v-if="cardVisible"
              type="button"
              class="mt-6 text-xs uppercase tracking-[0.25em] text-ivory/50 hover:text-ivory/90 border border-ivory/20 hover:border-ivory/50 rounded-full px-6 py-2 transition-all duration-300"
              @click="galleryOpen = !galleryOpen"
            >
              {{ galleryOpen ? 'Fechar' : 'Ver mais...' }}
            </button>
          </Transition>

        </div>
      </div>

      <!-- Galeria inline -->
      <Transition name="gallery-expand">
        <div v-if="galleryOpen" class="mt-16 pt-12 border-t border-white/5">
          <div class="mb-8 space-y-1">
            <p class="font-sans text-ivory-200 leading-relaxed">
              E vivemos ótimos momentos nessa conferência, e muitos outros depois dela, cada um deles vividos intensamente, daquele nosso jeitinho...
            </p>
          </div>
          <MasonryWall :items="galleryItems" :column-width="180" :min-columns="4" :max-columns="4" :gap="12">
            <template #default="{ item }">
              <button
                type="button"
                class="group relative w-full block rounded-xl overflow-hidden focus:outline-none"
                @click="lightboxItem = item"
              >
                <img
                  v-if="item.type === 'image'"
                  :src="item.src"
                  class="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                />

                <div v-else class="relative">
                  <video
                    :src="item.src"
                    class="w-full h-auto block"
                    muted
                    preload="metadata"
                  />
                  <div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-colors">
                    <div class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5.5l11 6.5-11 6.5V5.5z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </template>
          </MasonryWall>
        </div>
      </Transition>

    </div>

    <!-- Lightbox -->
    <Transition name="modal">
      <div
        v-if="lightboxItem"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div class="absolute inset-0 bg-black/95 backdrop-blur-sm" @click="lightboxItem = null" />
        <button
          type="button"
          class="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors bg-white/10 rounded-full p-2"
          @click="lightboxItem = null"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
        <img
          v-if="lightboxItem.type === 'image'"
          :src="lightboxItem.src"
          class="relative z-10 max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
        />
        <video
          v-else
          :src="lightboxItem.src"
          controls
          autoplay
          class="relative z-10 max-w-full max-h-[90vh] rounded-xl shadow-2xl"
        />
      </div>
    </Transition>

  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MasonryWall } from '@yeger/vue-masonry-wall'
import { useGsapAnimations } from '~/composables/useGsapAnimations'

defineOptions({ name: 'IntroSection' })

interface GalleryItem {
  type: 'image' | 'video'
  src: string
}

const textColRef   = ref<HTMLElement | null>(null)
const imageColRef  = ref<HTMLElement | null>(null)
const photoFlipped = ref(false)
const cardVisible  = ref(false)
const galleryOpen  = ref(false)
const lightboxItem = ref<GalleryItem | null>(null)

const letterText = `Dia 03/09/2022, no primeiro dia de uma conferência internacional…
Foi aqui que nossa história começou, e por mais que eu não conseguisse admitir, eu me apaixonei desde o primeiro dia.
Eu me lembro como essa tarde foi leve, espontânea e com muitas risadas.
Mal sabia eu que, a partir desse momento, a partir desse dia, meu coração já tinha sido tomado por uma adolescente de 1 metro e meio.`

const galleryItems: GalleryItem[] = [
  { type: 'image', src: '/images/galeria01.jpeg' },
  { type: 'video', src: '/videos/vgaleria01.MP4' },
  { type: 'image', src: '/images/galeria02.jpeg' },
  { type: 'video', src: '/videos/vgaleria02.MP4' },
  { type: 'image', src: '/images/galeria03.jpeg' },
  { type: 'video', src: '/videos/vgaleria03.MP4' },
  { type: 'image', src: '/images/galeria04.jpeg' },
  { type: 'video', src: '/videos/vgaleria04.MP4' },
  { type: 'image', src: '/images/galeria05.jpeg' },
  { type: 'video', src: '/videos/vgaleria05.mp4' },
  { type: 'image', src: '/images/galeria06.jpeg' },
  { type: 'video', src: '/videos/vgaleria06.MP4' },
  { type: 'image', src: '/images/galeria07.jpeg' },
  { type: 'video', src: '/videos/vgaleria07.MOV' },
  { type: 'image', src: '/images/galeria08.jpeg' },
  { type: 'video', src: '/videos/vgaleria08.MP4' },
  { type: 'image', src: '/images/galeria09.jpeg' },
  { type: 'video', src: '/videos/vgaleria09.MP4' },
  { type: 'image', src: '/images/galeria10.jpeg' },
  { type: 'video', src: '/videos/vgaleria10.MP4' },
  { type: 'image', src: '/images/galeria11.jpeg' },
  { type: 'video', src: '/videos/vgaleria11.MP4' },
  { type: 'image', src: '/images/galeria12.jpeg' },
  { type: 'video', src: '/videos/vgaleria12.MP4' },
  { type: 'image', src: '/images/galeria13.jpeg' },
  { type: 'video', src: '/videos/vgaleria13.MP4' },
  { type: 'image', src: '/images/galeria14.jpeg' },
  { type: 'video', src: '/videos/vgaleria14.MP4' },
  { type: 'image', src: '/images/galeria15.jpeg' },
  { type: 'video', src: '/videos/vgaleria15.MP4' },
]

const { fadeInLeft, fadeInRight } = useGsapAnimations()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') lightboxItem.value = null
}

onMounted(() => {
  fadeInRight(textColRef.value)
  fadeInLeft(imageColRef.value)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* ── Flip Card ─────────────────────────────────────────────── */
.flip-card {
  perspective: 1000px;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.75s cubic-bezier(0.4, 0, 0.2, 1);
}
.flip-card-inner.flipped {
  transform: rotateY(180deg);
}
.flip-card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.flip-card-back {
  transform: rotateY(180deg);
}

/* ── Reveal ────────────────────────────────────────────────── */
.reveal-enter-active {
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.reveal-enter-from {
  opacity: 0;
  transform: scale(0.85);
}

/* ── Gallery expand ────────────────────────────────────────── */
.gallery-expand-enter-active {
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.gallery-expand-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.gallery-expand-enter-from,
.gallery-expand-leave-to {
  opacity: 0;
  transform: translateY(24px);
}

/* ── Lightbox ──────────────────────────────────────────────── */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
