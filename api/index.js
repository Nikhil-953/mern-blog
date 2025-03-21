import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/uploadRoutes.js';

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // React URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use('/api/upload', uploadRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
