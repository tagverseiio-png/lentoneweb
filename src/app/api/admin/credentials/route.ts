import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const docRef = doc(db, "admin", "credentials");
    await updateDoc(docRef, {
      username,
      password,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: "Credentials updated successfully" });
  } catch (error) {
    console.error("Update credentials error:", error);
    return NextResponse.json({ error: "Failed to update credentials" }, { status: 500 });
  }
}
