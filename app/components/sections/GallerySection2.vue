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
        @click="cardVisible = true"
      >
        Revelar
      </button>

      <!-- Vídeo + fotos -->
      <Transition name="reveal">
        <div v-if="cardVisible" class="w-full flex flex-col gap-10">

          <!-- Polaroid: vídeo -->
          <div class="polaroid w-full flex flex-col">
            <video
              :src="vid('momento.mp4')"
              class="w-full h-auto block"
              controls
              preload="metadata"
            />
            <div class="relative flex items-center justify-center" style="height: 64px;">
              <span style="font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: #0A0F1A;">o pedido</span>
            </div>
          </div>

          <!-- Grade de fotos: cada uma com seu polaroid -->
          <div class="grid grid-cols-2 gap-4">
            <div class="polaroid flex flex-col">
              <img :src="img('ped1.jpeg')" alt="" class="w-full h-auto block" />
              <div class="flex items-center justify-center" style="height: 48px;" />
            </div>
            <div class="polaroid flex flex-col">
              <img :src="img('ped2.jpeg')" alt="" class="w-full h-auto block" />
              <div class="flex items-center justify-center" style="height: 48px;" />
            </div>
            <div class="polaroid flex flex-col">
              <img :src="img('ped3.jpeg')" alt="" class="w-full h-auto block" />
              <div class="flex items-center justify-center" style="height: 48px;" />
            </div>
            <div class="polaroid flex flex-col">
              <img :src="img('ped4.jpeg')" alt="" class="w-full h-auto block" />
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

const headerRef  = ref<HTMLElement | null>(null)
const cardVisible = ref(false)

const { fadeInUp } = useGsapAnimations()
const { img, vid } = useMedia()

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
</style>
