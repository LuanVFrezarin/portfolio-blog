"use client"; // Roda no cliente pq usa hooks e interacao

import { useState } from "react"; // useState pro menu mobile
import Link from "next/link"; // Pra navegar
import { usePathname } from "next/navigation"; // Pra saber qual pagina ta ativa
import { useTheme } from "next-themes"; // Hook do tema
import { Menu, X, Sun, Moon, Code2 } from "lucide-react"; // Icones
import { cn } from "@/lib/utils"; // Funcao pra classes CSS
import { NAV_LINKS } from "@/lib/constants"; // Links de navegacao

// Componente do header/cabecalho do site
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Se menu mobile ta aberto
  const pathname = usePathname(); // Pagina atual
  const { theme, setTheme } = useTheme(); // Tema atual e funcao pra mudar

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
              <Code2 className="w-5 h-5 text-white" /> {/* Icone de codigo */}
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              Blog<span className="text-blue-600">Dev</span> {/* Nome do blog */}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => ( // Mapeia links de navegacao
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href // Se ta na pagina atual, destaca
                    ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                )}
              >
                {link.label} {/* Nome do link */}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} // Alterna tema
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Alternar tema"
            >
              <Sun className="w-5 h-5 hidden dark:block" /> {/* Sol no dark mode */}
              <Moon className="w-5 h-5 dark:hidden" /> {/* Lua no light mode */}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // Abre/fecha menu mobile
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />} {/* X se aberto, menu se fechado */}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && ( // Mostra menu mobile so se ta aberto
          <nav className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => ( // Links no mobile
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)} // Fecha menu quando clica
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
