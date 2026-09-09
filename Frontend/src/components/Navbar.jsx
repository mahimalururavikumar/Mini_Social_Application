import React from 'react';
import { Box, Typography, Avatar, IconButton, InputBase, Paper, Stack } from '@mui/material';
import { Search as SearchIcon, DarkMode as DarkModeIcon, Star as StarIcon } from '@mui/icons-material';

function Navbar() {
  return (
    <Box sx={{ pb: 2 }}>
      {/* Top Header Row */}
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.5, color: '#eef0f4' }}>
          Social
        </Typography>

        {/* Header Stats Chips & Profile Avatar */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          {/* Points Chip */}
          <Paper
            elevation={0}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 20,
              backgroundColor: 'rgba(242, 183, 5, 0.12)',
              border: '1px solid rgba(242, 183, 5, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#f2b705' }}>
              400
            </Typography>
            <StarIcon sx={{ fontSize: 14, color: '#f2b705' }} />
          </Paper>

          {/* Currency Chip */}
          <Paper
            elevation={0}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 20,
              backgroundColor: '#171922',
              border: '1px solid #262936',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#eef0f4' }}>
              ₹0.00
            </Typography>
          </Paper>

          {/* Dark Mode Moon Icon */}
          <IconButton size="small" sx={{ color: '#f2b705' }}>
            <DarkModeIcon fontSize="small" />
          </IconButton>

          {/* Profile Avatar */}
          <Avatar
            alt="User Profile"
            src="https://i.pravatar.cc/150?img=12"
            sx={{ width: 38, height: 38, border: '2px solid #f2b705' }}
          />
        </Stack>
      </Stack>

      {/* Search Bar */}
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mt: 1 }}>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            px: 2,
            py: 0.8,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#171922',
            borderRadius: 24,
            border: '1px solid #262936',
          }}
        >
          <InputBase
            placeholder="Search promotions, users, posts..."
            fullWidth
            sx={{ color: '#eef0f4', fontSize: '0.9rem' }}
          />
        </Paper>
        <IconButton
          sx={{
            backgroundColor: 'rgba(242, 183, 5, 0.15)',
            border: '1px solid #f2b705',
            color: '#f2b705',
            width: 44,
            height: 44,
            '&:hover': { backgroundColor: '#f2b705', color: '#0f1117' },
          }}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default Navbar;
