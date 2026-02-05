import Link from "next/link"; // Pra navegar
import { Github, Linkedin, Twitter, Mail, Code2, Heart } from "lucide-react"; // Icones das redes sociais
import { NAV_LINKS, SOCIAL_LINKS, SITE_CONFIG } from "@/lib/constants"; // Constantes do site

// Componente do footer/rodape do site
export function Footer() {
  const currentYear = new Date().getFullYear(); // Ano atual pro copyright

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" /> {/* Logo do blog */}
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white">
                Blog<span className="text-blue-600">Dev</span> {/* Nome do blog */}
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md leading-relaxed">
              Artigos sobre desenvolvimento web, mobile, DevOps e carreira em tecnologia.
              Conteudo pratico e atualizado para desenvolvedores que querem evoluir. {/* Descricao do blog */}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href={SOCIAL_LINKS.github} // Link do GitHub
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" /> {/* Botao GitHub */}
              </a>
              <a
                href={SOCIAL_LINKS.linkedin} // Link do LinkedIn
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" /> {/* Botao LinkedIn */}
              </a>
              <a
                href={SOCIAL_LINKS.twitter} // Link do Twitter
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" /> {/* Botao Twitter */}
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`} // Link de email
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" /> {/* Botao email */}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Navegacao {/* Titulo da secao */}
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => ( // Links de navegacao
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label} {/* Nome do link */}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Categorias {/* Titulo da secao */}
            </h3>
            <ul className="space-y-3">
              {["Frontend", "Backend", "Mobile", "DevOps", "Carreira"].map((cat) => ( // Categorias hardcoded
                <li key={cat}>
                  <Link
                    href={`/blog?categoria=${cat}`} // Link pra filtrar por categoria
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {cat} {/* Nome da categoria */}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-500 flex items-center gap-1">
              &copy; {currentYear} {SITE_CONFIG.author}. Feito com
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> {/* Coracao vermelho */}
              e muito cafe. {/* Copyright */}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Desenvolvido com Next.js, TypeScript e Tailwind CSS {/* Tecnologias usadas */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
