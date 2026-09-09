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
                '&:hover': {
                  backgroundColor: activeTab === 'all' ? '#d97706' : 'rgba(242, 183, 5, 0.1)',
                },
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

        {/* Text Area */}
        <TextField
          placeholder="What's on your mind?"
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
          sx={{ mb: 2 }}
        />

        <Box sx={{ height: '1px', backgroundColor: '#262936', mb: 2 }} />

        {/* Bottom Actions Bar */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <IconButton size="small" sx={{ color: '#f2b705' }}>
              <PhotoCameraIcon fontSize="small" />
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
            disabled={!content.trim()}
            endIcon={<SendIcon fontSize="small" />}
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
