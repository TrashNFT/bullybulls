# Bully Bulls NFT Project

A website for the Bully Bulls NFT project with wallet registration and admin panel.

## Features

- Wallet registration form with validation
- NFT gallery with animations
- Admin panel to view submissions and analytics
- MongoDB integration for data storage

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd bully-bulls
```

### 2. Install dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Configure MongoDB

#### Option 1: Local MongoDB

1. Install MongoDB on your machine
2. Start MongoDB service
3. The application will connect to `mongodb://localhost:27017/bully-bulls` by default

#### Option 2: MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Set up database access (username and password)
4. Set up network access (IP whitelist)
5. Get your connection string
6. Update the `.env` file in the backend folder:

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/bully-bulls?retryWrites=true&w=majority
```

### 4. Start the application

```bash
# Start both frontend and backend
npm run dev

# Or start them separately
npm start           # Frontend
npm run server      # Backend
```

## Accessing the Application

- Frontend: http://localhost:5000
- Admin Panel: http://localhost:5000/admin
- Backend API: http://localhost:5001

## API Endpoints

- `POST /api/submit-form`: Submit wallet registration
- `GET /api/submissions`: Get all submissions
- `GET /api/analytics`: Get analytics data
- `GET /api/export`: Download submissions as CSV

## Technologies Used

- React
- Material UI
- Framer Motion
- Express.js
- MongoDB
- Mongoose 