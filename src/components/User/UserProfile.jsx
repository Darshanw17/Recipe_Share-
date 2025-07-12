import  { useState } from 'react';
import { MapPin, Link as LinkIcon, Calendar, Users, UserPlus, UserCheck } from 'lucide-react';

const UserProfile = ({ user, isOwnProfile = false, onFollow }) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
  const [followers, setFollowers] = useState(user.followers);

  const handleFollow = () => {
    if (onFollow) {
      onFollow(user.id);
      setIsFollowing(!isFollowing);
      setFollowers(isFollowing ? followers - 1 : followers + 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500" />
      
      {/* Profile Content */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="flex items-end justify-between -mt-16 mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          {!isOwnProfile && (
            <button
              onClick={handleFollow}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isFollowing
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {isFollowing ? (
                <>
                  <UserCheck className="h-4 w-4" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  <span>Follow</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
          <p className="text-gray-600 mb-2">@{user.username}</p>
          <p className="text-gray-700 leading-relaxed">{user.bio}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="font-semibold text-gray-900">{followers}</span>
            <span className="text-gray-600">Followers</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-gray-900">{user.following}</span>
            <span className="text-gray-600">Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;