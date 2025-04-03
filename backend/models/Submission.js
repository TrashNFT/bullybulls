const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: [true, 'Wallet address is required'],
    trim: true,
    unique: true,
    index: true
  },
  twitterUsername: {
    type: String,
    required: [true, 'Twitter username is required'],
    trim: true,
    unique: true,
    index: true
  },
  requirements: {
    type: Object,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', SubmissionSchema); 