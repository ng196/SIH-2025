/**
 * Level Component
 * 
 * Purpose: Renders individual level nodes in the learning path
 * Parent Component: Level_view.jsx
 * 
 * Features:
 * - Shows level number and status (completed, current, locked)
 * - Displays level-specific styling based on state
 * - Handles level interactions (continue, start, review)
 * - Gamified animations and visual feedback
 */

const Level = ({
    levelNumber,
    isCompleted = false,
    isCurrent = false,
    isLocked = false,
    progress = 0,
    onLevelClick
}) => {

    const handleClick = () => {
        if (!isLocked && onLevelClick) {
            onLevelClick(levelNumber);
        }
    };

    const getLevelStyle = () => {
        if (isCompleted) {
            return 'theme-success';
        } else if (isCurrent) {
            return 'theme-primary animate-pulse-slow';
        } else if (isLocked) {
            return 'bg-gray-300 opacity-50';
        } else {
            return 'theme-primary';
        }
    };

    const getLevelOpacity = () => {
        if (isCurrent) return 'opacity-100';
        if (isCompleted) return 'opacity-100';
        return 'opacity-40';
    };

    return (
        <div className={`level-node ${getLevelOpacity()}`}>
            <button
                onClick={handleClick}
                disabled={isLocked}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg relative transition-all transform hover:scale-110 ${getLevelStyle()} ${!isLocked ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
            >
                {/* Level Number */}
                <span className="text-2xl md:text-3xl font-bold text-white">
                    {levelNumber}
                </span>

                {/* Completion Star */}
                {isCompleted && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-sm">⭐</span>
                    </div>
                )}

                {/* Progress Badge for Current Level */}
                {isCurrent && progress > 0 && (
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center animate-bounce">
                        <span className="text-xs text-white font-bold">{progress}%</span>
                    </div>
                )}

                {/* Lock Icon */}
                {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl md:text-3xl">🔒</span>
                    </div>
                )}
            </button>

            {/* Continue Button for Current Level */}
            {isCurrent && (
                <div className="mt-4 text-center">
                    <button
                        onClick={handleClick}
                        className="px-6 py-2 rounded-xl text-sm font-bold text-white theme-primary hover:scale-105 transition-transform shadow-lg"
                    >
                        {progress > 0 ? 'Continue →' : 'Start →'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Level;