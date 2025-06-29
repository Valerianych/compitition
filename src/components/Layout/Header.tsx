import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Bell, Heart, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { employee, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-purple-100 fixed top-0 left-0 right-0 z-50">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Мобильное меню */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Наша Компания
            </h1>
            <p className="text-xs text-gray-500">Планируем встречи вместе! 🎉</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-2 text-purple-400 hover:text-purple-600 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full"></span>
          </button>
          
          <Link 
            to="/profile"
            className="flex items-center space-x-2 sm:space-x-3 bg-purple-50 rounded-full px-2 sm:px-4 py-2 hover:bg-purple-100 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm hidden sm:block">
              <p className="font-medium text-gray-900">
                {employee?.nickname || employee?.name || 'Друг'} 👋
              </p>
              <p className="text-gray-500 text-xs">Участник группы</p>
            </div>
          </Link>
            
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Выйти"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;