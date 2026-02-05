"use client"; // Roda no cliente pq usa next-themes

import { ThemeProvider as NextThemesProvider } from "next-themes"; // Provider do next-themes

// Componente que fornece o contexto de tema pra toda a app
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children} {/* Renderiza os filhos dentro do provider */}
    </NextThemesProvider>
  );
}
