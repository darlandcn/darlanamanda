<template>
  <div style="position: relative; width: 100%; height: 100dvh; overflow: hidden; background: #0A0F1A;">

    <div style="
      position: fixed;
      top: 16px;
      left: 16px;
      right: 16px;
      z-index: 50;
      display: flex;
      gap: 4px;
    ">
      <div
        v-for="(_, i) in sections"
        :key="i"
        style="
          flex: 1;
          height: 2px;
          border-radius: 2px;
          background: rgba(226,232,240,0.10);
          overflow: hidden;
        "
      >
        <div
          :style="{
            height: '100%',
            borderRadius: '2px',
            background: 'linear-gradient(90deg, #CBD5E1, #F8FAFC)',
            width: i <= currentIndex ? '100%' : '0%',
            transition: 'width 0.4s ease',
          }"
        />
      </div>
    </div>

    <!-- Iniciais -->
    <div style="
      position: fixed;
      top: 28px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Pier Sans';
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.15em;
      color: rgba(248,250,252,0.6);
    ">
      <span>D</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="color: rgba(248,250,252,0.6)">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <span>A</span>
    </div>

    <!-- Container dos slides -->
    <div
      ref="sliderRef"
      style="
        position: relative;
        width: 100%;
        height: 100%;
      "
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div
        v-for="(section, i) in sections"
        :key="section.name"
        :ref="el => { if (el) slideRefs[i] = el as HTMLElement }"
        :style="{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          transform: `translateX(${(i - currentIndex) * 100}%)`,
          transition: 'none',
        }"
      >
        <component
          :is="section.component"
          v-bind="section.name === 'hero' ? { showSwipeHint: showSwipeHint } : {}"
          @next="goNext"
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, markRaw, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useRouter } from 'vue-router'

import HeroSection     from '~/components/sections/HeroSection.vue'
import IntroSection    from '~/components/sections/IntroSection.vue'
import TimelineSection from '~/components/sections/TimelineSection.vue'
import GallerySection  from '~/components/sections/GallerySection.vue'
import GallerySection2  from '~/components/sections/GallerySection2.vue'
import CounterSection   from '~/components/sections/CounterSection.vue'
import LettersSection   from '~/components/sections/LettersSection.vue'

definePageMeta({ ssr: false })
defineOptions({ name: 'NossaHistoriaPage' })

const router = useRouter()

const sections = [
  { name: 'hero',     component: markRaw(HeroSection) },
  { name: 'intro',    component: markRaw(IntroSection) },
  { name: 'timeline', component: markRaw(TimelineSection) },
  { name: 'gallery',   component: markRaw(GallerySection) },
  { name: 'gallery-2', component: markRaw(GallerySection2) },
  { name: 'counter',   component: markRaw(CounterSection) },
  { name: 'letters',   component: markRaw(LettersSection) },
]

const currentIndex   = ref(0)
const slideRefs      = ref<HTMLElement[]>([])
const isAnimating    = ref(false)
const showSwipeHint  = ref(true)

async function goNext() {
  showSwipeHint.value = false

  if (isAnimating.value) return

  if (currentIndex.value >= sections.length - 1) {
    await gsap.to(slideRefs.value[currentIndex.value], {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
    })
    router.push('/')
    return
  }

  isAnimating.value = true

  const current = slideRefs.value[currentIndex.value]
  const next    = slideRefs.value[currentIndex.value + 1]

  gsap.set(next, { x: '100%', opacity: 1 })

  await Promise.all([
    gsap.to(current, { x: '-100%', duration: 0.6, ease: 'power2.inOut' }),
    gsap.fromTo(next, { x: '100%' }, { x: '0%', duration: 0.6, ease: 'power2.inOut' }),
  ])

  currentIndex.value++
  isAnimating.value = false
}

async function goPrev() {
  if (isAnimating.value || currentIndex.value === 0) return
  isAnimating.value = true

  const current = slideRefs.value[currentIndex.value]
  const prev    = slideRefs.value[currentIndex.value - 1]

  gsap.set(prev, { x: '-100%' })

  await Promise.all([
    gsap.to(current, { x: '100%', duration: 0.6, ease: 'power2.inOut' }),
    gsap.fromTo(prev, { x: '-100%' }, { x: '0%', duration: 0.6, ease: 'power2.inOut' }),
  ])

  currentIndex.value--
  isAnimating.value = false
}

let touchStartX = 0
let touchStartY = 0

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function onTouchEnd(e: TouchEvent) {
  const deltaX = touchStartX - e.changedTouches[0].clientX
  const deltaY = Math.abs(touchStartY - e.changedTouches[0].clientY)

  if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
    if (deltaX > 0) goNext()
    else goPrev()
  }
}

onMounted(() => {
  if (!sessionStorage.getItem('granted')) {
    router.push('/')
  }

})
</script>

<style scoped>
.hint-fade-leave-active {
  transition: opacity 0.4s ease;
}
.hint-fade-leave-to {
  opacity: 0;
}
</style>
