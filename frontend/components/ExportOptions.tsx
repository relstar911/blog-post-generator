import React from 'react';
import { saveAs } from 'file-saver';
import { BlogPost } from '../types';

interface ExportOptionsProps {
  blogPost: BlogPost;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ blogPost }) => {
  const exportToPDF = async () => {
    // This is a placeholder. In a real implementation, you'd use a library like jsPDF
    // or make a backend call to generate a PDF
    console.log('Exporting to PDF:', blogPost.title);
    alert('PDF export functionality not implemented yet.');
  };

  const exportToMarkdown = () => {
    const markdown = `# ${blogPost.title}\n\n${blogPost.content}`;
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, `${blogPost.title}.md`);
  };

  return (
    <div className="export-options">
      <h3 className="text-lg font-semibold mb-2">Export Options</h3>
      <div className="flex space-x-2">
        <button
          onClick={exportToPDF}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export to PDF
        </button>
        <button
          onClick={exportToMarkdown}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Export to Markdown
        </button>
      </div>
    </div>
  );
};

export default ExportOptions;
