// module.exports = {
//   content: ['./presets/**/*.{js,vue,ts}'],
//   plugins: [require('tailwindcss-primeui')]
// }

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('tailwindcss-primeui')]
}
