import React from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';

const QualityRadar = ({ metrics }) => {
  const qualityData = [
    {
      label: 'Coherence',
      value: metrics.avg_coherence * 100,
      color: '#667eea',
    },
    {
      label: 'Context',
      value: metrics.context_preservation * 100,
      color: '#764ba2',
    },
    {
      label: 'Coverage',
      value: metrics.coverage * 100,
      color: '#10b981',
    },
    {
      label: 'Semantic',
      value: metrics.semantic_coverage * 100,
      color: '#f59e0b',
    },
  ];

  return (
    <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TrendingUp sx={{ mr: 1, color: '#667eea' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Quality Analysis
        </Typography>
      </Box>

      {qualityData.map((item, idx) => (
        <Box key={idx} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {item.label}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: item.color }}>
              {item.value.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={item.value}
            sx={{
              height: 8,
              borderRadius: 4,
              background: '#f3f4f6',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: `linear-gradient(90deg, ${item.color}CC, ${item.color})`,
              },
            }}
          />
        </Box>
      ))}

      {/* Overall Score */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: 'white', opacity: 0.9 }}>
          Overall Quality
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 800, color: 'white', mt: 1 }}>
          {(metrics.weighted_score * 100).toFixed(0)}
        </Typography>
        <Typography variant="caption" sx={{ color: 'white', opacity: 0.9 }}>
          out of 100
        </Typography>
      </Box>
    </Paper>
  );
};

export default QualityRadar;
