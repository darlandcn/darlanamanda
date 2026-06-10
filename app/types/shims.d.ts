declare module '@tsparticles/vue3' {
  import type { Component } from 'vue'
  export const Particles: Component
  export function initParticlesEngine(cb: (engine: any) => Promise<void>): Promise<void>
}
