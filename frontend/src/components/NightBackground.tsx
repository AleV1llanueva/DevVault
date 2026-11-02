import React from 'react';
import { MountainVector } from './vectors/MountainVector';

export const NightBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#070b19] text-white">
      {/* 1. Fondo Degradado Vertical */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10294f]  to-[#126598] pointer-events-none" />

      {/* 2. Resplandor difuminado (Glow exterior de la luna) */}
      <div className="absolute top-12 left-1/12 -translate-x-1/2 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />

      {/* 3. Círculo de la Luna con sombra brillante */}
      <div className="absolute top-20 left-1/12  -translate-x-1/2 w-28 h-28 bg-gradient-to-tr from-[#d4f1f9] to-white rounded-full shadow-[0_0_50px_rgba(186,230,253,0.7)] pointer-events-none" />

      {/* 4. Capa Vectorial de las Montañas (SVG en la parte inferior) */}
      <div className="absolute -bottom-20 left-0 w-full pointer-events-none z-0">
              <MountainVector className="w-full h-48 md:h-64 text-[#070b19]" />
            </div>

      {/* 5. Contenedor del contenido principal */}
      <main className="relative z-10 min-h-screen w-full">
        {children}
      </main>
    </div>
  );
};
