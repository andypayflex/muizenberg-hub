import { NextRequest, NextResponse } from "next/server";
import { getAllMarketplaceItems, createMarketplaceItem, seedDatabase } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  seedDatabase();
  const items = getAllMarketplaceItems();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please sign in to list an item" }, { status: 401 });
  }

  const data = await request.json();
  const id = createMarketplaceItem(data);
  return NextResponse.json({ success: true, id });
}
