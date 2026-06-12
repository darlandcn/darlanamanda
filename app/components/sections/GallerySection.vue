<template>
  <section
    id="section-gallery"
    data-section="gallery"
    class="section-base min-h-screen relative flex flex-col"
    style="background: transparent;"
  >
    <ParticlesBackground id="gallery-particles" />

    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,232,240,0.18)] to-transparent opacity-60" />

    <!-- Label + Título -->
    <div ref="headerRef" class="relative z-10 w-full max-w-lg mx-auto px-6 pt-[7.5rem] space-y-3 text-center">
      <p class="text-xs uppercase tracking-[0.3em] text-ink-muted font-semibold text-center">Capítulo III</p>
      <h2 class="font-serif text-4xl md:text-5xl text-ink leading-none text-center">
        Melhores<br />
        <span class="text-gradient-gold">momentos</span>
      </h2>
    </div>

    <!-- Texto -->
    <div class="relative z-10 w-full max-w-lg mx-auto px-6 mt-16 mb-16 text-left">
      <p class="text-base md:text-lg text-ink-light leading-relaxed">
        Depois que as coisas se acertaram, nós iniciamos a melhor fase dessa nossa história e a melhor da minha vida, com momentos únicos.
      </p>
    </div>

    <div class="relative z-10 w-full max-w-lg mx-auto px-6 flex-1 pb-24">
      <!-- Flip cards -->
      <div ref="gridRef" class="flex flex-col gap-10 items-center">
        <div
          v-for="item in galleryItems"
          :key="item.id"
          ref="itemsRefs"
          class="flip-card w-full aspect-square cursor-pointer"
          @click="item.flipped = !item.flipped"
        >
          <div class="flip-card-inner" :class="{ flipped: item.flipped }">

            <!-- Frente: polaroid -->
            <div class="flip-card-face polaroid rounded-none overflow-visible">
              <img
                :src="item.src"
                :alt="item.caption"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Verso: carta manuscrita -->
            <div class="flip-card-face flip-card-back overflow-hidden"
                 style="border-radius: 2px; background: #1E293B; border: 1px solid rgba(226,232,240,0.12); box-shadow: 0 0 40px rgba(226,232,240,0.08);">
              <div class="absolute inset-x-4 top-4 bottom-4 pointer-events-none z-0 flex flex-col justify-between">
                <div v-for="n in 18" :key="n" class="h-px bg-[rgba(226,232,240,0.10)]" />
              </div>
              <div class="relative z-10 h-full px-5 py-5 overflow-hidden">
                <p class="font-caveat text-[#F8FAFC] text-[19px] leading-[1.45] whitespace-pre-line">{{ item.letter }}</p>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useGsapAnimations } from '~/composables/useGsapAnimations'
import { useMedia } from '~/composables/useMedia'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

defineOptions({ name: 'GallerySection' })

const headerRef = ref<HTMLElement | null>(null)
const itemsRefs = ref<HTMLElement[]>([])

const { fadeInUp } = useGsapAnimations()

const { img } = useMedia()

const galleryItems = reactive([
  {
    id: 1,
    src: img('mem1.jpeg'),
    caption: 'Memória 1',
    flipped: false,
    letter: `Texto da carta 1...`,
  },
  {
    id: 4,
    src: img('mem4.jpeg'),
    caption: 'Memória 4',
    flipped: false,
    letter: `Texto da carta 4...`,
  },
  {
    id: 2,
    src: img('mem2.jpeg'),
    caption: 'Memória 2',
    flipped: false,
    letter: `Texto da carta 2...`,
  },
  {
    id: 3,
    src: img('mem3.jpeg'),
    caption: 'Memória 3',
    flipped: false,
    letter: `Texto da carta 3...`,
  },
  {
    id: 5,
    src: img('mem5.jpeg'),
    caption: 'Memória 5',
    flipped: false,
    letter: `Texto da carta 5...`,
  },
])

onMounted(() => {
  fadeInUp(headerRef.value)

  gsap.fromTo(
    itemsRefs.value,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: { amount: 0.8, from: 'start' },
      ease: 'power3.out',
      delay: 0.3,
    },
  )
})
</script>

<style scoped>
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
</style>
