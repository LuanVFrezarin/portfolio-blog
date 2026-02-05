import Link from "next/link"; // Pra navegar pros posts
import { Clock } from "lucide-react"; // Icone de relogio
import { Post } from "@/lib/types"; // Tipo do post

// Props do componente - recebe array de posts relacionados
interface RelatedPostsProps {
  posts: Post[];
}

// Componente que mostra posts relacionados no final do artigo
export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null; // Se nao tem posts, nao mostra nada

  return (
    <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">
        Artigos relacionados {/* Titulo da secao */}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Grid responsivo */}
        {posts.map((post) => ( // Mapeia cada post relacionado
          <Link key={post.id} href={`/blog/${post.slug}`}> {/* Link pro post */}
            <article className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 dark:border-slate-800 transition-all">
              <div className="relative overflow-hidden">
                <img
                  src={post.coverImage} // Imagem de capa pequena
                  alt={post.title}
                  className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105" // Zoom no hover
                  loading="lazy" // Carrega so quando precisa
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {post.category} {/* Categoria do post */}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title} {/* Titulo do post */}
                </h3>
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {post.readTime} {/* Tempo de leitura */}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
