import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?slug=${slug}`);
        const data = await res.json();
        if (res.ok && data.posts.length > 0) {
          setPost(data.posts[0]);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">{post.title}</h1>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full max-h-[500px] object-cover rounded-lg shadow-md"
        />
      )}

      <article
        className="prose max-w-none pt-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
