import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api from '../utils/api';
import SearchResults from '../components/SearchResults';
import { BlogPost } from '../types';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { q, tag, author } = router.query;
    if (q && typeof q === 'string') {
      setSearchTerm(q);
      performSearch(q);
    } else if (tag && typeof tag === 'string') {
      performTagSearch(tag);
    } else if (author && typeof author === 'string') {
      performAuthorSearch(author);
    }
  }, [router.query]);

  const performSearch = async (term: string) => {
    setIsLoading(true);
    try {
      const response = await api.searchBlogPosts(term);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching blog posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const performTagSearch = async (tag: string) => {
    setIsLoading(true);
    try {
      const response = await api.searchBlogPostsByTag(tag);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching blog posts by tag:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const performAuthorSearch = async (authorId: string) => {
    setIsLoading(true);
    try {
      const response = await api.searchBlogPostsByAuthor(authorId);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching blog posts by author:', error);
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
      </Head>

      <h1 className="text-3xl font-bold mb-6">Search Blog Posts</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for blog posts..."
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <SearchResults results={searchResults} />
      )}
    </div>
  );
};

export default SearchPage;
