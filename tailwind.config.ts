import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,ts,tsx}',
    './shared/**/*.{vue,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Pier Sans', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
        oleo: ['Oleo Script', 'cursive'],
        caveat: ['Caveat', 'cursive'],
      },
      colors: {
        base:     '#0A0F1A',
        surface:  '#111827',
        elevated: '#1E293B',
        overlay:  '#0D1424',
        ink: {
          DEFAULT: '#F8FAFC',
          light:   '#CBD5E1',
          muted:   '#94A3B8',
        },
        accent: {
          DEFAULT:   '#E2E8F0',
          secondary: '#D1D5DB',
          hover:     '#F1F5F9',
        },
        abyss: {
          DEFAULT: '#0A0F1E',
        },
        slate: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
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
