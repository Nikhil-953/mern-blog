import express from 'express';
import upload from '../utils/multerConfig.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = express.Router();

// POST route for image upload
router.post('/niki', upload.single("image"), uploadImage);

export default router;
