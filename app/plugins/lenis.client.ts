import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const lenis = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 1.0,
  })

  // Integração com GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return {
    provide: {
      lenis,
    },
  }
})
