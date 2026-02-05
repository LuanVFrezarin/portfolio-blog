import { Post } from "@/lib/types"; // Tipo do Post definido em types.ts
import { author } from "./author"; // Dados do autor pro blog

// Array gigante com todos os posts do blog - cada post tem id, slug, titulo, resumo, conteudo HTML, etc.
// Os posts sao ordenados por data (mais recentes primeiro) e usados na listagem do blog
export const posts: Post[] = [
  {
    id: 1, // ID unico do post
    slug: "como-criar-apis-restful-nodejs-express", // URL amigavel pro post
    title: "Como criar APIs RESTful com Node.js e Express", // Titulo que aparece na pagina
    excerpt: // Resumo curto que aparece nos cards e SEO
      "Aprenda a construir APIs robustas e escalaveis usando Node.js, Express e boas praticas de desenvolvimento. Do setup inicial ao deploy.",
    content: ` // Conteudo completo em HTML - aqui vai o texto do artigo com tags HTML
      <p>APIs RESTful sao a base da comunicacao entre aplicacoes modernas. Seja um app mobile consumindo dados de um servidor, ou um frontend React se comunicando com o backend, entender como construir APIs bem estruturadas e essencial para qualquer desenvolvedor.</p>

      <h2>O que e uma API RESTful?</h2>
      <p>REST (Representational State Transfer) e um estilo arquitetural para sistemas distribuidos. Uma API RESTful segue principios como:</p>
      <ul>
        <li><strong>Stateless:</strong> cada requisicao contem todas as informacoes necessarias</li>
        <li><strong>Interface uniforme:</strong> uso consistente de metodos HTTP (GET, POST, PUT, DELETE)</li>
        <li><strong>Baseada em recursos:</strong> URLs representam recursos, nao acoes</li>
        <li><strong>Respostas padronizadas:</strong> uso correto de status codes HTTP</li>
      </ul>

      <h2>Configuracao inicial do projeto</h2>
      <p>Vamos comecar criando o projeto e instalando as dependencias necessarias:</p>
      <pre><code>mkdir minha-api && cd minha-api
npm init -y
npm install express cors helmet morgan
npm install -D typescript @types/express @types/node ts-node nodemon</code></pre>

      <p>Configure o TypeScript criando o <code>tsconfig.json</code>:</p>
      <pre><code>{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"]
}</code></pre>

      <h2>Estrutura de pastas recomendada</h2>
      <p>Uma boa organizacao de projeto e fundamental para manutenibilidade:</p>
      <pre><code>src/
  controllers/    # Logica de controle das rotas
  middlewares/    # Middlewares customizados
  models/         # Modelos de dados
  routes/         # Definicao de rotas
  services/       # Logica de negocio
  utils/          # Funcoes utilitarias
  app.ts          # Configuracao do Express
  server.ts       # Ponto de entrada</code></pre>

      <h2>Criando o servidor Express</h2>
      <p>O arquivo principal configura o Express com middlewares essenciais de seguranca e logging:</p>
      <pre><code>import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { router } from './routes';

const app = express();

// Middlewares de seguranca e utilidade
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rotas
app.use('/api', router);

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor'
  });
});

export default app;</code></pre>

      <h2>Implementando rotas CRUD</h2>
      <p>Vamos criar um CRUD completo para um recurso de usuarios. O controller separa a logica da definicao de rotas:</p>
      <pre><code>// controllers/userController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  static async getAll(req: Request, res: Response) {
    const { page = 1, limit = 10 } = req.query;
    const users = await UserService.findAll(
      Number(page),
      Number(limit)
    );
    res.json({ data: users, page, limit });
  }

  static async getById(req: Request, res: Response) {
    const user = await UserService.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: 'Usuario nao encontrado'
      });
    }
    res.json({ data: user });
  }

  static async create(req: Request, res: Response) {
    const user = await UserService.create(req.body);
    res.status(201).json({ data: user });
  }

  static async update(req: Request, res: Response) {
    const user = await UserService.update(
      req.params.id,
      req.body
    );
    res.json({ data: user });
  }

  static async delete(req: Request, res: Response) {
    await UserService.delete(req.params.id);
    res.status(204).send();
  }
}</code></pre>

      <h2>Validacao de dados com middleware</h2>
      <p>Nunca confie em dados enviados pelo cliente. Sempre valide as entradas:</p>
      <pre><code>// middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';

export function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email } = req.body;
  const errors: string[] = [];

  if (!name || name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }

  if (!email || !email.includes('@')) {
    errors.push('Email invalido');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}</code></pre>

      <h2>Boas praticas essenciais</h2>
      <ul>
        <li><strong>Versionamento:</strong> use prefixo como <code>/api/v1/</code> nas rotas</li>
        <li><strong>Paginacao:</strong> sempre pagine listagens com <code>page</code> e <code>limit</code></li>
        <li><strong>Status codes:</strong> 200 (OK), 201 (Created), 204 (No Content), 400 (Bad Request), 404 (Not Found), 500 (Internal Error)</li>
        <li><strong>Tratamento de erros:</strong> middleware global de erros com mensagens claras</li>
        <li><strong>CORS:</strong> configure adequadamente para producao</li>
        <li><strong>Rate limiting:</strong> proteja contra abuso com express-rate-limit</li>
      </ul>

      <h2>Conclusao</h2>
      <p>Construir APIs RESTful bem estruturadas e uma habilidade fundamental. Seguindo esses padroes de organizacao, validacao e seguranca, voce cria backends que sao faceis de manter, testar e escalar. O proximo passo e conectar a um banco de dados como PostgreSQL e adicionar autenticacao JWT.</p>
    `,
    date: "2025-01-15", // Data de publicacao no formato YYYY-MM-DD
    readTime: "8 min de leitura", // Tempo estimado de leitura
    category: "Backend", // Categoria do post (Backend, Frontend, etc.)
    coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=500&fit=crop", // URL da imagem de capa
    views: 3420, // Numero de visualizacoes (fake pra demo)
    likes: 189, // Numero de likes (fake pra demo)
    tags: ["Node.js", "Express", "API", "REST", "TypeScript"], // Tags do post pra SEO e filtros
    author, // Dados do autor (importado do author.ts)
    featured: true, // Se eh post em destaque (aparece na home)
  },
  {
    id: 2,
    slug: "react-native-vs-flutter-qual-escolher",
    title: "React Native vs Flutter: Qual escolher para seu projeto?",
    excerpt:
      "Uma analise completa e imparcial das duas principais tecnologias para desenvolvimento mobile multiplataforma em 2025.",
    content: `
      <p>A escolha entre React Native e Flutter e uma das decisoes mais importantes ao iniciar um projeto mobile multiplataforma. Ambas as tecnologias evoluiram significativamente e cada uma tem vantagens distintas.</p>

      <h2>React Native: o poder do ecossistema JavaScript</h2>
      <p>Criado pelo Facebook (Meta) em 2015, React Native permite criar apps nativos usando JavaScript e React. Sua maior forca esta no ecossistema:</p>
      <ul>
        <li><strong>Reutilizacao de conhecimento:</strong> desenvolvedores web com React ja sabem a base</li>
        <li><strong>Ecossistema NPM:</strong> acesso a milhares de pacotes JavaScript</li>
        <li><strong>Hot Reload:</strong> desenvolvimento rapido com atualizacoes instantaneas</li>
        <li><strong>Componentes nativos:</strong> renderiza componentes nativos da plataforma</li>
        <li><strong>Comunidade gigante:</strong> facil encontrar solucoes e desenvolvedores</li>
      </ul>

      <pre><code>// Exemplo React Native - Componente funcional
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;View style={styles.container}&gt;
      &lt;Text style={styles.text}&gt;Contador: {count}&lt;/Text&gt;
      &lt;TouchableOpacity
        style={styles.button}
        onPress={() => setCount(c => c + 1)}
      &gt;
        &lt;Text style={styles.buttonText}&gt;Incrementar&lt;/Text&gt;
      &lt;/TouchableOpacity&gt;
    &lt;/View&gt;
  );
}</code></pre>

      <h2>Flutter: performance e UI customizada</h2>
      <p>Desenvolvido pelo Google, Flutter usa a linguagem Dart e possui seu proprio engine de renderizacao. Destaques:</p>
      <ul>
        <li><strong>Performance superior:</strong> compila para codigo nativo ARM</li>
        <li><strong>UI consistente:</strong> mesma aparencia em todas as plataformas</li>
        <li><strong>Material Design e Cupertino:</strong> widgets prontos de alta qualidade</li>
        <li><strong>Dart:</strong> linguagem moderna, tipada e facil de aprender</li>
        <li><strong>Multiplaforma real:</strong> mobile, web, desktop e embedded</li>
      </ul>

      <pre><code>// Exemplo Flutter - Widget com estado
import 'package:flutter/material.dart';

class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State&lt;Counter&gt; {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('Contador: $_count',
          style: TextStyle(fontSize: 24)),
        ElevatedButton(
          onPressed: () => setState(() => _count++),
          child: Text('Incrementar'),
        ),
      ],
    );
  }
}</code></pre>

      <h2>Comparacao tecnica detalhada</h2>

      <h3>Performance</h3>
      <p>Flutter tem vantagem em performance pura, pois compila diretamente para ARM e possui seu proprio engine de renderizacao (Skia/Impeller). React Native depende de uma bridge JavaScript para se comunicar com componentes nativos, embora a nova arquitetura (Fabric + TurboModules) tenha reduzido esse overhead significativamente.</p>

      <h3>Desenvolvimento e produtividade</h3>
      <p>React Native leva vantagem para equipes que ja conhecem JavaScript/React. A curva de aprendizado e menor e a reutilizacao de codigo com projetos web e real. Flutter exige aprender Dart, mas a linguagem e intuitiva e bem documentada.</p>

      <h3>Ecossistema e bibliotecas</h3>
      <p>React Native tem acesso ao ecossistema NPM inteiro, o que significa mais opcoes de bibliotecas. Flutter tem o pub.dev com bibliotecas de alta qualidade, mas em menor quantidade. Ambos tem solucoes maduras para navegacao, estado, HTTP e storage.</p>

      <h2>Quando usar cada um?</h2>
      <p><strong>Escolha React Native quando:</strong></p>
      <ul>
        <li>Sua equipe ja conhece JavaScript e React</li>
        <li>Precisa compartilhar codigo com uma aplicacao web React</li>
        <li>O app precisa de aparencia nativa da plataforma</li>
        <li>Integracao com muitas bibliotecas JavaScript existentes</li>
      </ul>

      <p><strong>Escolha Flutter quando:</strong></p>
      <ul>
        <li>Performance e prioridade maxima</li>
        <li>UI altamente customizada e consistente entre plataformas</li>
        <li>Projeto novo sem dependencia de ecossistema existente</li>
        <li>Planos de expandir para desktop e web com o mesmo codigo</li>
      </ul>

      <h2>Conclusao</h2>
      <p>Nao existe resposta universal. Ambas sao excelentes opcoes para desenvolvimento mobile multiplataforma. A decisao deve considerar a experiencia da equipe, requisitos do projeto e planos de longo prazo. O importante e dominar bem a ferramenta escolhida e seguir as boas praticas de cada ecossistema.</p>
    `,
    date: "2025-01-10",
    readTime: "12 min de leitura",
    category: "Mobile",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
    views: 5230,
    likes: 312,
    tags: ["React Native", "Flutter", "Mobile", "Multiplataforma"],
    author,
    featured: true,
  },
  {
    id: 3,
    slug: "tailwind-css-guia-completo",
    title: "Tailwind CSS: Guia completo do zero ao avancado",
    excerpt:
      "Domine o framework CSS mais popular do momento. Aprenda utility-first, customizacao, responsividade e tecnicas avancadas.",
    content: `
      <p>Tailwind CSS revolucionou a forma como escrevemos CSS. Com sua abordagem utility-first, voce constroi interfaces complexas sem sair do HTML, aumentando drasticamente a produtividade. Neste guia, vamos do basico ao avancado.</p>

      <h2>Por que Tailwind CSS?</h2>
      <p>Antes do Tailwind, escrever CSS significava criar classes semanticas, lidar com especificidade e manter arquivos CSS enormes. Tailwind resolve esses problemas com classes utilitarias atomicas:</p>
      <ul>
        <li><strong>Sem naming:</strong> nunca mais perca tempo pensando em nomes de classes</li>
        <li><strong>Sem CSS morto:</strong> purge automatico remove classes nao usadas</li>
        <li><strong>Consistencia:</strong> sistema de design integrado com escala de espacamento e cores</li>
        <li><strong>Responsividade:</strong> prefixos como <code>md:</code> e <code>lg:</code> simplificam media queries</li>
        <li><strong>Dark mode:</strong> suporte nativo com prefixo <code>dark:</code></li>
      </ul>

      <h2>Instalacao e configuracao</h2>
      <p>Instalar Tailwind em um projeto Next.js e simples:</p>
      <pre><code>npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>

      <p>Configure o <code>tailwind.config.js</code> para escanear seus arquivos:</p>
      <pre><code>/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a5f',
        },
      },
    },
  },
  plugins: [],
}</code></pre>

      <h2>Fundamentos: as classes mais usadas</h2>

      <h3>Layout e espacamento</h3>
      <pre><code>&lt;!-- Flexbox --&gt;
&lt;div class="flex items-center justify-between gap-4"&gt;
  &lt;div class="flex-1"&gt;Conteudo&lt;/div&gt;
  &lt;div class="w-48"&gt;Sidebar&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Grid --&gt;
&lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
  &lt;div class="p-6 rounded-lg bg-white shadow"&gt;Card&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Espacamento --&gt;
&lt;div class="px-4 py-8 mx-auto max-w-7xl"&gt;
  &lt;h1 class="mb-4 mt-8"&gt;Titulo&lt;/h1&gt;
&lt;/div&gt;</code></pre>

      <h3>Tipografia</h3>
      <pre><code>&lt;h1 class="text-4xl font-black text-slate-900 tracking-tight"&gt;
  Titulo Principal
&lt;/h1&gt;
&lt;p class="text-lg text-slate-600 leading-relaxed"&gt;
  Paragrafo com boa legibilidade
&lt;/p&gt;
&lt;span class="text-sm font-medium text-blue-600"&gt;
  Destaque
&lt;/span&gt;</code></pre>

      <h2>Responsividade mobile-first</h2>
      <p>Tailwind usa abordagem mobile-first. As classes sem prefixo aplicam em todas as telas, e os prefixos adicionam estilos para telas maiores:</p>
      <pre><code>&lt;!-- 1 coluna no mobile, 2 no tablet, 3 no desktop --&gt;
&lt;div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
  ...
&lt;/div&gt;

&lt;!-- Texto menor no mobile, maior no desktop --&gt;
&lt;h1 class="text-2xl md:text-4xl lg:text-5xl"&gt;
  Titulo Responsivo
&lt;/h1&gt;

&lt;!-- Esconder/mostrar elementos --&gt;
&lt;nav class="hidden md:flex"&gt;Menu Desktop&lt;/nav&gt;
&lt;button class="md:hidden"&gt;Menu Mobile&lt;/button&gt;</code></pre>

      <h2>Dark mode</h2>
      <p>Com <code>darkMode: 'class'</code> no config, basta usar o prefixo <code>dark:</code>:</p>
      <pre><code>&lt;div class="bg-white dark:bg-slate-900"&gt;
  &lt;h1 class="text-slate-900 dark:text-white"&gt;
    Funciona em ambos os temas
  &lt;/h1&gt;
  &lt;p class="text-slate-600 dark:text-slate-300"&gt;
    Texto adaptavel
  &lt;/p&gt;
&lt;/div&gt;</code></pre>

      <h2>Tecnicas avancadas</h2>

      <h3>Animacoes e transicoes</h3>
      <pre><code>&lt;button class="
  bg-blue-600 text-white px-6 py-3 rounded-lg
  hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5
  active:translate-y-0
  transition-all duration-200
"&gt;
  Botao Animado
&lt;/button&gt;</code></pre>

      <h3>Group e peer</h3>
      <pre><code>&lt;!-- Hover no pai afeta o filho --&gt;
&lt;div class="group cursor-pointer"&gt;
  &lt;img class="group-hover:scale-105 transition-transform" /&gt;
  &lt;h2 class="group-hover:text-blue-600 transition-colors"&gt;
    Titulo
  &lt;/h2&gt;
&lt;/div&gt;</code></pre>

      <h2>Conclusao</h2>
      <p>Tailwind CSS e uma ferramenta poderosa que, quando dominada, acelera drasticamente o desenvolvimento de interfaces. A chave e entender o sistema de design por tras das classes e usar componentes para evitar repeticao. Combine com frameworks como React ou Vue e voce tera uma stack de frontend extremamente produtiva.</p>
    `,
    date: "2025-01-05",
    readTime: "15 min de leitura",
    category: "Frontend",
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=500&fit=crop",
    views: 7890,
    likes: 534,
    tags: ["Tailwind CSS", "CSS", "Frontend", "Design"],
    author,
  },
  {
    id: 4,
    slug: "autenticacao-jwt-nextjs",
    title: "Autenticacao JWT na pratica com Next.js",
    excerpt:
      "Implemente autenticacao segura em suas aplicacoes usando JSON Web Tokens, middleware e refresh tokens.",
    content: `
      <p>Autenticacao e um dos aspectos mais criticos de qualquer aplicacao web. JSON Web Tokens (JWT) oferecem uma forma stateless e escalavel de gerenciar sessoes de usuario. Vamos implementar um sistema completo com Next.js.</p>

      <h2>Como funciona o JWT?</h2>
      <p>Um JWT e composto por tres partes separadas por ponto:</p>
      <ul>
        <li><strong>Header:</strong> algoritmo de assinatura e tipo do token</li>
        <li><strong>Payload:</strong> dados do usuario (claims) como id, email e permissoes</li>
        <li><strong>Signature:</strong> assinatura que garante integridade do token</li>
      </ul>
      <pre><code>// Estrutura de um JWT
eyJhbGciOiJIUzI1NiJ9.        // Header (base64)
eyJ1c2VySWQiOjEsImVtYWlsIjoi // Payload (base64)
dXNlckBleGFtcGxlLmNvbSJ9.
SflKxwRJSMeKKF2QT4fwpMeJf36P // Signature</code></pre>

      <h2>Configurando o projeto</h2>
      <pre><code>npm install jose bcryptjs
npm install -D @types/bcryptjs</code></pre>
      <p>Usamos <code>jose</code> em vez de <code>jsonwebtoken</code> porque e compativel com Edge Runtime do Next.js.</p>

      <h2>Criando funcoes de token</h2>
      <pre><code>// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export async function signToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}</code></pre>

      <h2>API Route de login</h2>
      <pre><code>// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Buscar usuario no banco
  const user = await findUserByEmail(email);
  if (!user) {
    return NextResponse.json(
      { error: 'Credenciais invalidas' },
      { status: 401 }
    );
  }

  // Verificar senha
  const validPassword = await bcrypt.compare(
    password, user.passwordHash
  );
  if (!validPassword) {
    return NextResponse.json(
      { error: 'Credenciais invalidas' },
      { status: 401 }
    );
  }

  // Gerar token
  const token = await signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // Setar cookie HttpOnly
  const response = NextResponse.json({
    user: { id: user.id, name: user.name }
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 3600, // 1 hora
  });

  return response;
}</code></pre>

      <h2>Middleware de protecao de rotas</h2>
      <pre><code>// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Rotas protegidas
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(
        new URL('/login', request.url)
      );
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(
        new URL('/login', request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};</code></pre>

      <h2>Boas praticas de seguranca</h2>
      <ul>
        <li><strong>Cookies HttpOnly:</strong> impede acesso via JavaScript (protege contra XSS)</li>
        <li><strong>Expiracao curta:</strong> tokens de acesso devem expirar em 15min a 1h</li>
        <li><strong>Refresh tokens:</strong> tokens de longa duracao armazenados com seguranca para renovar o acesso</li>
        <li><strong>HTTPS obrigatorio:</strong> sempre use <code>secure: true</code> em producao</li>
        <li><strong>Rotacao de secrets:</strong> troque a chave secreta periodicamente</li>
      </ul>

      <h2>Conclusao</h2>
      <p>JWT e uma solucao solida para autenticacao em aplicacoes Next.js. A combinacao de tokens de curta duracao com cookies HttpOnly oferece um bom equilibrio entre seguranca e experiencia do usuario. Para producao, considere usar bibliotecas como NextAuth.js que abstraem muita da complexidade.</p>
    `,
    date: "2025-01-01",
    readTime: "10 min de leitura",
    category: "Seguranca",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
    views: 4230,
    likes: 198,
    tags: ["JWT", "Autenticacao", "Seguranca", "Next.js"],
    author,
  },
  {
    id: 5,
    slug: "deploy-automatizado-github-actions",
    title: "Deploy automatizado com GitHub Actions",
    excerpt:
      "Configure pipelines de CI/CD profissionais para seus projetos usando GitHub Actions. Do teste ao deploy automatico.",
    content: `
      <p>Automacao de deploy e essencial para equipes modernas. GitHub Actions oferece uma plataforma gratuita e poderosa para criar pipelines de CI/CD diretamente no seu repositorio. Vamos configurar um pipeline completo.</p>

      <h2>O que sao GitHub Actions?</h2>
      <p>GitHub Actions e uma plataforma de automacao integrada ao GitHub que permite criar workflows personalizados. Um workflow e composto por:</p>
      <ul>
        <li><strong>Triggers:</strong> eventos que disparam o workflow (push, pull request, schedule)</li>
        <li><strong>Jobs:</strong> conjunto de steps que rodam em paralelo ou sequencialmente</li>
        <li><strong>Steps:</strong> comandos individuais ou acoes reutilizaveis</li>
        <li><strong>Actions:</strong> acoes pre-construidas pela comunidade</li>
      </ul>

      <h2>Pipeline de CI basico</h2>
      <p>Crie o arquivo <code>.github/workflows/ci.yml</code>:</p>
      <pre><code>name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18, 20]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Instalar dependencias
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Testes
        run: npm test -- --coverage

      - name: Build
        run: npm run build</code></pre>

      <h2>Deploy automatico para Vercel</h2>
      <pre><code>name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Instalar dependencias
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'</code></pre>

      <h2>Secrets e variaveis de ambiente</h2>
      <p>Nunca exponha credenciais no codigo. Use GitHub Secrets:</p>
      <ol>
        <li>Acesse <strong>Settings > Secrets and variables > Actions</strong></li>
        <li>Clique em <strong>New repository secret</strong></li>
        <li>Adicione cada variavel sensivel (tokens, chaves de API)</li>
        <li>Referencie no workflow como <code>\${{ secrets.NOME_DA_SECRET }}</code></li>
      </ol>

      <h2>Pipeline completo com ambiente de staging</h2>
      <pre><code>name: Full Pipeline

on:
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm test

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - name: Deploy Staging
        run: echo "Deploy para staging..."

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - name: Deploy Production
        run: echo "Deploy para producao..."</code></pre>

      <h2>Dicas avancadas</h2>
      <ul>
        <li><strong>Cache de dependencias:</strong> use <code>actions/cache</code> ou a opcao <code>cache</code> do setup-node</li>
        <li><strong>Matrix builds:</strong> teste em multiplas versoes de Node.js simultaneamente</li>
        <li><strong>Environments:</strong> configure ambientes com regras de aprovacao</li>
        <li><strong>Concurrency:</strong> cancele workflows antigos com <code>concurrency</code></li>
        <li><strong>Reusable workflows:</strong> crie workflows reutilizaveis com <code>workflow_call</code></li>
      </ul>

      <h2>Conclusao</h2>
      <p>GitHub Actions e uma ferramenta essencial no toolkit de qualquer desenvolvedor. Com pipelines bem configurados, voce garante qualidade de codigo, evita deploys quebrados e acelera o ciclo de desenvolvimento. Comece simples e va adicionando complexidade conforme necessario.</p>
    `,
    date: "2024-12-28",
    readTime: "9 min de leitura",
    category: "DevOps",
    coverImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=500&fit=crop",
    views: 2890,
    likes: 176,
    tags: ["GitHub Actions", "CI/CD", "DevOps", "Deploy"],
    author,
  },
  {
    id: 6,
    slug: "clean-code-principios-essenciais",
    title: "Clean Code: Principios que todo desenvolvedor precisa saber",
    excerpt:
      "Aprenda os principios fundamentais de codigo limpo que vao transformar a qualidade dos seus projetos e sua carreira.",
    content: `
      <p>Codigo limpo nao e sobre escrever codigo que funciona — e sobre escrever codigo que outros desenvolvedores (incluindo voce no futuro) conseguem entender, manter e evoluir. Vamos explorar os principios mais importantes.</p>

      <h2>Nomes significativos</h2>
      <p>Variaveis, funcoes e classes devem ter nomes que revelam sua intencao. O nome deve responder: por que existe, o que faz e como e usado.</p>
      <pre><code>// Ruim
const d = new Date();
const list = users.filter(u => u.a > 18);
function calc(a, b) { return a * b * 0.1; }

// Bom
const currentDate = new Date();
const adultUsers = users.filter(user => user.age > 18);
function calculateDiscount(price, quantity) {
  const discountRate = 0.1;
  return price * quantity * discountRate;
}</code></pre>

      <h2>Funcoes pequenas e focadas</h2>
      <p>Cada funcao deve fazer apenas uma coisa e faze-la bem. Se voce precisa usar "e" para descrever o que a funcao faz, ela provavelmente faz demais.</p>
      <pre><code>// Ruim - faz muitas coisas
function processOrder(order) {
  // valida
  if (!order.items.length) throw new Error();
  if (!order.userId) throw new Error();

  // calcula total
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.qty;
  }

  // aplica desconto
  if (total > 100) total *= 0.9;

  // salva no banco
  db.orders.insert({ ...order, total });

  // envia email
  sendEmail(order.userId, 'Pedido confirmado');
}

// Bom - cada funcao faz uma coisa
function processOrder(order) {
  validateOrder(order);
  const total = calculateTotal(order.items);
  const finalTotal = applyDiscount(total);
  const savedOrder = saveOrder({ ...order, total: finalTotal });
  notifyUser(order.userId, savedOrder);
}</code></pre>

      <h2>Principio DRY - Dont Repeat Yourself</h2>
      <p>Duplicacao de codigo e um dos maiores inimigos da manutenibilidade. Quando a mesma logica existe em multiplos lugares, uma mudanca exige alteracao em todos eles.</p>
      <pre><code>// Ruim - logica duplicada
function formatUserName(user) {
  return user.firstName.charAt(0).toUpperCase()
    + user.firstName.slice(1) + ' '
    + user.lastName.charAt(0).toUpperCase()
    + user.lastName.slice(1);
}

// Bom - extrair funcao reutilizavel
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatUserName(user) {
  return capitalize(user.firstName)
    + ' ' + capitalize(user.lastName);
}</code></pre>

      <h2>Principio SOLID</h2>
      <p>SOLID sao cinco principios de design orientado a objetos:</p>
      <ul>
        <li><strong>S - Single Responsibility:</strong> cada classe/modulo tem uma unica responsabilidade</li>
        <li><strong>O - Open/Closed:</strong> aberto para extensao, fechado para modificacao</li>
        <li><strong>L - Liskov Substitution:</strong> subclasses devem ser substituiveis por suas classes base</li>
        <li><strong>I - Interface Segregation:</strong> interfaces especificas sao melhores que uma interface generica</li>
        <li><strong>D - Dependency Inversion:</strong> dependa de abstracoes, nao de implementacoes concretas</li>
      </ul>

      <h2>Tratamento de erros</h2>
      <p>Erros devem ser tratados de forma explicita e nao escondidos:</p>
      <pre><code>// Ruim - engolindo erros
try {
  const data = await fetchUser(id);
  return data;
} catch (e) {
  return null; // O que aconteceu? Ninguem sabe.
}

// Bom - tratamento explicito
try {
  const data = await fetchUser(id);
  return data;
} catch (error) {
  if (error instanceof NotFoundError) {
    throw new AppError('Usuario nao encontrado', 404);
  }
  logger.error('Falha ao buscar usuario', { id, error });
  throw new AppError('Erro ao buscar usuario', 500);
}</code></pre>

      <h2>Comentarios: quando usar</h2>
      <p>Codigo limpo minimiza a necessidade de comentarios. Porem, existem situacoes validas:</p>
      <ul>
        <li><strong>Sim:</strong> explicar o "por que" de uma decisao nao obvia</li>
        <li><strong>Sim:</strong> avisos sobre consequencias</li>
        <li><strong>Sim:</strong> documentacao publica (JSDoc para APIs)</li>
        <li><strong>Nao:</strong> explicar o "o que" o codigo faz (o proprio codigo deve fazer isso)</li>
        <li><strong>Nao:</strong> codigo comentado (use git para historico)</li>
      </ul>

      <h2>Conclusao</h2>
      <p>Clean Code e uma pratica continua, nao um destino. Cada commit e uma oportunidade de deixar o codigo melhor do que encontrou. Leia o livro "Clean Code" de Robert C. Martin e pratique esses principios diariamente. Seu eu do futuro agradecera.</p>
    `,
    date: "2024-12-20",
    readTime: "11 min de leitura",
    category: "Carreira",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
    views: 6540,
    likes: 423,
    tags: ["Clean Code", "Boas Praticas", "SOLID", "Carreira"],
    author,
    featured: true,
  },
  {
    id: 7,
    slug: "typescript-por-que-usar",
    title: "TypeScript: Por que voce deveria usar em todos os projetos",
    excerpt:
      "Descubra como TypeScript previne bugs, melhora a produtividade e torna seu codigo mais robusto e documentado.",
    content: `
      <p>TypeScript se tornou o padrao da industria para projetos JavaScript serios. Empresas como Google, Microsoft, Airbnb e Stripe adotaram TypeScript e os beneficios sao claros: menos bugs, melhor documentacao e refatoracao mais segura.</p>

      <h2>O que e TypeScript?</h2>
      <p>TypeScript e um superset de JavaScript que adiciona tipagem estatica. Todo codigo JavaScript valido e TypeScript valido, mas TypeScript adiciona tipos, interfaces e outras features que o compilador verifica antes da execucao.</p>

      <h2>Beneficios concretos</h2>
      <ul>
        <li><strong>Deteccao de bugs em tempo de desenvolvimento:</strong> erros de tipo sao pegos pelo editor antes de rodar o codigo</li>
        <li><strong>Autocompletar inteligente:</strong> o editor sabe exatamente quais propriedades e metodos estao disponiveis</li>
        <li><strong>Refatoracao segura:</strong> renomear uma propriedade atualiza todas as referencias</li>
        <li><strong>Documentacao viva:</strong> tipos servem como documentacao que nunca fica desatualizada</li>
        <li><strong>Melhor colaboracao:</strong> interfaces definem contratos claros entre partes do codigo</li>
      </ul>

      <h2>Tipos fundamentais</h2>
      <pre><code>// Tipos basicos
let nome: string = "Luan";
let idade: number = 25;
let ativo: boolean = true;
let lista: number[] = [1, 2, 3];

// Interfaces - definem forma de objetos
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// Type aliases
type ID = string | number;
type Status = 'active' | 'inactive' | 'pending';

// Funcoes tipadas
function findUser(id: number): User | undefined {
  return users.find(user => user.id === id);
}

// Generics - tipos reutilizaveis
interface ApiResponse&lt;T&gt; {
  data: T;
  status: number;
  message: string;
}

async function fetchData&lt;T&gt;(url: string): Promise&lt;ApiResponse&lt;T&gt;&gt; {
  const response = await fetch(url);
  return response.json();
}</code></pre>

      <h2>Utility Types poderosos</h2>
      <pre><code>interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial - todas as propriedades opcionais
type UpdateUser = Partial&lt;User&gt;;

// Pick - selecionar propriedades
type UserPreview = Pick&lt;User, 'id' | 'name'&gt;;

// Omit - remover propriedades
type PublicUser = Omit&lt;User, 'password'&gt;;

// Record - mapear chaves para valores
type UserRoles = Record&lt;string, 'admin' | 'user'&gt;;

// ReturnType - extrair tipo de retorno
type FetchResult = ReturnType&lt;typeof fetchData&gt;;</code></pre>

      <h2>Patterns avancados</h2>
      <pre><code>// Discriminated Unions - pattern matching seguro
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
  }
}

// Type Guards
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processInput(input: string | number) {
  if (isString(input)) {
    console.log(input.toUpperCase()); // TypeScript sabe que e string
  } else {
    console.log(input.toFixed(2)); // TypeScript sabe que e number
  }
}</code></pre>

      <h2>Configuracao recomendada</h2>
      <pre><code>{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}</code></pre>
      <p>A regra de ouro: ative <code>strict: true</code> desde o inicio. E muito mais facil comecar estrito do que migrar depois.</p>

      <h2>Conclusao</h2>
      <p>TypeScript nao e apenas "JavaScript com tipos". E uma ferramenta que muda fundamentalmente como voce desenvolve, pensa sobre contratos de dados e colabora em equipe. O investimento inicial em aprender tipos compensa enormemente em produtividade e qualidade de codigo.</p>
    `,
    date: "2024-12-15",
    readTime: "10 min de leitura",
    category: "Frontend",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop",
    views: 5670,
    likes: 367,
    tags: ["TypeScript", "JavaScript", "Tipagem", "Frontend"],
    author,
  },
  {
    id: 8,
    slug: "docker-para-desenvolvedores",
    title: "Docker para desenvolvedores: Guia pratico completo",
    excerpt:
      "Aprenda Docker do zero: containers, Dockerfile, Docker Compose e como usar no dia a dia do desenvolvimento.",
    content: `
      <p>Docker revolucionou a forma como desenvolvemos, testamos e fazemos deploy de aplicacoes. Com containers, voce garante que o ambiente de desenvolvimento e identico ao de producao, eliminando o classico "funciona na minha maquina".</p>

      <h2>Conceitos fundamentais</h2>
      <ul>
        <li><strong>Container:</strong> instancia isolada e leve de uma aplicacao com todas as suas dependencias</li>
        <li><strong>Imagem:</strong> template imutavel usado para criar containers (como uma classe)</li>
        <li><strong>Dockerfile:</strong> arquivo de instrucoes para construir uma imagem</li>
        <li><strong>Volume:</strong> persistencia de dados fora do container</li>
        <li><strong>Network:</strong> rede virtual para comunicacao entre containers</li>
      </ul>

      <h2>Dockerfile para Node.js</h2>
      <pre><code># Imagem base
FROM node:20-alpine

# Diretorio de trabalho dentro do container
WORKDIR /app

# Copiar arquivos de dependencia primeiro (cache layer)
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar codigo fonte
COPY . .

# Build da aplicacao
RUN npm run build

# Expor porta
EXPOSE 3000

# Comando de execucao
CMD ["node", "dist/server.js"]</code></pre>

      <h2>Docker Compose para desenvolvimento</h2>
      <p>Docker Compose orquestra multiplos containers. Ideal para rodar sua aplicacao com banco de dados, cache e outros servicos:</p>
      <pre><code># docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:</code></pre>

      <h2>Comandos essenciais</h2>
      <pre><code># Construir imagem
docker build -t minha-app .

# Rodar container
docker run -d -p 3000:3000 --name app minha-app

# Docker Compose
docker compose up -d          # Iniciar todos os servicos
docker compose down           # Parar todos
docker compose logs -f app    # Ver logs em tempo real
docker compose exec app sh    # Acessar shell do container

# Gerenciamento
docker ps                     # Listar containers rodando
docker images                 # Listar imagens
docker system prune           # Limpar recursos nao usados</code></pre>

      <h2>Multi-stage build para producao</h2>
      <p>Multi-stage builds criam imagens menores separando build e runtime:</p>
      <pre><code># Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime (imagem final menor)
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["node", "dist/server.js"]</code></pre>

      <h2>Boas praticas</h2>
      <ul>
        <li>Use imagens <code>alpine</code> para menor tamanho</li>
        <li>Crie <code>.dockerignore</code> para excluir node_modules, .git, etc</li>
        <li>Ordene instrucoes do Dockerfile por frequencia de mudanca (cache)</li>
        <li>Use multi-stage builds para imagens de producao</li>
        <li>Nunca rode containers como root em producao</li>
        <li>Use health checks para monitoramento</li>
      </ul>

      <h2>Conclusao</h2>
      <p>Docker e uma ferramenta indispensavel no desenvolvimento moderno. Dominar containers, Compose e boas praticas de build vai facilitar seu dia a dia e preparar seus projetos para deploy profissional em qualquer plataforma cloud.</p>
    `,
    date: "2024-12-08",
    readTime: "12 min de leitura",
    category: "DevOps",
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=500&fit=crop",
    views: 4120,
    likes: 287,
    tags: ["Docker", "DevOps", "Containers", "Docker Compose"],
    author,
  },
  {
    id: 9,
    slug: "microsservicos-vs-monolito",
    title: "Microsservicos vs Monolito: Quando usar cada abordagem",
    excerpt:
      "Entenda as diferencas, vantagens e desvantagens de cada arquitetura e saiba quando escolher uma ou outra.",
    content: `
      <p>A escolha entre arquitetura monolitica e microsservicos e uma das decisoes mais impactantes em um projeto de software. Nao existe resposta certa universal — depende do contexto, do time e do estagio do projeto.</p>

      <h2>Arquitetura monolitica</h2>
      <p>Um monolito e uma aplicacao unica onde todos os componentes compartilham o mesmo processo, banco de dados e deployment. E a abordagem tradicional e continua sendo a escolha certa para muitos cenarios.</p>
      <pre><code>// Estrutura tipica de um monolito Node.js
src/
  modules/
    users/
      user.controller.ts
      user.service.ts
      user.model.ts
    orders/
      order.controller.ts
      order.service.ts
      order.model.ts
    products/
      product.controller.ts
      product.service.ts
      product.model.ts
  shared/
    database.ts
    auth.ts
    logger.ts
  app.ts</code></pre>

      <h3>Vantagens do monolito</h3>
      <ul>
        <li><strong>Simplicidade:</strong> um unico projeto, um deploy, um banco</li>
        <li><strong>Desenvolvimento rapido:</strong> sem overhead de comunicacao entre servicos</li>
        <li><strong>Debugging facil:</strong> stack traces completos, debugging local simples</li>
        <li><strong>Transacoes ACID:</strong> consistencia de dados nativa do banco</li>
        <li><strong>Menor custo operacional:</strong> menos infraestrutura para gerenciar</li>
      </ul>

      <h2>Arquitetura de microsservicos</h2>
      <p>Microsservicos dividem a aplicacao em servicos independentes, cada um com seu proprio banco de dados e deployment. Comunicam-se via HTTP, gRPC ou mensageria.</p>
      <pre><code>// Arquitetura de microsservicos
services/
  user-service/        # Porta 3001
    src/
    Dockerfile
    package.json
  order-service/       # Porta 3002
    src/
    Dockerfile
    package.json
  product-service/     # Porta 3003
    src/
    Dockerfile
    package.json
  api-gateway/         # Porta 3000
    src/
    Dockerfile
    package.json
docker-compose.yml</code></pre>

      <h3>Vantagens dos microsservicos</h3>
      <ul>
        <li><strong>Escalabilidade independente:</strong> escale apenas o servico que precisa</li>
        <li><strong>Tecnologias diversas:</strong> cada servico pode usar a stack ideal</li>
        <li><strong>Deploy independente:</strong> atualize um servico sem afetar outros</li>
        <li><strong>Resiliencia:</strong> falha de um servico nao derruba toda a aplicacao</li>
        <li><strong>Times autonomos:</strong> equipes podem trabalhar independentemente</li>
      </ul>

      <h2>Quando escolher cada um?</h2>
      <p><strong>Comece com monolito quando:</strong></p>
      <ul>
        <li>O projeto esta no inicio (MVP, startup)</li>
        <li>A equipe e pequena (menos de 10 desenvolvedores)</li>
        <li>O dominio ainda nao esta bem definido</li>
        <li>Velocidade de entrega e prioridade</li>
      </ul>

      <p><strong>Considere microsservicos quando:</strong></p>
      <ul>
        <li>O monolito se tornou dificil de manter e deployar</li>
        <li>Diferentes partes precisam escalar independentemente</li>
        <li>Multiplas equipes trabalham no mesmo produto</li>
        <li>Existem requisitos claros de isolamento de dominio</li>
      </ul>

      <h2>O caminho do meio: Modular Monolith</h2>
      <p>Uma abordagem cada vez mais popular e o monolito modular: mantem a simplicidade de deployment de um monolito mas com a organizacao e isolamento de microsservicos internamente. Cada modulo tem fronteiras claras e pode ser extraido para um servico independente no futuro se necessario.</p>

      <h2>Conclusao</h2>
      <p>A regra de ouro e: comece com um monolito bem estruturado e modular. Migre para microsservicos apenas quando tiver razoes concretas — escala, organizacao de times ou requisitos tecnicos especificos. Microsservicos prematuros adicionam complexidade que pode matar projetos jovens.</p>
    `,
    date: "2024-12-01",
    readTime: "9 min de leitura",
    category: "Arquitetura",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
    views: 3780,
    likes: 245,
    tags: ["Microsservicos", "Monolito", "Arquitetura", "Backend"],
    author,
  },
  {
    id: 10,
    slug: "react-hooks-guia-definitivo",
    title: "React Hooks: Guia definitivo para iniciantes e avancados",
    excerpt:
      "Domine todos os hooks do React: useState, useEffect, useContext, useReducer, useMemo, useCallback e hooks customizados.",
    content: `
      <p>Hooks revolucionaram o React ao permitir uso de estado e efeitos colaterais em componentes funcionais. Vamos explorar cada hook essencial com exemplos praticos.</p>

      <h2>useState: gerenciamento de estado local</h2>
      <p>O hook mais basico e fundamental. Gerencia estado dentro de um componente:</p>
      <pre><code>import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState&lt;string[]&gt;([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, input]);
    setInput('');
  };

  return (
    &lt;div&gt;
      &lt;input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTodo()}
      /&gt;
      &lt;ul&gt;
        {todos.map((todo, i) => (
          &lt;li key={i}&gt;{todo}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <h2>useEffect: efeitos colaterais</h2>
      <p>Executa codigo em resposta a mudancas de estado ou montagem/desmontagem do componente:</p>
      <pre><code>import { useState, useEffect } from 'react';

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });

    // Cleanup function (executada antes do proximo efeito ou desmontagem)
    return () => {
      // Cancelar requisicao se componente desmontar
    };
  }, [userId]); // Re-executa apenas quando userId muda

  if (loading) return &lt;p&gt;Carregando...&lt;/p&gt;;
  return &lt;div&gt;{user?.name}&lt;/div&gt;;
}</code></pre>

      <h2>useContext: estado global sem prop drilling</h2>
      <pre><code>import { createContext, useContext, useState } from 'react';

// Criar contexto
interface ThemeContext {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeCtx = createContext&lt;ThemeContext&gt;({} as ThemeContext);

// Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState&lt;'light' | 'dark'&gt;('light');
  const toggleTheme = () =>
    setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    &lt;ThemeCtx.Provider value={{ theme, toggleTheme }}&gt;
      {children}
    &lt;/ThemeCtx.Provider&gt;
  );
}

// Usar em qualquer componente filho
function Header() {
  const { theme, toggleTheme } = useContext(ThemeCtx);
  return (
    &lt;button onClick={toggleTheme}&gt;
      Tema atual: {theme}
    &lt;/button&gt;
  );
}</code></pre>

      <h2>useMemo e useCallback: otimizacao de performance</h2>
      <pre><code>import { useMemo, useCallback } from 'react';

function ProductList({ products, filter }) {
  // useMemo: memoriza resultado de calculo caro
  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  // useCallback: memoriza referencia da funcao
  const handleSelect = useCallback((productId: number) => {
    console.log('Selecionado:', productId);
  }, []);

  return (
    &lt;ul&gt;
      {filteredProducts.map(product => (
        &lt;ProductItem
          key={product.id}
          product={product}
          onSelect={handleSelect}
        /&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>

      <h2>Hooks customizados: reutilize logica</h2>
      <p>Hooks customizados permitem extrair e reutilizar logica stateful entre componentes:</p>
      <pre><code>// Hook customizado para fetch de dados
function useFetch&lt;T&gt;(url: string) {
  const [data, setData] = useState&lt;T | null&gt;(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState&lt;string | null&gt;(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Uso simples em qualquer componente
function UserList() {
  const { data: users, loading, error } =
    useFetch&lt;User[]&gt;('/api/users');

  if (loading) return &lt;Spinner /&gt;;
  if (error) return &lt;Error message={error} /&gt;;
  return &lt;List items={users} /&gt;;
}</code></pre>

      <h2>Regras dos Hooks</h2>
      <ul>
        <li>Chame hooks apenas no nivel mais alto (nunca dentro de loops, condicoes ou funcoes aninhadas)</li>
        <li>Chame hooks apenas em componentes React ou hooks customizados</li>
        <li>Hooks customizados devem comecar com "use"</li>
        <li>A ordem dos hooks deve ser consistente entre renders</li>
      </ul>

      <h2>Conclusao</h2>
      <p>Hooks sao a base do React moderno. Dominar useState, useEffect e hooks customizados cobre 90% dos casos de uso. Use useMemo e useCallback com moderacao — otimize apenas quando houver problema de performance mensuravel.</p>
    `,
    date: "2024-11-25",
    readTime: "14 min de leitura",
    category: "Frontend",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop",
    views: 8340,
    likes: 567,
    tags: ["React", "Hooks", "Frontend", "JavaScript"],
    author,
  },
  {
    id: 11,
    slug: "testes-automatizados-jest-testing-library",
    title: "Testes automatizados com Jest e Testing Library",
    excerpt:
      "Aprenda a escrever testes de qualidade que dao confianca para refatorar e evoluir seu codigo sem medo.",
    content: `
      <p>Testes automatizados sao a rede de seguranca que permite evoluir software com confianca. Com Jest e Testing Library, voce escreve testes que validam o comportamento real da aplicacao, nao detalhes de implementacao.</p>

      <h2>Por que testar?</h2>
      <ul>
        <li><strong>Confianca para refatorar:</strong> mude a implementacao sem medo de quebrar funcionalidades</li>
        <li><strong>Documentacao viva:</strong> testes descrevem o comportamento esperado do codigo</li>
        <li><strong>Prevencao de regressoes:</strong> bugs corrigidos nao voltam</li>
        <li><strong>Design melhor:</strong> codigo testavel tende a ser codigo bem estruturado</li>
      </ul>

      <h2>Configuracao do Jest</h2>
      <pre><code>npm install -D jest @types/jest ts-jest
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event</code></pre>

      <h2>Testes unitarios com Jest</h2>
      <pre><code>// utils/formatPrice.ts
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100);
}

// utils/formatPrice.test.ts
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('formata centavos para reais', () => {
    expect(formatPrice(1990)).toBe('R$ 19,90');
  });

  it('formata zero corretamente', () => {
    expect(formatPrice(0)).toBe('R$ 0,00');
  });

  it('formata valores grandes', () => {
    expect(formatPrice(100000)).toBe('R$ 1.000,00');
  });
});</code></pre>

      <h2>Testes de componentes com Testing Library</h2>
      <p>Testing Library incentiva testar como o usuario interage, nao a implementacao interna:</p>
      <pre><code>// components/Counter.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter', () => {
  it('renderiza com valor inicial zero', () => {
    render(&lt;Counter /&gt;);
    expect(screen.getByText('Contador: 0')).toBeInTheDocument();
  });

  it('incrementa ao clicar no botao', async () => {
    render(&lt;Counter /&gt;);
    const button = screen.getByRole('button', {
      name: /incrementar/i
    });

    await userEvent.click(button);
    expect(screen.getByText('Contador: 1')).toBeInTheDocument();

    await userEvent.click(button);
    expect(screen.getByText('Contador: 2')).toBeInTheDocument();
  });

  it('decrementa ao clicar no botao de menos', async () => {
    render(&lt;Counter /&gt;);
    const decrement = screen.getByRole('button', {
      name: /decrementar/i
    });

    await userEvent.click(decrement);
    expect(screen.getByText('Contador: -1')).toBeInTheDocument();
  });
});</code></pre>

      <h2>Testes de formulario</h2>
      <pre><code>// components/LoginForm.test.tsx
describe('LoginForm', () => {
  it('mostra erro quando campos estao vazios', async () => {
    render(&lt;LoginForm onSubmit={jest.fn()} /&gt;);

    await userEvent.click(
      screen.getByRole('button', { name: /entrar/i })
    );

    expect(screen.getByText(/email obrigatorio/i))
      .toBeInTheDocument();
  });

  it('chama onSubmit com dados corretos', async () => {
    const handleSubmit = jest.fn();
    render(&lt;LoginForm onSubmit={handleSubmit} /&gt;);

    await userEvent.type(
      screen.getByLabelText(/email/i),
      'user@test.com'
    );
    await userEvent.type(
      screen.getByLabelText(/senha/i),
      '123456'
    );
    await userEvent.click(
      screen.getByRole('button', { name: /entrar/i })
    );

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'user@test.com',
      password: '123456',
    });
  });
});</code></pre>

      <h2>Boas praticas de testes</h2>
      <ul>
        <li><strong>Teste comportamento, nao implementacao:</strong> verifique o que o usuario ve e faz</li>
        <li><strong>Um assert por teste:</strong> cada teste valida um comportamento especifico</li>
        <li><strong>AAA Pattern:</strong> Arrange (preparar), Act (agir), Assert (verificar)</li>
        <li><strong>Nomes descritivos:</strong> "deve mostrar erro quando email e invalido"</li>
        <li><strong>Evite mocks excessivos:</strong> mocks demais tornam testes frageis</li>
      </ul>

      <h2>Conclusao</h2>
      <p>Testes nao sao um custo — sao um investimento. Comece testando as partes mais criticas da aplicacao e va expandindo. Com Jest e Testing Library, voce tem todas as ferramentas para escrever testes que realmente agregam valor.</p>
    `,
    date: "2024-11-18",
    readTime: "11 min de leitura",
    category: "Frontend",
    coverImage: "https://images.unsplash.com/photo-1576444356170-66073FB20e75?w=800&h=500&fit=crop",
    views: 3450,
    likes: 198,
    tags: ["Jest", "Testing Library", "Testes", "React"],
    author,
  },
  {
    id: 12,
    slug: "postgresql-vs-mongodb",
    title: "PostgreSQL vs MongoDB: Qual banco de dados escolher?",
    excerpt:
      "Comparacao detalhada entre SQL e NoSQL para ajudar voce a tomar a melhor decisao para seu projeto.",
    content: `
      <p>A escolha do banco de dados impacta diretamente a performance, escalabilidade e manutenibilidade da sua aplicacao. PostgreSQL (SQL relacional) e MongoDB (NoSQL documental) sao as opcoes mais populares em cada categoria.</p>

      <h2>PostgreSQL: o poder do SQL relacional</h2>
      <p>PostgreSQL e um banco relacional open-source conhecido pela robustez, conformidade com padroes SQL e extensibilidade.</p>
      <pre><code>-- Criando tabelas com relacoes
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  author_id INTEGER REFERENCES users(id),
  published_at TIMESTAMP,
  tags TEXT[]
);

-- Query com JOIN
SELECT p.title, u.name as author, p.published_at
FROM posts p
JOIN users u ON p.author_id = u.id
WHERE p.published_at IS NOT NULL
ORDER BY p.published_at DESC
LIMIT 10;</code></pre>

      <h3>Pontos fortes do PostgreSQL</h3>
      <ul>
        <li><strong>ACID completo:</strong> transacoes confiaveis garantem consistencia de dados</li>
        <li><strong>Relacoes:</strong> JOINs eficientes para dados inter-relacionados</li>
        <li><strong>Schema rigido:</strong> validacao de dados no nivel do banco</li>
        <li><strong>Recursos avancados:</strong> JSON/JSONB, full-text search, CTEs, window functions</li>
        <li><strong>Extensoes:</strong> PostGIS (geoespacial), pg_trgm (busca fuzzy), TimescaleDB</li>
      </ul>

      <h2>MongoDB: flexibilidade do NoSQL</h2>
      <p>MongoDB armazena dados como documentos JSON flexiveis (BSON), sem schema rigido.</p>
      <pre><code>// Inserindo documentos
db.posts.insertOne({
  title: "Meu Post",
  content: "Conteudo do post...",
  author: {
    name: "Luan",
    email: "luan@dev.com"
  },
  tags: ["javascript", "nodejs"],
  comments: [
    {
      user: "Maria",
      text: "Otimo post!",
      date: new Date()
    }
  ],
  publishedAt: new Date()
});

// Query com agregacao
db.posts.aggregate([
  { $match: { publishedAt: { $ne: null } } },
  { $unwind: "$tags" },
  { $group: {
    _id: "$tags",
    count: { $sum: 1 }
  }},
  { $sort: { count: -1 } },
  { $limit: 10 }
]);</code></pre>

      <h3>Pontos fortes do MongoDB</h3>
      <ul>
        <li><strong>Schema flexivel:</strong> documentos podem ter estruturas diferentes na mesma colecao</li>
        <li><strong>Performance de leitura:</strong> dados denormalizados evitam JOINs</li>
        <li><strong>Escalabilidade horizontal:</strong> sharding nativo para distribuir dados</li>
        <li><strong>Modelagem intuitiva:</strong> documentos se assemelham a objetos do codigo</li>
        <li><strong>Prototipagem rapida:</strong> sem necessidade de migrations</li>
      </ul>

      <h2>Quando usar cada um?</h2>
      <p><strong>PostgreSQL e ideal para:</strong></p>
      <ul>
        <li>Dados com muitas relacoes (e-commerce, ERP, financeiro)</li>
        <li>Transacoes complexas que exigem ACID</li>
        <li>Dados estruturados com schema bem definido</li>
        <li>Queries complexas com agregacoes e JOINs</li>
      </ul>

      <p><strong>MongoDB e ideal para:</strong></p>
      <ul>
        <li>Dados com estrutura variavel (CMS, catalogo de produtos)</li>
        <li>Alta velocidade de leitura com dados denormalizados</li>
        <li>Prototipagem e MVPs rapidos</li>
        <li>Dados de IoT, logs e eventos</li>
      </ul>

      <h2>Conclusao</h2>
      <p>Nao existe banco "melhor" — existe o banco certo para cada situacao. Para a maioria dos projetos web tradicionais, PostgreSQL e a escolha mais segura pela consistencia e versatilidade. MongoDB brilha em cenarios de dados flexiveis e alta escala de leitura. Em muitos projetos maduros, ambos sao usados em conjunto (polyglot persistence).</p>
    `,
    date: "2024-11-10",
    readTime: "10 min de leitura",
    category: "Banco de Dados",
    coverImage: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=500&fit=crop",
    views: 4560,
    likes: 278,
    tags: ["PostgreSQL", "MongoDB", "Banco de Dados", "SQL", "NoSQL"],
    author,
  },
  {
    id: 13,
    slug: "design-patterns-javascript",
    title: "Design Patterns essenciais em JavaScript e TypeScript",
    excerpt:
      "Aprenda os padroes de projeto mais uteis para escrever codigo JavaScript/TypeScript mais organizado e reutilizavel.",
    content: `
      <p>Design Patterns sao solucoes testadas e comprovadas para problemas recorrentes em desenvolvimento de software. Conhecer os padroes mais comuns em JavaScript e TypeScript eleva a qualidade do seu codigo significativamente.</p>

      <h2>Singleton: instancia unica</h2>
      <p>Garante que uma classe tenha apenas uma instancia em toda a aplicacao:</p>
      <pre><code>class Database {
  private static instance: Database;
  private connection: any;

  private constructor() {
    this.connection = this.connect();
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private connect() {
    console.log('Conectando ao banco...');
    return { /* conexao */ };
  }

  query(sql: string) {
    return this.connection.execute(sql);
  }
}

// Uso - sempre a mesma instancia
const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true</code></pre>

      <h2>Observer: sistema de eventos</h2>
      <p>Permite que objetos se inscrevam para receber notificacoes de mudancas:</p>
      <pre><code>type Listener&lt;T&gt; = (data: T) => void;

class EventEmitter&lt;Events extends Record&lt;string, any&gt;&gt; {
  private listeners = new Map&lt;string, Set&lt;Listener&lt;any&gt;&gt;&gt;();

  on&lt;K extends keyof Events&gt;(
    event: K,
    listener: Listener&lt;Events[K]&gt;
  ) {
    if (!this.listeners.has(event as string)) {
      this.listeners.set(event as string, new Set());
    }
    this.listeners.get(event as string)!.add(listener);

    // Retorna funcao de unsubscribe
    return () => {
      this.listeners.get(event as string)?.delete(listener);
    };
  }

  emit&lt;K extends keyof Events&gt;(event: K, data: Events[K]) {
    this.listeners.get(event as string)?.forEach(
      listener => listener(data)
    );
  }
}

// Uso com TypeScript
interface AppEvents {
  'user:login': { userId: number; name: string };
  'user:logout': { userId: number };
  'order:created': { orderId: string; total: number };
}

const events = new EventEmitter&lt;AppEvents&gt;();

events.on('user:login', ({ name }) => {
  console.log(\`Bem-vindo, \${name}!\`);
});

events.emit('user:login', { userId: 1, name: 'Luan' });</code></pre>

      <h2>Strategy: algoritmos intercambiaveis</h2>
      <p>Permite trocar algoritmos em tempo de execucao:</p>
      <pre><code>interface SortStrategy&lt;T&gt; {
  sort(data: T[]): T[];
}

class BubbleSort&lt;T&gt; implements SortStrategy&lt;T&gt; {
  sort(data: T[]): T[] {
    const arr = [...data];
    for (let i = 0; i &lt; arr.length; i++) {
      for (let j = 0; j &lt; arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class QuickSort&lt;T&gt; implements SortStrategy&lt;T&gt; {
  sort(data: T[]): T[] {
    if (data.length <= 1) return data;
    const pivot = data[0];
    const left = data.slice(1).filter(x => x &lt;= pivot);
    const right = data.slice(1).filter(x => x > pivot);
    return [...this.sort(left), pivot, ...this.sort(right)];
  }
}

// Uso
class Sorter&lt;T&gt; {
  constructor(private strategy: SortStrategy&lt;T&gt;) {}

  setStrategy(strategy: SortStrategy&lt;T&gt;) {
    this.strategy = strategy;
  }

  sort(data: T[]): T[] {
    return this.strategy.sort(data);
  }
}

const sorter = new Sorter(new QuickSort&lt;number&gt;());
sorter.sort([3, 1, 4, 1, 5]);</code></pre>

      <h2>Factory: criacao de objetos</h2>
      <pre><code>interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  send(message: string) {
    console.log(\`Email: \${message}\`);
  }
}

class SMSNotification implements Notification {
  send(message: string) {
    console.log(\`SMS: \${message}\`);
  }
}

class PushNotification implements Notification {
  send(message: string) {
    console.log(\`Push: \${message}\`);
  }
}

// Factory
function createNotification(
  type: 'email' | 'sms' | 'push'
): Notification {
  const notifications = {
    email: EmailNotification,
    sms: SMSNotification,
    push: PushNotification,
  };

  return new notifications[type]();
}

const notifier = createNotification('email');
notifier.send('Seu pedido foi confirmado!');</code></pre>

      <h2>Quando usar Design Patterns</h2>
      <ul>
        <li>Use patterns quando eles resolvem um problema real que voce esta enfrentando</li>
        <li>Nao force um pattern onde nao e necessario</li>
        <li>Prefira composicao sobre heranca</li>
        <li>Comece simples e refatore para um pattern quando a complexidade justificar</li>
      </ul>

      <h2>Conclusao</h2>
      <p>Design Patterns sao ferramentas no seu cinto de utilidades, nao regras obrigatorias. Conhece-los permite reconhecer oportunidades de aplicacao e comunicar solucoes de forma clara com outros desenvolvedores. Estude os mais comuns e pratique aplicando em projetos reais.</p>
    `,
    date: "2024-11-05",
    readTime: "13 min de leitura",
    category: "Arquitetura",
    coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=500&fit=crop",
    views: 3120,
    likes: 201,
    tags: ["Design Patterns", "JavaScript", "TypeScript", "Arquitetura"],
    author,
  },
  {
    id: 14,
    slug: "performance-web-otimizacao",
    title: "Performance Web: Otimizando seu site para velocidade maxima",
    excerpt:
      "Tecnicas praticas para melhorar Core Web Vitals, tempo de carregamento e experiencia do usuario.",
    content: `
      <p>Performance web impacta diretamente a experiencia do usuario, SEO e conversao. O Google usa Core Web Vitals como fator de ranqueamento, e usuarios abandonam sites que demoram mais de 3 segundos para carregar.</p>

      <h2>Core Web Vitals</h2>
      <p>As tres metricas essenciais que o Google mede:</p>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> tempo ate o maior elemento visivel carregar. Meta: &lt; 2.5 segundos</li>
        <li><strong>FID (First Input Delay):</strong> tempo de resposta a primeira interacao. Meta: &lt; 100ms</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> estabilidade visual da pagina. Meta: &lt; 0.1</li>
      </ul>

      <h2>Otimizacao de imagens</h2>
      <p>Imagens sao tipicamente o maior recurso de uma pagina. Otimize-as agressivamente:</p>
      <pre><code>// Next.js - componente Image otimizado
import Image from 'next/image';

// Automaticamente otimiza formato, tamanho e lazy load
&lt;Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority  // Desabilita lazy load para imagem above the fold
  sizes="(max-width: 768px) 100vw, 1200px"
/&gt;

// Imagens menores: use WebP/AVIF
// Defina width e height para evitar CLS
// Use lazy loading para imagens below the fold</code></pre>

      <h2>Code splitting e lazy loading</h2>
      <pre><code>import { lazy, Suspense } from 'react';

// Lazy load de componentes pesados
const HeavyChart = lazy(() => import('./HeavyChart'));
const MarkdownEditor = lazy(() => import('./MarkdownEditor'));

function Dashboard() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Dashboard&lt;/h1&gt;

      &lt;Suspense fallback={&lt;Skeleton /&gt;}&gt;
        &lt;HeavyChart data={data} /&gt;
      &lt;/Suspense&gt;

      &lt;Suspense fallback={&lt;p&gt;Carregando editor...&lt;/p&gt;}&gt;
        &lt;MarkdownEditor /&gt;
      &lt;/Suspense&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <h2>Otimizacao de fontes</h2>
      <pre><code>// Next.js - fontes otimizadas automaticamente
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // Mostra texto com fonte fallback enquanto carrega
  preload: true,
});

// CSS - preload de fontes customizadas
// &lt;link rel="preload" href="/fonts/custom.woff2"
//   as="font" type="font/woff2" crossorigin&gt;</code></pre>

      <h2>Caching e CDN</h2>
      <pre><code>// next.config.js - headers de cache
module.exports = {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};</code></pre>

      <h2>Ferramentas de analise</h2>
      <ul>
        <li><strong>Lighthouse:</strong> auditoria completa integrada ao Chrome DevTools</li>
        <li><strong>PageSpeed Insights:</strong> dados reais de campo do Google</li>
        <li><strong>WebPageTest:</strong> testes detalhados com waterfall de recursos</li>
        <li><strong>Bundle Analyzer:</strong> visualize o tamanho de cada dependencia</li>
      </ul>

      <h2>Checklist de performance</h2>
      <ul>
        <li>Otimize e comprima todas as imagens (WebP/AVIF)</li>
        <li>Implemente lazy loading para conteudo below the fold</li>
        <li>Minimize e comprima JavaScript e CSS</li>
        <li>Use code splitting para carregar apenas o necessario</li>
        <li>Configure caching adequado para assets estaticos</li>
        <li>Use CDN para servir assets globalmente</li>
        <li>Prefetch/preload recursos criticos</li>
        <li>Evite layout shifts definindo dimensoes de imagens e fonts</li>
      </ul>

      <h2>Conclusao</h2>
      <p>Performance nao e uma tarefa unica — e um processo continuo. Monitore suas metricas regularmente, priorize as otimizacoes de maior impacto e lembre-se: a melhor otimizacao e nao carregar o que nao e necessario.</p>
    `,
    date: "2024-10-28",
    readTime: "10 min de leitura",
    category: "Frontend",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    views: 2980,
    likes: 167,
    tags: ["Performance", "Web Vitals", "Otimizacao", "Frontend"],
    author,
  },
  {
    id: 15,
    slug: "git-avancado-comandos-essenciais",
    title: "Git avancado: Comandos que vao transformar seu workflow",
    excerpt:
      "Va alem do basico com Git. Aprenda rebase interativo, cherry-pick, stash, bisect e estrategias de branching.",
    content: `
      <p>A maioria dos desenvolvedores usa Git no piloto automatico: add, commit, push, pull. Mas Git e uma ferramenta poderosa com recursos que podem transformar drasticamente seu fluxo de trabalho.</p>

      <h2>Git Rebase: historico limpo</h2>
      <p>Rebase reaplica commits de uma branch sobre outra, criando um historico linear e limpo:</p>
      <pre><code># Em vez de merge (que cria commit de merge)
git checkout feature
git merge main

# Use rebase para historico linear
git checkout feature
git rebase main

# Rebase interativo para limpar commits
git rebase -i HEAD~3

# No editor, voce pode:
# pick   - manter commit
# squash - juntar com commit anterior
# reword - alterar mensagem
# drop   - remover commit</code></pre>

      <h2>Git Stash: salvar trabalho temporariamente</h2>
      <pre><code># Salvar mudancas nao commitadas
git stash

# Salvar com descricao
git stash push -m "WIP: refatoracao do login"

# Listar stashes
git stash list

# Aplicar ultimo stash (mantem no stash)
git stash apply

# Aplicar e remover do stash
git stash pop

# Aplicar stash especifico
git stash apply stash@{2}

# Stash parcial (selecionar arquivos)
git stash push -p</code></pre>

      <h2>Git Cherry-pick: pegar commits especificos</h2>
      <pre><code># Aplicar um commit especifico na branch atual
git cherry-pick abc1234

# Cherry-pick sem commitar (para revisar antes)
git cherry-pick --no-commit abc1234

# Cherry-pick de multiplos commits
git cherry-pick abc1234 def5678

# Cherry-pick de um range
git cherry-pick abc1234..def5678</code></pre>

      <h2>Git Bisect: encontrar o commit que introduziu um bug</h2>
      <pre><code># Iniciar busca binaria
git bisect start

# Marcar commit atual como ruim (tem o bug)
git bisect bad

# Marcar um commit antigo como bom (sem o bug)
git bisect good v1.0.0

# Git vai fazer checkout de commits intermediarios
# Teste cada um e marque como good ou bad
git bisect good  # ou
git bisect bad

# Quando encontrar o commit culpado, finalizar
git bisect reset</code></pre>

      <h2>Aliases uteis</h2>
      <pre><code># Configurar aliases no .gitconfig
git config --global alias.st "status -sb"
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.last "log -1 HEAD --format='%h %s (%cr)'"
git config --global alias.undo "reset HEAD~1 --mixed"
git config --global alias.amend "commit --amend --no-edit"

# Uso
git st      # status compacto
git lg      # log visual com branches
git last    # ultimo commit
git undo    # desfazer ultimo commit
git amend   # emendar ultimo commit</code></pre>

      <h2>Estrategias de branching</h2>

      <h3>Git Flow</h3>
      <p>Ideal para projetos com releases programadas:</p>
      <ul>
        <li><code>main</code> - codigo em producao</li>
        <li><code>develop</code> - proxima release</li>
        <li><code>feature/*</code> - novas funcionalidades</li>
        <li><code>release/*</code> - preparacao de release</li>
        <li><code>hotfix/*</code> - correcoes urgentes</li>
      </ul>

      <h3>Trunk Based Development</h3>
      <p>Ideal para CI/CD e deploys frequentes:</p>
      <ul>
        <li>Todos commitam na <code>main</code> (ou branches de vida curta)</li>
        <li>Feature flags controlam funcionalidades nao finalizadas</li>
        <li>Deploy continuo a cada merge</li>
      </ul>

      <h2>Conventional Commits</h2>
      <pre><code># Formato padrao para mensagens de commit
feat: adicionar autenticacao por biometria
fix: corrigir calculo de desconto no carrinho
docs: atualizar README com instrucoes de setup
refactor: extrair logica de validacao para service
test: adicionar testes para modulo de pagamento
chore: atualizar dependencias do projeto</code></pre>

      <h2>Conclusao</h2>
      <p>Git e muito mais do que add/commit/push. Dominar rebase, stash, bisect e ter uma estrategia clara de branching torna voce mais produtivo e seu historico de projeto muito mais organizado. Pratique esses comandos em um repositorio de testes antes de usar em projetos reais.</p>
    `,
    date: "2024-10-20",
    readTime: "11 min de leitura",
    category: "DevOps",
    coverImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=500&fit=crop",
    views: 5230,
    likes: 345,
    tags: ["Git", "Versionamento", "DevOps", "Workflow"],
    author,
  },
]; // Fecha o array de posts - dados mockados pra demo do blog

// Funcoes auxiliares pra trabalhar com os posts
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug); // Encontra post pelo slug
}

export function getPostsByCategory(category: string): Post[] {
  if (category === "Todos") return posts; // Se "Todos", retorna tudo
  return posts.filter((post) => post.category === category); // Filtra por categoria
}

export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const current = getPostBySlug(currentSlug); // Pega o post atual
  if (!current) return []; // Se nao encontrou, retorna vazio

  return posts
    .filter((post) => post.slug !== currentSlug) // Exclui o post atual
    .filter( // Filtra posts relacionados
      (post) =>
        post.category === current.category || // Mesma categoria
        post.tags.some((tag) => current.tags.includes(tag)) // Tags em comum
    )
    .slice(0, limit); // Limita o numero
}

export function getFeaturedPosts(): Post[] {
  return posts.filter((post) => post.featured); // Posts marcados como featured
}

export function getTrendingPosts(limit = 5): Post[] {
  return [...posts].sort((a, b) => b.views - a.views).slice(0, limit); // Ordena por views decrescente
}

export function searchPosts(query: string): Post[] {
  const q = query.toLowerCase(); // Query em minusculo
  return posts.filter( // Filtra posts que contenham a query
    (post) =>
      post.title.toLowerCase().includes(q) || // No titulo
      post.excerpt.toLowerCase().includes(q) || // No resumo
      post.tags.some((tag) => tag.toLowerCase().includes(q)) // Nas tags
  );
}

export function getAllCategories(): string[] {
  const categories = new Set(posts.map((post) => post.category)); // Set pra categorias unicas
  return ["Todos", ...Array.from(categories)]; // Adiciona "Todos" no inicio
}

export function getAllTags(): string[] {
  const tags = new Set(posts.flatMap((post) => post.tags)); // Flat pra todas as tags, Set pra unicas
  return Array.from(tags).sort(); // Converte pra array e ordena
}
