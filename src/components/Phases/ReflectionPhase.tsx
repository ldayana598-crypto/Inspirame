import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../contexts/AuthContext";
import { StorageService } from "../../services/StorageService";
import { generatedPalettes } from "../../utils/palettes";

type ReflectionPhaseProps = {
  key?: React.Key;
  basket?: any[];
};

export function ReflectionPhase({ basket = [] }: ReflectionPhaseProps) {
  const [reflection, setReflection] = useState("");
  const [activeTool, setActiveTool] = useState("edit");
  const [activeColor, setActiveColor] = useState("#1F1C0B");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showSavedState, setShowSavedState] = useState(false);
  const [paletteIndex, setPaletteIndex] = useState(() => Math.floor(Math.random() * 100));

  const currentPalette = generatedPalettes[paletteIndex];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const { user, setShowAuthModal } = useAuth();

  // Generate dynamic phrases
  const words = basket.filter((b) => b.type === "word" || b.type === "object").map((b) => b.value.toLowerCase());
  const rawW1 = words[0] || "creatividad";
  const rawW2 = words[1] || "instante";
  const rawW3 = words[2] || "imaginación";

  const getWithArticle = (text: string) => {
    const feminineWords = ['montaña', 'lluvia', 'estrella', 'noche', 'aurora', 'nieve', 'tormenta', 'niebla', 'ceniza', 'chispa', 'llama', 'luna', 'galaxia', 'cumbre', 'ilusión', 'verdad', 'mentira', 'magia', 'brisa', 'luz', 'sombra', 'paz', 'bicicleta', 'lámpara', 'taza', 'llave', 'paleta', 'cámara', 'mochila', 'silla', 'puerta', 'moneda', 'bolsa', 'hoja', 'nube', 'casa', 'campana', 'bandera', 'música', 'pieza', 'silueta', 'nebulosa', 'ciudad', 'eternidad', 'esperanza', 'mente', 'creatividad', 'imaginación'];
    const v = text.toLowerCase();
    const isFeminine = feminineWords.some(fw => v.startsWith(fw) || v.includes(' ' + fw + ' '));
    return (isFeminine ? "la " : "el ") + v;
  };

  const w1 = getWithArticle(rawW1);
  const w2 = getWithArticle(rawW2);
  const w3 = getWithArticle(rawW3);
  
  const dynamicPhrases = [
    `Plasma la síntesis de tus ideas: tu viaje visual desde ${w1} hasta el horizonte de ${w2}.`,
    `Si ${w2} dictara el ritmo y la forma, ¿cómo se manifestaría ${w1} en este canvas?`,
    `Dibuja el instante en que ${w1} revela el verdadero significado de ${w3}.`,
    `En este espacio de alquimia, ${w1} y ${w2} encuentran su equilibrio. Hazlo visible.`,
    `Convierte la energía de ${w1} en trazos, guiada por la intuición de ${w2}.`,
  ];

  // Colors adapted for light background
  const colors = [
    { bg: "#1F1C0B" },
    { bg: "#7A581F" },
    { bg: "#14B8A6" },
    { bg: "#D81B60" },
    { bg: "#6B7280" },
  ];

  // Tools
  const toolStyles: Record<string, string> = {
    edit: "font-sans font-normal text-base",
    brush: "font-serif italic text-2xl font-light",
    text_fields: "font-serif font-bold text-xl uppercase tracking-wider",
  };

  // Selected Images
  const selectedImages = basket.filter((b) => b.type === "image");
  const displayImages = selectedImages.length > 0 ? selectedImages : [
    { url: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&auto=format&fit=crop&q=80", value: "Texturas de la alquimia creativa" }
  ];

  // Canvas Drawing Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set actual size in memory (scaled to account for pixel density if desired, but 1:1 is fine here)
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Fill with transparent or light bg if needed, default is clear
    }
  }, []);

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const data = canvas.toDataURL();
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = data;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = activeTool === 'brush' ? 5 : 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = activeColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setReflection("");
  };

  const handleSave = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    StorageService.saveSession(user.id, basket, reflection);
    setShowSavedState(true);
    setTimeout(() => setShowSavedState(false), 3000);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-24 pb-48 px-6 min-h-screen relative flex flex-col items-center z-10 stars-bg overflow-hidden text-amber-100"
    >
      <div className="grain-overlay"></div>
      {/* Cosmic Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="star w-0.5 h-0.5 top-[10%] left-[15%]" style={{ boxShadow: "0 0 4px #fff" }}></div>
        <div className="star w-1 h-1 top-[45%] left-[80%] opacity-60" style={{ boxShadow: "0 0 8px #fff" }}></div>
        <div className="star w-[3px] h-[3px] top-[70%] left-[20%] opacity-40" style={{ boxShadow: "0 0 6px #fff" }}></div>
        <div className="star w-0.5 h-0.5 top-[25%] left-[60%]" style={{ boxShadow: "0 0 4px #fff" }}></div>
        <div className="star w-1 h-1 top-[85%] left-[55%] opacity-70" style={{ boxShadow: "0 0 8px #fff" }}></div>
      </div>

      <div className="absolute top-28 left-8 opacity-20 pointer-events-none">
        <span
          className="material-symbols-outlined text-6xl text-amber-500/50"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          brightness_7
        </span>
      </div>
      <div className="absolute top-28 right-8 opacity-20 pointer-events-none">
        <span className="material-symbols-outlined text-6xl text-amber-500/50">
          eco
        </span>
      </div>

      <div className="text-center mb-10 w-full flex flex-col items-center relative max-w-5xl mx-auto z-10">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <svg className="mandala-svg w-[600px] h-[600px] opacity-20 saturate-50 mix-blend-screen" fill="none" viewBox="0 0 200 200">
             <circle className="energy-path" cx="100" cy="100" r="80" stroke="#7a581f" strokeWidth="0.5" />
             <circle cx="100" cy="100" r="60" stroke="#ecbf7c" strokeDasharray="2 4" strokeWidth="0.3" />
             <path className="energy-path" d="M100 20 L169.28 140 L30.72 140 Z" stroke="#7a581f" strokeWidth="0.5" />
             <path className="energy-path" d="M100 180 L30.72 60 L169.28 60 Z" stroke="#ecbf7c" strokeWidth="0.5" style={{ animationDelay: "-5s" }} />
           </svg>
        </div>

        <span className="text-amber-500 font-bold tracking-widest uppercase text-xs mb-2 block">
          Fase 3: Reflexi&oacute;n
        </span>
        <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 italic drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          REFLEXI&Oacute;N & IDEAS
        </h2>
        <p className="font-body text-amber-200/70 max-w-md mx-auto text-lg mb-6 drop-shadow-md">
          Dibuja o escribe lo que surgi&oacute; de la experiencia visual.
        </p>

        <button 
          onClick={handleSave}
          className="btn-alquimia px-6 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 transition-transform shadow-[0_0_20px_rgba(183,139,77,0.4)] active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">save</span>
          Guardar Sesión
        </button>
        <AnimatePresence>
          {showSavedState && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-8 text-amber-400 font-bold text-[10px] tracking-widest uppercase flex items-center gap-1 drop-shadow-md"
            >
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Guardado
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative w-full max-w-5xl mx-auto md:h-[500px] h-[600px] rounded-3xl p-4 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)] group border border-amber-500/20 z-10 backdrop-blur-xl">

        <div className="absolute inset-0 pointer-events-none border-[12px] md:border-[20px] border-transparent p-1 z-20">
          <div className="w-full h-full border-[1px] border-amber-500/30 relative">
            <svg className="absolute -top-1 -left-1 w-8 h-8 text-amber-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 24V0h24" />
            </svg>
            <svg className="absolute -top-1 -right-1 w-8 h-8 text-amber-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 0h24v24" />
            </svg>
            <svg className="absolute -bottom-1 -left-1 w-8 h-8 text-amber-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M24 24H0V0" />
            </svg>
            <svg className="absolute -bottom-1 -right-1 w-8 h-8 text-amber-500/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M24 0v24H0" />
            </svg>
          </div>
        </div>

        <div className="w-full h-full bg-[#fdfaf6] rounded-xl shadow-inner relative flex flex-col md:flex-row overflow-hidden z-10">
          <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 flex flex-col border-b md:border-b-0 md:border-r border-amber-900/10">
            <h3 className="text-amber-900/40 text-xs font-bold uppercase tracking-widest mb-4">Ideas Escritas</h3>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Escribe aquí tu alquimia..."
              className={`w-full flex-grow resize-none border-none focus:ring-0 bg-transparent outline-none placeholder:text-stone-400 ${toolStyles[activeTool] || "font-serif"} transition-colors duration-300`}
              style={{ color: activeColor }}
            />
          </div>

          <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col relative overflow-hidden group/canvas bg-white/50 mix-blend-multiply cursor-crosshair">
            <div className="absolute top-6 left-6 pointer-events-none z-10 opacity-70 group-hover/canvas:opacity-30 transition-opacity">
               <h3 className="text-amber-900/40 text-xs font-bold uppercase tracking-widest">Ideas Dibujadas</h3>
            </div>
            <canvas 
               ref={canvasRef}
               onMouseDown={startDrawing}
               onMouseMove={draw}
               onMouseUp={endDrawing}
               onMouseOut={endDrawing}
               onTouchStart={startDrawing}
               onTouchMove={draw}
               onTouchEnd={endDrawing}
               className="absolute inset-0 w-full h-full touch-none"
             />
          </div>
        </div>
      </div>

      <div className="mt-8 bg-stone-900/60 backdrop-blur-xl px-8 py-4 flex flex-wrap items-center justify-center gap-6 shadow-2xl border border-amber-900/30 z-20 relative rounded-full max-w-5xl mx-auto">
        {["edit", "brush", "text_fields"].map((tool) => (
          <button
            key={tool}
            onClick={() => setActiveTool(tool)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-90 ${activeTool === tool ? "bg-gradient-to-tr from-amber-700 to-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]" : "text-amber-200 hover:bg-white/10"}`}
          >
            <span className="material-symbols-outlined">{tool}</span>
          </button>
        ))}
        <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
        <div className="flex gap-4">
          {colors.map((c) => (
            <div
              key={c.bg}
              onClick={() => setActiveColor(c.bg)}
              className={`w-6 h-6 rounded-full border cursor-pointer hover:scale-110 transition-transform ${activeColor === c.bg ? "border-amber-400 ring-2 ring-amber-500/40 scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "border-white/20"}`}
              style={{ backgroundColor: c.bg }}
            ></div>
          ))}
        </div>
        <div className="w-px h-6 bg-white/10 hidden sm:block"></div>
        <button
          onClick={clearCanvas}
          className="w-10 h-10 flex items-center justify-center rounded-full text-amber-200 hover:bg-red-500/20 hover:text-red-400 transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>

      <div className="mt-16 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-20 relative">
        <div className="crystal-panel p-8 rounded-3xl shadow-2xl rotate-[1deg] flex flex-col justify-between h-full border border-amber-500/10">
          <div>
            <span
              className="material-symbols-outlined text-amber-500 mb-4 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              format_quote
            </span>
            <p className="font-serif text-2xl md:text-3xl font-light text-white leading-relaxed italic drop-shadow-sm">
              "{dynamicPhrases[phraseIndex]}"
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-amber-200/50">
              — Susurros del Arquitecto
            </p>
            <button
              onClick={() =>
                setPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length)
              }
              className="flex items-center gap-2 text-amber-500 hover:text-white transition-colors drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]"
            >
              <span className="material-symbols-outlined text-sm">
                autorenew
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest hidden sm:block">
                Cambiar
              </span>
            </button>
          </div>
        </div>

        <div className="relative group w-full flex flex-col gap-4">
          <div className="relative w-full h-[260px] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.6)]">
            <img
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              src={displayImages[0].url}
              alt="Referencia"
            />
            {displayImages.length > 1 && (
              <div className="absolute top-4 right-4 bg-stone-900/80 text-amber-100 text-xs px-3 py-1.5 rounded-full backdrop-blur-md border border-amber-500/20">
                + {displayImages.length - 1} imágenes
              </div>
            )}
            <div className="absolute inset-0 bg-[#7A581F] mix-blend-color opacity-20 pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-stone-900/80 backdrop-blur-md p-4 rounded-2xl border border-amber-500/20">
              <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                Referencia Visual
              </p>
              <p className="text-white/90 text-sm italic line-clamp-1">
                {displayImages[0].value}
              </p>
            </div>
          </div>
          
          <div className="bg-stone-900/60 backdrop-blur-md rounded-3xl border border-amber-500/20 p-5 shadow-inner">
            <div className="flex items-center justify-between mb-3">
              <p className="text-amber-400/80 text-[10px] font-bold uppercase tracking-[0.2em]">
                Paleta Sugerida
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setPaletteIndex((prev) => (prev + 1) % generatedPalettes.length)}
                  className="text-amber-400/50 hover:text-amber-400 transition-colors"
                  title="Cambiar paleta"
                >
                  <span className="material-symbols-outlined text-[1rem]">refresh</span>
                </button>
                <span className="material-symbols-outlined text-[1rem] text-amber-500/50">palette</span>
              </div>
            </div>
            <div className="flex w-full h-12 rounded-xl overflow-hidden shadow-inner mb-3">
              {currentPalette.colors.map((color, idx) => (
                <div key={idx} style={{ backgroundColor: color }} className="flex-1 group/color relative cursor-crosshair hover:flex-[1.5] transition-all duration-300">
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/color:opacity-100 text-[10px] font-mono text-white/70 mix-blend-difference transition-opacity">
                    {color}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 items-start mt-4 bg-stone-900/40 p-3 rounded-2xl">
              <img 
                src={currentPalette.imageUrl} 
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl shadow-md border border-amber-500/10" 
                alt="Fuente de paleta" 
                loading="lazy"
              />
              <div className="flex flex-col justify-center h-full">
                <p className="text-amber-100/80 text-xs font-serif italic leading-relaxed">
                  {currentPalette.description}
                </p>
                <p className="text-[9px] text-amber-500/40 uppercase tracking-wider mt-2 font-bold">
                  Inspiración visual
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
