export const test = (req, res) => {
  res.json({ message: 'API is working' });
};




// /api/controllers/user.controller.js
// Correct import for ES Modules
import cloudinary from '../utils/cloudinaryConfig.js';
import fs from 'fs';


// Upload Image to Cloudinary
const uploadImage = async (req, res) => {
  try {
    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded!' });
    }

    const file = req.file.path;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      folder: 'mern-blog', // Create this folder in Cloudinary if needed
    });

    // Delete local file after upload to save storage
    fs.unlinkSync(file);

    // Return success with image URL
    res.status(200).json({
      success: true,
      imageUrl: result.secure_url, // Cloudinary URL to store in DB
    });
  } catch (error) {
    console.error('Error uploading image hyy:', error);
    res.status(500).json({ success: false, message: 'Error uploading imagebh' });
  }
};
