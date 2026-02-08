import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-background-dark-page px-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-background-dark-elevated p-xl rounded-xl shadow-lg"
      >
        <h1 className="text-h2 font-bold mb-xl text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-lg">
          <div>
            <label className="block text-small font-medium mb-xs">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-small font-medium mb-xs">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent"
              required
            />
          </div>
          {error && <p className="text-red-500 text-small">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-sm bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
