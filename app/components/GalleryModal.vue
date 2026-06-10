<template>
  <Transition name="gallery-modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex flex-col">

      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/95 backdrop-blur-sm" />

      <!-- Header -->
      <div class="relative z-10 flex items-center justify-between px-6 py-5 border-b border-white/5">
        <span class="text-xs uppercase tracking-[0.3em] text-ivory/40">Galeria</span>
        <button
          type="button"
          class="text-ivory/40 hover:text-ivory transition-colors"
          @click="emit('close')"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Grid -->
      <div class="relative z-10 flex-1 overflow-y-auto px-6 py-6">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            v-for="(item, i) in items"
            :key="i"
            type="button"
            class="group relative aspect-square rounded-xl overflow-hidden focus:outline-none"
            @click="lightboxItem = item"
          >
            <!-- Imagem -->
            <img
              v-if="item.type === 'image'"
              :src="item.src"
              :alt="item.alt ?? ''"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <!-- Vídeo (thumbnail do primeiro frame) -->
            <video
              v-else
              :src="item.src"
              class="w-full h-full object-cover"
              muted
              preload="metadata"
            />

            <!-- Overlay play para vídeo -->
            <div
              v-if="item.type === 'video'"
              class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors"
            >
              <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5.5l11 6.5-11 6.5V5.5z"/>
                </svg>
              </div>
            </div>

            <!-- Overlay hover para imagem -->
            <div
              v-else
              class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"
            />
          </button>
        </div>
      </div>

      <!-- Lightbox -->
      <Transition name="lightbox">
        <div
          v-if="lightboxItem"
          class="fixed inset-0 z-60 flex items-center justify-center p-4"
        >
          <div
            class="absolute inset-0 bg-black/95"
            @click="lightboxItem = null"
          />

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
            :alt="lightboxItem.alt ?? ''"
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

    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface GalleryItem {
  type: 'image' | 'video'
  src: string
  alt?: string
}

defineOptions({ name: 'GalleryModal' })

defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const lightboxItem = ref<GalleryItem | null>(null)

const items: GalleryItem[] = [
  { type: 'image', src: '/images/galeria01.jpeg' },
  { type: 'image', src: '/images/galeria02.jpeg' },
  { type: 'image', src: '/images/galeria03.jpeg' },
  { type: 'video', src: '/videos/vgaleria01.MP4' },
  { type: 'video', src: '/videos/vgaleria02.MP4' },
  { type: 'video', src: '/videos/vgaleria03.MP4' },
  { type: 'video', src: '/videos/vgaleria04.MP4' },
  { type: 'video', src: '/videos/vgaleria05.mp4' },
  { type: 'video', src: '/videos/vgaleria06.MP4' },
  { type: 'video', src: '/videos/vgaleria07.MOV' },
]
</script>

<style scoped>
.gallery-modal-enter-active,
.gallery-modal-leave-active {
  transition: opacity 0.3s ease;
}
.gallery-modal-enter-from,
.gallery-modal-leave-to {
  opacity: 0;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
