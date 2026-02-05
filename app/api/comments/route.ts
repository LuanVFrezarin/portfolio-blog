import { NextResponse } from "next/server";
import { Comment } from "@/lib/types";

// In-memory storage for demo purposes
const comments: Comment[] = [
  {
    id: "1",
    postSlug: "como-criar-apis-restful-nodejs-express",
    author: "Maria Silva",
    email: "maria@example.com",
    content: "Excelente artigo! Me ajudou muito a entender a estrutura de uma API profissional. Parabens pelo conteudo!",
    date: "2025-01-16T10:30:00Z",
    avatar: "",
  },
  {
    id: "2",
    postSlug: "como-criar-apis-restful-nodejs-express",
    author: "Pedro Santos",
    email: "pedro@example.com",
    content: "Muito bom! Voce poderia fazer um artigo sobre GraphQL tambem? Seria otimo ter essa comparacao.",
    date: "2025-01-17T14:20:00Z",
    avatar: "",
  },
  {
    id: "3",
    postSlug: "react-hooks-guia-definitivo",
    author: "Ana Costa",
    email: "ana@example.com",
    content: "Finalmente entendi useCallback e useMemo! A explicacao ficou muito clara. Obrigada!",
    date: "2025-01-18T09:15:00Z",
    avatar: "",
  },
  {
    id: "4",
    postSlug: "clean-code-principios-essenciais",
    author: "Carlos Oliveira",
    email: "carlos@example.com",
    content: "Clean Code e uma leitura obrigatoria. Esse resumo ficou muito bom para referencia rapida.",
    date: "2025-01-19T16:45:00Z",
    avatar: "",
  },
  {
    id: "5",
    postSlug: "tailwind-css-guia-completo",
    author: "Julia Mendes",
    email: "julia@example.com",
    content: "Mudou minha forma de escrever CSS completamente. Tailwind e incrivel e esse guia cobre tudo!",
    date: "2025-01-20T11:00:00Z",
    avatar: "",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postSlug = searchParams.get("postSlug");

  if (!postSlug) {
    return NextResponse.json({ error: "postSlug obrigatorio" }, { status: 400 });
  }

  const postComments = comments
    .filter((c) => c.postSlug === postSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json({ comments: postComments });
}

export async function POST(request: Request) {
  try {
    const { postSlug, author, email, content } = await request.json();

    if (!postSlug || !author || !content) {
      return NextResponse.json(
        { error: "Campos obrigatorios: nome e comentario." },
        { status: 400 }
      );
    }

    if (author.trim().length < 2) {
      return NextResponse.json(
        { error: "Nome deve ter pelo menos 2 caracteres." },
        { status: 400 }
      );
    }

    if (content.trim().length < 3) {
      return NextResponse.json(
        { error: "Comentario muito curto." },
        { status: 400 }
      );
    }

    const newComment: Comment = {
      id: String(Date.now()),
      postSlug,
      author: author.trim(),
      email: email?.trim() || "",
      content: content.trim(),
      date: new Date().toISOString(),
      avatar: "",
    };

    comments.unshift(newComment);

    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Erro ao salvar comentario." },
      { status: 500 }
    );
  }
}
