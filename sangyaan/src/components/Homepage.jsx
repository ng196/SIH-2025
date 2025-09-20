// hyceyhdvjecvecve

import { useState, useEffect } from 'react';

const Homepage = () => {
    const [currentTheme, setCurrentTheme] = useState('playful');
    const [showProfile, setShowProfile] = useState(false);
    const [showLearningPath, setShowLearningPath] = useState(false);

    useEffect(() => {
        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    const setTheme = (theme) => {
        setCurrentTheme(theme);
        document.documentElement.setAttribute('data-theme', theme);
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    const showLearningPathView = () => {
        setShowLearningPath(true);
    };

    const hideLearningPath = () => {
        setShowLearningPath(false);
    };

    const continueLevel = () => {
        alert('Continuing Wave Interference level...');
    };

    const startNewChallenge = () => {
        alert('Starting new challenge...');
    };

    return (
        <div className="min-h-screen transition-all duration-300" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 rounded-full animate-float opacity-20" style={{ backgroundColor: 'var(--accent)' }}></div>
                <div className="absolute top-32 right-20 w-16 h-16 rounded-full animate-float opacity-20" style={{ backgroundColor: 'var(--primary)', animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full animate-float opacity-20" style={{ backgroundColor: 'var(--action)', animationDelay: '2s' }}></div>
                <div className="absolute bottom-32 right-1/3 w-12 h-12 rounded-full animate-float opacity-20" style={{ backgroundColor: 'var(--success)', animationDelay: '0.5s' }}></div>
            </div>

            {/* Main Container */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header with Profile and Theme Selector */}
                <header className="p-6">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center animate-bounce-slow theme-primary">
                                <span className="text-2xl">🦉</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold theme-text">STEM Quest</h1>
                                <p className="text-sm opacity-70">Learning Adventure</p>
                            </div>
                        </div>

                        {/* Theme Selector */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 theme-card rounded-2xl p-2 shadow-lg">
                                <span className="text-sm font-medium px-2">Theme:</span>
                                <button
                                    onClick={() => setTheme('playful')}
                                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${currentTheme === 'playful' ? 'border-4' : 'border-gray-300'}`}
                                    style={{ background: 'linear-gradient(45deg, #22C55E, #FF8A00)' }}
                                    title="Playful Growth"
                                />
                                <button
                                    onClick={() => setTheme('calm')}
                                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${currentTheme === 'calm' ? 'border-4' : 'border-gray-300'}`}
                                    style={{ background: 'linear-gradient(45deg, #2563EB, #06B6D4)' }}
                                    title="Calm Focus"
                                />
                                <button
                                    onClick={() => setTheme('contrast')}
                                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${currentTheme === 'contrast' ? 'border-4' : 'border-gray-300'}`}
                                    style={{ background: 'linear-gradient(45deg, #004E89, #FFB703)' }}
                                    title="High Contrast"
                                />
                            </div>

                            {/* Profile Icon */}
                            <div className="relative">
                                <button
                                    onClick={toggleProfile}
                                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all theme-accent relative"
                                >
                                    <span className="text-white font-bold text-lg">A</span>
                                    {/* Notification dot for rewards */}
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-xs text-white">!</span>
                                    </div>
                                </button>

                                {/* Profile Dropdown */}
                                {showProfile && (
                                    <div className="absolute right-0 top-16 w-80 theme-card rounded-3xl shadow-2xl p-6 z-50">
                                        {/* Profile Header */}
                                        <div className="text-center mb-6">
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 theme-accent">
                                                <span className="text-white font-bold text-2xl">A</span>
                                            </div>
                                            <h3 className="text-xl font-bold theme-text">Alex Johnson</h3>
                                            <p className="text-sm opacity-70">Level 12 Explorer</p>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold theme-text">2,450</div>
                                                <div className="text-xs opacity-70 flex items-center justify-center">
                                                    <span className="text-purple-500 mr-1">⭐</span>
                                                    <span>Total XP</span>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold theme-text">7</div>
                                                <div className="text-xs opacity-70 flex items-center justify-center">
                                                    <span className="text-orange-500 mr-1">🔥</span>
                                                    <span>Day Streak</span>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold theme-text">15</div>
                                                <div className="text-xs opacity-70 flex items-center justify-center">
                                                    <span className="text-yellow-500 mr-1">🏅</span>
                                                    <span>Badges</span>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold theme-text">350</div>
                                                <div className="text-xs opacity-70 flex items-center justify-center">
                                                    <span className="text-blue-500 mr-1">💎</span>
                                                    <span>Gems</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recent Rewards */}
                                        <div className="mb-6">
                                            <h4 className="font-semibold theme-text mb-3 flex items-center">
                                                <span className="mr-2">🎁</span>
                                                <span>Recent Rewards</span>
                                                <div className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                            </h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-xl">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-lg">🏆</span>
                                                        <span className="text-sm font-medium">Wave Master Badge</span>
                                                    </div>
                                                    <button className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-semibold hover:scale-105 transition-transform">
                                                        Claim
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between p-2 bg-purple-50 rounded-xl">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-lg">⭐</span>
                                                        <span className="text-sm font-medium">+50 XP Bonus</span>
                                                    </div>
                                                    <button className="text-xs bg-purple-400 text-purple-900 px-2 py-1 rounded-full font-semibold hover:scale-105 transition-transform">
                                                        Claim
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center p-6">
                    {!showLearningPath ? (
                        <div className="max-w-2xl mx-auto text-center">
                            {/* Welcome Message */}
                            <div className="mb-12">
                                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow theme-primary">
                                    <span className="text-5xl">🚀</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-4 theme-text">Welcome Back, Alex!</h2>
                                <p className="text-xl opacity-80 mb-2">Ready for your next STEM adventure?</p>
                                <div className="flex items-center justify-center space-x-4 text-sm">
                                    <div className="flex items-center space-x-2 theme-card px-4 py-2 rounded-full shadow-sm">
                                        <span className="text-orange-500">🔥</span>
                                        <span className="font-semibold">7-day streak</span>
                                    </div>
                                    <div className="flex items-center space-x-2 theme-card px-4 py-2 rounded-full shadow-sm">
                                        <span className="text-purple-500">⭐</span>
                                        <span className="font-semibold">2,450 XP</span>
                                    </div>
                                    <div className="flex items-center space-x-2 theme-card px-4 py-2 rounded-full shadow-sm">
                                        <span className="text-yellow-500">🏅</span>
                                        <span className="font-semibold">Level 12</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons (Side by Side) */}
                            <div className="grid md:grid-cols-2 gap-6 mb-12">
                                {/* Resume Last Challenge */}
                                <div className="theme-card rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                                    <div className="text-center mb-6">
                                        <div className="text-5xl animate-pulse mb-4">⚡</div>
                                        <h3 className="text-xl font-bold theme-text mb-2">Continue Journey</h3>
                                        <p className="opacity-70">Physics Fun - Wave Lab</p>
                                        <div className="flex items-center justify-center mt-3">
                                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full rounded-full transition-all duration-1000 theme-primary" style={{ width: '75%' }}></div>
                                            </div>
                                            <span className="ml-2 text-xs font-semibold opacity-70">75%</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={showLearningPathView}
                                        className="w-full py-3 rounded-2xl text-lg font-bold text-white transition-all transform hover:scale-105 shadow-lg theme-primary"
                                    >
                                        Resume 🎯
                                    </button>
                                </div>

                                {/* Start New Challenge */}
                                <div className="theme-card rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                                    <div className="text-center mb-6">
                                        <div className="text-5xl animate-bounce mb-4">✨</div>
                                        <h3 className="text-xl font-bold theme-text mb-2">New Adventure</h3>
                                        <p className="opacity-70">Explore new subjects</p>
                                        <div className="flex items-center justify-center mt-3 space-x-3">
                                            <span className="text-green-500 text-lg">🧪</span>
                                            <span className="text-blue-500 text-lg">🧮</span>
                                            <span className="text-purple-500 text-lg">🧬</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={startNewChallenge}
                                        className="w-full py-3 rounded-2xl text-lg font-bold text-white transition-all transform hover:scale-105 shadow-lg theme-action"
                                    >
                                        Start New 🚀
                                    </button>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="theme-card rounded-xl p-4 shadow-sm">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold theme-text">12</div>
                                        <div className="text-xs opacity-70">Games</div>
                                    </div>
                                </div>
                                <div className="theme-card rounded-xl p-4 shadow-sm">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold theme-text">5</div>
                                        <div className="text-xs opacity-70">Labs</div>
                                    </div>
                                </div>
                                <div className="theme-card rounded-xl p-4 shadow-sm">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold theme-text">#15</div>
                                        <div className="text-xs opacity-70">Rank</div>
                                    </div>
                                </div>
                                <div className="theme-card rounded-xl p-4 shadow-sm">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold theme-text">87%</div>
                                        <div className="text-xs opacity-70">Score</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Learning Path View */
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-8 text-center">
                                <button
                                    onClick={hideLearningPath}
                                    className="text-sm opacity-70 hover:opacity-100 transition mb-4"
                                >
                                    ← Back to Dashboard
                                </button>
                                <h3 className="text-2xl font-bold theme-text mb-2">Physics Fun - Learning Path</h3>
                                <p className="opacity-70">Complete levels to unlock new challenges!</p>
                            </div>

                            {/* Path Container */}
                            <div className="relative max-w-3xl mx-auto">
                                {/* Curved Path SVG */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 800" fill="none">
                                    <path d="M100 50 Q200 150 300 100 T500 200 Q400 300 300 250 T100 400 Q200 500 300 450 T500 600 Q400 700 300 650"
                                        stroke="var(--primary)" strokeWidth="4" strokeDasharray="10,5" opacity="0.3" />
                                </svg>

                                {/* Level Nodes */}
                                <div className="relative space-y-16 py-8">
                                    {/* Level 1: Completed */}
                                    <div className="flex items-center justify-start">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg theme-success relative">
                                                <span className="text-2xl">🌊</span>
                                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                                    <span className="text-xs">⭐</span>
                                                </div>
                                            </div>
                                            <div className="theme-card rounded-2xl p-4 shadow-lg">
                                                <h4 className="font-bold theme-text">Wave Basics</h4>
                                                <p className="text-sm opacity-70">Understanding wave properties</p>
                                                <div className="flex items-center mt-2 space-x-2">
                                                    <span className="text-yellow-400 text-sm">⭐⭐⭐</span>
                                                    <span className="text-xs opacity-70">Perfect!</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Level 2: Completed */}
                                    <div className="flex items-center justify-end">
                                        <div className="flex items-center space-x-4">
                                            <div className="theme-card rounded-2xl p-4 shadow-lg">
                                                <h4 className="font-bold theme-text">Wave Motion</h4>
                                                <p className="text-sm opacity-70">How waves travel</p>
                                                <div className="flex items-center mt-2 space-x-2">
                                                    <span className="text-yellow-400 text-sm">⭐⭐</span>
                                                    <span className="text-xs opacity-70">Great job!</span>
                                                </div>
                                            </div>
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg theme-success relative">
                                                <span className="text-2xl">🏄</span>
                                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                                    <span className="text-xs">⭐</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Level 3: Current (In Progress) */}
                                    <div className="flex items-center justify-start">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg theme-primary animate-pulse-slow relative">
                                                <span className="text-2xl">⚡</span>
                                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center animate-bounce">
                                                    <span className="text-xs text-white font-bold">75%</span>
                                                </div>
                                            </div>
                                            <div className="theme-card rounded-2xl p-4 shadow-lg border-2 theme-border-primary">
                                                <h4 className="font-bold theme-text">Wave Interference</h4>
                                                <p className="text-sm opacity-70">When waves meet</p>
                                                <div className="flex items-center mt-2">
                                                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full theme-primary" style={{ width: '75%' }}></div>
                                                    </div>
                                                    <span className="ml-2 text-xs font-semibold">75%</span>
                                                </div>
                                                <button
                                                    onClick={continueLevel}
                                                    className="mt-3 px-4 py-2 rounded-xl text-sm font-bold text-white theme-primary hover:scale-105 transition-transform"
                                                >
                                                    Continue →
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Level 4: Locked */}
                                    <div className="flex items-center justify-end">
                                        <div className="flex items-center space-x-4 opacity-50">
                                            <div className="theme-card rounded-2xl p-4 shadow-lg">
                                                <h4 className="font-bold theme-text">Standing Waves</h4>
                                                <p className="text-sm opacity-70">Waves that don't travel</p>
                                                <div className="flex items-center mt-2 space-x-2">
                                                    <span className="text-gray-400 text-sm">🔒</span>
                                                    <span className="text-xs opacity-70">Complete previous level</span>
                                                </div>
                                            </div>
                                            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center shadow-lg relative">
                                                <span className="text-2xl opacity-50">🎵</span>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-2xl">🔒</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Level 5: Locked */}
                                    <div className="flex items-center justify-start">
                                        <div className="flex items-center space-x-4 opacity-50">
                                            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center shadow-lg relative">
                                                <span className="text-2xl opacity-50">🎼</span>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-2xl">🔒</span>
                                                </div>
                                            </div>
                                            <div className="theme-card rounded-2xl p-4 shadow-lg">
                                                <h4 className="font-bold theme-text">Wave Applications</h4>
                                                <p className="text-sm opacity-70">Real-world wave uses</p>
                                                <div className="flex items-center mt-2 space-x-2">
                                                    <span className="text-gray-400 text-sm">🔒</span>
                                                    <span className="text-xs opacity-70">Coming soon!</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Homepage;