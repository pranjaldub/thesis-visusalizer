import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
  },
  typography: {
    fontFamily: 'Outfit, sans-serif',
    h1: { fontFamily: 'Outfit', fontWeight: 800 },
    h2: { fontFamily: 'Outfit', fontWeight: 800 },
    h3: { fontFamily: 'Outfit', fontWeight: 700 },
    h4: { fontFamily: 'Outfit', fontWeight: 700 },
    h5: { fontFamily: 'Outfit', fontWeight: 700 },
    h6: { fontFamily: 'Outfit', fontWeight: 700 },
  },
  shape: {
    borderRadius: 12,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
