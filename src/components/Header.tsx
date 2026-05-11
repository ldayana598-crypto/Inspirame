import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { StorageService } from "../services/StorageService";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const { user, setShowAuthModal } = useAuth();
  const [showSessions, setShowSessions] = useState(false);

  const sessions = user ? StorageService.getSessions(user.id) : [];

  return (
    <div className="fixed top-0 w-full z-50 h-16 group">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 mt-1 bg-black/20 rounded-full group-hover:opacity-0 transition-opacity cursor-pointer"></div>
      <header className="w-full flex justify-between items-center px-8 py-6 glass-surface border-b border-black/5 -translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 will-change-transform backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button className="text-primary hover:opacity-80 transition-opacity active:scale-95 duration-300">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
          <span className="text-xl text-on-surface font-headline font-light italic tracking-tight">
            {user ? user.username : "Inicia Sesión"}
          </span>
        </div>
        <div className="flex items-center gap-6 relative">
          <button 
            onClick={() => {
              if (!user) setShowAuthModal(true);
              else setShowSessions(!showSessions);
            }}
            className="text-on-surface hover:text-primary transition-colors flex items-center justify-center relative group/btn" 
            title="Ver sesiones anteriores"
          >
            <span className="material-symbols-outlined text-2xl">book_2</span>
            {user && sessions.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>}
            <span className="absolute top-10 right-0 bg-black text-white text-[10px] uppercase tracking-[0.2em] px-3 py-2 rounded-sm opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Sesiones Guardadas
            </span>
          </button>

          <AnimatePresence>
            {showSessions && user && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-12 right-12 w-80 bg-white rounded-sm shadow-2xl border border-black/5 flex flex-col z-50 pointer-events-auto"
              >
                <div className="p-4 border-b border-black/5 flex justify-between items-center bg-surface">
                  <span className="font-serif font-light text-xl">Mis Sesiones</span>
                  <button onClick={() => setShowSessions(false)} className="text-on-surface/50 hover:text-black">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
                <div className="p-4 max-h-[300px] overflow-y-auto flex flex-col gap-4">
                  {sessions.length === 0 ? (
                    <p className="font-sans text-xs opacity-50 text-center py-4">No has guardado nada aún.</p>
                  ) : (
                    sessions.map(s => (
                      <div key={s.id} className="p-3 bg-surface-container-low border border-black/5 rounded-sm">
                        <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                          {new Date(s.date).toLocaleDateString()}
                        </p>
                        <p className="font-serif italic text-sm text-on-surface mb-2 line-clamp-2">
                          "{s.reflection || "Sin texto"}"
                        </p>
                        <div className="flex items-center gap-1">
                          {s.basket.slice(0, 3).map(b => (
                            <span key={b.id} className="text-[10px] font-sans px-1.5 py-0.5 bg-black/5 rounded-sm">
                              {b.value.substring(0, 8)}
                            </span>
                          ))}
                          {s.basket.length > 3 && <span className="text-[10px] opacity-50">+{s.basket.length - 3}</span>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div 
            onClick={() => setShowAuthModal(true)}
            className="w-10 h-10 rounded-full border border-black/10 bg-surface-container-highest overflow-hidden shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all flex items-center justify-center bg-primary/5"
          >
            {user ? (
              <span className="font-sans font-bold text-primary uppercase">{user.username.substring(0, 1)}</span>
            ) : (
              <span className="material-symbols-outlined text-on-surface/50">person</span>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

