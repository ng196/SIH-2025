/**
 * Classroom Page Component
 * 
 * Purpose: Main classroom page that displays user's classes
 * Parent Component: App.jsx
 * 
 * Features:
 * - Shows single class using Class component
 * - Clean, focused design
 * - Handles class interactions
 * - Gamified stats display
 */

import Class from './Class';
import Profile from './Profile';

const Classroom = ({ onNavigate }) => {
    // Mock data - single class for now
    const mockClass = {
        className: "Physics - Grade 10",
        teacher: "Mrs. Johnson",
        studentCount: 28,
        progress: 75,
        nextAssignment: "Wave Lab",
        nextDate: "Tomorrow 10:00 AM",
        subject: "physics"
    };

    const handleClassClick = (classData) => {
        console.log('Joining class:', classData);
        alert(`Joining ${classData.className} with ${classData.teacher}`);
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
                            <h1 className="text-2xl font-bold theme-text">My Classroom</h1>
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
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-blue-500 text-2xl">📚</span>
                        </div>
                        <div className="text-2xl font-bold theme-text">1</div>
                        <div className="text-sm text-gray-600">Active Class</div>
                    </div>

                    <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-green-500 text-2xl">📝</span>
                        </div>
                        <div className="text-2xl font-bold theme-text">3</div>
                        <div className="text-sm text-gray-600">Assignments</div>
                    </div>

                    <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <span className="text-orange-500 text-2xl">🏆</span>
                        </div>
                        <div className="text-2xl font-bold theme-text">#3</div>
                        <div className="text-sm text-gray-600">Class Rank</div>
                    </div>
                </div>

                {/* Current Class */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold theme-text mb-4">Current Class</h2>
                    <Class
                        className={mockClass.className}
                        teacher={mockClass.teacher}
                        studentCount={mockClass.studentCount}
                        progress={mockClass.progress}
                        nextAssignment={mockClass.nextAssignment}
                        nextDate={mockClass.nextDate}
                        subject={mockClass.subject}
                        onClassClick={handleClassClick}
                    />
                </div>

                {/* Quick Actions */}
                <div className="theme-card rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold theme-text mb-4">Quick Actions</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <button className="w-full theme-primary text-white p-4 rounded-xl hover:opacity-90 transition flex items-center justify-center space-x-2">
                            <span className="text-xl">💬</span>
                            <span className="font-semibold">Class Discussion</span>
                        </button>
                        <button className="w-full bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition flex items-center justify-center space-x-2">
                            <span className="text-xl">📊</span>
                            <span className="font-semibold">View Grades</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Classroom;