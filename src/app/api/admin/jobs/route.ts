import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { adminGetAllJobs, createJob, deleteJob } from "@/lib/db";

export async function GET() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const jobs = await adminGetAllJobs();
  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const data = await request.json();
  const id = await createJob(data);
  return NextResponse.json({ success: true, id });
}

export async function DELETE(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { id } = await request.json();
  await deleteJob(id);
  return NextResponse.json({ success: true });
}
