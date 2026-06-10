<template>
  <section
    id="section-intro"
    data-section="intro"
    class="section-base min-h-screen bg-night-100 relative"
  >
    <!-- Divisor superior -->
    <div aria-hidden="true" class="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-800 to-transparent opacity-40" />

    <div class="relative z-10 w-full max-w-5xl mx-auto px-6 py-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <!-- Coluna de texto -->
        <div ref="textColRef" data-gsap="fade-right" class="space-y-6">
          <p class="text-xs uppercase tracking-[0.3em] text-rose-400">
            Capítulo I
          </p>
          <h2 class="font-serif text-4xl md:text-5xl text-blush-text leading-tight">
            Onde tudo<br />
            <span class="italic text-gradient-rose">começou</span>
          </h2>
          <p class="text-blush-muted leading-relaxed">
            <!-- Placeholder — preencher com a história real -->
            Aqui começa o nosso primeiro capítulo. Um momento simples que mudou tudo,
            guardado com carinho neste espaço feito só para nós dois.
          </p>
          <p class="text-blush-muted leading-relaxed">
            Uma segunda linha de texto que complementa a narrativa com mais detalhes
            sobre como essa história começou a se desenrolar.
          </p>

          <!-- Detalhe decorativo -->
          <div class="flex items-center gap-3 pt-2">
            <div class="w-8 h-px bg-rose-700" />
            <span class="text-xs text-blush-muted tracking-widest uppercase">Nossa intro</span>
          </div>
        </div>

        <!-- Coluna de imagem placeholder -->
        <div
          ref="imageColRef"
          data-gsap="fade-left"
          class="relative aspect-[4/5] rounded-2xl overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-night-300 to-night-200
                   flex items-center justify-center border border-night-400"
          >
            <!-- Placeholder visual -->
            <div class="text-center space-y-3">
              <svg
                width="48" height="48"
                viewBox="0 0 24 24"
                fill="none"
                class="mx-auto text-night-400"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
                <path d="M3 16l5-5 4 4 3-3 6 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
              </svg>
              <p class="text-xs text-night-400 tracking-wide">Foto especial aqui</p>
            </div>
          </div>

          <!-- Borda decorativa com gradiente -->
          <div class="absolute inset-0 rounded-2xl border border-rose-900/20 pointer-events-none" />
          <div
            class="absolute -bottom-2 -right-2 w-2/3 h-2/3 rounded-2xl border border-gold-600/20 pointer-events-none"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useGsapAnimations } from '~/composables/useGsapAnimations'

defineOptions({ name: 'IntroSection' })

const textColRef  = ref<HTMLElement | null>(null)
const imageColRef = ref<HTMLElement | null>(null)

const { fadeInLeft, fadeInRight } = useGsapAnimations()

onMounted(() => {
  fadeInRight(textColRef.value)
  fadeInLeft(imageColRef.value)
})
</script>
