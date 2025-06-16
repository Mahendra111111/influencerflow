/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0668E1', // Blue
          light: '#0080FB',   // Light Blue
        },
        custom: {
          gray: '#1C2B33', // Gray
        }
      },
    },
  },
  plugins: [],
} 