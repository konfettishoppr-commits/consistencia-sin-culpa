/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: '#eb4193',
        orange: '#ec6524',
        lavender: '#b896c6',
        sky: '#afccdc',
        blush: '#f8cddc',
        sage: '#6b7c5c',
        cream: '#fdf8f0',
        warm: '#3d2620',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
