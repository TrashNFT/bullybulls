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
  FormControlLabel,
} from '@mui/material';
import { green } from '@mui/material/colors';
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
        window.open('https://discord.gg/bullsbully', '_blank');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submission started');
    
    try {
      console.log('Form data:', formData);
      // Simulate successful submission
      setSubmitResult({ 
        success: true, 
        message: 'Form submitted successfully! Your wallet has been registered.' 
      });
      
      // Reset form
      setFormData({
        walletAddress: '',
        twitterUsername: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitResult({ 
        success: false, 
        message: 'Failed to submit form. Please try again.' 
      });
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

  // Add debug logging for form state
  console.log('Current form state:', {
    formData,
    requirements,
    allRequirementsMet,
    isSubmitting,
    validationErrors
  });

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
        <Typography
          variant="h2"
          sx={{
            color: '#FF0000',
            textAlign: 'center',
            mb: 4,
            textShadow: '0 0 10px rgba(255, 0, 0, 0.3)',
          }}
        >
          TEST UPDATE - WALLET REGISTRATION
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('TEST - Form submitted');
            alert('Form submitted!');
          }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            p: 4,
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: 2,
          }}
        >
          <TextField
            fullWidth
            name="walletAddress"
            label="Solana Wallet Address"
            value={formData.walletAddress}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: '#FF0000',
                },
                '&:hover fieldset': {
                  borderColor: '#FF3366',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#FF0000',
              },
            }}
          />

          <TextField
            fullWidth
            name="twitterUsername"
            label="Twitter Username"
            value={formData.twitterUsername}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: '#FF0000',
                },
                '&:hover fieldset': {
                  borderColor: '#FF3366',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#FF0000',
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              py: 2,
              bgcolor: '#FF0000',
              color: 'white',
              fontSize: '1.2rem',
              '&:hover': {
                bgcolor: '#FF3366',
              },
            }}
          >
            TEST - CLICK TO SUBMIT
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default WalletForm; 