/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-header-mob': "url('../src/assets/pictures/bg-mobile-dark.jpg')",
        'light-header-mob': "url('../src/assets/pictures/bg-mobile-light.jpg')",
        'dark-header-desk': "url('../src/assets/pictures/bg-desktop-dark.jpg')",
        'light-header-desk': "url('../src/assets/pictures/bg-desktop-light.jpg')",
        //check background 
        'check': 'linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)',
      },
      backgroundColor: {
        //light theme
        'VeryDarkGrayishBlue': 'hsl(235, 19%, 35%)',
        'DarkGrayishBlue': 'hsl(236, 9%, 61%)',
        'VeryLightGray': 'hsl(0, 0%, 98%)',
        'VeryLightGrayishBlue': 'hsl(236, 33%, 92%)',
        'LightGrayishBlue': ' hsl(233, 11%, 84%)',
        //dark theme
        'DVeryDarkBlue': 'hsl(235, 21%, 11%)',
        'DVeryDarkDesaturatedBlue': 'hsl(235, 24%, 19%)',
        'DLightGrayishBlue': 'hsl(236, 33%, 92%)',
        'DDarkGrayishBlue': 'hsl(234, 11%, 52%)',
        'DVeryDarkGrayishBlue': 'hsl(233, 14%, 35%)',
        'DVeryDarkGrayishBlue': 'hsl(237, 14%, 26%)',
        
      },
     
    },
  },
  plugins: [],
}

