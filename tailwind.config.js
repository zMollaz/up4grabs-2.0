const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,html}",
    "./components/**/*.{js,jsx,html}",
  ],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'aqua': '#8ED1CA',
      'aquaLight':'#afded9',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#1e3b50',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      't-gray': '#dddddd', 
      'white': '#fefefe',
      'black': '#000000',
      'earthy-blue' : '#31708e',
      'seaweed' : '#687864',
      'bb-blue' : '#8fc1e3',
      'off-white' :'#f7f9fb',
      'red' : '#ff6961',
    },
    fontFamily: {
      lucky : ["Luckiest Guy"],
      zen : ["Zen Kaku Gothic New"],
      sans: ['Graphik', 'sans-serif', ],
      serif: ['Merriweather', 'serif'],
    },
    screens: {
      'xs': '200px',
      'sm': '640px',
      'md': '768px',
      'lg': '1030px',
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],

}
