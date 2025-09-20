import { useState } from 'react';
import Homepage from './components/Homepage';
import Classroom from './components/Classroom';
import Learn from './components/Learn';
import VirtualLab from './components/VirtualLab';
import Leaderboard from './components/Leaderboard';

function App() {
  const [currentPage, setCurrentPage] = useState('homepage');

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
      case 'virtuallab':
        return <VirtualLab onNavigate={navigate} />;
      case 'leaderboard':
        return <Leaderboard onNavigate={navigate} />;
      default:
        return <Homepage onNavigate={navigate} />;
    }
  };

  return (
    <div className="app">
      {renderPage()}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 theme-card border-t border-gray-200 px-4 py-2 z-50">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-around">
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
              <span className="text-xl mb-1">🎓</span>
              <span className="text-xs font-medium">Class</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}

export default App;
