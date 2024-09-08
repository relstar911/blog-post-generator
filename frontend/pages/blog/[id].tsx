import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import api from '../../utils/api';
import CommentSection from '../../components/CommentSection';

interface BlogPost {
  title: string;
  content: string;
}

const BlogPost: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (id) {
      api.get(`/blog-posts/${id}`).then(response => {
        setPost(response.data);
      }).catch(error => {
        console.error('Error fetching post:', error);
      });
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <CommentSection postId={id as string} />
    </Layout>
  );
};

export default BlogPost;