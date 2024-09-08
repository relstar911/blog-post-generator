import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import { useGenerateContent } from '../../hooks/useGenerateContent';
import api from '../../utils/api';
import { BlogPost } from '../../types';

const Editor = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const { content: generatedContent, generateContent, isLoading, error } = useGenerateContent();
  const [post, setPost] = useState<BlogPost>({ title: '', content: '' });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await api.get(`/blog-posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };

  const handleSave = async () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    try {
      if (id === 'new') {
        await api.post('/blog-posts', post);
      } else {
        await api.put(`/blog-posts/${id}`, post);
      }
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const handleGenerate = async () => {
    if (post.title) {
      await generateContent(post.title);
      if (!error) {
        setPost(prevPost => ({ ...prevPost, content: prevPost.content + '\n\n' + generatedContent }));
      }
    }
  };

  if (!session) {
    return <div>Please sign in to access the editor.</div>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{id === 'new' ? 'Create New Post' : 'Edit Post'}</h1>
      <input
        type="text"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        placeholder="Post Title"
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        placeholder="Post Content"
        className="w-full p-2 mb-4 border rounded h-64"
      />
      <button 
        onClick={handleGenerate} 
        disabled={isLoading || !post.title} 
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 disabled:bg-gray-300"
      >
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>
      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
        Save Post
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </Layout>
  );
};

export default Editor;
