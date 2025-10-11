import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Homepage from './components/Homepage';
import Classroom from './components/Classroom';
import Learn from './components/Learn';
import VirtualLab from './components/VirtualLab';
import Leaderboard from './components/Leaderboard';
import Events from './components/Events';
import TeacherDashboard from './components/TeacherDaashboard';
import ParentsDashboard from './components/ParentsDashboard';
import Arena from './components/Arena';
import Login from './components/Login';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('homepage');
  const { user } = useAuth();

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    // The AuthProvider now handles the user state, so we just need to re-render.
    // This function can be used for any post-login logic if needed.
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'homepage':
        return <Homepage onNavigate={navigate} />;
      case 'classroom':
        return <Classroom onNavigate={navigate} />;
      case 'learn':
        return <Learn onNavigate={navigate} />;
      case 'arena':
        return <Arena onNavigate={navigate} />;
      case 'virtuallab':
        return <VirtualLab onNavigate={navigate} />;
      case 'leaderboard':
        return <Leaderboard onNavigate={navigate} />;
      case 'events':
        return <Events onNavigate={navigate} />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'parents':
        return <ParentsDashboard />;
      default:
        return <Homepage onNavigate={navigate} />;
    }
  };

  return (
    <div className="app">
      <div className="pb-20">
        {renderPage()}
      </div>
      <nav className="fixed bottom-0 left-0 right-0 theme-card border-t border-gray-200 px-4 py-2 z-50">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-around">
            <button
              onClick={() => navigate('arena')}
              className={`flex flex-col items-center p-2 rounded-lg transition ${currentPage === 'arena' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-xl mb-1">🎮</span>
              <span className="text-xs font-medium">Arena</span>
            </button>
            <button
              onClick={() => navigate('homepage')}
              className={`flex flex-col items-center p-2 rounded-lg transition ${currentPage === 'homepage' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-xl mb-1">🏠</span>
              <span className="text-xs font-medium">Home</span>
            </button>

            <button
              onClick={() => navigate('learn')}
              className={`flex flex-col items-center p-2 rounded-lg transition ${currentPage === 'learn' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-xl mb-1">📚</span>
              <span className="text-xs font-medium">Learn</span>
            </button>

            <button
              onClick={() => navigate('virtuallab')}
              className={`flex flex-col items-center p-2 rounded-lg transition ${currentPage === 'virtuallab' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-xl mb-1">🧪</span>
              <span className="text-xs font-medium">Labs</span>
            </button>

            <button
              onClick={() => navigate('leaderboard')}
              className={`flex flex-col items-center p-2 rounded-lg transition ${currentPage === 'leaderboard' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-xl mb-1">🏆</span>
              <span className="text-xs font-medium">Ranks</span>
            </button>

            <button
              onClick={() => navigate('classroom')}
              className={`flex flex-col items-center p-2 rounded-lg transition ${currentPage === 'classroom' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-xl mb-1">🏫</span>
              <span className="text-xs font-medium">Class</span>
            </button>

            <button
              onClick={() => navigate('events')}
              className={`flex flex-col items-center p-2 rounded-lg transition ${currentPage === 'events' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-xl mb-1">📅</span>
              <span className="text-xs font-medium">Events</span>
            </button>

            <button
              onClick={() => navigate('teacher')}
              className={`flex flex-col items-center p-2 rounded-lg transition ${currentPage === 'teacher' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-xl mb-1">👨‍🏫</span>
              <span className="text-xs font-medium">Teacher</span>
            </button>

            <button
              onClick={() => navigate('parents')}
              className={`flex flex-col items-center p-2 rounded-lg transition ${currentPage === 'parents' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-xl mb-1">👨‍👩‍👧‍👦</span>
              <span className="text-xs font-medium">Parents</span>
            </button>
          </div>
        </div>
      </nav>
      <div className="h-20"></div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;