import Link from "next/link"; // Componente de link do Next.js pra navegação
import { ArrowRight, Code2, Smartphone, Server, Zap, BookOpen, Users } from "lucide-react"; // Ícones da Lucide React
import { posts, getFeaturedPosts } from "@/data/posts"; // Dados dos posts e função pra pegar posts em destaque
import { author } from "@/data/author"; // Dados do autor do blog
import { FeaturedPost } from "@/components/blog/FeaturedPost"; // Componente pro post em destaque
import { PostCard } from "@/components/blog/PostCard"; // Componente pro card de post
import { Newsletter } from "@/components/blog/Newsletter"; // Componente da newsletter
import { formatViews } from "@/lib/utils"; // Função pra formatar número de visualizações

// Página inicial do blog
export default function HomePage() {
  const featuredPosts = getFeaturedPosts(); // Pega posts marcados como destaque
  const latestPosts = posts.slice(0, 6); // Pega os 6 posts mais recentes
  const totalViews = posts.reduce((acc, p) => acc + p.views, 0); // Soma todas as visualizações

  return (
    <>
      {/* Seção Hero - cabeçalho grande da página */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%)]" /> {/* Gradiente de fundo sutil */}
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" /> {/* Ícone de código no badge */}
              </div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                BlogDev por {author.name} {/* Nome do autor dinâmico */}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              Artigos sobre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                desenvolvimento {/* Texto com gradiente azul-roxo */}
              </span>{" "}
              que aceleram sua carreira
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-6 leading-relaxed max-w-2xl">
              Conteudo pratico sobre React, Node.js, React Native, TypeScript e muito mais.
              Direto ao ponto, sem enrolacao. {/* Descrição do blog */}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
              <Link
                href="/blog"
                className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                Ver artigos <ArrowRight className="w-4 h-4" /> {/* Botão pra ver artigos */}
              </Link>
              <Link
                href="/sobre"
                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Sobre mim {/* Botão pra página sobre */}
              </Link>
            </div>
          </div>

          {/* Estatísticas rápidas */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg">
            <div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{posts.length}+</div> {/* Número de artigos */}
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Artigos</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{formatViews(totalViews)}</div> {/* Total de visualizações formatado */}
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Visualizacoes</div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">8+</div> {/* Número de categorias */}
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Categorias</div>
            </div>
          </div>
        </div>
      </section>

      {/* Post em Destaque - só mostra se existir */}
      {featuredPosts[0] && (
        <section className="max-w-6xl mx-auto px-4 -mt-4 relative z-10">
          <FeaturedPost post={featuredPosts[0]} /> {/* Componente que renderiza o post destacado */}
        </section>
      )}

      {/* Seção de Tópicos - mostra as categorias principais */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Topicos que eu abordo
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-lg mx-auto">
            Conteudo diversificado cobrindo todo o ecossistema de desenvolvimento moderno
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Array de tópicos com ícones e descrições */}
          {[
            { icon: Code2, label: "Frontend", desc: "React, Next.js, CSS", color: "blue" },
            { icon: Server, label: "Backend", desc: "Node.js, APIs, DB", color: "green" },
            { icon: Smartphone, label: "Mobile", desc: "React Native, Flutter", color: "purple" },
            { icon: Zap, label: "DevOps", desc: "Docker, CI/CD, Git", color: "orange" },
            { icon: BookOpen, label: "Carreira", desc: "Clean Code, Praticas", color: "yellow" },
            { icon: Users, label: "Arquitetura", desc: "Patterns, Design", color: "indigo" },
          ].map((topic) => (
            <Link
              key={topic.label}
              href={`/blog?categoria=${topic.label}`} // Link pra filtrar posts por categoria
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg transition-all text-center"
            >
              <topic.icon className="w-8 h-8 mx-auto text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" /> {/* Ícone do tópico */}
              <h3 className="font-bold text-slate-900 dark:text-white mt-3 text-sm">{topic.label}</h3> {/* Nome do tópico */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{topic.desc}</p> {/* Descrição breve */}
            </Link>
          ))}
        </div>
      </section>

      {/* Últimos Artigos - seção com fundo cinza */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Ultimos artigos
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Confira as publicacoes mais recentes do blog
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Ver todos <ArrowRight className="w-4 h-4" /> {/* Link pra ver todos os posts, só no desktop */}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} /> /* Renderiza card de cada post recente */
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400"
            >
              Ver todos os artigos <ArrowRight className="w-4 h-4" /> {/* Link no mobile */}
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action da Newsletter */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="max-w-xl mx-auto">
          <Newsletter /> {/* Componente da newsletter no centro */}
        </div>
      </section>
    </>
  );
}
