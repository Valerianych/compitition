import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, TrendingUp, MapPin, Heart, Coffee, Camera, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEvents, getAllEmployees } from '../../services/firebaseService';
import { Event, Employee } from '../../types';

const DashboardOverview: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, employeesData] = await Promise.all([
          getEvents(),
          getAllEmployees()
        ]);
        setEvents(eventsData);
        setEmployees(employeesData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).slice(0, 3);
  const thisWeekEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return eventDate >= now && eventDate <= weekFromNow;
  });

  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Загружаем данные...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Добро пожаловать! 👋
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Это наш личный помощник для организации встреч! Здесь мы планируем походы в кино, кафе, на природу и просто хорошо проводим время вместе 🎉
        </p>
      </div>

      {/* Статистические карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Наших встреч</p>
              <p className="text-2xl sm:text-3xl font-bold">{events.length}</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Calendar className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm text-purple-100">+{thisWeekEvents.length} за неделю 🚀</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm font-medium">Друзей в группе</p>
              <p className="text-2xl sm:text-3xl font-bold">{employees.length}</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Users className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            <span className="text-sm text-pink-100">Дружная компания! 💕</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">На этой неделе</p>
              <p className="text-2xl sm:text-3xl font-bold">{thisWeekEvents.length}</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Clock className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-orange-100">
              {thisWeekEvents.length > 0 ? 'Много планов! 🎯' : 'Планируем встречи! 📅'}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Активность</p>
              <p className="text-2xl sm:text-3xl font-bold">87%</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-green-100">Все молодцы! 🔥</span>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <span className="mr-3">⚡</span>
          Что будем делать?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <Link 
            to="/create-event"
            className="p-4 sm:p-6 border-2 border-purple-200 rounded-2xl hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 text-left group transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                <Calendar className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600" />
              </div>
              <span className="ml-3 text-2xl">🎊</span>
            </div>
            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-2">Организовать встречу</h4>
            <p className="text-gray-600 text-sm sm:text-base">Предложи новое место или активность для всей группы!</p>
          </Link>
          
          <Link 
            to="/friends"
            className="p-4 sm:p-6 border-2 border-pink-200 rounded-2xl hover:bg-pink-50 hover:border-pink-400 transition-all duration-200 text-left group transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-pink-100 rounded-full group-hover:bg-pink-200 transition-colors">
                <Users className="w-6 sm:w-8 h-6 sm:h-8 text-pink-600" />
              </div>
              <span className="ml-3 text-2xl">👥</span>
            </div>
            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-2">Посмотреть группу</h4>
            <p className="text-gray-600 text-sm sm:text-base">Узнай кто свободен и готов к приключениям</p>
          </Link>
          
          <Link 
            to="/schedule"
            className="p-4 sm:p-6 border-2 border-orange-200 rounded-2xl hover:bg-orange-50 hover:border-orange-400 transition-all duration-200 text-left group transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
                <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-orange-600" />
              </div>
              <span className="ml-3 text-2xl">⏰</span>
            </div>
            <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-2">Обновить график</h4>
            <p className="text-gray-600 text-sm sm:text-base">Расскажи когда ты свободен для встреч</p>
          </Link>
        </div>
      </div>

      {/* Последние встречи */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
          <span className="mr-3">📅</span>
          Ближайшие встречи
        </h3>
        <div className="space-y-4">
          {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => (
            <div key={event.id || index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-200">
              <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                <div className="text-2xl sm:text-3xl">
                  {event.category === 'cinema' ? '🎬' : 
                   event.category === 'cafe' ? '☕' : 
                   event.category === 'nature' ? '🌳' : 
                   event.category === 'home' ? '🏠' : 
                   event.category === 'sport' ? '⚽' : 
                   event.category === 'culture' ? '🎭' : '🎉'}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base sm:text-lg">{event.title}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(event.date).toLocaleDateString('ru-RU')}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.time}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {event.attendees.length} друзей
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
              <span className="px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-full font-medium bg-green-100 text-green-800 text-center">
                Скоро!
              </span>
            </div>
          )) : (
            <div className="text-center py-8">
              <div className="text-4xl sm:text-6xl mb-4">📅</div>
              <p className="text-gray-600 text-base sm:text-lg mb-4">Пока нет запланированных встреч</p>
              <Link 
                to="/create-event"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg transform hover:scale-105 inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Создать первую встречу!
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Мотивационная секция */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 sm:p-8 text-white text-center">
        <div className="text-4xl sm:text-6xl mb-4">🎉</div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Жизнь прекрасна с друзьями!</h3>
        <p className="text-purple-100 text-base sm:text-lg mb-6">
          Каждая встреча - это новые воспоминания. Давайте создавать их вместе!
        </p>
        <Link 
          to="/create-event"
          className="bg-white text-purple-600 px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition-colors transform hover:scale-105 inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Запланировать что-то интересное! ✨
        </Link>
      </div>
    </div>
  );
};

export default DashboardOverview;