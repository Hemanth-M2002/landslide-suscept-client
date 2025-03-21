import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

export default function FeatureCard({ icon, title, description }) {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 345,
        bgcolor: 'rgba(28, 25, 23, 0.6)', // stone-900/60
        border: 1,
        borderColor: '#44403c', // stone-800
        transition: 'border-color 0.3s ease',
        '&:hover': { borderColor: '#92400e' }, // amber-800
      }}
    >
      <CardContent>
        <Box
          sx={{
            bgcolor: 'rgba(41, 37, 36, 0.5)', // stone-800/50
            borderRadius: '50%',
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            transition: 'background-color 0.3s ease',
            '&:hover': { bgcolor: 'rgba(146, 64, 14, 0.2)' }, // amber-900/20
          }}
        >
          {icon}
        </Box>
        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#d97706' }}> {/* amber-400 */}
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#d6d3d1' }}> {/* stone-300 */}
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1 }}>
        <IconButton aria-label="expand" size="small" sx={{ color: '#d97706' }}> {/* amber-400 */}
          <ChevronRight />
        </IconButton>
      </Box>
    </Card>
  );
}