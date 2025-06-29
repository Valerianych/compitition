import React from 'react';
import { Calendar, MapPin, Users, Clock, Heart, DollarSign, ExternalLink, MessageCircle } from 'lucide-react';

const EventsList: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'Новый фильм в IMAX! 🎬',
      description: 'Смотрим долгожданную премьеру в лучшем качестве! Попкорн и эмоции гарантированы 🍿',
      date: '2024-12-15',
      time: '19:00',
      location: 'Кинотеатр "Галерея"',
      link: 'https://gallery-cinema.ru',
      capacity: 8,
      registered: 6,
      category: 'Кино',
      price: '500₽',
      emoji: '🎬',
      organizer: 'Алекс',
      comments: 12,
      photos: 3
    },
    {
      id: 2,
      title: 'Кофе и настолки у Макса ☕',
      description: 'Уютный вечер с любимыми играми! Макс обещал новую игру показать 🎲',
      date: '2024-12-18',
      time: '18:00',
      location: 'Дома у Макса',
      link: null,
      capacity: 6,
      registered: 4,
      category: 'Дома',
      price: '200₽ (на еду)',
      emoji: '🎲',
      organizer: 'Макс',
      comments: 8,
      photos: 1
    },
    {
      id: 3,
      title: 'Прогулка по новому парку 🌳',
      description: 'Исследуем новый парк, который недавно открыли! Говорят там классные фотозоны',
      date: '2024-12-20',
      time: '14:00',
      location: 'Парк "Зеленый остров"',
      link: 'https://maps.google.com/park-green-island',
      capacity: 10,
      registered: 7,
      category: 'Прогулка',
      price: 'Бесплатно! 🎉',
      emoji: '🌳',
      organizer: 'Лена',
      comments: 15,
      photos: 5
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Наши встречи 🎊
          </h1>
          <p className="text-gray-600 text-lg">Все запланированные мероприятия нашей группы!</p>
        </div>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg transform hover:scale-105">
          ✨ Организовать мероприятие
        </button>
      </div>

      <div className="grid gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-4xl">{event.emoji}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
                      <p className="text-purple-600 font-medium">Организует: {event.organizer}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">{event.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center text-gray-600 bg-purple-50 rounded-lg p-3">
                      <Calendar className="w-5 h-5 mr-3 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">Когда</p>
                        <p className="font-bold">{new Date(event.date).toLocaleDateString('ru-RU')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 bg-pink-50 rounded-lg p-3">
                      <Clock className="w-5 h-5 mr-3 text-pink-500" />
                      <div>
                        <p className="text-sm font-medium">Время</p>
                        <p className="font-bold">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 bg-orange-50 rounded-lg p-3">
                      <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium">Где</p>
                        <p className="font-bold text-sm">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 bg-green-50 rounded-lg p-3">
                      <DollarSign className="w-5 h-5 mr-3 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Цена</p>
                        <p className="font-bold text-sm">{event.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-2 text-purple-500" />
                      <span className="font-medium">{event.registered}/{event.capacity} друзей идут</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MessageCircle className="w-5 h-5 mr-2 text-pink-500" />
                      <span>{event.comments} комментариев</span>
                    </div>

                    {event.photos > 0 && (
                      <div className="flex items-center text-gray-600">
                        <span className="mr-2">📸</span>
                        <span>{event.photos} фото</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-6 text-right space-y-3">
                  <span className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full">
                    {event.category}
                  </span>
                  
                  <div className="space-y-2">
                    <button className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-md transform hover:scale-105">
                      🎉 Участвую!
                    </button>
                    
                    {event.link && (
                      <button className="block w-full border-2 border-purple-200 text-purple-600 px-6 py-3 rounded-xl text-sm hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 font-medium flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ссылка
                      </button>
                    )}
                    
                    <button className="block w-full border-2 border-gray-200 text-gray-600 px-6 py-3 rounded-xl text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium">
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
                  <span className="font-bold">{Math.round((event.registered / event.capacity) * 100)}% заполнено</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Уже идут: {event.registered} друзей</span>
                  <span>Осталось мест: {event.capacity - event.registered}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-12 text-center">
          <div className="text-6xl mb-6">🎭</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Пока что тихо...</h3>
          <p className="text-gray-600 text-lg mb-6">Никто еще не предложил встречу. Может быть ты будешь первым?</p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg transform hover:scale-105">
            ✨ Организовать первое мероприятие!
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsList;