import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: 'dwnb7qedm', 
    api_key: '952962319922147', 
    api_secret: 'eywUdlzVaHJkuVhAdTeSl27V1rk'
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    // Remove local file after upload
    fs.rmSync(localFilePath);
    return response;
  } catch (error) {
    //fs.unlinkSync(localFilePath);
    return error;
  }
};

export { uploadOnCloudinary };
