/**
 * Learn Page Component
 * 
 * Purpose: Main learning page that displays the level path for current subject
 * Parent Component: App.jsx
 * 
 * Features:
 * - Shows learning header with current subject/topic
 * - Displays level path with current progress
 * - Handles level navigation and progression
 * - Clean, gamified design focused on the learning path
 */

import Learn_header from './Learn_header';
import Level_view from './Level_view';
import Profile from './Profile';

const Learn = ({ onNavigate }) => {
    // Mock data - will be replaced with JSON data later
    const mockData = {
        subject: "Physics",
        topic: "Wave Mechanics",
        currentLevel: 3,
        totalLevels: 10,
        levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };

    const handleLevelClick = (levelNumber) => {
        console.log(`Starting level ${levelNumber}`);
        // Handle level start/continue logic here
        alert(`Starting Level ${levelNumber}: Wave Mechanics`);
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
                        <button
                            onClick={handleBackClick}
                            className="text-gray-600 hover:opacity-70 transition"
                        >
                            ← Back to Dashboard
                        </button>
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
                {/* Learning Header */}
                <Learn_header
                    subject={mockData.subject}
                    topic={mockData.topic}
                    currentLevel={mockData.currentLevel}
                    totalLevels={mockData.totalLevels}
                />

                {/* Level Path */}
                <Level_view
                    levels={mockData.levels}
                    currentLevel={mockData.currentLevel}
                    onLevelClick={handleLevelClick}
                />
            </div>
        </div>
    );
};

export default Learn;