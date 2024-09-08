import React, { useState } from 'react';
import api from '../../utils/api';

interface PDFUploadProps {
  onContentGenerated: (content: string) => void;
}

const PDFUpload: React.FC<PDFUploadProps> = ({ onContentGenerated }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await api.post('/input/pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onContentGenerated(response.data.content);
    } catch (err) {
      setError('Failed to generate content from PDF');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={isLoading || !file}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {isLoading ? 'Generating...' : 'Generate from PDF'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PDFUpload;
