import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

const app = express();

// Middleware
app.use(express.json());


// Database Connection
mongoose
    .connect(process.env.MONGO)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error:', err.message));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start the Server **after defining routes**
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
