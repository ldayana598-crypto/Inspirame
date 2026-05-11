import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

export function AuthModal() {
  const { user, login, logout, showAuthModal, setShowAuthModal } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!showAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      setShowAuthModal(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-surface p-8 rounded-sm shadow-2xl border border-black/5 w-full max-w-md relative"
        >
          <button 
            onClick={() => setShowAuthModal(false)}
            className="absolute top-4 right-4 text-on-surface/50 hover:text-black transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {user ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl text-primary">person</span>
              </div>
              <h2 className="text-2xl font-serif font-light mb-2">Hola, {user.username}</h2>
              <p className="text-sm font-sans opacity-60 mb-8">Tu progreso se guardará en este dispositivo.</p>
              <button
                onClick={logout}
                className="w-full py-3 border border-black/10 rounded-sm font-sans text-xs uppercase tracking-[0.2em] hover:bg-black/5 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="text-center mb-4">
                <h2 className="text-3xl font-serif font-light mb-2">Iniciar Sesión</h2>
                <p className="text-sm font-sans opacity-60 italic">Guarda tus destellos creativos</p>
              </div>

              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] opacity-50">Usuario</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-surface px-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-primary transition-colors text-sm font-sans"
                    placeholder="Tu nombre o alias"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] opacity-50">Contraseña</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-surface px-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-primary transition-colors text-sm font-sans"
                    placeholder="••••••••"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 text-white rounded-sm font-sans text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg mt-2 btn-alquimia"
              >
                Entrar
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
