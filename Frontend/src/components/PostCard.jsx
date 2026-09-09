import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, Avatar, Button, Stack, IconButton, Chip } from '@mui/material';
import { FavoriteBorder as HeartOutlineIcon, Favorite as HeartFilledIcon, ChatBubbleOutlineOutlined as CommentIcon, Share as ShareIcon, MoreHoriz as MoreIcon, PushPin as PinIcon, EmojiEvents as TrophyIcon } from '@mui/icons-material';

function PostCard({ post }) {
  const {
    author = 'Nitin Pa...',
    username = '@nitin3w',
    userBadge = '7 👑 Legend',
    avatar = 'https://i.pravatar.cc/150?img=33',
    time = 'Aug 30',
    categoryTag = 'TaskPlanet X CPA Lead',
    title = 'Earn Up to 10,000 Points with CPA Lead!',
    content = "Try CPA Lead offers, surveys and tasks to earn points. If an eligible verified task isn't credited, compensation may be given after verification. Please, Keep screenshots as proof.",
    image = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    isPinned = true,
    likesCount = 200,
    commentsCount = 105,
    sharesCount = 14,
  } = post || {};

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(likesCount);
  const [following, setFollowing] = useState(false);

  const handleToggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikes((prev) => prev + 1);
    }
  };

  return (
    <Card
      sx={{
        mb: 2.5,
        position: 'relative',
        backgroundColor: '#171922',
        border: isPinned ? '1.5px solid #f2b705' : '1px solid #262936',
        boxShadow: isPinned ? '0 4px 20px rgba(242, 183, 5, 0.12)' : 'none',
      }}
    >
      {/* Pinned Badge */}
      {isPinned && (
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            right: 16,
            backgroundColor: '#ef4444',
            color: '#ffffff',
            borderRadius: '50%',
            p: 0.6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            zIndex: 2,
          }}
        >
          <PinIcon sx={{ fontSize: 16 }} />
        </Box>
      )}

      <CardContent sx={{ p: 2.5 }}>
        {/* Author Header */}
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Avatar src={avatar} alt={author} sx={{ width: 44, height: 44, border: '2px solid #f2b705' }} />
            <Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#eef0f4' }}>
                  {author}
                </Typography>
                <Chip
                  icon={<TrophyIcon style={{ fontSize: 14, color: '#f2b705' }} />}
                  label={userBadge}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    backgroundColor: 'rgba(242, 183, 5, 0.12)',
                    border: '1px solid rgba(242, 183, 5, 0.3)',
                    color: '#f2b705',
                  }}
                />
              </Stack>
              <Typography variant="caption" sx={{ color: '#9096a8', display: 'block' }}>
                {username} • {time}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button
              size="small"
              variant={following ? 'outlined' : 'contained'}
              onClick={() => setFollowing(!following)}
              sx={{
                py: 0.4,
                px: 2,
                fontSize: '0.8rem',
                backgroundColor: following ? 'transparent' : '#f2b705',
                color: following ? '#9096a8' : '#0f1117',
                borderColor: '#262936',
                '&:hover': {
                  backgroundColor: following ? 'rgba(255,255,255,0.05)' : '#d97706',
                },
              }}
            >
              {following ? 'Following' : 'Follow'}
            </Button>
            <IconButton size="small" sx={{ color: '#9096a8' }}>
              <MoreIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* Category Tag */}
        {categoryTag && (
          <Box sx={{ textAlign: 'right', mb: 1 }}>
            <Chip
              label={categoryTag}
              size="small"
              sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                backgroundColor: 'transparent',
                border: '1px solid #f2b705',
                color: '#f2b705',
                px: 1,
              }}
            />
          </Box>
        )}

        {/* Post Title */}
        {title && (
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#f2b705', mb: 1, fontSize: '1.1rem' }}>
            {title}
          </Typography>
        )}

        {/* Post Body Content */}
        <Typography variant="body2" sx={{ color: '#eef0f4', mb: 2, lineHeight: 1.6 }}>
          {content}
        </Typography>

        {/* Post Image */}
        {image && (
          <Box
            component="img"
            src={image}
            alt="Post preview"
            sx={{
              width: '100%',
              maxHeight: 340,
              objectFit: 'cover',
              borderRadius: 3,
              mt: 1,
              mb: 2,
              border: '1px solid #262936',
            }}
          />
        )}

        {/* Action Footer Bar */}
        <Stack direction="row" spacing={4} sx={{ alignItems: 'center', pt: 1 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={handleToggleLike}>
            <IconButton size="small" sx={{ p: 0, color: liked ? '#ef4444' : '#9096a8' }}>
              {liked ? <HeartFilledIcon fontSize="small" /> : <HeartOutlineIcon fontSize="small" />}
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 600, color: liked ? '#ef4444' : '#9096a8' }}>
              {likes}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', cursor: 'pointer' }}>
            <IconButton size="small" sx={{ p: 0, color: '#9096a8' }}>
              <CommentIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#9096a8' }}>
              {commentsCount}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', cursor: 'pointer' }}>
            <IconButton size="small" sx={{ p: 0, color: '#9096a8' }}>
              <ShareIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#9096a8' }}>
              {sharesCount}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PostCard;
