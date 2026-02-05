import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Pagina nao encontrada
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          A pagina que voce esta procurando nao existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" /> Voltar ao inicio
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Ver artigos
          </Link>
        </div>
      </div>
    </div>
  );
}
