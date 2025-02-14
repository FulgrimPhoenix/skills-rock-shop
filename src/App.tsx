import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { store } from "./app/store";
import theme from "./styles/theme";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
