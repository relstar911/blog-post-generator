import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Welcome to AI-Powered Blog Post Generator</h1>
      <p className="mt-4">Get started by creating your first blog post!</p>
      <Link href="/editor/new" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Create New Post
      </Link>
    </div>
  );
};

export default Home;
