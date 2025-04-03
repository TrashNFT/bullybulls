import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';

const NFTGallery = () => {
  const nfts = [
    {
      id: 1,
      image: '/1.png',
      name: 'Bully Bull #1',
      description: 'Rare Bull with Gold Horns',
    },
    {
      id: 2,
      image: '/2.png',
      name: 'Bully Bull #2',
      description: 'Angry Bull with Red Eyes',
    },
    {
      id: 3,
      image: '/3.png',
      name: 'Bully Bull #3',
      description: 'Mystic Bull with Purple Aura',
    },
    {
      id: 4,
      image: '/4.png',
      name: 'Bully Bull #4',
      description: 'Legendary Bull with Diamond Horns',
    },
    {
      id: 5,
      image: '/5.png',
      name: 'Bully Bull #5',
      description: 'Fierce Bull with Fire Horns',
    },
    {
      id: 6,
      image: '/6.png',
      name: 'Bully Bull #6',
      description: 'Royal Bull with Crown',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            sx={{
              color: 'primary.main',
              textAlign: 'center',
              mb: 6,
              textShadow: '0 0 10px rgba(255, 0, 0, 0.3)',
              fontFamily: '"Bebas Neue", "Impact", sans-serif',
            }}
          >
            NFT Gallery
          </Typography>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid container spacing={4}>
            {nfts.map((nft) => (
              <Grid item xs={12} sm={6} md={4} key={nft.id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(26, 26, 26, 0.9)',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      borderRadius: 2,
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      image={nft.image}
                      alt={nft.name}
                      sx={{
                        objectFit: 'cover',
                        borderBottom: '2px solid',
                        borderColor: 'primary.main',
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h5"
                        sx={{
                          color: 'primary.main',
                          mb: 1,
                          fontWeight: 'bold',
                          fontFamily: '"Bebas Neue", "Impact", sans-serif',
                        }}
                      >
                        {nft.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'white',
                          fontFamily: '"Bebas Neue", "Impact", sans-serif',
                        }}
                      >
                        {nft.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default NFTGallery; 