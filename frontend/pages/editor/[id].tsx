import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Layout from '../../components/Layout';
import api from '../../utils/api';
import { useGenerateContent } from '../../hooks/useGenerateContent';
import TextInput from '../../components/InputMethods/TextInput';
import URLInput from '../../components/InputMethods/URLInput';
import PDFInput from '../../components/InputMethods/PDFInput';
import dynamic from 'next/dynamic';

const DynamicTiptapEditor = dynamic(() => import('../../components/TiptapEditor'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const Editor = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [post, setPost] = useState({ title: '', content: '' });
  const [inputMethod, setInputMethod] = useState<'text' | 'url' | 'pdf'>('text');
  const { content, isLoading, error, generateContent } = useGenerateContent();

  const editor = useEditor({
    extensions: [StarterKit],
    content: post.content,
    onUpdate: ({ editor }) => {
      setPost(prevPost => ({ ...prevPost, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (id && id !== 'new') {
      api.get(`/blog-posts/${id}`).then(response => {
        setPost(response.data);
        editor?.commands.setContent(response.data.content);
      }).catch(error => {
        console.error('Error fetching post:', error);
      });
    }
  }, [id, editor]);

  useEffect(() => {
    if (content) {
      setPost(prevPost => ({ ...prevPost, content }));
      editor?.commands.setContent(content);
    }
  }, [content, editor]);

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
      console.error('Error saving post:', error);
    }
  };

  const handleInputMethodChange = (method: 'text' | 'url' | 'pdf') => {
    setInputMethod(method);
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
      <div className="mb-4">
        <button
          onClick={() => handleInputMethodChange('text')}
          className={`mr-2 ${inputMethod === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'} px-4 py-2 rounded`}
        >
          Text
        </button>
        <button
          onClick={() => handleInputMethodChange('url')}
          className={`mr-2 ${inputMethod === 'url' ? 'bg-blue-500 text-white' : 'bg-gray-200'} px-4 py-2 rounded`}
        >
          URL
        </button>
        <button
          onClick={() => handleInputMethodChange('pdf')}
          className={`${inputMethod === 'pdf' ? 'bg-blue-500 text-white' : 'bg-gray-200'} px-4 py-2 rounded`}
        >
          PDF
        </button>
      </div>
      {inputMethod === 'text' && <TextInput onContentGenerated={(content) => generateContent({ type: 'text', input: content })} />}
      {inputMethod === 'url' && <URLInput onContentGenerated={(content, title, sourceUrl) => generateContent({ type: 'url', input: content, title, sourceUrl })} />}
      {inputMethod === 'pdf' && <PDFInput onContentGenerated={(content, title, metadata, pageCount) => generateContent({ type: 'pdf', input: content, title, metadata, pageCount })} />}
      <DynamicTiptapEditor
       content ={post.content}
        onUpdate={(newContent: string) => setPost(prevPost => ({ ...prevPost, content: newContent }))}
      />
      {isLoading && <p className="text-blue-500">Generating content...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
        Save Post
      </button>
    </Layout>
  );
};

export default Editor;
