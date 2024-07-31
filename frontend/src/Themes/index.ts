import { createTheme } from "@mui/material";

export const lightTheme = 
createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3F3F3F',
        },
        secondary: {
            main: '#0B0B00',
        },
        background: {   
            default: '#EBE8E0',
            paper: '#EBE8E0',
        },
        text: {
            primary: '#0A0A00',
            secondary: '#0A0A00',
        },
    },
});


export const darkTheme = 
createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#0A0A00',
        },
        secondary: {
            main: '#A8BBB0',
        },
        background: {
            default: '#3F3F3F',
        },
        text: {
            primary: '#d4af37',
            secondary: '#d4af37',
        },
    },
});
  // base theme.
  //Red #D01110 Black #0A0A00 Celadon #A8BBB0 Ivory #EBE8E0