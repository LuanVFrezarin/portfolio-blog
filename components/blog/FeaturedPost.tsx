import Link from "next/link"; // Pra navegar entre paginas
import { ArrowRight, Clock, Eye } from "lucide-react"; // Icones pros stats do post
import { Post } from "@/lib/types"; // Tipo do post
import { formatViews } from "@/lib/utils"; // Formata numero de visualizacoes

// Props do componente - recebe um post pra destacar
interface FeaturedPostProps {
  post: Post;
}

// Componente que mostra o post em destaque na home
export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/blog/${post.slug}`}> {/* Link pro post completo */}
      <article className="relative rounded-3xl overflow-hidden group cursor-pointer">
        <img
          src={post.coverImage} // Imagem de capa do post
          alt={post.title}
          className="w-full h-72 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105" // Zoom no hover
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /> {/* Gradiente escuro */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white"> {/* Conteudo sobreposto */}
          <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold">
            {post.category} {/* Categoria do post */}
          </span>
          <h2 className="text-2xl md:text-4xl font-black mt-4 leading-tight group-hover:text-blue-300 transition-colors">
            {post.title} {/* Titulo do post */}
          </h2>
          <p className="text-white/80 mt-3 line-clamp-2 max-w-2xl">{post.excerpt}</p> {/* Resumo curto */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} {/* Tempo de leitura */}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {formatViews(post.views)} visualizacoes {/* Numero de views formatado */}
              </span>
            </div>
            <span className="hidden md:flex items-center gap-1 text-sm text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Ler artigo <ArrowRight className="w-4 h-4" /> {/* Call to action no hover */}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
