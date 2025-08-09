import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./app.tsx";
import { store } from "./app/store.ts";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // A standard, nice blue
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif', // Set Inter as the default font
    h4: {
      fontWeight: 600, // Make h4 a bit bolder
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Buttons with normal casing
          borderRadius: 8, // Slightly more rounded buttons
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
