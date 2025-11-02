/**
 * Profile Component
 * 
 * Purpose: Reusable profile dropdown with user info, theme selection, and language options
 * Parent Components: Homepage.jsx, Learn.jsx, Classroom.jsx, VirtualLab.jsx, Leaderboard.jsx
 * 
 * Features:
 * - User profile information and stats (stored in IndexedDB)
 * - Theme switching (Playful Growth, Calm Focus, High Contrast)
 * - Language selection (English, Hindi, Odia)
 * - Settings and logout options
 * - Persistent data storage using Dexie.js
 * - Clean, focused design without rewards/badges
 */

import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { profileDb } from '../db.js';

const Profile = ({
    userName,
    userLevel,
    userXP = 2450,
    userStreak = 7,
    showNotification = true
}) => {
    const [showProfile, setShowProfile] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('playful');
    const [profileData, setProfileData] = useState({
        name: 'Student',
        avatar: '👤',
        level: 'Student Level 1',
        xp: 0,
        streak: 0,
        loginMethod: 'guest'
    });
    const [userSettings, setUserSettings] = useState({
        theme: 'playful',
        language: 'en',
        notifications: true,
        sound: true,
        autoSave: true
    });
    const [isLoading, setIsLoading] = useState(true);

    const { currentLanguage, changeLanguage, t, availableLanguages } = useLanguage();
    const { user, logout } = useAuth();

    // Initialize IndexedDB and load stored data
    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                // Initialize defaults if not exists
                await profileDb.initializeDefaults();
                
                // Load stored profile data
                const storedProfile = await profileDb.getUserProfile();
                const storedSettings = await profileDb.getUserSettings();
                
                if (storedProfile) {
                    setProfileData(storedProfile);
                }
                
                if (storedSettings) {
                    setUserSettings(storedSettings);
                    setCurrentTheme(storedSettings.theme);
                    // Sync with language context if needed
                    if (storedSettings.language !== currentLanguage) {
                        changeLanguage(storedSettings.language);
                    }
                }
                
                setIsLoading(false);
            } catch (error) {
                console.error('Error initializing database:', error);
                setIsLoading(false);
            }
        };

        initializeDatabase();
    }, [changeLanguage, currentLanguage]);

    // Update profile data when props change (for real-time updates)
    useEffect(() => {
        const updateProfileData = async () => {
            if (!isLoading) {
                const updates = {};
                
                // Use authenticated user data if available, otherwise use props
                if (user?.name && user.name !== profileData.name) {
                    updates.name = user.name;
                }
                if (userName && userName !== profileData.name) {
                    updates.name = userName;
                }
                if (userLevel && userLevel !== profileData.level) {
                    updates.level = userLevel;
                }
                if (userXP !== profileData.xp) {
                    updates.xp = userXP;
                }
                if (userStreak !== profileData.streak) {
                    updates.streak = userStreak;
                }
                if (user?.avatar && user.avatar !== profileData.avatar) {
                    updates.avatar = user.avatar;
                }
                if (user?.loginMethod && user.loginMethod !== profileData.loginMethod) {
                    updates.loginMethod = user.loginMethod;
                }

                if (Object.keys(updates).length > 0) {
                    try {
                        await profileDb.updateProfile('default', updates);
                        setProfileData(prev => ({ ...prev, ...updates }));
                    } catch (error) {
                        console.error('Error updating profile:', error);
                    }
                }
            }
        };

        updateProfileData();
    }, [user, userName, userLevel, userXP, userStreak, isLoading, profileData]);

    // Use stored data with fallbacks
    const displayName = profileData.name || user?.name || userName || "User";
    const displayLevel = profileData.level || userLevel || `${user?.type === 'staff' ? 'Teacher' : 'Student'} Level 12`;
    const displayAvatar = profileData.avatar || user?.avatar || "👤";
    const displayXP = profileData.xp || userXP;
    const displayStreak = profileData.streak || userStreak;

    useEffect(() => {
        // Set initial theme from stored settings
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    const setTheme = async (theme) => {
        try {
            setCurrentTheme(theme);
            document.documentElement.setAttribute('data-theme', theme);
            
            // Save theme to IndexedDB
            await profileDb.updateSettings('default', { theme });
            setUserSettings(prev => ({ ...prev, theme }));
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    };

    // Handle language change with database persistence
    const handleLanguageChange = async (language) => {
        try {
            changeLanguage(language);
            
            // Save language to IndexedDB
            await profileDb.updateSettings('default', { language });
            setUserSettings(prev => ({ ...prev, language }));
        } catch (error) {
            console.error('Error saving language:', error);
        }
    };

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            try {
                // Save final state before logout
                await profileDb.updateProfile('default', {
                    lastActive: new Date()
                });
                logout();
            } catch (error) {
                console.error('Error saving data during logout:', error);
                logout(); // Still logout even if save fails
            }
        }
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

    // Languages are now provided by the context

    return (
        <div className="profile-container relative">
            {/* Profile Icon Button */}
            <button
                onClick={toggleProfile}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all theme-accent relative"
            >
                <span className="text-2xl">{displayAvatar}</span>
                {/* Notification dot */}
                {showNotification && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">!</span>
                    </div>
                )}
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
                <div className="absolute right-0 top-16 w-80 max-w-[calc(100vw-2rem)] theme-card rounded-3xl shadow-2xl p-6 z-50 mx-4 sm:mx-0">
                    {isLoading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                            <p className="text-sm opacity-70">Loading profile...</p>
                        </div>
                    ) : (
                        <>
                            {/* Profile Header */}
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 theme-accent">
                            <span className="text-2xl">{displayAvatar}</span>
                        </div>
                        <h3 className="text-xl font-bold theme-text">{displayName}</h3>
                        <p className="text-sm opacity-70">{displayLevel}</p>
                        {user?.loginMethod && (
                            <p className="text-xs opacity-50 mt-1">
                                via {user.loginMethod === 'school' ? 'School ID' : user.loginMethod}
                            </p>
                        )}
                    </div>

                    {/* User Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold theme-text">{displayXP.toLocaleString()}</div>
                            <div className="text-xs opacity-70 flex items-center justify-center">
                                <span className="text-purple-500 mr-1">⭐</span>
                                <span>{t('totalXP')}</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold theme-text">{displayStreak}</div>
                            <div className="text-xs opacity-70 flex items-center justify-center">
                                <span className="text-orange-500 mr-1">🔥</span>
                                <span>{t('dayStreak')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Settings Options */}
                    <div className="space-y-4">
                        {/* Language Selector */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-lg">🌐</span>
                                <span className="font-medium">{t('language')}</span>
                            </div>
                            <select
                                value={userSettings.language || currentLanguage}
                                onChange={(e) => handleLanguageChange(e.target.value)}
                                className="bg-gray-100 rounded-xl px-3 py-2 text-sm border-none outline-none"
                                disabled={isLoading}
                            >
                                {Object.entries(availableLanguages).map(([code, lang]) => (
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
                                <span className="font-medium">{t('theme')}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setTheme('playful')}
                                    disabled={isLoading}
                                    className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${(userSettings.theme || currentTheme) === 'playful' ? 'border-4 border-green-500' : 'border-gray-300'
                                        }`}
                                    style={{ background: 'linear-gradient(45deg, #22C55E, #FF8A00)' }}
                                    title="Playful Growth"
                                />
                                <button
                                    onClick={() => setTheme('calm')}
                                    disabled={isLoading}
                                    className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${(userSettings.theme || currentTheme) === 'calm' ? 'border-4 border-blue-500' : 'border-gray-300'
                                        }`}
                                    style={{ background: 'linear-gradient(45deg, #2563EB, #06B6D4)' }}
                                    title="Calm Focus"
                                />
                                <button
                                    onClick={() => setTheme('contrast')}
                                    disabled={isLoading}
                                    className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${(userSettings.theme || currentTheme) === 'contrast' ? 'border-4 border-yellow-500' : 'border-gray-300'
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
                            <span className="font-medium">{t('settings')}</span>
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-2 p-3 rounded-xl hover:bg-red-50 transition-colors text-red-600"
                        >
                            <span className="text-lg">🚪</span>
                            <span className="font-medium">{t('signOut')}</span>
                        </button>
                    </div>
                    </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;