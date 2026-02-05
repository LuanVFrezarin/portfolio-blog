"use client";

import { useState, useMemo } from "react";
import { posts, getAllCategories } from "@/data/posts";
import { PostCard } from "@/components/blog/PostCard";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { SearchBar } from "@/components/blog/SearchBar";
import { TrendingPosts } from "@/components/blog/TrendingPosts";
import { Newsletter } from "@/components/blog/Newsletter";
import { POSTS_PER_PAGE } from "@/lib/constants";

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = getAllCategories();

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === "Todos" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const trendingPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);
  const featuredPost = posts.find((p) => p.featured);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Blog</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {posts.length} artigos sobre desenvolvimento, tecnologia e carreira
          </p>
          <div className="mt-6 max-w-md">
            <SearchBar value={search} onChange={handleSearchChange} />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-slate-950 sticky top-16 z-10 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleCategoryChange}
          />
        </div>
      </div>

      {/* Featured */}
      {!search && activeCategory === "Todos" && currentPage === 1 && featuredPost && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <FeaturedPost post={featuredPost} />
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Posts Grid */}
          <div className="lg:col-span-2">
            {search && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                {filteredPosts.length} resultado{filteredPosts.length !== 1 ? "s" : ""} para &quot;{search}&quot;
              </p>
            )}

            {paginatedPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-slate-500 dark:text-slate-400">
                  Nenhum artigo encontrado.
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
                  Tente buscar por outro termo ou categoria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Proximo
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <TrendingPosts posts={trendingPosts} />
            <Newsletter />
          </aside>
        </div>
      </main>
    </div>
  );
}
