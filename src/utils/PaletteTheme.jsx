import { createTheme } from "@mui/material";

const PaletteTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#3f51b5',
        },
        secondary: {
          main: '#7986cb',
        },
        background: {
          default: '#ffffff', // set your desired background color here
        },
        transparent: {
            main: 'rgba(255,255,255,0.0)',
          },
        
      },


})
  

export default PaletteTheme