import React, { useState, useEffect } from 'react';
import { studentDb } from '../db.js';
import TeacherSidebar from './sidebar.jsx';
import TeacherClassDetail from './TeacherClassDetail.jsx';
import { useLanguage } from '../contexts/LanguageContext';

const TeacherDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [studentsData, setStudentsData] = useState([]);
    const [view, setView] = useState('dashboard'); // dashboard | classDetail
    const [selectedClass, setSelectedClass] = useState(null);
    const [statsData, setStatsData] = useState({
        totalStudents: 0,
        activeStudents: 0,
        averageProgress: 0,
        averageStudyTime: '0.0',
        needAttention: 0
    });
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    // Sample teacher classes
    const teacherClasses = [
        {
            id: 'tc1',
            className: 'Mathematics - Grade 10',
            subject: 'mathematics',
            totalStudents: 35,
            schedule: 'Mon, Wed, Fri 9:00 AM',
            room: 'Room 201',
            nextClass: 'Today 9:00 AM',
            status: 'Active',
        },
        {
            id: 'tc2',
            className: 'Physics - Grade 11',
            subject: 'physics',
            totalStudents: 28,
            schedule: 'Tue, Thu 11:00 AM',
            room: 'Room 305',
            nextClass: 'Tomorrow 11:00 AM',
            status: 'Active',
        },
        {
            id: 'tc3',
            className: 'Chemistry - Grade 12',
            subject: 'chemistry',
            totalStudents: 22,
            schedule: 'Mon, Wed, Fri 2:00 PM',
            room: 'Room 401',
            nextClass: 'Monday 2:00 PM',
            status: 'Upcoming',
        },
    ];

    // Initialize data from IndexedDB
    useEffect(() => {
        const initializeData = async () => {
            try {
                // Ensure mock data exists for prototype
                await studentDb.initializeMockData();

                // Load students data
                const students = await studentDb.getAllStudents();
                setStudentsData(students);

                // Calculate stats
                const stats = await studentDb.getStudentStats();
                setStatsData(stats);
                
                setIsLoading(false);
            } catch (error) {
                console.error('Error initializing dashboard data:', error);
                setIsLoading(false);
            }
        };

        initializeData();
    }, []);

    const handleClassClick = (classData) => {
        setSelectedClass(classData);
        setView('classDetail');
    };

    const handleBackToDashboard = () => {
        setView('dashboard');
        setSelectedClass(null);
    };

    // Filter students based on search
    const filteredStudents = studentsData.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get top performers for leaderboard
    const topPerformers = [...studentsData]
        .sort((a, b) => b.progress - a.progress)
        .slice(0, 10);

    // Get students needing attention
    const studentsNeedingAttention = studentsData.filter(student => 
        student.progress < 50 || student.status === 'Inactive'
    );

    // Calculate class analytics
    const classAnalytics = {
        averageScore: Math.round((studentsData.reduce((sum, student) => sum + (student.progress || 0), 0) / (studentsData.length || 1)) || 0),
        topScore: studentsData.length ? Math.max(...studentsData.map(s => s.progress || 0)) : 0,
        activeToday: studentsData.filter(s => s.lastActive === 'Today').length,
        weeklyGrowth: studentsData.filter(s => (s.progress || 0) > 70).length
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">Loading dashboard...</div>
            </div>
        );
    }

    // Render class detail view
    if (view === 'classDetail' && selectedClass) {
        return (
            <TeacherClassDetail
                classData={selectedClass}
                onBack={handleBackToDashboard}
                onNavigate={(page) => {
                    // Navigate to other app pages if needed
                    console.log('Navigate to:', page);
                }}
            />
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <TeacherSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-72'} ml-0`}>
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-4 md:pl-6 pl-16">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{t('teacher.headerTitle')}</h1>
                            <p className="text-gray-600 mt-1 text-sm md:text-base">Dr. Smith</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-700 text-sm md:text-base hidden sm:inline">John Smith</span>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{backgroundColor: '#0055A4'}}>
                                    👨‍🏫
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-4 md:p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-4 md:space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                <div className="bg-white shadow-sm p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 flex items-center justify-center text-white text-xl" style={{backgroundColor: '#0055A4', borderRadius: '8px'}}>
                                            👥
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold" style={{color: '#333333'}}>{statsData.totalStudents}</h3>
                                            <p className="text-sm" style={{color: '#757575'}}>{t('teacher.totalStudents')}</p>
                                            <p className="text-xs mt-1" style={{color: '#4CAF50'}}>+2 this week</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white shadow-sm p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 flex items-center justify-center text-white text-xl" style={{backgroundColor: '#4CAF50', borderRadius: '8px'}}>
                                            📈
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold" style={{color: '#333333'}}>{statsData.averageProgress}%</h3>
                                            <p className="text-sm" style={{color: '#757575'}}>{t('teacher.avgProgress')}</p>
                                            <p className="text-xs mt-1" style={{color: '#4CAF50'}}>+5% from last week</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white shadow-sm p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 flex items-center justify-center text-white text-xl" style={{backgroundColor: '#FF9800', borderRadius: '8px'}}>
                                            ⏱️
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold" style={{color: '#333333'}}>{statsData.averageStudyTime}h</h3>
                                            <p className="text-sm" style={{color: '#757575'}}>{t('teacher.avgWeeklyStudy')}</p>
                                            <p className="text-xs mt-1" style={{color: '#4CAF50'}}>+0.5h from last week</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white shadow-sm p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 flex items-center justify-center text-white text-xl" style={{backgroundColor: '#F44336', borderRadius: '8px'}}>
                                            ⚠️
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-2xl font-bold" style={{color: '#333333'}}>{statsData.needAttention}</h3>
                                            <p className="text-sm" style={{color: '#757575'}}>{t('teacher.needAttention')}</p>
                                            <p className="text-xs mt-1" style={{color: '#4CAF50'}}>-2 from last week</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Section */}
                            <div className="bg-white shadow-sm p-4 md:p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 md:mb-6">
                                    <h2 className="text-lg md:text-xl font-bold" style={{color: '#333333'}}>{t('teacher.classPerformance')}</h2>
                                    <select className="px-3 py-2 border border-gray-300 text-sm w-full sm:w-auto" style={{borderRadius: '8px'}}>
                                        <option>Last 7 days</option>
                                        <option>Last 30 days</option>
                                        <option>Last 90 days</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
                                    <div className="text-center p-4" style={{backgroundColor: '#E3F2FD', borderRadius: '8px'}}>
                                        <div className="text-2xl font-bold" style={{color: '#0055A4'}}>{classAnalytics.averageScore}%</div>
                                        <div className="text-sm" style={{color: '#757575'}}>{t('teacher.classAverage')}</div>
                                    </div>
                                    <div className="text-center p-4" style={{backgroundColor: '#E8F5E9', borderRadius: '8px'}}>
                                        <div className="text-2xl font-bold" style={{color: '#4CAF50'}}>{classAnalytics.topScore}%</div>
                                        <div className="text-sm" style={{color: '#757575'}}>{t('teacher.highestScore')}</div>
                                    </div>
                                    <div className="text-center p-4" style={{backgroundColor: '#EDE7F6', borderRadius: '8px'}}>
                                        <div className="text-2xl font-bold" style={{color: '#673AB7'}}>{classAnalytics.activeToday}</div>
                                        <div className="text-sm" style={{color: '#757575'}}>{t('teacher.activeToday')}</div>
                                    </div>
                                    <div className="text-center p-4" style={{backgroundColor: '#FFF3E0', borderRadius: '8px'}}>
                                        <div className="text-2xl font-bold" style={{color: '#FF9800'}}>{classAnalytics.weeklyGrowth}</div>
                                        <div className="text-sm" style={{color: '#757575'}}>{t('teacher.highPerformers')}</div>
                                    </div>
                                </div>
                                <div className="h-32 bg-gray-100 flex items-center justify-center" style={{borderRadius: '8px'}}>
                                    <p className="text-gray-500">📊 Performance trends visualization</p>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white shadow-sm p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                <h2 className="text-xl font-bold mb-4" style={{color: '#333333'}}>{t('teacher.recentActivity')}</h2>
                                <div className="space-y-3">
                                    {studentsData.slice(0, 5).map((student, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50" style={{borderRadius: '8px'}}>
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{backgroundColor: '#0055A4'}}>
                                                    {student.avatar}
                                                </div>
                                                <div>
                                                    <div className="font-semibold" style={{color: '#333333'}}>{student.name}</div>
                                                    <div className="text-sm" style={{color: '#757575'}}>{t('teacher.progress')}: {student.progress}%</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-semibold" style={{color: '#333333'}}>{t('teacher.level')} {student.level}</div>
                                                <div className="text-xs text-gray-500">{student.lastActive}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Students Needing Attention */}
                            {studentsNeedingAttention.length > 0 && (
                                <div className="bg-white shadow-sm p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                    <h2 className="text-xl font-bold mb-4" style={{color: '#333333'}}>⚠️ {t('teacher.studentsNeedingAttention')}</h2>
                                    <div className="space-y-3">
                                        {studentsNeedingAttention.slice(0, 3).map((student, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 border" style={{backgroundColor: '#FFEBEE', borderColor: '#FFCDD2', borderRadius: '8px'}}>
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm" style={{backgroundColor: '#F44336'}}>
                                                        {student.avatar}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold" style={{color: '#333333'}}>{student.name}</div>
                                                        <div className="text-sm" style={{color: '#F44336'}}>
                                                            {student.status === 'Inactive' ? 'Inactive for 5+ days' : `Low progress: ${student.progress}%`}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="text-white px-3 py-1 text-sm" style={{backgroundColor: '#F44336', borderRadius: '8px'}} onMouseOver={(e) => e.target.style.backgroundColor = '#D32F2F'} onMouseOut={(e) => e.target.style.backgroundColor = '#F44336'}>
                                                    {t('teacher.contact')}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Leaderboard Tab */}
                    {activeTab === 'leaderboard' && (
                        <div className="space-y-6">
                            <div className="bg-white shadow-sm p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                <h2 className="text-xl font-bold mb-6" style={{color: '#333333'}}>🏆 {t('teacher.topPerformers')}</h2>
                                <div className="space-y-4">
                                    {topPerformers.map((student, index) => (
                                        <div key={index} className={`flex items-center justify-between p-4 ${
                                            index === 0 ? 'border-2' :
                                            index === 1 ? 'border-2' :
                                            index === 2 ? 'border-2' :
                                            'bg-white border border-gray-200'
                                        }`} style={{
                                            borderRadius: '8px',
                                            backgroundColor: index === 0 ? '#FFF9C4' : index === 1 ? '#F5F5F5' : index === 2 ? '#FFE0B2' : '#FFFFFF',
                                            borderColor: index === 0 ? '#FDD835' : index === 1 ? '#9E9E9E' : index === 2 ? '#FFB74D' : '#E0E0E0'
                                        }}>
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg`} style={{
                                                    backgroundColor: index === 0 ? '#FDD835' : index === 1 ? '#9E9E9E' : index === 2 ? '#FFB74D' : '#0055A4'
                                                }}>
                                                    {index < 3 ? ['🥇', '🥈', '🥉'][index] : index + 1}
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{backgroundColor: '#0055A4'}}>
                                                        {student.avatar}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold" style={{color: '#333333'}}>{student.name}</div>
                                                        <div className="text-sm" style={{color: '#757575'}}>Level {student.level}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold" style={{color: '#333333'}}>{student.progress}%</div>
                                                <div className="text-sm" style={{color: '#757575'}}>💎 {student.gems} {t('teacher.gems')}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Performance Categories */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white shadow-sm p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                    <h3 className="text-lg font-bold mb-4" style={{color: '#4CAF50'}}>🌟 {t('teacher.excellent')}</h3>
                                    <div className="space-y-2">
                                        {studentsData.filter(s => s.progress >= 90).map((student, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span style={{color: '#333333'}}>{student.name}</span>
                                                <span className="font-semibold" style={{color: '#4CAF50'}}>{student.progress}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white shadow-sm p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                    <h3 className="text-lg font-bold mb-4" style={{color: '#0077B6'}}>📈 {t('teacher.good')}</h3>
                                    <div className="space-y-2">
                                        {studentsData.filter(s => s.progress >= 70 && s.progress < 90).map((student, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span style={{color: '#333333'}}>{student.name}</span>
                                                <span className="font-semibold" style={{color: '#0077B6'}}>{student.progress}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white shadow-sm p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                    <h3 className="text-lg font-bold mb-4" style={{color: '#FF9800'}}>📚 {t('teacher.improving')}</h3>
                                    <div className="space-y-2">
                                        {studentsData.filter(s => s.progress >= 50 && s.progress < 70).map((student, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span style={{color: '#333333'}}>{student.name}</span>
                                                <span className="font-semibold" style={{color: '#FF9800'}}>{student.progress}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Students Tab */}
                    {activeTab === 'students' && (
                        <div className="space-y-6">
                            <div className="bg-white shadow-sm border border-gray-200" style={{borderRadius: '8px'}}>
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold" style={{color: '#333333'}}>{t('teacher.studentManagement')}</h2>
                                        <div className="flex space-x-3">
                                            <input
                                                type="text"
                                                placeholder={t('teacher.searchStudents')}
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="px-4 py-2 border border-gray-300 focus:ring-2 focus:border-transparent"
                                                style={{borderRadius: '8px', outline: 'none', boxShadow: 'none'}}
                                                onFocus={(e) => {e.target.style.boxShadow = '0 0 0 2px rgba(0, 85, 164, 0.2)'; e.target.style.borderColor = '#0055A4'}}
                                                onBlur={(e) => {e.target.style.boxShadow = 'none'; e.target.style.borderColor = '#D1D5DB'}}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('teacher.student')}</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('teacher.progress')}</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('teacher.level')}</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('teacher.gemsLabel')}</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('teacher.lastActive')}</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('teacher.status')}</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('teacher.actions')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredStudents.map((student) => (
                                                <tr key={student.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm" style={{backgroundColor: '#0055A4'}}>
                                                                {student.avatar}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium" style={{color: '#333333'}}>{student.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div 
                                                                className="h-2 rounded-full" 
                                                                style={{ width: `${student.progress}%`, backgroundColor: '#0055A4' }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm text-gray-500">{student.progress}%</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{color: '#333333'}}>
                                                        Level {student.level}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{color: '#333333'}}>
                                                        💎 {student.gems}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {student.lastActive}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full`} style={{
                                                            backgroundColor: student.status === 'Active' ? '#E8F5E9' : '#FFEBEE',
                                                            color: student.status === 'Active' ? '#4CAF50' : '#F44336'
                                                        }}>
                                                            {student.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button style={{color: '#0055A4'}} onMouseOver={(e) => e.target.style.color = '#003D7A'} onMouseOut={(e) => e.target.style.color = '#0055A4'} className="mr-3">{t('teacher.view')}</button>
                                                        <button style={{color: '#757575'}} onMouseOver={(e) => e.target.style.color = '#333333'} onMouseOut={(e) => e.target.style.color = '#757575'}>{t('teacher.message')}</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Classes Tab */}
                    {activeTab === 'classes' && (
                        <div className="space-y-6">
                            <div className="bg-white shadow-sm p-6 border border-gray-200" style={{borderRadius: '8px'}}>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold" style={{color: '#333333'}}>{t('teacher.classesManagement')}</h2>
                                    <button className="text-white px-4 py-2 flex items-center space-x-2 transition-colors" style={{backgroundColor: '#0055A4', borderRadius: '8px'}} onMouseOver={(e) => e.target.style.backgroundColor = '#003D7A'} onMouseOut={(e) => e.target.style.backgroundColor = '#0055A4'}>
                                        <span>➕</span>
                                        <span>{t('teacher.createNewClass')}</span>
                                    </button>
                                </div>

                                {/* Class Cards */}
                                <div className="space-y-4">
                                    {teacherClasses.map((classData) => (
                                        <div 
                                            key={classData.id}
                                            onClick={() => handleClassClick(classData)}
                                            className="border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
                                            style={{borderRadius: '8px'}}
                                            onMouseOver={(e) => e.target.style.borderColor = '#0055A4'}
                                            onMouseOut={(e) => e.target.style.borderColor = '#E5E7EB'}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-start space-x-4">
                                                    <div className={`w-12 h-12 flex items-center justify-center text-white text-2xl`} style={{
                                                        borderRadius: '8px',
                                                        backgroundColor: classData.subject === 'mathematics' ? '#FF9800' :
                                                                        classData.subject === 'physics' ? '#0055A4' :
                                                                        classData.subject === 'chemistry' ? '#4CAF50' : '#673AB7'
                                                    }}>
                                                        {classData.subject === 'mathematics' ? '🧮' :
                                                         classData.subject === 'physics' ? '⚛️' :
                                                         classData.subject === 'chemistry' ? '🧪' : '📚'}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold" style={{color: '#333333'}}>{classData.className}</h3>
                                                        <p className="text-sm mt-1" style={{color: '#757575'}}>{classData.totalStudents} students • {classData.room} • {classData.schedule}</p>
                                                        <div className="flex space-x-4 mt-2">
                                                            <span className={`px-2 py-1 rounded-full text-xs`} style={{
                                                                backgroundColor: classData.status === 'Active' ? '#E8F5E9' : '#FFF3E0',
                                                                color: classData.status === 'Active' ? '#4CAF50' : '#FF9800'
                                                            }}>
                                                                {classData.status}
                                                            </span>
                                                            <span className="text-gray-500 text-xs">Next: {classData.nextClass}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleClassClick(classData);
                                                        }}
                                                        className="px-3 py-1 text-sm transition-colors"
                                                        style={{color: '#0055A4', backgroundColor: '#E3F2FD', borderRadius: '8px'}}
                                                        onMouseOver={(e) => {e.target.style.backgroundColor = '#BBDEFB'; e.target.style.color = '#003D7A'}}
                                                        onMouseOut={(e) => {e.target.style.backgroundColor = '#E3F2FD'; e.target.style.color = '#0055A4'}}
                                                    >
                                                        📝 Manage
                                                    </button>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleClassClick(classData);
                                                        }}
                                                        className="text-gray-500 hover:text-gray-700 px-3 py-1 text-sm bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                                    >
                                                        👁️ View
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;