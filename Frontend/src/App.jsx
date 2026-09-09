import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Fab, CircularProgress, Alert } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import theme from './theme/theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import CreatePostCard from './components/CreatePostCard';
import FilterTabs from './components/FilterTabs';
import PostCard from './components/PostCard';
import BottomNav from './components/BottomNav';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { fetchPosts, createPostApi } from './services/api';

// Fallback posts if backend database is offline or empty
const FALLBACK_POSTS = [
  {
    id: 'sample-1',
    author: 'Nitin Pa...',
    username: '@nitin3w',
    userBadge: '7 👑 Legend',
    avatar: 'https://i.pravatar.cc/150?img=33',
    time: 'Aug 30',
    categoryTag: 'TaskPlanet X CPA Lead',
    title: 'Earn Up to 10,000 Points with CPA Lead!',
    content: "Try CPA Lead offers, surveys and tasks to earn points. If an eligible verified task isn't credited, compensation may be given after verification. Please, Keep screenshots as proof.",
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    isPinned: true,
    likesCount: 200,
    commentsCount: 105,
    sharesCount: 14,
  },
  {
    id: 'sample-2',
    author: 'Hira Kals...',
    username: '@hashiimov8',
    userBadge: '1 🥉 Bronze',
    avatar: 'https://i.pravatar.cc/150?img=47',
    time: '8 minutes ago',
    categoryTag: '',
    title: 'Scratch Card Winner Announcement 🥳',
    content: 'Just completed the registration task ID SM3071 and earned 100 points! Check out the details below.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    isPinned: false,
    likesCount: 2,
    commentsCount: 1,
    sharesCount: 0,
  },
];

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('feed'); // 'feed' | 'login' | 'register' | 'profile'
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All Post');
  const [apiError, setApiError] = useState('');

  // Fetch live feed posts from Backend on mount
  const loadFeed = async () => {
    setLoadingPosts(true);
    const res = await fetchPosts();
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      setPosts(res.data);
      setApiError('');
    } else {
      setPosts(FALLBACK_POSTS);
      if (!res.success) {
        setApiError('Backend server offline. Showing preview sample feed.');
      }
    }
    setLoadingPosts(false);
  };

  useEffect(() => {
    loadFeed();
  }, []);

  // Handler for adding a new post
  const handleAddPost = async (formData) => {
    if (user) {
      const res = await createPostApi(formData);
      if (res.success) {
        setPosts([res.data, ...posts]);
        return { success: true };
      } else {
        return { success: false, error: res.error };
      }
    } else {
      const textContent = formData.get('text') || '';
      const newPostObj = {
        id: Date.now().toString(),
        author: 'Guest User',
        username: '@guest',
        userBadge: '1 🥉 Member',
        avatar: 'https://i.pravatar.cc/150?img=12',
        time: 'Just now',
        categoryTag: 'Community Post',
        content: textContent,
        image: '',
        isPinned: false,
        likesCount: 0,
        commentsCount: 0,
      };
      setPosts([newPostObj, ...posts]);
      return { success: true };
    }
  };

  const handleDeleteSuccess = (deletedId) => {
    setPosts(posts.filter((p) => (p._id || p.id) !== deletedId));
  };

  // Filter posts created by logged-in user
  const userPosts = posts.filter((p) => {
    if (!user) return false;
    const authorId = p.user?._id || p.user;
    return authorId === user._id || authorId === user.id;
  });

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#0f1117', pb: 10 }}>
      <Container maxWidth="sm" sx={{ pt: 1, px: 2 }}>
        {/* Top Header Navigation */}
        <Navbar onNavigate={setCurrentPage} />

        {/* Dynamic Page Views */}
        {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
        {currentPage === 'register' && <Register onNavigate={setCurrentPage} />}
        {currentPage === 'profile' && <Profile onNavigate={setCurrentPage} userPosts={userPosts} />}

        {currentPage === 'feed' && (
          <>
            {apiError && (
              <Alert severity="info" sx={{ mb: 2, backgroundColor: 'rgba(242, 183, 5, 0.1)', color: '#f2b705', border: '1px solid rgba(242, 183, 5, 0.3)' }}>
                {apiError}
              </Alert>
            )}

            {/* Create Post Input Card */}
            <CreatePostCard onAddPost={handleAddPost} />

            {/* Filter Navigation Tabs */}
            <FilterTabs activeFilter={activeFilter} onSelectFilter={setActiveFilter} />

            {/* Loading Indicator */}
            {loadingPosts ? (
              <Box textAlign="center" py={4}>
                <CircularProgress sx={{ color: '#f2b705' }} />
              </Box>
            ) : (
              posts.map((post) => (
                <PostCard key={post._id || post.id} post={post} onDeleteSuccess={handleDeleteSuccess} />
              ))
            )}
          </>
        )}
      </Container>

      {/* Floating Action Button (+) */}
      {currentPage === 'feed' && (
        <Fab
          aria-label="add post"
          sx={{
            position: 'fixed',
            bottom: 76,
            right: 20,
            backgroundColor: '#0f1117',
            border: '2px solid #f2b705',
            color: '#f2b705',
            boxShadow: '0 0 15px rgba(242, 183, 5, 0.4)',
            '&:hover': {
              backgroundColor: '#f2b705',
              color: '#0f1117',
            },
          }}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Bottom TaskPlanet Navigation Bar */}
      <BottomNav onNavigate={setCurrentPage} />
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
