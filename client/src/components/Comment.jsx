import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Comment({ comment, onLike }) {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector((state) => state.user);

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
                <p className="text-gray-500 pb-2">{comment.content}</p>
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
                </div>
            </div>
        </div>
    );
}
