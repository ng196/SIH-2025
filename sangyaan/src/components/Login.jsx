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
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto animate-bounce-slow shadow-2xl">
                    <span className="text-5xl">🦉</span>
                </div>
            </div>
            
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">
                    Welcome to{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        STEM Quest!
                    </span>
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">
                    I'm <strong className="text-yellow-400">Owly</strong>, your learning companion! 🎓
                    <br />
                    Let's set up your amazing STEM adventure in just a few fun steps!
                </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
                <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>

            <div className="space-y-4">
                {/* Login Options */}
                <button
                    onClick={() => handleMethodSelect('school')}
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white p-6 rounded-2xl hover:from-green-500 hover:to-emerald-600 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                >
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-3xl">🏫</span>
                        <div className="text-left">
                            <p className="font-bold text-lg">School Account</p>
                            <p className="text-sm opacity-90">Connect with your school</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => handleMethodSelect('gmail')}
                    className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white p-6 rounded-2xl hover:from-red-500 hover:to-pink-600 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                >
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-3xl">📧</span>
                        <div className="text-left">
                            <p className="font-bold text-lg">Google Account</p>
                            <p className="text-sm opacity-90">Quick & secure login</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => handleMethodSelect('phone')}
                    className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white p-6 rounded-2xl hover:from-purple-500 hover:to-indigo-600 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                >
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-3xl">📱</span>
                        <div className="text-left">
                            <p className="font-bold text-lg">Phone Number</p>
                            <p className="text-sm opacity-90">SMS verification</p>
                        </div>
                    </div>
                </button>
            </div>

            {/* Skip Login Option */}
            <div className="mt-8 pt-6 border-t border-gray-600">
                <button
                    onClick={onSkipLogin}
                    className="w-full p-4 bg-gray-700 text-gray-300 rounded-xl hover:bg-gray-600 transition-all transform hover:scale-105"
                >
                    <span className="text-lg">👋</span> Continue as Guest
                </button>
                <p className="text-xs text-gray-400 mt-3">
                    You can always log in later from settings
                </p>
            </div>
        </div>
    );

    const renderGmailStep = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow shadow-lg">
                    <span className="text-3xl">📧</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Google Login</h2>
                <p className="text-gray-300">Connect with your Google account</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-8 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>

            {/* Security Info */}
            <div className="bg-gradient-to-r from-red-900/40 to-pink-900/40 p-6 rounded-2xl border-2 border-red-800/50 backdrop-blur-sm">
                <div className="flex items-center space-x-4 mb-4">
                    <span className="text-4xl">🔒</span>
                    <div>
                        <p className="font-bold text-white">Secure & Private</p>
                        <p className="text-sm text-gray-300">We only access your basic profile info</p>
                    </div>
                </div>
                
                <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>Name and profile picture</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>Email address (for account recovery)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <span className="text-red-400">✗</span>
                        <span>No access to emails or personal data</span>
                    </li>
                </ul>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Gmail Address</label>
                <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="w-full p-4 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400 transition-all"
                />
            </div>

            {error && (
                <div className="p-4 bg-red-900/50 border-2 border-red-700 rounded-xl text-red-300 text-sm backdrop-blur-sm">
                    <span className="font-semibold">⚠️ {error}</span>
                </div>
            )}

            <div className="flex space-x-3">
                <button
                    onClick={goBack}
                    className="flex-1 p-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all transform hover:scale-105"
                >
                    ← Back
                </button>
                <button
                    onClick={handleGmailLogin}
                    disabled={!credentials.email || isLoading}
                    className="flex-1 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
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
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce shadow-lg">
                    <span className="text-3xl">📱</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Phone Verification</h2>
                <p className="text-gray-300">We'll send you a verification code</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>

            {/* SMS Info */}
            <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-6 rounded-2xl border-2 border-purple-800/50 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                    <span className="text-3xl">💬</span>
                    <div>
                        <p className="font-bold text-white">SMS Verification</p>
                        <p className="text-sm text-gray-300">We'll send a 6-digit code to verify your number</p>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <div className="relative">
                    <input
                        type="tel"
                        value={credentials.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="w-full p-4 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 transition-all"
                    />
                    <div className="absolute right-4 top-4 text-2xl pointer-events-none">📞</div>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-900/50 border-2 border-red-700 rounded-xl text-red-300 text-sm backdrop-blur-sm">
                    <span className="font-semibold">⚠️ {error}</span>
                </div>
            )}

            <div className="flex space-x-3">
                <button
                    onClick={goBack}
                    className="flex-1 p-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all transform hover:scale-105"
                >
                    ← Back
                </button>
                <button
                    onClick={handlePhoneLogin}
                    disabled={!credentials.phone || isLoading}
                    className="flex-1 p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow shadow-lg">
                    <span className="text-3xl">🔐</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Choose Your Login</h2>
                <p className="text-gray-300">Are you a student or staff member?</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>

            <div className="space-y-4">
                <button
                    onClick={() => handleUserTypeSelect('student')}
                    className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white p-6 rounded-2xl hover:from-blue-500 hover:to-cyan-600 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                >
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-4xl">👨‍🎓</span>
                        <div className="text-left">
                            <p className="font-bold text-lg">Student</p>
                            <p className="text-sm opacity-90">Join as a learner</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => handleUserTypeSelect('staff')}
                    className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white p-6 rounded-2xl hover:from-purple-500 hover:to-pink-600 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl"
                >
                    <div className="flex items-center justify-center space-x-4">
                        <span className="text-4xl">👩‍🏫</span>
                        <div className="text-left">
                            <p className="font-bold text-lg">Staff</p>
                            <p className="text-sm opacity-90">Join as an educator</p>
                        </div>
                    </div>
                </button>
            </div>

            <button
                onClick={goBack}
                className="w-full p-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all transform hover:scale-105"
            >
                ← Back
            </button>
        </div>
    );

    const renderSchoolCredentialsStep = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-wiggle shadow-lg">
                    <span className="text-3xl">{userType === 'student' ? '👨‍🎓' : '👩‍🏫'}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    {userType === 'student' ? 'Student' : 'Staff'} Login
                </h2>
                <p className="text-gray-300">Enter your school credentials</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-8 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {userType === 'student' ? 'Student ID' : 'Staff ID'}
                    </label>
                    <input
                        type="text"
                        value={credentials.schoolId}
                        onChange={(e) => handleInputChange('schoolId', e.target.value)}
                        placeholder={userType === 'student' ? 'student123' : 'teacher123'}
                        className="w-full p-4 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        value={credentials.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="••••"
                        className="w-full p-4 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400 transition-all"
                    />
                </div>
            </div>

            {/* Demo credentials info */}
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 p-4 rounded-2xl border-2 border-blue-800/50 backdrop-blur-sm">
                <p className="text-sm text-white font-semibold mb-2">🎮 Demo Credentials:</p>
                <div className="text-sm text-gray-300 space-y-1">
                    <p>Student: <span className="font-mono bg-gray-700 px-2 py-1 rounded">student123</span> / <span className="font-mono bg-gray-700 px-2 py-1 rounded">1234</span></p>
                    <p>Staff: <span className="font-mono bg-gray-700 px-2 py-1 rounded">teacher123</span> / <span className="font-mono bg-gray-700 px-2 py-1 rounded">1234</span></p>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-900/50 border-2 border-red-700 rounded-xl text-red-300 text-sm backdrop-blur-sm">
                    <span className="font-semibold">⚠️ {error}</span>
                </div>
            )}

            <div className="flex space-x-3">
                <button
                    onClick={goBack}
                    className="flex-1 p-4 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all transform hover:scale-105"
                >
                    ← Back
                </button>
                <button
                    onClick={handleSchoolLogin}
                    disabled={!credentials.schoolId || !credentials.password || isLoading}
                    className="flex-1 p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
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
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-blue-500 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/30 rounded-full animate-float"></div>
                <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-32 right-1/3 w-12 h-12 bg-green-300/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-300/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-2/3 right-10 w-20 h-20 bg-orange-300/30 rounded-full animate-float" style={{ animationDelay: '2.5s' }}></div>
            </div>

            {/* Main Login Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border-2 border-white/20 relative z-10">
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