import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f1117', // Main background
      paper: '#171922',   // Cards background
    },
    primary: {
      main: '#f2b705',   // Warm gold accent
      light: '#fcd34d',
      dark: '#d97706',
      contrastText: '#0f1117',
    },
    secondary: {
      main: '#262936',
    },
    text: {
      primary: '#eef0f4',   // Primary text
      secondary: '#9096a8', // Secondary text
    },
    divider: '#262936',      // Hairline borders
  },
  typography: {
    fontFamily: '"Roboto", "Inter", -apple-system, sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 24,
          fontWeight: 600,
          padding: '6px 20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#171922',
          borderRadius: 14,
          border: '1px solid #262936',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
