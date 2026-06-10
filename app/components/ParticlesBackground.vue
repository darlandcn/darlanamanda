<template>
  <div
    aria-hidden="true"
    style="position: absolute; inset: 0; min-height: 100vh; z-index: 3; pointer-events: none;"
  >
    <vue-particles
      :id="id"
      :options="particlesOptions"
      style="width: 100%; height: 100%;"
    />
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ParticlesBackground' })

const props = withDefaults(defineProps<{ id?: string }>(), {
  id: 'romantic-particles',
})

const particlesOptions = {
  background: {
    color: { value: 'transparent' },
  },
  particles: {
    number: { value: 80 },
    color: {
      value: ['#94A3B8', '#CBD5E1', '#F5F5F5'],
    },
    opacity: {
      value: { min: 0.05, max: 0.35 },
      animation: { enable: true, speed: 0.4 },
    },
    size: {
      value: { min: 0.4, max: 1.8 },
    },
    move: {
      enable: true,
      speed: 0.15,
      direction: 'none' as const,
      random: true,
      outModes: { default: 'out' as const },
    },
    twinkle: {
      particles: { enable: true, frequency: 0.04, opacity: 0.8 },
    },
  },
  detectRetina: true,
}
</script>
