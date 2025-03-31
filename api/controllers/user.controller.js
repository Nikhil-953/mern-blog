// /api/controllers/user.controller.js
import { uploadOnCloudinary } from '../utils/cloudinaryConfig.js'; // ✅ Corrected import
import fs from 'fs';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

// Test API endpoint
export const test = (req, res) => {
  res.json({ message: 'API is working' });
};

// Upload Image to Cloudinary
const uploadImage = async (req, res) => {
  try {
    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded!' });
    }

    const file = req.file.path;

    // Upload to Cloudinary
    const result = await uploadOnCloudinary(file);

    // Check if the upload was successful
    if (!result) {
      return res.status(500).json({ success: false, message: 'Error uploading image to Cloudinary' });
    }

    // Return success with image URL
    res.status(200).json({
      success: true,
      imageUrl: result.secure_url, // Cloudinary URL to store in DB
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Error uploading image' });
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId){
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  if (req.body.password){
    if(req.body.password.length <6){
      return next(errorHandler(400, 'Password must be at least 6 characters'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password,10);
  }
  if (req.body.username){
    if(req.body.username.lenght < 7 || req.body.username > 20){
      return next(errorHandler(400, 'Username must be between 7 and 20 characters'))
    }
    if(req.body.username.includes(' ')){
      return next(errorHandler(400,'Username cannot contain spaces'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)){
      return next(errorHandler(400, 'Username can only contain letters and numbers'));
    }
    try{
      const updateUser = await User.findByIdAndUpdate(req.params.userId,{
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      }, { new: true});
      const { password, ...rest} = updateUser._doc;
      res.status(200).json(rest);
    }catch (error) {
      next(error);
    }
  }
};
