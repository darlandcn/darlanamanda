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
      value: ['#FFFFFF', '#F8FAFC', '#E2E8F0', '#CBD5E1'],
    },
    opacity: {
      value: { min: 0.25, max: 0.75 },
      animation: { enable: true, speed: 0.4 },
    },
    size: {
      value: { min: 0.4, max: 2 },
    },
    move: {
      enable: true,
      speed: 0.1,
      direction: 'none' as const,
      random: true,
      outModes: { default: 'out' as const },
    },
    twinkle: {
      particles: { enable: true, frequency: 0.06, opacity: 1 },
    },
  },
  detectRetina: true,
}
</script>
