import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, alpha, useTheme, useMediaQuery } from '@mui/material';
import {
  ArrowForward,
  ShowChart,
  CompareArrows,
  TrendingDown,
  CheckCircle,
  Insights,
} from '@mui/icons-material';

const GradientChunkingDiagram = ({ color }) => {
  const theme = useTheme();
  const canvasRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const scale = isMobile ? 0.75 : 1;
    const points = [
      { x: 50 * scale, y: 150 },
      { x: 120 * scale, y: 140 },
      { x: 190 * scale, y: 135 },
      { x: 260 * scale, y: 160 },
      { x: 330 * scale, y: 90 },
      { x: 400 * scale, y: 85 },
      { x: 470 * scale, y: 110 },
      { x: 540 * scale, y: 60 },
      { x: 610 * scale, y: 55 },
      { x: 680 * scale, y: 80 },
      { x: 750 * scale, y: 50 },
    ];

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const xc = (points[i].x + points[i - 1].x) / 2;
      const yc = (points[i].y + points[i - 1].y) / 2;
      ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.lineTo(points[points.length - 1].x, height);
    ctx.lineTo(points[0].x, height);
    ctx.closePath();
    ctx.fillStyle = alpha(color, 0.1);
    ctx.fill();

    const boundaries = [3, 6, 9];
    boundaries.forEach((idx) => {
      const point = points[idx];
      
      ctx.strokeStyle = alpha(color, 0.6);
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x, height - 30);
      ctx.stroke();
      ctx.setLineDash([]);
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.fillStyle = color;
      ctx.font = `bold ${isMobile ? '10px' : '12px'} Arial`;
      ctx.textAlign = 'center';
      ctx.fillText('Boundary', point.x, height - 10);
    });

    ctx.fillStyle = theme.palette.text.primary;
    ctx.font = `${isMobile ? '11px' : '13px'} Arial`;
    ctx.textAlign = 'left';
    ctx.fillText('Semantic Similarity →', points[0].x, 30);
    
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Gradient Magnitude', 0, 0);
    ctx.restore();

    const chunkRegions = [
      { start: points[0].x, end: points[3].x, label: 'Chunk 1' },
      { start: points[3].x, end: points[6].x, label: 'Chunk 2' },
      { start: points[6].x, end: points[9].x, label: 'Chunk 3' },
      { start: points[9].x, end: points[10].x, label: 'Chunk 4' },
    ];

    chunkRegions.forEach((region, idx) => {
      const y = height - 50;
      const regionColor = alpha(color, 0.15 + idx * 0.1);
      
      ctx.fillStyle = regionColor;
      ctx.fillRect(region.start, y, region.end - region.start, 20);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(region.start, y, region.end - region.start, 20);
      
      ctx.fillStyle = theme.palette.text.primary;
      ctx.font = `bold ${isMobile ? '9px' : '11px'} Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(region.label, (region.start + region.end) / 2, y + 14);
    });

  }, [color, theme, isMobile]);

  const steps = [
    {
      icon: <ShowChart />,
      title: 'Embed Sentences',
      description: 'Generate embeddings for each sentence',
    },
    {
      icon: <CompareArrows />,
      title: 'Compute Gradients',
      description: 'Calculate similarity changes between consecutive sentences',
    },
    {
      icon: <TrendingDown />,
      title: 'Find Peaks',
      description: 'Identify high gradient points (topic shifts)',
    },
    {
      icon: <CheckCircle />,
      title: 'Set Boundaries',
      description: 'Split at gradient peaks for semantic chunks',
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Workflow Steps */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            mb: { xs: 2, md: 3 }, 
            color: 'text.primary',
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Workflow Steps
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2, 
          overflowX: 'auto',  
          alignItems: { xs: 'stretch', md: 'center' },
          flexWrap: 'wrap'
        }}>
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: 2,
                  border: `2px solid ${alpha(color, 0.2)}`,
                  bgcolor: alpha(color, 0.05),
                  flex: { xs: '1 1 100%', md: 1 },
                  minWidth: { md: 180 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${alpha(color, 0.2)}`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box
                    sx={{
                      p: { xs: 0.8, sm: 1 },
                      borderRadius: 1.5,
                      bgcolor: alpha(color, 0.15),
                      color: color,
                      display: 'flex',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' }
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                  >
                    {step.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
                  {step.description}
                </Typography>
              </Paper>
              {idx < steps.length - 1 && (
                <ArrowForward 
                  sx={{ 
                    color: color, 
                    fontSize: 28,
                    display: { xs: 'none', md: 'block' }
                  }} 
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Box>

      {/* Visual Diagram */}
      <Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            mb: { xs: 2, md: 3 }, 
            color: 'text.primary',
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Semantic Gradient Analysis
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            bgcolor: alpha(color, 0.03),
            border: `1px solid ${alpha(color, 0.15)}`,
          }}
        >
          <Box sx={{ overflow: 'auto' }}>
            <canvas
              ref={canvasRef}
              width={isMobile ? 600 : 800}
              height={250}
              style={{ width: '100%', height: 'auto', display: 'block', minWidth: isMobile ? '300px' : 'auto' }}
            />
          </Box>
          
          {/* Explanation */}
          <Box sx={{ mt: 3, p: { xs: 2, sm: 2.5 }, borderRadius: 2, bgcolor: alpha(color, 0.08) }}>
            <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
              <Insights sx={{ color: color, fontSize: { xs: 24, sm: 28 }, flexShrink: 0 }} />
              <Box>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1, 
                    color: color,
                    fontSize: { xs: '0.85rem', sm: '0.95rem' }
                  }}
                >
                  How it works:
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  The algorithm computes semantic similarity between consecutive sentences. Large drops in similarity 
                  (gradient peaks) indicate topic transitions - ideal chunk boundaries.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    color: 'text.primary',
                    bgcolor: alpha(theme.palette.common.black, 0.05),
                    p: { xs: 1, sm: 1.5 },
                    borderRadius: 1,
                    mt: 1,
                    fontSize: { xs: '0.7rem', sm: '0.875rem' },
                    overflowX: 'auto'
                  }}
                >
                  gradient[i] = 1 - cosine_similarity(embed[i], embed[i+1])
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Algorithm Advantages */}
      <Box sx={{ mt: { xs: 3, md: 4 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            mb: 2, 
            color: 'text.primary',
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Key Features
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 2 
        }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: 2,
              border: `1px solid ${alpha(color, 0.15)}`,
              bgcolor: alpha(color, 0.05),
            }}
          >
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 700, 
                mb: 1.5, 
                color: color,
                fontSize: { xs: '0.85rem', sm: '0.95rem' }
              }}
            >
              Natural Topic Boundaries
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Identifies where content naturally shifts topics, ensuring chunks contain cohesive semantic units 
              rather than arbitrary splits.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: 2,
              border: `1px solid ${alpha(color, 0.15)}`,
              bgcolor: alpha(color, 0.05),
            }}
          >
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 700, 
                mb: 1.5, 
                color: color,
                fontSize: { xs: '0.85rem', sm: '0.95rem' }
              }}
            >
              Gradient-Based Detection
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Uses rate of change in semantic similarity rather than absolute values, making it robust to 
              varying content densities and styles.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: 2,
              border: `1px solid ${alpha(color, 0.15)}`,
              bgcolor: alpha(color, 0.05),
            }}
          >
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 700, 
                mb: 1.5, 
                color: color,
                fontSize: { xs: '0.85rem', sm: '0.95rem' }
              }}
            >
              Configurable Sensitivity
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Threshold parameters allow tuning between more granular chunks (lower threshold) or broader 
              topic-level chunks (higher threshold).
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Key Characteristics */}
      <Box sx={{ mt: { xs: 3, md: 4 } }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            mb: 2, 
            color: 'text.primary',
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Key Characteristics
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 2 
        }}>
          {[
            {
              label: 'Pros',
              items: [
                'Topic-aware boundaries',
                'Semantically coherent chunks',
                'Handles content transitions well',
                'No arbitrary splits',
              ],
            },
            {
              label: 'Cons',
              items: [
                'Computationally intensive',
                'Requires quality embeddings',
                'Variable chunk sizes',
                'Threshold tuning needed',
              ],
            },
          ].map((section, idx) => (
            <Paper
              key={idx}
              elevation={0}
              sx={{
                p: { xs: 2, sm: 2.5 },
                borderRadius: 2,
                border: `1px solid ${alpha(color, 0.15)}`,
                bgcolor: 'background.paper',
              }}
            >
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 1.5, 
                  color: color,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                {section.label}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                {section.items.map((item, itemIdx) => (
                  <Typography
                    key={itemIdx}
                    component="li"
                    variant="body2"
                    color="text.secondary"
                    sx={{ 
                      mb: 0.5,
                      fontSize: { xs: '0.8rem', sm: '0.875rem' }
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GradientChunkingDiagram;