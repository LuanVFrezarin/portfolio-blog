import { NextResponse } from "next/server";

// In-memory storage for demo purposes
// In production, this would be a database
const subscribers = new Set<string>();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email invalido." },
        { status: 400 }
      );
    }

    if (subscribers.has(email)) {
      return NextResponse.json(
        { error: "Este email ja esta inscrito." },
        { status: 409 }
      );
    }

    subscribers.add(email);

    return NextResponse.json({
      message: "Inscricao realizada com sucesso! Voce recebera nossos melhores artigos.",
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar inscricao." },
      { status: 500 }
    );
  }
}
