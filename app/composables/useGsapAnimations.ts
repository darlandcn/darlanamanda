import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useGsapAnimations() {
  const fadeInUp = (
    target: string | Element | null,
    options: gsap.TweenVars = {},
  ) => {
    if (!target) return
    return gsap.fromTo(
      target,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target as Element,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        ...options,
      },
    )
  }

  const fadeIn = (
    target: string | Element | null,
    options: gsap.TweenVars = {},
  ) => {
    if (!target) return
    return gsap.fromTo(
      target,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: target as Element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        ...options,
      },
    )
  }

  const fadeInLeft = (
    target: string | Element | null,
    options: gsap.TweenVars = {},
  ) => {
    if (!target) return
    return gsap.fromTo(
      target,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target as Element,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        ...options,
      },
    )
  }

  const fadeInRight = (
    target: string | Element | null,
    options: gsap.TweenVars = {},
  ) => {
    if (!target) return
    return gsap.fromTo(
      target,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target as Element,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        ...options,
      },
    )
  }

  const staggerFadeIn = (
    targets: string | Element[],
    stagger: number = 0.15,
    options: gsap.TweenVars = {},
  ) => {
    if (!targets) return
    return gsap.fromTo(
      targets,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: (Array.isArray(targets) ? targets[0] : targets) as Element,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        ...options,
      },
    )
  }

  const scaleIn = (
    target: string | Element | null,
    options: gsap.TweenVars = {},
  ) => {
    if (!target) return
    return gsap.fromTo(
      target,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: target as Element,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        ...options,
      },
    )
  }

  const shake = (target: Element | null) => {
    if (!target) return
    return gsap.timeline()
      .to(target, { x: -12, duration: 0.08, ease: 'power2.out' })
      .to(target, { x: 12,  duration: 0.08, ease: 'power2.out' })
      .to(target, { x: -8,  duration: 0.07, ease: 'power2.out' })
      .to(target, { x: 8,   duration: 0.07, ease: 'power2.out' })
      .to(target, { x: -4,  duration: 0.06, ease: 'power2.out' })
      .to(target, { x: 0,   duration: 0.06, ease: 'power2.out' })
  }

  const clearScrollTriggers = () => {
    ScrollTrigger.getAll().forEach((t) => t.kill())
  }

  return {
    fadeInUp,
    fadeIn,
    fadeInLeft,
    fadeInRight,
    staggerFadeIn,
    scaleIn,
    shake,
    clearScrollTriggers,
  }
}
