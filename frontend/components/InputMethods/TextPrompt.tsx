import React, { useState } from 'react';
import api from '../../utils/api';

interface TextPromptProps {
  onContentGenerated: (content: string) => void;
}

const TextPrompt: React.FC<TextPromptProps> = ({ onContentGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/input/text', { prompt });
      onContentGenerated(response.data.content);
    } catch (err) {
      setError('Failed to generate content from prompt');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        className="w-full p-2 border rounded h-32"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {isLoading ? 'Generating...' : 'Generate from Prompt'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default TextPrompt;
