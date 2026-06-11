<template>
  <main id="nossa-historia" ref="pageRef" class="relative bg-abyss">
    <HeroSection />
    <IntroSection />
    <TimelineSection />
    <GallerySection />
    <LettersSection />
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHead } from '#app'

import HeroSection     from '~/components/sections/HeroSection.vue'
import IntroSection    from '~/components/sections/IntroSection.vue'
import TimelineSection from '~/components/sections/TimelineSection.vue'
import GallerySection  from '~/components/sections/GallerySection.vue'
import LettersSection  from '~/components/sections/LettersSection.vue'

defineOptions({ name: 'NossaHistoriaPage' })

useHead({
  title: 'Nossa História',
  meta: [{ name: 'description', content: 'Uma história de amor contada em capítulos.' }],
})

const pageRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // Entrada suave da página
  gsap.fromTo(
    pageRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: 'power2.out' },
  )

  // Força o ScrollTrigger a recalcular após o mount
  ScrollTrigger.refresh()
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
