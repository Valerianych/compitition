import React, { useState } from 'react';
import { Bell, MessageCircle, Send, Check, X, ExternalLink, Loader } from 'lucide-react';
import TelegramBotService from '../../services/telegramBot';
import NotificationService, { UserNotificationSettings } from '../../services/notificationService';

const NotificationSettings: React.FC = () => {
  const [vkConnected, setVkConnected] = useState(false);
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [vkId, setVkId] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [telegramChatId, setTelegramChatId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [testingNotifications, setTestingNotifications] = useState(false);
  const [botInfo, setBotInfo] = useState<any>(null);
  
  const [notificationTypes, setNotificationTypes] = useState({
    newEvent: true,
    eventUpdate: true,
    eventReminder: true,
    eventCancelled: true,
    friendJoined: false,
    optimalTimeFound: true
  });

  // Получаем информацию о боте при загрузке компонента
  React.useEffect(() => {
    const fetchBotInfo = async () => {
      const telegramBot = TelegramBotService.getInstance();
      const info = await telegramBot.getBotInfo();
      setBotInfo(info);
    };
    fetchBotInfo();
  }, []);

  const handleVkConnect = () => {
    if (vkId.trim()) {
      setVkConnected(true);
      console.log('Подключение к VK:', vkId);
    }
  };

  const handleTelegramConnect = async () => {
    if (!telegramUsername.trim()) return;
    
    setIsConnecting(true);
    try {
      // В реальном приложении здесь будет проверка через базу данных
      // Пока что симулируем успешное подключение
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Симулируем получение chat_id (в реальности это будет из базы данных)
      const mockChatId = Math.floor(Math.random() * 1000000000);
      setTelegramChatId(mockChatId);
      setTelegramConnected(true);
      
      console.log('Подключение к Telegram:', telegramUsername);
    } catch (error) {
      console.error('Ошибка подключения к Telegram:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleNotificationToggle = (type: string) => {
    setNotificationTypes(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const handleTestNotifications = async () => {
    if (!telegramConnected && !vkConnected) return;
    
    setTestingNotifications(true);
    try {
      const userSettings: UserNotificationSettings = {
        vkId: vkConnected ? vkId : undefined,
        telegramChatId: telegramConnected ? telegramChatId || undefined : undefined,
        telegramUsername: telegramConnected ? telegramUsername : undefined,
        notificationTypes
      };

      const notificationService = NotificationService.getInstance();
      const results = await notificationService.sendTestNotification(userSettings);
      
      console.log('Результаты тестирования:', results);
      
      // Показываем результат пользователю
      if (results.telegram || results.vk) {
        alert('✅ Тестовые уведомления отправлены! Проверь свои сообщения.');
      } else {
        alert('❌ Не удалось отправить тестовые уведомления. Проверь настройки.');
      }
    } catch (error) {
      console.error('Ошибка тестирования уведомлений:', error);
      alert('❌ Произошла ошибка при отправке тестовых уведомлений.');
    } finally {
      setTestingNotifications(false);
    }
  };

  const getBotUsername = () => {
    return botInfo?.username || 'НашаТусовкаБот';
  };

  const getBotLink = () => {
    return `https://t.me/${getBotUsername()}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Bell className="w-6 h-6 mr-3 text-purple-500" />
        Настройка уведомлений
      </h3>

      {/* Информация о боте */}
      {botInfo && (
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-2">🤖 Информация о боте</h4>
          <p className="text-blue-700">
            <strong>Имя:</strong> {botInfo.first_name} (@{botInfo.username})
          </p>
          <p className="text-blue-600 text-sm mt-1">
            Бот готов к работе и может отправлять уведомления! 🚀
          </p>
        </div>
      )}

      {/* Подключение ВКонтакте */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">VK</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">ВКонтакте</h4>
              <p className="text-gray-600">Получай уведомления в личные сообщения</p>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            vkConnected ? 'bg-green-500' : 'bg-gray-300'
          }`}>
            {vkConnected ? <Check className="w-4 h-4 text-white" /> : <X className="w-4 h-4 text-gray-500" />}
          </div>
        </div>

        {!vkConnected ? (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                value={vkId}
                onChange={(e) => setVkId(e.target.value)}
                placeholder="Введи свой ID ВКонтакте (например: id123456789)"
                className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <button
                onClick={handleVkConnect}
                disabled={!vkId.trim()}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Подключить
              </button>
            </div>
            <div className="text-sm text-blue-700">
              💡 <strong>Как найти свой ID:</strong> Зайди в настройки ВК → Приватность → в адресной строке будет твой ID
            </div>
          </div>
        ) : (
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-green-700 font-medium">Подключено: {vkId}</span>
              </div>
              <button
                onClick={() => setVkConnected(false)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Отключить
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Подключение Telegram */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center mr-4">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">Telegram</h4>
              <p className="text-gray-600">Получай уведомления через Telegram бота</p>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
            telegramConnected ? 'bg-green-500' : 'bg-gray-300'
          }`}>
            {isConnecting ? (
              <Loader className="w-4 h-4 text-gray-500 animate-spin" />
            ) : telegramConnected ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <X className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </div>

        {!telegramConnected ? (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                placeholder="Введи свой username в Telegram (@username)"
                className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                disabled={isConnecting}
              />
              <button
                onClick={handleTelegramConnect}
                disabled={!telegramUsername.trim() || isConnecting}
                className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isConnecting ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isConnecting ? 'Подключение...' : 'Подключить'}
              </button>
            </div>
            <div className="text-sm text-blue-700">
              💡 <strong>Как подключить:</strong> 
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Найди нашего бота @{getBotUsername()} в Telegram</li>
                <li>Напиши ему команду /start</li>
                <li>Введи свой username выше и нажми "Подключить"</li>
              </ol>
              <a 
                href={getBotLink()} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-700 underline"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Открыть бота в Telegram
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-green-700 font-medium">Подключено: {telegramUsername}</span>
              </div>
              <button
                onClick={() => {
                  setTelegramConnected(false);
                  setTelegramChatId(null);
                }}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Отключить
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Типы уведомлений */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">📋 Какие уведомления получать?</h4>
        
        <div className="space-y-3">
          {[
            { key: 'newEvent', label: 'Новое мероприятие создано', emoji: '🎉', description: 'Когда кто-то предлагает новую встречу' },
            { key: 'eventUpdate', label: 'Изменения в мероприятии', emoji: '📝', description: 'Время, место или детали изменились' },
            { key: 'eventReminder', label: 'Напоминания о встрече', emoji: '⏰', description: 'За день и за час до мероприятия' },
            { key: 'eventCancelled', label: 'Отмена мероприятия', emoji: '❌', description: 'Когда встреча отменяется' },
            { key: 'optimalTimeFound', label: 'Найдено оптимальное время', emoji: '🎯', description: 'Когда система находит время для всех' },
            { key: 'friendJoined', label: 'Новый участник в группе', emoji: '👋', description: 'Когда к нам присоединяется новый друг' }
          ].map((notification) => (
            <label key={notification.key} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 cursor-pointer transition-all duration-200">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{notification.emoji}</span>
                <div>
                  <p className="font-medium text-gray-900">{notification.label}</p>
                  <p className="text-sm text-gray-600">{notification.description}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={notificationTypes[notification.key as keyof typeof notificationTypes]}
                onChange={() => handleNotificationToggle(notification.key)}
                className="rounded border-purple-300 text-purple-600 focus:ring-purple-500 w-5 h-5"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Тестовое уведомление */}
      {(vkConnected || telegramConnected) && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-purple-900">🧪 Проверить уведомления</h4>
              <p className="text-purple-700 text-sm">Отправим тестовое сообщение чтобы убедиться что все работает</p>
            </div>
            <button 
              onClick={handleTestNotifications}
              disabled={testingNotifications}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {testingNotifications ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <span>🧪</span>
              )}
              {testingNotifications ? 'Отправляем...' : 'Отправить тест'}
            </button>
          </div>
        </div>
      )}

      {/* Сохранение настроек */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg transform hover:scale-105">
          💾 Сохранить настройки
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;