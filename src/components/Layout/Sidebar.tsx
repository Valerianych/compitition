import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Plus, 
  Clock, 
  BarChart3,
  Users,
  Zap,
  User,
  CalendarDays,
  Bell,
  Vote
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Главная', emoji: '🏠' },
    { to: '/events', icon: Calendar, label: 'Наши встречи', emoji: '🎊' },
    { to: '/polls', icon: Vote, label: 'Опросы', emoji: '🗳️' },
    { to: '/create-event', icon: Plus, label: 'Организовать мероприятие', emoji: '✨' },
    { to: '/schedule', icon: Clock, label: 'Мой график', emoji: '⏰' },
    { to: '/optimal-time', icon: Zap, label: 'Поиск времени', emoji: '🎯' },
    { to: '/calendar', icon: CalendarDays, label: 'Календарь группы', emoji: '📅' },
    { to: '/friends', icon: Users, label: 'Участники группы', emoji: '👥' },
    { to: '/profile', icon: User, label: 'Мой профиль', emoji: '👤' },
    { to: '/analytics', icon: BarChart3, label: 'Статистика', emoji: '📊' },
  ];

  return (
    <div className="fixed left-0 top-16 bottom-0 w-64 bg-gradient-to-b from-purple-50 to-pink-50 border-r border-purple-100 overflow-y-auto">
      <nav className="p-4 space-y-2">
        <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm border border-purple-100">
          <p className="text-sm text-purple-600 font-medium mb-1">💡 Совет дня</p>
          <p className="text-xs text-gray-600">Создай опрос перед планированием мероприятия - узнай мнение всех!</p>
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:bg-white hover:shadow-md hover:scale-105'
              }`
            }
          >
            <span className="text-lg">{item.emoji}</span>
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-8">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-purple-100">
          <h3 className="font-medium text-gray-900 mb-2">🎯 Быстрые действия</h3>
          <div className="space-y-2">
            <NavLink to="/create-poll" className="block w-full text-left text-sm text-purple-600 hover:text-purple-700 py-1">
              🗳️ Создать опрос
            </NavLink>
            <NavLink to="/optimal-time" className="block w-full text-left text-sm text-purple-600 hover:text-purple-700 py-1">
              ⚡ Найти время для встречи
            </NavLink>
            <NavLink to="/calendar" className="block w-full text-left text-sm text-purple-600 hover:text-purple-700 py-1">
              📅 Посмотреть календарь
            </NavLink>
            <button className="w-full text-left text-sm text-purple-600 hover:text-purple-700 py-1">
              🔔 Настроить уведомления
            </button>
          </div>
        </div>

        {/* Новая секция уведомлений */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 shadow-sm border border-blue-200 mt-4">
          <h3 className="font-medium text-blue-900 mb-3 flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            📱 Уведомления
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">ВКонтакте</span>
              <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600 transition-colors">
                Подключить
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">Телеграм</span>
              <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full hover:bg-blue-600 transition-colors">
                Подключить
              </button>
            </div>
            <div className="text-xs text-blue-600 mt-2">
              💡 Получай уведомления о новых мероприятиях и изменениях!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;