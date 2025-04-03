const mongoose = require('mongoose');
const Submission = require('../backend/models/Submission');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bully-bulls';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { walletAddress, twitterUsername, requirements } = req.body;
    
    // Validate input
    if (!walletAddress || !twitterUsername) {
      return res.status(400).json({ error: 'Wallet address and Twitter username are required' });
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
    res.status(500).json({ error: 'Failed to submit form' });
  }
}; 