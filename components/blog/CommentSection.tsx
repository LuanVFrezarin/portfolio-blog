"use client"; // Roda no cliente pq usa hooks e fetch

import { useState, useEffect } from "react"; // useState pra estado, useEffect pra carregar comentarios
import { MessageCircle, Send, Loader2 } from "lucide-react"; // Icones pros comentarios
import { Comment } from "@/lib/types"; // Tipo do comentario
import { timeAgo, generateAvatarUrl } from "@/lib/utils"; // Funcoes auxiliares

// Props do componente - precisa do slug do post pra carregar comentarios certos
interface CommentSectionProps {
  postSlug: string;
}

// Componente da secao de comentarios dos posts
export function CommentSection({ postSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]); // Lista de comentarios
  const [loading, setLoading] = useState(true); // Se ta carregando comentarios
  const [submitting, setSubmitting] = useState(false); // Se ta enviando comentario
  const [formData, setFormData] = useState({ author: "", email: "", content: "" }); // Dados do form
  const [error, setError] = useState(""); // Mensagem de erro

  // Carrega comentarios quando o componente monta ou postSlug muda
  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  // Funcao que busca comentarios da API
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postSlug=${postSlug}`); // GET com slug do post
      const data = await res.json();
      setComments(data.comments || []); // Seta comentarios ou array vazio
    } catch {
      // Se der erro, nao faz nada (silently handle)
    } finally {
      setLoading(false); // Para de carregar
    }
  };

  // Funcao que envia novo comentario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Nao recarrega pagina
    if (!formData.author.trim() || !formData.content.trim()) { // Valida campos obrigatorios
      setError("Nome e comentario sao obrigatorios.");
      return;
    }

    setSubmitting(true); // Muda pro loading
    setError(""); // Limpa erro anterior

    try {
      // POST pro endpoint de comentarios
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, postSlug }), // Manda dados + slug do post
      });

      if (res.ok) { // Se deu certo
        const data = await res.json();
        setComments((prev) => [data.comment, ...prev]); // Adiciona comentario novo no topo
        setFormData({ author: "", email: "", content: "" }); // Limpa form
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao enviar comentario.");
      }
    } catch {
      setError("Erro de conexao. Tente novamente.");
    } finally {
      setSubmitting(false); // Para o loading
    }
  };

  // JSX do componente
  return (
    <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-8">
        <MessageCircle className="w-5 h-5" /> {/* Icone de comentario */}
        Comentarios ({comments.length}) {/* Conta quantos comentarios */}
      </h2>

      {/* Formulario pra deixar comentario */}
      <form
        onSubmit={handleSubmit} // Chama handleSubmit quando envia
        className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-8"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
          Deixe seu comentario
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Seu nome *"
            value={formData.author}
            onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))} // Atualiza nome
            className="px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 transition-colors"
            required
          />
          <input
            type="email"
            placeholder="Seu email (opcional)"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} // Atualiza email
            className="px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <textarea
          placeholder="Escreva seu comentario... *"
          rows={4}
          value={formData.content}
          onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))} // Atualiza conteudo do comentario
          className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-500 transition-colors resize-none mb-4"
          required
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>} {/* Mostra erro se tiver */}
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" /> // Spinner enquanto envia
          ) : (
            <Send className="w-4 h-4" /> // Icone de enviar
          )}
          {submitting ? "Enviando..." : "Comentar"} {/* Texto do botao muda */}
        </button>
      </form>

      {/* Lista de Comentarios */}
      {loading ? ( // Se ta carregando, mostra skeleton
        <div className="space-y-4">
          {[1, 2].map((i) => ( // Simula 2 comentarios carregando
            <div key={i} className="animate-pulse flex gap-4">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full" /> {/* Avatar placeholder */}
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" /> {/* Nome placeholder */}
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" /> {/* Comentario placeholder */}
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? ( // Se nao tem comentarios
        <p className="text-center text-slate-500 dark:text-slate-400 py-8">
          Nenhum comentario ainda. Seja o primeiro a comentar!
        </p>
      ) : ( // Se tem comentarios, mostra lista
        <div className="space-y-6">
          {comments.map((comment) => ( // Mapeia cada comentario
            <div key={comment.id} className="flex gap-4">
              <img
                src={comment.avatar || generateAvatarUrl(comment.author)} // Avatar do autor ou gerado
                alt={comment.author}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">
                    {comment.author} {/* Nome do autor */}
                  </span>
                  <span className="text-xs text-slate-500">{timeAgo(comment.date)}</span> {/* Quando foi postado */}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {comment.content} {/* Conteudo do comentario */}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
