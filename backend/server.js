const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Submission = require('./models/Submission');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected:', mongoose.connection.host);
  console.log('MongoDB connection successful');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Submit form route
app.post('/api/submit-form', async (req, res) => {
    try {
        const { walletAddress, twitterUsername, requirements } = req.body;
        
        // Validate input
        if (!walletAddress || !twitterUsername) {
            return res.status(400).json({ error: 'Wallet address and Twitter username are required' });
        }

        // Check for existing wallet address
        const existingWallet = await Submission.findOne({ walletAddress });
        if (existingWallet) {
            return res.status(400).json({ 
                error: 'This wallet address has already been registered',
                field: 'walletAddress'
            });
        }

        // Check for existing Twitter username
        const existingTwitter = await Submission.findOne({ 
            twitterUsername: { $regex: new RegExp(`^${twitterUsername}$`, 'i') } 
        });
        if (existingTwitter) {
            return res.status(400).json({ 
                error: 'This Twitter username has already been registered',
                field: 'twitterUsername'
            });
        }

        // Create new submission
        const submission = new Submission({
            walletAddress,
            twitterUsername,
            requirements,
            timestamp: new Date()
        });

        await submission.save();
        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error submitting form:', error);
        // Handle MongoDB duplicate key errors explicitly
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ 
                error: `This ${field} has already been registered`,
                field: field
            });
        }
        res.status(500).json({ error: 'Failed to submit form' });
    }
});

// Get all submissions route
app.get('/api/submissions', async (req, res) => {
    try {
        const submissions = await Submission.find().sort({ timestamp: -1 });
        res.json(submissions);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the Express API
module.exports = app; 