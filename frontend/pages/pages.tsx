import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import api from '../utils/api';
import { BlogPost } from '../types';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const { q } = router.query;
    if (q && typeof q === 'string') {
      setSearchTerm(q);
      performSearch(q);
    }
  }, [router.query]);

  const performSearch = async (term: string) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.get(`/blog-posts/search?q=${encodeURIComponent(term)}`);
      setSearchResults(response.data);
    } catch (err) {
      setError('Failed to perform search. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`, undefined, { shallow: true });
    performSearch(searchTerm);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Search Blog Posts | AI-Powered Blog Post Generator</title>
        <meta name="description" content="Search for blog posts in our AI-powered blog post generator" />
      </Head>

      <h1 className="text-3xl font-bold mb-6">Search Blog Posts</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for blog posts..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading && <p className="text-center">Loading...</p>}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {searchResults.length > 0 ? (
        <div className="space-y-6">
          {searchResults.map((post) => (
            <div key={post._id} className="border border-gray-200 p-4 rounded-md">
              <Link href={`/blog/${post._id}`}>
                <a className="text-xl font-semibold text-blue-600 hover:underline">{post.title}</a>
              </Link>
              <p className="text-gray-600 mt-2">{post.content.substring(0, 150)}...</p>
              {post.author && (
                <p className="text-sm text-gray-500 mt-2">
                  By {post.author.name} on {new Date(post.createdAt!).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
