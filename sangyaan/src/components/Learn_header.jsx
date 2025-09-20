/**
 * Learn Header Component
 * 
 * Purpose: Displays the current topic and subject name at the top of the learning path
 * Parent Component: Learn.jsx
 * 
 * Features:
 * - Shows current subject name and topic
 * - Displays progress information
 * - Gamified design with icons and animations
 */

const Learn_header = ({ subject = "Physics", topic = "Wave Mechanics", currentLevel = 3, totalLevels = 10 }) => {
    return (
        <div className="text-center mb-8">
            {/* Subject Icon */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 theme-primary animate-pulse-slow">
                <span className="text-4xl">⚛️</span>
            </div>

            {/* Subject and Topic */}
            <h1 className="text-4xl font-bold theme-text mb-2">{subject}</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">{topic}</h2>

            {/* Progress Info */}
            <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 theme-card px-4 py-2 rounded-full shadow-sm">
                    <span className="text-blue-500">📍</span>
                    <span className="font-semibold">Level {currentLevel} of {totalLevels}</span>
                </div>
                <div className="flex items-center space-x-2 theme-card px-4 py-2 rounded-full shadow-sm">
                    <span className="text-green-500">✨</span>
                    <span className="font-semibold">{Math.round((currentLevel / totalLevels) * 100)}% Complete</span>
                </div>
            </div>
        </div>
    );
};

export default Learn_header;