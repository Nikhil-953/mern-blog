import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Route to test API
router.get('/test', test);

// Route to update user info
router.put('/update/:userId', verifyToken, updateUser);

export default router;
