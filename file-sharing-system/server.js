const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');  // Ensure this is correct
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes); // Prefix for authentication routes
app.use('/files', fileRoutes); // Prefix for file-related routes

// Connect to DB
connectDB();  // This should now work correctly

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
