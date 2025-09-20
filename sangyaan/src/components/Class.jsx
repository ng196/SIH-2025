/**
 * Class Component
 * 
 * Purpose: Renders individual class cards with class information and actions
 * Parent Component: Classroom.jsx
 * 
 * Features:
 * - Displays class details (name, teacher, students)
 * - Shows progress and next assignment
 * - Handles class interactions (join, view details)
 * - Gamified design with subject-specific icons
 */

const Class = ({
    className = "Physics - Grade 10",
    teacher = "Mrs. Johnson",
    studentCount = 28,
    progress = 75,
    nextAssignment = "Wave Lab",
    nextDate = "Tomorrow 10:00 AM",
    subject = "physics",
    onClassClick
}) => {

    const getSubjectIcon = (subject) => {
        const icons = {
            physics: '⚛️',
            chemistry: '🧪',
            biology: '🧬',
            math: '🧮'
        };
        return icons[subject] || '📚';
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

    const handleClick = () => {
        if (onClassClick) {
            onClassClick({ className, teacher, subject });
        }
    };

    return (
        <div
            onClick={handleClick}
            className="theme-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer"
        >
            <div className="flex items-center space-x-4">
                {/* Subject Icon */}
                <div className={`w-16 h-16 bg-${getSubjectColor(subject)}-100 rounded-xl flex items-center justify-center`}>
                    <span className={`text-${getSubjectColor(subject)}-500 text-3xl`}>
                        {getSubjectIcon(subject)}
                    </span>
                </div>

                {/* Class Info */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold theme-text mb-1">{className}</h3>
                    <p className="text-sm text-gray-600 mb-2">{teacher} • {studentCount} students</p>

                    {/* Progress Bar */}
                    <div className="flex items-center mb-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-${getSubjectColor(subject)}-500 rounded-full transition-all duration-1000`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-500">{progress}% complete</span>
                    </div>
                </div>

                {/* Next Assignment */}
                <div className="text-right">
                    <p className="text-sm font-medium theme-text">Next: {nextAssignment}</p>
                    <p className="text-xs text-gray-500">{nextDate}</p>

                    {/* Join Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick();
                        }}
                        className={`mt-2 px-4 py-2 bg-${getSubjectColor(subject)}-500 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition`}
                    >
                        Join Class
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Class;