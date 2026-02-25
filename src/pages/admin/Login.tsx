import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/admin');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-background-dark-page px-lg font-latin">
            <div className="max-w-md w-full">
                <div className="text-center mb-xl">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-md">
                        <Lock className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h1 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100">Admin Login</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-sm">Secure access to portfolio management</p>
                </div>

                <form onSubmit={handleLogin} className="bg-white dark:bg-background-dark-surface p-xl rounded-xl shadow-xl-light dark:shadow-md-dark border border-neutral-200 dark:border-neutral-800 space-y-lg">
                    {error && (
                        <div className="p-md bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md flex items-center space-x-3 text-red-600 dark:text-red-400">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-small font-medium">{error}</span>
                        </div>
                    )}

                    <div>
                        <label className="block text-small font-semibold text-neutral-700 dark:text-neutral-300 mb-xs">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-300 dark:border-neutral-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-small font-semibold text-neutral-700 dark:text-neutral-300 mb-xs">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-background-dark-elevated border border-neutral-300 dark:border-neutral-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all dark:text-white"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-md font-bold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </button>
                </form>

                <p className="text-center mt-xl text-small text-neutral-500">
                    <button onClick={() => navigate('/')} className="hover:text-primary-600 transition-colors">
                        Return to Public Site
                    </button>
                </p>
            </div>
        </div>
    );
}
