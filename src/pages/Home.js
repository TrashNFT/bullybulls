import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 4,
              textShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
              animation: 'fadeInDown 1s ease-out',
              '@keyframes fadeInDown': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(-50px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            Bully Bulls
          </Typography>

          <Typography
            variant="h4"
            sx={{
              color: 'text.primary',
              mb: 6,
              opacity: 0.9,
              animation: 'fadeIn 1s ease-out 0.5s both',
              '@keyframes fadeIn': {
                '0%': {
                  opacity: 0,
                },
                '100%': {
                  opacity: 0.9,
                },
              },
            }}
          >
            Join the most exclusive NFT collection on Solana
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/wallet-form')}
            sx={{
              py: 2,
              px: 6,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
              transition: 'all 0.3s ease-in-out',
              animation: 'fadeInUp 1s ease-out 1s both',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 0 30px rgba(255, 0, 0, 0.5)',
              },
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(50px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            Register Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home; 