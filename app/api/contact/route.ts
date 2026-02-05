import { NextResponse } from "next/server";

// In-memory storage for demo purposes
const messages: Array<{
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt: string;
}> = [];

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    const errors: string[] = [];
    if (!name || name.trim().length < 2) {
      errors.push("Nome deve ter pelo menos 2 caracteres.");
    }
    if (!email || !email.includes("@")) {
      errors.push("Email invalido.");
    }
    if (!subject || subject.trim().length < 3) {
      errors.push("Assunto deve ter pelo menos 3 caracteres.");
    }
    if (!message || message.trim().length < 10) {
      errors.push("Mensagem deve ter pelo menos 10 caracteres.");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join(" ") },
        { status: 400 }
      );
    }

    messages.push({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      sentAt: new Date().toISOString(),
    });

    return NextResponse.json({
      message: "Mensagem enviada com sucesso! Responderei o mais breve possivel.",
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao enviar mensagem." },
      { status: 500 }
    );
  }
}
