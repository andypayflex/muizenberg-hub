import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { adminGetAllMarketplaceItems, createMarketplaceItem, deleteMarketplaceItem } from "@/lib/db";

export async function GET() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await adminGetAllMarketplaceItems();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const data = await request.json();
  const id = await createMarketplaceItem(data);
  return NextResponse.json({ success: true, id });
}

export async function DELETE(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { id } = await request.json();
  await deleteMarketplaceItem(id);
  return NextResponse.json({ success: true });
}
