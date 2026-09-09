import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, Button, TextField, Stack, IconButton, Chip } from '@mui/material';
import { PhotoCamera as PhotoCameraIcon, InsertEmoticon as EmojiIcon, FormatListBulleted as ListIcon, Campaign as PromoteIcon, Send as SendIcon } from '@mui/icons-material';

function CreatePostCard({ onAddPost }) {
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (onAddPost) {
      onAddPost(content);
    }
    setContent('');
  };

  return (
    <Card sx={{ mb: 3, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <CardContent sx={{ p: 2.5 }}>
        {/* Card Header with Category Pills */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="700">
            Create Post
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant={activeTab === 'all' ? 'contained' : 'outlined'}
              onClick={() => setActiveTab('all')}
              sx={{ py: 0.3, px: 2, fontSize: '0.8rem' }}
            >
              All Posts
            </Button>
            <Button
              size="small"
              variant={activeTab === 'promotions' ? 'contained' : 'outlined'}
              onClick={() => setActiveTab('promotions')}
              sx={{ py: 0.3, px: 2, fontSize: '0.8rem', color: '#94a3b8', borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Promotions
            </Button>
          </Stack>
        </Stack>

        {/* Text Area */}
        <TextField
          placeholder="What's on your mind?"
          multiline
          rows={3}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            style: { color: '#f8fafc', fontSize: '0.95rem' },
          }}
          sx={{ mb: 2 }}
        />

        <Box sx={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)', mb: 2 }} />

        {/* Bottom Actions Bar */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton size="small" color="primary">
              <PhotoCameraIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary">
              <EmojiIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="primary">
              <ListIcon fontSize="small" />
            </IconButton>
            <Chip
              icon={<PromoteIcon fontSize="small" style={{ color: '#60a5fa' }} />}
              label="Promote"
              variant="outlined"
              size="small"
              clickable
              sx={{ ml: 1, borderColor: '#2563eb', color: '#60a5fa' }}
            />
          </Stack>

          <Button
            variant="outlined"
            color="primary"
            endIcon={<SendIcon fontSize="small" />}
            onClick={handleSubmit}
            disabled={!content.trim()}
            sx={{ px: 3, borderRadius: 24, fontWeight: '700' }}
          >
            Post
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default CreatePostCard;
