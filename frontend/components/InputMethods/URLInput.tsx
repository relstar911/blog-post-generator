import React, { useState } from 'react';
import api from '../../utils/api';

interface URLInputProps {
  onContentGenerated: (content: string) => void;
}

const URLInput: React.FC<URLInputProps> = ({ onContentGenerated }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/input/url', { url });
      onContentGenerated(response.data.content);
    } catch (err) {
      setError('Failed to generate content from URL');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {isLoading ? 'Generating...' : 'Generate from URL'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default URLInput;
