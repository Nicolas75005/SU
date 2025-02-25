import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, AlertCircle } from 'lucide-react';
import { signIn } from '../../lib/auth/supabase';
import { loginSchema } from '../../lib/auth/validation';
import { useAuthStore } from '../../lib/auth/session';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate input
      const validatedData = loginSchema.parse({ email, password });

      // Attempt to sign in with Supabase
      await signIn(validatedData.email, validatedData.password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors[0].message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Une erreur est survenue lors de la connexion');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-3xl font-serif text-white">Administration</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-neutral-800/50 rounded-lg p-6 space-y-6">
          {error && (
            <div className="bg-red-900/50 text-red-300 px-4 py-2 rounded-md text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}