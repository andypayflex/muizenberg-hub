import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { adminGetAllPosts, createPost, deletePost } from "@/lib/db";

export async function GET() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = adminGetAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const data = await request.json();
  const id = createPost(data);
  return NextResponse.json({ success: true, id });
}

export async function DELETE(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { id } = await request.json();
  deletePost(id);
  return NextResponse.json({ success: true });
}
