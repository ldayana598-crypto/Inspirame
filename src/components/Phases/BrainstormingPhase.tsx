import React, { useState } from "react";
import { motion } from "motion/react";

type BrainstormingPhaseProps = {
  key?: React.Key;
  onContinue: (selectedItems: any[]) => void;
};

const RANDOM_WORDS = [
  'MONTAÑA', 'LLUVIA', 'SILENCIO', 'FUEGO', 'ESPEJO', 'CRISTAL', 'TIEMPO', 'RÍO', 'AIRE', 'SOMBRA', 'LUZ', 'ESTRELLA', 'NOCHE', 'AURORA', 'MAR', 'BOSQUE', 'DESIERTO', 'NIEVE', 'RAYO', 'TRUENO', 'ECO', 'BRISA', 'TORMENTA', 'NIEBLA', 'CENIZA', 'CHISPA', 'LLAMA', 'OCÉANO', 'LUNA', 'SOL', 'COMETA', 'METEORO', 'GALAXIA', 'ABISMO', 'CUMBRE', 'HORIZONTE', 'ALBA', 'OCASO', 'AMOR', 'PAZ', 'MIEDO', 'SUEÑO', 'ESPERANZA', 'DESTINO', 'ALMA', 'MENTE', 'CAOS', 'ORDEN', 'VACÍO', 'INFINITO', 'ETERNIDAD', 'MAGIA', 'MISTERIO', 'SECRETO', 'ILUSIÓN', 'ESPEJISMO', 'VERDAD', 'MENTIRA', 'ORIGEN', 'ECLIPSE'
];
const RANDOM_OBJECTS = [
  { icon: 'pedal_bike', name: 'Bicicleta' },
  { icon: 'light', name: 'Lámpara' },
  { icon: 'local_cafe', name: 'Taza' },
  { icon: 'menu_book', name: 'Libro' },
  { icon: 'key', name: 'Llave' },
  { icon: 'hourglass_empty', name: 'Reloj' },
  { icon: 'umbrella', name: 'Paraguas' },
  { icon: 'palette', name: 'Paleta' },
  { icon: 'auto_awesome', name: 'Magia' },
  { icon: 'edit', name: 'Lápiz' },
  { icon: 'photo_camera', name: 'Cámara' },
  { icon: 'smartphone', name: 'Teléfono' },
  { icon: 'computer', name: 'PC' },
  { icon: 'glasses', name: 'Gafas' },
  { icon: 'watch', name: 'Pulsera' },
  { icon: 'backpack', name: 'Mochila' },
  { icon: 'directions_car', name: 'Coche' },
  { icon: 'flight', name: 'Avión' },
  { icon: 'train', name: 'Tren' },
  { icon: 'rocket_launch', name: 'Cohete' },
  { icon: 'chair', name: 'Silla' },
  { icon: 'door_front', name: 'Puerta' },
  { icon: 'diamond', name: 'Diamante' },
  { icon: 'monetization_on', name: 'Moneda' },
  { icon: 'shopping_basket', name: 'Bolsa' },
  { icon: 'spa', name: 'Hoja' },
  { icon: 'local_fire_department', name: 'Fuego' },
  { icon: 'favorite', name: 'Corazón' },
  { icon: 'cloud', name: 'Nube' },
  { icon: 'bolt', name: 'Rayo' },
  { icon: 'home', name: 'Casa' },
  { icon: 'lock', name: 'Candado' },
  { icon: 'visibility', name: 'Ojo' },
  { icon: 'anchor', name: 'Ancla' },
  { icon: 'notifications', name: 'Campana' },
  { icon: 'security', name: 'Escudo' },
  { icon: 'flag', name: 'Bandera' },
  { icon: 'star', name: 'Estrella' },
  { icon: 'music_note', name: 'Música' },
  { icon: 'extension', name: 'Pieza' }
];
const IMAGE_NOUNS = ['Paisaje', 'Desierto', 'Templo', 'Abismo', 'Horizonte', 'Océano', 'Bosque', 'Cielo', 'Atardecer', 'Nebulosa', 'Ciudad', 'Silueta', 'Valle', 'Reflejo', 'Jardín', 'Laberinto'];
const IMAGE_ADJECTIVES = ['de la India', 'en llamas', 'olvidado', 'de ámbar', 'cristalino', 'de obsidiana', 'susurrante', 'de polvo de estrellas', 'eterno', 'escondido', 'de neón', 'sumergido', 'dorado', 'sin tiempo', 'estelar', 'otoñal'];

const RANDOM_IMAGES = Array.from({ length: 40 }).map((_, i) => {
  const noun = IMAGE_NOUNS[i % IMAGE_NOUNS.length];
  const adj = IMAGE_ADJECTIVES[(i * 3) % IMAGE_ADJECTIVES.length];
  return {
    label: `${noun} ${adj}`,
    url: `https://picsum.photos/seed/${i + 100}/500/400`
  };
});

export function BrainstormingPhase({ onContinue }: BrainstormingPhaseProps) {
  const [basket, setBasket] = useState<
    { id: string; type: string; value: string; icon?: string; url?: string }[]
  >([]);

  const addToBasket = (item: any) => {
    if (!basket.find((b) => b.id === item.id)) {
      setBasket([...basket, item]);
    } else {
      setBasket(basket.filter(b => b.id !== item.id));
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative z-10 pt-24 pb-48 px-6 max-w-7xl mx-auto"
    >
      <div className="mb-12">
        <p className="font-label text-primary text-[10px] uppercase tracking-widest font-bold mb-2">
          Fase 1
        </p>
        <h2 className="font-headline text-5xl md:text-6xl font-extrabold text-on-surface leading-none -tracking-widest">
          Lluvia de Ideas
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent mt-4 mb-6 rounded-full"></div>
        <p className="max-w-3xl text-sm md:text-base font-serif italic text-on-surface-variant/80 border-l-2 border-primary/30 pl-4 py-1">
          En esta fase, deja que tu intuición te guíe. Selecciona palabras, objetos e imágenes que llamen tu atención para llenar tu <strong>Cesta Creativa</strong>. 
          Estos elementos serán la materia prima que utilizarás en las siguientes etapas para entrelazar conceptos, descubrir conexiones inesperadas y plasmar tu gran idea. 
          No hay límites, elige todo lo que resuene contigo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-12 pb-32">
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">
              edit_note
            </span>
            <h3 className="font-label text-xs uppercase tracking-tighter font-extrabold text-on-surface-variant">
              PALABRAS
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-[300px] overflow-y-auto pr-4">
            {RANDOM_WORDS.map((word, i) => (
              <div
                key={word}
                onClick={() =>
                  addToBasket({ id: `word-${word}`, type: "word", value: word })
                }
                className={`group bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-black/5 flex justify-between items-center rounded-sm backdrop-blur-sm ${basket.some(b => b.id === `word-${word}`) ? 'bg-[var(--color-primary-dark)] border-[var(--color-primary-dark)] text-white scale-105' : 'hover:bg-black/5'}`}
              >
                <span className="font-headline italic font-light text-sm md:text-base truncate mr-2">
                  {word}
                </span>
                <span className={`material-symbols-outlined text-sm ${basket.some(b => b.id === `word-${word}`) ? 'text-white' : 'opacity-40 group-hover:opacity-100 transition-opacity'}`}>
                  {basket.some(b => b.id === `word-${word}`) ? 'check' : 'add'}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">
              category
            </span>
            <h3 className="font-label text-xs uppercase tracking-tighter font-extrabold text-on-surface-variant">
              OBJETOS
            </h3>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 px-2 snap-x hide-scrollbar w-full">
            {RANDOM_OBJECTS.map((obj, i) => (
              <div
                key={obj.name}
                onClick={() =>
                  addToBasket({
                    id: `obj-${obj.name}`,
                    type: "object",
                    value: obj.name,
                    icon: obj.icon,
                  })
                }
                className={`flex-none w-28 h-28 snap-center bg-white border border-black/5 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer shadow-sm rounded-sm ${basket.some(b => b.id === `obj-${obj.name}`) ? 'bg-[var(--color-primary-dark)] border-[var(--color-primary-dark)] text-white scale-105' : 'hover:bg-black/5'}`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {obj.icon}
                </span>
                <span className="font-label text-[9px] tracking-widest uppercase opacity-60">
                  {basket.some(b => b.id === `obj-${obj.name}`) ? 'Añadido' : obj.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">
              image
            </span>
            <h3 className="font-label text-xs uppercase tracking-tighter font-extrabold text-on-surface-variant">
              IMÁGENES SUELTAS
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[350px] overflow-y-auto pr-4">
            {RANDOM_IMAGES.map((img, i) => (
              <div
                key={img.label}
                onClick={() =>
                  addToBasket({
                    id: `img-${img.label}`,
                    type: "image",
                    value: img.label,
                    url: img.url,
                  })
                }
                className={`relative overflow-hidden border border-black/5 group cursor-pointer shadow-sm rounded-sm aspect-[4/3] transition-all duration-300 ${basket.some(b => b.id === `img-${img.label}`) ? 'border-primary ring-4 ring-primary/20 scale-[1.02]' : ''}`}
              >
                <img
                  alt={img.label}
                  className={`w-full h-full object-cover transition-all duration-700 ${basket.some(b => b.id === `img-${img.label}`) ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`}
                  src={img.url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent flex items-end p-4">
                  <span className="text-white font-label text-[9px] tracking-[0.2em] uppercase font-bold flex items-center justify-between w-full">
                    {img.label}
                    {basket.some(b => b.id === `img-${img.label}`) && <span className="material-symbols-outlined text-sm">check_circle</span>}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="fixed bottom-24 left-0 w-full px-6 pointer-events-none z-40">
        <div className="max-w-7xl mx-auto pointer-events-auto relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 bg-surface/80 px-4 py-2 rounded-full backdrop-blur shadow-md">
              <span className="material-symbols-outlined text-primary">
                shopping_basket
              </span>
              <h3 className="font-headline text-lg font-bold italic">
                Cesta Creativa
              </h3>
            </div>
            {basket.length > 0 && (
              <button
                onClick={() => onContinue(basket)}
                className="btn-alquimia rounded-sm px-8 py-4 shadow-xl font-sans text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 hover:scale-105"
              >
                Continuar
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            )}
          </div>
          <div className="bg-white/80 backdrop-blur-xl border border-black/5 p-4 flex flex-wrap gap-3 min-h-[80px] shadow-lg">
            {basket.map((item) => (
              <div
                key={item.id}
                onClick={() => addToBasket(item)}
                className="bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded-sm flex items-center gap-2 shadow-md cursor-pointer hover:opacity-80 transition-opacity"
                title="Click para quitar"
              >
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] truncate max-w-[120px]">
                  {item.value}
                </span>
                <span className="material-symbols-outlined text-xs">close</span>
              </div>
            ))}
            {basket.length === 0 && (
              <p className="text-on-surface/40 font-label text-xs italic ml-2 w-full text-center">
                Selecciona elementos arriba para inspirarte...
              </p>
            )}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
