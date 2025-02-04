import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9F0040",
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
