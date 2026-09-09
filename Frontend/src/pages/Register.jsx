import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Stack, CircularProgress, Avatar, IconButton, Link as MuiLink } from '@mui/material';
import { PersonOutlined as PersonIcon, LockOutlined as LockIcon, EmailOutlined as EmailIcon, PhotoCamera as CameraIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

function Register({ onNavigate }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (bio) formData.append('bio', bio);
    if (avatarFile) formData.append('avatar', avatarFile);

    const res = await register(formData);
    setSubmitting(false);

    if (res.success) {
      if (onNavigate) onNavigate('feed');
    } else {
      setErrorMsg(res.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <Box sx={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
      <Card sx={{ width: '100%', maxWidth: 440, backgroundColor: '#171922', border: '1px solid #262936', borderRadius: 4, p: 1 }}>
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Button
              size="small"
              onClick={() => onNavigate && onNavigate('feed')}
              startIcon={<BackIcon />}
              sx={{ color: '#9096a8', minWidth: 'auto', p: 0.5 }}
            >
              Feed
            </Button>
          </Stack>

          <Box textAlign="center" mb={3}>
            <Typography variant="h5" fontWeight="800" color="#eef0f4" gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body2" color="#9096a8">
              Join the Mini Social community
            </Typography>
          </Box>

          {/* Avatar Selector with Live Preview */}
          <Box textAlign="center" mb={3}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src={avatarPreview || 'https://i.pravatar.cc/150?img=12'}
                alt="Avatar Preview"
                sx={{ width: 80, height: 80, border: '2.5px solid #f2b705', mx: 'auto' }}
              />
              <IconButton
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: -4,
                  right: -4,
                  backgroundColor: '#f2b705',
                  color: '#0f1117',
                  p: 0.8,
                  '&:hover': { backgroundColor: '#d97706' },
                }}
              >
                <CameraIcon fontSize="small" />
                <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
              </IconButton>
            </Box>
            <Typography variant="caption" display="block" color="#9096a8" mt={1}>
              Upload profile photo (optional)
            </Typography>
          </Box>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              {errorMsg}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: <PersonIcon sx={{ color: '#9096a8', mr: 1, fontSize: 20 }} />,
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

              <TextField
                label="Bio (Optional)"
                multiline
                rows={2}
                fullWidth
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                slotProps={{
                  input: {
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
                {submitting ? <CircularProgress size={24} sx={{ color: '#0f1117' }} /> : 'Create Account'}
              </Button>
            </Stack>
          </Box>

          <Box textAlign="center" mt={3}>
            <Typography variant="body2" color="#9096a8">
              Already have an account?{' '}
              <MuiLink
                component="button"
                variant="body2"
                onClick={() => onNavigate && onNavigate('login')}
                underline="hover"
                sx={{ color: '#f2b705', fontWeight: 600, cursor: 'pointer' }}
              >
                Sign in here
              </MuiLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
