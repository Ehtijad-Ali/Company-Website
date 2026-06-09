/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        nasalization: ['Nasalization', 'Montserrat', 'sans-serif'],
        syne:  ['Nasalization', 'Montserrat', 'sans-serif'],
        inter: ['Nasalization', 'Montserrat', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        accent:  '#ffffff',
        accent2: '#888888',
      },
      animation: {
        'float':      'float 5s ease-in-out infinite',
        'spin-slow':  'spin-slow 25s linear infinite',
        'marquee':    'marquee 45s linear infinite',
        'marqueeR':   'marqueeR 45s linear infinite',
        'glow':       'glow 4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
