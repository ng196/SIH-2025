import { useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Homepage from './components/Homepage';
import Classroom from './components/Classroom';
import Learn from './components/Learn';
import VirtualLab from './components/VirtualLab';
import Leaderboard from './components/Leaderboard';
import Events from './components/Events';
import TeacherDashboard from './components/TeacherDaashboard';
import ParentsDashboard from './components/ParentsDashboard';
import Arena from './components/Arena';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('homepage');
  const { t } = useLanguage();

  const navigate = (page) => {
    setCurrentPage(page);
  };

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
      {/* Main Content */}
      <div className="pb-20 md:pb-24">
        {renderPage()}
      </div>

      {/* Bottom Navigation - Sticky with horizontal scroll on mobile */}
      <nav className="fixed bottom-0 left-0 right-0 theme-card border-t border-gray-200 z-50 bg-white shadow-lg" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex justify-start md:justify-around items-center min-w-max md:min-w-0 px-2 py-2 gap-1">
            <button
              onClick={() => navigate('arena')}
              className={`flex flex-col items-center px-2 py-2 rounded-lg transition flex-shrink-0 min-w-[60px] ${currentPage === 'arena' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-lg md:text-xl mb-1">🎮</span>
              <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">Arena</span>
            </button>
            <button
              onClick={() => navigate('homepage')}
              className={`flex flex-col items-center px-2 py-2 rounded-lg transition flex-shrink-0 min-w-[60px] ${currentPage === 'homepage' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-lg md:text-xl mb-1">🏠</span>
              <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">{t('home')}</span>
            </button>

            <button
              onClick={() => navigate('learn')}
              className={`flex flex-col items-center px-2 py-2 rounded-lg transition flex-shrink-0 min-w-[60px] ${currentPage === 'learn' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-lg md:text-xl mb-1">📚</span>
              <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">{t('learn')}</span>
            </button>

            <button
              onClick={() => navigate('virtuallab')}
              className={`flex flex-col items-center px-2 py-2 rounded-lg transition flex-shrink-0 min-w-[60px] ${currentPage === 'virtuallab' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-lg md:text-xl mb-1">🧪</span>
              <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">{t('labs')}</span>
            </button>

            <button
              onClick={() => navigate('leaderboard')}
              className={`flex flex-col items-center px-2 py-2 rounded-lg transition flex-shrink-0 min-w-[60px] ${currentPage === 'leaderboard' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-lg md:text-xl mb-1">🏆</span>
              <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">{t('ranks')}</span>
            </button>

            <button
              onClick={() => navigate('classroom')}
              className={`flex flex-col items-center px-2 py-2 rounded-lg transition flex-shrink-0 min-w-[60px] ${currentPage === 'classroom' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-lg md:text-xl mb-1">🏫</span>
              <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">{t('class')}</span>
            </button>

            <button
              onClick={() => navigate('events')}
              className={`flex flex-col items-center px-2 py-2 rounded-lg transition flex-shrink-0 min-w-[60px] ${currentPage === 'events' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-lg md:text-xl mb-1">📅</span>
              <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">{t('events')}</span>
            </button>

            <button
              onClick={() => navigate('teacher')}
              className={`flex flex-col items-center px-2 py-2 rounded-lg transition flex-shrink-0 min-w-[60px] ${currentPage === 'teacher' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-lg md:text-xl mb-1">👨‍🏫</span>
              <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">Teacher</span>
            </button>

            <button
              onClick={() => navigate('parents')}
              className={`flex flex-col items-center px-2 py-2 rounded-lg transition flex-shrink-0 min-w-[60px] ${currentPage === 'parents' ? 'theme-primary text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              <span className="text-lg md:text-xl mb-1">👨‍👩‍👧‍👦</span>
              <span className="text-[10px] md:text-xs font-medium whitespace-nowrap">Parents</span>
            </button>
          </div>
        </div>
      </nav>
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
