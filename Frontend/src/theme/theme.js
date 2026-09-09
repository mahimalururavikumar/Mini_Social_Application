import { createTheme } from '@mui/material/styles';

// TaskPlanet-inspired Dark Theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0e17', // Main deep dark background
      paper: '#121824',   // Post card background
    },
    primary: {
      main: '#2563eb',   // TaskPlanet primary blue
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f59e0b',   // TaskPlanet gold/amber highlight accent
      light: '#fbbf24',
      dark: '#d97706',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: '"Roboto", "Inter", -apple-system, sans-serif',
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16, // Modern rounded cards and inputs
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 24, // Pill buttons like TaskPlanet
          fontWeight: 600,
          padding: '6px 20px',
        },
        outlinedPrimary: {
          borderWidth: 1.5,
          '&:hover': {
            borderWidth: 1.5,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#121824',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.08)',
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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 24,
            backgroundColor: '#0a0e17',
          },
        },
      },
    },
  },
});

export default theme;
