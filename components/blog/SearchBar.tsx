"use client"; // Roda no cliente pq tem interacao

import { Search, X } from "lucide-react"; // Icones de busca e fechar

// Props do componente de busca
interface SearchBarProps {
  value: string; // Valor atual da busca
  onChange: (value: string) => void; // Funcao pra atualizar valor
  placeholder?: string; // Placeholder opcional
}

// Componente de barra de busca pros posts
export function SearchBar({ value, onChange, placeholder = "Buscar artigos..." }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" /> {/* Icone de lupa */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)} // Atualiza valor quando digita
        className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all"
      />
      {value && ( // Mostra botao X so se tem texto
        <button
          onClick={() => onChange("")} // Limpa busca
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          <X className="w-4 h-4" /> {/* Icone de fechar */}
        </button>
      )}
    </div>
  );
}
