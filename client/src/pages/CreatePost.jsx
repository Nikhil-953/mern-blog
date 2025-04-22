import { Button, Select, TextInput, FileInput, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handleUploadImage = async () => {
    if (!file) {
      alert('Please select an image first');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((r) => setTimeout(r, 60));
        setUploadProgress(i);
      }

      const res = await fetch('http://localhost:3000/api/upload/niki', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Upload failed');

      setUploadProgress(100);
      setFileUrl(data.imageUrl);
      setUploading(false);
    } catch (err) {
      console.error('Image Upload Error:', err.message);
      alert('Failed to upload image');
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileUrl) {
      alert('Please upload an image before publishing!');
      return;
    }

    const postData = {
      title,
      category,
      content,
      image: fileUrl,
    };

    try {
      const res = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      alert('Post created successfully!');
    } catch (err) {
      console.error('Post Submit Error:', err.message);
      alert('Failed to create post');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center font-semibold text-3xl my-7">Create Post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Title & Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option>Web Development</option>
            <option>Mobile Development</option>
            <option>Data Science</option>
            <option>Machine Learning</option>
            <option>Artificial Intelligence</option>
            <option>Cloud Computing</option>
          </Select>
        </div>

        {/* Image Upload Row */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 rounded-lg">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={uploading}
          >
            {uploading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" light />
                <span>{uploadProgress}%</span>
              </div>
            ) : (
              'Upload image'
            )}
          </Button>
        </div>

        {/* Uploaded Image Preview BELOW Upload */}
        {fileUrl && (
          <img
            src={fileUrl}
            alt="Uploaded Preview"
            className="w-full max-h-96 object-cover rounded-lg"
          />
        )}

        {/* Post Editor */}
        <ReactQuill
          theme="snow"
          className="h-72 mb-12"
          placeholder="Write your post here..."
          required
          value={content}
          onChange={setContent}
        />

        {/* Publish Button */}
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
