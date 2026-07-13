/** Applies the shared Material UI theme and renders the application route tree. */
import { CssBaseline, ThemeProvider } from "@mui/material";
import AppRoutes from "./routes";
import theme from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}
