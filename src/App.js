import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WalletForm from './pages/WalletForm';
import AdminPanel from './pages/AdminPanel';
import LoaderScreen from './components/LoaderScreen';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff0000',
    },
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Bebas Neue", "Impact", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <LoaderScreen />
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallet-form" element={<WalletForm />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App; 