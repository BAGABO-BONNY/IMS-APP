const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/api', activityRoutes);

module.exports = app;
