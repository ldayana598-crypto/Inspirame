import React from "react";

export function StarryBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-100">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="stars" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
             <g filter="url(#star-glow)">
               {/* Subtle star field */}
               <circle cx="20" cy="30" r="1.5" fill="#FDE047" opacity="0.9" />
               <circle cx="80" cy="120" r="1.2" fill="#FDE047" opacity="0.7" />
               <circle cx="150" cy="40" r="2.5" fill="#FDE047" opacity="1" />
               <circle cx="40" cy="90" r="1.0" fill="#FEF08A" opacity="0.8" />
               <circle cx="180" cy="160" r="1.8" fill="#FDE047" opacity="0.6" />
               <circle cx="110" cy="70" r="1.2" fill="#FEF08A" opacity="0.8" />
               <circle cx="90" cy="180" r="2" fill="#FDE047" opacity="0.5" />
               <circle cx="140" cy="110" r="0.8" fill="#FEF08A" opacity="0.7" />
               <circle cx="10" cy="140" r="2.2" fill="#FDE047" opacity="0.6" />
               <circle cx="160" cy="10" r="1.5" fill="#FEF08A" opacity="0.9" />
             </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars)" />
      </svg>
    </div>
  );
}
