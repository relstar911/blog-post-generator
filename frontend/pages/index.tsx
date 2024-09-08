import { NextPage } from 'next';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Welcome to AI-Powered Blog Post Generator</h1>
      <p className="mt-4">Get started by creating your first blog post!</p>
    </Layout>
  );
};

export default Home;
