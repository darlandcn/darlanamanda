<template>
  <section
    id="section-gallery-2"
    data-section="gallery-2"
    class="section-base min-h-screen relative flex flex-col"
    style="background: transparent;"
  >
    <ParticlesBackground id="gallery2-particles" />

    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,232,240,0.18)] to-transparent opacity-60" />

    <!-- Label + Título -->
    <div ref="headerRef" class="relative z-10 w-full max-w-lg mx-auto px-6 pt-[7.5rem] space-y-3 text-center">
      <p class="text-xs uppercase tracking-[0.3em] text-ink-muted font-semibold text-center">02 mai 2026</p>
      <h2 class="font-serif text-4xl md:text-5xl text-ink leading-none text-center">
        O melhor<br />
        <span class="text-gradient-gold">momento</span>
      </h2>
    </div>

    <!-- Texto -->
    <div class="relative z-10 w-full max-w-lg mx-auto px-6 mt-16 mb-16 text-left">
      <p class="text-base md:text-lg text-ink-light leading-relaxed">
        E eu não poderia deixar de lado o melhor momento que tivemos juntos.
      </p>
    </div>

    <!-- Conteúdo -->
    <div class="relative z-10 w-full max-w-lg mx-auto px-6 flex-1 pb-24 flex flex-col gap-4 items-center">

      <!-- Botão revelar -->
      <button
        v-if="!cardVisible"
        type="button"
        class="mt-8 text-xs uppercase tracking-[0.25em] text-ink hover:opacity-80 rounded-full px-6 py-2 transition-all duration-300"
        @click="reveal"
      >
        Revelar
      </button>

      <!-- Vídeo + fotos -->
      <Transition name="reveal">
        <div v-show="cardVisible" class="w-full flex flex-col gap-10">

          <!-- Polaroid: vídeo -->
          <div class="polaroid w-full flex flex-col">
            <div class="relative w-full" @click="togglePlay">
              <video
                ref="videoRef"
                src="https://pupkcykrdxwgwmynjysb.supabase.co/storage/v1/object/public/media/video/vpedido.mp4"
                class="w-full h-auto block"
                playsinline
                preload="auto"
                @ended="isPlaying = false"
              />
              <!-- Overlay play/pause -->
              <Transition name="ctrl">
                <div
                  v-if="!isPlaying"
                  class="absolute inset-0 flex items-center justify-center"
                  style="background: rgba(0,0,0,0.25);"
                >
                  <div
                    class="flex items-center justify-center rounded-full"
                    style="width: 56px; height: 56px; background: transparent; border: 1px solid #FFFFFF;"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M5 3l14 9-14 9V3z"/>
                    </svg>
                  </div>
                </div>
              </Transition>

              <!-- Botão mute/unmute — sempre visível no canto -->
              <button
                type="button"
                @click.stop="toggleMute"
                style="
                  position: absolute;
                  bottom: 12px;
                  right: 12px;
                  width: 36px;
                  height: 36px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: transparent;
                  border: 1px solid #FFFFFF;
                  border-radius: 50%;
                  cursor: pointer;
                "
              >
                <!-- Com som -->
                <svg v-if="!isMuted" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#FFFFFF"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <!-- Mutado -->
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#FFFFFF"/>
                  <line x1="23" y1="9" x2="17" y2="15" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="17" y1="9" x2="23" y2="15" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
            <div class="relative flex items-center justify-center" style="height: 64px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: #0A0F1A;">o pedido</span>
            </div>
          </div>

          <!-- Grade de fotos: cada uma com seu polaroid -->
          <div class="grid grid-cols-2 gap-4">
            <div class="polaroid flex flex-col">
              <img loading="lazy" :src="img('ped1.jpeg')" alt="" class="w-full h-auto block" />
              <div class="flex items-center justify-center" style="height: 48px;" />
            </div>
            <div class="polaroid flex flex-col">
              <img loading="lazy" :src="img('ped2.jpeg')" alt="" class="w-full h-auto block" />
              <div class="flex items-center justify-center" style="height: 48px;" />
            </div>
            <div class="polaroid flex flex-col">
              <img loading="lazy" :src="img('ped3.jpeg')" alt="" class="w-full h-auto block" />
              <div class="flex items-center justify-center" style="height: 48px;" />
            </div>
            <div class="polaroid flex flex-col">
              <img loading="lazy" :src="img('ped4.jpeg')" alt="" class="w-full h-auto block" />
              <div class="flex items-center justify-center" style="height: 48px;" />
            </div>
          </div>

        </div>
      </Transition>

    </div>

  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useGsapAnimations } from '~/composables/useGsapAnimations'
import { useMedia } from '~/composables/useMedia'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

defineOptions({ name: 'GallerySection2' })

const headerRef   = ref<HTMLElement | null>(null)
const videoRef    = ref<HTMLVideoElement | null>(null)
const cardVisible = ref(false)
const isPlaying   = ref(false)
const isMuted     = ref(false)

const { fadeInUp } = useGsapAnimations()
const { img } = useMedia()

function reveal() {
  cardVisible.value = true
  videoRef.value?.play()
  isPlaying.value = true
}

function togglePlay() {
  if (!videoRef.value) return
  if (videoRef.value.paused) {
    videoRef.value.play()
    isPlaying.value = true
  } else {
    videoRef.value.pause()
    isPlaying.value = false
  }
}

function toggleMute() {
  if (!videoRef.value) return
  videoRef.value.muted = !videoRef.value.muted
  isMuted.value = videoRef.value.muted
}

onMounted(() => {
  fadeInUp(headerRef.value)
})
</script>

<style scoped>
.reveal-enter-active {
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.reveal-enter-from {
  opacity: 0;
  transform: scale(0.85);
}
.ctrl-enter-active,
.ctrl-leave-active {
  transition: opacity 0.2s ease;
}
.ctrl-enter-from,
.ctrl-leave-to {
  opacity: 0;
}
</style>
