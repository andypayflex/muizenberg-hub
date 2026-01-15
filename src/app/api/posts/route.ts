import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost, seedDatabase } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  await seedDatabase();
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please sign in to create a post" }, { status: 401 });
  }

  const data = await request.json();
  const id = await createPost(data);
  return NextResponse.json({ success: true, id });
}
