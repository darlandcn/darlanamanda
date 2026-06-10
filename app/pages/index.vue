<template>
  <div
    id="access-page"
    style="min-height: 100vh; position: relative;"
  >
    <!-- ① Foto do casal -->
    <div style="position: fixed; inset: 0; z-index: 1; overflow: hidden;">
      <img
        src="/images/couple.jpeg"
        alt=""
        aria-hidden="true"
        style="display: block; width: 100%; height: 115%; object-fit: cover; object-position: 40% top; transform: translateY(-15%); filter: brightness(0.5) saturate(0.7); -webkit-mask-image: linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.5) 65%, transparent 88%); mask-image: linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.5) 65%, transparent 88%);"
      />
    </div>

    <!-- ② Overlay de vinhete -->
    <div style="position: fixed; inset: 0; z-index: 2; pointer-events: none; background: radial-gradient(ellipse 110% 90% at 50% 0%, transparent 25%, #080808 80%), radial-gradient(ellipse 50% 25% at 50% 4%, rgba(120,80,30,0.12) 0%, transparent 100%);" />

    <!-- ③ Partículas douradas no fundo -->
    <ParticlesBackground />

    <!-- Sparkle — topo independente -->
    <div
      class="sparkle"
      style="position: fixed; top: 6vh; left: 50%; transform: translateX(-50%); z-index: 10; display: flex; justify-content: center;"
    >
      <SparkleIcon />
    </div>

    <!-- Cadeado — base independente -->
    <div
      class="lock-icon"
      style="position: fixed; bottom: 4vh; left: 50%; transform: translateX(-50%); z-index: 10; display: flex; justify-content: center;"
      aria-hidden="true"
    >
      <svg
        width="24" height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C9A96E"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        style="opacity: 0.5;"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </div>

    <!-- ③ Conteúdo principal -->
    <div
      class="page-content"
      style="
        position: relative;
        z-index: 10;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 0;
        padding-top: 25vh;
      "
    >
      <div
        style="
          width: 100%;
          max-width: 480px;
          padding: 0 32px;
        "
      >
        <!-- Heading principal -->
        <h1
          class="heading"
          style="
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(1.9rem, 5vw, 2.6rem);
            font-weight: 400;
            line-height: 1.45;
            color: #F0EBE0;
            text-align: center;
            max-width: 420px;
            margin: 0 auto 28px;
          "
        >
          Existe uma memória que<br />
          só nós dois conhecemos.
        </h1>

        <!-- Linha divisória dourada -->
        <div
          class="divider"
          style="
            width: 80px;
            height: 1px;
            background: #8B6E3E;
            margin: 0 auto 24px;
          "
        />

        <!-- Subtítulo -->
        <p
          class="subtitle"
          style="
            font-family: 'Inter', sans-serif;
            font-size: 0.875rem;
            font-weight: 300;
            letter-spacing: 0.08em;
            color: #7A7168;
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 32px;
          "
        >
          Digite a data onde tudo começou
        </p>

        <!-- Grupo do formulário -->
        <div class="input-group" style="display: flex; flex-direction: column; gap: 12px;">

          <!-- Input de data -->
          <div>
            <input
              ref="dateEl"
              type="text"
              inputmode="numeric"
              placeholder="dd/mm/aaaa"
              maxlength="10"
              @input="formatDate"
              style="
                width: 100%;
                background: #0F0F0F;
                border: 1px solid #C9A96E;
                border-radius: 12px;
                padding: 18px 20px;
                font-size: 1rem;
                color: #F0EBE0;
                letter-spacing: 0.1em;
                text-align: center;
                outline: none;
                box-sizing: border-box;
              "
            />

            <!-- Mensagem de erro -->
            <Transition name="error-fade">
              <p
                v-if="errorMessage"
                id="error-msg"
                role="alert"
                style="
                  margin-top: 8px;
                  padding: 0 4px;
                  font-family: 'Inter', sans-serif;
                  font-size: 0.8rem;
                  font-weight: 300;
                  color: #C9A96E;
                  letter-spacing: 0.03em;
                "
              >
                {{ errorMessage }}
              </p>
            </Transition>
          </div>

          <!-- Botão Entrar -->
          <button
            type="button"
            :disabled="isEntering"
            style="
              width: 100%;
              background: #EDE4D3;
              color: #1A1410;
              border: none;
              border-radius: 12px;
              padding: 18px 24px;
              font-family: 'Inter', sans-serif;
              font-size: 1rem;
              font-weight: 400;
              letter-spacing: 0.04em;
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              align-items: center;
              transition: background 0.2s, transform 0.1s;
            "
            :style="isEntering ? 'opacity: 0.6; cursor: not-allowed;' : ''"
            @click="handleEnter"
            @mouseenter="(e) => { if (!isEntering) (e.currentTarget as HTMLElement).style.background = '#F5EDE0' }"
            @mouseleave="(e) => { (e.currentTarget as HTMLElement).style.background = '#EDE4D3' }"
            @mousedown="(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.99)' }"
            @mouseup="(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }"
          >
            <span>{{ isEntering ? 'Verificando...' : 'Entrar' }}</span>
            <svg
              v-if="!isEntering"
              width="20" height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <svg
              v-else
              class="spin"
              width="20" height="20"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="10" stroke="#1A1410" stroke-width="3" stroke-opacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#1A1410" stroke-width="3" stroke-linecap="round" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

import SparkleIcon        from '~/components/SparkleIcon.vue'
import ParticlesBackground from '~/components/ParticlesBackground.vue'
import { useAccess }      from '~/composables/useAccess'

definePageMeta({ ssr: false })
defineOptions({ name: 'AccessPage' })

const router = useRouter()
const { validate, errorMessage, isShaking } = useAccess()

const isEntering = ref(false)
const dateEl = ref<HTMLInputElement | null>(null)

// ── Submissão ──────────────────────────────────────────────────────────
async function handleEnter() {
  if (isEntering.value) return

  const date = dateEl.value!.value
  if (!validate(date)) return

  isEntering.value = true

  // Aguarda 1.5s com estado "Verificando..."
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Fade out cinematográfico de tudo
  await gsap.to('.page-content', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.in',
  })

  sessionStorage.setItem('granted', 'true')
  await router.push('/intro')
}

function formatDate(e: Event) {
  const el = e.target as HTMLInputElement
  const digits = el.value.replace(/\D/g, '').substring(0, 8)
  let f = ''
  for (let i = 0; i < digits.length; i++) {
    if (i === 2 || i === 4) f += '/'
    f += digits[i]
  }
  el.value = f
}

// ── Animações de entrada ───────────────────────────────────────────────
onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.sparkle',     { opacity: 0, scale: 0.3, duration: 1.2, delay: 0.3 })
    .from('.heading',     { opacity: 0, y: 30, duration: 1 }, '-=0.6')
    .from('.divider',     { scaleX: 0, duration: 0.8, transformOrigin: 'center' }, '-=0.5')
    .from('.subtitle',    { opacity: 0, y: 15, duration: 0.7 }, '-=0.4')
    .from('.input-group', { opacity: 0, y: 20, duration: 0.7 }, '-=0.3')
    .from('.lock-icon',   { opacity: 0, duration: 0.6 }, '-=0.2')

})
</script>

<style scoped>
/* ── Transição da mensagem de erro ───────────────────────────────────── */
.error-fade-enter-active,
.error-fade-leave-active {
  transition: opacity 250ms ease, transform 250ms ease;
}
.error-fade-enter-from,
.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Spinner do botão */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spin {
  animation: spin 0.8s linear infinite;
}
</style>
