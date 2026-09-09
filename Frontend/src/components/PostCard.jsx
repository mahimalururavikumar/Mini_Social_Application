import React, { useState } from 'react';
import { Card, CardContent, Box, Typography, Avatar, Button, Stack, IconButton, Chip, TextField, InputAdornment, Collapse } from '@mui/material';
import { FavoriteBorder as HeartOutlineIcon, Favorite as HeartFilledIcon, ChatBubbleOutlineOutlined as CommentIcon, Share as ShareIcon, MoreHoriz as MoreIcon, PushPin as PinIcon, EmojiEvents as TrophyIcon, Send as SendIcon, DeleteOutlined as DeleteIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { toggleLikeApi, addCommentApi, deletePostApi } from '../services/api';

function PostCard({ post, onDeleteSuccess }) {
  const { user } = useAuth();
  const {
    _id,
    id,
    user: authorObj,
    username: fallbackUsername = '@nitin3w',
    text = '',
    content: fallbackContent = '',
    imageUrl = '',
    image: fallbackImage = '',
    likes: initialLikes = [],
    likesCount: fallbackLikesCount = 0,
    comments: initialComments = [],
    commentsCount: fallbackCommentsCount = 0,
    createdAt,
    time: fallbackTime = 'Aug 30',
    isPinned = false,
    userBadge = '1 🥉 Member',
    categoryTag = 'Community Post',
  } = post || {};

  const postId = _id || id;
  const authorName = authorObj?.username || post?.author || 'Community Member';
  const avatarUrl = authorObj?.avatarUrl || post?.avatar || 'https://i.pravatar.cc/150?img=33';
  const displayContent = text || fallbackContent;
  const displayImage = imageUrl || fallbackImage;

  // Check if current user liked this post
  const currentUserId = user?._id || user?.id;
  const isLikedByMe = Array.isArray(initialLikes) && initialLikes.some(
    (l) => (typeof l === 'string' ? l === currentUserId : l?.user === currentUserId || l?.user?._id === currentUserId)
  );

  const [liked, setLiked] = useState(isLikedByMe);
  const [likesCount, setLikesCount] = useState(Array.isArray(initialLikes) ? initialLikes.length : fallbackLikesCount);
  const [comments, setComments] = useState(Array.isArray(initialComments) ? initialComments : []);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [following, setFollowing] = useState(false);

  const isOwner = user && authorObj && (authorObj._id === user._id || authorObj === user._id);

  // Toggle Like Handler
  const handleLike = async () => {
    // Optimistic UI update
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
    }

    if (postId) {
      const res = await toggleLikeApi(postId);
      if (res.success && res.data?.likesCount !== undefined) {
        setLikesCount(res.data.likesCount);
      }
    }
  };

  // Add Comment Handler
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    const commentText = newComment.trim();

    if (postId) {
      const res = await addCommentApi(postId, commentText);
      if (res.success && res.data?.comments) {
        setComments(res.data.comments);
      } else {
        // Local fallback update
        setComments([...comments, { username: user?.name || 'You', text: commentText }]);
      }
    } else {
      setComments([...comments, { username: user?.name || 'You', text: commentText }]);
    }

    setNewComment('');
    setSubmittingComment(false);
  };

  // Delete Post Handler
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      if (postId) {
        await deletePostApi(postId);
      }
      if (onDeleteSuccess) {
        onDeleteSuccess(postId);
      }
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
            <Avatar src={avatarUrl} alt={authorName} sx={{ width: 44, height: 44, border: '2px solid #f2b705' }} />
            <Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#eef0f4' }}>
                  {authorName}
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
                {fallbackUsername} • {createdAt ? new Date(createdAt).toLocaleDateString() : fallbackTime}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {!isOwner ? (
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
                }}
              >
                {following ? 'Following' : 'Follow'}
              </Button>
            ) : (
              <IconButton size="small" onClick={handleDelete} sx={{ color: '#ef4444' }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
            <IconButton size="small" sx={{ color: '#9096a8' }}>
              <MoreIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* Post Content */}
        <Typography variant="body2" sx={{ color: '#eef0f4', mb: 2, lineHeight: 1.6 }}>
          {displayContent}
        </Typography>

        {/* Post Image */}
        {displayImage && (
          <Box
            component="img"
            src={displayImage}
            alt="Post media"
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
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={handleLike}>
            <IconButton size="small" sx={{ p: 0, color: liked ? '#ef4444' : '#9096a8' }}>
              {liked ? <HeartFilledIcon fontSize="small" /> : <HeartOutlineIcon fontSize="small" />}
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 600, color: liked ? '#ef4444' : '#9096a8' }}>
              {likesCount}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowComments(!showComments)}>
            <IconButton size="small" sx={{ p: 0, color: '#9096a8' }}>
              <CommentIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#9096a8' }}>
              {comments.length || fallbackCommentsCount}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', cursor: 'pointer' }}>
            <IconButton size="small" sx={{ p: 0, color: '#9096a8' }}>
              <ShareIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#9096a8' }}>
              0
            </Typography>
          </Stack>
        </Stack>

        {/* Comments Section Drawer */}
        <Collapse in={showComments} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #262936' }}>
            {/* Input comment field */}
            <Box component="form" onSubmit={handleAddComment} sx={{ mb: 2 }}>
              <TextField
                placeholder="Write a comment..."
                size="small"
                fullWidth
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                slotProps={{
                  input: {
                    style: { color: '#eef0f4', fontSize: '0.85rem' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" type="submit" disabled={submittingComment || !newComment.trim()} sx={{ color: '#f2b705' }}>
                          <SendIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0f1117',
                    borderRadius: 20,
                    '& fieldset': { borderColor: '#262936' },
                  },
                }}
              />
            </Box>

            {/* Comments list */}
            <Stack spacing={1.5}>
              {comments.map((comment, index) => (
                <Box key={index} sx={{ backgroundColor: '#0f1117', p: 1.5, borderRadius: 2, border: '1px solid #262936' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#f2b705', mr: 1 }}>
                    {comment.user?.username || comment.username || 'User'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#eef0f4' }}>
                    {comment.text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default PostCard;
