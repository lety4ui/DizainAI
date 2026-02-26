/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0a',
        'bg-card': '#1a1a1a',
        'bg-body': '#2a2a2a',
        'accent': '#f0f0f0',
      }
    },
  },
  plugins: [],
}
