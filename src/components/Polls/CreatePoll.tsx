import React, { useState } from 'react';
import { Plus, X, Camera, ExternalLink, DollarSign, MapPin, Clock, Users, Save } from 'lucide-react';

interface PollOption {
  id: string;
  title: string;
  description: string;
  photos: File[];
  link: string;
  price: string;
  address: string;
  pros: string[];
  cons: string[];
  additionalInfo: string;
}

const CreatePoll: React.FC = () => {
  const [pollData, setPollData] = useState({
    title: '',
    description: '',
    category: 'place' as 'place' | 'activity' | 'time' | 'other',
    multipleChoice: false,
    anonymous: false,
    showResults: true,
    hasEndDate: false,
    endDate: '',
    endTime: ''
  });

  const [options, setOptions] = useState<PollOption[]>([
    {
      id: '1',
      title: '',
      description: '',
      photos: [],
      link: '',
      price: '',
      address: '',
      pros: [''],
      cons: [''],
      additionalInfo: ''
    }
  ]);

  const [currentStep, setCurrentStep] = useState(1);

  const handlePollDataChange = (field: string, value: any) => {
    setPollData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOptionChange = (optionId: string, field: string, value: any) => {
    setOptions(prev => prev.map(option => 
      option.id === optionId 
        ? { ...option, [field]: value }
        : option
    ));
  };

  const addOption = () => {
    const newOption: PollOption = {
      id: Date.now().toString(),
      title: '',
      description: '',
      photos: [],
      link: '',
      price: '',
      address: '',
      pros: [''],
      cons: [''],
      additionalInfo: ''
    };
    setOptions(prev => [...prev, newOption]);
  };

  const removeOption = (optionId: string) => {
    if (options.length > 1) {
      setOptions(prev => prev.filter(option => option.id !== optionId));
    }
  };

  const addProCon = (optionId: string, type: 'pros' | 'cons') => {
    setOptions(prev => prev.map(option => 
      option.id === optionId 
        ? { ...option, [type]: [...option[type], ''] }
        : option
    ));
  };

  const updateProCon = (optionId: string, type: 'pros' | 'cons', index: number, value: string) => {
    setOptions(prev => prev.map(option => 
      option.id === optionId 
        ? { 
            ...option, 
            [type]: option[type].map((item, i) => i === index ? value : item)
          }
        : option
    ));
  };

  const removeProCon = (optionId: string, type: 'pros' | 'cons', index: number) => {
    setOptions(prev => prev.map(option => 
      option.id === optionId 
        ? { 
            ...option, 
            [type]: option[type].filter((_, i) => i !== index)
          }
        : option
    ));
  };

  const handlePhotoUpload = (optionId: string, files: FileList | null) => {
    if (files) {
      setOptions(prev => prev.map(option => 
        option.id === optionId 
          ? { ...option, photos: Array.from(files) }
          : option
      ));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Создание опроса:', { pollData, options });
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      'place': '📍',
      'activity': '🎯',
      'time': '⏰',
      'other': '❓'
    };
    return emojiMap[category] || '📊';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <span className="text-3xl">🗳️</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Создать опрос! 📊</h2>
              <p className="text-purple-100 text-lg">Узнай мнение группы перед планированием мероприятия</p>
            </div>
          </div>
          
          {/* Индикатор прогресса */}
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step ? 'bg-white text-purple-600' : 'bg-white bg-opacity-30 text-white'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    currentStep > step ? 'bg-white' : 'bg-white bg-opacity-30'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-purple-100">
            {currentStep === 1 && 'Основная информация'}
            {currentStep === 2 && 'Варианты для голосования'}
            {currentStep === 3 && 'Настройки и публикация'}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Шаг 1: Основная информация */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">
                  🎯 О чем будем голосовать?
                </label>
                <input
                  type="text"
                  value={pollData.title}
                  onChange={(e) => handlePollDataChange('title', e.target.value)}
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Например: Куда пойдем на выходных? или Выбираем время для встречи"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">
                  📝 Подробное описание
                </label>
                <textarea
                  value={pollData.description}
                  onChange={(e) => handlePollDataChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-none text-lg"
                  placeholder="Расскажи подробнее о том, что выбираем и почему это важно..."
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-gray-700 mb-3">
                  🏷️ Тип опроса
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { key: 'place', label: 'Место', emoji: '📍', desc: 'Кафе, парки, кинотеатры' },
                    { key: 'activity', label: 'Активность', emoji: '🎯', desc: 'Что будем делать' },
                    { key: 'time', label: 'Время', emoji: '⏰', desc: 'Когда встречаемся' },
                    { key: 'other', label: 'Другое', emoji: '❓', desc: 'Любой другой вопрос' }
                  ].map((category) => (
                    <button
                      key={category.key}
                      type="button"
                      onClick={() => handlePollDataChange('category', category.key)}
                      className={`p-4 border-2 rounded-xl transition-all duration-200 text-left ${
                        pollData.category === category.key
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{category.emoji}</div>
                      <div className="font-bold text-gray-900">{category.label}</div>
                      <div className="text-sm text-gray-600">{category.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Шаг 2: Варианты */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {getCategoryEmoji(pollData.category)} Добавь варианты для голосования
                </h3>
                <p className="text-gray-600">Чем подробнее опишешь каждый вариант, тем легче будет выбрать!</p>
              </div>

              {options.map((option, index) => (
                <div key={option.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold text-purple-900">
                      Вариант {index + 1}
                    </h4>
                    {options.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeOption(option.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Название варианта *
                        </label>
                        <input
                          type="text"
                          value={option.title}
                          onChange={(e) => handleOptionChange(option.id, 'title', e.target.value)}
                          className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                          placeholder="Например: Кинотеатр Галерея или Суббота 19:00"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Описание
                        </label>
                        <textarea
                          value={option.description}
                          onChange={(e) => handleOptionChange(option.id, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                          placeholder="Подробности о варианте..."
                        />
                      </div>

                      {pollData.category === 'place' && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <MapPin className="w-4 h-4 inline mr-1" />
                              Адрес
                            </label>
                            <input
                              type="text"
                              value={option.address}
                              onChange={(e) => handleOptionChange(option.id, 'address', e.target.value)}
                              className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                              placeholder="Адрес места"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <DollarSign className="w-4 h-4 inline mr-1" />
                              Примерная стоимость
                            </label>
                            <input
                              type="text"
                              value={option.price}
                              onChange={(e) => handleOptionChange(option.id, 'price', e.target.value)}
                              className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                              placeholder="500₽ или Бесплатно"
                            />
                          </div>
                        </>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <ExternalLink className="w-4 h-4 inline mr-1" />
                          Ссылка (если есть)
                        </label>
                        <input
                          type="url"
                          value={option.link}
                          onChange={(e) => handleOptionChange(option.id, 'link', e.target.value)}
                          className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Фото */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Camera className="w-4 h-4 inline mr-1" />
                          Фотографии
                        </label>
                        <div className="border-2 border-dashed border-purple-300 rounded-xl p-4 text-center hover:border-purple-400 transition-colors">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(option.id, e.target.files)}
                            className="hidden"
                            id={`photos-${option.id}`}
                          />
                          <label htmlFor={`photos-${option.id}`} className="cursor-pointer">
                            <Camera className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                            <p className="text-purple-600 font-medium">Добавить фото</p>
                            <p className="text-sm text-gray-500">Покажи как выглядит место или активность</p>
                          </label>
                          {option.photos.length > 0 && (
                            <p className="text-purple-600 font-medium mt-2">
                              📸 Выбрано: {option.photos.length} фото
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Плюсы */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ✅ Плюсы
                        </label>
                        {option.pros.map((pro, proIndex) => (
                          <div key={proIndex} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={pro}
                              onChange={(e) => updateProCon(option.id, 'pros', proIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
                              placeholder="Что хорошего в этом варианте?"
                            />
                            {option.pros.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeProCon(option.id, 'pros', proIndex)}
                                className="text-red-500 hover:text-red-700 p-2"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addProCon(option.id, 'pros')}
                          className="text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          + Добавить плюс
                        </button>
                      </div>

                      {/* Минусы */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ❌ Минусы
                        </label>
                        {option.cons.map((con, conIndex) => (
                          <div key={conIndex} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={con}
                              onChange={(e) => updateProCon(option.id, 'cons', conIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"
                              placeholder="Возможные недостатки..."
                            />
                            {option.cons.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeProCon(option.id, 'cons', conIndex)}
                                className="text-red-500 hover:text-red-700 p-2"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addProCon(option.id, 'cons')}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          + Добавить минус
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Дополнительная информация */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      💡 Дополнительная информация
                    </label>
                    <textarea
                      value={option.additionalInfo}
                      onChange={(e) => handleOptionChange(option.id, 'additionalInfo', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                      placeholder="Любая другая полезная информация..."
                    />
                  </div>
                </div>
              ))}

              <div className="text-center">
                <button
                  type="button"
                  onClick={addOption}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 font-medium shadow-lg transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Добавить еще вариант
                </button>
              </div>
            </div>
          )}

          {/* Шаг 3: Настройки */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">⚙️ Настройки опроса</h3>
                <p className="text-gray-600">Последние штрихи перед публикацией</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 cursor-pointer transition-all duration-200">
                    <input
                      type="checkbox"
                      checked={pollData.multipleChoice}
                      onChange={(e) => handlePollDataChange('multipleChoice', e.target.checked)}
                      className="rounded border-purple-300 text-purple-600 focus:ring-purple-500 mr-4"
                    />
                    <div>
                      <p className="font-bold text-gray-900">Множественный выбор</p>
                      <p className="text-sm text-gray-600">Можно выбрать несколько вариантов</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 cursor-pointer transition-all duration-200">
                    <input
                      type="checkbox"
                      checked={pollData.anonymous}
                      onChange={(e) => handlePollDataChange('anonymous', e.target.checked)}
                      className="rounded border-purple-300 text-purple-600 focus:ring-purple-500 mr-4"
                    />
                    <div>
                      <p className="font-bold text-gray-900">Анонимное голосование</p>
                      <p className="text-sm text-gray-600">Не показывать кто как проголосовал</p>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 cursor-pointer transition-all duration-200">
                    <input
                      type="checkbox"
                      checked={pollData.showResults}
                      onChange={(e) => handlePollDataChange('showResults', e.target.checked)}
                      className="rounded border-purple-300 text-purple-600 focus:ring-purple-500 mr-4"
                    />
                    <div>
                      <p className="font-bold text-gray-900">Показывать результаты</p>
                      <p className="text-sm text-gray-600">Участники видят текущие результаты</p>
                    </div>
                  </label>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 cursor-pointer transition-all duration-200">
                    <input
                      type="checkbox"
                      checked={pollData.hasEndDate}
                      onChange={(e) => handlePollDataChange('hasEndDate', e.target.checked)}
                      className="rounded border-purple-300 text-purple-600 focus:ring-purple-500 mr-4"
                    />
                    <div>
                      <p className="font-bold text-gray-900">Ограничить время голосования</p>
                      <p className="text-sm text-gray-600">Опрос автоматически закроется</p>
                    </div>
                  </label>

                  {pollData.hasEndDate && (
                    <div className="grid grid-cols-2 gap-4 ml-12">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Дата окончания
                        </label>
                        <input
                          type="date"
                          value={pollData.endDate}
                          onChange={(e) => handlePollDataChange('endDate', e.target.value)}
                          className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Время окончания
                        </label>
                        <input
                          type="time"
                          value={pollData.endTime}
                          onChange={(e) => handlePollDataChange('endTime', e.target.value)}
                          className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Предпросмотр */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <h4 className="text-lg font-bold text-purple-900 mb-4">📋 Предпросмотр опроса</h4>
                <div className="bg-white rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{getCategoryEmoji(pollData.category)}</span>
                    <h5 className="text-xl font-bold text-gray-900">{pollData.title || 'Название опроса'}</h5>
                  </div>
                  <p className="text-gray-700 mb-4">{pollData.description || 'Описание опроса'}</p>
                  <div className="space-y-2">
                    {options.filter(opt => opt.title).map((option, index) => (
                      <div key={option.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <input 
                          type={pollData.multipleChoice ? 'checkbox' : 'radio'} 
                          name="preview" 
                          className="mr-3" 
                          disabled 
                        />
                        <span className="font-medium">{option.title}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>👥 Участников: 8 • 🗳️ Голосов: 0</p>
                    {pollData.hasEndDate && pollData.endDate && (
                      <p>⏰ До окончания: {pollData.endDate} {pollData.endTime}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Навигация */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Назад
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg transform hover:scale-105"
              >
                Далее →
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg transform hover:scale-105 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Опубликовать опрос! 🚀
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePoll;