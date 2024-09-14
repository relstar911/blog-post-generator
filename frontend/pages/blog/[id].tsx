import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import api from '../../utils/api';
import CommentSection from '../../components/CommentSection';
import ExportOptions from '../../components/ExportOptions';

interface BlogPost {
  title: string;
  content: string;
}

const BlogPostPage: React.FC = () => {
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
      <ExportOptions blogPost={post as BlogPost & { _id: string, author: { _id: string, id?: string, name: string }, createdAt: string, updatedAt: string }} />
    </Layout>
  );
};

export default BlogPostPage;