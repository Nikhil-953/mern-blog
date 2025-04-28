import { Alert, Button, Textarea, TextInput } from 'flowbite-react';
import React, { use, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link , useNavigate} from 'react-router-dom';
import Comment from './Comment';


export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null); // State to track comment error
  const [comments, setComments] = useState([]); // State to track comments
 const navigate = useNavigate(); // Hook to navigate programmatically

const handleSubmit = async (e) => {
    e.preventDefault();
    if(comment.length>200){
        return;
    }
    try{
      const res = await fetch('http://localhost:3000/api/comment/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: comment,
            postId: postId,
            userId: currentUser._id,
        }),
    });
    const data = await res.json();
    if(res.ok){
        setComment('');
        setCommentError(null);
        setComments([data,...comments]); // Update comments state with new comment
    }
    }catch(error){
      setCommentError(error.message); // Set error message if fetch fails
    }
  
}

// Update your initial comments fetch to include proper like data
useEffect(() => {
  const getComments = async () => {
      try {
          const res = await fetch(`/api/comment/getPostcomments/${postId}`);
          if (res.ok) {
              const data = await res.json();
              setComments(data.comments.map(comment => ({
                  ...comment,
                  // Ensure we have both likes array and numberOfLikes
                  likes: comment.likes || [],
                  numberOfLikes: comment.numberOfLikes || comment.likes?.length || 0
              })));
          }
      } catch (error) {
          console.error('Failed to fetch comments:', error);
      }
  };
  getComments();
}, [postId]);

const handleLike = async (commentId) => {
  try {
      if (!currentUser) {
          navigate('/sign-in');
          return;
      }
      
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
          method: 'PUT',
          credentials: 'include',
      });
      
      if (res.ok) {
          const data = await res.json();
          setComments(comments.map(comment => 
              comment._id === commentId ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.numberOfLikes
              } : comment
          ));
      }
  } catch (error) {
      console.error('Like error:', error);
      // You might want to show an error toast here
  }
};

// In CommentSection.jsx
const handleEdit = async (commentId, editedContent) => {
  try {
      const res = await fetch(`http://localhost:3000/api/comment/editComment/${commentId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: editedContent }),
      });
      
      if (res.ok) {
          setComments(comments.map(c => 
              c._id === commentId ? { ...c, content: editedContent } : c
          ));
      }
  } catch (error) {
      console.error('Edit error:', error);
  }
};
  return (
    <div className="border-t mt-6 pt-4">
      {currentUser ? (
        <div className="flex items-center gap-2 p-4">
          <p className="text-sm">Signed in as:</p>
          <img
            src={currentUser.profilePicture}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <Link
            to={`/dashboard?tab=profile`}
            className="text-blue-600 font-semibold hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <>
          <p className=" text-sm text-teal-500 italic px-4 flex-gap-1">
            You must be signed in to comment.
          </p>
          <Link
            to={"/sign-in"}
            className="text-blue-600 px-4 underline hover:text-blue-800"
          >
            Sign In
          </Link>
        </>
      )}
      {
        currentUser && (
          <form onSubmit={handleSubmit} 
          className='border border-teal-500 rounded-md p-3'>
            <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            />
            <div className='flex justify-between items-center mt-5'>
                <p className='text-gray-500 text-size-xs'>{200-comment.length} characters remaining</p>
                <Button 
                    outline
                    gradientDuoTone="purpleToBlue" 
                    size="sm" 
                    type="submit"  // <-- move type here
                    className="mt-2"
                    >
                    Submit
                    </Button>
             </div>
             {commentError && (
              <Alert color="failure" className="mt-5">
                {commentError}
              </Alert>  
             )}
          </form>  
        )
      }
      {comments.length === 0 ? (
         <p className='text-sm'>No comments yet!</p>
        ): (
          <>
           <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {
            comments.map(comment => (
              <Comment
                key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit}
              />
            ))
          }
          </>
         
          )}
    </div>
  );
}
