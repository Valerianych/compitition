import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import DashboardOverview from './components/Dashboard/DashboardOverview';
import EventsList from './components/Events/EventsList';
import CreateEvent from './components/Events/CreateEvent';
import ScheduleManager from './components/Schedule/ScheduleManager';
import OptimalTimeFinder from './components/Schedule/OptimalTimeFinder';
import GroupCalendar from './components/Calendar/GroupCalendar';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import FriendsList from './components/Friends/FriendsList';
import ProfilePage from './components/Profile/ProfilePage';
import PollsList from './components/Polls/PollsList';
import CreatePoll from './components/Polls/CreatePoll';
import PollDetail from './components/Polls/PollDetail';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header onMenuToggle={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 pt-20 sm:pt-24">
          {children}
        </main>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-2xl text-purple-600 font-bold">Загружаем приложение... 🎉</p>
          <p className="text-gray-600 mt-2">Сейчас все будет готово!</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={currentUser ? <Navigate to="/" /> : <LoginForm />} 
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardOverview />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <AppLayout>
                <EventsList />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CreateEvent />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/polls"
          element={
            <ProtectedRoute>
              <AppLayout>
                <PollsList />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-poll"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CreatePoll />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/polls/:pollId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <PollDetail />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ScheduleManager />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/optimal-time"
          element={
            <ProtectedRoute>
              <AppLayout>
                <OptimalTimeFinder />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <AppLayout>
                <GroupCalendar />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <AppLayout>
                <FriendsList />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AppLayout>
                <AnalyticsDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;