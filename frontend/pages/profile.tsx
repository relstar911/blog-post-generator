import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData(session.user.id);
    }
  }, [session]);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await api.getUserStatistics(userId);
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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        {userData ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <UserProfile user={userData.user} />
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Your Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded">
                  <span className="text-gray-600">Total Posts:</span>
                  <span className="font-semibold">{userData.statistics.postCount}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded">
                  <span className="text-gray-600">Total Comments:</span>
                  <span className="font-semibold">{userData.statistics.commentCount}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-100 rounded">
                  <span className="text-gray-600">Total Likes Received:</span>
                  <span className="font-semibold">{userData.statistics.totalLikes}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
