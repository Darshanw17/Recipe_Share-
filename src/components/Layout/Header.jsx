
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Plus, Heart, User, LogOut, ChefHat } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              RecipeShare
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/discover"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/discover') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search className="h-5 w-5" />
              <span>Discover</span>
            </Link>
            <Link
              to="/create"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                isActive('/create') ? 'text-orange-500 bg-orange-50' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Plus className="h-5 w-5" />
              <span>Create</span>
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
            <Link
              to="/profile"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </Link>
            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around h-16">
          <Link
            to="/"
            className={`flex flex-col items-center space-y-1 p-2 ${
              isActive('/') ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/discover"
            className={`flex flex-col items-center space-y-1 p-2 ${
              isActive('/discover') ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs">Discover</span>
          </Link>
          <Link
            to="/create"
            className={`flex flex-col items-center space-y-1 p-2 ${
              isActive('/create') ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs">Create</span>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center space-y-1 p-2 ${
              isActive('/profile') ? 'text-orange-500' : 'text-gray-600'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;