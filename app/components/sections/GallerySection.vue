<template>
  <section
    id="section-gallery"
    data-section="gallery"
    class="section-base min-h-screen bg-abyss-100 relative py-24"
  >
    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-20" />

    <div class="relative z-10 w-full max-w-lg mx-auto px-6">
      <!-- Cabeçalho -->
      <div ref="headerRef" class="text-center mb-16">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-300 mb-3">Capítulo III</p>
        <h2 class="font-serif text-4xl md:text-5xl text-ivory">
          Memórias em<br />
          <span class="italic text-gradient-gold">imagens</span>
        </h2>
        <p class="mt-6 text-base md:text-lg text-ivory/50 max-w-xl mx-auto leading-relaxed">
          O ano começou como eu mais queria, tendo você do meu lado.<br />
          E a partir daí, várias memórias inesquecíveis.
        </p>
      </div>

      <!-- Flip cards -->
      <div ref="gridRef" class="flex flex-col gap-8 items-center">
        <div
          v-for="(item, index) in galleryItems"
          :key="item.id"
          ref="itemsRefs"
          class="flip-card w-full aspect-square cursor-pointer"
          @click="item.flipped = !item.flipped"
        >
          <div class="flip-card-inner" :class="{ flipped: item.flipped }">

            <!-- Frente: foto -->
            <div class="flip-card-face rounded-2xl overflow-hidden">
              <img
                :src="item.src"
                :alt="item.caption"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Verso: carta -->
            <div class="flip-card-face flip-card-back rounded-2xl overflow-hidden bg-[#f7f2e8]">
              <div class="absolute inset-x-4 top-4 bottom-4 pointer-events-none z-0 flex flex-col justify-between">
                <div v-for="n in 18" :key="n" class="h-px bg-[#d6cdb8]/70" />
              </div>
              <div class="relative z-10 h-full px-5 py-5 overflow-hidden">
                <p class="font-caveat text-[#3a2e1e] text-[19px] leading-[1.45] whitespace-pre-line">{{ item.letter }}</p>
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

defineOptions({ name: 'GallerySection' })

const headerRef = ref<HTMLElement | null>(null)
const gridRef   = ref<HTMLElement | null>(null)
const itemsRefs = ref<HTMLElement[]>([])

const { fadeInUp } = useGsapAnimations()

const galleryItems = reactive([
  {
    id: 1,
    src: '/images/mem1.jpeg',
    caption: 'Memória 1',
    flipped: false,
    letter: `Texto da carta 1...`,
  },
  {
    id: 2,
    src: '/images/mem2.jpeg',
    caption: 'Memória 2',
    flipped: false,
    letter: `Texto da carta 2...`,
  },
  {
    id: 3,
    src: '/images/mem3.jpeg',
    caption: 'Memória 3',
    flipped: false,
    letter: `Texto da carta 3...`,
  },
  {
    id: 4,
    src: '/images/mem4.jpeg',
    caption: 'Memória 4',
    flipped: false,
    letter: `Texto da carta 4...`,
  },
  {
    id: 5,
    src: '/images/mem5.jpeg',
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
      scrollTrigger: {
        trigger: gridRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
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
