import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, Eye, ArrowLeft, Tag } from "lucide-react";
import { getPostBySlug, getRelatedPosts, posts } from "@/data/posts";
import { formatDate, formatViews } from "@/lib/utils";
import { getCategoryBgLight, getCategoryTextColor } from "@/lib/constants";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { CommentSection } from "@/components/blog/CommentSection";
import { TableOfContents } from "@/components/blog/TableOfContents";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Artigo nao encontrado" };

  return {
    title: `${post.title} | BlogDev`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

function addIdsToHeadings(content: string): string {
  let index = 0;
  return content.replace(/<h2>/g, () => {
    const id = `section-${index}`;
    index++;
    return `<h2 id="${id}">`;
  });
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(params.slug, 3);
  const contentWithIds = addIdsToHeadings(post.content);

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 pb-8 md:pb-12 w-full">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao blog
            </Link>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getCategoryBgLight(post.category)} ${getCategoryTextColor(post.category)}`}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mt-3 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full"
                />
                {post.author.name}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {formatViews(post.views)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <article>
            {/* Excerpt */}
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-medium">
              {post.excerpt}
            </p>

            {/* Article Content */}
            <div
              className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 dark:prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700 prose-pre:rounded-xl"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
              <Tag className="w-4 h-4 text-slate-400 mt-1" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Share */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            {/* Author Box */}
            <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex flex-col sm:flex-row items-start gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Escrito por</p>
                <h3 className="font-bold text-slate-900 dark:text-white">{post.author.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{post.author.bio}</p>
              </div>
            </div>

            {/* Comments */}
            <CommentSection postSlug={post.slug} />

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <TableOfContents content={post.content} />
          </aside>
        </div>
      </div>
    </>
  );
}
