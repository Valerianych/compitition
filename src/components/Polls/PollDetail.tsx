import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Vote, Users, Clock, BarChart3, ExternalLink, MapPin, DollarSign, CheckCircle, Eye, Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PollOption {
  id: string;
  title: string;
  description: string;
  photos: string[];
  link?: string;
  price?: string;
  address?: string;
  pros: string[];
  cons: string[];
  additionalInfo?: string;
  votes: number;
  percentage: number;
  voters: Array<{ name: string; avatar: string }>;
}

const PollDetail: React.FC = () => {
  const { pollId } = useParams();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedOptionImages, setSelectedOptionImages] = useState<string[]>([]);

  // Моковые данные опроса
  const poll = {
    id: pollId,
    title: 'Куда пойдем на выходных? 🎬',
    description: 'Выбираем между кино, кафе и прогулкой по парку. Что больше нравится всем? Учитываем бюджет и погоду!',
    category: 'place',
    organizerName: 'Алекс',
    organizerAvatar: '🦸‍♂️',
    totalVotes: 12,
    totalParticipants: 8,
    status: 'active',
    multipleChoice: true,
    anonymous: false,
    endDate: '2024-12-20',
    endTime: '18:00',
    createdAt: '2024-12-15',
    options: [
      {
        id: '1',
        title: 'Новый кинотеатр в ТЦ Галерея',
        description: 'Современный кинотеатр с IMAX залами и удобными креслами. Показывают новинки кино.',
        photos: [
          'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
          'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg'
        ],
        link: 'https://gallery-cinema.ru',
        price: '500₽ за билет',
        address: 'ТЦ Галерея, ул. Лиговский пр., 30А',
        pros: ['Новый зал', 'IMAX качество', 'Удобное расположение', 'Много новинок'],
        cons: ['Дороговато', 'Много народу в выходные'],
        additionalInfo: 'Есть скидки для студентов по четвергам',
        votes: 5,
        percentage: 42,
        voters: [
          { name: 'Алекс', avatar: '🦸‍♂️' },
          { name: 'Лена', avatar: '🌟' },
          { name: 'Саша', avatar: '📸' },
          { name: 'Катя', avatar: '☕' },
          { name: 'Дима', avatar: '🏃‍♂️' }
        ]
      },
      {
        id: '2',
        title: 'Уютное кафе "Чашка"',
        description: 'Атмосферное место с домашней выпечкой и настольными играми. Можно провести весь день.',
        photos: [
          'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
          'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg'
        ],
        link: 'https://cafe-chashka.ru',
        price: '300₽ на человека',
        address: 'ул. Рубинштейна, 15',
        pros: ['Уютная атмосфера', 'Вкусная еда', 'Настольные игры', 'Недорого'],
        cons: ['Мало места', 'Может быть шумно'],
        additionalInfo: 'По выходным живая музыка с 19:00',
        votes: 4,
        percentage: 33,
        voters: [
          { name: 'Макс', avatar: '🎮' },
          { name: 'Аня', avatar: '🎭' },
          { name: 'Влад', avatar: '🆕' }
        ]
      },
      {
        id: '3',
        title: 'Прогулка по Летнему саду',
        description: 'Красивый исторический парк в центре города. Отличное место для фотосессии и неспешной прогулки.',
        photos: [
          'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg'
        ],
        price: 'Бесплатно! 🎉',
        address: 'Летний сад, наб. Кутузова',
        pros: ['Бесплатно', 'Красивые виды', 'Свежий воздух', 'Много места для фото'],
        cons: ['Зависит от погоды', 'Зимой может быть холодно'],
        additionalInfo: 'Рядом есть кафе, если замерзнем',
        votes: 3,
        percentage: 25,
        voters: [
          { name: 'Лена', avatar: '🌟' },
          { name: 'Саша', avatar: '📸' }
        ]
      }
    ] as PollOption[]
  };

  const handleVote = () => {
    if (selectedOptions.length === 0) return;
    
    setHasVoted(true);
    console.log('Голосование:', { selectedOptions, comment });
  };

  const handleOptionSelect = (optionId: string) => {
    if (poll.multipleChoice) {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const openImageModal = (images: string[], startIndex: number) => {
    setSelectedOptionImages(images);
    setSelectedImageIndex(startIndex);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
    setSelectedOptionImages([]);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < selectedOptionImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const getTimeRemaining = () => {
    if (!poll.endDate || !poll.endTime) return null;
    
    const endDateTime = new Date(`${poll.endDate} ${poll.endTime}`);
    const now = new Date();
    const diff = endDateTime.getTime() - now.getTime();
    
    if (diff <= 0) return 'Опрос завершен';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} дн. ${hours} ч.`;
    return `${hours} ч.`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Заголовок опроса */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl sm:text-4xl">📍</span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{poll.title}</h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-600 mt-2">
                  <span className="flex items-center">
                    <span className="text-xl mr-2">{poll.organizerAvatar}</span>
                    Создал: {poll.organizerName}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Активный
                  </span>
                  {poll.multipleChoice && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      Можно выбрать несколько
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 text-base sm:text-lg mb-6">{poll.description}</p>
            
            {/* Статистика */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <p className="font-bold text-xs sm:text-sm">{getTimeRemaining()}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 bg-green-50 rounded-lg p-3">
                <BarChart3 className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 text-green-500" />
                <div>
                  <p className="text-xs sm:text-sm font-medium">Лидирует</p>
                  <p className="font-bold text-xs sm:text-sm">{poll.options[0].title.slice(0, 15)}...</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:ml-6 space-y-3">
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-purple-200 text-purple-600 rounded-xl hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 font-medium">
              <Share2 className="w-4 h-4" />
              Поделиться
            </button>
            
            <button 
              onClick={() => setShowResults(!showResults)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
            >
              <Eye className="w-4 h-4" />
              {showResults ? 'Скрыть' : 'Показать'} результаты
            </button>
          </div>
        </div>
      </div>

      {/* Варианты для голосования */}
      <div className="space-y-6">
        {poll.options.map((option, index) => (
          <div key={option.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  {!hasVoted && (
                    <div className="mt-2">
                      <input
                        type={poll.multipleChoice ? 'checkbox' : 'radio'}
                        name="poll-option"
                        checked={selectedOptions.includes(option.id)}
                        onChange={() => handleOptionSelect(option.id)}
                        className="w-5 h-5 text-purple-600 border-purple-300 focus:ring-purple-500"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                    <p className="text-gray-700 mb-4">{option.description}</p>
                    
                    {/* Детали варианта */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                      {option.price && (
                        <div className="flex items-center text-gray-600 bg-green-50 rounded-lg p-3">
                          <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                          <span className="font-medium">{option.price}</span>
                        </div>
                      )}
                      
                      {option.address && (
                        <div className="flex items-center text-gray-600 bg-blue-50 rounded-lg p-3">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="font-medium text-sm">{option.address}</span>
                        </div>
                      )}
                      
                      {option.link && (
                        <div className="flex items-center text-gray-600 bg-purple-50 rounded-lg p-3">
                          <ExternalLink className="w-4 h-4 mr-2 text-purple-500" />
                          <a href={option.link} target="_blank" rel="noopener noreferrer" className="font-medium text-purple-600 hover:text-purple-700">
                            Открыть сайт
                          </a>
                        </div>
                      )}
                    </div>
                    
                    {/* Плюсы и минусы */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {option.pros.length > 0 && (
                        <div>
                          <h4 className="font-bold text-green-800 mb-2">✅ Плюсы:</h4>
                          <ul className="space-y-1">
                            {option.pros.map((pro, proIndex) => (
                              <li key={proIndex} className="text-green-700 text-sm">• {pro}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {option.cons.length > 0 && (
                        <div>
                          <h4 className="font-bold text-red-800 mb-2">❌ Минусы:</h4>
                          <ul className="space-y-1">
                            {option.cons.map((con, conIndex) => (
                              <li key={conIndex} className="text-red-700 text-sm">• {con}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {option.additionalInfo && (
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-blue-800 text-sm">
                          <strong>💡 Дополнительно:</strong> {option.additionalInfo}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Результаты голосования */}
                {showResults && (
                  <div className="lg:ml-6 text-center lg:min-w-[120px]">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">{option.votes}</div>
                    <div className="text-sm text-gray-600 mb-2">голосов</div>
                    <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2 mb-2 mx-auto">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${option.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-bold text-gray-700">{option.percentage}%</div>
                    
                    {/* Аватары проголосовавших */}
                    {!poll.anonymous && option.voters.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-600 mb-2">Проголосовали:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {option.voters.map((voter, voterIndex) => (
                            <span 
                              key={voterIndex} 
                              className="text-lg" 
                              title={voter.name}
                            >
                              {voter.avatar}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Фотографии */}
              {option.photos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {option.photos.map((photo, photoIndex) => (
                    <img 
                      key={photoIndex}
                      src={photo} 
                      alt={`${option.title} - фото ${photoIndex + 1}`}
                      className="w-full h-48 object-cover rounded-xl border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openImageModal(option.photos, photoIndex)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Форма голосования */}
      {!hasVoted && poll.status === 'active' && (
        <div className="bg-purple-50 rounded-2xl p-4 sm:p-6 border border-purple-200">
          <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-4">🗳️ Твой голос</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              💬 Комментарий (необязательно)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
              placeholder="Поделись своим мнением или объясни выбор..."
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-purple-700">
              {selectedOptions.length === 0 
                ? 'Выбери вариант для голосования' 
                : `Выбрано: ${selectedOptions.length} ${poll.multipleChoice ? 'вариантов' : 'вариант'}`
              }
            </div>
            
            <button
              onClick={handleVote}
              disabled={selectedOptions.length === 0}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-3 rounded-xl transition-all duration-200 font-medium shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 justify-center"
            >
              <Vote className="w-5 h-5" />
              Проголосовать! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Сообщение о завершенном голосовании */}
      {hasVoted && (
        <div className="bg-green-50 rounded-2xl p-4 sm:p-6 border border-green-200 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">Спасибо за участие! 🎉</h3>
          <p className="text-green-700">
            Твой голос учтен. Результаты обновятся автоматически.
          </p>
        </div>
      )}

      {/* Модальное окно для просмотра изображений */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            {selectedOptionImages.length > 1 && selectedImageIndex > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}
            
            {selectedOptionImages.length > 1 && selectedImageIndex < selectedOptionImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}
            
            <img
              src={selectedOptionImages[selectedImageIndex]}
              alt="Увеличенное изображение"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            {selectedOptionImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {selectedImageIndex + 1} из {selectedOptionImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PollDetail;