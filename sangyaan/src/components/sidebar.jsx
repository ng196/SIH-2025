import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './TeacherSidebar.css';

const TeacherSidebar = ({ activeTab, onTabChange, isCollapsed, onToggle }) => {
    const sidebarItems = [
        {
            id: 'overview',
            name: 'Overview',
            icon: '📊',
            description: 'Dashboard overview'
        },
        {
            id: 'students',
            name: 'Students',
            icon: '👥',
            description: 'Student management'
        },
        {
            id: 'classes',
            name: 'Classes',
            icon: '🏫',
            description: 'Class management'
        },
        {
            id: 'leaderboard',
            name: 'Leaderboard',
            icon: '🏆',
            description: 'Top performers'
        }
    ];

    const [expandedGroups, setExpandedGroups] = React.useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleGroupToggle = (groupId) => {
        setExpandedGroups(prev =>
            prev.includes(groupId)
                ? prev.filter(id => id !== groupId)
                : [...prev, groupId]
        );
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavItemClick = (itemId) => {
        onTabChange(itemId);
        // Close mobile menu after selection on mobile screens
        setIsMobileMenuOpen(false);
    };

    const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

    return (
        <>
            {/* Mobile Hamburger Menu Button - Only visible on small screens */}
            <button 
                className="mobile-menu-btn md:hidden"
                onClick={handleMobileMenuToggle}
                aria-label="Toggle navigation menu"
            >
                <div className="hamburger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            {/* Mobile Overlay - Only visible when menu is open on small screens */}
            {isMobileMenuOpen && (
                <div 
                    className="mobile-overlay md:hidden"
                    onClick={handleMobileMenuToggle}
                />
            )}

            {/* Sidebar */}
            <div className={`teacher-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
                <div className="brand">
                    <span className="brand-icon">🎓</span>
                    {!isCollapsed && <span className="brand-text">Teacher Portal</span>}
                </div>
                <button className="toggle-btn" onClick={onToggle}>
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="sidebar-nav">
                {sidebarItems.map((item) => (
                    <div key={item.id} className="nav-item-container">
                        {item.children ? (
                            <>
                                <button
                                    className={`nav-item group-item ${expandedGroups.includes(item.id) ? 'expanded' : ''}`}
                                    onClick={() => handleGroupToggle(item.id)}
                                    title={isCollapsed ? item.name : ''}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    {!isCollapsed && (
                                        <>
                                            <span className="nav-text">{item.name}</span>
                                            <span className="expand-icon">
                                                {expandedGroups.includes(item.id) ? '▼' : '▶'}
                                            </span>
                                        </>
                                    )}
                                </button>
                                {expandedGroups.includes(item.id) && !isCollapsed && (
                                    <div className="nav-children">
                                        {item.children.map((child) => (
                                            <button
                                                key={child.id}
                                                className={`nav-item child-item ${activeTab === child.id ? 'active' : ''}`}
                                                onClick={() => handleNavItemClick(child.id)}
                                            >
                                                <span className="nav-icon">{child.icon}</span>
                                                <span className="nav-text">{child.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <button
                                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => handleNavItemClick(item.id)}
                                title={isCollapsed ? item.name : ''}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {!isCollapsed && <span className="nav-text">{item.name}</span>}
                            </button>
                        )}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                {!isCollapsed && (
                    <div className="language-switcher" style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>Language</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`px-2 py-1 rounded ${currentLanguage === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                title={availableLanguages?.en?.name}
                            >EN</button>
                            <button
                                onClick={() => changeLanguage('hi')}
                                className={`px-2 py-1 rounded ${currentLanguage === 'hi' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                title={availableLanguages?.hi?.name}
                            >हिं</button>
                        </div>
                    </div>
                )}
                <div className="user-info">
                    <div className="user-avatar">👨‍🏫</div>
                    {!isCollapsed && (
                        <div className="user-details">
                            <span className="user-name">Dr. Smith</span>
                            <span className="user-role">Teacher</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default TeacherSidebar;