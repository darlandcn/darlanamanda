<template>
  <div
    aria-hidden="true"
    style="position: absolute; inset: 0; min-height: 100vh; z-index: 3; pointer-events: none;"
  >
    <vue-particles
      id="romantic-particles"
      :options="particlesOptions"
      style="width: 100%; height: 100%;"
    />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ParticlesBackground' })

const particlesOptions = {
  background: {
    color: { value: 'transparent' },
  },
  particles: {
    number: { value: 80 },
    color: {
      value: ['#C9A96E', '#F0EBE0', '#8B6E3E'],
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: { enable: true, speed: 0.5 },
    },
    size: {
      value: { min: 0.5, max: 2 },
    },
    move: {
      enable: true,
      speed: 0.2,
      direction: 'none' as const,
      random: true,
      outModes: { default: 'out' as const },
    },
    twinkle: {
      particles: { enable: true, frequency: 0.05, opacity: 1 },
    },
  },
  detectRetina: true,
}
</script>
