import React, { useState } from 'react';
import { Clock, Calendar, User, Save, Coffee, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ScheduleManager: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [schedule, setSchedule] = useState({
    monday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
    tuesday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
    wednesday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
    thursday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
    friday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
    saturday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
    sunday: { isWorking: false, startTime: '10:00', endTime: '22:00' }
  });

  const daysOfWeek = [
    { key: 'monday', label: 'Понедельник', emoji: '💼' },
    { key: 'tuesday', label: 'Вторник', emoji: '💼' },
    { key: 'wednesday', label: 'Среда', emoji: '💼' },
    { key: 'thursday', label: 'Четверг', emoji: '💼' },
    { key: 'friday', label: 'Пятница', emoji: '🎉' },
    { key: 'saturday', label: 'Суббота', emoji: '🌟' },
    { key: 'sunday', label: 'Воскресенье', emoji: '😴' }
  ];

  const handleScheduleChange = (day: string, field: string, value: any) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('График сохранен:', schedule);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Мой график ⏰
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Расскажи когда ты свободен, чтобы мы могли найти идеальное время для встреч!
        </p>
      </div>

      {/* Информационная карточка с ссылкой на поиск времени */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-900">Почему это важно? 🤔</h3>
              <p className="text-purple-700">
                Когда все обновят свои графики, мы сможем автоматически находить время, когда вся банда свободна! 
              </p>
            </div>
          </div>
          <Link 
            to="/optimal-time"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg transform hover:scale-105 flex items-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Найти время!
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-white rounded-xl p-4 border border-purple-200 mt-4">
          <p className="text-purple-600 font-medium">
            💡 <strong>Совет:</strong> Отмечай не только рабочие часы, но и время когда ты точно занят (спорт, учеба, семейные дела)
          </p>
        </div>
      </div>

      {/* Расписание по дням */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="mr-3">📅</span>
            Мой недельный график
          </h3>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg transform hover:scale-105"
          >
            <Save className="w-5 h-5" />
            Сохранить график
          </button>
        </div>
        
        <div className="space-y-4">
          {daysOfWeek.map((day) => {
            const daySchedule = schedule[day.key as keyof typeof schedule];
            return (
              <div key={day.key} className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-all duration-200">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3 w-40">
                    <span className="text-2xl">{day.emoji}</span>
                    <span className="font-bold text-gray-900 text-lg">{day.label}</span>
                  </div>
                  
                  <label className="flex items-center bg-purple-50 rounded-full px-4 py-2 cursor-pointer hover:bg-purple-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={!daySchedule.isWorking}
                      onChange={(e) => handleScheduleChange(day.key, 'isWorking', !e.target.checked)}
                      className="rounded border-purple-300 text-purple-600 focus:ring-purple-500 mr-3"
                    />
                    <span className="text-purple-700 font-medium">
                      {daySchedule.isWorking ? '💼 Занят работой/делами' : '🎉 Свободен для тусовок!'}
                    </span>
                  </label>
                </div>

                {daySchedule.isWorking ? (
                  <div className="flex items-center space-x-4 bg-red-50 rounded-xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600 font-medium">Занят с</span>
                      <input
                        type="time"
                        value={daySchedule.startTime}
                        onChange={(e) => handleScheduleChange(day.key, 'startTime', e.target.value)}
                        className="border border-red-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-red-600 font-medium">до</span>
                      <input
                        type="time"
                        value={daySchedule.endTime}
                        onChange={(e) => handleScheduleChange(day.key, 'endTime', e.target.value)}
                        className="border border-red-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 rounded-xl px-6 py-3">
                    <span className="text-green-700 font-bold text-lg">🎊 Весь день свободен!</span>
                    <p className="text-green-600 text-sm">Готов к приключениям</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Быстрые шаблоны */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-3 text-yellow-500" />
          Быстрые шаблоны
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => {
              const standardSchedule = {
                monday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
                tuesday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
                wednesday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
                thursday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
                friday: { isWorking: true, startTime: '09:00', endTime: '18:00' },
                saturday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
                sunday: { isWorking: false, startTime: '10:00', endTime: '22:00' }
              };
              setSchedule(standardSchedule);
            }}
            className="p-6 border-2 border-purple-200 rounded-2xl hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 text-left group transform hover:scale-105"
          >
            <div className="text-4xl mb-3">💼</div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Стандартная работа</h4>
            <p className="text-gray-600">Пн-Пт: 9:00-18:00</p>
            <p className="text-gray-600">Выходные свободны! 🎉</p>
          </button>

          <button
            onClick={() => {
              const flexibleSchedule = {
                monday: { isWorking: true, startTime: '10:00', endTime: '19:00' },
                tuesday: { isWorking: true, startTime: '10:00', endTime: '19:00' },
                wednesday: { isWorking: true, startTime: '10:00', endTime: '19:00' },
                thursday: { isWorking: true, startTime: '10:00', endTime: '19:00' },
                friday: { isWorking: true, startTime: '10:00', endTime: '19:00' },
                saturday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
                sunday: { isWorking: false, startTime: '10:00', endTime: '22:00' }
              };
              setSchedule(flexibleSchedule);
            }}
            className="p-6 border-2 border-pink-200 rounded-2xl hover:bg-pink-50 hover:border-pink-400 transition-all duration-200 text-left group transform hover:scale-105"
          >
            <div className="text-4xl mb-3">🌅</div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Гибкий график</h4>
            <p className="text-gray-600">Пн-Пт: 10:00-19:00</p>
            <p className="text-gray-600">Для сов и жаворонков 🦉</p>
          </button>

          <button
            onClick={() => {
              const freeSchedule = {
                monday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
                tuesday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
                wednesday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
                thursday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
                friday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
                saturday: { isWorking: false, startTime: '10:00', endTime: '22:00' },
                sunday: { isWorking: false, startTime: '10:00', endTime: '22:00' }
              };
              setSchedule(freeSchedule);
            }}
            className="p-6 border-2 border-green-200 rounded-2xl hover:bg-green-50 hover:border-green-400 transition-all duration-200 text-left group transform hover:scale-105"
          >
            <div className="text-4xl mb-3">🎊</div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">Полная свобода!</h4>
            <p className="text-gray-600">Всегда готов к тусовкам</p>
            <p className="text-gray-600">Студент/фрилансер 🚀</p>
          </button>
        </div>
      </div>

      {/* Мотивационная секция */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-8 text-white text-center">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-2xl font-bold mb-4">Скоро здесь будет магия! ✨</h3>
        <p className="text-purple-100 text-lg mb-6">
          Когда все друзья обновят свои графики, мы сможем автоматически находить идеальное время для встреч!
        </p>
        <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-6">
          <p className="text-purple-100 font-medium">
            💡 Представь: "Хочу в кино в пятницу" → система сразу покажет когда все свободны!
          </p>
        </div>
        <Link 
          to="/optimal-time"
          className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
        >
          <Zap className="w-6 h-6" />
          Попробовать поиск времени! 🚀
        </Link>
      </div>
    </div>
  );
};

export default ScheduleManager;