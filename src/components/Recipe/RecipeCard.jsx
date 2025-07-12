import  { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, Clock, Users } from 'lucide-react';

const RecipeCard = ({ recipe, onLike, onShare }) => {
  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const [likes, setLikes] = useState(recipe.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike(recipe.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* User Info */}
      <div className="flex items-center p-4 border-b border-gray-50">
        <img
          src={recipe.user.avatar}
          alt={recipe.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3 flex-1">
          <h3 className="font-semibold text-gray-900">{recipe.user.name}</h3>
          <p className="text-sm text-gray-500">@{recipe.user.username}</p>
        </div>
        <span className="text-sm text-gray-500">{recipe.createdAt}</span>
      </div>

      {/* Recipe Image */}
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Recipe Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

        {/* Recipe Meta */}
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isLiked
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium">{likes}</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all">
              <MessageCircle className="h-5 w-5" />
              <span>Comment</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onShare(recipe.id)}
              className="p-2 rounded-lg text-gray-600 hover:text-green-500 hover:bg-green-50 transition-all"
            >
              <Share className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 transition-all">
              <Bookmark className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;