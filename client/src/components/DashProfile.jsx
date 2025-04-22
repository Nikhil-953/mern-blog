import { Button, TextInput } from 'flowbite-react';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  console.log('👤 currentUser:', currentUser);
  const [imageFile, setImageFile] = useState(null);
  
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();


  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // Preview URL
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage(imageFile); // ✅ Upload image when selected
    }
  }, [imageFile]);

  // Upload Image to Cloudinary
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setImageFileUploadProgress(i);
      }

      // Send request to backend for Cloudinary upload
      const res = await fetch('http://localhost:3000/api/upload/niki', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = await res.json();
      const downloadURL = data.imageUrl; // ✅ Get image URL from response

      console.log('Image Uploaded:', downloadURL);
      setFormData({ ...formData, profilePicture: downloadURL }); // ✅ Add image URL to formData
      alert('Image uploaded successfully!');

      // ✅ Reset progress after completion
      setImageFileUploadProgress(null);
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert(`Error uploading image: ${error.message}`);
      setImageFileUploadProgress(null); // Reset progress on error
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission (update user details)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure an image is uploaded first if needed
    if (imageFile) {
      await uploadImage(imageFile);
    }
  
    console.log('✅ Form Data being sent:', formData);
  
    if (Object.keys(formData).length === 0) {
      alert('No changes detected!');
      return;
    }
  
    try {
      dispatch(updateStart());
  
      // Correct API endpoint for user update
      const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Ensures cookies (token) are sent
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      console.log('✅ Response:', data);
  
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        alert(`Error: ${data.message}`);
      } else {
        dispatch(updateSuccess(data));
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      dispatch(updateFailure(error.message));
      alert('Error updating profile');
    }
  };
  

  return (
    <div className="h-screen max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      {/* Form to handle user profile update */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Hidden File Input to Upload Image */}
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
          {/* Show Upload Progress */}
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

          {/* Show Profile Picture */}
          
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`w-full h-full object-contain rounded-full aspect-square bg-gray-100
              ${
                imageFileUploadProgress !== null &&
                imageFileUploadProgress < 100 &&
                'opacity-60'
              }
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
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="New Password"
          onChange={handleChange}
        />

        {/* Submit Button to Update User Details */}
        <Button type="submit">Update Profile</Button>
      </form>

      {/* Delete and Sign Out Buttons */}
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
