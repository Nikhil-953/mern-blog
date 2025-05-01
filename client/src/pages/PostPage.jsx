// PostPage.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spinner, Button } from 'flowbite-react';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/post/getposts?slug=${slug}`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok && data.posts.length > 0) {
          setPost(data.posts[0]);
          setError(null);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      }
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">{post.title}</h1>

      <div className="flex justify-center">
        <Link to={`/search?category=${post.category}`}>
          <Button color="gray" pill size="xs" className="mt-2">
            {post.category}
          </Button>
        </Link>
      </div>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full max-h-[500px] object-cover rounded-lg shadow-md"
        />
      )}

      <div className='flex justify-between p-3 border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && Math.max(1, Math.ceil(post.content.split(' ').length / 200))} mins read</span>
      </div>

      <article
        className="prose max-w-none pt-6 post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction/>
      </div>
      
      <CommentSection postId={post._id}/>
      
      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 w-full'>
          {recentPosts && 
            recentPosts.map((post) => (
              <div key={post._id} className='h-full'>
                <PostCard post={post} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}