import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import uploadRouter from './routes/uploadRoutes.js';
import router from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

dotenv.config();

const app = express(); // ✅ Initialize app before using it

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log(err));

// ✅ Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // React URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


// ✅ Correct middleware placement
app.use('/api/auth', router);
app.use('/api/upload/', uploadRouter);
app.use('/api/user',userRouter);
app.use('/api/post',postRouter);

const PORT = process.env.PORT || 3000;

// ✅ Use HTTP instead of HTTPS
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
