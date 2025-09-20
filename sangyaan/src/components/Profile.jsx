/**
 * Profile Component
 * 
 * Purpose: Reusable profile dropdown with user info, theme selection, and language options
 * Parent Components: Homepage.jsx, Learn.jsx, Classroom.jsx, VirtualLab.jsx, Leaderboard.jsx
 * 
 * Features:
 * - User profile information and stats
 * - Theme switching (Playful Growth, Calm Focus, High Contrast)
 * - Language selection (English, Hindi, Odia)
 * - Settings and logout options
 * - Clean, focused design without rewards/badges
 */

import { useState, useEffect } from 'react';

const Profile = ({
    userName = "Alex Johnson",
    userLevel = "Level 12 Explorer",
    userXP = 2450,
    userStreak = 7,
    showNotification = true
}) => {
    const [showProfile, setShowProfile] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('playful');
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    const setTheme = (theme) => {
        setCurrentTheme(theme);
        document.documentElement.setAttribute('data-theme', theme);
    };

    const changeLanguage = (language) => {
        setCurrentLanguage(language);
        console.log('Language changed to:', language);
        // Handle language change logic here
    };

    const handleLogout = () => {
        alert('Logging out...');
        // Handle logout logic here
    };

    const handleSettings = () => {
        alert('Opening settings...');
        // Handle settings navigation here
    };

    // Close profile when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showProfile && !event.target.closest('.profile-container')) {
                setShowProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfile]);

    const languages = {
        en: { flag: '🇺🇸', name: 'English' },
        hi: { flag: '🇮🇳', name: 'हिंदी' },
        or: { flag: '🇮🇳', name: 'ଓଡ଼ିଆ' }
    };

    return (
        <div className="profile-container relative">
            {/* Profile Icon Button */}
            <button
                onClick={toggleProfile}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all theme-accent relative"
            >
                <span className="text-white font-bold text-lg">A</span>
                {/* Notification dot */}
                {showNotification && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">!</span>
                    </div>
                )}
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
                <div className="absolute right-0 top-16 w-80 theme-card rounded-3xl shadow-2xl p-6 z-50">
                    {/* Profile Header */}
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 theme-accent">
                            <span className="text-white font-bold text-2xl">A</span>
                        </div>
                        <h3 className="text-xl font-bold theme-text">{userName}</h3>
                        <p className="text-sm opacity-70">{userLevel}</p>
                    </div>

                    {/* User Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold theme-text">{userXP.toLocaleString()}</div>
                            <div className="text-xs opacity-70 flex items-center justify-center">
                                <span className="text-purple-500 mr-1">⭐</span>
                                <span>Total XP</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold theme-text">{userStreak}</div>
                            <div className="text-xs opacity-70 flex items-center justify-center">
                                <span className="text-orange-500 mr-1">🔥</span>
                                <span>Day Streak</span>
                            </div>
                        </div>
                    </div>

                    {/* Settings Options */}
                    <div className="space-y-4">
                        {/* Language Selector */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-lg">🌐</span>
                                <span className="font-medium">Language</span>
                            </div>
                            <select
                                value={currentLanguage}
                                onChange={(e) => changeLanguage(e.target.value)}
                                className="bg-gray-100 rounded-xl px-3 py-2 text-sm border-none outline-none"
                            >
                                {Object.entries(languages).map(([code, lang]) => (
                                    <option key={code} value={code}>
                                        {lang.flag} {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Theme Selector */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-lg">🎨</span>
                                <span className="font-medium">Theme</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setTheme('playful')}
                                    className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${currentTheme === 'playful' ? 'border-4 border-green-500' : 'border-gray-300'
                                        }`}
                                    style={{ background: 'linear-gradient(45deg, #22C55E, #FF8A00)' }}
                                    title="Playful Growth"
                                />
                                <button
                                    onClick={() => setTheme('calm')}
                                    className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${currentTheme === 'calm' ? 'border-4 border-blue-500' : 'border-gray-300'
                                        }`}
                                    style={{ background: 'linear-gradient(45deg, #2563EB, #06B6D4)' }}
                                    title="Calm Focus"
                                />
                                <button
                                    onClick={() => setTheme('contrast')}
                                    className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${currentTheme === 'contrast' ? 'border-4 border-yellow-500' : 'border-gray-300'
                                        }`}
                                    style={{ background: 'linear-gradient(45deg, #004E89, #FFB703)' }}
                                    title="High Contrast"
                                />
                            </div>
                        </div>

                        {/* Settings Button */}
                        <button
                            onClick={handleSettings}
                            className="w-full flex items-center space-x-2 p-3 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <span className="text-lg">⚙️</span>
                            <span className="font-medium">Settings</span>
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-2 p-3 rounded-xl hover:bg-red-50 transition-colors text-red-600"
                        >
                            <span className="text-lg">🚪</span>
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;