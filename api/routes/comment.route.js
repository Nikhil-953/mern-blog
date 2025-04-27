import express from 'express';
import { createComment,getPostComments } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();


router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId', getPostComments); // Assuming you have a getComments function in your controller

export default router;