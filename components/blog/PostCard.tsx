import Link from "next/link"; // Pra navegar pro post
import { Clock, Eye } from "lucide-react"; // Icones pros stats
import { Post } from "@/lib/types"; // Tipo do post
import { formatDateShort, formatViews } from "@/lib/utils"; // Funcoes pra formatar data e views
import { getCategoryBgLight, getCategoryTextColor } from "@/lib/constants"; // Funcoes pra cores da categoria

// Props do componente - recebe um post pra mostrar
interface PostCardProps {
  post: Post;
}

// Componente que mostra um card de post na lista
export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}> {/* Link pro post completo */}
      <article className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-slate-900/50 transition-all duration-300 border border-slate-100 dark:border-slate-800 h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img
            src={post.coverImage} // Imagem de capa
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" // Zoom no hover
            loading="lazy" // Carrega so quando precisa
          />
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${getCategoryBgLight(post.category)} ${getCategoryTextColor(post.category)} backdrop-blur-sm`}
          >
            {post.category} {/* Badge da categoria */}
          </span>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500 mb-3">
            <span>{formatDateShort(post.date)}</span> {/* Data formatada */}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime} {/* Tempo de leitura */}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(post.views)} {/* Views formatadas */}
            </span>
          </div>
          <h2 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
            {post.title} {/* Titulo do post */}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 flex-1">
            {post.excerpt} {/* Resumo curto */}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {post.tags.slice(0, 3).map((tag) => ( // Mostra ate 3 tags
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
              >
                {tag} {/* Tag do post */}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
