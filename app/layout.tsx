import type { Metadata } from "next"; // Tipo do Next pro metadata da página
import { Inter } from "next/font/google"; // Importa fonte Inter do Google Fonts
import { ThemeProvider } from "@/components/layout/ThemeProvider"; // Componente que gerencia tema claro/escuro
import { Header } from "@/components/layout/Header"; // Cabeçalho do site
import { Footer } from "@/components/layout/Footer"; // Rodapé
import { BackToTop } from "@/components/ui/BackToTop"; // Botão voltar ao topo
import { SITE_CONFIG } from "@/lib/constants"; // Configs do site como título, descrição
import "./globals.css"; // Importa estilos globais

// Carrega a fonte Inter com subsets latinos e display swap pra performance
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // Define variável CSS pra usar no Tailwind
});

// Metadata pro SEO, Open Graph, Twitter Cards etc.
export const metadata: Metadata = {
  metadataBase: new URL("https://blogdev.luanfrezarin.dev"), // URL base pro site
  title: {
    default: SITE_CONFIG.title, // Título padrão
    template: `%s | ${SITE_CONFIG.name}`, // Template pro título das páginas
  },
  description: SITE_CONFIG.description, // Descrição do site
  authors: [{ name: SITE_CONFIG.author }], // Autor
  openGraph: { // Config pro Facebook/Open Graph
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: "website",
    locale: SITE_CONFIG.locale,
    siteName: SITE_CONFIG.name,
  },
  twitter: { // Config pro Twitter Cards
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: { // Permite indexação pelos motores de busca
    index: true,
    follow: true,
  },
};

// Layout raiz da aplicação, envolve todas as páginas
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning> {/* HTML em português, suprime warning de hidratação */}
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100`}> {/* Aplica fonte, antialiasing, cores do tema */}
        <ThemeProvider> {/* Provedor de tema pra alternar claro/escuro */}
          <div className="flex flex-col min-h-screen"> {/* Layout flexível em coluna, altura mínima tela */}
            <Header /> {/* Cabeçalho no topo */}
            <main className="flex-1">{children}</main> {/* Conteúdo principal, ocupa espaço restante */}
            <Footer /> {/* Rodapé */}
          </div>
          <BackToTop /> {/* Botão flutuante voltar ao topo */}
        </ThemeProvider>
      </body>
    </html>
  );
}
