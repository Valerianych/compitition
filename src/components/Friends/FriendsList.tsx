import React from 'react';
import { Users, Calendar, Heart, Star, Trophy, Coffee } from 'lucide-react';

const FriendsList: React.FC = () => {
  const friends = [
    {
      id: 1,
      name: 'Алекс',
      nickname: 'Организатор',
      avatar: '🦸‍♂️',
      email: 'alex@example.com',
      meetingsAttended: 18,
      meetingsOrganized: 8,
      favoriteActivity: 'Кино',
      joinDate: '2024-01-15',
      bio: 'Обожаю организовывать встречи! Всегда знаю где классно провести время 🎬',
      achievements: ['🎉 Активный участник', '🌟 Организатор', '🎬 Киноман']
    },
    {
      id: 2,
      name: 'Лена',
      nickname: 'Душа компании',
      avatar: '🌟',
      email: 'lena@example.com',
      meetingsAttended: 16,
      meetingsOrganized: 5,
      favoriteActivity: 'Прогулки',
      joinDate: '2024-01-20',
      bio: 'Люблю природу и активный отдых! Всегда готова к новым приключениям 🌳',
      achievements: ['🎉 Активный участник', '🌳 Любитель природы', '💫 Надежный друг']
    },
    {
      id: 3,
      name: 'Макс',
      nickname: 'Хозяин',
      avatar: '🎮',
      email: 'max@example.com',
      meetingsAttended: 15,
      meetingsOrganized: 6,
      favoriteActivity: 'Настолки',
      joinDate: '2024-01-10',
      bio: 'Мой дом - ваш дом! Обожаю настольные игры и уютные посиделки ☕',
      achievements: ['🏠 Гостеприимный хозяин', '🎲 Мастер настолок', '☕ Кофеман']
    },
    {
      id: 4,
      name: 'Саша',
      nickname: 'Фотограф',
      avatar: '📸',
      email: 'sasha@example.com',
      meetingsAttended: 14,
      meetingsOrganized: 3,
      favoriteActivity: 'Фотопрогулки',
      joinDate: '2024-02-01',
      bio: 'Ловлю моменты и создаю воспоминания! Всегда с камерой наготове 📷',
      achievements: ['📸 Фотограф группы', '🎨 Творческая душа', '🌅 Ловец моментов']
    },
    {
      id: 5,
      name: 'Катя',
      nickname: 'Кофеман',
      avatar: '☕',
      email: 'katya@example.com',
      meetingsAttended: 12,
      meetingsOrganized: 4,
      favoriteActivity: 'Кафе',
      joinDate: '2024-02-10',
      bio: 'Знаю все лучшие кофейни города! Кофе - это жизнь ☕',
      achievements: ['☕ Кофейный эксперт', '🗺️ Исследователь кафе', '😋 Гурман']
    },
    {
      id: 6,
      name: 'Дима',
      nickname: 'Спортсмен',
      avatar: '🏃‍♂️',
      email: 'dima@example.com',
      meetingsAttended: 10,
      meetingsOrganized: 2,
      favoriteActivity: 'Спорт',
      joinDate: '2024-03-01',
      bio: 'Движение - это жизнь! Предлагаю активные развлечения и спортивные мероприятия 🏃‍♂️',
      achievements: ['🏃‍♂️ Спортсмен', '💪 Мотиватор', '🎯 Целеустремленный']
    },
    {
      id: 7,
      name: 'Аня',
      nickname: 'Культурный деятель',
      avatar: '🎭',
      email: 'anya@example.com',
      meetingsAttended: 9,
      meetingsOrganized: 3,
      favoriteActivity: 'Театр',
      joinDate: '2024-03-15',
      bio: 'Обожаю театр, выставки и культурные мероприятия! Расширяем кругозор вместе 🎭',
      achievements: ['🎭 Культурный гид', '🎨 Ценитель искусства', '📚 Интеллектуал']
    },
    {
      id: 8,
      name: 'Влад',
      nickname: 'Новичок',
      avatar: '🆕',
      email: 'vlad@example.com',
      meetingsAttended: 3,
      meetingsOrganized: 1,
      favoriteActivity: 'Еще изучаю',
      joinDate: '2024-11-01',
      bio: 'Недавно присоединился к группе! Пока изучаю ваши традиции и ищу свое место 😊',
      achievements: ['🆕 Новичок', '😊 Дружелюбный', '🔍 Исследователь']
    }
  ];

  // Сортируем по количеству посещенных встреч
  const sortedFriends = [...friends].sort((a, b) => b.meetingsAttended - a.meetingsAttended);

  const getActivityEmoji = (activity: string) => {
    const emojiMap: { [key: string]: string } = {
      'Кино': '🎬',
      'Прогулки': '🌳',
      'Настолки': '🎲',
      'Фотопрогулки': '📸',
      'Кафе': '☕',
      'Спорт': '🏃‍♂️',
      'Театр': '🎭',
      'Еще изучаю': '🤔'
    };
    return emojiMap[activity] || '🎉';
  };

  const getRankEmoji = (index: number) => {
    if (index === 0) return '🏆';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '⭐';
  };

  const getParticipationLevel = (meetings: number) => {
    if (meetings >= 15) return { level: 'Суперактивный', color: 'from-green-400 to-green-600', textColor: 'text-green-800' };
    if (meetings >= 10) return { level: 'Активный', color: 'from-blue-400 to-blue-600', textColor: 'text-blue-800' };
    if (meetings >= 5) return { level: 'Участвует', color: 'from-purple-400 to-purple-600', textColor: 'text-purple-800' };
    return { level: 'Новичок', color: 'from-orange-400 to-orange-600', textColor: 'text-orange-800' };
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Участники группы 👥
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Все участники нашей дружной компании и их активность в мероприятиях
        </p>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-200">
          <div className="text-3xl mb-2">👥</div>
          <p className="text-2xl font-bold">{friends.length}</p>
          <p className="text-purple-100">Участников</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-200">
          <div className="text-3xl mb-2">🎉</div>
          <p className="text-2xl font-bold">{friends.reduce((sum, f) => sum + f.meetingsAttended, 0)}</p>
          <p className="text-pink-100">Всего посещений</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-200">
          <div className="text-3xl mb-2">✨</div>
          <p className="text-2xl font-bold">{friends.reduce((sum, f) => sum + f.meetingsOrganized, 0)}</p>
          <p className="text-orange-100">Организовано встреч</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-200">
          <div className="text-3xl mb-2">📊</div>
          <p className="text-2xl font-bold">{Math.round(friends.reduce((sum, f) => sum + f.meetingsAttended, 0) / friends.length)}</p>
          <p className="text-green-100">Среднее участие</p>
        </div>
      </div>

      {/* Топ участников */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Trophy className="w-6 h-6 mr-3 text-yellow-500" />
          🏆 Топ по активности
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedFriends.slice(0, 3).map((friend, index) => {
            const participation = getParticipationLevel(friend.meetingsAttended);
            return (
              <div key={friend.id} className={`bg-gradient-to-br ${participation.color} rounded-2xl p-6 text-white text-center transform hover:scale-105 transition-all duration-200`}>
                <div className="text-4xl mb-3">{getRankEmoji(index)}</div>
                <div className="text-6xl mb-3">{friend.avatar}</div>
                <h4 className="text-xl font-bold mb-1">{friend.name}</h4>
                <p className="text-sm opacity-90 mb-3">{friend.nickname}</p>
                <div className="bg-white bg-opacity-20 rounded-xl p-3">
                  <p className="text-2xl font-bold">{friend.meetingsAttended}</p>
                  <p className="text-sm">встреч посетил</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Список всех участников */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Users className="w-6 h-6 mr-3 text-purple-500" />
          Все участники группы
        </h3>
        
        <div className="grid gap-6">
          {sortedFriends.map((friend, index) => {
            const participation = getParticipationLevel(friend.meetingsAttended);
            return (
              <div key={friend.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-300 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-6 flex-1">
                    <div className="relative">
                      <div className="text-6xl">{friend.avatar}</div>
                      <div className="absolute -top-2 -right-2 text-2xl">
                        {getRankEmoji(index)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-2xl font-bold text-gray-900">{friend.name}</h4>
                        <span className={`px-3 py-1 bg-gradient-to-r ${participation.color} text-white rounded-full text-sm font-medium`}>
                          {participation.level}
                        </span>
                      </div>
                      
                      <p className="text-purple-600 font-medium mb-3">{friend.nickname}</p>
                      <p className="text-gray-600 text-lg mb-4 italic">"{friend.bio}"</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center text-gray-600 bg-purple-50 rounded-lg p-3">
                          <Calendar className="w-5 h-5 mr-3 text-purple-500" />
                          <div>
                            <p className="text-sm font-medium">Посетил встреч</p>
                            <p className="font-bold text-lg">{friend.meetingsAttended}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-600 bg-pink-50 rounded-lg p-3">
                          <Star className="w-5 h-5 mr-3 text-pink-500" />
                          <div>
                            <p className="text-sm font-medium">Организовал</p>
                            <p className="font-bold text-lg">{friend.meetingsOrganized}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-600 bg-orange-50 rounded-lg p-3">
                          <span className="text-xl mr-3">{getActivityEmoji(friend.favoriteActivity)}</span>
                          <div>
                            <p className="text-sm font-medium">Любимое</p>
                            <p className="font-bold">{friend.favoriteActivity}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-600 bg-green-50 rounded-lg p-3">
                          <Heart className="w-5 h-5 mr-3 text-green-500" />
                          <div>
                            <p className="text-sm font-medium">В группе с</p>
                            <p className="font-bold text-sm">{new Date(friend.joinDate).toLocaleDateString('ru-RU')}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Достижения */}
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">🏆 Достижения:</p>
                        <div className="flex flex-wrap gap-2">
                          {friend.achievements.map((achievement, achIndex) => (
                            <span key={achIndex} className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium">
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 text-center">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                      <p className="text-3xl font-bold text-purple-600">{friend.meetingsAttended}</p>
                      <p className="text-sm text-purple-600 font-medium">встреч</p>
                      <div className="mt-2 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((friend.meetingsAttended / 20) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">до 20 встреч</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Мотивационная секция */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-8 text-white text-center">
        <div className="text-6xl mb-4">🎊</div>
        <h3 className="text-2xl font-bold mb-4">Мы растем!</h3>
        <p className="text-purple-100 text-lg mb-6">
          За время существования группы мы провели {friends.reduce((sum, f) => sum + f.meetingsOrganized, 0)} мероприятий 
          и создали кучу классных воспоминаний вместе!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <p className="text-2xl font-bold">{friends.length}</p>
            <p className="text-purple-100">Участников</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-4">
            <p className="text-2xl font-bold">{friends.reduce((sum, f) => sum + f.meetingsAttended, 0)}</p>
            <p className="text-purple-100">Посещений</p>
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

export default FriendsList;