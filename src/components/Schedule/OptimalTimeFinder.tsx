import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Zap, CheckCircle, AlertCircle, Star } from 'lucide-react';

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

interface OptimalSlot {
  date: string;
  startTime: string;
  endTime: string;
  availableFriends: Friend[];
  totalFriends: number;
  availabilityPercentage: number;
  dayOfWeek: string;
  isWeekend: boolean;
  score: number;
}

const OptimalTimeFinder: React.FC = () => {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [eventDuration, setEventDuration] = useState(2);
  const [preferredTimeStart, setPreferredTimeStart] = useState('18:00');
  const [preferredTimeEnd, setPreferredTimeEnd] = useState('22:00');
  const [daysAhead, setDaysAhead] = useState(7);
  const [optimalSlots, setOptimalSlots] = useState<OptimalSlot[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayNamesRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  // Функция для конвертации времени в минуты
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Функция для конвертации минут в время
  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Основной алгоритм поиска оптимального времени
  const findOptimalTimes = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const slots: OptimalSlot[] = [];
      const selectedFriendsData = friends.filter(f => selectedFriends.includes(f.id));
      
      if (selectedFriendsData.length === 0) {
        setOptimalSlots([]);
        setIsAnalyzing(false);
        return;
      }

      // Анализируем каждый день в указанном периоде
      for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + dayOffset);
        const dayOfWeek = dayNames[currentDate.getDay()];
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

        // Находим пересечения свободного времени
        const availableFriends: Friend[] = [];
        let commonFreeTimeStart = timeToMinutes(preferredTimeStart);
        let commonFreeTimeEnd = timeToMinutes(preferredTimeEnd);

        selectedFriendsData.forEach(friend => {
          const daySchedule = friend.schedule[dayOfWeek];
          if (daySchedule) {
            if (!daySchedule.isWorking) {
              // Друг свободен весь день
              availableFriends.push(friend);
            } else {
              // Друг занят, проверяем свободное время до и после работы
              const workStart = timeToMinutes(daySchedule.startTime);
              const workEnd = timeToMinutes(daySchedule.endTime);
              
              // Проверяем, есть ли свободное время в предпочитаемом диапазоне
              const preferredStart = timeToMinutes(preferredTimeStart);
              const preferredEnd = timeToMinutes(preferredTimeEnd);
              
              // Свободен до работы
              if (workStart > preferredStart && workStart - preferredStart >= eventDuration * 60) {
                availableFriends.push(friend);
              }
              // Свободен после работы
              else if (workEnd < preferredEnd && preferredEnd - workEnd >= eventDuration * 60) {
                availableFriends.push(friend);
                commonFreeTimeStart = Math.max(commonFreeTimeStart, workEnd);
              }
            }
          }
        });

        // Если есть доступные друзья, создаем слот
        if (availableFriends.length > 0) {
          const availabilityPercentage = (availableFriends.length / selectedFriendsData.length) * 100;
          
          // Вычисляем оптимальное время начала
          let optimalStart = commonFreeTimeStart;
          let optimalEnd = Math.min(commonFreeTimeEnd, optimalStart + eventDuration * 60);
          
          // Убеждаемся, что есть достаточно времени
          if (optimalEnd - optimalStart >= eventDuration * 60) {
            // Вычисляем рейтинг слота
            let score = availabilityPercentage;
            if (isWeekend) score += 20; // Бонус за выходные
            if (availabilityPercentage === 100) score += 30; // Бонус за 100% доступность
            if (optimalStart >= timeToMinutes('18:00')) score += 10; // Бонус за вечернее время

            slots.push({
              date: currentDate.toISOString().split('T')[0],
              startTime: minutesToTime(optimalStart),
              endTime: minutesToTime(optimalEnd),
              availableFriends,
              totalFriends: selectedFriendsData.length,
              availabilityPercentage,
              dayOfWeek: dayNamesRu[currentDate.getDay()],
              isWeekend,
              score
            });
          }
        }
      }

      // Сортируем по рейтингу
      slots.sort((a, b) => b.score - a.score);
      setOptimalSlots(slots.slice(0, 10)); // Показываем топ-10
      setIsAnalyzing(false);
    }, 1500); // Имитация анализа
  };

  const handleFriendToggle = (friendId: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 120) return 'from-green-400 to-green-600';
    if (score >= 100) return 'from-blue-400 to-blue-600';
    if (score >= 80) return 'from-purple-400 to-purple-600';
    return 'from-orange-400 to-orange-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 120) return 'Идеально! 🎯';
    if (score >= 100) return 'Отлично! ⭐';
    if (score >= 80) return 'Хорошо! 👍';
    return 'Неплохо 🤔';
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Поиск идеального времени ⏰
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Магия начинается здесь! Выбери друзей и параметры - мы найдем когда все свободны 🎯
        </p>
      </div>

      {/* Настройки поиска */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-3 text-yellow-500" />
          Настрой поиск под вашу тусовку
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Выбор друзей */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">👥 Кого приглашаем?</h4>
            <div className="space-y-3">
              {friends.map(friend => (
                <label key={friend.id} className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 cursor-pointer transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={selectedFriends.includes(friend.id)}
                    onChange={() => handleFriendToggle(friend.id)}
                    className="rounded border-purple-300 text-purple-600 focus:ring-purple-500 mr-4"
                  />
                  <span className="text-2xl mr-3">{friend.avatar}</span>
                  <div>
                    <p className="font-bold text-gray-900">{friend.name}</p>
                    <p className="text-sm text-purple-600">{friend.nickname}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Параметры встречи */}
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-3">
                ⏱️ Сколько времени нужно?
              </label>
              <select
                value={eventDuration}
                onChange={(e) => setEventDuration(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              >
                <option value={1}>1 час (быстрая встреча)</option>
                <option value={2}>2 часа (стандартная тусовка)</option>
                <option value={3}>3 часа (основательно повеселиться)</option>
                <option value={4}>4 часа (целое приключение!)</option>
                <option value={6}>6 часов (эпичный день)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">
                  🌅 Не раньше чем
                </label>
                <input
                  type="time"
                  value={preferredTimeStart}
                  onChange={(e) => setPreferredTimeStart(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">
                  🌙 Не позже чем
                </label>
                <input
                  type="time"
                  value={preferredTimeEnd}
                  onChange={(e) => setPreferredTimeEnd(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-gray-700 mb-3">
                📅 Смотрим на сколько дней вперед?
              </label>
              <select
                value={daysAhead}
                onChange={(e) => setDaysAhead(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              >
                <option value={3}>3 дня (срочно нужно встретиться!)</option>
                <option value={7}>Неделя (стандартное планирование)</option>
                <option value={14}>2 недели (есть время подумать)</option>
                <option value={30}>Месяц (планируем заранее)</option>
              </select>
            </div>

            <button
              onClick={findOptimalTimes}
              disabled={selectedFriends.length === 0 || isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105 flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  Анализируем графики... 🔍
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 mr-3" />
                  Найти идеальное время! ✨
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Результаты поиска */}
      {optimalSlots.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="w-6 h-6 mr-3 text-yellow-500" />
            Идеальные варианты для встречи! 🎯
          </h3>

          <div className="grid gap-6">
            {optimalSlots.map((slot, index) => (
              <div key={index} className={`bg-gradient-to-r ${getScoreColor(slot.score)} rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-200`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">
                      {index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : '⭐'}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">
                        {slot.dayOfWeek}, {new Date(slot.date).toLocaleDateString('ru-RU')}
                      </h4>
                      <p className="opacity-90">
                        {slot.startTime} - {slot.endTime} ({eventDuration} ч.)
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold">{Math.round(slot.availabilityPercentage)}%</div>
                    <div className="text-sm opacity-90">{getScoreLabel(slot.score)}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">
                      Идут: {slot.availableFriends.length} из {slot.totalFriends}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {slot.availableFriends.map(friend => (
                      <span key={friend.id} className="text-2xl" title={friend.name}>
                        {friend.avatar}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-colors">
                    📅 Создать встречу
                  </button>
                  <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-colors">
                    💬 Обсудить с друзьями
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Пустое состояние */}
      {selectedFriends.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-12 text-center">
          <div className="text-6xl mb-6">🤔</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Выбери друзей для анализа</h3>
          <p className="text-gray-600 text-lg">
            Отметь галочками кого хочешь пригласить, и мы найдем когда все свободны!
          </p>
        </div>
      )}

      {/* Объяснение алгоритма */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          🧠 Как работает магия поиска времени?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700">
          <div>
            <p className="mb-2"><strong>1. Анализ графиков:</strong> Смотрим рабочие часы каждого друга</p>
            <p className="mb-2"><strong>2. Поиск пересечений:</strong> Находим когда все свободны</p>
          </div>
          <div>
            <p className="mb-2"><strong>3. Умный рейтинг:</strong> Учитываем выходные, вечернее время, 100% доступность</p>
            <p className="mb-2"><strong>4. Топ вариантов:</strong> Показываем лучшие слоты по рейтингу</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimalTimeFinder;