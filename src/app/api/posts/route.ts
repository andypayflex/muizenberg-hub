import { NextResponse } from "next/server";
import { getAllPosts, seedDatabase } from "@/lib/db";

export async function GET() {
  seedDatabase();
  const posts = getAllPosts();
  return NextResponse.json(posts);
}
