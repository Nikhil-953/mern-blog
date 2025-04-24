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
  // Authorization check
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  // Password validation and hashing
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  // Username validation
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (!/^[a-zA-Z0-9]+$/.test(req.body.username)) {
      return next(errorHandler(400, 'Username can only contain letters and numbers'));
    }
  }

  // ✅ Perform update regardless of which fields are present
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // Authorization check
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    next(error);
  }
}

export const signout = (req,res,next)=> {
  try{
    res
    .clearCookie('access_token')
    .status(200)
    .json({success:true,message:'Signout successful'}) 
}catch(error){
    next(error)
  }
}; 

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  } 
  try{
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9; // Default limit to 10 if not provided
    const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1; // Default to ascending order

    const users = await User.find()
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: sortDirection });
    
    const usersWithoutpassword = users.map((user) => {
      const { password, ...rest } = user._doc; // Exclude password from the response
      return rest;
    })  

    const totalUsers = await User.countDocuments();
    
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutpassword,
      totalUsers,
      lastMonthUsers,
    });

   }catch(error){
    next(error)
   }

};