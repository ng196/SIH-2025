/**
 * Leaderboard Page Component
 * 
 * Purpose: Main leaderboard page (placeholder for now)
 * Parent Component: App.jsx
 * 
 * Features:
 * - Placeholder content for leaderboard functionality
 * - Clean, gamified design
 * - Ready for future leaderboard implementation
 */

import Profile from './Profile';

const Leaderboard = ({ onNavigate }) => {
    const handleBackClick = () => {
        onNavigate('homepage');
    };

    return (
        <div className="min-h-screen transition-all duration-300" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
            {/* Header */}
            <header className="theme-card shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleBackClick}
                                className="text-gray-600 hover:opacity-70 transition"
                            >
                                ← Back to Dashboard
                            </button>
                            <h1 className="text-2xl font-bold theme-text">Leaderboard</h1>
                        </div>
                        <Profile
                            userName="Alex Johnson"
                            userLevel="Level 12 Explorer"
                            userXP={2450}
                            userStreak={7}
                            showNotification={false}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Coming Soon Message */}
                <div className="text-center py-20">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 theme-primary animate-pulse-slow">
                        <span className="text-5xl">🏆</span>
                    </div>
                    <h2 className="text-3xl font-bold theme-text mb-4">Leaderboard</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Competition rankings and achievements coming soon!
                    </p>

                    {/* Placeholder Stats */}
                    <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                        <div className="theme-card rounded-xl p-6 shadow-sm">
                            <div className="text-3xl font-bold theme-text mb-2">🥇</div>
                            <div className="text-sm text-gray-600">Your Best Rank</div>
                            <div className="text-lg font-semibold theme-text">#3</div>
                        </div>

                        <div className="theme-card rounded-xl p-6 shadow-sm">
                            <div className="text-3xl font-bold theme-text mb-2">⭐</div>
                            <div className="text-sm text-gray-600">Total XP</div>
                            <div className="text-lg font-semibold theme-text">2,450</div>
                        </div>

                        <div className="theme-card rounded-xl p-6 shadow-sm">
                            <div className="text-3xl font-bold theme-text mb-2">🏅</div>
                            <div className="text-sm text-gray-600">Achievements</div>
                            <div className="text-lg font-semibold theme-text">15</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;