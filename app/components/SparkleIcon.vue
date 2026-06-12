<template>
  <svg
    ref="sparkleRef"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style="filter: drop-shadow(0 0 6px rgba(226,232,240,0.30)); display: block;"
  >
    <path
      d="M18 2 L20.5 15.5 L34 18 L20.5 20.5 L18 34 L15.5 20.5 L2 18 L15.5 15.5 Z"
      fill="#CBD5E1"
    />
  </svg>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

defineOptions({ name: 'SparkleIcon' })

const sparkleRef = ref<SVGSVGElement | null>(null)

onMounted(() => {
  gsap.to(sparkleRef.value, {
    scale: 1.15,
    opacity: 0.75,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    transformOrigin: 'center center',
  })
})
</script>
