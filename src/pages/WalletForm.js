import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const WalletForm = () => {
  const [formData, setFormData] = useState({
    walletAddress: '',
    twitterUsername: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: false, message: '' });
  const [requirements, setRequirements] = useState({
    twitter: false,
    notifications: false,
    discord: false,
    twitterLike: false,
    twitterRetweet: false,
  });

  const allRequirementsMet = Object.values(requirements).every(Boolean);

  const validateSolanaAddress = (address) => {
    if (!address) return 'Wallet address is required';
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
    if (!base58Regex.test(address)) {
      return 'Invalid wallet address format';
    }
    if (address.length < 32 || address.length > 44) {
      return 'Wallet address should be between 32-44 characters';
    }
    return null;
  };

  const validateTwitterUsername = (username) => {
    if (!username) return 'Twitter username is required';
    const twitterRegex = /^[A-Za-z0-9_]{4,15}$/;
    if (!twitterRegex.test(username)) {
      return 'Invalid Twitter username format';
    }
    return null;
  };

  const handleSocialClick = (type) => {
    switch (type) {
      case 'twitter':
      case 'notifications':
        window.open('https://x.com/bullybullsonsol', '_blank');
        setRequirements(prev => ({
          ...prev,
          [type]: true
        }));
        break;
      case 'twitterLike':
      case 'twitterRetweet':
        // Placeholder - to be updated later
        window.open('https://x.com/bullybullsonsol', '_blank');
        setRequirements(prev => ({
          ...prev,
          [type]: true
        }));
        break;
      case 'discord':
        // Placeholder - to be updated later
        window.open('https://discord.gg/bullybulls', '_blank');
        setRequirements(prev => ({
          ...prev,
          [type]: true
        }));
        break;
      default:
        break;
    }
  };

  const handleRequirementChange = (type) => {
    if (!requirements[type]) {
      handleSocialClick(type);
    } else {
      setRequirements(prev => ({
        ...prev,
        [type]: false
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (name === 'walletAddress') {
      const error = validateSolanaAddress(value);
      setValidationErrors({
        ...validationErrors,
        walletAddress: error
      });
    } else if (name === 'twitterUsername') {
      const error = validateTwitterUsername(value);
      setValidationErrors({
        ...validationErrors,
        twitterUsername: error
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const walletError = validateSolanaAddress(formData.walletAddress);
    const twitterError = validateTwitterUsername(formData.twitterUsername);
    
    setValidationErrors({
      walletAddress: walletError,
      twitterUsername: twitterError
    });
    
    if (walletError || twitterError) {
      return;
    }

    // Check if all social requirements are met
    if (!allRequirementsMet) {
      setSubmitResult({
        success: false,
        message: 'Please complete all social media requirements before submitting.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult({ success: false, message: '' });

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: formData.walletAddress,
          twitterUsername: formData.twitterUsername,
          requirements
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific field errors
        if (data.field) {
          setValidationErrors(prev => ({
            ...prev,
            [data.field]: data.error
          }));
          throw new Error(data.error);
        }
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitResult({ 
        success: true, 
        message: 'Form submitted successfully! Your wallet has been registered.' 
      });
      
      // Reset form after successful submission
      setFormData({
        walletAddress: '',
        twitterUsername: ''
      });
      setValidationErrors({});
      
      // Reset requirements after successful submission
      setRequirements({
        twitter: false,
        notifications: false,
        discord: false,
        twitterLike: false,
        twitterRetweet: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitResult({ 
        success: false, 
        message: error.message || 'Failed to submit form. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    'Complete Twitter Tasks',
    'Join Discord',
    'Submit Details'
  ];

  const getStepIcon = (step) => {
    switch (step) {
      case 0:
        return requirements.twitter && 
               requirements.twitterLike && 
               requirements.twitterRetweet && 
               requirements.notifications ? <CheckCircleIcon color="success" /> : <PendingIcon />;
      case 1:
        return requirements.discord ? <CheckCircleIcon color="success" /> : <PendingIcon />;
      case 2:
        return submitResult.success ? <CheckCircleIcon color="success" /> : <PendingIcon />;
      default:
        return <PendingIcon />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #000000 30%, #1a1a1a 90%)',
        py: 8,
        mt: 8,
      }}
    >
      <Container maxWidth="md">
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
            Wallet Registration
          </Typography>

          <Stepper 
            activeStep={-1} 
            sx={{ 
              mb: 4,
              '& .MuiStepLabel-label': {
                color: 'white',
              },
            }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={() => getStepIcon(index)}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Paper
            sx={{
              p: 4,
              background: 'rgba(26, 26, 26, 0.9)',
              border: '2px solid',
              borderColor: 'primary.main',
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(255, 0, 0, 0.2)',
              },
            }}
          >
            {submitResult.message && (
              <Alert 
                severity={submitResult.success ? "success" : "error"} 
                sx={{ 
                  mb: 3,
                  animation: 'slideIn 0.3s ease-out',
                  '@keyframes slideIn': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(-10px)',
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                {submitResult.message}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white', 
                    mb: 6, 
                    fontSize: '3rem', 
                    textAlign: 'center',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    background: 'linear-gradient(45deg, #FF3366 30%, #FF0000 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 20px rgba(255, 51, 102, 0.3)',
                    animation: 'glow 2s ease-in-out infinite alternate',
                    '@keyframes glow': {
                      '0%': {
                        textShadow: '0 0 20px rgba(255, 51, 102, 0.3)',
                      },
                      '100%': {
                        textShadow: '0 0 30px rgba(255, 51, 102, 0.5), 0 0 40px rgba(255, 51, 102, 0.3)',
                      },
                    },
                  }}
                >
                  Complete Requirements
                </Typography>
                <Box sx={{ 
                  maxWidth: '800px', 
                  margin: '0 auto',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                  padding: '2rem',
                }}>
                  <List sx={{ 
                    width: '100%',
                    '& .MuiListItem-root': {
                      mb: 3,
                      py: 2,
                      px: 3,
                      borderRadius: '15px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(5px)',
                      transition: 'all 0.3s ease-in-out',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.07)',
                        transform: 'translateX(10px)',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                      },
                    }
                  }}>
                    <ListItem 
                      onClick={() => handleRequirementChange('twitter')}
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        },
                        backgroundColor: requirements.twitter ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                      }}
                    >
                      <ListItemText 
                        primary={
                          <Box
                            component="a"
                            href="https://x.com/bullybullsonsol"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSocialClick('twitter');
                            }}
                            sx={{ 
                              color: requirements.twitter ? '#4CAF50' : 'white',
                              fontSize: '1.5rem',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease-in-out',
                              textShadow: requirements.twitter ? '0 0 10px rgba(76, 175, 80, 0.5)' : 'none',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            Follow on Twitter
                          </Box>
                        }
                      />
                      <ListItemIcon sx={{ 
                        minWidth: 'auto',
                        ml: 'auto',
                        transform: requirements.twitter ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s ease-in-out'
                      }}>
                        <Checkbox
                          checked={requirements.twitter}
                          onChange={() => handleRequirementChange('twitter')}
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: '2.5rem',
                              transition: 'all 0.3s ease-in-out',
                              filter: requirements.twitter ? 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.5))' : 'none',
                            },
                            color: 'rgba(255, 255, 255, 0.5)',
                            '&.Mui-checked': {
                              color: '#4CAF50',
                            },
                            pointerEvents: 'none',
                          }}
                        />
                      </ListItemIcon>
                    </ListItem>

                    <ListItem 
                      onClick={() => handleRequirementChange('notifications')}
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        },
                        backgroundColor: requirements.notifications ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                      }}
                    >
                      <ListItemText 
                        primary={
                          <Box
                            component="a"
                            href="https://x.com/bullybullsonsol"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSocialClick('notifications');
                            }}
                            sx={{ 
                              color: requirements.notifications ? '#4CAF50' : 'white',
                              fontSize: '1.5rem',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease-in-out',
                              textShadow: requirements.notifications ? '0 0 10px rgba(76, 175, 80, 0.5)' : 'none',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            Turn On Notifications
                          </Box>
                        }
                      />
                      <ListItemIcon sx={{ 
                        minWidth: 'auto',
                        ml: 'auto',
                        transform: requirements.notifications ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s ease-in-out'
                      }}>
                        <Checkbox
                          checked={requirements.notifications}
                          onChange={() => handleRequirementChange('notifications')}
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: '2.5rem',
                              transition: 'all 0.3s ease-in-out',
                              filter: requirements.notifications ? 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.5))' : 'none',
                            },
                            color: 'rgba(255, 255, 255, 0.5)',
                            '&.Mui-checked': {
                              color: '#4CAF50',
                            },
                            pointerEvents: 'none',
                          }}
                        />
                      </ListItemIcon>
                    </ListItem>

                    <ListItem 
                      onClick={() => handleRequirementChange('discord')}
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        },
                        backgroundColor: requirements.discord ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                      }}
                    >
                      <ListItemText 
                        primary={
                          <Box
                            component="span"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSocialClick('discord');
                            }}
                            sx={{ 
                              color: requirements.discord ? '#4CAF50' : 'white',
                              fontSize: '1.5rem',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease-in-out',
                              textShadow: requirements.discord ? '0 0 10px rgba(76, 175, 80, 0.5)' : 'none',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            Join Discord
                          </Box>
                        }
                      />
                      <ListItemIcon sx={{ 
                        minWidth: 'auto',
                        ml: 'auto',
                        transform: requirements.discord ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s ease-in-out'
                      }}>
                        <Checkbox
                          checked={requirements.discord}
                          onChange={() => handleRequirementChange('discord')}
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: '2.5rem',
                              transition: 'all 0.3s ease-in-out',
                              filter: requirements.discord ? 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.5))' : 'none',
                            },
                            color: 'rgba(255, 255, 255, 0.5)',
                            '&.Mui-checked': {
                              color: '#4CAF50',
                            },
                            pointerEvents: 'none',
                          }}
                        />
                      </ListItemIcon>
                    </ListItem>

                    <ListItem 
                      onClick={() => handleRequirementChange('twitterLike')}
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        },
                        backgroundColor: requirements.twitterLike ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                      }}
                    >
                      <ListItemText 
                        primary={
                          <Box
                            component="span"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSocialClick('twitterLike');
                            }}
                            sx={{ 
                              color: requirements.twitterLike ? '#4CAF50' : 'white',
                              fontSize: '1.5rem',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease-in-out',
                              textShadow: requirements.twitterLike ? '0 0 10px rgba(76, 175, 80, 0.5)' : 'none',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            Like Pinned Tweet
                          </Box>
                        }
                      />
                      <ListItemIcon sx={{ 
                        minWidth: 'auto',
                        ml: 'auto',
                        transform: requirements.twitterLike ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s ease-in-out'
                      }}>
                        <Checkbox
                          checked={requirements.twitterLike}
                          onChange={() => handleRequirementChange('twitterLike')}
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: '2.5rem',
                              transition: 'all 0.3s ease-in-out',
                              filter: requirements.twitterLike ? 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.5))' : 'none',
                            },
                            color: 'rgba(255, 255, 255, 0.5)',
                            '&.Mui-checked': {
                              color: '#4CAF50',
                            },
                            pointerEvents: 'none',
                          }}
                        />
                      </ListItemIcon>
                    </ListItem>

                    <ListItem 
                      onClick={() => handleRequirementChange('twitterRetweet')}
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        },
                        backgroundColor: requirements.twitterRetweet ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                      }}
                    >
                      <ListItemText 
                        primary={
                          <Box
                            component="span"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSocialClick('twitterRetweet');
                            }}
                            sx={{ 
                              color: requirements.twitterRetweet ? '#4CAF50' : 'white',
                              fontSize: '1.5rem',
                              fontWeight: 'bold',
                              transition: 'all 0.3s ease-in-out',
                              textShadow: requirements.twitterRetweet ? '0 0 10px rgba(76, 175, 80, 0.5)' : 'none',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                          >
                            Retweet Pinned Tweet
                          </Box>
                        }
                      />
                      <ListItemIcon sx={{ 
                        minWidth: 'auto',
                        ml: 'auto',
                        transform: requirements.twitterRetweet ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s ease-in-out'
                      }}>
                        <Checkbox
                          checked={requirements.twitterRetweet}
                          onChange={() => handleRequirementChange('twitterRetweet')}
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: '2.5rem',
                              transition: 'all 0.3s ease-in-out',
                              filter: requirements.twitterRetweet ? 'drop-shadow(0 0 8px rgba(76, 175, 80, 0.5))' : 'none',
                            },
                            color: 'rgba(255, 255, 255, 0.5)',
                            '&.Mui-checked': {
                              color: '#4CAF50',
                            },
                            pointerEvents: 'none',
                          }}
                        />
                      </ListItemIcon>
                    </ListItem>
                  </List>

                  {allRequirementsMet && (
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{
                        mt: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
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
                        variant="h4"
                        sx={{
                          color: '#4CAF50',
                          textAlign: 'center',
                          mb: 2,
                          textShadow: '0 0 10px rgba(76, 175, 80, 0.3)',
                        }}
                      >
                        All requirements completed! Submit your details:
                      </Typography>

                      <TextField
                        fullWidth
                        name="walletAddress"
                        label="Solana Wallet Address"
                        value={formData.walletAddress}
                        onChange={handleChange}
                        error={!!validationErrors.walletAddress}
                        helperText={validationErrors.walletAddress}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(76, 175, 80, 0.5)',
                            },
                            '&:hover fieldset': {
                              borderColor: '#4CAF50',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#4CAF50',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(76, 175, 80, 0.7)',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                        }}
                      />

                      <TextField
                        fullWidth
                        name="twitterUsername"
                        label="Twitter Username"
                        value={formData.twitterUsername}
                        onChange={handleChange}
                        error={!!validationErrors.twitterUsername}
                        helperText={validationErrors.twitterUsername}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(76, 175, 80, 0.5)',
                            },
                            '&:hover fieldset': {
                              borderColor: '#4CAF50',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#4CAF50',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(76, 175, 80, 0.7)',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                          },
                        }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || !allRequirementsMet || Object.keys(validationErrors).length > 0}
                        sx={{
                          mt: 2,
                          bgcolor: '#4CAF50',
                          color: 'white',
                          fontSize: '1.2rem',
                          py: 1.5,
                          '&:hover': {
                            bgcolor: '#45a049',
                          },
                          '&.Mui-disabled': {
                            bgcolor: 'rgba(76, 175, 80, 0.3)',
                          },
                        }}
                      >
                        {isSubmitting ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          'Submit'
                        )}
                      </Button>

                      {submitResult.message && (
                        <Alert
                          severity={submitResult.success ? 'success' : 'error'}
                          sx={{
                            mt: 2,
                            bgcolor: submitResult.success ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                            color: submitResult.success ? '#4CAF50' : '#ff0000',
                            border: '1px solid',
                            borderColor: submitResult.success ? '#4CAF50' : '#ff0000',
                          }}
                        >
                          {submitResult.message}
                        </Alert>
                      )}
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default WalletForm; 