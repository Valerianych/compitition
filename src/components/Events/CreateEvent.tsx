import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus, DollarSign, ExternalLink, Camera, MessageCircle } from 'lucide-react';

const CreateEvent: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    link: '',
    capacity: '',
    category: 'hangout',
    price: '',
    photos: [] as File[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photos: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Новое мероприятие создано:', formData);
  };

  const categoryEmojis = {
    hangout: '🎉',
    cinema: '🎬',
    cafe: '☕',
    nature: '🌳',
    home: '🏠',
    sport: '⚽',
    culture: '🎭',
    other: '✨'
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Plus className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Организовать мероприятие! 🎊</h2>
              <p className="text-purple-100 text-lg">Предложи что-то интересное для всей группы</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-lg font-bold text-gray-700 mb-3">
                  🎯 Как назовем наше мероприятие?
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Например: Поход в новое кафе или Киномарафон у Саши"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-lg font-bold text-gray-700 mb-3">
                  📝 Расскажи подробности
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none text-lg"
                  placeholder="Что будем делать? Что взять с собой? Любые детали, которые помогут друзьям понять, что их ждет!"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-lg font-bold text-gray-700 mb-3">
                  🏷️ Тип мероприятия
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-lg"
                  required
                >
                  <option value="hangout">🎉 Просто встреча</option>
                  <option value="cinema">🎬 Кино</option>
                  <option value="cafe">☕ Кафе/Ресторан</option>
                  <option value="nature">🌳 На природе</option>
                  <option value="home">🏠 Дома у кого-то</option>
                  <option value="sport">⚽ Спорт/Активности</option>
                  <option value="culture">🎭 Культурное мероприятие</option>
                  <option value="other">✨ Что-то особенное</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-lg font-bold text-gray-700 mb-3">
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Когда?
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-lg font-bold text-gray-700 mb-3">
                    <Clock className="w-5 h-5 inline mr-2" />
                    Во сколько?
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-lg font-bold text-gray-700 mb-3">
                  <MapPin className="w-5 h-5 inline mr-2" />
                  Где встречаемся?
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  placeholder="Адрес, название места или точка встречи"
                  required
                />
              </div>

              <div>
                <label htmlFor="link" className="block text-lg font-bold text-gray-700 mb-3">
                  <ExternalLink className="w-5 h-5 inline mr-2" />
                  Ссылка на место (если есть)
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  placeholder="Ссылка на сайт, карту или соцсети места"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="capacity" className="block text-lg font-bold text-gray-700 mb-3">
                <Users className="w-5 h-5 inline mr-2" />
                Сколько человек поместится?
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Максимальное количество участников"
                min="2"
                max="50"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-lg font-bold text-gray-700 mb-3">
                <DollarSign className="w-5 h-5 inline mr-2" />
                Примерная цена
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Например: 500₽ или Бесплатно! или 300₽ на еду"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="photos" className="block text-lg font-bold text-gray-700 mb-3">
              <Camera className="w-5 h-5 inline mr-2" />
              Добавь фото места (если есть)
            </label>
            <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                id="photos"
                name="photos"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <label htmlFor="photos" className="cursor-pointer">
                <Camera className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 mb-2">Нажми чтобы добавить фото</p>
                <p className="text-sm text-gray-500">Покажи друзьям как выглядит место!</p>
              </label>
              {formData.photos.length > 0 && (
                <div className="mt-4">
                  <p className="text-purple-600 font-medium">
                    📸 Выбрано фото: {formData.photos.length}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              💡 Место для отзывов и комментариев
            </h3>
            <p className="text-purple-700 mb-4">
              После встречи здесь появится возможность оставить отзыв и поделиться впечатлениями!
            </p>
            <div className="bg-white rounded-xl p-4 border border-purple-200">
              <p className="text-gray-500 italic">Отзывы появятся после проведения встречи... 🎭</p>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-200 shadow-lg transform hover:scale-105"
            >
              🎉 Создать мероприятие!
            </button>
            <button
              type="button"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;