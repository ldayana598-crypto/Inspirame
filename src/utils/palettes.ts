export function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

const descriptions = [
  "Tonos tierra y orgánicos, ideales para anclar tus ideas y darles solidez.",
  "Colores análogos que promueven serenidad y un flujo de pensamiento natural.",
  "Contrastes sutiles para resaltar lo esencial en tu reflexión íntima.",
  "Paleta suave que invita a la calma, la claridad mental y el balance.",
  "Esquemas con toques de calidez, enraizados en texturas naturales y reales.",
  "Inspiración nocturna e introspectiva, para ideas profundas y misteriosas.",
  "Tonos cálidos y nostálgicos que evocan pasión, energía e historia.",
  "Gradientes neutros para un enfoque minimalista y directo hacia tu proyecto.",
  "Esquema soñador y etéreo, perfecto para ideas artísticas y fuera de la caja.",
  "Tonos sofisticados y profundos que otorgan un sentido de elegancia y foco."
];

export const generatedPalettes = Array.from({ length: 100 }).map((_, i) => {
  // Golden angle 137.5 distributes hues evenly without obvious repeating
  const h = (i * 137.5) % 360; 
  // Variación suave de saturación para mantener el tema orgánico/místico
  const s = 30 + (i % 40); 
  
  // 5 colors from darkest to lightest, slightly shifting hue for an analogous feel
  const colors = [
    hslToHex(h, s, 15),
    hslToHex((h + 15) % 360, s, 35),
    hslToHex((h + 30) % 360, Math.max(0, s - 10), 55),
    hslToHex((h + 45) % 360, Math.max(0, s - 20), 75),
    hslToHex((h + 60) % 360, Math.max(0, s - 30), 95),
  ];
  
  return {
    id: i,
    colors,
    description: descriptions[i % descriptions.length],
    imageUrl: `https://picsum.photos/seed/${h * 100 + s}/400/300`,
  };
});
