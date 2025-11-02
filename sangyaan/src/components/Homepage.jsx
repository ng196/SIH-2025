/**
 * Homepage Component
 * 
 * Purpose: Main dashboard page with user stats, quick actions, and navigation
 * Parent Component: App.jsx
 * 
 * Features:
 * - Welcome message and user stats
 * - Quick action cards for navigation
 * - Profile component integration
 * - Clean, gamified design
 */

import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Profile from './Profile';

const Homepage = ({ onNavigate }) => {
    const [showLearningPath, setShowLearningPath] = useState(false);
    const { t } = useLanguage();

    const goToLearn = () => {
        onNavigate('learn');
    };

    const hideLearningPath = () => {
        setShowLearningPath(false);
    };


    const startNewChallenge = () => {
        onNavigate('learn');
    };

    const goToVirtualLab = () => {
        onNavigate('virtuallab');
    };

    const goToClassroom = () => {
        onNavigate('classroom');
    };
    const goToEvents = () => {
        onNavigate('events');
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
                {/* Header with Logo and Profile */}
                <header className="p-4 md:p-6">
                    <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 md:space-x-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center animate-bounce-slow theme-primary">
                                <span className="text-xl md:text-2xl">🦉</span>
                            </div>
                            <div>
                                <h1 className="text-lg md:text-xl font-bold theme-text">STEM Quest</h1>
                                <p className="text-xs md:text-sm opacity-70">Learning Adventure</p>
                            </div>
                        </div>

                        {/* Profile Component */}
                        <Profile
                            userName="sangyaan"
                            userLevel="Level 12 Explorer"
                            userXP={2450}
                            userStreak={7}
                            showNotification={true}
                        />
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center p-4 md:p-6">
                    {!showLearningPath ? (
                        <div className="max-w-2xl mx-auto text-center">
                            {/* Welcome Message */}
                            <div className="mb-8 md:mb-12">
                                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 animate-pulse-slow theme-primary">
                                    <span className="text-3xl md:text-5xl">🚀</span>
                                </div>
                                <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 theme-text">{t('welcomeBack')}, sangyaan!</h2>
                                <p className="text-base md:text-xl opacity-80 mb-2">{t('readyForAdventure')}</p>
                                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm">
                                    <div className="flex items-center space-x-2 theme-card px-4 py-2 rounded-full shadow-sm">
                                        <span className="text-orange-500">🔥</span>
                                        <span className="font-semibold">7 {t('dayStreak')}</span>
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
                            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                                {/* Resume Last Challenge */}
                                <div className="theme-card rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                                    <div className="text-center mb-6">
                                        <div className="text-5xl animate-pulse mb-4">⚡</div>
                                        <h3 className="text-xl font-bold theme-text mb-2">{t('continueJourney')}</h3>
                                        <p className="opacity-70">{t('physics')} Fun - Wave Lab</p>
                                        <div className="flex items-center justify-center mt-3">
                                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full rounded-full transition-all duration-1000 theme-primary" style={{ width: '75%' }}></div>
                                            </div>
                                            <span className="ml-2 text-xs font-semibold opacity-70">75%</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={goToLearn}
                                        className="w-full py-3 rounded-2xl text-lg font-bold text-white transition-all transform hover:scale-105 shadow-lg theme-primary"
                                    >
                                        {t('resume')} 🎯
                                    </button>
                                </div>

                                {/* Start New Challenge */}
                                <div className="theme-card rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                                    <div className="text-center mb-6">
                                        <div className="text-5xl animate-bounce mb-4">✨</div>
                                        <h3 className="text-xl font-bold theme-text mb-2">{t('newAdventure')}</h3>
                                        <p className="opacity-70">{t('exploreNewSubjects')}</p>
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
                                        {t('startNew')} 🚀
                                    </button>
                                </div>
                            </div>

                            {/* Promotional Card for Saksham */}
                            <div className="mb-12 max-w-xl mx-auto">
                                <a
                                    href="https://campus.nitingoyal.tech"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block theme-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-blue-500/30 hover:border-blue-500/60"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                                <span className="text-3xl">🎓</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold theme-text mb-1">
                                                Are you a college student?
                                            </h3>
                                            <p className="text-sm opacity-70 mb-2">
                                                Check out Saksham - Your campus companion app
                                            </p>
                                            <div className="flex items-center space-x-2 text-sm">
                                                <span className="text-blue-500 font-semibold">Visit Now</span>
                                                <span className="text-blue-500">→</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                <button
                                    onClick={goToLearn}
                                    className="theme-card rounded-xl p-4 shadow-sm hover:shadow-lg transition-all transform hover:scale-105"
                                >
                                    <div className="text-center">
                                        <div className="text-2xl font-bold theme-text">12</div>
                                        <div className="text-xs opacity-70">{t('games')}</div>
                                    </div>
                                </button>
                                <button
                                    onClick={goToVirtualLab}
                                    className="theme-card rounded-xl p-4 shadow-sm hover:shadow-lg transition-all transform hover:scale-105"
                                >
                                    <div className="text-center">
                                        <div className="text-2xl font-bold theme-text">5</div>
                                        <div className="text-xs opacity-70">Labs</div>
                                    </div>
                                </button>
                                <button
                                    onClick={goToClassroom}
                                    className="theme-card rounded-xl p-4 shadow-sm hover:shadow-lg transition-all transform hover:scale-105"
                                >
                                    <div className="text-center">
                                        <div className="text-2xl font-bold theme-text">#15</div>
                                        <div className="text-xs opacity-70">Rank</div>
                                    </div>
                                </button>
                                <button
                                    onClick={goToEvents}
                                    className="theme-card rounded-xl p-4 shadow-sm hover:shadow-lg transition-all transform hover:scale-105"
                                >
                                    <div className="text-center">
                                        <div className="text-2xl font-bold theme-text">📅</div>
                                        <div className="text-xs opacity-70">{t('events')}</div>
                                    </div>
                                </button>
                                <div className="theme-card rounded-xl p-4 shadow-sm">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold theme-text">87%</div>
                                        <div className="text-xs opacity-70">{t('score')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Learning Path View - Simplified */
                        <div className="max-w-3xl mx-auto text-center">
                            <button
                                onClick={hideLearningPath}
                                className="text-sm opacity-70 hover:opacity-100 transition mb-4"
                            >
                                ← Back to Dashboard
                            </button>
                            <h3 className="text-2xl font-bold theme-text mb-2">Physics Fun - Learning Path</h3>
                            <p className="opacity-70">Complete levels to unlock new challenges!</p>
                            <button
                                onClick={goToLearn}
                                className="mt-6 px-6 py-3 rounded-xl text-lg font-bold text-white theme-primary hover:scale-105 transition-transform"
                            >
                                Go to Learning Path →
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Homepage;