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
            variant={isActive ? 'filled' : 'outlined'}
            sx={{
              px: 1,
              py: 2,
              borderRadius: 20,
              fontSize: '0.85rem',
              fontWeight: 600,
              backgroundColor: isActive ? '#f2b705' : '#171922',
              color: isActive ? '#0f1117' : '#9096a8',
              borderColor: isActive ? '#f2b705' : '#262936',
              '&:hover': {
                backgroundColor: isActive ? '#d97706' : 'rgba(255, 255, 255, 0.05)',
              },
            }}
          />
        );
      })}
    </Stack>
  );
}

export default FilterTabs;
