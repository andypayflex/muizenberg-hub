import { NextRequest, NextResponse } from "next/server";
import { getAllBusinesses, createBusiness, seedDatabase } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  await seedDatabase();
  const businesses = await getAllBusinesses();
  return NextResponse.json(businesses);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please sign in to add a business" }, { status: 401 });
  }

  const data = await request.json();
  const id = await createBusiness(data);
  return NextResponse.json({ success: true, id });
}
