import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { CheckCircle, FilterAlt } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

const ChunkViewer = ({ chunks, retrievedChunks }) => {
  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* Header */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Document Chunks
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              {chunks.length} chunks created • {retrievedChunks.length} retrieved
            </Typography>
          </Box>
          <FilterAlt sx={{ fontSize: 32 }} />
        </Box>
      </Box>

      {/* Chunks List */}
      <Box sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <AnimatePresence>
          {chunks.map((chunk, idx) => {
            const isRetrieved = retrievedChunks.includes(chunk.id);
            return (
              <MotionBox
                key={chunk.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                sx={{
                  p: 3,
                  borderBottom: '1px solid #e5e7eb',
                  background: isRetrieved
                    ? 'linear-gradient(90deg, #667eea08, transparent)'
                    : 'white',
                  position: 'relative',
                  '&:hover': {
                    background: isRetrieved
                      ? 'linear-gradient(90deg, #667eea15, transparent)'
                      : '#f9fafb',
                  },
                }}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {/* Chunk ID Badge */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: isRetrieved
                        ? 'linear-gradient(135deg, #667eea, #764ba2)'
                        : '#e5e7eb',
                      color: isRetrieved ? 'white' : '#6b7280',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      flexShrink: 0,
                      boxShadow: isRetrieved ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
                    }}
                  >
                    {chunk.id}
                  </Box>

                  {/* Chunk Content */}
                  <Box sx={{ flex: 1 }}>
                    {isRetrieved && (
                      <Chip
                        icon={<CheckCircle sx={{ fontSize: 16 }} />}
                        label="Retrieved"
                        size="small"
                        sx={{
                          mb: 1,
                          background: '#667eea',
                          color: 'white',
                          fontWeight: 600,
                          '& .MuiChip-icon': {
                            color: 'white',
                          },
                        }}
                      />
                    )}
                    <Typography
                      sx={{
                        fontFamily: 'JetBrains Mono',
                        fontSize: '0.9rem',
                        lineHeight: 1.7,
                        color: '#374151',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      }}
                    >
                      {chunk.content}
                    </Typography>
                  </Box>
                </Box>

                {/* Retrieved Indicator */}
                {isRetrieved && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      background: 'linear-gradient(180deg, #667eea, #764ba2)',
                    }}
                  />
                )}
              </MotionBox>
            );
          })}
        </AnimatePresence>
      </Box>
    </Paper>
  );
};

export default ChunkViewer;
