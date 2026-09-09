import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography, Card, CardContent, Button, Stack, Chip } from '@mui/material';
import { AutoAwesome as AutoAwesomeIcon, RocketLaunch as RocketIcon, Layers as LayersIcon } from '@mui/icons-material';

// Create a custom MUI Dark/Purple Theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#818cf8',
    },
    secondary: {
      main: '#ec4899',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ pt: 8, pb: 4 }}>
        <Box textAlign="center" mb={6}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={2}>
            <Chip icon={<AutoAwesomeIcon />} label="Phase 1 Ready" color="primary" variant="outlined" />
          </Stack>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom sx={{ background: 'linear-gradient(45deg, #818cf8 30%, #ec4899 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Mini Social Post Application
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Frontend initialized with React.js & Material UI (MUI)
          </Typography>
        </Box>

        <Card sx={{ border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: 6, p: 2 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="600" gutterBottom>
              🚀 Step 1 Initialization Complete!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We have successfully bootstrapped the React application with Vite, set up Material UI theme configuration, and configured backend API routing proxy.
            </Typography>
            <Stack direction="row" spacing={2} mt={3}>
              <Button variant="contained" color="primary" startIcon={<RocketIcon />}>
                Ready for Step 2
              </Button>
              <Button variant="outlined" color="secondary" startIcon={<LayersIcon />}>
                MUI Components Active
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;
