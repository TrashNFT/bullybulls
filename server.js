const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure Google Sheets API
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Handle form submission
app.post('/api/submit-form', async (req, res) => {
  try {
    const { walletAddress, twitterUsername } = req.body;

    // Prepare the data for Google Sheets
    const values = [[
      new Date().toISOString(),
      walletAddress,
      twitterUsername,
    ]];

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A:C', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      resource: {
        values,
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, error: 'Failed to submit form' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 