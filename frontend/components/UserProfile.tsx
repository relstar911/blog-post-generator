import React, { useState } from 'react';
import { updateUserProfile } from '../utils/api';

interface UserData {
  id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
}

interface UserProfileProps {
  user: UserData;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<UserData>>(user);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(user.id, editedData);
      const updatedUser = response.data;
      setEditedData(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedData.name || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedData.email || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              disabled
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-1">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={editedData.bio || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="location" className="block mb-1">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={editedData.location || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="website" className="block mb-1">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={editedData.website || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio || 'No bio provided'}</p>
          <p><strong>Location:</strong> {user.location || 'Not specified'}</p>
          <p><strong>Website:</strong> {user.website ? <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{user.website}</a> : 'Not specified'}</p>
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;