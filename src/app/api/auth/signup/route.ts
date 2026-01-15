import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail, seedDatabase } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await seedDatabase();
    
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const userId = await createUser(email, password, name, "user");

    const token = signToken({
      userId,
      email,
      role: "user",
    });

    const response = NextResponse.json({
      success: true,
      user: { id: userId, email, name, role: "user" },
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
