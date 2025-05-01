import { Table, Modal, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  const limit = 9;

  const fetchComments = async (append = false, start = startIndex) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/comment/all`, {
        credentials: 'include',
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch comments');
      }

      if (append) {
        setComments((prev) => {
          const allComments = [...prev, ...data.comments];
          const uniqueComments = Array.from(new Map(allComments.map(c => [c._id, c])).values());
          return uniqueComments;
        });
      } else {
        setComments(data.comments);
      }

      if (data.comments.length < limit) {
        setShowMore(false);
      }
    } catch (error) {
      console.error('Fetch Comments error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.isAdmin) {
      fetchComments();
    }
  }, [currentUser?._id, currentUser?.isAdmin]);

  const handleShowMore = () => {
    const newIndex = startIndex + limit;
    fetchComments(true, newIndex);
    setStartIndex(newIndex);
  };

  const handleDeleteComment = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/comment/deleteComment/${commentIdToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
  
      if (res.ok) {
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error('Delete comment error:', error);
      setError('Failed to delete comment');
    }
  };

  if (loading && comments.length === 0) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md w-full">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of Likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {comments.map((comment) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={comment._id}
                >
                  <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className="max-w-xs truncate">
                    {comment.content}
                  </Table.Cell>
                  <Table.Cell>{comment.numberOfLikes || 0}</Table.Cell>
                  <Table.Cell className="truncate max-w-[100px]">
                    {comment.postId}
                  </Table.Cell>
                  <Table.Cell className="truncate max-w-[100px]">
                    {comment.userId}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {loading && <div className="text-center py-4">Loading more...</div>}

          {showMore && !loading && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-center py-8">You have no comments yet!</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashComments;