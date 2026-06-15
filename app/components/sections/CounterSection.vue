<template>
  <section
    id="section-counter"
    data-section="counter"
    class="section-base relative flex flex-col justify-center overflow-hidden"
    style="min-height: 100dvh; background: transparent;"
  >
    <ParticlesBackground id="counter-particles" />

    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,232,240,0.18)] to-transparent opacity-60" />

    <!-- Label + Título -->
    <div ref="headerRef" class="relative z-10 w-full max-w-lg mx-auto px-6 space-y-3 text-center">
      <div class="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-ink-muted"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
      </div>
      <h2 class="font-serif text-4xl md:text-5xl text-ink leading-none text-center">
        Contando<br />
        <span class="text-gradient-gold">cada segundo</span>
      </h2>
    </div>

    <!-- Texto -->
    <div class="relative z-10 w-full max-w-lg mx-auto px-6 my-8 text-center">
      <p class="text-base md:text-lg text-ink-light leading-relaxed">
        Desde o primeiro beijo até aqui<br />já se passaram:
      </p>
    </div>

    <!-- Contador -->
    <div ref="counterRef" class="relative z-10 w-full max-w-lg mx-auto px-6">
      <div style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 0;
        row-gap: 20px;
        width: 100%;
        max-width: 360px;
        margin: 0 auto;
      ">
        <div
          v-for="(item, index) in units"
          :key="item.label"
          :style="{
            background: 'transparent',
            padding: '12px 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            borderRight: index % 3 !== 2 ? '1px solid rgba(226,232,240,0.12)' : 'none',
          }"
        >
          <span style="
            font-family: 'Pier Sans', sans-serif;
            font-size: 2.4rem;
            font-weight: 700;
            color: #F0EBE0;
            line-height: 1;
            letter-spacing: -0.02em;
            font-variant-numeric: tabular-nums;
          ">{{ item.value }}</span>
          <span style="
            font-family: 'Inter', sans-serif;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #CBD5E1;
          ">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- Texto abaixo do contador -->
    <div ref="footerRef" class="relative z-10 w-full max-w-lg mx-auto px-6 mt-8 text-center">
      <p class="text-base md:text-lg text-ink-light leading-relaxed">
        E ainda temos um "sempre" pela frente.
      </p>
    </div>

  </section>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

defineOptions({ name: 'CounterSection' })

const props = defineProps<{ isActive?: boolean }>()

const headerRef  = ref<HTMLElement | null>(null)
const counterRef = ref<HTMLElement | null>(null)
const footerRef  = ref<HTMLElement | null>(null)
const animPlayed = ref(false)

const START_DATE = new Date(2026, 1, 2)
const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

const pad = (n: number) => String(n).padStart(2, '0')

const diff = computed(() => {
  const n = now.value
  let years  = n.getFullYear() - START_DATE.getFullYear()
  let months = n.getMonth()    - START_DATE.getMonth()
  let days   = n.getDate()     - START_DATE.getDate()
  if (days < 0)   { months--; days += new Date(n.getFullYear(), n.getMonth(), 0).getDate() }
  if (months < 0) { years--;  months += 12 }
  return { years, months, days, hours: n.getHours(), minutes: n.getMinutes(), seconds: n.getSeconds() }
})

const units = computed(() => [
  { label: 'Anos',     value: pad(diff.value.years) },
  { label: 'Meses',    value: pad(diff.value.months) },
  { label: 'Dias',     value: pad(diff.value.days) },
  { label: 'Horas',    value: pad(diff.value.hours) },
  { label: 'Minutos',  value: pad(diff.value.minutes) },
  { label: 'Segundos', value: pad(diff.value.seconds) },
])

onMounted(() => {
  gsap.set([counterRef.value, footerRef.value], { opacity: 0, y: 40 })
  timer = setInterval(() => { now.value = new Date() }, 1000)
})

watch(() => props.isActive, (active) => {
  if (!active || animPlayed.value) return
  animPlayed.value = true
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo([counterRef.value, footerRef.value], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 })
})

onUnmounted(() => { clearInterval(timer) })
</script>
