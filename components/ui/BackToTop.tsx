"use client"; // Roda no cliente pq usa window e scroll

import { useState, useEffect } from "react"; // useState pra visibilidade, useEffect pra scroll
import { ArrowUp } from "lucide-react"; // Icone de seta pra cima
import { cn } from "@/lib/utils"; // Funcao pra classes CSS

// Componente do botao "voltar ao topo"
export function BackToTop() {
  const [visible, setVisible] = useState(false); // Se o botao ta visivel

  useEffect(() => {
    // Funcao que verifica se rolou mais de 400px
    const handleScroll = () => {
      setVisible(window.scrollY > 400); // Mostra botao se rolou muito
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // Escuta scroll
    return () => window.removeEventListener("scroll", handleScroll); // Limpa listener
  }, []);

  // Funcao que rola suavemente pro topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Rola pro topo
  };

  return (
    <button
      onClick={scrollToTop} // Chama scrollToTop quando clica
      className={cn(
        "fixed bottom-6 right-6 z-50 w-11 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none" // Aparece/desaparece com animacao
      )}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="w-5 h-5" /> {/* Seta pra cima */}
    </button>
  );
}
