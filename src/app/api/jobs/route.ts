import { NextResponse } from "next/server";
import { getAllJobs, seedDatabase } from "@/lib/db";

export async function GET() {
  seedDatabase();
  const jobs = getAllJobs();
  return NextResponse.json(jobs);
}
