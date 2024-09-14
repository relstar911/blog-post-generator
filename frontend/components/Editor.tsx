import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import api from '../utils/api';

interface EditorProps {
  initialContent: string;
  onSave: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ initialContent, onSave }) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-sm m-5 focus:outline-none',
      },
    },
    immediatelyRender: false, // Add this line
  });

  useEffect(() => {
    editor?.commands.setContent(initialContent);
  }, [initialContent, editor]);

  const handleSave = async () => {
    if (!editor) return;
    setIsLoading(true);
    setError(null);
    try {
      const content = editor.getHTML();
      await api.post('/save-content', { content });
      onSave(content);
    } catch (error) {
      setError('Error saving content. Please try again.');
      console.error('Error saving content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExtractKeywords = async () => {
    if (!editor) return;
    setIsLoading(true);
    setError(null);
    try {
      const content = editor.getHTML();
      const response = await api.post('/extract-keywords', { content });
      setKeywords(response.data.keywords);
    } catch (error) {
      setError('Error extracting keywords. Please try again.');
      console.error('Error extracting keywords:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateContent = async (inputType: 'text' | 'url' | 'pdf', input: string | File) => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      switch (inputType) {
        case 'text':
          response = await api.post('/process-text-input', { text: input });
          break;
        case 'url':
          response = await api.post('/process-url-input', { url: input });
          break;
        case 'pdf':
          const formData = new FormData();
          formData.append('pdf', input as File);
          response = await api.post('/process-pdf-input', formData);
          break;
      }
      editor?.commands.setContent(response.data.content);
    } catch (error) {
      setError(`Error generating content from ${inputType}. Please try again.`);
      console.error(`Error generating content from ${inputType}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <EditorContent editor={editor} className="tiptap mb-4" />
      <div className="flex space-x-2 mb-4">
        <button onClick={handleSave} disabled={isLoading} className="btn-primary">
          Save
        </button>
        <button onClick={handleExtractKeywords} disabled={isLoading} className="btn-secondary">
          Extract Keywords
        </button>
        <button 
          onClick={() => editor && handleGenerateContent('text', editor.getHTML())} 
          disabled={isLoading}
          className="btn-secondary"
        >
          Generate from Text
        </button>
      </div>
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Enter URL" 
          onBlur={(e) => handleGenerateContent('url', e.target.value)}
          className="input w-full"
        />
      </div>
      <div className="file-input-wrapper mb-4">
        <button className="btn">Upload PDF</button>
        <input 
          type="file" 
          accept=".pdf" 
          onChange={(e) => e.target.files && handleGenerateContent('pdf', e.target.files[0])}
        />
      </div>
      {isLoading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}
      {keywords.length > 0 && (
        <div className="keyword-list">
          <h3>Extracted Keywords:</h3>
          <ul>
            {keywords.map((keyword, index) => (
              <li key={index}>{keyword}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Editor;
