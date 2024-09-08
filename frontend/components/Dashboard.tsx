import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardData {
  postViews: { [key: string]: number };
  totalViews: number;
  totalPosts: number;
  totalComments: number;
  averageViewsPerPost: number;
  topPosts: { title: string; views: number }[];
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.getDashboardData();
        setDashboardData(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) return <div>Loading dashboard data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dashboardData) return null;

  const chartData = Object.entries(dashboardData.postViews).map(([date, views]) => ({ date, views }));

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Views" value={dashboardData.totalViews} />
        <DashboardCard title="Total Posts" value={dashboardData.totalPosts} />
        <DashboardCard title="Total Comments" value={dashboardData.totalComments} />
        <DashboardCard title="Avg. Views per Post" value={dashboardData.averageViewsPerPost.toFixed(2)} />
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Post Views Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Top Posts</h3>
        <ul className="space-y-2">
          {dashboardData.topPosts.map((post, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="truncate">{post.title}</span>
              <span className="font-semibold">{post.views} views</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
  <div className="bg-gray-100 p-4 rounded-lg">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;