import defaultTheme from 'tailwindcss/defaultTheme'
const colors =require('tailwindcss/colors')

module.exports = {
  mode: 'jit',

  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans]
       },    
    },
  },
  plugins: [],
}