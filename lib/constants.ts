import { CategoryInfo } from "./types";

export const SITE_CONFIG = {
  name: "BlogDev",
  title: "BlogDev | Luan Frezarin",
  description:
    "Artigos sobre desenvolvimento web, mobile, DevOps e carreira em tecnologia. Conteudo pratico e atualizado para desenvolvedores.",
  url: "https://blogdev.luanfrezarin.dev",
  author: "Luan Frezarin",
  locale: "pt-BR",
} as const;

export const CATEGORIES: CategoryInfo[] = [
  { name: "Frontend", label: "Frontend", color: "bg-blue-500", icon: "Layout" },
  { name: "Backend", label: "Backend", color: "bg-green-500", icon: "Server" },
  { name: "Mobile", label: "Mobile", color: "bg-purple-500", icon: "Smartphone" },
  { name: "DevOps", label: "DevOps", color: "bg-orange-500", icon: "Cloud" },
  { name: "Seguranca", label: "Seguranca", color: "bg-red-500", icon: "Shield" },
  { name: "Carreira", label: "Carreira", color: "bg-yellow-500", icon: "Briefcase" },
  { name: "Banco de Dados", label: "Banco de Dados", color: "bg-cyan-500", icon: "Database" },
  { name: "Arquitetura", label: "Arquitetura", color: "bg-indigo-500", icon: "Blocks" },
];

export const POSTS_PER_PAGE = 6;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/LuanVFrezarin",
  linkedin: "https://www.linkedin.com/in/luan-frezarin-6a4058359/",
  email: "luan.v.frezarin@gmail.com",
} as const;

export function getCategoryColor(category: string): string {
  const cat = CATEGORIES.find((c) => c.name === category);
  return cat?.color ?? "bg-slate-500";
}

export function getCategoryTextColor(category: string): string {
  const colorMap: Record<string, string> = {
    Frontend: "text-blue-600 dark:text-blue-400",
    Backend: "text-green-600 dark:text-green-400",
    Mobile: "text-purple-600 dark:text-purple-400",
    DevOps: "text-orange-600 dark:text-orange-400",
    Seguranca: "text-red-600 dark:text-red-400",
    Carreira: "text-yellow-600 dark:text-yellow-400",
    "Banco de Dados": "text-cyan-600 dark:text-cyan-400",
    Arquitetura: "text-indigo-600 dark:text-indigo-400",
  };
  return colorMap[category] ?? "text-slate-600 dark:text-slate-400";
}

export function getCategoryBgLight(category: string): string {
  const colorMap: Record<string, string> = {
    Frontend: "bg-blue-50 dark:bg-blue-950/30",
    Backend: "bg-green-50 dark:bg-green-950/30",
    Mobile: "bg-purple-50 dark:bg-purple-950/30",
    DevOps: "bg-orange-50 dark:bg-orange-950/30",
    Seguranca: "bg-red-50 dark:bg-red-950/30",
    Carreira: "bg-yellow-50 dark:bg-yellow-950/30",
    "Banco de Dados": "bg-cyan-50 dark:bg-cyan-950/30",
    Arquitetura: "bg-indigo-50 dark:bg-indigo-950/30",
  };
  return colorMap[category] ?? "bg-slate-50 dark:bg-slate-800";
}
