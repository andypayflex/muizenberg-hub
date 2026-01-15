import { NextRequest, NextResponse } from "next/server";
import { getAllJobs, createJob, seedDatabase } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  seedDatabase();
  const jobs = getAllJobs();
  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please sign in to post a job" }, { status: 401 });
  }

  const data = await request.json();
  const id = createJob(data);
  return NextResponse.json({ success: true, id });
}
