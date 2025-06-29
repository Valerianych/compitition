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

export class OptimalTimeService {
  private static timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private static minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  private static getDayName(dayIndex: number): string {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[dayIndex];
  }

  private static getDayNameRu(dayIndex: number): string {
    const daysRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    return daysRu[dayIndex];
  }

  static findOptimalTimes(
    friends: Friend[],
    selectedFriendIds: string[],
    eventDuration: number,
    preferredTimeStart: string,
    preferredTimeEnd: string,
    daysAhead: number
  ): OptimalSlot[] {
    const slots: OptimalSlot[] = [];
    const selectedFriends = friends.filter(f => selectedFriendIds.includes(f.id));
    
    if (selectedFriends.length === 0) {
      return [];
    }

    const preferredStartMinutes = this.timeToMinutes(preferredTimeStart);
    const preferredEndMinutes = this.timeToMinutes(preferredTimeEnd);
    const eventDurationMinutes = eventDuration * 60;

    // Анализируем каждый день в указанном периоде
    for (let dayOffset = 0; dayOffset < daysAhead; dayOffset++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + dayOffset);
      const dayOfWeek = this.getDayName(currentDate.getDay());
      const dayOfWeekRu = this.getDayNameRu(currentDate.getDay());
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;

      // Находим общие свободные интервалы
      const freeIntervals = this.findCommonFreeIntervals(
        selectedFriends,
        dayOfWeek,
        preferredStartMinutes,
        preferredEndMinutes
      );

      // Создаем слоты для каждого интервала
      freeIntervals.forEach(interval => {
        if (interval.endTime - interval.startTime >= eventDurationMinutes) {
          const availabilityPercentage = (interval.availableFriends.length / selectedFriends.length) * 100;
          
          // Вычисляем оптимальное время начала
          let optimalStart = interval.startTime;
          let optimalEnd = Math.min(interval.endTime, optimalStart + eventDurationMinutes);
          
          // Вычисляем рейтинг слота
          let score = availabilityPercentage;
          if (isWeekend) score += 20; // Бонус за выходные
          if (availabilityPercentage === 100) score += 30; // Бонус за 100% доступность
          if (optimalStart >= this.timeToMinutes('18:00')) score += 10; // Бонус за вечернее время
          if (optimalStart >= this.timeToMinutes('19:00')) score += 5; // Дополнительный бонус за позднее время
          
          // Штраф за слишком раннее время
          if (optimalStart < this.timeToMinutes('10:00')) score -= 15;
          
          // Бонус за оптимальную продолжительность
          if (eventDuration >= 2 && eventDuration <= 4) score += 5;

          slots.push({
            date: currentDate.toISOString().split('T')[0],
            startTime: this.minutesToTime(optimalStart),
            endTime: this.minutesToTime(optimalEnd),
            availableFriends: interval.availableFriends,
            totalFriends: selectedFriends.length,
            availabilityPercentage,
            dayOfWeek: dayOfWeekRu,
            isWeekend,
            score
          });
        }
      });
    }

    // Сортируем по рейтингу и возвращаем топ-10
    return slots.sort((a, b) => b.score - a.score).slice(0, 10);
  }

  private static findCommonFreeIntervals(
    friends: Friend[],
    dayOfWeek: string,
    preferredStart: number,
    preferredEnd: number
  ): Array<{
    startTime: number;
    endTime: number;
    availableFriends: Friend[];
  }> {
    const intervals: Array<{
      startTime: number;
      endTime: number;
      availableFriends: Friend[];
    }> = [];

    // Создаем список всех временных точек
    const timePoints = new Set<number>();
    timePoints.add(preferredStart);
    timePoints.add(preferredEnd);

    friends.forEach(friend => {
      const daySchedule = friend.schedule[dayOfWeek];
      if (daySchedule && daySchedule.isWorking) {
        timePoints.add(this.timeToMinutes(daySchedule.startTime));
        timePoints.add(this.timeToMinutes(daySchedule.endTime));
      }
    });

    const sortedTimePoints = Array.from(timePoints).sort((a, b) => a - b);

    // Анализируем каждый интервал между временными точками
    for (let i = 0; i < sortedTimePoints.length - 1; i++) {
      const intervalStart = sortedTimePoints[i];
      const intervalEnd = sortedTimePoints[i + 1];

      // Проверяем, что интервал в пределах предпочитаемого времени
      if (intervalStart >= preferredStart && intervalEnd <= preferredEnd) {
        const availableFriends: Friend[] = [];

        friends.forEach(friend => {
          const daySchedule = friend.schedule[dayOfWeek];
          if (daySchedule) {
            if (!daySchedule.isWorking) {
              // Друг свободен весь день
              availableFriends.push(friend);
            } else {
              // Проверяем, свободен ли друг в этом интервале
              const workStart = this.timeToMinutes(daySchedule.startTime);
              const workEnd = this.timeToMinutes(daySchedule.endTime);
              
              if (intervalEnd <= workStart || intervalStart >= workEnd) {
                // Интервал не пересекается с рабочим временем
                availableFriends.push(friend);
              }
            }
          }
        });

        if (availableFriends.length > 0) {
          intervals.push({
            startTime: intervalStart,
            endTime: intervalEnd,
            availableFriends
          });
        }
      }
    }

    // Объединяем соседние интервалы с одинаковым составом друзей
    const mergedIntervals: Array<{
      startTime: number;
      endTime: number;
      availableFriends: Friend[];
    }> = [];

    intervals.forEach(interval => {
      const lastMerged = mergedIntervals[mergedIntervals.length - 1];
      
      if (lastMerged && 
          lastMerged.endTime === interval.startTime &&
          this.arraysEqual(
            lastMerged.availableFriends.map(f => f.id),
            interval.availableFriends.map(f => f.id)
          )) {
        // Объединяем интервалы
        lastMerged.endTime = interval.endTime;
      } else {
        mergedIntervals.push(interval);
      }
    });

    return mergedIntervals;
  }

  private static arraysEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, index) => val === sortedB[index]);
  }

  static getRecommendations(slots: OptimalSlot[]): string[] {
    const recommendations: string[] = [];

    if (slots.length === 0) {
      return ['Попробуй расширить временные рамки или выбрать меньше друзей 🤔'];
    }

    const topSlot = slots[0];
    
    if (topSlot.availabilityPercentage === 100) {
      recommendations.push('🎯 Найдено идеальное время когда все свободны!');
    } else if (topSlot.availabilityPercentage >= 80) {
      recommendations.push('⭐ Отличный вариант - большинство друзей доступно!');
    } else {
      recommendations.push('🤔 Возможно стоит рассмотреть другое время или состав группы');
    }

    const weekendSlots = slots.filter(s => s.isWeekend);
    if (weekendSlots.length > 0) {
      recommendations.push('🌟 Выходные дни показывают лучшую доступность');
    }

    const eveningSlots = slots.filter(s => 
      this.timeToMinutes(s.startTime) >= this.timeToMinutes('18:00')
    );
    if (eveningSlots.length > 0) {
      recommendations.push('🌆 Вечернее время популярно среди друзей');
    }

    return recommendations;
  }
}