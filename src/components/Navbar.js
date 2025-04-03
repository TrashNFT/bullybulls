import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Tooltip } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import DiscordIcon from './DiscordIcon';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '2px solid',
        borderColor: 'primary.main',
        animation: 'fadeInDown 0.5s ease-out',
        '@keyframes fadeInDown': {
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
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          component="img"
          src="/logo.png"
          alt="Bully Bulls Logo"
          sx={{
            height: 40,
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => navigate('/')}
        />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Follow us on Twitter">
            <IconButton
              onClick={() => handleSocialClick('https://twitter.com/BullyBulls')}
              sx={{
                color: 'primary.main',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1) rotate(5deg)',
                  color: '#1DA1F2',
                },
              }}
            >
              <TwitterIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Join our Discord">
            <IconButton
              onClick={() => handleSocialClick('https://discord.gg/bullybulls')}
              sx={{
                color: 'primary.main',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1) rotate(5deg)',
                  color: '#7289DA',
                },
              }}
            >
              <DiscordIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 