import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return format(parseISO(dateString), "d 'de' MMMM, yyyy", { locale: ptBR });
}

export function formatDateShort(dateString: string): string {
  return format(parseISO(dateString), "dd MMM yyyy", { locale: ptBR });
}

export function timeAgo(dateString: string): string {
  return formatDistanceToNow(parseISO(dateString), {
    addSuffix: true,
    locale: ptBR,
  });
}

export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

export function estimateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]+>/g, "");
  const wordCount = textContent.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min de leitura`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateAvatarUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff&size=128`;
}
