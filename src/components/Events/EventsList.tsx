import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Heart, DollarSign, ExternalLink, MessageCircle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEvents, submitVote } from '../../services/firebaseService';
import { useAuth } from '../../contexts/AuthContext';
import { Event } from '../../types';

const EventsList: React.FC = () => {
  const { employee } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Ошибка загрузки мероприятий:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleJoinEvent = async (eventId: string) => {
    if (!employee?.id || !eventId) return;

    try {
      await submitVote({
        eventId,
        employeeId: employee.id,
        availability: 'available',
        preferredTimes: [],
        comments: 'Участвую!'
      });

      // Обновляем локальное состояние
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, attendees: [...event.attendees, employee.id] }
          : event
      ));
    } catch (error) {
      console.error('Ошибка при записи на мероприятие:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Загружаем мероприятия...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Наши встречи 🎊
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">Все запланированные мероприятия нашей группы!</p>
        </div>
        <Link 
          to="/create-event"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg transform hover:scale-105 text-center"
        >
          <Plus className="w-5 h-5 inline mr-2" />
          ✨ Организовать мероприятие
        </Link>
      </div>

      <div className="grid gap-6 sm:gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-3xl sm:text-4xl">
                      {event.category === 'cinema' ? '🎬' : 
                       event.category === 'cafe' ? '☕' : 
                       event.category === 'nature' ? '🌳' : 
                       event.category === 'home' ? '🏠' : 
                       event.category === 'sport' ? '⚽' : 
                       event.category === 'culture' ? '🎭' : '🎉'}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{event.title}</h3>
                      <p className="text-purple-600 font-medium">Организует: {event.organizerId}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">{event.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center text-gray-600 bg-purple-50 rounded-lg p-3">
                      <Calendar className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-purple-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">Когда</p>
                        <p className="font-bold text-sm sm:text-base">{new Date(event.date).toLocaleDateString('ru-RU')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 bg-pink-50 rounded-lg p-3">
                      <Clock className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-pink-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">Время</p>
                        <p className="font-bold text-sm sm:text-base">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 bg-orange-50 rounded-lg p-3">
                      <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-orange-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">Где</p>
                        <p className="font-bold text-xs sm:text-sm">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 bg-green-50 rounded-lg p-3">
                      <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">Цена</p>
                        <p className="font-bold text-xs sm:text-sm">{event.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-purple-500" />
                      <span className="font-medium text-sm sm:text-base">{event.attendees.length}/{event.capacity} друзей идут</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-pink-500" />
                      <span className="text-sm sm:text-base">{event.comments.length} комментариев</span>
                    </div>

                    {event.photos && event.photos.length > 0 && (
                      <div className="flex items-center text-gray-600">
                        <span className="mr-2">📸</span>
                        <span className="text-sm sm:text-base">{event.photos.length} фото</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="lg:ml-6 space-y-3 lg:text-right lg:min-w-[200px]">
                  <span className="inline-block px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full">
                    {event.category === 'cinema' ? 'Кино' : 
                     event.category === 'cafe' ? 'Кафе' : 
                     event.category === 'nature' ? 'Прогулка' : 
                     event.category === 'home' ? 'Дома' : 
                     event.category === 'sport' ? 'Спорт' : 
                     event.category === 'culture' ? 'Культура' : 'Встреча'}
                  </span>
                  
                  <div className="space-y-2">
                    {employee && !event.attendees.includes(employee.id) ? (
                      <button 
                        onClick={() => event.id && handleJoinEvent(event.id)}
                        className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-3 rounded-xl text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-md transform hover:scale-105"
                      >
                        🎉 Участвую!
                      </button>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                        <p className="text-green-700 font-medium text-sm">✅ Вы участвуете</p>
                      </div>
                    )}
                    
                    {event.link && (
                      <a 
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full border-2 border-purple-200 text-purple-600 px-4 sm:px-6 py-3 rounded-xl text-sm hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 font-medium flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ссылка
                      </a>
                    )}
                    
                    <button className="block w-full border-2 border-gray-200 text-gray-600 px-4 sm:px-6 py-3 rounded-xl text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium">
                      💬 Обсудить
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Прогресс-бар участников */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1 text-pink-500" />
                    Кто идет с нами
                  </span>
                  <span className="font-bold">{Math.round((event.attendees.length / event.capacity) * 100)}% заполнено</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${(event.attendees.length / event.capacity) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Уже идут: {event.attendees.length} друзей</span>
                  <span>Осталось мест: {event.capacity - event.attendees.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 sm:p-12 text-center">
          <div className="text-4xl sm:text-6xl mb-6">🎭</div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Пока что тихо...</h3>
          <p className="text-gray-600 text-base sm:text-lg mb-6">Никто еще не предложил встречу. Может быть ты будешь первым?</p>
          <Link 
            to="/create-event"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg transform hover:scale-105 inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            ✨ Организовать первое мероприятие!
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventsList;