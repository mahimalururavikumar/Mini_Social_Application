import React, { useState } from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { HomeOutlined as HomeIcon, AssignmentOutlined as TasksIcon, PublicOutlined as SocialIcon, EmojiEventsOutlined as LeaderboardIcon, ChatBubbleOutlineOutlined as ChatIcon } from '@mui/icons-material';

function BottomNav() {
  const [value, setValue] = useState(2); // Default 'Social' tab active

  return (
    <Paper
      elevation={10}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#0f1117',
        borderTop: '1px solid #262936',
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: '#0f1117',
          height: 64,
          '& .MuiBottomNavigationAction-root': {
            color: '#9096a8',
            minWidth: 'auto',
            py: 1,
            '&.Mui-selected': {
              color: '#f2b705',
            },
          },
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Tasks" icon={<TasksIcon />} />
        <BottomNavigationAction label="Social" icon={<SocialIcon />} />
        <BottomNavigationAction label="Leader Board" icon={<LeaderboardIcon />} />
        <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
