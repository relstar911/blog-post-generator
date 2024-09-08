import React from 'react';
import Link from 'next/link';
import { BlogPost } from '../types';

interface SearchResultsProps {
  results: BlogPost[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="space-y-4">
      {results.map((post) => (
        <div key={post._id} className="border p-4 rounded-md">
          <Link href={`/blog/${post._id}`}>
            <a className="text-xl font-semibold text-blue-600 hover:underline">{post.title}</a>
          </Link>
          <p className="text-gray-600 mt-2">{post.content.substring(0, 150)}...</p>
          <div className="mt-2 text-sm text-gray-500">
            By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
