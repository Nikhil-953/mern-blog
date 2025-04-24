import express from 'express';
import { deleteUser,signout,test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { get } from 'mongoose';
import { getUsers } from '../controllers/user.controller.js';
const router = express.Router();

// Route to test API
router.get('/test', test);

// Route to update user info
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout',signout);
router.get('/getusers',verifyToken,getUsers);

export default router;
