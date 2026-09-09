import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Fab } from '@mui/material';
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

// Initial sample feed posts
const INITIAL_POSTS = [
  {
    id: 1,
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
    id: 2,
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
  {
    id: 3,
    author: 'Sajjad Muc...',
    username: '@sajjad_gold',
    userBadge: '3 🥇 Gold',
    avatar: 'https://i.pravatar.cc/150?img=11',
    time: '2 hours ago',
    categoryTag: 'Refer And Earn',
    title: 'Daily Task Completion Tip 💡',
    content: 'Always keep your proof screenshots clear before submitting tasks to speed up point validation.',
    image: '',
    isPinned: false,
    likesCount: 45,
    commentsCount: 12,
    sharesCount: 5,
  },
];

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('feed'); // 'feed' | 'login' | 'register'
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeFilter, setActiveFilter] = useState('All Post');

  const handleAddPost = (newContent) => {
    const newPostObj = {
      id: Date.now(),
      author: user ? user.name : 'You (Logged User)',
      username: user ? `@${user.name.toLowerCase().replace(/\s+/g, '')}` : '@my_profile',
      userBadge: '1 🥉 Member',
      avatar: user?.avatar || 'https://i.pravatar.cc/150?img=12',
      time: 'Just now',
      categoryTag: 'Community Post',
      title: 'New Social Post',
      content: newContent,
      image: '',
      isPinned: false,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
    };
    setPosts([newPostObj, ...posts]);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#0f1117', pb: 10 }}>
      <Container maxWidth="sm" sx={{ pt: 1, px: 2 }}>
        {/* Top Header Navigation */}
        <Navbar onNavigate={setCurrentPage} />

        {/* Dynamic Page Views */}
        {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
        {currentPage === 'register' && <Register onNavigate={setCurrentPage} />}

        {currentPage === 'feed' && (
          <>
            {/* Create Post Input Card */}
            <CreatePostCard onAddPost={handleAddPost} />

            {/* Filter Navigation Tabs */}
            <FilterTabs activeFilter={activeFilter} onSelectFilter={setActiveFilter} />

            {/* Feed Posts */}
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
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

      {/* Bottom Navigation Bar */}
      <BottomNav />
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
