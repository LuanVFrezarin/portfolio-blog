"use client"; // Marca como client component pro React, pq usa hooks de estado

import { useState } from "react"; // Hook useState pra gerenciar estado do form
import { Send, Mail, MapPin, Clock, Loader2, CheckCircle, Github, Linkedin, Twitter } from "lucide-react"; // Ícones da Lucide
import { SOCIAL_LINKS } from "@/lib/constants"; // Links das redes sociais

// Página de contato
export default function ContatoPage() {
  // Estado do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // Estado do status do envio (idle, loading, success, error)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro se der ruim

  // Função que lida com o submit do form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne reload da página
    setStatus("loading"); // Muda status pra loading
    setErrorMessage(""); // Limpa erro anterior

    try {
      // Faz POST pra API de contato
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Envia dados do form como JSON
      });

      const data = await res.json(); // Pega resposta da API

      if (res.ok) { // Se deu certo (status 200-299)
        setStatus("success"); // Status sucesso
        setFormData({ name: "", email: "", subject: "", message: "" }); // Limpa form
      } else {
        setStatus("error"); // Status erro
        setErrorMessage(data.error || "Erro ao enviar mensagem."); // Mostra erro
      }
    } catch {
      setStatus("error"); // Erro de conexão
      setErrorMessage("Erro de conexao. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header da página */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">Contato</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-3 max-w-xl">
            Tem um projeto em mente, quer trocar uma ideia ou fazer uma proposta? Envie uma mensagem!
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Infos de contato */}
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Email</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{SOCIAL_LINKS.email}</p> {/* Email dinâmico */}
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Localizacao</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Brasil</p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Disponibilidade</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Respondo em ate 24 horas
              </p>
            </div>

            {/* Redes sociais */}
            <div className="pt-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3">Redes sociais</h3>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Formulário de Contato */}
          <div className="lg:col-span-2">
            {status === "success" ? ( // Se mensagem foi enviada com sucesso
              <div className="p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200">
                  Mensagem enviada!
                </h3>
                <p className="text-green-700 dark:text-green-300 mt-2">
                  Obrigado pelo contato. Responderei o mais breve possivel.
                </p>
                <button
                  onClick={() => setStatus("idle")} // Botão pra enviar outra mensagem
                  className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit} // Chama handleSubmit no submit
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 md:p-8"
              >
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Envie uma mensagem
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Nome *
                    </label>
                    <input
                      type="text"
                      required // Campo obrigatório
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} // Atualiza estado do nome
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} // Atualiza email
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Assunto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))} // Atualiza assunto
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                    placeholder="Assunto da mensagem"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Mensagem *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))} // Atualiza mensagem
                    className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Escreva sua mensagem..."
                  />
                </div>
                {status === "error" && ( // Mostra erro se houver
                  <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"} // Desabilita botão enquanto carrega
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" /> // Spinner enquanto carrega
                  ) : (
                    <Send className="w-4 h-4" /> // Ícone de enviar
                  )}
                  {status === "loading" ? "Enviando..." : "Enviar mensagem"} {/* Texto dinâmico */}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
