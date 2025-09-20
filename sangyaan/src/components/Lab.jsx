/**
 * Lab Component
 * 
 * Purpose: Renders individual virtual lab cards with lab information and actions
 * Parent Component: VirtualLab.jsx
 * 
 * Features:
 * - Displays lab details (title, subject, duration, difficulty)
 * - Shows completion status and ratings
 * - Handles lab interactions (start, review)
 * - Gamified design with subject-specific styling
 */

const Lab = ({
    title = "Wave Interference Lab",
    subject = "physics",
    duration = "45 min",
    difficulty = "intermediate",
    description = "Study wave patterns and interference phenomena using interactive simulations",
    isCompleted = false,
    rating = 0,
    onLabClick
}) => {

    const getSubjectIcon = (subject) => {
        const icons = {
            physics: '⚛️',
            chemistry: '🧪',
            biology: '🧬',
            math: '📊'
        };
        return icons[subject] || '🔬';
    };

    const getSubjectGradient = (subject) => {
        const gradients = {
            physics: 'from-blue-400 to-cyan-500',
            chemistry: 'from-green-400 to-emerald-500',
            biology: 'from-purple-400 to-pink-500',
            math: 'from-orange-400 to-red-500'
        };
        return gradients[subject] || 'from-gray-400 to-gray-500';
    };

    const getSubjectColor = (subject) => {
        const colors = {
            physics: 'blue',
            chemistry: 'green',
            biology: 'purple',
            math: 'orange'
        };
        return colors[subject] || 'gray';
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            beginner: 'text-green-600',
            intermediate: 'text-yellow-600',
            advanced: 'text-red-600'
        };
        return colors[difficulty] || 'text-gray-600';
    };

    const handleClick = () => {
        if (onLabClick) {
            onLabClick({ title, subject, difficulty });
        }
    };

    return (
        <div className="theme-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all transform hover:scale-105">
            {/* Lab Header with Gradient */}
            <div className={`h-32 bg-gradient-to-br ${getSubjectGradient(subject)} flex items-center justify-center relative`}>
                <span className="text-white text-4xl">{getSubjectIcon(subject)}</span>

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-white text-xs font-semibold">{duration}</span>
                </div>

                {/* Completion Badge */}
                {isCompleted && (
                    <div className="absolute top-3 left-3 bg-green-500 rounded-full px-2 py-1">
                        <span className="text-white text-xs font-semibold">✓ Completed</span>
                    </div>
                )}
            </div>

            {/* Lab Content */}
            <div className="p-6">
                {/* Subject and Rating */}
                <div className="flex items-center justify-between mb-3">
                    <span className={`bg-${getSubjectColor(subject)}-100 text-${getSubjectColor(subject)}-600 px-2 py-1 rounded text-xs font-medium capitalize`}>
                        {subject}
                    </span>
                    {rating > 0 && (
                        <span className="text-yellow-500">
                            {'⭐'.repeat(rating)}
                        </span>
                    )}
                </div>

                {/* Lab Title */}
                <h3 className="text-lg font-bold theme-text mb-2">{title}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

                {/* Footer */}
                <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium capitalize ${getDifficultyColor(difficulty)}`}>
                        {difficulty}
                    </span>

                    <button
                        onClick={handleClick}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${isCompleted
                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                : `bg-${getSubjectColor(subject)}-500 text-white hover:opacity-90`
                            }`}
                    >
                        {isCompleted ? 'Review Lab' : 'Start Lab'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Lab;