import Link from "next/link"; // Pra navegar pros posts
import { TrendingUp } from "lucide-react"; // Icone de trending
import { Post } from "@/lib/types"; // Tipo do post
import { formatViews } from "@/lib/utils"; // Formata numero de views

// Props do componente - recebe posts em alta
interface TrendingPostsProps {
  posts: Post[];
}

// Componente que mostra posts mais visualizados
export function TrendingPosts({ posts }: TrendingPostsProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-5">
        <TrendingUp className="w-5 h-5 text-orange-500" /> Em alta {/* Titulo com icone */}
      </h3>
      <div className="space-y-4">
        {posts.map((post, i) => ( // Mapeia posts com numero
          <Link
            key={post.id}
            href={`/blog/${post.slug}`} // Link pro post
            className="flex gap-4 group"
          >
            <span className="text-3xl font-black text-slate-200 dark:text-slate-700 leading-none">
              {String(i + 1).padStart(2, "0")} {/* Numero com zero a esquerda */}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title} {/* Titulo do post */}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-500">{formatViews(post.views)} visualizacoes</span> {/* Views formatadas */}
                <span className="text-xs text-slate-300 dark:text-slate-600">|</span> {/* Separador */}
                <span className="text-xs text-slate-500">{post.category}</span> {/* Categoria */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
