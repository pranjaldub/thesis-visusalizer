import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, alpha, useTheme, useMediaQuery } from '@mui/material';
import {
  ArrowForward,
  TextSnippet,
  MergeType,
  LocalOffer,
  Analytics,
  Lightbulb,
} from '@mui/icons-material';

const SentenceDensityChunkingDiagram = ({ color }) => {
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

    const sentences = [
      { words: 5, density: 'low' },
      { words: 4, density: 'low' },
      { words: 12, density: 'high' },
      { words: 8, density: 'medium' },
      { words: 15, density: 'high' },
      { words: 6, density: 'low' },
      { words: 11, density: 'medium' },
    ];

    const scale = isMobile ? 0.8 : 1;
    const sentenceWidth = 80 * scale;
    const sentenceHeight = 50 * scale;
    const gap = 10 * scale;
    const startX = isMobile ? 25 : 40;
    const startY = 60;
    const cols = isMobile ? 3 : 4;

    sentences.forEach((sent, i) => {
      const x = startX + (i % cols) * (sentenceWidth + gap);
      const y = startY + Math.floor(i / cols) * (sentenceHeight + gap + 30);
      
      let densityColor;
      if (sent.density === 'low') densityColor = alpha(color, 0.2);
      else if (sent.density === 'medium') densityColor = alpha(color, 0.5);
      else densityColor = alpha(color, 0.8);
      
      ctx.fillStyle = densityColor;
      ctx.fillRect(x, y, sentenceWidth, sentenceHeight);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, sentenceWidth, sentenceHeight);
      
      ctx.fillStyle = theme.palette.text.primary;
      ctx.font = `bold ${isMobile ? '12px' : '14px'} Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(`${sent.words}w`, x + sentenceWidth / 2, y + sentenceHeight / 2);
      
      ctx.fillStyle = color;
      ctx.font = `${isMobile ? '9px' : '10px'} Arial`;
      ctx.fillText(sent.density, x + sentenceWidth / 2, y + sentenceHeight + 15);
    });

    const drawMergeArrow = (x1, y1, x2, y2) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.setLineDash([]);
      
      const angle = Math.atan2(y2 - y1, x2 - x1);
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI / 6), y2 - 10 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI / 6), y2 - 10 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    drawMergeArrow(
      startX + sentenceWidth, 
      startY + sentenceHeight / 2, 
      startX + sentenceWidth + gap, 
      startY + sentenceHeight / 2
    );

    ctx.fillStyle = color;
    ctx.font = `italic ${isMobile ? '10px' : '12px'} Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('Low-density sentences merged', width / 2, height - 20);

  }, [color, theme, isMobile]);

  const steps = [
    {
      icon: <TextSnippet />,
      title: 'Tokenize Sentences',
      description: 'Split text into individual sentences',
    },
    {
      icon: <Analytics />,
      title: 'Analyze Density',
      description: 'Calculate words per sentence',
    },
    {
      icon: <MergeType />,
      title: 'Merge Short',
      description: 'Combine low-density sentences',
    },
    {
      icon: <LocalOffer />,
      title: 'Extract Keywords',
      description: 'Identify important terms (freq ≥ 3)',
    },
    {
      icon: <Lightbulb />,
      title: 'Smart Boundaries',
      description: 'Adjust chunks based on keywords',
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
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1.5, sm: 1.5 }, 
          overflowX: 'auto',  
          alignItems: { xs: 'stretch', sm: 'center' },
          flexWrap: 'wrap'
        }}>
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2,
                  border: `2px solid ${alpha(color, 0.2)}`,
                  bgcolor: alpha(color, 0.05),
                  flex: { xs: '1 1 100%', sm: '1 1 auto' },
                  minWidth: { sm: 140 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${alpha(color, 0.2)}`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Box
                    sx={{
                      p: 0.8,
                      borderRadius: 1.5,
                      bgcolor: alpha(color, 0.15),
                      color: color,
                      display: 'flex',
                      fontSize: { xs: '1rem', sm: '1.2rem' }
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: { xs: '0.8rem', sm: '0.9rem' }
                    }}
                  >
                    {step.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
                >
                  {step.description}
                </Typography>
              </Paper>
              {idx < steps.length - 1 && (
                <ArrowForward 
                  sx={{ 
                    color: color, 
                    fontSize: 24,
                    display: { xs: 'none', sm: 'block' }
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
          Sentence Density Analysis
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
          
          {/* Density Legend */}
          <Box sx={{ 
            mt: 3, 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2, 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            {[
              { label: 'Low Density (< 6 words)', color: alpha(color, 0.2), action: 'Merge with next' },
              { label: 'Medium Density (6-10 words)', color: alpha(color, 0.5), action: 'Normal processing' },
              { label: 'High Density (> 10 words)', color: alpha(color, 0.8), action: 'Keep as is' },
            ].map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: { xs: 1, sm: 1.5 },
                  borderRadius: 1.5,
                  bgcolor: alpha(color, 0.05),
                  flex: { xs: '1 1 100%', sm: '1 1 auto' }
                }}
              >
                <Box
                  sx={{
                    width: { xs: 20, sm: 24 },
                    height: { xs: 20, sm: 24 },
                    borderRadius: 1,
                    bgcolor: item.color,
                    border: `2px solid ${color}`,
                    flexShrink: 0
                  }}
                />
                <Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: 700, 
                      display: 'block',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}
                  >
                    {item.action}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      {/* Algorithm Details */}
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
          Algorithm Details
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
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
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              Dynamic Target Calculation
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                bgcolor: alpha(theme.palette.common.black, 0.05),
                p: { xs: 1, sm: 1.5 },
                borderRadius: 1,
                mb: 1,
                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                overflowX: 'auto'
              }}
            >
              target = max(8, 150 / avg_words_per_sentence)
            </Typography>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
            >
              Adapts to document writing style
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
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              Keyword-Aware Boundaries
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              <Typography 
                component="li" 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mb: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                Extracts keywords (length &gt; 3, frequency ≥ 3)
              </Typography>
              <Typography 
                component="li" 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mb: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                Extends chunks at keyword boundaries
              </Typography>
              <Typography 
                component="li" 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                Maintains topic coherence
              </Typography>
            </Box>
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
                'Handles varying writing styles',
                'Smart sentence merging',
                'Keyword-based coherence',
                'Adaptive chunk sizing',
              ],
            },
            {
              label: 'Cons',
              items: [
                'More complex than fixed',
                'Requires NLP preprocessing',
                'Keyword extraction overhead',
                'Parameter sensitive',
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

export default SentenceDensityChunkingDiagram;