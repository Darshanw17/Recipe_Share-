import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, Users } from 'lucide-react';
import { mockRecipes, mockUsers } from '../data/mockData';

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'trending') return matchesSearch && recipe.likes > 300;
    if (activeFilter === 'quick') return matchesSearch && recipe.tags.includes('Quick');
    if (activeFilter === 'healthy') return matchesSearch && (recipe.tags.includes('Healthy') || recipe.tags.includes('Vegan'));

    return matchesSearch;
  });

  const handleFollow = (userId) => {
    console.log('Following user:', userId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Recipes</h1>
          <p className="text-gray-600">Find inspiration from our community of passionate cooks</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Search recipes, ingredients, or tags..."
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-8 overflow-x-auto">
          <Filter className="h-5 w-5 text-gray-500 flex-shrink-0" />
          {[
            { key: 'all', label: 'All Recipes', icon: null },
            { key: 'trending', label: 'Trending', icon: TrendingUp },
            { key: 'quick', label: 'Quick & Easy', icon: Clock },
            { key: 'healthy', label: 'Healthy', icon: Users },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter.key
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-300'
              }`}
            >
              {filter.icon && <filter.icon className="h-4 w-4" />}
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Featured Users */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Chefs</h2>
            <div className="space-y-4">
              {mockUsers.map((user) => (
                <div key={user.id} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
                      <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{user.bio}</p>
                  <button
                    onClick={() => handleFollow(user.id)}
                    className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      user.isFollowing
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-orange-500 text-white hover:bg-orange-600'
                    }`}
                  >
                    {user.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={recipe.user.avatar}
                        alt={recipe.user.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600">@{recipe.user.username}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{recipe.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recipe.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{recipe.cookTime}</span>
                      <span>{recipe.servings} servings</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {recipe.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                      {recipe.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          +{recipe.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium text-gray-900">{recipe.likes}</span>
                        <span className="text-sm text-gray-500">likes</span>
                      </div>
                      <button className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors">
                        View Recipe
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;