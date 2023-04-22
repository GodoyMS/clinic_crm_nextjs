/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
module.exports = {
  darkMode:'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'

  ],
  theme: {
    extend: {
      colors:{
        primary:colors.slate,
        secondary:colors.sky
      }
    },
  },
  plugins: [require("flowbite/plugin")],
  

}