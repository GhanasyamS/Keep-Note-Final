import { createTheme } from "@mui/material/styles";

const AppTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#20B2AA", // lightseagreen
    },
    secondary: {
      main: "#FAFAD2", // lightgoldenrodyellow
    },
    background: {
      default: "#28282b",
      paper: "#ffffff", // white form cards
    },
    text: {
      primary: "#000000", // black text
      secondary: "#cccccc",
    },
  },
  typography: {
    fontFamily: "sans-serif",
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#000000", // label text
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#000000", // input field text
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#000000", // for form label text
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#000000", // input border color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#000000", // default button text color
        },
        contained: {
          color: "#FFFFFF", // button text inside contained button
          fontWeight: 700,
          backgroundColor: "#20B2AA", 
          "&:hover": {
            backgroundColor: "#006400", // darker yellow on hover
          },
          "&.Mui-disabled":{
            backgroundColor:"#808080",
            color: "#FFB6C1",
            fontWeight: 400,
          }
        },
      },
    },
    
},
});

export default AppTheme;
