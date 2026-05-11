import React from "react";

type NavProps = {
  currentPhase: number;
  onPhaseChange?: (phase: number) => void;
};

export function BottomNav({ currentPhase, onPhaseChange }: NavProps) {
  const getNavClass = (phase: number) => {
    return currentPhase === phase
      ? "flex flex-col items-center justify-center bg-primary text-white px-6 py-3 rounded-sm shadow-xl scale-105 transition-all z-10"
      : "flex flex-col items-center justify-center text-on-surface/40 px-5 py-2 hover:text-black transition-colors";
  };

  const IconSpan = ({
    icon,
    isActive,
  }: {
    icon: string;
    isActive: boolean;
  }) => (
    <span
      className="material-symbols-outlined"
      style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
    >
      {icon}
    </span>
  );

  return (
    <div className="fixed bottom-0 w-full z-50 h-24 group flex flex-col justify-end">
      <nav className="w-full flex justify-around items-center px-4 pb-8 pt-4 bg-surface/90 backdrop-blur-xl border-t border-black/5 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 will-change-transform">
        <button onClick={() => onPhaseChange?.(0)} className={getNavClass(0)}>
          <IconSpan
            icon="lightbulb"
            isActive={currentPhase === 0 || currentPhase === 1}
          />
          <span className="font-sans text-[10px] uppercase tracking-widest font-bold mt-1">
            Idea
          </span>
        </button>
        <button onClick={() => onPhaseChange?.(2)} className={getNavClass(2)}>
          <IconSpan icon="hub" isActive={currentPhase === 2} />
          <span className="font-sans text-[10px] uppercase tracking-widest font-bold mt-1">
            Conexiones
          </span>
        </button>
        <button onClick={() => onPhaseChange?.(2)} className={getNavClass(-1)}>
          <IconSpan icon="gesture" isActive={false} />
          <span className="font-sans text-[10px] uppercase tracking-widest font-bold mt-1">
            Figura
          </span>
        </button>
        <button onClick={() => onPhaseChange?.(3)} className={getNavClass(3)}>
          <IconSpan icon="auto_stories" isActive={currentPhase === 3} />
          <span className="font-sans text-[10px] uppercase tracking-widest font-bold mt-1">
            Reflexión
          </span>
        </button>
      </nav>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 mb-1 bg-black/20 rounded-full group-hover:opacity-0 transition-opacity cursor-pointer"></div>
    </div>
  );
}
