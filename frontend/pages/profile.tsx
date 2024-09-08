import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import UserProfile from '../components/UserProfile';
import api from '../utils/api';

interface UserData {
  user: {
    id: string;
    name: string;
    email: string;
    bio?: string;
    location?: string;
    website?: string;
  };
  statistics: {
    postCount: number;
    commentCount: number;
    totalLikes: number;
  };
}

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData(session.user.id);
    }
  }, [session]);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await api.getUserProfile(userId);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {userData && <UserProfile user={userData.user} />}
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">User Statistics</h2>
            {userData ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Posts:</span>
                  <span className="font-semibold">{userData.statistics.postCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Comments:</span>
                  <span className="font-semibold">{userData.statistics.commentCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Likes Received:</span>
                  <span className="font-semibold">{userData.statistics.totalLikes}</span>
                </div>
              </div>
            ) : (
              <p>Loading statistics...</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
