import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, User, Mail, Lock, UserPlus, Heart } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, {
          name,
          nickname,
          phone,
          email
        });
      }
    } catch (error: any) {
      setError(error.message || 'Что-то пошло не так 😅');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-4 shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {isLogin ? 'С возвращением!' : 'Добро пожаловать в группу! 🎉'}
          </h1>
          <p className="text-gray-600 text-lg">
            {isLogin ? 'Заходи скорее, мы тебя ждали!' : 'Присоединяйся к нашей дружной компании'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Как тебя зовут? 😊
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                    placeholder="Твое имя"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Придумай себе ник 🎭
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  placeholder="Организатор, Кофеман, Путешественник..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон (для связи в группе) 📱
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Твоя почта 📧
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="твоя@почта.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль 🔐
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Секретный пароль"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg transform hover:scale-105"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? <LogIn className="w-5 h-5 mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
                {isLogin ? 'Войти в группу! 🚀' : 'Присоединиться! 🎊'}
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors text-lg"
          >
            {isLogin ? "Еще не с нами? Присоединяйся! 😎" : 'Уже в группе? Заходи! 👋'}
          </button>
        </div>

        {!isLogin && (
          <div className="mt-6 p-4 bg-purple-50 rounded-2xl border border-purple-200">
            <p className="text-purple-700 text-sm text-center">
              💡 <strong>Важно:</strong> Регистрация только для наших друзей! Если ты здесь впервые, убедись что кто-то из группы тебя пригласил 😉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;