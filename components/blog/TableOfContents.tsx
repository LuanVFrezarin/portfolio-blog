"use client"; // Roda no cliente pq usa IntersectionObserver e DOM

import { useState, useEffect } from "react"; // useState pra estado, useEffect pra efeitos
import { List } from "lucide-react"; // Icone de lista

// Tipo pro item do sumario
interface TocItem {
  id: string; // ID unico da secao
  text: string; // Texto do titulo
  level: number; // Nivel do heading (sempre 2 aqui)
}

// Componente que cria sumario do artigo
export function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>(""); // Qual secao ta ativa
  const [items, setItems] = useState<TocItem[]>([]); // Lista de secoes

  // Extrai titulos H2 do conteudo HTML
  useEffect(() => {
    const headings = content.match(/<h2>(.*?)<\/h2>/g) || []; // Regex pra encontrar <h2>
    const tocItems = headings.map((h, i) => {
      const text = h.replace(/<\/?h2>/g, "").replace(/<[^>]+>/g, ""); // Remove tags HTML
      const id = `section-${i}`; // ID unico pra cada secao
      return { id, text, level: 2 };
    });
    setItems(tocItems); // Seta os items do sumario
  }, [content]);

  // Observa quais secoes estao visiveis na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id); // Marca secao ativa quando entra na tela
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" } // Margem pra detectar quando secao fica ativa
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id); // Pega elemento pelo ID
      if (el) observer.observe(el); // Observa o elemento
    });

    return () => observer.disconnect(); // Limpa observer
  }, [items]);

  if (items.length === 0) return null; // Se nao tem secoes, nao mostra

  // Funcao que rola ate a secao
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" }); // Rola suavemente
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24">
      <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 text-sm">
        <List className="w-4 h-4" /> Neste artigo {/* Titulo do sumario */}
      </h3>
      <nav>
        <ul className="space-y-2">
          {items.map((item) => ( // Mapeia cada item do sumario
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)} // Rola pra secao quando clica
                className={`text-sm text-left w-full px-3 py-1.5 rounded-lg transition-colors ${
                  activeId === item.id // Se ta ativo, destaca
                    ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {item.text} {/* Texto da secao */}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
