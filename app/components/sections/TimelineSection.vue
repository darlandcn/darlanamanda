<template>
  <section
    id="section-timeline"
    data-section="timeline"
    class="section-base min-h-screen bg-abyss relative py-24"
  >
    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent opacity-20" />

    <div class="relative z-10 w-full max-w-3xl mx-auto px-6">
      <!-- Cabeçalho -->
      <div ref="headerRef" class="text-center mb-20">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-300 mb-3">Capítulo II</p>
        <h2 class="font-serif text-4xl md:text-5xl text-ivory">
          Nossa linha<br />
          <span class="italic text-gradient-gold">do tempo</span>
        </h2>
        <p class="mt-5 text-sm text-ivory-200 leading-relaxed">
          E depois daqueles dias na estância tivemos vários momentos
        </p>
      </div>

      <!-- Linha vertical central -->
      <div
        ref="timelineLineRef"
        aria-hidden="true"
        class="timeline-axis absolute left-1/2 -translate-x-1/2 top-52 bottom-24 w-px
               bg-gradient-to-b from-abyss-400 via-slate-600 to-transparent opacity-30"
      />

      <!-- Eventos -->
      <div class="relative space-y-16">
        <div
          v-for="(event, index) in placeholderEvents"
          :key="event.id"
          ref="eventsRefs"
          data-gsap="timeline-item"
          class="timeline-item relative grid grid-cols-[1fr_auto_1fr] gap-4 items-start"
        >
          <!-- Conteúdo esquerdo (índices pares) -->
          <div
            :class="[
              'timeline-content',
              index % 2 === 0 ? 'text-right pr-4' : 'opacity-0 pointer-events-none',
            ]"
          >
            <template v-if="index % 2 === 0">
              <span class="text-xs text-slate-400 tracking-widest uppercase">{{ event.date }}</span>
              <h3 class="font-serif text-xl text-ivory mt-1 mb-2">{{ event.title }}</h3>
              <p class="text-sm text-ivory-200 leading-relaxed">{{ event.description }}</p>
            </template>
          </div>

          <!-- Ponto central -->
          <div class="flex flex-col items-center pt-1">
            <div
              class="w-3 h-3 rounded-full border-2 border-slate-400 bg-abyss shadow-[0_0_12px_rgba(148,163,184,0.2)]"
            />
          </div>

          <!-- Conteúdo direito (índices ímpares) -->
          <div
            :class="[
              'timeline-content',
              index % 2 !== 0 ? 'text-left pl-4' : 'opacity-0 pointer-events-none',
            ]"
          >
            <template v-if="index % 2 !== 0">
              <span class="text-xs text-slate-400 tracking-widest uppercase">{{ event.date }}</span>
              <h3 class="font-serif text-xl text-ivory mt-1 mb-2">{{ event.title }}</h3>
              <p class="text-sm text-ivory-200 leading-relaxed">{{ event.description }}</p>
            </template>
          </div>
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
import type { TimelineEvent } from '~/../../shared/types/index'

defineOptions({ name: 'TimelineSection' })

const headerRef       = ref<HTMLElement | null>(null)
const timelineLineRef = ref<HTMLElement | null>(null)
const eventsRefs      = ref<HTMLElement[]>([])

const { fadeInUp } = useGsapAnimations()

const placeholderEvents: (TimelineEvent & { id: number })[] = [
  { id: 1, date: 'Mês, Ano', title: 'O primeiro encontro',  description: 'Descreva aqui como foi o momento em que tudo começou.' },
  { id: 2, date: 'Mês, Ano', title: 'Nossa primeira viagem', description: 'Um lugar especial que ficou gravado em nossos corações.' },
  { id: 3, date: 'Mês, Ano', title: 'Um dia inesquecível',   description: 'Aquele dia que nos surpreendeu e ficou na memória para sempre.' },
  { id: 4, date: 'Mês, Ano', title: 'Mais um capítulo',      description: 'Cada nova página da nossa história é mais bonita que a anterior.' },
  { id: 5, date: 'Hoje',     title: 'E a história continua', description: 'O melhor ainda está por vir, e quero viver cada momento ao seu lado.' },
]

onMounted(() => {
  fadeInUp(headerRef.value)

  gsap.fromTo(
    timelineLineRef.value,
    { scaleY: 0, transformOrigin: 'top' },
    {
      scaleY: 1,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: timelineLineRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    },
  )

  eventsRefs.value.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      },
    )
  })
})
</script>
