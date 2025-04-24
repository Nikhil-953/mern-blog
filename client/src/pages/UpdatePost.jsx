import { Button, Select, TextInput, FileInput, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { postId } = useParams(); // Get postId from URL params
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: '',
  });

  const navigate = useNavigate(); // ✅ Correct usage
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id || e.target.name]: e.target.value,
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok || !data.posts || data.posts.length === 0) {
          setPublishError(data.message || 'Post not found');
          return;
        }

        setPublishError(null);
        setFormData(data.posts[0]); // Might need adjustment based on actual data
      } catch (error) {
        console.error('Error fetching post data:', error.message);
        setPublishError('Failed to fetch post data');
      }
    };

    fetchPost();
  }, [postId]);

  const handleUploadImage = async () => {
    if (!file) {
      alert('Please select an image first');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadData = new FormData();
      uploadData.append('image', file);

      for (let i = 0; i <= 100; i += 10) {
        await new Promise((r) => setTimeout(r, 60));
        setUploadProgress(i);
      }

      const res = await fetch('http://localhost:3000/api/upload/niki', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Upload failed');

      setFormData((prev) => ({
        ...prev,
        image: data.imageUrl,
      }));

      setUploadProgress(100);
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

    if (!formData.image) {
      alert('Please upload an image before publishing!');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      alert('Post updated successfully!');

      // ✅ Redirect to post
      navigate(`/post/${data.slug}`);
    } catch (err) {
      console.error('Post Submit Error:', err.message);
      alert('Failed to update post');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center font-semibold text-3xl my-7">Update Post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={handleChange}
            value={formData.title}
          />
          <Select
            required
            id="category"
            name="category"
            onChange={handleChange}
            value={formData.category}
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

        {formData.image && (
          <img
            src={formData.image}
            alt="Uploaded Preview"
            className="w-full max-h-96 object-cover rounded-lg"
          />
        )}

        <ReactQuill
          theme="snow"
          className="h-72 mb-12"
          placeholder="Write your post here..."
          required
          value={formData.content}
          onChange={handleContentChange}
        />

        <Button type="submit" gradientDuoTone="purpleToPink">
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default UpdatePost;
