import { NextResponse } from "next/server";
import { posts, searchPosts, getPostsByCategory } from "@/data/posts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  let result = posts;

  if (query) {
    result = searchPosts(query);
  }

  if (category && category !== "Todos") {
    result = result.filter((post) => post.category === category);
  }

  const total = result.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedPosts = result.slice((page - 1) * limit, page * limit);

  // Return posts without full content for listing
  const postsWithoutContent = paginatedPosts.map(({ content, ...rest }) => rest);

  return NextResponse.json({
    posts: postsWithoutContent,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
}
