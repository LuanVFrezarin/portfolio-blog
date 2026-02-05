// Tipos TypeScript pro blog

// Interface pro post do blog
export interface Post {
  id: number; // ID unico do post
  slug: string; // URL amigavel (ex: "como-usar-react")
  title: string; // Titulo do post
  excerpt: string; // Resumo curto
  content: string; // Conteudo completo em HTML
  date: string; // Data de publicacao (string ISO)
  readTime: string; // Tempo de leitura estimado (ex: "5 min")
  category: Category; // Categoria do post
  coverImage: string; // URL da imagem de capa
  views: number; // Numero de visualizacoes
  likes: number; // Numero de likes
  tags: string[]; // Array de tags
  author: Author; // Dados do autor
  featured?: boolean; // Se eh post em destaque (opcional)
}

// Interface pro autor dos posts
export interface Author {
  name: string; // Nome completo
  avatar: string; // URL do avatar
  role: string; // Cargo/funcao (ex: "Desenvolvedor Full Stack")
  bio: string; // Biografia curta
  social: { // Links das redes sociais
    github: string;
    linkedin: string;
    twitter: string;
  };
}

// Interface pro projeto/portfolio
export interface Project {
  id: number; // ID unico
  title: string; // Nome do projeto
  description: string; // Descricao curta
  longDescription: string; // Descricao detalhada
  image: string; // URL da imagem
  tags: string[]; // Tecnologias usadas
  category: string; // Categoria (ex: "Web", "Mobile")
  githubUrl: string; // Link do repositorio
  liveUrl?: string; // Link do site/app (opcional)
  featured: boolean; // Se eh projeto em destaque
}

// Interface pro comentario
export interface Comment {
  id: string; // ID unico
  postSlug: string; // Slug do post que o comentario pertence
  author: string; // Nome do autor do comentario
  email: string; // Email (pra gravatar ou notificacao)
  content: string; // Conteudo do comentario
  date: string; // Data do comentario
  avatar: string; // URL do avatar do autor
}

// Interface pra inscricao na newsletter
export interface NewsletterSubscription {
  email: string; // Email do usuario
  subscribedAt: string; // Quando se inscreveu
}

// Interface pra mensagem de contato
export interface ContactMessage {
  name: string; // Nome do usuario
  email: string; // Email
  subject: string; // Assunto
  message: string; // Mensagem
  sentAt: string; // Quando foi enviada
}

// Tipo das categorias disponiveis
export type Category =
  | "Frontend"
  | "Backend"
  | "Mobile"
  | "DevOps"
  | "Seguranca"
  | "Carreira"
  | "Banco de Dados"
  | "Arquitetura";

// Interface com info extra da categoria
export interface CategoryInfo {
  name: Category; // Nome da categoria
  label: string; // Label pra mostrar (ex: "Desenvolvimento Web")
  color: string; // Cor da categoria (ex: "#3B82F6")
  icon: string; // Nome do icone (ex: "Code")
}
