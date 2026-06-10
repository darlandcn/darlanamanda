<template>
  <section
    id="section-gallery"
    data-section="gallery"
    class="section-base min-h-screen bg-abyss-100 relative py-24"
  >
    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-20" />

    <div class="relative z-10 w-full max-w-6xl mx-auto px-6">
      <!-- Cabeçalho -->
      <div ref="headerRef" class="text-center mb-16">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-300 mb-3">Capítulo III</p>
        <h2 class="font-serif text-4xl md:text-5xl text-ivory">
          Memórias em<br />
          <span class="italic text-gradient-gold">imagens</span>
        </h2>
      </div>

      <!-- Grid de galeria -->
      <div ref="gridRef" class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <div
          v-for="item in galleryItems"
          :key="item.id"
          ref="itemsRefs"
          data-gsap="gallery-item"
          class="gallery-item group relative overflow-hidden rounded-xl cursor-pointer"
          :class="item.featured ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'"
        >
          <!-- Placeholder de imagem -->
          <div
            class="absolute inset-0 flex items-center justify-center
                   transition-transform duration-500 ease-smooth
                   group-hover:scale-105"
            :style="{ background: item.gradient }"
          >
            <div class="text-center space-y-2 opacity-40">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="mx-auto text-white">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
                <path d="M3 16l5-5 4 4 3-3 6 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
              </svg>
              <p class="text-xs text-white tracking-wide">{{ item.caption }}</p>
            </div>
          </div>

          <!-- Overlay hover -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-abyss/80 via-transparent to-transparent
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
          >
            <p class="text-xs text-ivory tracking-wide">{{ item.caption }}</p>
          </div>

          <!-- Borda interna decorativa -->
          <div class="absolute inset-0 rounded-xl ring-1 ring-white/5 pointer-events-none" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapAnimations } from '~/composables/useGsapAnimations'

defineOptions({ name: 'GallerySection' })

const headerRef = ref<HTMLElement | null>(null)
const gridRef   = ref<HTMLElement | null>(null)
const itemsRefs = ref<HTMLElement[]>([])

const { fadeInUp } = useGsapAnimations()

const galleryItems = [
  { id: 1, featured: true,  caption: 'Foto especial',   gradient: 'linear-gradient(135deg, #171717, #262626)' },
  { id: 2, featured: false, caption: 'Momento único',   gradient: 'linear-gradient(135deg, #111111, #171717)' },
  { id: 3, featured: false, caption: 'Lembrança',       gradient: 'linear-gradient(135deg, #0A0A0A, #111111)' },
  { id: 4, featured: false, caption: 'Memória',         gradient: 'linear-gradient(135deg, #171717, #111111)' },
  { id: 5, featured: false, caption: 'Detalhe especial',gradient: 'linear-gradient(135deg, #262626, #171717)' },
]

onMounted(() => {
  fadeInUp(headerRef.value)

  gsap.fromTo(
    itemsRefs.value,
    { opacity: 0, scale: 0.9 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: { amount: 0.6, from: 'start' },
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
