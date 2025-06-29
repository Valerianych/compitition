import React from 'react';
import { Calendar, Users, Clock, TrendingUp, MapPin, Heart, Coffee, Camera } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Добро пожаловать! 👋
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Это наш личный помощник для организации встреч! Здесь мы планируем походы в кино, кафе, на природу и просто хорошо проводим время вместе 🎉
        </p>
      </div>

      {/* Статистические карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Наших встреч</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm text-purple-100">+3 за месяц 🚀</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Друзей в группе</p>
              <p className="text-3xl font-bold">8</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            <span className="text-sm text-pink-100">Дружная компания! 💕</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">На этой неделе</p>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-orange-100">Много планов! 🎯</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Активность</p>
              <p className="text-3xl font-bold">87%</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-green-100">Все молодцы! 🔥</span>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">⚡</span>
          Что будем делать?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="p-6 border-2 border-purple-200 rounded-2xl hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 text-left group transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <span className="ml-3 text-2xl">🎊</span>
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Организовать встречу</h4>
            <p className="text-gray-600">Предложи новое место или активность для всей группы!</p>
          </button>
          
          <button className="p-6 border-2 border-pink-200 rounded-2xl hover:bg-pink-50 hover:border-pink-400 transition-all duration-200 text-left group transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-pink-100 rounded-full group-hover:bg-pink-200 transition-colors">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <span className="ml-3 text-2xl">👥</span>
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Посмотреть группу</h4>
            <p className="text-gray-600">Узнай кто свободен и готов к приключениям</p>
          </button>
          
          <button className="p-6 border-2 border-orange-200 rounded-2xl hover:bg-orange-50 hover:border-orange-400 transition-all duration-200 text-left group transform hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <span className="ml-3 text-2xl">⏰</span>
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Обновить график</h4>
            <p className="text-gray-600">Расскажи когда ты свободен для встреч</p>
          </button>
        </div>
      </div>

      {/* Последние встречи */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-3">📅</span>
          Наши последние встречи
        </h3>
        <div className="space-y-4">
          {[
            { 
              name: 'Поход в новый кинотеатр', 
              date: '15 декабря', 
              status: 'Скоро!', 
              emoji: '🎬',
              participants: 6,
              location: 'ТЦ Галерея'
            },
            { 
              name: 'Кофе и настолки у Макса', 
              date: '12 декабря', 
              status: 'Было здорово!', 
              emoji: '☕',
              participants: 4,
              location: 'Дома у Макса'
            },
            { 
              name: 'Прогулка по парку', 
              date: '10 декабря', 
              status: 'Отличная погода была', 
              emoji: '🌳',
              participants: 7,
              location: 'Парк Горького'
            },
          ].map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{event.emoji}</div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{event.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.date}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {event.participants} друзей
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-4 py-2 text-sm rounded-full font-medium ${
                event.status === 'Скоро!' ? 'bg-green-100 text-green-800' :
                event.status === 'Было здорово!' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Мотивационная секция */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-8 text-white text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-4">Жизнь прекрасна с друзьями!</h3>
        <p className="text-purple-100 text-lg mb-6">
          Каждая встреча - это новые воспоминания. Давайте создавать их вместе!
        </p>
        <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition-colors transform hover:scale-105">
          Запланировать что-то интересное! ✨
        </button>
      </div>
    </div>
  );
};

export default DashboardOverview;