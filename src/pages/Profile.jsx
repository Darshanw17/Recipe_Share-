import { useState } from 'react';
import { Grid3X3, BookOpen, Heart } from 'lucide-react';
import UserProfile from '../components/User/UserProfile';
import { useAuth } from '../context/AuthContext';
import { mockRecipes } from '../data/mockData';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('recipes');

  const userRecipes = mockRecipes.filter(recipe => recipe.userId === user?.id);
  const likedRecipes = mockRecipes.filter(recipe => recipe.isLiked);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* User Profile */}
        <div className="mb-8">
          <UserProfile user={user} isOwnProfile={true} />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('recipes')}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                activeTab === 'recipes'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid3X3 className="h-5 w-5" />
              <span>My Recipes</span>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                activeTab === 'saved'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span>Saved</span>
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                activeTab === 'liked'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Heart className="h-5 w-5" />
              <span>Liked</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'recipes' && userRecipes.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Grid3X3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes yet</h3>
              <p className="text-gray-600">Start sharing your favorite recipes with the world!</p>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved recipes</h3>
              <p className="text-gray-600">Save recipes you love to find them easily later!</p>
            </div>
          )}

          {activeTab === 'liked' && likedRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{recipe.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-500">{recipe.cookTime}</span>
                  <div className="flex items-center space-x-1 text-red-500">
                    <Heart className="h-4 w-4 fill-current" />
                    <span className="text-sm">{recipe.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;