import React, { useState, useEffect } from 'react';
import studentDataJson from '../data/student_data.json';
import { useLanguage } from '../contexts/LanguageContext';

const ParentsDashboard = () => {
    const [childData, setChildData] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const { t, currentLanguage, changeLanguage } = useLanguage();

    // Load child data from JSON
    useEffect(() => {
        setTimeout(() => {
            // Process the JSON data to match our component structure
            const processedData = {
                name: studentDataJson.personalInfo.fullName,
                grade: `Grade ${studentDataJson.academicInfo.grade}`,
                avatar: studentDataJson.personalInfo.avatar,
                overallProgress: studentDataJson.gameProgress.overallProgress,
                currentLevel: studentDataJson.gameProgress.currentLevel,
                weeklyStudyTime: studentDataJson.gameProgress.totalPlayTime.split(' ')[0] + 'h ' + studentDataJson.gameProgress.averageSessionTime,
                lastActive: "Today at 10:30 AM",
                
                // Calculate recent scores from subject progress
                recentScores: [
                    studentDataJson.subjectProgress.mathematics.averageScore,
                    studentDataJson.subjectProgress.physics.averageScore,
                    studentDataJson.subjectProgress.chemistry.averageScore,
                    studentDataJson.subjectProgress.biology.averageScore,
                    Math.round((studentDataJson.subjectProgress.mathematics.averageScore + studentDataJson.subjectProgress.physics.averageScore) / 2)
                ],
                
                subjects: [
                    { 
                        name: "Mathematics", 
                        progress: studentDataJson.subjectProgress.mathematics.progress, 
                        grade: getLetterGrade(studentDataJson.subjectProgress.mathematics.averageScore), 
                        teacher: "Dr. Smith" 
                    },
                    { 
                        name: "Physics", 
                        progress: studentDataJson.subjectProgress.physics.progress, 
                        grade: getLetterGrade(studentDataJson.subjectProgress.physics.averageScore), 
                        teacher: "Dr. Johnson" 
                    },
                    { 
                        name: "Chemistry", 
                        progress: studentDataJson.subjectProgress.chemistry.progress, 
                        grade: getLetterGrade(studentDataJson.subjectProgress.chemistry.averageScore), 
                        teacher: "Ms. Davis" 
                    },
                    { 
                        name: "Biology", 
                        progress: studentDataJson.subjectProgress.biology.progress, 
                        grade: getLetterGrade(studentDataJson.subjectProgress.biology.averageScore), 
                        teacher: "Mr. Wilson" 
                    }
                ],
                
                achievements: studentDataJson.achievements.badges.slice(0, 3).map(badge => ({
                    name: badge.name,
                    icon: badge.icon,
                    date: new Date(badge.earnedDate).toLocaleDateString(currentLanguage === 'hi' ? 'hi-IN' : 'en-US', { month: 'short', day: 'numeric' })
                })),
                
                weeklyActivity: Object.entries(studentDataJson.activityHistory.weeklyActivity).map(([day, data]) => ({
                    day: day.charAt(0).toUpperCase() + day.slice(1, 3),
                    minutes: data.minutes
                }))
            };
            
            setChildData(processedData);
            setIsLoading(false);
        }, 1000);
    }, [currentLanguage]);

    // Helper function to convert numeric score to letter grade
    const getLetterGrade = (score) => {
        if (score >= 95) return "A+";
        if (score >= 90) return "A";
        if (score >= 87) return "A-";
        if (score >= 83) return "B+";
        if (score >= 80) return "B";
        if (score >= 77) return "B-";
        if (score >= 73) return "C+";
        if (score >= 70) return "C";
        if (score >= 67) return "C-";
        if (score >= 63) return "D+";
        if (score >= 60) return "D";
        return "F";
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#F5F5F5'}}>
                    <div className="text-center">
                    <div className="text-4xl mb-4">📚</div>
                    <div className="text-xl" style={{color: '#757575'}}>{t('loading') || 'Loading...'}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{backgroundColor: '#F5F5F5'}}>
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3 md:space-x-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl" style={{backgroundColor: '#E3F2FD'}}>
                                {childData.avatar}
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold" style={{color: '#333333'}}>{childData.name}</h1>
                                <p className="text-base md:text-lg" style={{color: '#757575'}}>{childData.grade} • {t('parent.currentLevel')} {childData.currentLevel}</p>
                            </div>
                        </div>
                        <div className="text-left sm:text-right w-full sm:w-auto">
                            <div className="flex items-center justify-start sm:justify-end space-x-2 mb-2">
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`px-2 py-1 rounded text-xs ${currentLanguage === 'en' ? 'text-white' : 'bg-gray-100'}`}
                                    style={currentLanguage === 'en' ? {backgroundColor: '#0055A4', color: '#FFFFFF'} : {color: '#757575'}}
                                >EN</button>
                                <button
                                    onClick={() => changeLanguage('hi')}
                                    className={`px-2 py-1 rounded text-xs ${currentLanguage === 'hi' ? 'text-white' : 'bg-gray-100'}`}
                                    style={currentLanguage === 'hi' ? {backgroundColor: '#0055A4', color: '#FFFFFF'} : {color: '#757575'}}
                                >हिं</button>
                            </div>
                            <div className="text-sm text-gray-500">{t('parent.headerLastActive')}</div>
                            <div className="text-lg font-semibold" style={{color: '#4CAF50'}}>{childData.lastActive}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 mt-4 md:mt-6">
                <div className="bg-white shadow-sm p-2" style={{borderRadius: '8px'}}>
                    <div className="flex overflow-x-auto space-x-1 md:space-x-2 scrollbar-hide">{[
                            { id: 'overview', name: t('parent.tabsOverview'), icon: '📊' },
                            { id: 'subjects', name: t('parent.tabsSubjects'), icon: '📚' },
                            { id: 'achievements', name: t('parent.tabsAchievements'), icon: '🏆' },
                            { id: 'activity', name: t('parent.tabsStudyTime'), icon: '⏰' },
                            { id: 'ranking', name: t('parent.tabsClassRank'), icon: '🎯' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2 md:py-3 font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                                    activeTab === tab.id
                                        ? 'text-white'
                                        : 'hover:bg-gray-100'
                                }`}
                                style={{
                                    borderRadius: '8px',
                                    backgroundColor: activeTab === tab.id ? '#0055A4' : 'transparent',
                                    color: activeTab === tab.id ? '#FFFFFF' : '#757575',
                                    fontSize: 'clamp(0.75rem, 2vw, 1rem)'
                                }}
                            >
                                <span className="text-base md:text-xl">{tab.icon}</span>
                                <span className="text-sm md:text-lg">{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 mt-4 md:mt-6 pb-6 md:pb-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-4 md:space-y-6">
                        {/* Progress Summary */}
                        <div className="bg-white shadow-sm p-4 md:p-6" style={{borderRadius: '8px'}}>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6" style={{color: '#333333'}}>📈 {t('parent.overallProgress')}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-3" style={{backgroundColor: '#E8F5E9'}}>
                                        <div className="text-3xl font-bold" style={{color: '#4CAF50'}}>{childData.overallProgress}%</div>
                                    </div>
                                    <div className="text-lg font-semibold" style={{color: '#333333'}}>{t('parent.overallProgress')}</div>
                                    <div style={{color: '#757575'}}>{t('excellentWork') || 'Excellent work!'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-3" style={{backgroundColor: '#E3F2FD'}}>
                                        <div className="text-2xl font-bold" style={{color: '#0055A4'}}>{t('parent.currentLevel')} {childData.currentLevel}</div>
                                    </div>
                                    <div className="text-lg font-semibold" style={{color: '#333333'}}>{t('parent.currentLevel')}</div>
                                    <div style={{color: '#757575'}}>{t('keepItUp') || 'Keep it up!'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-3" style={{backgroundColor: '#F3E5F5'}}>
                                        <div className="text-lg font-bold" style={{color: '#673AB7'}}>{childData.weeklyStudyTime}</div>
                                    </div>
                                    <div className="text-lg font-semibold" style={{color: '#333333'}}>{t('parent.thisWeek')}</div>
                                    <div style={{color: '#757575'}}>{t('parent.studyTime')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Performance */}
                        <div className="bg-white shadow-sm p-6" style={{borderRadius: '8px'}}>
                            <h2 className="text-2xl font-bold mb-6" style={{color: '#333333'}}>📝 {t('parent.recentTestScores')}</h2>
                            <div className="flex justify-center">
                                <div className="flex space-x-4">
                                    {childData.recentScores.map((score, index) => (
                                        <div key={index} className="text-center">
                                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg`} style={{
                                                backgroundColor: score >= 90 ? '#4CAF50' : score >= 80 ? '#0055A4' : '#FDD835'
                                            }}>
                                                {score}
                                            </div>
                                            <div className="text-sm mt-2" style={{color: '#757575'}}>Test {index + 1}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Subjects Tab */}
                {activeTab === 'subjects' && (
                    <div className="bg-white shadow-sm p-6" style={{borderRadius: '8px'}}>
                        <h2 className="text-2xl font-bold mb-6" style={{color: '#333333'}}>📚 {t('parent.subjectPerformance')}</h2>
                        <div className="space-y-4">
                            {childData.subjects.map((subject, index) => (
                                <div key={index} className="border border-gray-200 p-4" style={{borderRadius: '8px'}}>
                                    <div className="flex items-center justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold" style={{color: '#333333'}}>{subject.name}</h3>
                                            <p style={{color: '#757575'}}>{t('parent.teacherLabel')}: {subject.teacher}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-2xl font-bold`} style={{
                                                color: subject.grade.startsWith('A') ? '#4CAF50' : 
                                                       subject.grade.startsWith('B') ? '#0077B6' : '#FDD835'
                                            }}>
                                                {subject.grade}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div 
                                            className={`h-4 rounded-full`}
                                            style={{
                                                width: `${subject.progress}%`,
                                                backgroundColor: subject.progress >= 80 ? '#4CAF50' : 
                                                                subject.progress >= 60 ? '#0055A4' : '#FDD835'
                                            }}
                                        ></div>
                                    </div>
                                    <div className="text-right text-lg font-semibold mt-2" style={{color: '#333333'}}>
                                        {subject.progress}% {t('parent.completeWord')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Achievements Tab */}
                {activeTab === 'achievements' && (
                    <div className="bg-white shadow-sm p-6" style={{borderRadius: '8px'}}>
                        <h2 className="text-2xl font-bold mb-6" style={{color: '#333333'}}>🏆 {t('parent.recentAchievements')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {childData.achievements.map((achievement, index) => (
                                <div key={index} className="text-center border border-gray-200 p-6" style={{borderRadius: '8px'}}>
                                    <div className="text-5xl mb-3">{achievement.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2" style={{color: '#333333'}}>{achievement.name}</h3>
                                    <p style={{color: '#757575'}}>{t('parent.earnedOn', { date: achievement.date })}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 text-center">
                            <div className="inline-block p-4" style={{backgroundColor: '#E3F2FD', borderRadius: '8px'}}>
                                <div className="text-lg font-semibold" style={{color: '#0055A4'}}>
                                    🎉 {t('parent.earnedCount', { count: childData.achievements.length })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                    <div className="bg-white shadow-sm p-6" style={{borderRadius: '8px'}}>
                        <h2 className="text-2xl font-bold mb-6" style={{color: '#333333'}}>⏰ {t('parent.weeklyStudyTime')}</h2>
                        <div className="space-y-4">
                            {childData.weeklyActivity.map((day, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <div className="w-16 text-lg font-semibold" style={{color: '#333333'}}>{day.day}</div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                                        <div 
                                            className="h-6 rounded-full flex items-center justify-end pr-2"
                                            style={{ 
                                                width: `${Math.min(day.minutes / 90 * 100, 100)}%`,
                                                backgroundColor: '#0055A4'
                                            }}
                                        >
                                            <span className="text-white text-sm font-semibold">{day.minutes}m</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 border p-4" style={{backgroundColor: '#E8F5E9', borderColor: '#C8E6C9', borderRadius: '8px'}}>
                            <div className="text-center">
                                <div className="text-lg font-semibold" style={{color: '#4CAF50'}}>
                                    ✅ {t('parent.totalThisWeek', { minutes: childData.weeklyActivity.reduce((sum, day) => sum + day.minutes, 0) })}
                                </div>
                                <div className="mt-1" style={{color: '#4CAF50'}}>{t('parent.consistencyMsg')}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Class Ranking Tab */}
                {activeTab === 'ranking' && (
                    <div className="space-y-6">
                        {/* Overall Class Position */}
                        <div className="bg-white shadow-sm p-6" style={{borderRadius: '8px'}}>
                            <h2 className="text-2xl font-bold mb-6" style={{color: '#333333'}}>🎯 {t('parent.classPositionTitle')}</h2>
                            <div className="text-center">
                                <div className="inline-block rounded-full p-8 mb-4" style={{backgroundColor: '#E3F2FD'}}>
                                    <div className="text-4xl font-bold" style={{color: '#0055A4'}}>3rd</div>
                                </div>
                                <div className="text-xl font-semibold mb-2" style={{color: '#333333'}}>
                                    {t('parent.rankOutOf', { rank: 3, total: 35 })}
                                </div>
                                <div style={{color: '#757575'}}>{t('parent.topPercent', { percent: 9 })} 🌟</div>
                            </div>
                        </div>

                        {/* Subject Rankings */}
                        <div className="bg-white shadow-sm p-6" style={{borderRadius: '8px'}}>
                            <h2 className="text-2xl font-bold mb-6" style={{color: '#333333'}}>📊 {t('parent.subjectWiseRankings')}</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border" style={{backgroundColor: '#FFF9C4', borderColor: '#FDD835', borderRadius: '8px'}}>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🥇</div>
                                        <div>
                                            <div className="font-bold" style={{color: '#333333'}}>Mathematics</div>
                                            <div className="text-sm" style={{color: '#757575'}}>{t('parent.doingExcellent')}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold" style={{color: '#F57F17'}}>1st</div>
                                        <div className="text-sm" style={{color: '#757575'}}>{t('parent.outOfTotal', { total: 35 })}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200" style={{borderRadius: '8px'}}>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🥈</div>
                                        <div>
                                            <div className="font-bold" style={{color: '#333333'}}>Physics</div>
                                            <div className="text-sm" style={{color: '#757575'}}>{t('parent.veryGoodPerformance')}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold" style={{color: '#757575'}}>5th</div>
                                        <div className="text-sm" style={{color: '#757575'}}>{t('parent.outOfTotal', { total: 28 })}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 border" style={{backgroundColor: '#FFE0B2', borderColor: '#FFB74D', borderRadius: '8px'}}>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">🥉</div>
                                        <div>
                                            <div className="font-bold" style={{color: '#333333'}}>Chemistry</div>
                                            <div className="text-sm" style={{color: '#757575'}}>{t('parent.goodProgress')}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold" style={{color: '#FF9800'}}>8th</div>
                                        <div className="text-sm" style={{color: '#757575'}}>{t('parent.outOfTotal', { total: 22 })}</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 border" style={{backgroundColor: '#E3F2FD', borderColor: '#90CAF9', borderRadius: '8px'}}>
                                    <div className="flex items-center space-x-3">
                                        <div className="text-2xl">📈</div>
                                        <div>
                                            <div className="font-bold" style={{color: '#333333'}}>Biology</div>
                                            <div className="text-sm" style={{color: '#757575'}}>{t('parent.roomForImprovement')}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold" style={{color: '#0077B6'}}>12th</div>
                                        <div className="text-sm" style={{color: '#757575'}}>{t('parent.outOfTotal', { total: 30 })}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Trends */}
                        <div className="bg-white shadow-sm p-6" style={{borderRadius: '8px'}}>
                            <h2 className="text-2xl font-bold mb-6" style={{color: '#333333'}}>📈 {t('parent.progressTrends')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="text-center p-4" style={{backgroundColor: '#E8F5E9', borderRadius: '8px'}}>
                                    <div className="text-3xl mb-2">⬆️</div>
                                    <div className="text-xl font-bold" style={{color: '#4CAF50'}}>{t('parent.plusPositions', { count: 2 })}</div>
                                    <div style={{color: '#757575'}}>{t('parent.thisMonth')}</div>
                                </div>
                                <div className="text-center p-4" style={{backgroundColor: '#F3E5F5', borderRadius: '8px'}}>
                                    <div className="text-3xl mb-2">🎯</div>
                                    <div className="text-xl font-bold" style={{color: '#673AB7'}}>{t('parent.consistent')}</div>
                                    <div style={{color: '#757575'}}>{t('parent.studyPattern')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Encouragement Message */}
                        <div className="p-6 border" style={{background: 'linear-gradient(to right, #E3F2FD, #F3E5F5)', borderRadius: '8px', borderColor: '#90CAF9'}}>
                            <div className="text-center">
                                <div className="text-4xl mb-4">🌟</div>
                                <div className="text-xl font-bold mb-2" style={{color: '#333333'}}>
                                    {t('parent.encouragementTitle')}
                                </div>
                                <div style={{color: '#757575'}}>
                                    {t('parent.encouragementBody', { name: childData.name.split(' ')[0] })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="fixed bottom-6 right-6">
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">{t('parent.needHelp')}</div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                            📞 {t('parent.contactTeacher')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentsDashboard;