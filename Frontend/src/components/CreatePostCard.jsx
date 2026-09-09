import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, Button, TextField, Stack, IconButton, Chip, CircularProgress, Alert } from '@mui/material';
import { PhotoCamera as PhotoCameraIcon, InsertEmoticon as EmojiIcon, FormatListBulleted as ListIcon, Campaign as PromoteIcon, Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

function CreatePostCard({ onAddPost }) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [errorMsg, setErrorMsg] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !imageFile) return;

    setSubmitting(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append('text', content.trim());
    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (onAddPost) {
      const res = await onAddPost(formData);
      if (res && !res.success) {
        setErrorMsg(res.error || 'Failed to submit post');
      } else {
        setContent('');
        handleRemoveImage();
      }
    }

    setSubmitting(false);
  };

  return (
    <Card sx={{ mb: 3, backgroundColor: '#171922', border: '1px solid #262936' }}>
      <CardContent sx={{ p: 2.5 }}>
        {/* Card Header */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#eef0f4' }}>
            Create Post
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant={activeTab === 'all' ? 'contained' : 'outlined'}
              onClick={() => setActiveTab('all')}
              sx={{
                py: 0.3,
                px: 2,
                fontSize: '0.8rem',
                backgroundColor: activeTab === 'all' ? '#f2b705' : 'transparent',
                color: activeTab === 'all' ? '#0f1117' : '#9096a8',
                borderColor: activeTab === 'all' ? '#f2b705' : '#262936',
              }}
            >
              All Posts
            </Button>
            <Button
              size="small"
              variant={activeTab === 'promotions' ? 'contained' : 'outlined'}
              onClick={() => setActiveTab('promotions')}
              sx={{
                py: 0.3,
                px: 2,
                fontSize: '0.8rem',
                backgroundColor: activeTab === 'promotions' ? '#f2b705' : 'transparent',
                color: activeTab === 'promotions' ? '#0f1117' : '#9096a8',
                borderColor: activeTab === 'promotions' ? '#f2b705' : '#262936',
              }}
            >
              Promotions
            </Button>
          </Stack>
        </Stack>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2, backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            {errorMsg}
          </Alert>
        )}

        {/* Text Area */}
        <TextField
          placeholder={user ? `What's on your mind, ${user.name}?` : "What's on your mind? (Sign in to post)"}
          multiline
          rows={3}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
              style: { color: '#eef0f4', fontSize: '0.95rem' },
            },
          }}
          sx={{ mb: 1 }}
        />

        {/* Image Preview Thumbnail */}
        {imagePreview && (
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
            <Box
              component="img"
              src={imagePreview}
              alt="Upload preview"
              sx={{ maxHeight: 180, borderRadius: 2, border: '1px solid #262936' }}
            />
            <IconButton
              size="small"
              onClick={handleRemoveImage}
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                backgroundColor: 'rgba(15, 17, 23, 0.8)',
                color: '#ef4444',
                '&:hover': { backgroundColor: '#ef4444', color: '#fff' },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Box sx={{ height: '1px', backgroundColor: '#262936', mb: 2 }} />

        {/* Bottom Actions Bar */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <IconButton size="small" component="label" sx={{ color: '#f2b705' }}>
              <PhotoCameraIcon fontSize="small" />
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </IconButton>
            <IconButton size="small" sx={{ color: '#f2b705' }}>
              <EmojiIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ color: '#f2b705' }}>
              <ListIcon fontSize="small" />
            </IconButton>
            <Chip
              icon={<PromoteIcon fontSize="small" style={{ color: '#f2b705' }} />}
              label="Promote"
              variant="outlined"
              size="small"
              clickable
              sx={{ ml: 1, borderColor: '#262936', color: '#9096a8' }}
            />
          </Stack>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting || (!content.trim() && !imageFile)}
            endIcon={submitting ? <CircularProgress size={16} sx={{ color: '#0f1117' }} /> : <SendIcon fontSize="small" />}
            sx={{
              px: 3,
              borderRadius: 24,
              fontWeight: 700,
              backgroundColor: '#f2b705',
              color: '#0f1117',
              '&:hover': { backgroundColor: '#d97706' },
              '&.Mui-disabled': { backgroundColor: '#262936', color: '#9096a8' },
            }}
          >
            Post
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CreatePostCard;
