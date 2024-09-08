import React, { useState } from 'react';
import api from '../../utils/api';

interface TextInputProps {
  onContentGenerated: (content: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onContentGenerated }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/input/text', { text });
      onContentGenerated(response.data.content);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Generate Content
      </button>
    </form>
  );
};

export default TextInput;