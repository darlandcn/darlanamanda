<template>
  <section
    id="section-intro"
    data-section="intro"
    class="section-base relative flex flex-col"
    :style="{
      minHeight: '100dvh',
      justifyContent: 'center',
      alignItems: galleryOpen ? 'flex-start' : 'center',
      overflow: galleryOpen ? 'auto' : 'hidden',
      background: 'transparent'
    }"
  >
    <ParticlesBackground id="intro-particles" />

    <!-- Divisor superior -->
    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,232,240,0.18)] to-transparent opacity-60" />

    <!-- Label + Título — topo da seção -->
    <div ref="textColRef" data-gsap="fade-right" class="relative z-10 w-full max-w-5xl mx-auto px-6 pt-[7.5rem] space-y-3 text-center">
      <p class="text-xs uppercase tracking-[0.3em] text-ink-muted font-semibold text-center">
        Capítulo I
      </p>
      <h2 class="font-serif text-4xl md:text-5xl text-ink leading-none text-center">
        Como tudo<br />
        <span class="text-gradient-gold">começou</span>
      </h2>
    </div>

    <!-- Texto -->
    <div class="relative z-10 w-full max-w-5xl mx-auto px-6 mt-6 text-left">
      <p class="text-ink-light leading-relaxed">
        Pensei em irmos do início, você se lembra como tudo começou?
      </p>
    </div>

    <!-- Conteúdo principal — centralizado na seção -->
    <div class="relative z-10 w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col justify-center py-8">

      <!-- Conteúdo principal -->
      <div class="flex justify-center">

        <!-- Coluna de mídia -->
        <div ref="imageColRef" data-gsap="fade-left" class="flex flex-col items-center gap-4">

          <!-- Flip card — Foto / Carta -->
          <Transition name="reveal">
            <div
              v-if="cardVisible"
              class="flip-card flex-shrink-0 cursor-pointer"
              style="width: min(80vw, 320px); height: min(125vw, 400px); max-height: 60vh;"
              @click="photoFlipped = !photoFlipped"
            >
              <div class="flip-card-inner" :class="{ flipped: photoFlipped }">

                <!-- Frente: foto -->
                <div class="flip-card-face overflow-hidden polaroid flex flex-col">
                  <img
                    :src="img('comecoimagem.jpeg')"
                    alt="Foto especial"
                    loading="lazy"
                    class="w-full flex-1 object-cover rounded-sm min-h-0"
                  />
                  <div class="flex items-center justify-center" style="height: 64px;">
                    <span style="font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: #0A0F1A;">clique para virar</span>
                  </div>
                </div>

                <!-- Verso: carta -->
                <div class="flip-card-face flip-card-back overflow-hidden" style="background: #F8FAFC;">
                  <div class="absolute inset-0 pointer-events-none z-0" style="overflow: hidden;">
                    <div
                      v-for="n in 13"
                      :key="n"
                      class="absolute w-full"
                      style="height: 1px; background: rgba(0,0,0,0.12);"
                      :style="{ top: (16 + n * 28) + 'px' }"
                    />
                  </div>
                  <div class="relative z-10 h-full px-5 py-4 flex flex-col">
                    <p class="font-caveat text-[#111827] text-[19px] leading-[28px] whitespace-pre-line">{{ letterText }}</p>
                  </div>
                </div>

              </div>
            </div>
          </Transition>

        </div>
      </div>

      <!-- Galeria inline -->
      <Transition name="gallery-expand">
        <div v-if="galleryOpen" class="mt-16 pt-12 border-t border-[rgba(226,232,240,0.10)]">
          <div ref="galleryTextRef" class="mb-8 space-y-1">
            <p class="font-sans text-ink-light leading-relaxed">
              Foram ótimos momentos nessa conferência, e muitos outros depois dela, cada um deles vividos intensamente, daquele nosso jeitinho.
            </p>
          </div>
          <MasonryWall :items="galleryItems" :column-width="180" :min-columns="4" :max-columns="4" :gap="12">
            <template #default="{ item }">
              <button
                type="button"
                class="group relative w-full block rounded-xl overflow-hidden focus:outline-none"
                style="box-shadow: 0 0 0 1px rgba(226,232,240,0.10);"
                @click="lightboxItem = item"
              >
                <img
                  v-if="item.type === 'image'"
                  :src="item.src"
                  loading="lazy"
                  class="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                />

                <div v-else class="relative">
                  <video
                    :src="item.src"
                    class="w-full h-auto block"
                    muted
                    preload="none"
                    @canplay="(e) => { const v = e.target as HTMLVideoElement; v.currentTime = 1 }"
                  />
                  <div class="absolute inset-0 flex items-center justify-center bg-ink/20 group-hover:bg-ink/10 transition-colors">
                    <div class="w-6 h-6 rounded-full bg-[#111827]/80 backdrop-blur-sm flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="#F8FAFC">
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
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="lightboxItem"
          class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          <div class="absolute inset-0 bg-black/90 backdrop-blur-sm" @click="lightboxItem = null" />
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
            loading="lazy"
            class="relative z-10 max-w-full max-h-[90vh] rounded-xl object-contain shadow-none"
          />
          <video
            v-else
            :src="lightboxItem.src"
            controls
            autoplay
            playsinline
            class="relative z-10 max-w-full max-h-[90vh] rounded-xl shadow-none"
          />
        </div>
      </Transition>
    </Teleport>

  </section>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { MasonryWall } from '@yeger/vue-masonry-wall'
import { useMedia } from '~/composables/useMedia'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

defineOptions({ name: 'IntroSection' })

const props = defineProps<{ isActive?: boolean }>()

interface GalleryItem {
  type: 'image' | 'video'
  src: string
}

const textColRef    = ref<HTMLElement | null>(null)
const imageColRef   = ref<HTMLElement | null>(null)
const galleryTextRef = ref<HTMLElement | null>(null)
const photoFlipped  = ref(false)
const cardVisible   = ref(false)
const galleryOpen   = ref(false)
const lightboxItem  = ref<GalleryItem | null>(null)
const animPlayed = ref(false)

const letterText = `Dia 03/09/2022.
No primeiro dia de uma conferência internacional…
Foi aqui que nossa história começou, e por mais que eu não conseguisse admitir na época, eu me apaixonei desde o primeiro dia.
Eu me lembro como essa tarde foi leve, espontânea e de muitas risadas.
Mal sabia eu que, a partir dessa conferência, meu coração já teria sido tomado por completo.
E não parou por ai...`

const { img, vid } = useMedia()

const galleryItems: GalleryItem[] = [
  { type: 'image', src: img('galeria01.jpeg') },
  { type: 'image', src: img('galeria02.jpeg') },
  { type: 'image', src: img('galeria03.jpeg') },
  { type: 'image', src: img('galeria04.jpeg') },
  { type: 'image', src: img('galeria05.jpeg') },
  { type: 'image', src: img('galeria06.jpeg') },
  { type: 'image', src: img('galeria07.jpeg') },
  { type: 'image', src: img('galeria08.jpeg') },
  { type: 'image', src: img('galeria09.jpeg') },
  { type: 'image', src: img('galeria10.jpeg') },
  { type: 'image', src: img('galeria11.jpeg') },
  { type: 'image', src: img('galeria12.jpeg') },
  { type: 'image', src: img('galeria13.jpeg') },
  { type: 'image', src: img('galeria14.jpeg') },
  { type: 'image', src: img('galeria15.jpeg') },
]

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') lightboxItem.value = null
}

onMounted(() => {
  gsap.set(imageColRef.value, { opacity: 0, y: 40 })
  window.addEventListener('keydown', onKeydown)
})

watch(() => props.isActive, (active) => {
  if (!active || animPlayed.value) return
  animPlayed.value = true
  cardVisible.value = true
  galleryOpen.value = true
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(imageColRef.value, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 })
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
