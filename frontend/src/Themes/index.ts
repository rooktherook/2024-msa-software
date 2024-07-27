import { createTheme } from "@mui/material";

export const lightTheme = 
createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#D01110',
        },
        secondary: {
            main: '#0A0A00',
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
            main: '#1976d2',
        },
        secondary: {
            main: '#1976d2',
        },
        background: {
            default: '#1976d2',
            paper: '#1976d2',
        },
        text: {
            primary: '#000000',
            secondary: '#000000',
        },
    },
});
  // base theme.
  //Red #D01110 Black #0A0A00 Celadon #A8BBB0 Ivory #EBE8E0