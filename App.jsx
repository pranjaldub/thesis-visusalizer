import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Slider,
  FormControl,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Stack,
  Backdrop,
} from '@mui/material';

import {
  CloudUpload,
  Psychology,
  Speed,
  CheckCircle,
  Dashboard,
  PlayArrow,
  Article,
  TrendingUp,
  ViewModule,
  Menu as MenuIcon,
  Search,
} from '@mui/icons-material';

import { motion, AnimatePresence } from 'framer-motion';

import { uploadDocument, processRAGPipeline } from './apiService';
import MetricsCard from './MetricsCard';
import QualityRadar from './QualityRadar';
import ChunkViewer from './ChunkViewer';
import ChunkingMethodVisualizer from './ChunkingMethodVisualizer';

const MotionBox = motion(Box);

// ──────────────────────────────────────────────
// Memoized ConfigPanel – only re-renders when props actually change
// ──────────────────────────────────────────────
const ConfigPanel = React.memo(
  ({
    config,
    setConfig,
    documentText,
    uploadedFileName,
    isUploading,
    handleFileUpload,
    fileInputRef,
    handleRunPipeline,
    isProcessing,
  }) => (
    <Box
      sx={{
        height: '100vh',
        overflowY: 'auto',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 3,
        color: 'white',
      }}
    >
      {/* Header */}
      <MotionBox initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, fontFamily: 'Outfit', letterSpacing: '-0.02em' }}>
          RAG Pipeline
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
          Intelligent Document Analysis
        </Typography>
      </MotionBox>

      {/* File Upload */}
      <MotionBox initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.9 }}>
            UPLOAD DOCUMENT
          </Typography>
          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
          <Button
            fullWidth
            variant="outlined"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUpload />}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: 'white',
              py: 1.5,
              '&:hover': { borderColor: 'white', background: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            {uploadedFileName || 'Choose PDF File'}
          </Button>
          {documentText && (
            <Chip
              label={`${documentText.split(' ').length} words extracted`}
              size="small"
              sx={{ mt: 1, background: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          )}
        </Paper>
      </MotionBox>

      {/* Chunking Method */}
      <MotionBox initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.9 }}>
            CHUNKING STRATEGY
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={config.method}
              onChange={(e) => setConfig({ ...config, method: e.target.value })}
              sx={{
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                '.MuiSvgIcon-root': { color: 'white' },
              }}
            >
              <MenuItem value="fixed">Fixed Window</MenuItem>
              <MenuItem value="adaptive">Adaptive Semantic</MenuItem>
              <MenuItem value="sentence_density">Improved Sentence</MenuItem>
              <MenuItem value="gradient">Gradient Analysis</MenuItem>
              <MenuItem value="gradient_final">Gradient Final</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </MotionBox>

      {/* Sliders */}
      <MotionBox initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.9 }}>
            PARAMETERS
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Chunk Size</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {config.chunkSize}
              </Typography>
            </Box>
            <Slider
              value={config.chunkSize}
              onChange={(e, val) => setConfig({ ...config, chunkSize: val })}
              min={100}
              max={2000}
              step={50}
              sx={{ color: 'white', '& .MuiSlider-thumb': { background: 'white' } }}
            />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Overlap</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {config.overlap}
              </Typography>
            </Box>
            <Slider
              value={config.overlap}
              onChange={(e, val) => setConfig({ ...config, overlap: val })}
              min={0}
              max={500}
              step={10}
              sx={{ color: 'white', '& .MuiSlider-thumb': { background: 'white' } }}
            />
          </Box>
        </Paper>
      </MotionBox>

      {/* Retrieval Engines */}
      <MotionBox initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2, opacity: 0.9 }}>
            RETRIEVAL ENGINES
          </Typography>
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={config.useBM25}
                  onChange={(e) => setConfig({ ...config, useBM25: e.target.checked })}
                  sx={{ '& .MuiSwitch-thumb': { background: 'white' } }}
                />
              }
              label="BM25 Keyword"
              sx={{ color: 'white' }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={config.useCosine}
                  onChange={(e) => setConfig({ ...config, useCosine: e.target.checked })}
                  sx={{ '& .MuiSwitch-thumb': { background: 'white' } }}
                />
              }
              label="Cosine Vector"
              sx={{ color: 'white' }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={config.useFaiss}
                  onChange={(e) => setConfig({ ...config, useFaiss: e.target.checked })}
                  sx={{ '& .MuiSwitch-thumb': { background: 'white' } }}
                />
              }
              label="FAISS Index"
              sx={{ color: 'white' }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={config.rerankEnabled}
                  onChange={(e) => setConfig({ ...config, rerankEnabled: e.target.checked })}
                  sx={{ '& .MuiSwitch-thumb': { background: 'white' } }}
                />
              }
              label="Neural Reranking"
              sx={{ color: 'white' }}
            />
          </Stack>
        </Paper>
      </MotionBox>

      {/* Execute Button */}
      <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleRunPipeline}
          disabled={isProcessing || !documentText}
          startIcon={isProcessing ? <CircularProgress size={20} /> : <PlayArrow />}
          sx={{
            py: 2,
            background: 'white',
            color: '#667eea',
            fontWeight: 700,
            fontSize: '1rem',
            '&:hover': { background: 'rgba(255, 255, 255, 0.9)' },
            '&:disabled': { background: 'rgba(255, 255, 255, 0.3)', color: 'rgba(255, 255, 255, 0.5)' },
          }}
        >
          {isProcessing ? 'Processing...' : 'Execute Pipeline'}
        </Button>
      </MotionBox>
    </Box>
  ),
  // Only re-render when these props actually change
  (prev, next) =>
    prev.config === next.config &&
    prev.documentText === next.documentText &&
    prev.uploadedFileName === next.uploadedFileName &&
    prev.isUploading === next.isUploading &&
    prev.isProcessing === next.isProcessing
);

function App() {
  const [config, setConfig] = useState({
    chunkSize: 500,
    overlap: 50,
    method: 'gradient',
    useBM25: true,
    useCosine: true,
    useFaiss: false,
    rerankEnabled: true,
    topK: 4,
  });
  const [documentText, setDocumentText] = useState('');
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);

  // Memoized handlers
  const handleFileUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.pdf')) {
      setError('Please upload a PDF file');
      return;
    }
    setIsUploading(true);
    setError('');
    try {
      const response = await uploadDocument(file);
      setDocumentText(response.extracted_text);
      setUploadedFileName(response.filename);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error uploading PDF');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleRunPipeline = useCallback(async () => {
    if (!documentText) {
      setError('Please upload a PDF document first');
      return;
    }
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }
    setIsProcessing(true);
    setError('');
    try {
      const res = await processRAGPipeline(documentText, query, config);
      setResult(res);
      console.log('RAG Pipeline Result:', res);
      setActiveTab(0);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error processing pipeline');
    } finally {
      setIsProcessing(false);
    }
  }, [documentText, query, config]);

  // Memoized sidebar
  const sidebar = useMemo(
    () => (
      <ConfigPanel
        config={config}
        setConfig={setConfig}
        documentText={documentText}
        uploadedFileName={uploadedFileName}
        isUploading={isUploading}
        handleFileUpload={handleFileUpload}
        fileInputRef={fileInputRef}
        handleRunPipeline={handleRunPipeline}
        isProcessing={isProcessing}
      />
    ),
    [
      config,
      documentText,
      uploadedFileName,
      isUploading,
      isProcessing,
      handleFileUpload,
      handleRunPipeline,
    ]
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Desktop Sidebar */}
      <Box sx={{ width: 360, display: { xs: 'none', md: 'block' }, flexShrink: 0 }}>
        {sidebar}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Box sx={{ width: 320 }}>{sidebar}</Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f8f9fa' }}>
        {/* Header */}
        <AppBar position="static" elevation={0} sx={{ background: 'white', borderBottom: '1px solid #e0e0e0' }}>
          <Toolbar>
            <IconButton sx={{ mr: 2, display: { xs: 'block', md: 'none' } }} onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Search sx={{ mr: 2, color: '#667eea' }} />
            <TextField
  fullWidth
  placeholder="Enter your search query..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent form submit / page refresh
      handleRunPipeline();
    }
  }}
  variant="standard"
  InputProps={{
    disableUnderline: true,
    sx: {
      fontSize: '1.1rem',
      fontFamily: 'Outfit',
    },
  }}
/>
            {documentText && (
              <Chip label="PDF Loaded" color="success" size="small" sx={{ ml: 2 }} />
            )}
          </Toolbar>
        </AppBar>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert severity="error" onClose={() => setError('')} sx={{ m: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          {result ? (
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Paper sx={{ mb: 3, borderRadius: 2 }}>
                <Tabs
                  value={activeTab}
                  onChange={(e, val) => setActiveTab(val)}
                  sx={{ '& .MuiTab-root': { fontWeight: 600, fontSize: '0.95rem', textTransform: 'none' } }}
                >
                  <Tab label="System Metrics" icon={<Dashboard />} iconPosition="start" />
                  <Tab label={`Chunks (${result.chunks.length})`} icon={<ViewModule />} iconPosition="start" />
                </Tabs>
              </Paper>

              {activeTab === 0 ? (
                <Box>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                      <MetricsCard title="Total Chunks" value={result.metrics.num_chunks} icon={<ViewModule />} color="#667eea" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <MetricsCard
                        title="Quality Score"
                        value={`${(result.metrics.weighted_score * 100).toFixed(1)}%`}
                        icon={<CheckCircle />}
                        color="#10b981"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <MetricsCard title="Latency" value={`${result.metrics.latency.toFixed(0)}ms`} icon={<Speed />} color="#f59e0b" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <MetricsCard
                        title="Coherence"
                        value={`${(result.metrics.avg_coherence * 100).toFixed(0)}%`}
                        icon={<TrendingUp />}
                        color="#8b5cf6"
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                      <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Psychology sx={{ mr: 1, color: '#667eea' }} />
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            AI Response
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontFamily: 'JetBrains Mono',
                            fontSize: '0.95rem',
                            lineHeight: 1.7,
                            color: '#374151',
                            fontStyle: 'italic',
                            p: 2,
                            borderLeft: '4px solid #667eea',
                            background: '#f3f4f6',
                            borderRadius: 1,
                          }}
                        >
                          {result.response}
                        </Typography>
                      </Paper>

                      <Paper sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                          Performance Metrics
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="h3" sx={{ fontWeight: 800, color: '#667eea' }}>
                                {result.metrics.cpu_usage.toFixed(1)}%
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                CPU Usage
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="h3" sx={{ fontWeight: 800, color: '#764ba2' }}>
                                {result.metrics.memory_usage.toFixed(0)}MB
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                Memory
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                      <QualityRadar metrics={result.metrics} />
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <ChunkViewer chunks={result.chunks} retrievedChunks={result.retrievedChunks} />
              )}
            </MotionBox>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <MotionBox initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.8 }}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Article sx={{ fontSize: 60, color: 'white' }} />
                </Box>
              </MotionBox>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Ready to Analyze
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ maxWidth: 400 }}>
                Upload a PDF document and enter a query to start the RAG pipeline analysis
              </Typography>
              <ChunkingMethodVisualizer />
            </Box>
          )}
        </Box>
      </Box>

      {/* Loading Backdrop */}
      <Backdrop open={isProcessing} sx={{ zIndex: 9999 }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ color: 'white', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'white' }}>
            Processing your request...
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}

export default App;