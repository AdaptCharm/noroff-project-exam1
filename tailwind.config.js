const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: colors.lightBlue,
        sand: {
          DEFAULT: '#dcd7cd',
          light: '#ece7dc'
        },
        'link': 'var(--color-link)',
      },
      spacing: {
        '23': '5.5rem',
        '30': '7.5rem',
        '150': '37.5rem'
      },
      inset: {
        '1/5': '20%'
      },
      transitionTimingFunction: {
        'default': 'ease'
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms'
      },
      boxShadow: {
        'smallest': 'var(--shadow-smallest)',
        'small': 'var(--shadow-small)',
        'medium': 'var(--shadow-medium)',
        'large': 'var(--shadow-large)',
      },
      gridTemplateColumns: {
        'navbar': '1fr minmax(auto, 880px) 1fr',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
