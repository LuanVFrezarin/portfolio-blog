"use client"; // Roda no cliente pq usa navigator e window

import { useState } from "react"; // useState pra estado de copiado
import { Share2, Link as LinkIcon, Twitter, Linkedin, Check } from "lucide-react"; // Icones pros botoes

// Props do componente - titulo e slug do post
interface ShareButtonsProps {
  title: string;
  slug: string;
}

// Componente com botoes pra compartilhar o post
export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false); // Se o link foi copiado

  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : ""; // URL completa do post
  const encodedUrl = encodeURIComponent(url); // URL codificada pra URLs
  const encodedTitle = encodeURIComponent(title); // Titulo codificado

  // Funcao que copia o link pro clipboard
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url); // Copia URL
      setCopied(true); // Mostra check
      setTimeout(() => setCopied(false), 2000); // Volta ao normal depois de 2s
    } catch {
      // Se der erro, nao faz nada
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-500 dark:text-slate-400 mr-1">
        <Share2 className="w-4 h-4 inline mr-1" />
        Compartilhar: {/* Label dos botoes */}
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} // Link do Twitter
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-500 transition-colors"
        aria-label="Compartilhar no Twitter"
      >
        <Twitter className="w-4 h-4" /> {/* Botao Twitter */}
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} // Link do LinkedIn
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-700 transition-colors"
        aria-label="Compartilhar no LinkedIn"
      >
        <Linkedin className="w-4 h-4" /> {/* Botao LinkedIn */}
      </a>
      <button
        onClick={copyLink} // Copia link quando clica
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Copiar link"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />} {/* Check se copiado, link se nao */}
      </button>
    </div>
  );
}
