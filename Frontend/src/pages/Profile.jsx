import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Button, Stack, TextField, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Edit as EditIcon, PhotoCamera as CameraIcon, ArrowBack as BackIcon, Person as PersonIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import axios from 'axios';

function Profile({ onNavigate, userPosts = [] }) {
  const { user, fetchUserProfile } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      await axios.put('/api/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      await fetchUserProfile();
      setOpenEdit(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Box sx={{ pt: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="#eef0f4" gutterBottom>
          Please sign in to view your profile
        </Typography>
        <Button variant="contained" onClick={() => onNavigate && onNavigate('login')} sx={{ backgroundColor: '#f2b705', color: '#0f1117', fontWeight: 700, mt: 2 }}>
          Sign In
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      {/* Header Back Button */}
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Button
          size="small"
          onClick={() => onNavigate && onNavigate('feed')}
          startIcon={<BackIcon />}
          sx={{ color: '#9096a8' }}
        >
          Back to Feed
        </Button>
      </Stack>

      {/* User Profile Summary Card */}
      <Card sx={{ backgroundColor: '#171922', border: '1px solid #262936', borderRadius: 4, mb: 3 }}>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Avatar
            src={user.avatar || 'https://i.pravatar.cc/150?img=12'}
            alt={user.name}
            sx={{ width: 90, height: 90, border: '3px solid #f2b705', mx: 'auto', mb: 2 }}
          />

          <Typography variant="h5" fontWeight="800" color="#eef0f4">
            {user.name}
          </Typography>

          <Typography variant="body2" color="#9096a8" gutterBottom>
            @{user.name.toLowerCase().replace(/\s+/g, '')} • {user.email}
          </Typography>

          {user.bio && (
            <Typography variant="body2" color="#eef0f4" sx={{ my: 1.5, px: 2, fontStyle: 'italic' }}>
              "{user.bio}"
            </Typography>
          )}

          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setOpenEdit(true)}
            sx={{ mt: 2, borderColor: '#f2b705', color: '#f2b705', px: 3, borderRadius: 20 }}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* User Posts Title */}
      <Typography variant="h6" fontWeight="700" color="#eef0f4" mb={2}>
        Your Posts ({userPosts.length})
      </Typography>

      {/* List of user posts */}
      {userPosts.length === 0 ? (
        <Card sx={{ backgroundColor: '#171922', border: '1px solid #262936', p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="#9096a8">
            You haven't published any posts yet.
          </Typography>
        </Card>
      ) : (
        userPosts.map((post) => <PostCard key={post._id || post.id} post={post} />)
      )}

      {/* Edit Profile Modal Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} PaperProps={{ style: { backgroundColor: '#171922', border: '1px solid #262936', color: '#eef0f4' } }}>
        <DialogTitle sx={{ fontWeight: 700, borderBottom: '1px solid #262936' }}>Edit Profile</DialogTitle>
        <Box component="form" onSubmit={handleUpdateProfile}>
          <DialogContent sx={{ minWidth: 320, pt: 3 }}>
            {errorMsg && (
              <Alert severity="error" sx={{ mb: 2, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                {errorMsg}
              </Alert>
            )}

            {/* Avatar Preview & Upload */}
            <Box textAlign="center" mb={3}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar src={avatarPreview} alt="Avatar Preview" sx={{ width: 70, height: 70, border: '2px solid #f2b705', mx: 'auto' }} />
                <IconButton
                  component="label"
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: -4,
                    right: -4,
                    backgroundColor: '#f2b705',
                    color: '#0f1117',
                    p: 0.5,
                  }}
                >
                  <CameraIcon fontSize="small" />
                  <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                </IconButton>
              </Box>
            </Box>

            <Stack spacing= {2.5}>
              <TextField
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
                slotProps={{ input: { style: { color: '#eef0f4' } } }}
                sx={{ '& .MuiInputLabel-root': { color: '#9096a8' }, '& .MuiOutlinedInput-root': { backgroundColor: '#0f1117', '& fieldset': { borderColor: '#262936' } } }}
              />

              <TextField
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                multiline
                rows={3}
                fullWidth
                slotProps={{ input: { style: { color: '#eef0f4' } } }}
                sx={{ '& .MuiInputLabel-root': { color: '#9096a8' }, '& .MuiOutlinedInput-root': { backgroundColor: '#0f1117', '& fieldset': { borderColor: '#262936' } } }}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2, borderTop: '1px solid #262936' }}>
            <Button onClick={() => setOpenEdit(false)} sx={{ color: '#9096a8' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{ backgroundColor: '#f2b705', color: '#0f1117', fontWeight: 700, '&:hover': { backgroundColor: '#d97706' } }}
            >
              {submitting ? <CircularProgress size={20} sx={{ color: '#0f1117' }} /> : 'Save Changes'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}

export default Profile;
