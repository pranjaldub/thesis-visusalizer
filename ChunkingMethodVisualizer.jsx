import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Chip,
  Grid,
  Paper,
  useTheme,
  alpha,
  useMediaQuery,
} from '@mui/material';
import {
  AutoAwesome,
  Speed,
  Science,
  TrendingUp,
  DataObject,
} from '@mui/icons-material';
import FixedChunkingDiagram from './chunking_methods/FixedChunkingDiagram';
import AdaptiveChunkingDiagram from './chunking_methods/AdaptiveChunkingDiagram';
import SentenceDensityChunkingDiagram from './chunking_methods/SentenceDensityChunkingDiagram';
import GradientChunkingDiagram from './chunking_methods/GradientChunkingDiagram';
import GradientFinalChunkingDiagram from './chunking_methods/GradientFinalChunkingDiagram';

const chunkingMethods = [
  {
    id: 'fixed',
    name: 'Fixed Overlap Chunking',
    shortName: 'Fixed',
    icon: <DataObject />,
    color: '#3b82f6',
    description: 'Simple sliding window approach with fixed chunk size and overlap',
    component: FixedChunkingDiagram,
    features: ['Fixed chunk size', 'Configurable overlap', 'Fast processing', 'Predictable behavior'],
  },
  {
    id: 'adaptive',
    name: 'Adaptive Overlap Chunking',
    shortName: 'Adaptive',
    icon: <AutoAwesome />,
    color: '#8b5cf6',
    description: 'Dynamic overlap based on semantic similarity between consecutive chunks',
    component: AdaptiveChunkingDiagram,
    features: ['Semantic similarity analysis', 'Dynamic overlap', 'Context-aware boundaries', 'Paragraph-based'],
  },
  {
    id: 'sentence_density',
    name: 'Sentence Density Adaptive',
    shortName: 'Density',
    icon: <TrendingUp />,
    color: '#10b981',
    description: 'Adapts chunk size based on sentence density and keyword importance',
    component: SentenceDensityChunkingDiagram,
    features: ['Sentence density analysis', 'Keyword tracking', 'Smart merging', 'Dynamic sizing'],
  },
  {
    id: 'gradient',
    name: 'Gradient Chunking',
    shortName: 'Gradient',
    icon: <Science />,
    color: '#f59e0b',
    description: 'Uses semantic gradients to find optimal chunk boundaries',
    component: GradientChunkingDiagram,
    features: ['Gradient-based boundaries', 'Semantic coherence', 'Topic transitions', 'Embeddings-based'],
  },
  {
    id: 'gradient_final',
    name: 'Gradient Chunking Final',
    shortName: 'Gradient+',
    icon: <Speed />,
    color: '#ec4899',
    description: 'Enhanced gradient chunking with optimized boundary detection',
    component: GradientFinalChunkingDiagram,
    features: ['Advanced gradients', 'Multi-scale analysis', 'Optimized performance', 'Quality boundaries'],
  },
];

const ChunkingMethodVisualizer = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const currentMethod = chunkingMethods[selectedTab];
  const DiagramComponent = currentMethod.component;

  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: '100vh', 
      bgcolor: 'background.default', 
      py: { xs: 2, sm: 3, md: 4 } 
    }}>
      <Box sx={{ 
        maxWidth: '1400px', 
        mx: 'auto', 
        px: { xs: 2, sm: 3 } 
      }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' }
            }}
          >
            Chunking Algorithms Visualizer
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
              px: { xs: 2, sm: 0 }
            }}
          >
            Interactive workflows showing how different chunking methods process and split text
          </Typography>
        </Box>

        {/* Tabs */}
        <Paper
          elevation={0}
          sx={{
            mb: { xs: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
            overflow: 'hidden',
            bgcolor: alpha(theme.palette.primary.main, 0.03),
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTab-root': {
                minHeight: { xs: 56, sm: 64, md: 72 },
                textTransform: 'none',
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                fontWeight: 600,
                px: { xs: 1.5, sm: 2, md: 3 },
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              },
              '& .Mui-selected': {
                color: currentMethod.color,
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                bgcolor: currentMethod.color,
              },
              '& .MuiTabs-scrollButtons': {
                '&.Mui-disabled': { opacity: 0.3 },
              },
            }}
          >
            {chunkingMethods.map((method, index) => (
              <Tab
                key={method.id}
                icon={React.cloneElement(method.icon, { 
                  sx: { fontSize: { xs: '1.2rem', sm: '1.5rem' } } 
                })}
                iconPosition="start"
                label={isMobile ? method.shortName : method.name}
                sx={{
                  color: selectedTab === index ? method.color : 'text.secondary',
                  minWidth: { xs: 'auto', sm: 120 },
                }}
              />
            ))}
          </Tabs>
        </Paper>

        {/* Method Info Card */}
        <Card
          elevation={0}
          sx={{
            mb: { xs: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
            background: `linear-gradient(135deg, ${alpha(currentMethod.color, 0.1)} 0%, ${alpha(
              currentMethod.color,
              0.05
            )} 100%)`,
            border: `1px solid ${alpha(currentMethod.color, 0.2)}`,
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'flex-start' }, 
              gap: 2, 
              mb: 3 
            }}>
              <Box
                sx={{
                  p: { xs: 1.2, sm: 1.5 },
                  borderRadius: 2,
                  bgcolor: alpha(currentMethod.color, 0.15),
                  color: currentMethod.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  flexShrink: 0
                }}
              >
                {currentMethod.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700, 
                    color: currentMethod.color, 
                    mb: 1,
                    fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
                  }}
                >
                  {currentMethod.name}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' } }}
                >
                  {currentMethod.description}
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={{ xs: 1, sm: 1.5 }}>
              {currentMethod.features.map((feature, idx) => (
                <Grid item key={idx} xs={6} sm={6} md={3}>
                  <Chip
                    label={feature}
                    size={isMobile ? 'small' : 'medium'}
                    sx={{
                      bgcolor: alpha(currentMethod.color, 0.12),
                      color: currentMethod.color,
                      fontWeight: 600,
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                      border: `1px solid ${alpha(currentMethod.color, 0.3)}`,
                      width: '100%',
                      '& .MuiChip-label': {
                        px: { xs: 1, sm: 1.5, md: 2 },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Diagram */}
        <Card
          elevation={0}
          sx={{
            borderRadius: { xs: 2, md: 3 },
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            overflow: 'hidden',
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <DiagramComponent color={currentMethod.color} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ChunkingMethodVisualizer;