import React from 'react';
import { Box, Typography, Avatar, IconButton, Badge, InputBase, Paper, Stack } from '@mui/material';
import { Search as SearchIcon, DarkMode as DarkModeIcon, Star as StarIcon } from '@mui/icons-material';

function Navbar() {
  return (
    <Box sx={{ pb: 2 }}>
      {/* Top Header Row */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" py={1.5}>
        <Typography variant="h5" fontWeight="800" sx={{ letterSpacing: -0.5, color: '#ffffff' }}>
          Social
        </Typography>

        {/* Header Badges & User Profile Icon */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          {/* Points Chip */}
          <Paper
            elevation={0}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 20,
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography variant="caption" fontWeight="700" color="#f87171">
              400
            </Typography>

          </Paper>

          {/* Currency Chip */}
          <Paper
            elevation={0}
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="caption" fontWeight="700" color="#f8fafc">
              ₹0.00
            </Typography>
          </Paper>

          {/* Dark Mode Moon Icon */}
          <IconButton size="small" sx={{ color: '#fbbf24' }}>
            <DarkModeIcon fontSize="small" />
          </IconButton>

          {/* User Avatar with Progress Ring */}
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <Avatar
              alt="User Profile"
              src="https://i.pravatar.cc/150?img=12"
              sx={{ width: 38, height: 38, border: '2px solid #22c55e' }}
            />
          </Box>
        </Stack>
      </Stack>

      {/* Search Bar matching TaskPlanet reference */}
      <Stack direction="row" spacing={1} alignItems="center" mt={1}>
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            px: 2,
            py: 0.8,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#121824',
            borderRadius: 24,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <InputBase
            placeholder="Search promotions, users, posts..."
            fullWidth
            sx={{ color: '#f8fafc', fontSize: '0.9rem' }}
          />
        </Paper>
        <IconButton
          sx={{
            backgroundColor: 'rgba(37, 99, 235, 0.15)',
            border: '1px solid #2563eb',
            color: '#60a5fa',
            width: 44,
            height: 44,
            '&:hover': { backgroundColor: '#2563eb', color: '#fff' },
          }}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default Navbar;
