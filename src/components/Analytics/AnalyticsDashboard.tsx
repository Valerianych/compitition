import React from 'react';
import { BarChart3, TrendingUp, Users, Calendar, Heart, Coffee, MapPin, Clock } from 'lucide-react';

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Наша статистика 📊
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Посмотрим как активно мы тусуемся и что любим больше всего!
        </p>
      </div>

      {/* Ключевые метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Всего встреч</p>
              <p className="text-3xl font-bold">24</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm text-purple-100">+5 за месяц 🚀</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Участий всего</p>
              <p className="text-3xl font-bold">156</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            <span className="text-sm text-pink-100">Дружная банда! 💕</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Средняя посещаемость</p>
              <p className="text-3xl font-bold">6.5</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-orange-100">из 8 друзей 🎯</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Успешных встреч</p>
              <p className="text-3xl font-bold">92%</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-green-100">Почти не отменяем! 🔥</span>
          </div>
        </div>
      </div>

      {/* Популярные активности */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🏆</span>
            Что мы любим больше всего?
          </h3>
          <div className="space-y-4">
            {[
              { activity: '🎬 Кино', count: 8, percentage: 85 },
              { activity: '☕ Кафе и рестораны', count: 6, percentage: 70 },
              { activity: '🏠 Домашние посиделки', count: 5, percentage: 60 },
              { activity: '🌳 Прогулки на природе', count: 3, percentage: 40 },
              { activity: '🎭 Культурные мероприятия', count: 2, percentage: 25 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.activity.split(' ')[0]}</span>
                  <span className="font-medium text-gray-900">{item.activity.split(' ').slice(1).join(' ')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-600 w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">⭐</span>
            Самые активные друзья
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Алекс', avatar: '🦸‍♂️', meetings: 18, badge: 'Организатор' },
              { name: 'Лена', avatar: '🌟', meetings: 16, badge: 'Душа компании' },
              { name: 'Макс', avatar: '🎮', meetings: 15, badge: 'Хозяин' },
              { name: 'Саша', avatar: '📸', meetings: 14, badge: 'Фотограф' },
              { name: 'Катя', avatar: '☕', meetings: 12, badge: 'Кофеман' }
            ].map((friend, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{friend.avatar}</div>
                  <div>
                    <p className="font-bold text-gray-900">{friend.name}</p>
                    <p className="text-sm text-purple-600 font-medium">{friend.badge}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{friend.meetings}</p>
                  <p className="text-sm text-gray-600">встреч</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Временная активность */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="w-6 h-6 mr-3 text-purple-500" />
          Когда мы чаще всего встречаемся?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { time: 'Утром (9-12)', count: 2, emoji: '🌅', color: 'from-yellow-400 to-orange-400' },
            { time: 'Днем (12-17)', count: 8, emoji: '☀️', color: 'from-orange-400 to-red-400' },
            { time: 'Вечером (17-21)', count: 12, emoji: '🌆', color: 'from-purple-400 to-pink-400' },
            { time: 'Ночью (21+)', count: 2, emoji: '🌙', color: 'from-blue-400 to-purple-400' }
          ].map((period, index) => (
            <div key={index} className={`bg-gradient-to-br ${period.color} rounded-xl p-6 text-white text-center transform hover:scale-105 transition-all duration-200`}>
              <div className="text-4xl mb-3">{period.emoji}</div>
              <p className="font-bold text-lg mb-1">{period.count}</p>
              <p className="text-sm opacity-90">{period.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Последняя активность */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">📝</span>
          Что происходило недавно
        </h3>
        <div className="space-y-4">
          {[
            { 
              event: 'Поход в новый кинотеатр 🎬', 
              action: 'Алекс создал встречу', 
              time: '2 часа назад',
              color: 'bg-blue-50 border-blue-200 text-blue-700'
            },
            { 
              event: 'Кофе и настолки у Макса ☕', 
              action: 'Встреча завершена, все довольны!', 
              time: '5 часов назад',
              color: 'bg-green-50 border-green-200 text-green-700'
            },
            { 
              event: 'Прогулка по парку 🌳', 
              action: 'Лена обновила время встречи', 
              time: '1 день назад',
              color: 'bg-purple-50 border-purple-200 text-purple-700'
            },
            { 
              event: 'Общий график 📅', 
              action: 'Саша обновил свое расписание', 
              time: '2 дня назад',
              color: 'bg-pink-50 border-pink-200 text-pink-700'
            },
          ].map((activity, index) => (
            <div key={index} className={`flex items-center justify-between py-4 px-6 border-2 rounded-xl ${activity.color}`}>
              <div>
                <p className="font-bold text-lg">{activity.event}</p>
                <p className="font-medium">{activity.action}</p>
              </div>
              <span className="font-medium">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Мотивационная секция */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-8 text-white text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-4">Мы крутая банда!</h3>
        <p className="text-purple-100 text-lg mb-6">
          За последний месяц мы встретились 5 раз и создали кучу классных воспоминаний. Так держать!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <p className="text-2xl font-bold">24</p>
            <p className="text-purple-100">Встреч всего</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <p className="text-2xl font-bold">8</p>
            <p className="text-purple-100">Активных друзей</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <p className="text-2xl font-bold">∞</p>
            <p className="text-purple-100">Воспоминаний</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;