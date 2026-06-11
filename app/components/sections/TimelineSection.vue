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
          Hoje eu reconheço que o Senhor precisou nos separar, e depois de muita oração, depois de muito tempo, graças a Deus, Ele nos uniu.
          <br /><br />
          E aí se iniciou a segunda fase da nossa história que também não foi de tudo fácil.
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
          <!-- Coluna esquerda: texto (par) ou imagem (ímpar) -->
          <div :class="['flex flex-col', index % 2 === 0 ? 'text-right pr-4 items-end' : 'items-end justify-center pr-4']">
            <template v-if="index % 2 === 0">
              <span class="text-xs text-slate-400 tracking-widest uppercase">{{ event.date }}</span>
              <h3 class="font-serif text-xl text-ivory mt-1 mb-2">{{ event.title }}</h3>
              <p class="text-sm text-ivory-200 leading-relaxed">{{ event.description }}</p>
            </template>
            <template v-else-if="event.image">
              <button type="button" class="focus:outline-none" @click="lightboxSrc = event.image ?? null">
                <img
                  :src="event.image"
                  :alt="event.title"
                  class="w-full rounded-lg opacity-85 cursor-pointer hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </template>
          </div>

          <!-- Ponto central -->
          <div class="flex flex-col items-center pt-1">
            <div
              class="w-3 h-3 rounded-full border-2 border-slate-400 bg-abyss shadow-[0_0_12px_rgba(148,163,184,0.2)]"
            />
          </div>

          <!-- Coluna direita: imagem (par) ou texto (ímpar) -->
          <div :class="['flex flex-col', index % 2 !== 0 ? 'text-left pl-4' : 'items-start justify-center pl-4']">
            <template v-if="index % 2 !== 0">
              <span class="text-xs text-slate-400 tracking-widest uppercase">{{ event.date }}</span>
              <h3 class="font-serif text-xl text-ivory mt-1 mb-2">{{ event.title }}</h3>
              <p class="text-sm text-ivory-200 leading-relaxed">{{ event.description }}</p>
            </template>
            <template v-else-if="event.image">
              <button type="button" class="focus:outline-none" @click="lightboxSrc = event.image ?? null">
                <img
                  :src="event.image"
                  :alt="event.title"
                  class="w-full rounded-lg opacity-85 cursor-pointer hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="lightbox">
      <div
        v-if="lightboxSrc"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div class="absolute inset-0 bg-black/95 backdrop-blur-sm" @click="lightboxSrc = null" />

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
          class="relative z-10 max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
        />
      </div>
    </Transition>
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
const lightboxSrc     = ref<string | null>(null)

const { fadeInUp } = useGsapAnimations()

const placeholderEvents: (TimelineEvent & { id: number })[] = [
  { id: 1, date: '26 Abr', title: 'O Recomeço', description: 'Uma mensagem que pra você não era nada demais, mas pra mim era uma resposta do Senhor.', image: '/images/evento1.jpeg' },
  { id: 2, date: '15 Jun', title: 'A ligação mais aguardada', description: 'Só de lembrar consigo sentir o quanto estava ansioso com essa ligação e o quanto eu saí aliviado dela. Afinal, não é todo o dia que as pessoas são correspondidas quando expressam seus sentimentos.', image: '/images/evento2.jpeg' },
  { id: 3, date: '17 Jun', title: 'As provações', description: 'E dois dias depois os irmãos nos deram essa direção. A partir dai não foi nada fácil, mas tinhamos clareza de que essa direção vinha do Senhor.', image: '/images/evento3.jpeg' },
  { id: 4, date: 'Jun – Dez', title: '', description: 'Passamos 6 meses assim, virando a noite, ajustando horários pra conseguir conversar, conseguir ligar, muitas comunhões, algumas incertezas, esperando o momento em que nos veríamos pessoalmente.', image: '/images/evento4.jpeg' },
  { id: 5, date: '15 Jan', title: 'O Reencontro', description: 'E finalmente nos reencontramos, conversamos, e desde ali eu já tinha certeza que você era e seria minha prioridade.', image: '/images/evento5.jpeg' },
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
