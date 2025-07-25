import React, { useState } from 'react';
import { User, Mail, Phone, Edit3, Save, X, Camera, MapPin, Calendar, Heart, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import NotificationSettings from './NotificationSettings';

const ProfilePage: React.FC = () => {
  const { employee, updateEmployee } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications'>('profile');
  const [profileData, setProfileData] = useState({
    name: employee?.name || '',
    nickname: employee?.nickname || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    bio: employee?.bio || '',
    avatar: employee?.avatar || '👤',
    location: 'Челябинск',
    joinDate: employee?.createdAt?.toDate().toLocaleDateString('ru-RU') || '',
    favoriteActivities: ['Кино', 'Кафе', 'Прогулки'],
    totalMeetings: 24,
    organizerRating: 4.8
  });

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      
      // Создаем превью
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!employee?.id) return;
    
    setLoading(true);
    try {
      // В реальном приложении здесь будет загрузка фото в Firebase Storage
      let photoUrl = profileData.avatar;
      
      if (selectedPhoto) {
        // TODO: Загрузить фото в Firebase Storage и получить URL
        console.log('Загружаем фото:', selectedPhoto);
        // photoUrl = await uploadPhotoToStorage(selectedPhoto);
      }

      await updateEmployee(employee.id, {
        name: profileData.name,
        nickname: profileData.nickname,
        phone: profileData.phone,
        bio: profileData.bio,
        avatar: photoUrl
      });
      
      setIsEditing(false);
      setSelectedPhoto(null);
      setPhotoPreview(null);
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      name: employee?.name || '',
      nickname: employee?.nickname || '',
      email: employee?.email || '',
      phone: employee?.phone || '',
      bio: employee?.bio || '',
      avatar: employee?.avatar || '👤',
      location: 'Челябинск',
      joinDate: employee?.createdAt?.toDate().toLocaleDateString('ru-RU') || '',
      favoriteActivities: ['Кино', 'Кафе', 'Прогулки'],
      totalMeetings: 24,
      organizerRating: 4.8
    });
    setIsEditing(false);
    setSelectedPhoto(null);
    setPhotoPreview(null);
  };

  const avatarOptions = ['👤', '🦸‍♂️', '🌟', '🎮', '📸', '☕', '🎭', '🎨', '🎵', '📚', '🏃‍♂️', '🧑‍💻', '👨‍🍳', '🧑‍🎓'];

  const cities = [
    'Челябинск',
    'Москва', 
    'Санкт-Петербург',
    'Екатеринбург',
    'Новосибирск',
    'Казань',
    'Нижний Новгород',
    'Красноярск',
    'Самара',
    'Уфа',
    'Ростов-на-Дону',
    'Краснодар',
    'Омск',
    'Воронеж',
    'Пермь'
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Мой профиль 👤
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Расскажи о себе больше, чтобы друзья знали с кем планируют встречи!
        </p>
      </div>

      {/* Табы */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 mb-6 sm:mb-8">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 sm:px-6 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            <User className="w-5 h-5" />
            Профиль
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 sm:px-6 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'notifications'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-purple-50'
            }`}
          >
            <Bell className="w-5 h-5" />
            Уведомления
          </button>
        </div>
      </div>

      {activeTab === 'profile' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Основная информация */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                  <User className="w-5 sm:w-6 h-5 sm:h-6 mr-3 text-purple-500" />
                  Основная информация
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2 font-medium shadow-md transform hover:scale-105"
                  >
                    <Edit3 className="w-4 h-4" />
                    Редактировать
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-all duration-200 flex items-center gap-2 font-medium shadow-md transform hover:scale-105 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      {loading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-all duration-200 flex items-center gap-2 font-medium shadow-md transform hover:scale-105"
                    >
                      <X className="w-4 h-4" />
                      Отмена
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Аватар и фото */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Превью фото"
                        className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover shadow-lg border-4 border-white"
                      />
                    ) : (
                      <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-lg">
                        {profileData.avatar}
                      </div>
                    )}
                    {isEditing && (
                      <label className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-colors cursor-pointer">
                        <Camera className="w-4 h-4 text-purple-600" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 mb-3">Выбери аватар или загрузи фото:</p>
                      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mb-3">
                        {avatarOptions.map(avatar => (
                          <button
                            key={avatar}
                            onClick={() => {
                              setProfileData(prev => ({ ...prev, avatar }));
                              setPhotoPreview(null);
                              setSelectedPhoto(null);
                            }}
                            className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg hover:scale-110 transition-all duration-200 ${
                              profileData.avatar === avatar && !photoPreview
                                ? 'border-purple-500 bg-purple-50' 
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            {avatar}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        💡 Можешь выбрать эмодзи-аватар или загрузить свою фотографию
                      </p>
                    </div>
                  )}
                </div>

                {/* Поля формы */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                        placeholder="Как тебя зовут?"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                        {profileData.name || 'Не указано'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Никнейм
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="nickname"
                        value={profileData.nickname}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                        placeholder="Как тебя называют друзья?"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                        {profileData.nickname || 'Не указано'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-2" />
                      {profileData.email}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email нельзя изменить</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                        placeholder="+7 (999) 123-45-67"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center">
                        <Phone className="w-5 h-5 text-gray-400 mr-2" />
                        {profileData.phone || 'Не указано'}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Город
                    </label>
                    {isEditing ? (
                      <select
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                      >
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                        {profileData.location}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    О себе
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Расскажи немного о себе, своих интересах и хобби..."
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 min-h-[100px]">
                      {profileData.bio || 'Пока ничего не рассказал о себе...'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Боковая панель со статистикой */}
          <div className="space-y-6">
            {/* Статистика */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-pink-500" />
                Моя активность
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-purple-500 mr-2" />
                    <span className="text-gray-700">Встреч посетил</span>
                  </div>
                  <span className="font-bold text-purple-600">{profileData.totalMeetings}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-pink-50 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">⭐</span>
                    <span className="text-gray-700">Рейтинг организатора</span>
                  </div>
                  <span className="font-bold text-pink-600">{profileData.organizerRating}/5</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-orange-500 mr-2" />
                    <span className="text-gray-700">Город</span>
                  </div>
                  <span className="font-bold text-orange-600">{profileData.location}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">📅</span>
                    <span className="text-gray-700">В группе с</span>
                  </div>
                  <span className="font-bold text-green-600">{profileData.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Любимые активности */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                🎯 Любимые активности
              </h3>
              
              <div className="space-y-2">
                {profileData.favoriteActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <span className="text-gray-700 font-medium">{activity}</span>
                    <span className="text-2xl">
                      {activity === 'Кино' ? '🎬' : 
                       activity === 'Кафе' ? '☕' : 
                       activity === 'Прогулки' ? '🌳' : '🎉'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Достижения */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                🏆 Достижения
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                  <span className="text-2xl mr-3">🎉</span>
                  <div>
                    <p className="font-bold text-yellow-800">Активный участник</p>
                    <p className="text-sm text-yellow-600">Посетил 20+ встреч</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <span className="text-2xl mr-3">🌟</span>
                  <div>
                    <p className="font-bold text-blue-800">Организатор</p>
                    <p className="text-sm text-blue-600">Создал 5+ мероприятий</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 rounded-xl border border-green-200">
                  <span className="text-2xl mr-3">💫</span>
                  <div>
                    <p className="font-bold text-green-800">Надежный друг</p>
                    <p className="text-sm text-green-600">95% посещаемость</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotificationSettings />
      )}

      {/* Последние активности - только для вкладки профиля */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            📝 Последние активности
          </h3>
          
          <div className="space-y-4">
            {[
              { action: 'Посетил встречу "Кино в IMAX"', time: '2 дня назад', icon: '🎬' },
              { action: 'Обновил свой график работы', time: '5 дней назад', icon: '⏰' },
              { action: 'Организовал встречу "Кафе у метро"', time: '1 неделю назад', icon: '☕' },
              { action: 'Присоединился к группе', time: '2 недели назад', icon: '🎉' }
            ].map((activity, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 gap-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">{activity.icon}</span>
                  <span className="font-medium text-gray-900">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500 sm:text-right">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;