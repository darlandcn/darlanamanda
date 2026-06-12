<template>
  <section
    id="section-timeline"
    data-section="timeline"
    class="section-base min-h-screen relative flex flex-col"
    style="background: transparent;"
  >
    <ParticlesBackground id="timeline-particles" />

    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(226,232,240,0.18)] to-transparent opacity-60" />

    <!-- Label + Título -->
    <div ref="headerRef" class="relative z-10 w-full max-w-3xl mx-auto px-6 pt-[7.5rem] space-y-3 text-center">
      <p class="text-xs uppercase tracking-[0.3em] text-ink-muted font-semibold text-center">Capítulo II</p>
      <h2 class="font-serif text-4xl md:text-5xl text-ink leading-none text-center">
        Nossa linha<br />
        <span class="text-gradient-gold">do tempo</span>
      </h2>
    </div>

    <!-- Texto -->
    <div class="relative z-10 w-full max-w-3xl mx-auto px-6 mt-16 mb-16 text-left">
      <p class="text-sm text-ink-light leading-relaxed">
        Hoje eu reconheço que o Senhor precisou nos afastar, e depois de muita oração, depois de muito tempo, Ele nos uniu.
        <br />
        E aí se iniciou o "segundo capítulo" da nossa história que também não foi de tudo fácil.
      </p>
    </div>

    <div class="relative z-10 w-full max-w-3xl mx-auto px-6 flex-1 pb-24">

      <!-- Linha vertical central -->
      <div
        ref="timelineLineRef"
        aria-hidden="true"
        class="timeline-axis absolute left-1/2 -translate-x-1/2 top-52 bottom-24 w-px
               bg-gradient-to-b from-transparent via-[rgba(226,232,240,0.18)] to-transparent opacity-60"
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
          <!-- Coluna esquerda: texto (par) ou imagem (ímpar) -->
          <div :class="['flex flex-col', index % 2 === 0 ? 'text-right pr-4 items-end' : 'items-end justify-center pr-4']">
            <template v-if="index % 2 === 0">
              <span class="text-xs text-ink-muted tracking-widest uppercase">{{ event.date }}</span>
              <h3 class="font-serif text-xl text-ink mt-1 mb-2">{{ event.title }}</h3>
              <p class="text-sm text-ink-light leading-relaxed">{{ event.description }}</p>
            </template>
            <template v-else-if="event.image">
              <button type="button" class="focus:outline-none polaroid" @click="lightboxSrc = event.image ?? null">
                <img
                  :src="event.image"
                  :alt="event.title"
                  class="w-full rounded-sm cursor-pointer hover:opacity-90 transition-opacity duration-300"
                />
              </button>
            </template>
          </div>

          <!-- Ponto central -->
          <div class="flex flex-col items-center pt-1">
            <div
              class="w-3 h-3 rounded-full border-2 border-[#F8FAFC]" style="background: #E2E8F0; box-shadow: 0 0 12px rgba(248,250,252,0.12);"
            />
          </div>

          <!-- Coluna direita: imagem (par) ou texto (ímpar) -->
          <div :class="['flex flex-col', index % 2 !== 0 ? 'text-left pl-4' : 'items-start justify-center pl-4']">
            <template v-if="index % 2 !== 0">
              <span class="text-xs text-ink-muted tracking-widest uppercase">{{ event.date }}</span>
              <h3 class="font-serif text-xl text-ink mt-1 mb-2">{{ event.title }}</h3>
              <p class="text-sm text-ink-light leading-relaxed">{{ event.description }}</p>
            </template>
            <template v-else-if="event.image">
              <button type="button" class="focus:outline-none polaroid" @click="lightboxSrc = event.image ?? null">
                <img
                  :src="event.image"
                  :alt="event.title"
                  class="w-full rounded-sm cursor-pointer hover:opacity-90 transition-opacity duration-300"
                />
              </button>
            </template>
          </div>
        </div>
      </div>

    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxSrc"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div class="absolute inset-0 bg-black/90 backdrop-blur-sm" @click="lightboxSrc = null" />

          <button
            type="button"
            class="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors bg-white/10 rounded-full p-2"
            @click="lightboxSrc = null"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>

          <img
            :src="lightboxSrc"
            class="relative z-10 max-w-full max-h-[90vh] rounded-xl object-contain"
          />
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMedia } from '~/composables/useMedia'
import ParticlesBackground from '~/components/ParticlesBackground.vue'
import type { TimelineEvent } from '~/../../shared/types/index'

gsap.registerPlugin(ScrollTrigger)

defineOptions({ name: 'TimelineSection' })

const headerRef       = ref<HTMLElement | null>(null)
const timelineLineRef = ref<HTMLElement | null>(null)
const eventsRefs      = ref<HTMLElement[]>([])
const lightboxSrc     = ref<string | null>(null)

const { img } = useMedia()

function findScroller(el: HTMLElement | null): HTMLElement | Window {
  let node = el?.parentElement ?? null
  while (node) {
    const { overflowY } = getComputedStyle(node)
    if (overflowY === 'auto' || overflowY === 'scroll') return node
    node = node.parentElement
  }
  return window
}

const placeholderEvents: (TimelineEvent & { id: number })[] = [
  { id: 1, date: '26 Abr 2025', title: 'O Recomeço', description: 'Voltamos a conversar graças a uma foto e a uma mensagem (nada tendenciosa) que pra você não era nada demais, mas que pra mim era uma resposta do Senhor.', image: img('evento1.jpeg') },
  { id: 2, date: '15 Jun 2025', title: 'A Ligação', description: 'Só de lembrar consigo sentir o quanto estava ansioso pra essa ligação e o quanto eu saí aliviado dela. Afinal, não é todo dia que as pessoas são correspondidas quando expressam seus mais profundos sentimentos.', image: img('evento2.jpeg') },
  { id: 3, date: '17 Jun 2025', title: 'As provações', description: 'Era tudo bom demais pra ser verdade... Dois dias depois os irmãos nos deram essa direção. A partir dai não foi nada fácil, mas tinhamos clareza de que essa direção vinha do Senhor.', image: img('evento3.jpeg') },
  { id: 4, date: 'Jun – Dez 2025', title: 'Os 6 meses', description: 'Passamos 6 meses assim, virando a noite, ajustando horários pra conseguir conversar, muitas comunhões, incertezas, só esperando o momento em que nos veríamos pessoalmente.', image: img('evento4.jpeg') },
  { id: 5, date: '15 Jan 2026', title: 'O Reencontro', description: 'E finalmente nos reencontramos, conversamos, e a partir dali eu já tinha certeza que você era e seria minha prioridade.', image: img('evento5.jpeg') },
]

onMounted(() => {
  const scroller = findScroller(headerRef.value)

  gsap.fromTo(
    headerRef.value,
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.value, scroller, start: 'top 82%', toggleActions: 'play none none none' },
    },
  )

  gsap.fromTo(
    timelineLineRef.value,
    { scaleY: 0, transformOrigin: 'top' },
    {
      scaleY: 1, duration: 2, ease: 'power2.inOut',
      scrollTrigger: { trigger: timelineLineRef.value, scroller, start: 'top 85%', toggleActions: 'play none none none' },
    },
  )

  eventsRefs.value.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
      {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, scroller, start: 'top 82%', toggleActions: 'play none none none' },
      },
    )
  })
})
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
