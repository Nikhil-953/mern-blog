import { uploadOnCloudinary } from '../utils/cloudinaryConfig.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }

    const localFilePath = req.file.path;
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse) {
      return res.status(500).json({ message: 'Failed to upload to Cloudinary' });
    }

    res.status(200).json({
      message: 'Image uploaded successfully! hurray',
      imageUrl: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
