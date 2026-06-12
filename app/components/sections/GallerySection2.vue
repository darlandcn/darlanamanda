<template>
  <section
    id="section-gallery-2"
    data-section="gallery-2"
    class="section-base min-h-screen relative flex flex-col"
    style="background: transparent;"
  >
    <ParticlesBackground id="gallery2-particles" />

    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,232,240,0.18)] to-transparent opacity-60" />

    <!-- Título -->
    <div ref="headerRef" class="relative z-10 w-full max-w-lg mx-auto px-6 pt-[9.5rem] space-y-3 text-center">
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
    <div class="relative z-10 w-full max-w-lg mx-auto px-6 flex-1 pb-24 flex flex-col gap-4">

      <!-- Vídeo -->
      <video
        :src="vid('momento.mp4')"
        class="w-full rounded-sm"
        controls
        preload="metadata"
      />

      <!-- Grade de fotos 2x2 -->
      <div class="grid grid-cols-2 gap-2">
        <img :src="img('momento1.jpeg')" alt="" class="w-full aspect-square object-cover" />
        <img :src="img('momento2.jpeg')" alt="" class="w-full aspect-square object-cover" />
        <img :src="img('momento3.jpeg')" alt="" class="w-full aspect-square object-cover" />
        <img :src="img('momento4.jpeg')" alt="" class="w-full aspect-square object-cover" />
      </div>

    </div>

  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useGsapAnimations } from '~/composables/useGsapAnimations'
import { useMedia } from '~/composables/useMedia'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

defineOptions({ name: 'GallerySection2' })

const emit = defineEmits(['next'])

const headerRef = ref<HTMLElement | null>(null)

const { fadeInUp } = useGsapAnimations()
const { img, vid } = useMedia()

onMounted(() => {
  fadeInUp(headerRef.value)
})
</script>
