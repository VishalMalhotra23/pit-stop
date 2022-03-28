module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  media: false, // or 'media' or 'class'
  theme: {
    colors: {
      background: '#1F1F1F',
      redOne: '#CB2D3E',
      redTwo: '#EF473A',
      primary: '#F3AF02',
      white: '#fff',
      black: '#000',
      gray: {
        dark: '#19191a',
        DEFAULT: '#222222',
        light: '#242424',
        mute: '#AEAEAE'
      }
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif']
    },
    fontSize: {
      '3xs': '0.675rem',
      '2xs': '.775rem',
      xs: '0.8rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
