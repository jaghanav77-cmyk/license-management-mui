/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root', // Ensures Tailwind utilities take appropriate precedence with MUI
  theme: {
    extend: {
      colors: {
        brandNavy: '#1c2847',
        brandBlue: '#1e60f0',
        brandBlueHover: '#174ed0',
        surfaceBg: '#f8fafc'
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
