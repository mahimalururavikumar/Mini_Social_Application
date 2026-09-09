import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f1117",
      paper: "#171922",
    },
    primary: {
      main: "#f2b705",
      contrastText: "#14150f",
    },
    text: {
      primary: "#eef0f4",
      secondary: "#9096a8",
    },
    divider: "#262936",
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Poppins", sans-serif' },
    h2: { fontFamily: '"Poppins", sans-serif' },
    h6: { fontFamily: '"Poppins", sans-serif', fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#12141c",
          borderBottom: "1px solid #262936",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

export default theme;
