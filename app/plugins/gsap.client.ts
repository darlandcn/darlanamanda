import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)

  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
