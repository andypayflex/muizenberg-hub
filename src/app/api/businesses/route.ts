import { NextResponse } from "next/server";
import { getAllBusinesses, seedDatabase } from "@/lib/db";

export async function GET() {
  seedDatabase(); // Ensure data exists
  const businesses = getAllBusinesses();
  return NextResponse.json(businesses);
}
