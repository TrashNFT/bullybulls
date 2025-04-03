import React from 'react';
import { Box } from '@mui/material';

const LoaderScreen = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '60px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '200px' }}>
          {/* Left Bull */}
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#FF3366',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'pulse 1.5s infinite',
              }}
            />
            {[0, 60, 120, 180, 240, 300].map((degree) => (
              <Box
                key={degree}
                sx={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#FF3366',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${degree}deg) translateY(-40px)`,
                  animation: 'pulse 1.5s infinite',
                  animationDelay: `${degree / 360}s`,
                }}
              />
            ))}
          </Box>

          {/* Right Bull */}
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#FF3366',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'pulse 1.5s infinite',
                animationDelay: '0.75s',
              }}
            />
            {[0, 60, 120, 180, 240, 300].map((degree) => (
              <Box
                key={degree}
                sx={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#FF3366',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${degree}deg) translateY(-40px)`,
                  animation: 'pulse 1.5s infinite',
                  animationDelay: `${(degree / 360) + 0.75}s`,
                }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            color: '#FF3366',
            fontSize: '24px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '4px',
              background: 'linear-gradient(90deg, transparent, #FF3366, transparent)',
              animation: 'loading 2s ease-in-out infinite',
            },
          }}
        >
          Loading
        </Box>
      </Box>

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); }
          }
          @keyframes loading {
            0% { width: 0%; opacity: 0.1; }
            50% { width: 100%; opacity: 1; }
            100% { width: 0%; opacity: 0.1; }
          }
        `}
      </style>
    </Box>
  );
};

export default LoaderScreen; 