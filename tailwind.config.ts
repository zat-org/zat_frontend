import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zat: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#da3737',
          600: '#c42d2d',
          700: '#a82727',
          800: '#8f2222',
          900: '#7a1f1f',
          950: '#450a0a',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#fafafa',
          dark: '#000000',
          'dark-muted': '#0a0a0a',
        },
      },
      keyframes: {
        'landing-fade-up': {
          '0%': { opacity: '0', transform: 'translateY(1.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'landing-glow': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        'landing-fade-up': 'landing-fade-up 0.75s ease-out forwards',
        'landing-glow': 'landing-glow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-flip')],
} satisfies Config
