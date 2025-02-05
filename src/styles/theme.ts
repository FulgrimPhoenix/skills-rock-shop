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
  breakpoints: {},
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
});

export default theme;
