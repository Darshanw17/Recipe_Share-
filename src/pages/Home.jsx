import  { useState } from 'react';
import RecipeCard from '../components/Recipe/RecipeCard';
import { mockRecipes } from '../Data/mockData';

const Home = () => {
  const [recipes, setRecipes] = useState(mockRecipes);

  const handleLike = (recipeId) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === recipeId
          ? {
              ...recipe,
              isLiked: !recipe.isLiked,
              likes: recipe.isLiked ? recipe.likes - 1 : recipe.likes + 1
            }
          : recipe
      )
    );
  };

  const handleShare = (recipeId) => {
    // In a real app, this would open a share dialog
    console.log('Sharing recipe:', recipeId);
    alert('Recipe shared successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20 md:pb-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Recipe Feed</h1>
          <p className="text-gray-600">Discover delicious recipes from chefs around the world</p>
        </div>

        {/* Recipe Feed */}
        <div className="space-y-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onLike={handleLike}
              onShare={handleShare}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors">
            Load More Recipes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;