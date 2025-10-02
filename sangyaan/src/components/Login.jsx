/**
 * Interactive Gamified Login Component
 * 
 * Purpose: Beautiful, gamified step-by-step login process with multiple authentication methods
 * Features:
 * - Gamified UI with animations and mascot guide
 * - Gmail login
 * - Phone number login
 * - School ID login (Student/Staff)
 * - Interactive step-by-step flow with progress indicators
 * - Responsive design for all devices
 * - Beautiful gradient backgrounds and smooth transitions
 */

import { useState } from 'react';

const Login = ({ onLoginSuccess, onSkipLogin }) => {
    const [currentStep, setCurrentStep] = useState('welcome');
    const [userType, setUserType] = useState('');
    const [credentials, setCredentials] = useState({
        email: '',
        phone: '',
        schoolId: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Dummy credentials for testing
    const dummyCredentials = {
        student: { id: 'student123', password: '1234' },
        staff: { id: 'teacher123', password: '1234' }
    };

    const handleMethodSelect = (method) => {
        setError('');

        if (method === 'gmail') {
            setCurrentStep('gmail');
        } else if (method === 'phone') {
            setCurrentStep('phone');
        } else if (method === 'school') {
            setCurrentStep('userType');
        }
    };

    const handleUserTypeSelect = (type) => {
        setUserType(type);
        setCurrentStep('schoolCredentials');
    };

    const handleInputChange = (field, value) => {
        setCredentials(prev => ({
            ...prev,
            [field]: value
        }));
        setError('');
    };

    const handleGmailLogin = async () => {
        setIsLoading(true);
        // Simulate Gmail OAuth
        setTimeout(() => {
            if (credentials.email.includes('@gmail.com')) {
                onLoginSuccess({
                    method: 'gmail',
                    user: {
                        email: credentials.email,
                        name: credentials.email.split('@')[0],
                        type: 'student',
                        avatar: '👨‍🎓'
                    }
                });
            } else {
                setError('Please enter a valid Gmail address');
            }
            setIsLoading(false);
        }, 1500);
    };

    const handlePhoneLogin = async () => {
        setIsLoading(true);
        // Simulate phone verification
        setTimeout(() => {
            if (credentials.phone.length >= 10) {
                onLoginSuccess({
                    method: 'phone',
                    user: {
                        phone: credentials.phone,
                        name: `User ${credentials.phone.slice(-4)}`,
                        type: 'student',
                        avatar: '📱'
                    }
                });
            } else {
                setError('Please enter a valid phone number');
            }
            setIsLoading(false);
        }, 1500);
    };

    const handleSchoolLogin = async () => {
        setIsLoading(true);
        setTimeout(() => {
            const expectedCreds = dummyCredentials[userType];

            if (credentials.schoolId === expectedCreds.id && credentials.password === expectedCreds.password) {
                onLoginSuccess({
                    method: 'school',
                    user: {
                        schoolId: credentials.schoolId,
                        name: userType === 'student' ? 'Alex Johnson' : 'Dr. Sarah Wilson',
                        type: userType,
                        avatar: userType === 'student' ? '👨‍🎓' : '👩‍🏫'
                    }
                });
            } else {
                setError('Invalid credentials. Try student123/1234 or teacher123/1234');
            }
            setIsLoading(false);
        }, 1500);
    };

    const goBack = () => {
        if (currentStep === 'gmail' || currentStep === 'phone' || currentStep === 'userType') {
            setCurrentStep('welcome');
        } else if (currentStep === 'schoolCredentials') {
            setCurrentStep('userType');
        }
        setError('');
    };

    const renderWelcomeStep = () => (
        <div className="text-center space-y-6 animate-fade-in">
            {/* Mascot */}
            <div className="mb-6">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto animate-bounce-slow shadow-lg">
                    <span className="text-5xl">🦉</span>
                </div>
            </div>
            
            <div className="mb-8">
                <h1 className="text-3xl font-semibold mb-4 text-gray-800">
                    Welcome to{' '}
                    <span className="text-blue-600">
                        SANGYAAN
                    </span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                    I'm <strong className="text-blue-600">Owly</strong>, your learning companion! 🎓
                    <br />
                    Let's set up your learning journey in just a few steps
                </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
                <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>

            <div className="space-y-4">
                {/* Login Options */}
                <button
                    onClick={() => handleMethodSelect('school')}
                    className="w-full bg-blue-600 text-white p-5 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg min-h-[60px]"
                >
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-3xl">🏫</span>
                        <div className="text-left">
                            <p className="font-semibold text-lg">School Account</p>
                            <p className="text-sm opacity-90">Connect with your school</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => handleMethodSelect('gmail')}
                    className="w-full bg-white text-gray-700 p-5 rounded-lg hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 transition-all transform hover:scale-105 shadow-md hover:shadow-lg min-h-[60px]"
                >
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-3xl">📧</span>
                        <div className="text-left">
                            <p className="font-semibold text-lg">Google Account</p>
                            <p className="text-sm opacity-70">Quick & secure login</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => handleMethodSelect('phone')}
                    className="w-full bg-white text-gray-700 p-5 rounded-lg hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 transition-all transform hover:scale-105 shadow-md hover:shadow-lg min-h-[60px]"
                >
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-3xl">📱</span>
                        <div className="text-left">
                            <p className="font-semibold text-lg">Phone Number</p>
                            <p className="text-sm opacity-70">SMS verification</p>
                        </div>
                    </div>
                </button>
            </div>

            {/* Skip Login Option */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                    onClick={onSkipLogin}
                    className="w-full p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105 min-h-[48px]"
                >
                    <span className="text-lg">👋</span> Continue as Guest
                </button>
                <p className="text-xs text-gray-500 mt-3">
                    You can always log in later from settings
                </p>
            </div>
        </div>
    );

    const renderGmailStep = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow shadow-lg">
                    <span className="text-3xl">📧</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Google Login</h2>
                <p className="text-gray-600">Connect with your Google account</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>

            {/* Security Info */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-4 mb-4">
                    <span className="text-4xl">🔒</span>
                    <div>
                        <p className="font-semibold text-gray-800">Secure & Private</p>
                        <p className="text-sm text-gray-600">We only access your basic profile info</p>
                    </div>
                </div>
                
                <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span>Name and profile picture</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span>Email address (for account recovery)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="text-red-600">✗</span>
                        <span>No access to emails or personal data</span>
                    </li>
                </ul>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gmail Address</label>
                <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="w-full p-4 bg-white border-2 border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-all min-h-[48px]"
                />
            </div>

            {error && (
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-700 text-sm">
                    <span className="font-semibold">⚠️ {error}</span>
                </div>
            )}

            <div className="flex space-x-3">
                <button
                    onClick={goBack}
                    className="flex-1 p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105 min-h-[48px]"
                >
                    ← Back
                </button>
                <button
                    onClick={handleGmailLogin}
                    disabled={!credentials.email || isLoading}
                    className="flex-1 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-md min-h-[48px]"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <span className="animate-pulse">Signing in...</span>
                        </span>
                    ) : (
                        <span className="flex items-center justify-center space-x-2">
                            <span>Continue</span>
                            <span>🚀</span>
                        </span>
                    )}
                </button>
            </div>
        </div>
    );

    const renderPhoneStep = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce shadow-lg">
                    <span className="text-3xl">📱</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Phone Verification</h2>
                <p className="text-gray-600">We'll send you a verification code</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>

            {/* SMS Info */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-4">
                    <span className="text-3xl">💬</span>
                    <div>
                        <p className="font-semibold text-gray-800">SMS Verification</p>
                        <p className="text-sm text-gray-600">We'll send a 6-digit code to verify your number</p>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                    <input
                        type="tel"
                        value={credentials.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full p-4 bg-white border-2 border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-all min-h-[48px]"
                    />
                    <div className="absolute right-4 top-4 text-2xl pointer-events-none">📞</div>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-700 text-sm">
                    <span className="font-semibold">⚠️ {error}</span>
                </div>
            )}

            <div className="flex space-x-3">
                <button
                    onClick={goBack}
                    className="flex-1 p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105 min-h-[48px]"
                >
                    ← Back
                </button>
                <button
                    onClick={handlePhoneLogin}
                    disabled={!credentials.phone || isLoading}
                    className="flex-1 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-md min-h-[48px]"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <span className="animate-pulse">Verifying...</span>
                        </span>
                    ) : (
                        <span className="flex items-center justify-center space-x-2">
                            <span>Send Code</span>
                            <span>📨</span>
                        </span>
                    )}
                </button>
            </div>
        </div>
    );

    const renderUserTypeStep = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow shadow-lg">
                    <span className="text-3xl">🔐</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose Your Login</h2>
                <p className="text-gray-600">Are you a student or staff member?</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>

            <div className="space-y-4">
                <button
                    onClick={() => handleUserTypeSelect('student')}
                    className="w-full bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md hover:shadow-lg min-h-[72px]"
                >
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-4xl">👨‍🎓</span>
                        <div className="text-left">
                            <p className="font-semibold text-lg">Student</p>
                            <p className="text-sm opacity-90">Join as a learner</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => handleUserTypeSelect('staff')}
                    className="w-full bg-white text-gray-700 p-6 rounded-lg hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 transition-all transform hover:scale-105 shadow-md hover:shadow-lg min-h-[72px]"
                >
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-4xl">👩‍🏫</span>
                        <div className="text-left">
                            <p className="font-semibold text-lg">Staff</p>
                            <p className="text-sm opacity-70">Join as an educator</p>
                        </div>
                    </div>
                </button>
            </div>

            <button
                onClick={goBack}
                className="w-full p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105 min-h-[48px]"
            >
                ← Back
            </button>
        </div>
    );

    const renderSchoolCredentialsStep = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-wiggle shadow-lg">
                    <span className="text-3xl">{userType === 'student' ? '👨‍🎓' : '👩‍🏫'}</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {userType === 'student' ? 'Student' : 'Staff'} Login
                </h2>
                <p className="text-gray-600">Enter your school credentials</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-8 h-2 bg-green-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {userType === 'student' ? 'Student ID' : 'Staff ID'}
                    </label>
                    <input
                        type="text"
                        value={credentials.schoolId}
                        onChange={(e) => handleInputChange('schoolId', e.target.value)}
                        placeholder={userType === 'student' ? 'student123' : 'teacher123'}
                        className="w-full p-4 bg-white border-2 border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 transition-all min-h-[48px]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        value={credentials.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="••••"
                        className="w-full p-4 bg-white border-2 border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 transition-all min-h-[48px]"
                    />
                </div>
            </div>

            {/* Demo credentials info */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-800 font-semibold mb-2">🎮 Demo Credentials:</p>
                <div className="text-sm text-gray-600 space-y-1">
                    <p>Student: <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200">student123</span> / <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200">1234</span></p>
                    <p>Staff: <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200">teacher123</span> / <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200">1234</span></p>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-lg text-red-700 text-sm">
                    <span className="font-semibold">⚠️ {error}</span>
                </div>
            )}

            <div className="flex space-x-3">
                <button
                    onClick={goBack}
                    className="flex-1 p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105 min-h-[48px]"
                >
                    ← Back
                </button>
                <button
                    onClick={handleSchoolLogin}
                    disabled={!credentials.schoolId || !credentials.password || isLoading}
                    className="flex-1 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-md min-h-[48px]"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <span className="animate-pulse">Signing in...</span>
                        </span>
                    ) : (
                        <span className="flex items-center justify-center space-x-2">
                            <span>Login</span>
                            <span>🎉</span>
                        </span>
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-float"></div>
                <div className="absolute top-32 right-20 w-16 h-16 bg-blue-300/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-100/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-32 right-1/3 w-12 h-12 bg-green-200/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-blue-400/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-2/3 right-10 w-20 h-20 bg-blue-300/20 rounded-full animate-float" style={{ animationDelay: '2.5s' }}></div>
            </div>

            {/* Main Login Card */}
            <div className="bg-white backdrop-blur-lg rounded-lg shadow-xl p-8 w-full max-w-md border border-gray-200 relative z-10">
                {currentStep === 'welcome' && renderWelcomeStep()}
                {currentStep === 'gmail' && renderGmailStep()}
                {currentStep === 'phone' && renderPhoneStep()}
                {currentStep === 'userType' && renderUserTypeStep()}
                {currentStep === 'schoolCredentials' && renderSchoolCredentialsStep()}
            </div>
        </div>
    );
};

export default Login;