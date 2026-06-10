import { defineNuxtPlugin } from '#app'
import { initParticlesEngine } from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

export default defineNuxtPlugin(async () => {
  await initParticlesEngine(async (engine: any) => {
    await loadSlim(engine)
  })
})
