import React from 'react';
import { Stack, Chip } from '@mui/material';

function FilterTabs({ activeFilter, onSelectFilter }) {
  const filters = ['All Post', 'For You', 'Most Liked', 'Most Commented'];

  return (
    <Stack direction="row" spacing={1.5} sx={{ overflowX: 'auto', py: 1, mb: 2, '::-webkit-scrollbar': { display: 'none' } }}>
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <Chip
            key={filter}
            label={filter}
            onClick={() => onSelectFilter(filter)}
            variant={isActive ? 'contained' : 'outlined'}
            sx={{
              px: 1,
              py: 2,
              borderRadius: 20,
              fontSize: '0.85rem',
              fontWeight: 600,
              backgroundColor: isActive ? '#2563eb' : '#121824',
              color: isActive ? '#ffffff' : '#94a3b8',
              borderColor: isActive ? '#2563eb' : 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: isActive ? '#1d4ed8' : 'rgba(255, 255, 255, 0.08)',
              },
            }}
          />
        );
      })}
    </Stack>
  );
}

export default FilterTabs;
