import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, alpha, useTheme, useMediaQuery } from '@mui/material';
import {
  ArrowForward,
  AutoGraph,
  Psychology,
  Calculate,
  Storage,
} from '@mui/icons-material';

const AdaptiveChunkingDiagram = ({ color }) => {
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
    const chunks = [
      { width: 150 * scale, overlap: 30 * scale, similarity: 0.85 },
      { width: 170 * scale, overlap: 60 * scale, similarity: 0.45 },
      { width: 140 * scale, overlap: 35 * scale, similarity: 0.78 },
    ];

    const startX = isMobile ? 20 : 30;
    const startY = height / 2 - 35;
    const chunkHeight = isMobile ? 60 : 70;
    let currentX = startX;

    chunks.forEach((chunk, i) => {
      const gradient = ctx.createLinearGradient(currentX, startY, currentX + chunk.width, startY + chunkHeight);
      gradient.addColorStop(0, alpha(color, 0.4));
      gradient.addColorStop(1, alpha(color, 0.2));
      ctx.fillStyle = gradient;
      ctx.fillRect(currentX, startY, chunk.width, chunkHeight);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(currentX, startY, chunk.width, chunkHeight);
      
      if (i > 0) {
        ctx.fillStyle = alpha(color, 0.7);
        ctx.fillRect(currentX, startY, chunk.overlap, chunkHeight);
        
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${isMobile ? '9px' : '11px'} Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(chunk.overlap)}`, currentX + chunk.overlap / 2, startY + chunkHeight / 2);
      }
      
      ctx.fillStyle = theme.palette.text.primary;
      ctx.font = `bold ${isMobile ? '12px' : '14px'} Arial`;
      ctx.textAlign = 'center';
      const labelX = i === 0 ? currentX + chunk.width / 2 : currentX + chunk.overlap + (chunk.width - chunk.overlap) / 2;
      ctx.fillText(`C${i + 1}`, labelX, startY + chunkHeight / 2 + 5);
      
      if (i < chunks.length - 1) {
        ctx.fillStyle = color;
        ctx.font = `${isMobile ? '10px' : '12px'} Arial`;
        ctx.textAlign = 'center';
        const scoreX = currentX + chunk.width - chunk.overlap / 2;
        ctx.fillText(`sim: ${chunk.similarity}`, scoreX, startY - 15);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(scoreX, startY - 8);
        ctx.lineTo(scoreX, startY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      currentX += chunk.width - chunk.overlap;
    });

    ctx.fillStyle = color;
    ctx.font = `italic ${isMobile ? '11px' : '13px'} Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('Dynamic overlap based on semantic similarity', width / 2, height - 25);

  }, [color, theme, isMobile]);

  const steps = [
    {
      icon: <AutoGraph />,
      title: 'Parse Paragraphs',
      description: 'Split text into paragraph units',
    },
    {
      icon: <Psychology />,
      title: 'Embed Chunks',
      description: 'Generate semantic embeddings',
    },
    {
      icon: <Calculate />,
      title: 'Calculate Similarity',
      description: 'Compute cosine similarity between chunks',
    },
    {
      icon: <Storage />,
      title: 'Adjust Overlap',
      description: 'Set overlap inversely to similarity',
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
          overflowX: 'auto',                  // ← ADD THIS
  pb: 2,    flexWrap: 'nowrap',
          gap: 2, 
          alignItems: { xs: 'stretch', md: 'center' }
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
                  flex: 1,
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
                      fontSize: { xs: '0.85rem', sm: '0.95rem' }
                    }}
                  >
                    {step.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}
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
          Visual Representation
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
              height={220}
              style={{ width: '100%', height: 'auto', display: 'block', minWidth: isMobile ? '300px' : 'auto' }}
            />
          </Box>
          
          {/* Formula */}
          <Box sx={{ mt: 3, p: { xs: 2, sm: 2.5 }, borderRadius: 2, bgcolor: alpha(color, 0.08) }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 700, 
                mb: 1, 
                color: color,
                fontSize: { xs: '0.85rem', sm: '0.95rem' }
              }}
            >
              Overlap Calculation Formula:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'monospace',
                color: 'text.primary',
                bgcolor: alpha(theme.palette.common.black, 0.05),
                p: { xs: 1, sm: 1.5 },
                borderRadius: 1,
                fontSize: { xs: '0.75rem', sm: '0.95rem' },
                overflowX: 'auto'
              }}
            >
              overlap = min_overlap + (max_overlap - min_overlap) × (1 - similarity)
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                display: 'block', 
                mt: 1,
                fontSize: { xs: '0.7rem', sm: '0.75rem' }
              }}
            >
              Higher similarity → Lower overlap needed | Lower similarity → Higher overlap for context preservation
            </Typography>
          </Box>
        </Paper>
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
                'Semantic awareness',
                'Context-preserving boundaries', 
                'Adaptive to content changes',
                'Better coherence'
              ] 
            },
            { 
              label: 'Cons', 
              items: [
                'Requires embedding model',
                'Slower than fixed chunking', 
                'Higher computational cost',
                'Variable chunk sizes'
              ] 
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

export default AdaptiveChunkingDiagram;