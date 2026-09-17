import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import { LicenseProvider } from './context/LicenseContext';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Blue-600
      dark: '#1d4ed8',
      light: '#3b82f6'
    },
    background: {
      default: '#f8fafc'
    }
  },
  typography: {
    fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'].join(',')
  },
  shape: {
    borderRadius: 8
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LicenseProvider>
        <App />
      </LicenseProvider>
    </ThemeProvider>
  </React.StrictMode>
);
