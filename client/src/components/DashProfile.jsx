import { Button, TextInput } from 'flowbite-react';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  // Correct useState usage
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // Create preview URL
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // Upload Image to Backend and Get Cloudinary URL
  // DashProfile.jsx
const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file); // Key 'image' matches backend

    const res = await fetch('http://localhost:3000/api/upload/niki', {
      method: 'POST',
      body: formData,
    });
    

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Upload failed');
    }

    const data = await res.json();
    console.log('Image Uploaded:', data.imageUrl);
    alert('Image uploaded successfully!');
  } catch (error) {
    console.error('Error uploading image:', error.message);
    alert(`Error uploading image: ${error.message}`);
  }
};

  return (
    <div className="h-screen max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* File Input to Upload Image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />

        {/* Profile Picture Preview */}
        <div
          className="
            w-32 h-32 self-center cursor-pointer 
            shadow-md rounded-full bg-white overflow-hidden 
            flex items-center justify-center
          "
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="w-full h-full object-cover rounded-full aspect-square"
            style={{
              border: '5px solid #d1d5db', // Tailwind's gray-300 color
            }}
          />
        </div>

        {/* User Information */}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />

        {/* Update Button */}
        <Button
          type="button"
          gradientDuoTone="purpleToBlue"
          outline
          onClick={uploadImage}
        >
          Upload
        </Button>
      </form>

      {/* Delete and Sign Out Buttons */}
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
