import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#397bde", dark: "#2f67b5", light: "#edf4ff" },
    success: { main: "#157f59", dark: "#0e6748", light: "#eaf6f0" },
    error: { main: "#d94a4a" },
    warning: { main: "#ce8117" },
    background: { default: "#f4f7f5", paper: "#ffffff" },
    text: { primary: "#15201c", secondary: "#708078" },
    divider: "#e4e9e6",
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"DM Sans", system-ui, sans-serif',
    button: { textTransform: "none", fontWeight: 600 },
    h1: { fontFamily: '"Manrope", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Manrope", sans-serif', fontWeight: 700 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 700 } } },
  },
});

export default theme;
