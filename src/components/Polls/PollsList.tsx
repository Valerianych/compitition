import React, { useState } from 'react';
import { Vote, Users, Clock, BarChart3, Plus, Eye, MessageCircle, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Poll {
  id: string;
  title: string;
  description: string;
  category: 'place' | 'activity' | 'time' | 'other';
  organizerName: string;
  organizerAvatar: string;
  totalVotes: number;
  totalParticipants: number;
  status: 'active' | 'closed' | 'draft';
  endDate?: string;
  endTime?: string;
  createdAt: string;
  isVoted: boolean;
  topOption: string;
  multipleChoice: boolean;
}

const PollsList: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('all');

  // Моковые данные опросов
  const polls: Poll[] = [
    {
      id: '1',
      title: 'Куда пойдем на выходных? 🎬',
      description: 'Выбираем между кино, кафе и прогулкой по парку. Что больше нравится?',
      category: 'place',
      organizerName: 'Алекс',
      organizerAvatar: '🦸‍♂️',
      totalVotes: 12,
      totalParticipants: 8,
      status: 'active',
      endDate: '2024-12-20',
      endTime: '18:00',
      createdAt: '2024-12-15',
      isVoted: true,
      topOption: 'Новый кинотеатр в ТЦ Галерея',
      multipleChoice: false
    },
    {
      id: '2',
      title: 'Время для настольных игр 🎲',
      description: 'Макс предлагает несколько вариантов времени для игрового вечера у него дома',
      category: 'time',
      organizerName: 'Макс',
      organizerAvatar: '🎮',
      totalVotes: 8,
      totalParticipants: 6,
      status: 'active',
      endDate: '2024-12-18',
      endTime: '20:00',
      createdAt: '2024-12-14',
      isVoted: false,
      topOption: 'Суббота 19:00',
      multipleChoice: true
    },
    {
      id: '3',
      title: 'Новогодняя вечеринка - где отмечаем? 🎉',
      description: 'Выбираем место для новогоднего празднования. Рассматриваем разные варианты!',
      category: 'place',
      organizerName: 'Лена',
      organizerAvatar: '🌟',
      totalVotes: 15,
      totalParticipants: 8,
      status: 'closed',
      endDate: '2024-12-10',
      endTime: '23:59',
      createdAt: '2024-12-05',
      isVoted: true,
      topOption: 'Ресторан "Панорама"',
      multipleChoice: true
    },
    {
      id: '4',
      title: 'Активности на свежем воздухе ⛷️',
      description: 'Зимние развлечения: каток, лыжи или просто прогулка по зимнему парку?',
      category: 'activity',
      organizerName: 'Саша',
      organizerAvatar: '📸',
      totalVotes: 6,
      totalParticipants: 7,
      status: 'active',
      endDate: '2024-12-22',
      endTime: '12:00',
      createdAt: '2024-12-13',
      isVoted: false,
      topOption: 'Каток в Сокольниках',
      multipleChoice: true
    }
  ];

  const filteredPolls = polls.filter(poll => {
    if (filter === 'all') return true;
    return poll.status === filter;
  });

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      'place': '📍',
      'activity': '🎯',
      'time': '⏰',
      'other': '❓'
    };
    return emojiMap[category] || '📊';
  };

  const getCategoryName = (category: string) => {
    const nameMap: { [key: string]: string } = {
      'place': 'Место',
      'activity': 'Активность',
      'time': 'Время',
      'other': 'Другое'
    };
    return nameMap[category] || 'Опрос';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'closed': return 'bg-gray-500 text-white';
      case 'draft': return 'bg-orange-500 text-white';
      default: return 'bg-purple-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'closed': return 'Завершен';
      case 'draft': return 'Черновик';
      default: return 'Неизвестно';
    }
  };

  const isExpiringSoon = (endDate?: string, endTime?: string) => {
    if (!endDate || !endTime) return false;
    const endDateTime = new Date(`${endDate} ${endTime}`);
    const now = new Date();
    const hoursUntilEnd = (endDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntilEnd <= 24 && hoursUntilEnd > 0;
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Опросы группы 📊
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Голосуем за места, время и активности перед созданием мероприятий!
        </p>
      </div>

      {/* Статистика и фильтры */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{polls.filter(p => p.status === 'active').length}</p>
              <p className="text-gray-600">Активных опросов</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{polls.reduce((sum, p) => sum + p.totalVotes, 0)}</p>
              <p className="text-gray-600">Всего голосов</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">{polls.filter(p => p.isVoted).length}</p>
              <p className="text-gray-600">Я проголосовал</p>
            </div>
          </div>

          <Link 
            to="/create-poll"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg transform hover:scale-105 flex items-center gap-2 justify-center"
          >
            <Plus className="w-5 h-5" />
            Создать опрос
          </Link>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'Все опросы', count: polls.length },
            { key: 'active', label: 'Активные', count: polls.filter(p => p.status === 'active').length },
            { key: 'closed', label: 'Завершенные', count: polls.filter(p => p.status === 'closed').length }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filter === filterOption.key
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>
      </div>

      {/* Список опросов */}
      <div className="grid gap-6">
        {filteredPolls.map((poll) => (
          <div key={poll.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl sm:text-3xl">{getCategoryEmoji(poll.category)}</span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{poll.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <span className="text-lg mr-1">{poll.organizerAvatar}</span>
                          {poll.organizerName}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(poll.status)}`}>
                          {getStatusText(poll.status)}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {getCategoryName(poll.category)}
                        </span>
                        {poll.multipleChoice && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            Множественный выбор
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-base sm:text-lg mb-4">{poll.description}</p>
                  
                  {/* Статистика опроса */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                    <div className="flex items-center text-gray-600 bg-purple-50 rounded-lg p-3">
                      <Vote className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-purple-500" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">Голосов</p>
                        <p className="font-bold text-base sm:text-lg">{poll.totalVotes}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 bg-pink-50 rounded-lg p-3">
                      <Users className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-pink-500" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">Участников</p>
                        <p className="font-bold text-base sm:text-lg">{poll.totalParticipants}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 bg-orange-50 rounded-lg p-3">
                      <Clock className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-orange-500" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">До окончания</p>
                        <p className="font-bold text-xs sm:text-sm">
                          {poll.status === 'active' && poll.endDate 
                            ? `${poll.endDate} ${poll.endTime}`
                            : poll.status === 'closed' ? 'Завершен' : 'Без ограничений'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Лидирующий вариант */}
                  {poll.topOption && (
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-4">
                      <div className="flex items-center">
                        <BarChart3 className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-800">Лидирует:</span>
                        <span className="ml-2 font-bold text-green-900">{poll.topOption}</span>
                      </div>
                    </div>
                  )}

                  {/* Предупреждение о скором окончании */}
                  {isExpiringSoon(poll.endDate, poll.endTime) && poll.status === 'active' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
                      <div className="flex items-center text-yellow-800">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="font-medium">⏰ Опрос скоро завершится! Успей проголосовать</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="lg:ml-6 space-y-3 lg:min-w-[200px]">
                  {poll.isVoted && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
                      <p className="text-green-700 font-medium text-sm">Проголосовал</p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Link 
                      to={`/polls/${poll.id}`}
                      className="block w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl text-sm transition-all duration-200 font-medium shadow-md transform hover:scale-105 text-center"
                    >
                      {poll.isVoted ? (
                        <>
                          <Eye className="w-4 h-4 inline mr-2" />
                          Посмотреть результаты
                        </>
                      ) : (
                        <>
                          <Vote className="w-4 h-4 inline mr-2" />
                          Проголосовать
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Прогресс участия */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Участие в опросе</span>
                  <span className="font-bold">{Math.round((poll.totalVotes / (poll.totalParticipants * 1.5)) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((poll.totalVotes / (poll.totalParticipants * 1.5)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPolls.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-12 text-center">
          <div className="text-4xl sm:text-6xl mb-6">🗳️</div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            {filter === 'all' ? 'Пока нет опросов' : `Нет ${filter === 'active' ? 'активных' : 'завершенных'} опросов`}
          </h3>
          <p className="text-gray-600 text-base sm:text-lg mb-6">
            {filter === 'all' 
              ? 'Создай первый опрос чтобы узнать мнение группы!' 
              : 'Попробуй изменить фильтр или создай новый опрос'
            }
          </p>
          <Link 
            to="/create-poll"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 font-medium shadow-lg transform hover:scale-105 inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Создать первый опрос!
          </Link>
        </div>
      )}

      {/* Мотивационная секция */}
      <div className="bg-purple-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white text-center">
        <div className="text-4xl sm:text-6xl mb-4">🗳️</div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Вместе решаем лучше!</h3>
        <p className="text-purple-100 text-base sm:text-lg mb-6">
          Опросы помогают нам учесть мнение каждого и выбрать то, что понравится всем. 
          Демократия в действии! 🎯
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <p className="text-2xl font-bold">{polls.length}</p>
            <p className="text-purple-100">Всего опросов</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <p className="text-2xl font-bold">{polls.reduce((sum, p) => sum + p.totalVotes, 0)}</p>
            <p className="text-purple-100">Голосов подано</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <p className="text-2xl font-bold">100%</p>
            <p className="text-purple-100">Учтенных мнений</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollsList;