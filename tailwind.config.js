/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        readex: ['"Readex Pro"', 'sans-serif'],
      },
      colors: {
        accent:  '#6c63ff',
        accent2: '#ff6584',
        accent3: '#43e97b',
      },
      screens: {
        // max-width breakpoints matching original CSS
        'max-lg': { max: '1024px' },
        'max-md': { max: '900px' },
        'max-sm': { max: '600px' },
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.4,0,.2,1)',
        spring: 'cubic-bezier(.34,1.56,.64,1)',
        'out-expo': 'cubic-bezier(.22,1,.36,1)',
      },
    },
  },
  plugins: [],
}
