"use client"; // Componente que roda no cliente pq usa hooks de estado

import { useState } from "react"; // Hook pra gerenciar estado do form
import { Send, CheckCircle, Loader2 } from "lucide-react"; // Icones pros botoes e loading

// Componente da newsletter - formulario pra se inscrever no email
export function Newsletter() {
  const [email, setEmail] = useState(""); // Estado pro email digitado
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle"); // Status do envio
  const [message, setMessage] = useState(""); // Mensagem de sucesso ou erro

  // Funcao que manda o email pro backend quando clica em enviar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Nao deixa recarregar a pagina
    if (!email) return; // Se nao tem email, sai fora

    setStatus("loading"); // Muda pro loading

    try {
      // Faz POST pra API da newsletter
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Manda o email em JSON
      });

      const data = await res.json(); // Pega resposta

      if (res.ok) { // Se deu certo
        setStatus("success");
        setMessage(data.message);
        setEmail(""); // Limpa o campo
      } else {
        setStatus("error");
        setMessage(data.error || "Erro ao se inscrever");
      }
    } catch {
      setStatus("error");
      setMessage("Erro de conexao. Tente novamente.");
    }
  };

  // Se conseguiu se inscrever, mostra mensagem de sucesso
  if (status === "success") {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col items-center text-center gap-3">
          <CheckCircle className="w-12 h-12" /> {/* Icone de check verde */}
          <h3 className="font-bold text-xl">Inscricao confirmada!</h3>
          <p className="text-blue-100 text-sm">{message}</p> {/* Mensagem do backend */}
        </div>
      </div>
    );
  }

  // Formulario normal da newsletter
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
      <h3 className="font-bold text-xl mb-2">Newsletter</h3>
      <p className="text-blue-100 text-sm mb-4">
        Receba os melhores artigos sobre desenvolvimento diretamente no seu email.
      </p>
      <form onSubmit={handleSubmit}> {/* Form que chama handleSubmit */}
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado quando digita
          required // Campo obrigatorio
          className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 text-white outline-none focus:bg-white/30 mb-3 text-sm"
        />
        {status === "error" && ( // Mostra erro se deu ruim
          <p className="text-red-200 text-xs mb-2">{message}</p>
        )}
        <button
          type="submit"
          disabled={status === "loading"} // Desabilita enquanto carrega
          className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" /> // Spinner animado
          ) : (
            <Send className="w-4 h-4" /> // Icone de enviar
          )}
          {status === "loading" ? "Inscrevendo..." : "Inscrever-se"} {/* Texto muda conforme status */}
        </button>
      </form>
    </div>
  );
}
