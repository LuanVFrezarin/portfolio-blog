"use client"; // Roda no cliente pq usa window e scroll

import { useState, useEffect } from "react"; // useState pra progresso, useEffect pra scroll

// Componente que mostra barra de progresso da leitura
export function ReadingProgress() {
  const [progress, setProgress] = useState(0); // Porcentagem lida (0-100)

  useEffect(() => {
    // Funcao que calcula quanto o usuario rolou
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Quanto rolou do topo
      const docHeight = document.documentElement.scrollHeight - window.innerHeight; // Altura total - viewport
      if (docHeight > 0) {
        setProgress(Math.min(100, (scrollTop / docHeight) * 100)); // Calcula porcentagem, max 100%
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // Escuta scroll
    return () => window.removeEventListener("scroll", handleScroll); // Limpa listener
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 z-[60]"> {/* Barra base */}
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-150" // Barra de progresso
        style={{ width: `${progress}%` }} // Largura baseada no progresso
      />
    </div>
  );
}
