/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-750': '#2D3748',
        'gray-850': '#1A202C',
      },
    },
  },
  plugins: [],
}