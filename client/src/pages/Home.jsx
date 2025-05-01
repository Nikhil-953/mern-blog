import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import PostCard from '../components/PostCard';
const Home = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() =>{
   const fetchPosts = async () =>{
    const res = await fetch('/api/post/getPosts')
    const data = await res.json()
    setPosts(data.posts);
   }
   fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 p-3
      max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold
        lg:text-6xl'>Welcome to my Blog!</h1>
        <p className='text-gray-500 text-xs
        sm:text-sm'>
        Explore a world of ideas, insights, and inspiration. 
        Whether you're here to read thoughtful opinions, learn something new, or just take a break from your day, our blog offers fresh content on topics that matter. 
        Dive in, discover, and join the conversation!</p>
      </div>
      <Link to='/search' className='text-xs sm:text-sm
      text-blue-500 font-bold hover:underline'>View all posts</Link>
      <div className='p-3 bg-yellow-200 dark:bg-gray-700'>
        <CallToAction/>
      </div>
      <div className='max-w-6xl mx-auto p-3 flex-col
      gap-8 py-7'>
      {
        posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post)=>(
                <PostCard key={post._id} post={post} />
              ))

              }
            </div>
            <Link 
            to={'/search'}
            className='text-lg text-blue-500
            hover:underline text-center'
            >
            View all posts
            </Link>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default Home
