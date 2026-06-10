<template>
  <section
    id="section-stars"
    data-section="stars"
    class="section-base min-h-screen relative overflow-hidden"
    style="background: linear-gradient(180deg, #0A0A0A 0%, #080808 50%, #0A0A0A 100%)"
  >
    <!-- Campo de estrelas (canvas) -->
    <canvas
      ref="canvasRef"
      aria-hidden="true"
      class="absolute inset-0 w-full h-full pointer-events-none"
    />

    <!-- Via láctea — gradiente decorativo -->
    <div
      aria-hidden="true"
      class="absolute inset-0 pointer-events-none opacity-8"
      style="background: linear-gradient(35deg, transparent 20%, rgba(148,163,184,0.04) 50%, transparent 80%)"
    />

    <div class="relative z-10 text-center max-w-2xl mx-auto px-6">
      <p ref="eyebrowRef" class="text-xs uppercase tracking-[0.3em] text-slate-300 mb-4">
        Capítulo V
      </p>
      <h2 ref="titleRef" class="font-serif text-4xl md:text-6xl text-ivory mb-6 leading-tight">
        Sob o mesmo<br />
        <span class="italic text-gradient-gold">céu estrelado</span>
      </h2>
      <p ref="textRef" class="text-ivory-200 leading-relaxed max-w-md mx-auto">
        Não importa onde estejamos, olhamos para o mesmo céu.
        Cada estrela é uma memória que compartilhamos juntos.
      </p>

      <!-- Contador decorativo -->
      <div ref="counterRef" class="mt-12 flex items-center justify-center gap-12">
        <div class="text-center">
          <p class="font-serif text-3xl text-slate-200">∞</p>
          <p class="text-xs text-ivory-200 mt-1 tracking-widest uppercase">Momentos</p>
        </div>
        <div class="w-px h-10 bg-abyss-300" />
        <div class="text-center">
          <p class="font-serif text-3xl text-slate-300">1</p>
          <p class="text-xs text-ivory-200 mt-1 tracking-widest uppercase">Amor</p>
        </div>
        <div class="w-px h-10 bg-abyss-300" />
        <div class="text-center">
          <p class="font-serif text-3xl text-slate-200">2</p>
          <p class="text-xs text-ivory-200 mt-1 tracking-widest uppercase">Corações</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsapAnimations } from '~/composables/useGsapAnimations'

defineOptions({ name: 'StarsSection' })

const canvasRef  = ref<HTMLCanvasElement | null>(null)
const eyebrowRef = ref<HTMLElement | null>(null)
const titleRef   = ref<HTMLElement | null>(null)
const textRef    = ref<HTMLElement | null>(null)
const counterRef = ref<HTMLElement | null>(null)

const { fadeInUp, staggerFadeIn } = useGsapAnimations()

let animFrameId: number | null = null

interface Star {
  x: number
  y: number
  r: number
  opacity: number
  speed: number
  phase: number
}

function initStarfield() {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx    = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()

  const STAR_COUNT = 200
  const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
    x:       Math.random() * canvas.width,
    y:       Math.random() * canvas.height,
    r:       Math.random() * 1.5 + 0.3,
    opacity: Math.random() * 0.6 + 0.1,
    speed:   Math.random() * 0.4 + 0.1,
    phase:   Math.random() * Math.PI * 2,
  }))

  let t = 0
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    t += 0.008

    stars.forEach((s) => {
      const twinkle = s.opacity * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase))
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(245, 245, 245, ${twinkle})`
      ctx.fill()
    })

    animFrameId = requestAnimationFrame(draw)
  }
  draw()

  window.addEventListener('resize', resize)
}

onMounted(() => {
  initStarfield()

  const st = { trigger: '#section-stars', start: 'top 80%', toggleActions: 'play none none none' }

  gsap.fromTo(
    [eyebrowRef.value, titleRef.value, textRef.value],
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: st },
  )
  gsap.fromTo(
    counterRef.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power2.out', scrollTrigger: st },
  )
})

onUnmounted(() => {
  if (animFrameId !== null) cancelAnimationFrame(animFrameId)
})
</script>
