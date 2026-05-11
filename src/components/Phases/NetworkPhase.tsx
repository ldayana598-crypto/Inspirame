import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

type NetworkPhaseProps = {
  key?: React.Key;
  basket: any[];
  onComplete: () => void;
};

// Particles for Star Shower
const StarShower = () => {
  const particles = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 1, 
            y: "50%", 
            x: "50%", 
            scale: 0 
          }}
          animate={{ 
            opacity: [1, 1, 0], 
            y: `${Math.random() * 100}%`, 
            x: `${Math.random() * 100}%`,
            scale: Math.random() * 1.5 + 0.5 
          }}
          transition={{ 
            duration: Math.random() * 2 + 1, 
            ease: "easeOut" 
          }}
          className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
          style={{ top: 0, left: 0 }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: -200 }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 left-1/2 -ml-16 px-4 py-2 bg-stone-900/60 backdrop-blur-md rounded-full text-amber-200 text-xs tracking-widest uppercase border border-amber-500/30"
      >
        Claridad
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: -100, x: 150 }}
        transition={{ duration: 2.5 }}
        className="absolute top-1/2 left-1/2 -ml-16 px-4 py-2 bg-stone-900/60 backdrop-blur-md rounded-full text-[#14B8A6] text-xs tracking-widest uppercase border border-[#14B8A6]/30"
      >
        Eco del Alma
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 100, x: -150 }}
        transition={{ duration: 2.2 }}
        className="absolute top-1/2 left-1/2 -ml-16 px-4 py-2 bg-stone-900/60 backdrop-blur-md rounded-full text-[#D81B60] text-xs tracking-widest uppercase border border-[#D81B60]/30"
      >
        Sinergia
      </motion.div>
    </div>
  );
};

export function NetworkPhase({ basket, onComplete }: NetworkPhaseProps) {
  const [phase, setPhase] = useState<"weaving" | "revealed">("weaving");
  const [starShowerActive, setStarShowerActive] = useState(false);
  const [showWisdom, setShowWisdom] = useState(false);
  const [expandedConcept, setExpandedConcept] = useState<number | null>(null);

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    // Reveal after 4 seconds
    const timer = setTimeout(() => setPhase("revealed"), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleCoreClick = () => {
    if (phase !== "revealed") return;
    setStarShowerActive(true);
    setShowWisdom(true);
    setTimeout(() => setStarShowerActive(false), 3000);
  };

  const getConceptPhrases = (item: any) => {
    let val = item.value.toLowerCase();
    
    // Clean up old Vision formats if any, or adjust new formats
    if (val.startsWith("visión") || val.startsWith("vision")) {
      val = "horizonte anónimo";
    }

    const getWithArticle = (text: string) => {
      const feminineWords = ['montaña', 'lluvia', 'estrella', 'noche', 'aurora', 'nieve', 'tormenta', 'niebla', 'ceniza', 'chispa', 'llama', 'luna', 'galaxia', 'cumbre', 'ilusión', 'verdad', 'mentira', 'magia', 'brisa', 'luz', 'sombra', 'paz', 'bicicleta', 'lámpara', 'taza', 'llave', 'paleta', 'cámara', 'mochila', 'silla', 'puerta', 'moneda', 'bolsa', 'hoja', 'nube', 'casa', 'campana', 'bandera', 'música', 'pieza', 'silueta', 'nebulosa', 'ciudad', 'eternidad', 'esperanza', 'mente'];
      const v = text.toLowerCase();
      // "alma" and "alba" use "el" in singular.
      const isFeminine = feminineWords.some(fw => v.startsWith(fw) || v.includes(' ' + fw + ' '));
      return (isFeminine ? "la " : "el ") + v;
    };

    const valWithArticle = getWithArticle(val);

    // Buscamos otro concepto de la canasta para entrelazarlo
    const otherConcepts = basket.filter(b => b.id !== item.id);
    const otherValRaw = otherConcepts.length > 0 
      ? otherConcepts[Math.floor(Math.random() * otherConcepts.length)].value.toLowerCase() 
      : "eco sideral";
    
    const otherValWithArticle = getWithArticle(otherValRaw);

    const poeticConnectors = [
      "entrelazándose sutilmente con",
      "danzando en la penumbra junto a",
      "despertando la esencia dormida de",
      "quebrantando el horizonte para abrazar",
      "susurrando secretos olvidados a",
      "reflejando la luz oculta de",
      "derritiéndose en el abrazo cálido de"
    ];

    const randomConnector = poeticConnectors[Math.floor(Math.random() * poeticConnectors.length)];

    return [
      `Al contemplar ${valWithArticle}, una chispa invisible rompe la quietud del vacío, ${randomConnector} ${otherValWithArticle} para dar a luz una nueva forma de ver.`,
      `Quizás ${valWithArticle} no sea solo una imagen pasajera, sino un puente de cristal; un espejo donde tus visiones se entrelazan y echan raíces.`,
      `Siente cómo la textura inmaterial de ${valWithArticle} acaricia los bordes de tu imaginación, invitándote a descubrir mundos que aguardaban silenciosos.`
    ];
  };

  const renderStars = () => {
    return Array.from({ length: 60 }).map((_, i) => (
      <div 
        key={i}
        className="absolute bg-white rounded-full opacity-60"
        style={{
          width: Math.random() * 2 + 1 + 'px',
          height: Math.random() * 2 + 1 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          boxShadow: `0 0 ${Math.random() * 6 + 2}px #fff`,
          animation: `pulseLight ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
        }}
      ></div>
    ));
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col min-h-screen z-20 text-amber-100 stars-bg overflow-hidden pt-20" /* pt-20 to leave space for top bar */
    >
      <div className="grain-overlay"></div>
      
      {/* Background Stars layer drifting right slowly */}
      <motion.div 
        animate={{ x: ["0%", "5%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 pointer-events-none w-[110%] h-[110%] -left-[5%] -top-[5%]"
      >
        {renderStars()}
      </motion.div>

      {/* Top Banner Control */}
      <div className="absolute top-0 w-full z-50 flex justify-between items-center px-6 py-6 bg-transparent">
         <button className="text-amber-500 hover:text-white transition-colors" title="Mis Viajes">
           <span className="material-symbols-outlined text-3xl">dashboard</span>
         </button>
         <h1 className="font-serif text-amber-200 text-xl md:text-3xl tracking-widest font-light text-center drop-shadow-md">
            {phase === "weaving" ? "Observando el vacío" : "Mandala de ideas revelándose"}
         </h1>
         <button onClick={onComplete} className="text-amber-500 hover:text-white transition-colors" title="Guardar Reflexión">
           <span className="material-symbols-outlined text-3xl">save</span>
         </button>
      </div>

      {starShowerActive && <StarShower />}

      {showWisdom && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-24 left-1/2 -translate-x-1/2 z-40 crystal-panel p-6 rounded-2xl max-w-sm text-center shadow-2xl mx-4 w-[calc(100%-2rem)]"
        >
          <p className="text-amber-100 font-serif italic text-sm md:text-md leading-relaxed">
            "El universo no está fuera de ti. Mira dentro; todo lo que quieres, ya lo eres."
          </p>
          <button onClick={() => setShowWisdom(false)} className="mt-4 text-[10px] text-amber-500 uppercase tracking-widest hover:text-white">Cerrar</button>
        </motion.div>
      )}

      {/* Center Mandala Area */}
      <div className="flex-grow relative flex items-center justify-center">
        {/* SVG Mandala Art */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-70 mix-blend-screen scale-75 md:scale-100">
          <svg className="w-[600px] h-[600px] animate-[spin_120s_linear_infinite]" fill="none" viewBox="0 0 200 200">
             <path d="M100 0 L115 85 L200 100 L115 115 L100 200 L85 115 L0 100 L85 85 Z" stroke="#7a581f" strokeWidth="0.5" strokeDasharray="2 2" />
             <path d="M29 29 L85 85 M171 29 L115 85 M171 171 L115 115 M29 171 L85 115" stroke="#ecbf7c" strokeWidth="0.5" strokeDasharray="3 3" />
             <circle cx="100" cy="100" r="50" stroke="#7a581f" strokeWidth="0.5" strokeDasharray="4 4" className="energy-path" />
             <circle cx="100" cy="100" r="75" stroke="#ecbf7c" strokeWidth="0.2" className="energy-path" />
          </svg>
        </div>

        {/* Central White Node */}
        <div 
          onClick={handleCoreClick}
          className="pulse-core absolute w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tr from-white to-amber-100 rounded-full shadow-[0_0_50px_rgba(255,255,255,1)] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-500 z-30"
        ></div>

        {/* Outer Nodes orbiting or placed */}
        {basket.map((item, i) => {
          const angle = (i / basket.length) * Math.PI * 2;
          const isMobile = window.innerWidth < 768;
          const rForm = isMobile ? 120 : 180;
          
          // During weaving they are randomly placed around and pulling in
          const rWeave = rForm + 100;
          
          const r = phase === "weaving" ? rWeave : rForm;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;

          return (
             <motion.div
               key={item.id}
               initial={{ x: Math.cos(angle)*300, y: Math.sin(angle)*300, opacity: 0 }}
               animate={{ x, y, opacity: 1 }}
               transition={{ duration: 3, ease: "easeInOut" }}
               className="absolute top-1/2 left-1/2 -ml-3 -mt-3 w-6 h-6 rounded-full bg-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.6)] cursor-pointer hover:w-16 hover:h-16 hover:-ml-8 hover:-mt-8 transition-all duration-500 z-20 hover:bg-stone-900 group flex items-center justify-center border border-amber-400"
             >
                {/* Connecting line to center when hovered (simulated with an absolute div rotating) */}
                <div className="absolute top-1/2 left-1/2 w-0 h-[1px] bg-amber-200/50 origin-left group-hover:w-[150px] transition-all duration-300 pointer-events-none" style={{ transform: `rotate(${angle + Math.PI}rad)` }}></div>
                
                {/* Content revealed on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full overflow-hidden flex items-center justify-center pointer-events-none">
                   {item.type === "image" && item.url ? (
                     <img src={item.url} alt={item.value} className="w-full h-full object-cover opacity-80" />
                   ) : item.icon ? (
                     <span className="material-symbols-outlined text-amber-400 text-2xl">{item.icon}</span>
                   ) : (
                     <span className="font-sans font-bold text-white text-[10px] uppercase">
                       {item.value.substring(0,3)}
                     </span>
                   )}
                </div>

                {/* Item label on hover */}
                <span 
                  className="absolute left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-1000 bg-black/80 px-2.5 py-1 rounded-full border border-amber-500/30 whitespace-nowrap pointer-events-none backdrop-blur-sm z-50 shadow-xl"
                  style={{
                    top: Math.sin(angle) >= 0 ? "calc(100% + 8px)" : "auto",
                    bottom: Math.sin(angle) < 0 ? "calc(100% + 8px)" : "auto"
                  }}
                >
                   {item.value}
                </span>
             </motion.div>
          );
        })}
      </div>

      {/* Bottom Poetic Panel Button Toggle */}
      {!isPanelOpen && (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <button 
              onClick={() => setIsPanelOpen(true)}
              className="px-6 py-3 rounded-full bg-stone-900/80 border border-amber-500/30 text-amber-500 hover:text-amber-300 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center gap-2 backdrop-blur-md transition-all uppercase tracking-widest text-[10px] font-bold"
            >
              <span className="material-symbols-outlined text-sm">keyboard_double_arrow_up</span>
              Revelar Resonancias
            </button>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Bottom Poetic Panel Content */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0d0b14] to-[#1a1727]/90 backdrop-blur-3xl border-t border-amber-500/20 pt-10 pb-12 flex flex-col items-center z-40 px-6 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
          >
             <button 
               onClick={() => setIsPanelOpen(false)}
               className="absolute top-3 left-1/2 -translate-x-1/2 text-amber-500/50 hover:text-amber-500 hover:bg-amber-500/10 rounded-full p-1 transition-all"
             >
               <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
             </button>
             
             <AnimatePresence mode="wait">
                {expandedConcept === null ? (
                   <motion.div 
                     key="tabs"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="flex flex-col items-center w-full max-w-3xl"
                   >
                     <p className="text-amber-500 text-[10px] uppercase font-bold tracking-widest mb-6 mt-4">
                       Conceptos en Resonancia (Toca para expandir)
                     </p>
                     <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {basket.map((item, index) => {
                           const displayName = item.value;
                           return (
                           <button 
                             key={index} 
                             onClick={() => setExpandedConcept(index)} 
                             className="px-5 py-3 rounded-full bg-stone-800/80 border border-stone-600/50 hover:border-amber-400 hover:bg-stone-700 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] text-white flex gap-3 items-center transition-all"
                           >
                              {item.icon ? (
                                 <span className="material-symbols-outlined text-sm">{item.icon}</span>
                              ) : (
                                 <span className="font-serif italic capitalize">{displayName.substring(0,10)}</span>
                              )}
                              <span className="uppercase text-[10px] opacity-70 tracking-widest border-l border-white/20 pl-3">{displayName}</span>
                           </button>
                           );
                        })}
                     </div>
                     <p className="text-amber-200/50 text-[10px] tracking-widest uppercase mb-10">
                       Pasa el cursor sobre los nodos para sentir el flujo
                     </p>
                     
                     <button 
                       onClick={onComplete} 
                       className="btn-alquimia px-10 py-4 rounded-full text-white font-bold tracking-widest text-sm md:text-base shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center gap-3 hover:scale-105 transition-all"
                     >
                        DESCUBRIR CONEXIÓN <span className="material-symbols-outlined">arrow_forward</span>
                     </button>
                     <p className="text-amber-200/50 text-[9px] text-center md:text-[10px] uppercase tracking-widest mt-6 max-w-md">
                       Explora la profundidad de esta unión cósmica y guarda tu reflexión
                     </p>
                   </motion.div>
                ) : (
                   <motion.div 
                     key="expanded"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 20 }}
                     className="flex flex-col items-center w-full max-w-3xl mt-4"
                   >
                      <button onClick={() => setExpandedConcept(null)} className="absolute right-4 top-4 text-amber-500 hover:text-white p-2">
                        <span className="material-symbols-outlined">close</span>
                      </button>
                      <h3 className="font-serif italic text-2xl text-amber-200 mb-6 drop-shadow-md capitalize">
                        {basket[expandedConcept].value}
                      </h3>
                      <div className="flex flex-col gap-4 w-full">
                         {getConceptPhrases(basket[expandedConcept]).map((phrase, idx) => (
                            <div key={idx} className="bg-stone-900/50 border border-amber-500/20 p-4 rounded-xl text-center">
                               <p className="text-amber-100/90 font-serif italic text-sm md:text-base">{phrase}</p>
                            </div>
                         ))}
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.main>
  );
}
