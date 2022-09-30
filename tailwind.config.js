const defaultTheme = require('tailwindcss/defaultTheme')
const { DEFAULT_THEME } = require('@mantine/core')

// Merging the mantine color into tailwind theme
const colors = {}
const COLOR_DARKNESS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

for (const [key, value] of Object.entries(DEFAULT_THEME.colors)) {
  colors[key] = {
    ...COLOR_DARKNESS.reduce((acc, darkness, ind) => {
      acc[darkness] = value[ind]
      return acc
    }, {})
  }
}

module.exports = {
  mode: 'jit',
  important: 'body',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      black: '#000000',
      white: '#ffffff',
      brand: {
        50: '#D7FFC7',
        100: '#C6FFAF',
        200: '#A5FF81',
        300: '#85E763',
        400: '#6CCD4B',
        500: '#52B533',
        600: '#369D17',
        700: '#0F8502',
        800: '#016C00',
        900: '#005500'
      },
      ...colors
    },
    screens: {
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1536px'
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      spacing: {
        xs: '10px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')],
  corePlugins: {
    preflight: false
  }
}
