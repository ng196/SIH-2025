import { useState } from 'react';
import ChemistryLab from './ChemistryLab';
import Lab from './Lab';
import Profile from './Profile';

const VirtualLab = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    
    // Mock data for physics lab
    const mockPhysicsLab = {
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
        setActiveTab(labData.subject);
    };

    const handleBackClick = () => {
        setActiveTab('dashboard');
    };

    const renderDashboard = () => (
        <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="theme-card rounded-xl p-6 shadow-sm text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-purple-500 text-2xl">🧪</span>
                    </div>
                    <div className="text-2xl font-bold theme-text">2</div>
                    <div className="text-sm text-gray-600">Available Labs</div>
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

            {/* Lab Categories */}
            <div className="theme-card rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold theme-text mb-4">Available Labs</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <div 
                        className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition"
                        onClick={() => handleLabClick(mockPhysicsLab)}
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-500 text-xl">⚛️</span>
                        </div>
                        <div>
                            <h4 className="font-semibold theme-text">Physics Lab</h4>
                            <p className="text-sm text-gray-600">Wave Interference Experiments</p>
                        </div>
                    </div>

                    <div 
                        className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100 transition"
                        onClick={() => setActiveTab('chemistry')}
                    >
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <span className="text-green-500 text-xl">🧪</span>
                        </div>
                        <div>
                            <h4 className="font-semibold theme-text">Chemistry Lab</h4>
                            <p className="text-sm text-gray-600">Chemical Reactions</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="min-h-screen transition-all duration-300" 
             style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
            {/* Header */}
            <header className="theme-card shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {activeTab !== 'dashboard' && (
                                <button
                                    onClick={handleBackClick}
                                    className="text-gray-600 hover:opacity-70 transition"
                                >
                                    ← Back to Dashboard
                                </button>
                            )}
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
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'chemistry' && <ChemistryLab />}
                {activeTab === 'physics' && (
                    <Lab
                        {...mockPhysicsLab}
                        onLabClick={handleLabClick}
                    />
                )}
            </div>
        </div>
    );
};

export default VirtualLab;