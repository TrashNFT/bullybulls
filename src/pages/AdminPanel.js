import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';

const AdminPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/submissions');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)',
        }}
      >
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            opacity: 1,
            transform: 'translateY(0)',
            animation: 'fadeIn 0.5s ease-in-out',
            '@keyframes fadeIn': {
              '0%': {
                opacity: 0,
                transform: 'translateY(20px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: 'primary.main',
              textAlign: 'center',
              mb: 4,
              textShadow: '0 0 10px rgba(255, 0, 0, 0.3)',
              animation: 'slideDown 0.5s ease-in-out',
              '@keyframes slideDown': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(-20px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            Admin Panel
          </Typography>

          {error ? (
            <Typography
              variant="h6"
              sx={{
                color: 'error.main',
                textAlign: 'center',
                animation: 'fadeIn 0.3s ease-in-out',
              }}
            >
              Error: {error}
            </Typography>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                background: 'rgba(26, 26, 26, 0.9)',
                borderRadius: 2,
                border: '2px solid',
                borderColor: 'primary.main',
                animation: 'slideUp 0.5s ease-in-out',
                '@keyframes slideUp': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(20px)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      Timestamp
                    </TableCell>
                    <TableCell sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      Wallet Address
                    </TableCell>
                    <TableCell sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                      Twitter Username
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions.map((submission, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        animation: `fadeIn 0.3s ease-in-out ${index * 0.1}s`,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <TableCell sx={{ color: 'text.primary' }}>
                        {new Date(submission.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ color: 'text.primary' }}>
                        {submission.walletAddress}
                      </TableCell>
                      <TableCell sx={{ color: 'text.primary' }}>
                        {submission.twitterUsername}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default AdminPanel; 