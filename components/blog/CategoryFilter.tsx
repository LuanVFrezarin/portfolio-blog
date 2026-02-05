"use client"; // Roda no cliente pq tem clique

import { cn } from "@/lib/utils"; // Funcao pra juntar classes CSS

// Props do componente de filtro de categoria
interface CategoryFilterProps {
  categories: string[]; // Lista de categorias disponiveis
  activeCategory: string; // Categoria ativa no momento
  onSelect: (category: string) => void; // Funcao chamada quando seleciona categoria
}

// Componente que mostra botoes pra filtrar posts por categoria
export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1"> {/* Scroll horizontal se precisar */}
      {categories.map((cat) => ( // Mapeia cada categoria
        <button
          key={cat}
          onClick={() => onSelect(cat)} // Chama onSelect quando clica
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all", // Classes base
            activeCategory === cat // Se ta ativo, usa estilo diferente
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg" // Estilo ativo
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700" // Estilo normal
          )}
        >
          {cat} {/* Nome da categoria */}
        </button>
      ))}
    </div>
  );
}
