import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dwnb7qedm', // Your Cloudinary cloud name
  api_key: '952962319922147', // Your Cloudinary API key
  api_secret: 'eywUdlzVaHJkuVhAdTeSl27V1rk', // Your Cloudinary API secret
});

// Upload to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error('No file path provided!');
      return null;
    }

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto', // Auto detects file type
    });

    // Remove the file after successful upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    // Clean up file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

export { uploadOnCloudinary };
