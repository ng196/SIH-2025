/**
 * Interactive Login Component
 * 
 * Purpose: Step-by-step login process with multiple authentication methods
 * Features:
 * - Gmail login
 * - Phone number login
 * - School ID login (Student/Staff)
 * - Interactive step-by-step flow
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
        <div className="text-center space-y-8">
            <div className="mb-8">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🎓</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome to STEM Quest</h1>
                <p className="text-gray-300">Choose your preferred login method</p>
            </div>

            <div className="space-y-4">
                <button
                    onClick={() => handleMethodSelect('gmail')}
                    className="w-full p-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all flex items-center justify-center space-x-3"
                >
                    <span className="text-2xl">📧</span>
                    <span className="font-semibold">Continue with Gmail</span>
                </button>

                <button
                    onClick={() => handleMethodSelect('phone')}
                    className="w-full p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all flex items-center justify-center space-x-3"
                >
                    <span className="text-2xl">📱</span>
                    <span className="font-semibold">Continue with Phone</span>
                </button>

                <button
                    onClick={() => handleMethodSelect('school')}
                    className="w-full p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center space-x-3"
                >
                    <span className="text-2xl">🏫</span>
                    <span className="font-semibold">School ID Login</span>
                </button>
            </div>

            {/* Skip Login Option */}
            <div className="mt-6">
                <button
                    onClick={onSkipLogin}
                    className="w-full p-3 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 transition-all"
                >
                    Continue as Guest
                </button>
                <p className="text-xs text-gray-400 mt-2">
                    You can always log in later from settings
                </p>
            </div>
        </div>
    );

    const renderGmailStep = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📧</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Gmail Login</h2>
                <p className="text-gray-300">Enter your Gmail address</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Gmail Address</label>
                <input
                    type="email"
                    value={credentials.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="w-full p-3 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400"
                />
            </div>

            {error && (
                <div className="p-3 bg-red-900 border border-red-700 rounded-lg text-red-300 text-sm">
                    {error}
                </div>
            )}

            <div className="flex space-x-3">
                <button
                    onClick={goBack}
                    className="flex-1 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
                >
                    Back
                </button>
                <button
                    onClick={handleGmailLogin}
                    disabled={!credentials.email || isLoading}
                    className="flex-1 p-3 bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-50 transition"
                >
                    {isLoading ? 'Signing in...' : 'Continue'}
                </button>
            </div>
        </div>
    );

    const renderPhoneStep = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📱</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Phone Login</h2>
                <p className="text-gray-300">Enter your phone number</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input
                    type="tel"
                    value={credentials.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-3 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-400"
                />
            </div>

            {error && (
                <div className="p-3 bg-red-900 border border-red-700 rounded-lg text-red-300 text-sm">
                    {error}
                </div>
            )}

            <div className="flex space-x-3">
                <button
                    onClick={goBack}
                    className="flex-1 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
                >
                    Back
                </button>
                <button
                    onClick={handlePhoneLogin}
                    disabled={!credentials.phone || isLoading}
                    className="flex-1 p-3 bg-green-600 text-white rounded-lg hover:bg-green-500 disabled:opacity-50 transition"
                >
                    {isLoading ? 'Verifying...' : 'Continue'}
                </button>
            </div>
        </div>
    );

    const renderUserTypeStep = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏫</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Select User Type</h2>
                <p className="text-gray-300">Are you a student or staff member?</p>
            </div>

            <div className="space-y-4">
                <button
                    onClick={() => handleUserTypeSelect('student')}
                    className="w-full p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center space-x-3"
                >
                    <span className="text-2xl">👨‍🎓</span>
                    <span className="font-semibold">Student</span>
                </button>

                <button
                    onClick={() => handleUserTypeSelect('staff')}
                    className="w-full p-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-all flex items-center justify-center space-x-3"
                >
                    <span className="text-2xl">👩‍🏫</span>
                    <span className="font-semibold">Staff</span>
                </button>
            </div>

            <button
                onClick={goBack}
                className="w-full p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
            >
                Back
            </button>
        </div>
    );

    const renderSchoolCredentialsStep = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{userType === 'student' ? '👨‍🎓' : '👩‍🏫'}</span>
                </div>
                <h2 className="text-2xl font-bold text-white">{userType === 'student' ? 'Student' : 'Staff'} Login</h2>
                <p className="text-gray-300">Enter your school credentials</p>
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
                        className="w-full p-3 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                    <input
                        type="password"
                        value={credentials.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="1234"
                        className="w-full p-3 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    />
                </div>
            </div>

            <div className="p-3 bg-blue-900 border border-blue-700 rounded-lg text-blue-300 text-sm">
                <strong>Demo Credentials:</strong><br />
                Student: student123 / 1234<br />
                Staff: teacher123 / 1234
            </div>

            {error && (
                <div className="p-3 bg-red-900 border border-red-700 rounded-lg text-red-300 text-sm">
                    {error}
                </div>
            )}

            <div className="flex space-x-3">
                <button
                    onClick={goBack}
                    className="flex-1 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
                >
                    Back
                </button>
                <button
                    onClick={handleSchoolLogin}
                    disabled={!credentials.schoolId || !credentials.password || isLoading}
                    className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 transition"
                >
                    {isLoading ? 'Signing in...' : 'Login'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-600">
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