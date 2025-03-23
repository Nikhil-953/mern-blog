import { Button, TextInput } from 'flowbite-react';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
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
      uploadImage(imageFile); // ✅ Pass imageFile correctly
    }
  }, [imageFile]);

  // Upload Image to Backend and Get Cloudinary URL
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file); // Key 'image' matches backend

      // Simulating upload progress (Optional, but better for visual UX)
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate progress
        setImageFileUploadProgress(i); // Update progress
      }

      // Send request to backend
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

      // ✅ Show alert only after upload completes
      alert('Image uploaded successfully!');

      // ✅ Reset progress to hide CircularProgressbar
      setImageFileUploadProgress(null);
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert(`Error uploading image: ${error.message}`);
      setImageFileUploadProgress(null); // Reset progress on error
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
            relative w-32 h-32 self-center cursor-pointer 
            shadow-md rounded-full bg-white overflow-hidden 
            flex items-center justify-center
          "
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress !== null && (
            <CircularProgressbar
              value={imageFileUploadProgress}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`w-full h-full object-cover rounded-full aspect-square
              ${imageFileUploadProgress !== null && imageFileUploadProgress < 100 && 'opacity-60'}
            `}
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
          onClick={() => {
            if (imageFile) {
              uploadImage(imageFile); // ✅ Pass imageFile correctly
            } else {
              alert('Please select an image first!');
            }
          }}
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
