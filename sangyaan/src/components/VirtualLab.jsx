/**
 * Virtual Lab Page Component
 * 
 * Purpose: Main virtual lab page that displays available labs
 * Parent Component: App.jsx
 * 
 * Features:
 * - Shows single lab using Lab component
 * - Clean, focused design
 * - Handles lab interactions
 * - Gamified stats display
 */

import Lab from './Lab';
import Profile from './Profile';

const VirtualLab = ({ onNavigate }) => {
    // Mock data - single lab for now
    const mockLab = {
        title: "Wave Interference Lab",
        subject: "physics",
        duration: "45 min",
        difficulty: "intermediate",
        description: "Study wave patterns and interference phenomena using interactive simulations",
        isCompleted: false,
        rating: 3
    };

    const handleLabClick = (labData) => {
        console.log('Starting lab:', labData);
        alert(`Starting ${labData.title} - ${labData.difficulty} level`);
    };

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
                            <h1 className="text-2xl font-bold theme-text">Virtual Labs</h1>
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
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-purple-500 text-2xl">🧪</span>
                        </div>
                        <div className="text-2xl font-bold theme-text">1</div>
                        <div className="text-sm text-gray-600">Available Lab</div>
                    </div>

                    <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-green-500 text-2xl">✅</span>
                        </div>
                        <div className="text-2xl font-bold theme-text">0</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>

                    <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-yellow-500 text-2xl">⭐</span>
                        </div>
                        <div className="text-2xl font-bold theme-text">0</div>
                        <div className="text-sm text-gray-600">Total Stars</div>
                    </div>
                </div>

                {/* Featured Lab */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold theme-text mb-4">Featured Lab</h2>
                    <div className="max-w-md mx-auto">
                        <Lab
                            title={mockLab.title}
                            subject={mockLab.subject}
                            duration={mockLab.duration}
                            difficulty={mockLab.difficulty}
                            description={mockLab.description}
                            isCompleted={mockLab.isCompleted}
                            rating={mockLab.rating}
                            onLabClick={handleLabClick}
                        />
                    </div>
                </div>

                {/* Lab Categories */}
                <div className="theme-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold theme-text mb-4">Lab Categories</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-500 text-xl">⚛️</span>
                            </div>
                            <div>
                                <h4 className="font-semibold theme-text">Physics Labs</h4>
                                <p className="text-sm text-gray-600">1 experiment available</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl opacity-50">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-400 text-xl">🧪</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-400">Chemistry Labs</h4>
                                <p className="text-sm text-gray-400">Coming soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualLab;