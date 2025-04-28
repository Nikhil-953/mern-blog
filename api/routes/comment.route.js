import express from 'express';
import { createComment,getPostComments,likeComment } from '../controllers/comment.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();


router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId', getPostComments); // Assuming you have a getComments function in your controller
router.put('/likeComment/:commentId',verifyToken,likeComment); // Assuming you have a likeComment function in your controller

export default router;