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
          class="polaroid w-full flex flex-col"
        >
          <img
            v-if="item.src"
            :src="item.src"
            :alt="item.label"
            loading="lazy"
            class="w-full h-auto block"
          />
          <div
            v-else
            class="w-full flex items-center justify-center"
            style="height: 280px; background: #E2E8F0;"
          />
          <div class="relative flex flex-col items-center justify-center" :style="{ height: item.label2 ? '76px' : '64px' }">
            <span style="font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: #0A0F1A;">{{ item.label }}</span>
            <span v-if="item.label2" style="font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: #0A0F1A;">{{ item.label2 }}</span>
            <span style="position: absolute; right: 10px; bottom: 4px; font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 300; letter-spacing: 0.08em; color: #94A3B8;">{{ item.date }}</span>
          </div>
        </div>

      </div>


    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { gsap } from 'gsap'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

defineOptions({ name: 'BestMomentsSection' })

const props = defineProps<{ isActive?: boolean }>()

const headerRef  = ref<HTMLElement | null>(null)
const itemsRefs  = ref<HTMLElement[]>([])
const animPlayed = ref(false)

const galleryItems = [
  { id: 1, src: '/images/memo1.jpeg',   label: 'nosso primeiro beijo',              date: '02 fev 2026' },
  { id: 2, src: '/images/memo2.jpeg', label: 'a benção dos seus pais', date: '15 fev 2026' },
  { id: 3, src: '/images/memo3.jpeg',  label: 'primeiro café em casa com meus pais', date: '17 fev 2026' },
  { id: 4, src: '/images/memo4.jpeg',  label: 'primeiro não encontro',              date: '22 fev 2026' },
  { id: 5, src: '/images/memo5.jpeg',  label: 'sua primeira vez lá em casa',        date: '08 mar 2026' },
  { id: 6, src: '/images/memo6.jpeg',  label: 'primeira foto de familia',           date: '28 mar 2026' },
  { id: 7, src: '/images/memo7.jpeg',  label: 'primeira viagem juntos',             date: '01 mai 2026' },
  { id: 8, src: '/images/memo8.jpeg',  label: 'minha primeira vez na sua casa',     date: '23 mai 2026' },
  { id: 9, src: '/images/memo9.jpeg',  label: 'visita ao nosso possivel ap',        date: '30 mai 2026' },
  { id: 10, src: '/images/memo10.jpeg', label: 'Primeiro dia dos namorados +', label2: 'primeiro jogo da copa', date: '12/13 jun 2026' },
]

onMounted(() => {
  gsap.set(itemsRefs.value, { opacity: 0, y: 40 })
})

watch(() => props.isActive, (active) => {
  if (!active || animPlayed.value) return
  animPlayed.value = true
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.fromTo(itemsRefs.value, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 })
})
</script>

