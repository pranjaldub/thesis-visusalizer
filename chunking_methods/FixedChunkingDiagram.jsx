import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, alpha, useTheme, useMediaQuery } from '@mui/material';
import {
  ArrowForward,
  TextFields,
  ContentCut,
  Storage,
} from '@mui/icons-material';

const FixedChunkingDiagram = ({ color }) => {
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

    const chunkWidth = isMobile ? 120 : 160;
    const chunkHeight = isMobile ? 50 : 60;
    const overlapWidth = isMobile ? 35 : 50;
    const startX = isMobile ? 30 : 50;
    const startY = height / 2 - chunkHeight / 2;

    for (let i = 0; i < 3; i++) {
      const x = startX + i * (chunkWidth - overlapWidth);
      
      ctx.fillStyle = alpha(color, 0.3);
      ctx.fillRect(x, startY, chunkWidth, chunkHeight);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, startY, chunkWidth, chunkHeight);
      
      if (i > 0) {
        ctx.fillStyle = alpha(color, 0.6);
        ctx.fillRect(x, startY, overlapWidth, chunkHeight);
        
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${isMobile ? '10px' : '12px'} Arial`;
        ctx.textAlign = 'center';
        ctx.fillText('Overlap', x + overlapWidth / 2, startY + chunkHeight / 2 + 5);
      }
      
      ctx.fillStyle = theme.palette.text.primary;
      ctx.font = `${isMobile ? '12px' : '14px'} Arial`;
      ctx.textAlign = 'center';
      const labelX = i === 0 ? x + chunkWidth / 2 : x + overlapWidth + (chunkWidth - overlapWidth) / 2;
      ctx.fillText(`Chunk ${i + 1}`, labelX, startY + chunkHeight / 2 + 5);
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    for (let i = 0; i < 2; i++) {
      const arrowX = startX + (i + 1) * (chunkWidth - overlapWidth) - 10;
      const arrowY = startY - 20;
      
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX + chunkWidth - overlapWidth - 30, arrowY);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(arrowX + chunkWidth - overlapWidth - 30, arrowY);
      ctx.lineTo(arrowX + chunkWidth - overlapWidth - 40, arrowY - 5);
      ctx.lineTo(arrowX + chunkWidth - overlapWidth - 40, arrowY + 5);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }

  }, [color, theme, isMobile]);

  const steps = [
    {
      icon: <TextFields />,
      title: 'Input Text',
      description: 'Raw text is tokenized into words',
    },
    {
      icon: <ContentCut />,
      title: 'Fixed Sliding Window',
      description: 'Split with fixed chunk_size and overlap',
    },
    {
      icon: <Storage />,
      title: 'Store Chunks',
      description: 'Chunks stored with consistent sizes',
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
          overflowX: 'auto',  
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
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }}
                  >
                    {step.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                >
                  {step.description}
                </Typography>
              </Paper>
              {idx < steps.length - 1 && (
                <ArrowForward 
                  sx={{ 
                    color: color, 
                    fontSize: 28,
                    display: { xs: 'none', md: 'block' },
                    transform: { xs: 'rotate(90deg)', md: 'rotate(0deg)' }
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
              height={200}
              style={{ width: '100%', height: 'auto', display: 'block', minWidth: isMobile ? '300px' : 'auto' }}
            />
          </Box>
          
          {/* Parameters */}
          <Box sx={{ 
            mt: 3, 
            display: 'flex', 
            gap: { xs: 2, sm: 3 }, 
            flexWrap: 'wrap', 
            justifyContent: 'center' 
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Chunk Size
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: color, 
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                150 tokens
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Overlap
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: color, 
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                70 tokens
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Time Complexity
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: color, 
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.25rem' }
                }}
              >
                O(n)
              </Typography>
            </Box>
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
            { label: 'Pros', items: ['Fast and predictable', 'Simple implementation', 'Consistent chunk sizes'] },
            { label: 'Cons', items: ['No semantic awareness', 'May split contexts', 'Fixed parameters'] },
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

export default FixedChunkingDiagram;