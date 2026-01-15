import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { adminGetAllBusinesses, createBusiness, deleteBusiness, updateBusiness } from "@/lib/db";

export async function GET() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const businesses = await adminGetAllBusinesses();
  return NextResponse.json(businesses);
}

export async function POST(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const data = await request.json();
  const id = await createBusiness(data);
  return NextResponse.json({ success: true, id });
}

export async function DELETE(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { id } = await request.json();
  await deleteBusiness(id);
  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest) {
  if (!await isAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { id, ...data } = await request.json();
  await updateBusiness(id, data);
  return NextResponse.json({ success: true });
}
