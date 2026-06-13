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
          <div class="relative flex items-center justify-center" style="height: 64px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: #0A0F1A;">{{ item.label }}</span>
            <span style="position: absolute; right: 10px; bottom: 4px; font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 300; letter-spacing: 0.08em; color: #94A3B8;">{{ item.date }}</span>
          </div>
        </div>

        <!-- Card com câmera — nosso primeiro dia dos namorados -->
        <div ref="itemsRefs" class="polaroid w-full flex flex-col">
          <input
            ref="cameraInput"
            type="file"
            accept="image/*"
            capture="environment"
            style="display: none;"
            @change="onPhotoSelected"
          />

          <div v-if="photoUrl">
            <img :src="photoUrl" alt="nosso primeiro dia dos namorados" style="width: 100%; display: block;" />
          </div>

          <button
            v-else
            type="button"
            :disabled="uploading"
            style="
              width: 100%;
              aspect-ratio: 4/3;
              background: rgba(255,255,255,0.03);
              border: 1px dashed rgba(201,169,110,0.4);
              border-radius: 8px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 12px;
              cursor: pointer;
              color: #C9A96E;
            "
            @click="cameraInput?.click()"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                stroke="#0A0F1A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="13" r="4" stroke="#0A0F1A" stroke-width="1.5"/>
            </svg>
            <span style="
              font-family: 'Inter', sans-serif;
              font-size: 0.7rem;
              letter-spacing: 0.15em;
              text-transform: uppercase;
              color: #7A7168;
            ">{{ uploading ? 'Salvando...' : 'Tirar foto agora' }}</span>
          </button>

          <p v-if="uploadError" style="color: #C9A96E; font-size: 0.75rem; margin-top: 8px; text-align: center;">
            {{ uploadError }}
          </p>

          <div class="relative flex items-center justify-center" style="height: 64px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: #0A0F1A;">nosso primeiro dia dos namorados</span>
            <span style="position: absolute; right: 10px; bottom: 4px; font-family: 'Inter', sans-serif; font-size: 0.6rem; font-weight: 300; letter-spacing: 0.08em; color: #94A3B8;">12 jun 2026</span>
          </div>
        </div>
      </div>


    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useGsapAnimations } from '~/composables/useGsapAnimations'
import { useMedia } from '~/composables/useMedia'
import { usePhotoUpload } from '~/composables/usePhotoUpload'
import ParticlesBackground from '~/components/ParticlesBackground.vue'

defineOptions({ name: 'GallerySection' })

const headerRef = ref<HTMLElement | null>(null)
const itemsRefs = ref<HTMLElement[]>([])
const cameraInput = ref<HTMLInputElement | null>(null)
const photoUrl = ref<string | null>(null)

const { uploadPhoto, uploading, error: uploadError } = usePhotoUpload()

async function onPhotoSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const url = await uploadPhoto(file)
  if (url) photoUrl.value = url
}

const { fadeInUp } = useGsapAnimations()

const { img } = useMedia()

const galleryItems = [
  { id: 1, src: img('memo1.jpeg'),   label: 'nosso primeiro beijo',              date: '02 fev 2026' },
  { id: 2, src: 'https://pupkcykrdxwgwmynjysb.supabase.co/storage/v1/object/public/media/images/memo2.jpeg', label: 'a benção dos seus pais', date: '15 fev 2026' },
  { id: 3, src: img('memo3.jpeg'),  label: 'primeiro café em casa com meus pais', date: '17 fev 2026' },
  { id: 4, src: img('memo4.jpeg'),  label: 'primeiro não encontro',              date: '22 fev 2026' },
  { id: 5, src: img('memo5.jpeg'),  label: 'sua primeira vez lá em casa',        date: '08 mar 2026' },
  { id: 6, src: img('memo6.jpeg'),  label: 'primeira foto de familia',           date: '28 mar 2026' },
  { id: 7, src: img('memo7.jpeg'),  label: 'primeira viagem juntos',             date: '01 mai 2026' },
  { id: 8, src: img('memo8.jpeg'),  label: 'minha primeira vez na sua casa',     date: '23 mai 2026' },
  { id: 9, src: img('memo9.jpeg'),  label: 'visita ao nosso possivel ap',        date: '30 mai 2026' },
]

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
      delay: 0.3,
    },
  )
})
</script>

