import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isSignUp, setIsSignUp] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                onLoginSuccess(data.user);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                // You might want to show a message to check email for confirmation
                alert('Sign up successful! Please check your email to confirm.');
                onLoginSuccess(data.user);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-400 to-blue-500 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/30 rounded-full animate-float"></div>
                <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-32 right-1/3 w-12 h-12 bg-green-300/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-300/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-2/3 right-10 w-20 h-20 bg-orange-300/30 rounded-full animate-float" style={{ animationDelay: '2.5s' }}></div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border-2 border-white/20 relative z-10">
                <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto animate-bounce-slow shadow-2xl">
                        <span className="text-5xl">🦉</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-white mt-4">
                        {isSignUp ? 'Create an Account' : 'Welcome Back!'}
                    </h1>
                </div>
                <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@example.com"
                                className="w-full p-4 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full p-4 bg-gray-700 border-2 border-gray-600 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 transition-all"
                            />
                        </div>
                    </div>
                    {error && (
                        <div className="p-4 mt-4 bg-red-900/50 border-2 border-red-700 rounded-xl text-red-300 text-sm backdrop-blur-sm">
                            <span className="font-semibold">⚠️ {error}</span>
                        </div>
                    )}
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
                        >
                            {isSubmitting ? 'Submitting...' : isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-gray-300 hover:text-white"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;