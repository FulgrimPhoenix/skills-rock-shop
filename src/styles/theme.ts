import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        root: {
          "&::before": {
            borderBottomColor: "rgba(255, 255, 255, 0.7)",
          },
        },
      },
    },
  },

  palette: {
    primary: {
      main: "#9F0040",
      contrastText: "#000",
      light: "#fff",
    },
    secondary: {
      main: "rgba(255, 255, 255, 0.7)",
    },
    action: {
      active: "#fff",
      disabled: "rgba(255, 255, 255, 0.7)",
      disabledBackground: "rgba(255, 255, 255, 0.1)",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.6)",
    },
    background: {
      default: "#000",
      paper: "#232323",
    },
    error: {
      main: "#AC2FFF",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
});

export default theme;
