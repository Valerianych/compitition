import React, { useState } from 'react';
import { Calendar, Clock, Users, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  schedule: {
    [key: string]: {
      isWorking: boolean;
      startTime: string;
      endTime: string;
    };
  };
}

const GroupCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  // Моковые данные друзей с их графиками
  const friends: Friend[] = [
    {
      id: '1',
      name: 'Алекс',
      nickname: 'Организатор',
      avatar: '🦸‍♂️',
      schedule: {
        monday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
        tuesday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
        wednesday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
        thursday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
        friday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
        saturday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
        sunday: { isWorking: false, startTime: '10:00', endTime: '22:00' }
      }
    },
    {
      id: '2',
      name: 'Лена',
      nickname: 'Душа компании',
      avatar: '🌟',
      schedule: {
        monday: { isWorking: true, startTime: '10:00', endTime: '19:00' },
        tuesday: { isWorking: true, startTime: '10:00', endTime: '19:00' },
        wednesday: { isWorking: true, startTime: '10:00', endTime: '19:00' },
        thursday: { isWorking: true, startTime: '10:00', endTime: '19:00' },
        friday: { isWorking: true, startTime: '10:00', endTime: '19:00' },
        saturday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
        sunday: { isWorking: false, startTime: '10:00', endTime: '22:00' }
      }
    },
    {
      id: '3',
      name: 'Макс',
      nickname: 'Хозяин',
      avatar: '🎮',
      schedule: {
        monday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
        tuesday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
        wednesday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
        thursday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
        friday: { isWorking: true, startTime: '09:00', endTime: '17:00' },
        saturday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
        sunday: { isWorking: false, startTime: '10:00', endTime: '22:00' }
      }
    },
    {
      id: '4',
      name: 'Саша',
      nickname: 'Фотограф',
      avatar: '📸',
      schedule: {
        monday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
        tuesday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
        wednesday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
        thursday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
        friday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
        saturday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
        sunday: { isWorking: false, startTime: '10:00', endTime: '22:00' }
      }
    },
    {
      id: '5',
      name: 'Катя',
      nickname: 'Кофеман',
      avatar: '☕',
      schedule: {
        monday: { isWorking: true, startTime: '11:00', endTime: '20:00' },
        tuesday: { isWorking: true, startTime: '11:00', endTime: '20:00' },
        wednesday: { isWorking: true, startTime: '11:00', endTime: '20:00' },
        thursday: { isWorking: true, startTime: '11:00', endTime: '20:00' },
        friday: { isWorking: true, startTime: '11:00', endTime: '20:00' },
        saturday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
        sunday: { isWorking: false, startTime: '10:00', endTime: '22:00' }
      }
    }
  ];

  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayNamesRu = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const dayNamesFullRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  // Получаем даты недели
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Понедельник как первый день
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const toggleFriend = (friendId: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 23; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  const timeSlots = getTimeSlots();

  const isTimeInWorkingHours = (friend: Friend, dayName: string, time: string): boolean => {
    const daySchedule = friend.schedule[dayName];
    if (!daySchedule || !daySchedule.isWorking) return false;
    
    const timeMinutes = timeToMinutes(time);
    const startMinutes = timeToMinutes(daySchedule.startTime);
    const endMinutes = timeToMinutes(daySchedule.endTime);
    
    return timeMinutes >= startMinutes && timeMinutes < endMinutes;
  };

  const getAvailableFriendsAtTime = (dayName: string, time: string): Friend[] => {
    const displayedFriends = selectedFriends.length > 0 
      ? friends.filter(f => selectedFriends.includes(f.id))
      : friends;
      
    return displayedFriends.filter(friend => !isTimeInWorkingHours(friend, dayName, time));
  };

  const getAvailabilityColor = (availableCount: number, totalCount: number): string => {
    if (totalCount === 0) return 'bg-gray-100';
    const percentage = (availableCount / totalCount) * 100;
    
    if (percentage === 100) return 'bg-green-200';
    if (percentage >= 75) return 'bg-green-100';
    if (percentage >= 50) return 'bg-yellow-100';
    if (percentage >= 25) return 'bg-orange-100';
    return 'bg-red-100';
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Календарь группы 📅
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Смотри когда кто работает и находи идеальное время для встреч!
        </p>
      </div>

      {/* Фильтр друзей */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-500" />
          Выбери кого показать в календаре
        </h3>
        
        <div className="flex flex-wrap gap-3 mb-4">
          {friends.map(friend => (
            <button
              key={friend.id}
              onClick={() => toggleFriend(friend.id)}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl border-2 transition-all duration-200 ${
                selectedFriends.includes(friend.id)
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300 text-gray-700'
              }`}
            >
              <span className="text-lg sm:text-xl">{friend.avatar}</span>
              <span className="font-medium text-sm sm:text-base">{friend.name}</span>
              {selectedFriends.includes(friend.id) ? (
                <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
              ) : (
                <EyeOff className="w-3 sm:w-4 h-3 sm:h-4" />
              )}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            {selectedFriends.length === 0 
              ? 'Показаны все друзья' 
              : `Показано: ${selectedFriends.length} из ${friends.length} друзей`
            }
          </p>
          
          {selectedFriends.length > 0 && (
            <button
              onClick={() => setSelectedFriends([])}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Показать всех
            </button>
          )}
        </div>
      </div>

      {/* Навигация по неделям */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button
            onClick={() => navigateWeek('prev')}
            className="flex items-center justify-center px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Предыдущая неделя</span>
            <span className="sm:hidden">Назад</span>
          </button>
          
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center">
            {weekDates[0].toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} - {' '}
            {weekDates[6].toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            onClick={() => navigateWeek('next')}
            className="flex items-center justify-center px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors"
          >
            <span className="hidden sm:inline">Следующая неделя</span>
            <span className="sm:hidden">Вперед</span>
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        {/* Календарная сетка */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px] lg:min-w-[800px]">
            {/* Заголовки дней */}
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="p-2 sm:p-3 text-center font-medium text-gray-500 text-xs sm:text-sm">Время</div>
              {weekDates.map((date, index) => (
                <div key={index} className="p-2 sm:p-3 text-center">
                  <div className="font-bold text-gray-900 text-xs sm:text-sm">{dayNamesRu[index]}</div>
                  <div className="text-xs text-gray-600">{date.getDate()}</div>
                  {(date.getDay() === 0 || date.getDay() === 6) && (
                    <div className="text-xs text-green-600 font-medium hidden sm:block">Выходной</div>
                  )}
                </div>
              ))}
            </div>

            {/* Временные слоты */}
            <div className="space-y-1">
              {timeSlots.map(time => {
                const displayedFriends = selectedFriends.length > 0 
                  ? friends.filter(f => selectedFriends.includes(f.id))
                  : friends;

                return (
                  <div key={time} className="grid grid-cols-8 gap-1">
                    <div className="p-1 sm:p-2 text-center text-xs sm:text-sm font-medium text-gray-600 bg-gray-50 rounded-lg">
                      {time}
                    </div>
                    {weekDates.map((date, dayIndex) => {
                      const dayName = dayNames[dayIndex];
                      const availableFriends = getAvailableFriendsAtTime(dayName, time);
                      const availabilityColor = getAvailabilityColor(availableFriends.length, displayedFriends.length);
                      
                      return (
                        <div
                          key={dayIndex}
                          className={`p-1 sm:p-2 rounded-lg border border-gray-200 min-h-[40px] sm:min-h-[60px] ${availabilityColor} hover:shadow-md transition-all duration-200 cursor-pointer group`}
                          title={`${availableFriends.length} из ${displayedFriends.length} свободны`}
                        >
                          <div className="flex flex-wrap gap-1">
                            {displayedFriends.map(friend => {
                              const isWorking = isTimeInWorkingHours(friend, dayName, time);
                              return (
                                <span
                                  key={friend.id}
                                  className={`text-sm sm:text-lg transition-all duration-200 ${
                                    isWorking 
                                      ? 'opacity-30 grayscale' 
                                      : 'opacity-100 hover:scale-125'
                                  }`}
                                  title={`${friend.name} - ${isWorking ? 'Работает' : 'Свободен'}`}
                                >
                                  {friend.avatar}
                                </span>
                              );
                            })}
                          </div>
                          
                          {/* Показываем процент доступности при наведении */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-gray-700 mt-1 hidden sm:block">
                            {displayedFriends.length > 0 && (
                              <>
                                {Math.round((availableFriends.length / displayedFriends.length) * 100)}% свободны
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Легенда */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">📖 Как читать календарь</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-3">🎨 Цвета доступности:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-200 rounded border border-gray-200"></div>
                <span className="text-sm">100% друзей свободны</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded border border-gray-200"></div>
                <span className="text-sm">75%+ друзей свободны</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-yellow-100 rounded border border-gray-200"></div>
                <span className="text-sm">50%+ друзей свободны</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-orange-100 rounded border border-gray-200"></div>
                <span className="text-sm">25%+ друзей свободны</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded border border-gray-200"></div>
                <span className="text-sm">Меньше 25% свободны</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-3">👥 Аватары друзей:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-xl">😊</span>
                <span className="text-sm">Яркий аватар = друг свободен</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl opacity-30 grayscale">😴</span>
                <span className="text-sm">Тусклый аватар = друг работает</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-sm text-purple-700">
                💡 <strong>Совет:</strong> Наводи курсор на ячейки чтобы увидеть точный процент доступности!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="bg-purple-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white text-center">
        <div className="text-4xl sm:text-6xl mb-4">⚡</div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Нашел идеальное время?</h3>
        <p className="text-purple-100 text-base sm:text-lg mb-6">
          Используй наш умный поиск времени чтобы найти когда все точно свободны!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-purple-600 px-4 sm:px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors transform hover:scale-105 shadow-lg">
            🎯 Найти оптимальное время
          </button>
          <button className="bg-white bg-opacity-20 text-white px-4 sm:px-6 py-3 rounded-xl font-bold hover:bg-opacity-30 transition-colors transform hover:scale-105">
            ✨ Создать мероприятие
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupCalendar;