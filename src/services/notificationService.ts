import TelegramBotService, { NotificationData } from './telegramBot';

export interface UserNotificationSettings {
  vkId?: string;
  telegramChatId?: number;
  telegramUsername?: string;
  notificationTypes: {
    newEvent: boolean;
    eventUpdate: boolean;
    eventReminder: boolean;
    eventCancelled: boolean;
    friendJoined: boolean;
    optimalTimeFound: boolean;
  };
}

class NotificationService {
  private static instance: NotificationService;
  private telegramBot: TelegramBotService;

  private constructor() {
    this.telegramBot = TelegramBotService.getInstance();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Отправка уведомления пользователю
  async sendNotification(
    userId: string, 
    notificationData: NotificationData,
    userSettings: UserNotificationSettings
  ): Promise<{ telegram: boolean; vk: boolean }> {
    const results = { telegram: false, vk: false };

    // Проверяем, включен ли этот тип уведомлений
    const notificationTypeKey = this.getNotificationTypeKey(notificationData.type);
    if (!userSettings.notificationTypes[notificationTypeKey]) {
      return results;
    }

    // Отправка в Telegram
    if (userSettings.telegramChatId) {
      try {
        results.telegram = await this.telegramBot.sendEventNotification(
          userSettings.telegramChatId,
          notificationData
        );
      } catch (error) {
        console.error('Ошибка отправки в Telegram:', error);
      }
    }

    // Отправка в VK (заглушка - нужно будет реализовать VK API)
    if (userSettings.vkId) {
      try {
        results.vk = await this.sendVKNotification(userSettings.vkId, notificationData);
      } catch (error) {
        console.error('Ошибка отправки в VK:', error);
      }
    }

    return results;
  }

  // Отправка уведомлений всем участникам группы
  async sendGroupNotification(
    notificationData: NotificationData,
    excludeUserId?: string
  ): Promise<void> {
    // Здесь нужно получить всех пользователей из базы данных
    // и отправить уведомления каждому
    console.log('Отправка группового уведомления:', notificationData);
    
    // Пример реализации:
    // const users = await getAllUsers();
    // for (const user of users) {
    //   if (user.id !== excludeUserId) {
    //     await this.sendNotification(user.id, notificationData, user.notificationSettings);
    //   }
    // }
  }

  // Отправка тестового уведомления
  async sendTestNotification(userSettings: UserNotificationSettings): Promise<{ telegram: boolean; vk: boolean }> {
    const results = { telegram: false, vk: false };

    if (userSettings.telegramChatId) {
      results.telegram = await this.telegramBot.sendTestMessage(userSettings.telegramChatId);
    }

    if (userSettings.vkId) {
      results.vk = await this.sendVKTestMessage(userSettings.vkId);
    }

    return results;
  }

  // Заглушка для VK API
  private async sendVKNotification(vkId: string, data: NotificationData): Promise<boolean> {
    // Здесь будет реализация отправки через VK API
    console.log('Отправка в VK:', vkId, data);
    return true; // Заглушка
  }

  private async sendVKTestMessage(vkId: string): Promise<boolean> {
    // Здесь будет реализация тестового сообщения в VK
    console.log('Тестовое сообщение в VK:', vkId);
    return true; // Заглушка
  }

  // Преобразование типа уведомления в ключ настроек
  private getNotificationTypeKey(type: string): keyof UserNotificationSettings['notificationTypes'] {
    const typeMap: { [key: string]: keyof UserNotificationSettings['notificationTypes'] } = {
      'new_event': 'newEvent',
      'event_update': 'eventUpdate',
      'event_reminder': 'eventReminder',
      'event_cancelled': 'eventCancelled',
      'optimal_time': 'optimalTimeFound',
      'friend_joined': 'friendJoined'
    };
    return typeMap[type] || 'newEvent';
  }

  // Создание уведомлений для разных событий
  static createEventNotification(eventTitle: string, eventDate: string, eventTime: string, eventLocation: string): NotificationData {
    return {
      type: 'new_event',
      title: 'Новое мероприятие!',
      message: 'Кто-то предложил классную встречу! Не пропусти 🎉',
      eventTitle,
      eventDate,
      eventTime,
      eventLocation
    };
  }

  static createEventUpdateNotification(eventTitle: string, changes: string): NotificationData {
    return {
      type: 'event_update',
      title: 'Изменения в мероприятии',
      message: `Обновлена информация: ${changes}`,
      eventTitle
    };
  }

  static createEventReminderNotification(eventTitle: string, eventDate: string, eventTime: string, eventLocation: string, timeUntil: string): NotificationData {
    return {
      type: 'event_reminder',
      title: 'Напоминание о встрече',
      message: `Встреча через ${timeUntil}! Не забудь 😊`,
      eventTitle,
      eventDate,
      eventTime,
      eventLocation
    };
  }

  static createEventCancelledNotification(eventTitle: string, reason?: string): NotificationData {
    return {
      type: 'event_cancelled',
      title: 'Мероприятие отменено',
      message: reason || 'К сожалению, встреча отменяется',
      eventTitle
    };
  }

  static createOptimalTimeNotification(timeSlots: string): NotificationData {
    return {
      type: 'optimal_time',
      title: 'Найдено идеальное время!',
      message: `Система нашла отличные варианты для встречи: ${timeSlots}`
    };
  }

  static createFriendJoinedNotification(friendName: string): NotificationData {
    return {
      type: 'friend_joined',
      title: 'Новый участник!',
      message: `${friendName} присоединился к группе! Поприветствуем нового друга 👋`
    };
  }
}

export default NotificationService;