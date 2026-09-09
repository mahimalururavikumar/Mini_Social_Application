import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Stack, CircularProgress, Link as MuiLink } from '@mui/material';
import { LockOutlined as LockIcon, EmailOutlined as EmailIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

function Login({ onNavigate }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const res = await login(email, password);
    setSubmitting(false);

    if (res.success) {
      if (onNavigate) onNavigate('feed');
    } else {
      setErrorMsg(res.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Box sx={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
      <Card sx={{ width: '100%', maxWidth: 420, backgroundColor: '#171922', border: '1px solid #262936', borderRadius: 4, p: 1 }}>
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={1} mb={3}>
            <Button
              size="small"
              onClick={() => onNavigate && onNavigate('feed')}
              startIcon={<BackIcon />}
              sx={{ color: '#9096a8', minWidth: 'auto', p: 0.5 }}
            >
              Feed
            </Button>
          </Stack>

          <Box textAlign="center" mb={4}>
            <Typography variant="h5" fontWeight="800" color="#eef0f4" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="#9096a8">
              Sign in to post, like, and interact on Mini Social
            </Typography>
          </Box>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              {errorMsg}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Email Address"
                type="email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <EmailIcon sx={{ color: '#9096a8', mr: 1, fontSize: 20 }} />,
                    style: { color: '#eef0f4' },
                  },
                }}
                sx={{
                  '& .MuiInputLabel-root': { color: '#9096a8' },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0f1117',
                    '& fieldset': { borderColor: '#262936' },
                    '&:hover fieldset': { borderColor: '#f2b705' },
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <LockIcon sx={{ color: '#9096a8', mr: 1, fontSize: 20 }} />,
                    style: { color: '#eef0f4' },
                  },
                }}
                sx={{
                  '& .MuiInputLabel-root': { color: '#9096a8' },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0f1117',
                    '& fieldset': { borderColor: '#262936' },
                    '&:hover fieldset': { borderColor: '#f2b705' },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{
                  py: 1.2,
                  mt: 1,
                  backgroundColor: '#f2b705',
                  color: '#0f1117',
                  fontWeight: 700,
                  fontSize: '1rem',
                  '&:hover': { backgroundColor: '#d97706' },
                }}
              >
                {submitting ? <CircularProgress size={24} sx={{ color: '#0f1117' }} /> : 'Sign In'}
              </Button>
            </Stack>
          </Box>

          <Box textAlign="center" mt={3}>
            <Typography variant="body2" color="#9096a8">
              Don't have an account?{' '}
              <MuiLink
                component="button"
                variant="body2"
                onClick={() => onNavigate && onNavigate('register')}
                underline="hover"
                sx={{ color: '#f2b705', fontWeight: 600, cursor: 'pointer' }}
              >
                Register here
              </MuiLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
