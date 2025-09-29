/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EE4C3D',
        'primary-dark': '#D73729',
        'primary-darker': '#DD3B2C',
        background: '#FFFCF7',
        text: '#000000',
        'text-light': '#FFE3E3',
        vegan: '#126006',
        vegetarian: '#439730',
        eggetarian: '#F16C25',
        meat: '#D52C2C',
        border: '#C8BFB0',
        'border-light': '#C8BFB0',
      },
      fontFamily: {
        'palmer-lake': ['Palmer Lake', 'cursive'],
        'ibm-plex-mono': ['IBM Plex Mono', 'monospace'],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}