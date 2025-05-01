import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group h-full flex flex-col rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300'>
      {/* Image container with hover effect */}
      <div className='w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden'>
        <Link to={`/post/${post.slug}`}>
          <img
            src={post.image || 'https://via.placeholder.com/400x225?text=No+Image'}
            alt={post.title || "Post cover"}
            className='w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
          />
        </Link>
      </div>
      
      {/* Content container */}
      <div className='p-4 flex flex-col gap-2 bg-white dark:bg-gray-800 flex-grow'>
        <p className='text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
          {post.title}
        </p>
        <span className='italic text-sm text-gray-600 dark:text-gray-400'>
          {post.category}
        </span>
        <Link 
          to={`/post/${post.slug}`} 
          className='mt-2 inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors duration-200'
        >
          Read article →
        </Link>
      </div>
    </div>
  );
}