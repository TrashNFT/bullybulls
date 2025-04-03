import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 2,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: '60px',
          height: '60px',
          border: '4px solid #ff0000',
          borderTop: '4px solid transparent',
          borderRadius: '50%',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'primary.main',
            mt: 2,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Verifying Requirements...
        </Typography>
      </motion.div>
    </Box>
  );
};

export default LoadingAnimation; 