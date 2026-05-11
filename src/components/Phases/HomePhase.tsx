import React from "react";
import { motion } from "motion/react";

type HomePhaseProps = {
  key?: React.Key;
  onStart: () => void;
};

export function HomePhase({ onStart }: HomePhaseProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-32 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img
          alt="Background texture"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCTiPpqmk0DXNTZ12bmJmQU9bIDITOQjsedikTlujaLorMtD9qJEg_FKJ_5iezo2AyllP4E8ELOCNX8j-tb3vv3ascVGALQXmrRO807sD7BLjS6bWVNK68dslPRfXq40OYW7puifmc8yQdNwpwDBQYEhXAFlcoRJSCYZDn0yvQEk4X5oQgggCV5nPzkmbQj0Sh1tYuKhv3AIJiHEvUpDO0nktHWAR0zWKIII7fhrgItksNuBfJdLOwczacWEET3_IG0Qkkb8_Z-SU"
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl mb-12">
        <h1 className="font-headline text-5xl md:text-7xl font-light mb-4 tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-[#7A581F] via-[#D81B60] to-[#14B8A6] drop-shadow-sm">
          INSPIRAME
        </h1>
        <p className="text-[#7A581F] font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-8">
          Despierta tu genio interior. Tu viaje creativo comienza aqu&iacute;.
        </p>
      </div>

      <div className="relative z-10 w-64 h-64 md:w-96 md:h-96 flex items-center justify-center mb-16">
        <img
          alt="Mandala"
          className="w-full h-full object-contain mandala-glow scale-110"
          src="/Mandala.svg"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <button
          onClick={onStart}
          className="group relative px-10 py-5 rounded-sm font-light tracking-wide uppercase text-sm transition-all duration-500 hover:-translate-y-1 active:scale-95 btn-alquimia"
        >
          <div className="absolute inset-0 rounded-sm bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          EMPEZAR ACTIVIDAD CREATIVA
        </button>
        <p className="text-on-surface-variant/60 font-headline italic text-lg">
          "Todo lo que puedas imaginar es real."
        </p>
      </div>

      <div className="absolute bottom-20 left-10 md:left-20 opacity-30 pointer-events-none rotate-12">
        <span
          className="material-symbols-outlined text-9xl text-primary-container"
          style={{ fontVariationSettings: "'wght' 100" }}
        >
          eco
        </span>
      </div>
      <div className="absolute top-40 right-10 md:right-20 opacity-20 pointer-events-none -rotate-12">
        <span
          className="material-symbols-outlined text-8xl text-secondary"
          style={{ fontVariationSettings: "'wght' 100" }}
        >
          filter_vintage
        </span>
      </div>
    </motion.main>
  );
}
