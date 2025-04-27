import { Alert, Button, Textarea, TextInput } from 'flowbite-react';
import React, { use, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null); // State to track comment error

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
    }
    }catch(error){
      setCommentError(error.message); // Set error message if fetch fails
    }
  
}

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
    </div>
  );
}
