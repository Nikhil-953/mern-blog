import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Textarea } from 'flowbite-react';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const [isEditing, setIsEditing] = useState(false); // Fixed typo from isEding to isEditing
    const [editedContent, setEditedContent] = useState(comment.content);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/user/${comment.userId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                if (res.ok) {
                    setUser(data.user);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error(error.message);
            }
        };
        getUser();
    }, [comment]);

    const isLikedByCurrentUser = currentUser && comment.likes.includes(currentUser._id);
  
    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };   

    const handleSave = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: editedContent,
                }),
            });
            
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment._id, editedContent); // Fixed typo from editedContend to editedContent
            } else {
                const data = await res.json();
                console.error(data.message);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedContent(comment.content);
    };

    return (
        <div className="flex p-4 border-b dark:border-gray-600 text-sm">
            <div className="flex-shrink-0 mr-3">
                <img
                    className="w-10 h-10 rounded-full bg-gray-200"
                    src={user.profilePicture}
                    alt={user.username}
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className="font-bold mr-1 text-xs truncated">
                        {user ? `@${user.username}` : "anonymous user"}
                    </span>
                    <span className="text-gray-500 text-xs">{moment(comment.createdAt).fromNow()}</span>
                </div>
                {isEditing ? (
                    <div className="flex gap-2 items-center">
                        <Textarea
                            className="border rounded p-2 w-full"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500 pb-2">{comment.content}</p>
                )}
                <div className="custom-like-button flex items-center pt-2 text-xs
                   border-t dark:border-gray-700 max-w-fit gap-2">
                    <button
                        onClick={() => onLike(comment._id)}
                        className={`transition-colors ${
                            isLikedByCurrentUser ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
                        }`}
                    >
                        <FaThumbsUp />
                    </button>
                    <p className="text-gray-500 text-xs">
                        {comment.numberOfLikes} {comment.numberOfLikes === 1 ? "like" : "likes"}
                    </p>
                    {
                        currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && !isEditing && (
                          <>
                            <button 
                                type='button'
                                onClick={handleEdit}
                                className="text-gray-400 hover:text-blue-500 ml-2"
                            >
                                Edit
                            </button>
                            <button 
                            type='button'
                            onClick={() => onDelete(comment._id)}
                            className="text-gray-400 hover:text-red-500 ml-2"
                        >
                            Delete
                        </button>
                          </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}