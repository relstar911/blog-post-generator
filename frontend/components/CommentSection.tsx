import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import api from '../utils/api';

interface Comment {
  id: string;
  content: string;
  author: { name: string };
  createdAt: string;
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    api.get(`/comments/${postId}`).then(response => {
      setComments(response.data);
    }).catch(error => {
      console.error('Error fetching comments:', error);
    });
  }, [postId]);

  const handleAddComment = async () => {
    if (!session) {
      return;
    }

    try {
      const response = await api.post(`/comments/${postId}`, { content: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.map(comment => (
        <div key={comment.id} className="mb-4">
          <p><strong>{comment.author.name}</strong> ({new Date(comment.createdAt).toLocaleString()}):</p>
          <p>{comment.content}</p>
        </div>
      ))}
      {session && (
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            className="w-full p-2 border rounded"
          />
          <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;