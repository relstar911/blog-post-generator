import React, { useState } from 'react';
import { useGenerateContent } from '../../hooks/useGenerateContent';

interface URLInputProps {
  onContentGenerated: (content: string, title: string, sourceUrl: string) => void;
}

const URLInput: React.FC<URLInputProps> = ({ onContentGenerated }) => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const { generateContent, isLoading, error } = useGenerateContent();

  const validateURL = (input: string) => {
    try {
      new URL(input);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError('');

    if (!validateURL(url)) {
      setUrlError('Please enter a valid URL');
      return;
    }

    try {
      const result = await generateContent({ type: 'url', input: url });
      onContentGenerated(result.content, result.originalTitle, result.sourceUrl);
    } catch (err) {
      console.error('Error generating content from URL:', err);
      setUrlError('Failed to generate content from the provided URL');
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
            Enter URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
              urlError ? 'border-red-500' : ''
            }`}
            placeholder="https://example.com"
          />
          {urlError && <p className="mt-1 text-sm text-red-600">{urlError}</p>}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Generating...' : 'Generate Content'}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {isLoading && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Fetching content...</span>
        </div>
      )}
    </div>
  );
};

export default URLInput;
