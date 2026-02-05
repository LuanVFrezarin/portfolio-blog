import { NextResponse } from "next/server";
import { getPostBySlug, getRelatedPosts } from "@/data/posts";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return NextResponse.json(
      { error: "Artigo nao encontrado" },
      { status: 404 }
    );
  }

  const relatedPosts = getRelatedPosts(params.slug, 3).map(
    ({ content, ...rest }) => rest
  );

  return NextResponse.json({
    post,
    relatedPosts,
  });
}
