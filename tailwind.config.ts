import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,ts,tsx}',
    './shared/**/*.{vue,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
        oleo: ['Oleo Script', 'cursive'],
        caveat: ['Caveat', 'cursive'],
      },
      colors: {
        abyss: {
          DEFAULT: '#0A0A0A',
          100: '#111111',
          200: '#171717',
          300: '#262626',
          400: '#404040',
        },
        slate: {
          50:  '#F2F4F7',
          100: '#E7EBF1',
          200: '#CBD5E1',
          300: '#94A3B8',
          400: '#64748B',
          500: '#475569',
          600: '#334155',
        },
        ivory: {
          DEFAULT: '#F5F5F5',
          100: '#E5E5E5',
          200: '#A3A3A3',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'slate-glow':
          'radial-gradient(ellipse at center, rgba(148,163,184,0.12) 0%, transparent 70%)',
        'subtle-light-glow':
          'radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'elastic': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
