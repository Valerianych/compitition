// Telegram Bot Service для отправки уведомлений
const BOT_TOKEN = '7663925781:AAEqt25BVaBKc_IdyyFgNRdom4on2WbZ-jo';
const BOT_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export interface TelegramUser {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
}

export interface NotificationData {
  type: 'new_event' | 'event_update' | 'event_reminder' | 'event_cancelled' | 'optimal_time' | 'friend_joined';
  title: string;
  message: string;
  eventId?: string;
  eventTitle?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
}

class TelegramBotService {
  private static instance: TelegramBotService;

  public static getInstance(): TelegramBotService {
    if (!TelegramBotService.instance) {
      TelegramBotService.instance = new TelegramBotService();
    }
    return TelegramBotService.instance;
  }

  // Отправка сообщения пользователю
  async sendMessage(chatId: number, text: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<boolean> {
    try {
      const response = await fetch(`${BOT_API_URL}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: parseMode,
          disable_web_page_preview: true
        })
      });

      const result = await response.json();
      return result.ok;
    } catch (error) {
      console.error('Ошибка отправки сообщения в Telegram:', error);
      return false;
    }
  }

  // Получение информации о пользователе по username
  async getUserByUsername(username: string): Promise<TelegramUser | null> {
    try {
      // Telegram Bot API не позволяет искать пользователей по username напрямую
      // Пользователь должен сначала написать боту /start
      // Возвращаем null, чтобы показать что нужно написать боту
      return null;
    } catch (error) {
      console.error('Ошибка получения пользователя:', error);
      return null;
    }
  }

  // Отправка уведомления о новом мероприятии
  async sendEventNotification(chatId: number, data: NotificationData): Promise<boolean> {
    const emoji = this.getNotificationEmoji(data.type);
    let message = '';

    switch (data.type) {
      case 'new_event':
        message = `${emoji} <b>Новое мероприятие!</b>\n\n` +
                 `🎉 <b>${data.eventTitle}</b>\n` +
                 `📅 ${data.eventDate} в ${data.eventTime}\n` +
                 `📍 ${data.eventLocation}\n\n` +
                 `${data.message}\n\n` +
                 `Не забудь подтвердить участие в приложении! 👍`;
        break;

      case 'event_update':
        message = `${emoji} <b>Изменения в мероприятии</b>\n\n` +
                 `📝 <b>${data.eventTitle}</b>\n` +
                 `${data.message}\n\n` +
                 `Проверь обновленную информацию в приложении! 📱`;
        break;

      case 'event_reminder':
        message = `${emoji} <b>Напоминание о встрече</b>\n\n` +
                 `⏰ <b>${data.eventTitle}</b>\n` +
                 `📅 ${data.eventDate} в ${data.eventTime}\n` +
                 `📍 ${data.eventLocation}\n\n` +
                 `${data.message} 🎯`;
        break;

      case 'event_cancelled':
        message = `${emoji} <b>Мероприятие отменено</b>\n\n` +
                 `❌ <b>${data.eventTitle}</b>\n` +
                 `${data.message}\n\n` +
                 `Не расстраивайся, скоро будет что-то новое! 😊`;
        break;

      case 'optimal_time':
        message = `${emoji} <b>Найдено идеальное время!</b>\n\n` +
                 `🎯 ${data.message}\n\n` +
                 `Проверь результаты в разделе "Поиск времени"! ⚡`;
        break;

      case 'friend_joined':
        message = `${emoji} <b>Новый участник в группе!</b>\n\n` +
                 `👋 ${data.message}\n\n` +
                 `Поприветствуй нового друга! 🤗`;
        break;

      default:
        message = `${emoji} ${data.title}\n\n${data.message}`;
    }

    return await this.sendMessage(chatId, message);
  }

  // Отправка тестового сообщения
  async sendTestMessage(chatId: number): Promise<boolean> {
    const message = `🧪 <b>Тестовое уведомление</b>\n\n` +
                   `✅ Отлично! Уведомления настроены правильно.\n\n` +
                   `Теперь ты будешь получать сообщения о:\n` +
                   `🎉 Новых мероприятиях\n` +
                   `📝 Изменениях в планах\n` +
                   `⏰ Напоминаниях о встречах\n` +
                   `🎯 Найденном оптимальном времени\n\n` +
                   `Добро пожаловать в систему уведомлений! 🚀`;

    return await this.sendMessage(chatId, message);
  }

  // Получение эмодзи для типа уведомления
  private getNotificationEmoji(type: string): string {
    const emojiMap: { [key: string]: string } = {
      'new_event': '🎉',
      'event_update': '📝',
      'event_reminder': '⏰',
      'event_cancelled': '❌',
      'optimal_time': '🎯',
      'friend_joined': '👋'
    };
    return emojiMap[type] || '📢';
  }

  // Установка webhook (для продакшена)
  async setWebhook(webhookUrl: string): Promise<boolean> {
    try {
      const response = await fetch(`${BOT_API_URL}/setWebhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: webhookUrl
        })
      });

      const result = await response.json();
      return result.ok;
    } catch (error) {
      console.error('Ошибка установки webhook:', error);
      return false;
    }
  }

  // Получение информации о боте
  async getBotInfo(): Promise<any> {
    try {
      const response = await fetch(`${BOT_API_URL}/getMe`);
      const result = await response.json();
      return result.ok ? result.result : null;
    } catch (error) {
      console.error('Ошибка получения информации о боте:', error);
      return null;
    }
  }
}

export default TelegramBotService;