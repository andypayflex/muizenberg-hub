import { NextResponse } from "next/server";
import { getAllMarketplaceItems, seedDatabase } from "@/lib/db";

export async function GET() {
  seedDatabase();
  const items = getAllMarketplaceItems();
  return NextResponse.json(items);
}
