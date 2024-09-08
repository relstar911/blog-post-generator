import React from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';

const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
